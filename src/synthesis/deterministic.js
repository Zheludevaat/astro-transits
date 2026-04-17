// ══════════════════════════════════════════════════════════════
// synthesis/deterministic.js — Deterministic synthesis functions
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

function textSeed(dateStr,...keys){
  let h=0;const s=dateStr+keys.join('');
  for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}
  return Math.abs(h);
}
function pick(arr,seed){return arr[seed%arr.length];}
function pickN(arr,seed,n){
  const out=[];const used=new Set();let s=seed;
  while(out.length<n&&out.length<arr.length){const i=s%arr.length;if(!used.has(i)){used.add(i);out.push(arr[i]);}s=s*31+7;}
  return out;
}
function todaySeed(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}

function buildVerdict(topTransits,mPhase,vocResult,curHour,pHours,moonSign){
  const parts=[];
  const tT=topTransits&&topTransits.length?topTransits[0]:null;
  if(tT){
    const np=tT.np==='NorthNode'?'North Node':tT.np;
    const tp=tT.tp==='NorthNode'?'North Node':tT.tp;
    const motion=tT.aspect.motion;
    const name=tT.aspect.name;
    let lead;
    if(motion==='exact')lead=`${tp} is exact ${name} your ${np} right now — `;
    else if(motion==='applying')lead=`${tp} is applying ${name} to your ${np} (${tT.aspect.orbActual}°) — `;
    else if(motion==='stationary')lead=`${tp} stations near your ${np} — `;
    else lead=`${tp} is ${name} your ${np} (${tT.aspect.orbActual}°, separating) — `;
    // Nuance by aspect type + sect-aware
    const isHard=tT.aspect.type==='hard';const isEasy=tT.aspect.type==='easy';
    const seed=todaySeed();
    if(isHard)parts.push(lead+pick(VERDICT_HARD_LEAD,seed)+'.');
    else if(isEasy)parts.push(lead+pick(VERDICT_EASY_LEAD,seed)+'.');
    else if(name==='conjunction')parts.push(lead+pick(VERDICT_CONJ_LEAD,seed)+'.');
    else parts.push(lead+'keep an eye on the theme.');
  }
  // Moon layer
  if(vocResult&&vocResult.voc){
    const endsIn=vocResult.endsIn;
    let endStr='later today';
    if(typeof endsIn==='number'&&endsIn<60)endStr=`in ${Math.round(endsIn)} min`;
    else if(typeof endsIn==='number')endStr=`in ~${(endsIn/60).toFixed(1)}h (Moon enters ${vocResult.nextSign||'next sign'})`;
    parts.push(`Moon is void of course until ${endStr} — don\'t start new things, let the day coast.`);
  } else if(mPhase){
    const mspText=moonSignPhaseText(moonSign.name,mPhase.name);
    // Use the sign+phase specific text but keep it concise for the verdict
    const short=mspText.split('.')[0]+'.';
    parts.push(`Moon in ${moonSign.name} — ${short.charAt(0).toLowerCase()+short.slice(1)}`);
  }
  if(curHour){
    parts.push(`This hour belongs to ${curHour.ruler}.`);
  }
  if(parts.length===0){
    return pick(VERDICT_QUIET,todaySeed());
  }
  return parts.join(' ');
}

function vibeCalc(transits){
  if(!transits.length)return{score:5,text:'A quiet day cosmically. Good for rest, reflection, and working at your own pace.',dominant:null,positives:[],negatives:[]};
  let p=0,n=0,totalW=0;
  const planetEnergy={};
  const contribs=[]; // per-transit contribution
  for(const t of transits){
    const w=Math.max(1,t.importance);totalW+=w;
    const v=w/20;
    let sign=0;
    if(t.aspect.type==='easy'){p+=v;sign=+1;}
    else if(t.aspect.type==='hard'){n+=v;sign=-1;}
    else {p+=v*.3;sign=+0.3;}
    planetEnergy[t.tp]=(planetEnergy[t.tp]||0)+w;
    contribs.push({t,sign,weight:w,mag:v*Math.abs(sign||1)});
  }
  const avg=(p-n)/totalW*10;
  let s=Math.round(5+avg*8);s=Math.max(1,Math.min(10,s));
  let dominant=null,maxE=0;
  for(const[pl,e]of Object.entries(planetEnergy)){if(e>maxE){maxE=e;dominant=pl;}}
  // Top positive + negative contributors
  const positives=contribs.filter(c=>c.sign>0).sort((a,b)=>b.mag-a.mag).slice(0,3)
    .map(c=>({label:`${c.t.tp} ${c.t.aspect.symbol||c.t.aspect.name} ${c.t.np}`,weight:c.weight}));
  const negatives=contribs.filter(c=>c.sign<0).sort((a,b)=>b.mag-a.mag).slice(0,3)
    .map(c=>({label:`${c.t.tp} ${c.t.aspect.symbol||c.t.aspect.name} ${c.t.np}`,weight:c.weight}));
  return{score:s,dominant,positives,negatives};
}

function generateDailyGuidance(transits,vibe,mPhase,retros,stats,vocResult,moonSign,cur,phaseAngle,prof,pHours,isToday){
  let h='';

  // Gather active house themes
  const activeHouses={};
  transits.filter(t=>t.importance>10).forEach(t=>{if(t.house)activeHouses[t.house]=(activeHouses[t.house]||0)+t.importance;});

  // ═══ LAYER 1: THE SHAPE OF TODAY ═══
  const synthesis=synthesizeShapeOfDay(transits,vibe,mPhase,retros,stats,vocResult,moonSign,prof,pHours,isToday);
  h+=`<div class="g-theme">The Shape of Today</div>`;
  h+=`<div class="g-overview">${synthesis}</div>`;

  // ═══ LAYER 2: CONTRIBUTING FACTORS ═══
  h+=`<div class="g-section-title" style="cursor:pointer" onclick="toggleLayer2()">Contributing Factors <span id="l2-arrow" style="font-size:10px;opacity:.5">${layersExpanded.l2?'&#9660;':'&#9654;'}</span></div>`;
  h+=`<div id="layer2" style="display:${layersExpanded.l2?'block':'none'}">`;

  // Profected lord context
  const lordFrameText=lordFrame(prof.yearLord);
  if(lordFrameText){
    h+=`<div class="g-transit" style="border-left-color:var(--gold)">`;
    h+=`<div class="g-transit-head"><span class="g-planets">${pSVG(prof.yearLord,16,'var(--gold)')}</span>`;
    h+=`<span class="g-transit-label">Lord of the Year: ${prof.yearLord} (${prof.yearSign})</span></div>`;
    h+=`<div class="g-transit-body">${lordFrameText}</div>`;
    h+=`<div class="g-transit-house">Monthly lord: ${prof.monthLord} (${prof.monthSign})</div></div>`;
  }

  // Moon condition
  if(moonSign){
    h+=`<div class="g-transit" style="border-left-color:var(--violet)">`;
    h+=`<div class="g-transit-head"><div class="g-moon-icon" style="margin-right:4px">${renderMoonSVG(phaseAngle||0,20)}</div>`;
    h+=`<span class="g-transit-label">${mPhase.name} in ${moonSign.name}</span>`;
    if(vocResult&&vocResult.voc)h+=`<span class="g-tag" style="background:var(--violet-soft);color:var(--violet)">VOC</span>`;
    h+=`</div>`;
    const msf=moonSignPhaseText(moonSign.name,mPhase.name);
    h+=`<div class="g-transit-body">${msf}</div></div>`;
  }

  // Top transits (contributing, not standalone)
  const top=transits.filter(t=>t.importance>12).slice(0,4);
  if(top.length){
    for(const t of top){
      const av=ASPECT_VOICE[t.aspect.name]||{};const hv=HOUSE_VOICE[t.house]||{};
      const aspCol=t.aspect.type==='hard'?'var(--crimson)':t.aspect.type==='easy'?'var(--azure)':'var(--gold)';
      const motionTag=t.aspect.motion==='exact'?'<span class="g-tag exact">Exact</span>':t.aspect.motion==='applying'?'<span class="g-tag applying">Building</span>':'<span class="g-tag separating">Fading</span>';
      const tpName=t.tp==='NorthNode'?'North Node':t.tp;
      const npName=t.np==='NorthNode'?'North Node':t.np==='Ascendant'?'Ascendant':t.np==='MC'?'Midheaven':t.np;
      h+=`<div class="g-transit" style="border-left-color:${aspCol}">`;
      h+=`<div class="g-transit-head">`;
      h+=`<span class="g-planets">${pSVG(t.tp,16,aspCol)} ${aSVG(t.aspect.name,12,aspCol)} ${pSVG(t.np==='Ascendant'||t.np==='MC'?'Sun':t.np,16,'var(--text)')}</span>`;
      h+=`<span class="g-transit-label">${tpName} ${av.label||t.aspect.name} ${npName}</span>`;
      h+=motionTag;
      h+=`</div>`;
      const composedBody=composeTransitText(t.tp,t.np,t.aspect.name,t.aspect.type,t.house);
      h+=`<div class="g-transit-body">${composedBody}${dignityContext(t.tp,t.tLon)}</div>`;
      if(hv.name)h+=`<div class="g-transit-house">House ${t.house}: ${hv.name}</div>`;
      h+=`</div>`;
    }
  }

  // Focus areas
  const houseEntries=Object.entries(activeHouses).sort((a,b)=>b[1]-a[1]).slice(0,3);
  if(houseEntries.length){
    h+=`<div class="g-focus-grid" style="margin-top:8px">`;
    for(const [hNum] of houseEntries){
      const hv=HOUSE_VOICE[parseInt(hNum)]||{};
      h+=`<div class="g-focus-card"><div class="g-focus-num">H${hNum}</div><div class="g-focus-name">${hv.name||'House '+hNum}</div></div>`;
    }
    h+=`</div>`;
  }

  h+=`</div>`; // end layer2

  // ═══ LAYER 3: MECHANICS (collapsed) ═══
  h+=`<div class="g-section-title" style="cursor:pointer" onclick="toggleLayer3()">Mechanics <span id="l3-arrow" style="font-size:10px;opacity:.5">${layersExpanded.l3?'&#9660;':'&#9654;'}</span></div>`;
  h+=`<div id="layer3" style="display:${layersExpanded.l3?'block':'none'}">`;

  // Exact positions and aspects
  if(top.length){
    h+=`<div style="font-size:11px;line-height:1.8;color:var(--text2);font-family:monospace">`;
    for(const t of transits.filter(tt=>tt.importance>8).slice(0,8)){
      const tpName=t.tp==='NorthNode'?'N.Node':t.tp;
      const npName=t.np==='NorthNode'?'N.Node':t.np==='Ascendant'?'ASC':t.np==='MC'?'MC':t.np;
      const dig=getDignity(t.tp,t.tLon);const digStr=dig?` [${dig.label}]`:'';
      h+=`${tpName} ${fmtShort(t.tLon)}${digStr} ${t.aspect.name} ${npName} ${fmtShort(t.nLon)} · ${t.aspect.orbActual.toFixed(1)} orb · ${t.aspect.motion}`;
      if(t.exactDate)h+=` · exact ${fmtExactDate(t.exactDate)}`;
      h+=`<br>`;
    }
    h+=`</div>`;
  }

  // Planetary hour detail
  if(pHours){
    h+=`<div style="font-size:11px;color:var(--text2);margin-top:8px">`;
    h+=`Day of ${pHours.dayRuler} · Sunrise ${fmtHourTime(pHours.sunrise)} · Sunset ${fmtHourTime(pHours.sunset)}`;
    h+=`<br>Sect: Nocturnal chart · Sect light: Moon · Sect benefic: Venus · Sect malefic: Mars`;
    h+=`</div>`;
  }

  // Profection detail
  h+=`<div style="font-size:11px;color:var(--text2);margin-top:4px">`;
  h+=`Profection: Age ${prof.ageYears} → ${prof.yearSign} (${prof.yearLord}) · Month: ${prof.monthSign} (${prof.monthLord})`;
  h+=`<br>ASC ${fmtShort(NATAL.Ascendant)} · MC ${fmtShort(NATAL.MC)}`;
  h+=`</div>`;

  h+=`</div>`; // end layer3

  return h;
}
