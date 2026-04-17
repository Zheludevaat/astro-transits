// ══════════════════════════════════════════════════════════════
// synthesis/consult.js — Phase 4: Pre-event consult v2
// Event-type-aware consultation backed by Haiku for fast response
// ══════════════════════════════════════════════════════════════

const EVENT_TYPES={
  conversation:{label:'Difficult conversation',icon:'Mercury'},
  decision:{label:'Decision',icon:'Jupiter'},
  message:{label:'Send a message',icon:'Mercury'},
  meeting:{label:'Meeting / pitch',icon:'Jupiter'},
  contract:{label:'Sign / commit',icon:'Saturn'},
  journey:{label:'Travel / launch',icon:'Mars'},
  social:{label:'Social / date',icon:'Venus'},
  rest:{label:'Rest / retreat',icon:'Moon'},
  creative:{label:'Creative work',icon:'Sun'}
};

const CONSULT_SYSTEM_PROMPT=`You are a traditional astrologer giving a 30-second read on a specific moment for a specific purpose. Reply in 80-150 words, plain English, no glyphs, no jargon. Lead with whether the moment is favorable / mixed / unfavorable for the stated purpose. Give one specific timing recommendation if a clearly better window exists in the user's chosen scope. Hedge precisely: where you're confident, say so; where the chart is mixed, say it's mixed. Do not repeat the user's question back. Do not append "blessings" or pleasantries.`;

const CONSULT_HAIKU_MODEL='claude-haiku-4-5-20251001';
const CONSULT_STORAGE_KEY='astro_consults_v1';
const CONSULT_RETENTION_DAYS=30;

// ── Factor selection by event type ──
// Each event type pulls different factors from the full chart context
function buildConsultContext({eventType,windowScope,involvedCharts,freeText}){
  // Build current sky snapshot
  const now=new Date();
  const jdNow=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours()+now.getUTCMinutes()/60);
  const cur=computeAll(jdNow);
  const vocResult=typeof isVoidOfCourse==='function'?isVoidOfCourse(cur.Moon,jdNow):{voc:false};
  const moonSignIdx=Math.floor(cur.Moon/30);
  const moonSign=SIGNS[moonSignIdx];
  const mansion=typeof computeMansion==='function'?computeMansion(cur.Moon):null;
  const decan=typeof computeDecan==='function'?computeDecan(cur.Sun):null;
  const phaseAngle=((cur.Moon-cur.Sun+360)%360);
  const phaseName=typeof moonPhase==='function'?moonPhase(phaseAngle):'';

  // Planetary hours
  let hourInfo=null;
  if(typeof computePlanetaryHours==='function'){
    const pHours=computePlanetaryHours(jdNow,OBSERVER.lat,OBSERVER.lon);
    if(pHours){
      const utNow=now.getUTCHours()+now.getUTCMinutes()/60;
      const idx=currentHourIndex(pHours.hours,utNow);
      const curHr=pHours.hours[idx];
      const nextHr=pHours.hours[(idx+1)%24];
      let minsLeft=Math.round((nextHr.start-utNow)*60);
      if(minsLeft<0)minsLeft+=24*60;
      hourInfo={ruler:curHr.ruler,minsLeft,dayRuler:pHours.dayRuler};
      // Find upcoming hours of interest for this event type
      const et=EVENT_TYPES[eventType];
      if(et){
        const idealMapping={
          conversation:['Mars','Mercury'],message:['Mercury','Jupiter'],
          decision:['Sun','Saturn','Mercury'],meeting:['Jupiter','Sun'],
          contract:['Jupiter','Mercury','Sun'],journey:['Mars','Jupiter'],
          social:['Venus','Moon','Jupiter'],rest:['Moon','Venus','Saturn'],
          creative:['Sun','Venus','Mercury']
        };
        const idealHours=idealMapping[eventType]||[];
        const upcoming=[];
        for(let i=idx+1;i<idx+12&&i<24;i++){
          const h=pHours.hours[i%24];
          if(idealHours.includes(h.ruler)){
            let startMins=Math.round((h.start-utNow)*60);
            if(startMins<0)startMins+=24*60;
            upcoming.push({ruler:h.ruler,inMinutes:startMins});
            if(upcoming.length>=2)break;
          }
        }
        hourInfo.upcomingIdeal=upcoming;
      }
    }
  }

  // Profections
  let profInfo=null;
  if(typeof computeProfections==='function'){
    const prof=computeProfections(now);
    profInfo={yearLord:prof.yearLord,monthLord:prof.monthLord};
  }

  // Retrogrades
  const retros=[];
  for(const p of['Mercury','Venus','Mars','Jupiter','Saturn']){
    if(typeof motionStatus==='function'){
      const ms=motionStatus(p,jdNow);
      if(ms&&ms.retrograde)retros.push(p);
    }
  }

  // Top transits — compute inline (same pattern as renderApp)
  let topTransits=[];
  if(typeof findAspect==='function'&&typeof transitImportance==='function'){
    const birthJd=julianDate(BIRTH.year,BIRTH.month,BIRTH.day,BIRTH.hour);
    const natal=computeAll(birthJd);
    natal.Ascendant=computeAsc(birthJd,BIRTH.lat,BIRTH.lon);
    natal.MC=computeMC(birthJd,BIRTH.lon);
    const TPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
    const NPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Ascendant','MC'];
    const allT=[];
    for(const tp of TPS){for(const np of NPS){
      if(tp===np)continue;
      const asp=findAspect(cur[tp],natal[np],tp,np,jdNow);
      if(asp)allT.push({tp,np,aspect:asp,importance:transitImportance(tp,np,asp),orb:asp.orbActual,applying:asp.motion==='applying'});
    }}
    allT.sort((a,b)=>b.importance-a.importance);
    topTransits=allT.slice(0,5).map(t=>({
      planet:t.tp,aspect:t.aspect.name,natal:t.np,orb:t.orb.toFixed(1),
      applying:t.applying,importance:t.importance
    }));
  }

  // Lots relevant to event type
  let lotsInfo=null;
  if(typeof computeLots==='function'){
    const birthJd=julianDate(BIRTH.year,BIRTH.month,BIRTH.day,BIRTH.hour);
    const natal=computeAll(birthJd);
    natal.Ascendant=computeAsc(birthJd,BIRTH.lat,BIRTH.lon);
    const lots=computeLots(natal,natal.Ascendant,true); // nocturnal chart
    const lotMapping={
      conversation:['Spirit'],message:['Spirit'],decision:['Spirit','Fortune'],
      meeting:['Victory','Spirit'],contract:['Fortune','Necessity'],
      journey:['Fortune','Courage'],social:['Eros','Fortune'],
      rest:['Fortune'],creative:['Spirit','Eros']
    };
    const relevantLots=(lotMapping[eventType]||[]).map(name=>{
      const deg=lots[name];
      if(deg===undefined)return null;
      return{name,sign:SIGNS[Math.floor(deg/30)],deg:deg.toFixed(1)};
    }).filter(Boolean);
    if(relevantLots.length)lotsInfo=relevantLots;
  }

  // Involved charts (synastry partners)
  let involvedInfo=null;
  if(involvedCharts&&involvedCharts.length>0){
    involvedInfo=involvedCharts.map(chart=>{
      const {natal}=getChartNatal(chart);
      return{name:chart.name,sun:SIGNS[Math.floor(natal.Sun/30)],moon:SIGNS[Math.floor(natal.Moon/30)],asc:SIGNS[Math.floor((natal.Ascendant||0)/30)]};
    });
  }

  return{
    eventType:EVENT_TYPES[eventType].label,
    windowScope,
    freeText:freeText||null,
    now:{
      hour:hourInfo,
      moonSign,moonPhase:phaseName,voc:vocResult.voc,
      mansion:mansion?{index:mansion.index,name:mansion.name,nature:mansion.nature}:null,
      decan:decan?{name:decan.name,ruler:decan.ruler}:null,
      retrogrades:retros
    },
    profection:profInfo,
    topTransits,
    lots:lotsInfo,
    involved:involvedInfo
  };
}

async function consultMoment({eventType,windowScope,involvedCharts,freeText}){
  const key=loadClaudeKey();
  if(!key)throw new Error('No API key set.');

  const ctx=buildConsultContext({eventType,windowScope,involvedCharts,freeText});

  const userMsg=`Event: ${ctx.eventType}
Window: ${ctx.windowScope}
${ctx.freeText?'Context: '+ctx.freeText+'\n':''}
Chart factors (JSON):
\`\`\`json
${JSON.stringify(ctx,null,2)}
\`\`\`

Give a concise read on whether this moment is favorable for the stated purpose.`;

  const body={
    model:CONSULT_HAIKU_MODEL,
    max_tokens:350,
    system:CONSULT_SYSTEM_PROMPT,
    messages:[{role:'user',content:userMsg}]
  };

  const ctrl=new AbortController();
  const timeoutId=setTimeout(()=>ctrl.abort(),15000);
  let res;
  try{
    res=await fetch(CLAUDE_API_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key':key,
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true'
      },
      body:JSON.stringify(body),
      signal:ctrl.signal
    });
  }catch(e){
    clearTimeout(timeoutId);
    if(e.name==='AbortError')throw new Error('Consult timed out after 15s.');
    throw e;
  }
  clearTimeout(timeoutId);

  if(!res.ok){
    let errText='';
    try{const j=await res.json();errText=j.error&&j.error.message||JSON.stringify(j);}catch(e2){errText=await res.text();}
    errText=String(errText).replace(/<[^>]*>/g,'').slice(0,400);
    throw new Error('API error '+res.status+': '+errText);
  }

  const data=await res.json();
  const text=(data.content||[]).map(c=>c.type==='text'?c.text:'').join('\n').trim();
  const usage=data.usage||{};
  const cost=((usage.input_tokens||0)*0.0000008)+((usage.output_tokens||0)*0.000004);
  console.log(`Consult cost: $${cost.toFixed(6)} (${usage.input_tokens||0} in / ${usage.output_tokens||0} out)`);

  return{text,usage,cost,ts:Date.now(),eventType,windowScope,freeText:freeText||''};
}

// ── Consult storage ──
function loadConsults(){
  try{
    const raw=localStorage.getItem(CONSULT_STORAGE_KEY);
    if(!raw)return[];
    const arr=JSON.parse(raw);
    // Prune entries older than retention period
    const cutoff=Date.now()-(CONSULT_RETENTION_DAYS*86400000);
    return Array.isArray(arr)?arr.filter(c=>c.ts>=cutoff):[];
  }catch(e){return[];}
}

function saveConsult(consult){
  const all=loadConsults();
  all.unshift(consult);
  if(all.length>100)all.length=100;
  try{localStorage.setItem(CONSULT_STORAGE_KEY,JSON.stringify(all));}catch(e){console.error('consult save',e);}
}

function rateConsult(ts,rating){
  const all=loadConsults();
  const c=all.find(x=>x.ts===ts);
  if(c){c.rating=rating;
    try{localStorage.setItem(CONSULT_STORAGE_KEY,JSON.stringify(all));}catch(e){}
  }
}
