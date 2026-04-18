// ══════════════════════════════════════════════════════════════
// chat.js — Floating per-tab Claude chat
// Each tab gets a tuned system prompt + auto-injected context
// Uses the same API key from Settings (loadClaudeKey)
// ══════════════════════════════════════════════════════════════

// ── State ──
let chatOpen=false;
let chatMessages=[];     // [{role:'user'|'assistant',text:'...'}]
let chatLoading=false;
let chatError='';
let chatInput='';
let chatTabContext=null;  // which tab context was last built for
const CHAT_MODEL='claude-sonnet-4-6';
const CHAT_STORAGE_KEY='astro_chat_history_v1';

// Persist chat per tab
let chatHistories={};  // keyed by tab context id
function chatContextId(){
  if(activeTab==='tools') return 'tools-'+toolsSubTab;
  return activeTab;
}
function loadChatHistory(){
  try{chatHistories=JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)||'{}');}catch(e){chatHistories={};}
}
function saveChatHistory(){
  try{localStorage.setItem(CHAT_STORAGE_KEY,JSON.stringify(chatHistories));}catch(e){}
}
function switchChatContext(){
  const id=chatContextId();
  if(chatTabContext!==id){
    // Save current
    if(chatTabContext) chatHistories[chatTabContext]=chatMessages;
    // Load new
    chatTabContext=id;
    chatMessages=chatHistories[id]||[];
  }
}

// ── Per-tab system prompts ──
const CHAT_PROMPTS={
  home:`You are a warm, knowledgeable astrology guide helping a user understand their daily astrological landscape. You have access to their birth chart data and current sky conditions. Be conversational, practical, and encouraging. Explain astrological concepts in plain English when the user seems unfamiliar. Keep responses concise (under 200 words) unless asked to elaborate. Never recommend medical, legal, or financial actions.`,

  today:`You are a traditional astrologer discussing today's transits, planetary hours, and timing with the user. You have their full transit list, void-of-course status, profection year/month lords, and current planetary hour. Ground every observation in the actual positions provided. Be specific about timing — when transits are exact, how long they last, which house they activate. Keep responses under 200 words unless asked to elaborate. Favor practical guidance: "this afternoon's Venus hour is good for..." rather than abstract symbolism.`,

  natal:`You are a traditional astrologer discussing the user's birth chart in depth. You have their complete natal positions, house placements, dignities, and natal aspects. Help them understand their chart as a living document — what the placements mean individually and as a system. Explain sect, dignity, and rulership chains when relevant. Be warm but intellectually rigorous. Use Hellenistic doctrine (Valens, Ptolemy) as your foundation. Keep responses under 250 words unless asked to elaborate.`,

  'tools-synastry':`You are a traditional astrologer discussing the synastry (relationship compatibility) between two people. You have both natal charts, their inter-chart aspects, traditional compatibility factors (sect harmony, Venus-Mars contacts, Saturn bonds), and house overlays. Be honest about challenges while offering constructive framing. Discuss chemistry, communication, growth edges, and long-term potential. Address the user directly and refer to the partner by name when known. Keep responses under 250 words unless asked to elaborate.`,

  'tools-elect':`You are a traditional astrologer helping the user choose the best time for a specific action. You understand electional principles: avoid VOC Moon, favor the planetary hour matching the activity, check the applying aspects of the Moon, consider the profection year-lord. Help the user think through timing decisions practically. Keep responses under 200 words unless asked to elaborate.`,

  'tools-lore':`You are an astrology teacher explaining traditional concepts, terminology, and techniques. You have deep knowledge of Hellenistic, Medieval, and Renaissance astrology. Explain terms clearly with examples from the user's own chart when possible. Reference source texts (Valens, Ptolemy, Abu Ma'shar, Bonatti, Lilly) when it strengthens the explanation. Keep responses under 250 words unless asked to elaborate.`,

  'tools-map':`You are a traditional astrologer discussing astrocartography and relocation astrology. Help the user understand how different locations shift their chart angles and activate different planetary lines. Discuss what living or traveling to a particular place might emphasize in their experience. Keep responses under 200 words unless asked to elaborate.`,

  'tools-ledger':`You are an astrology research assistant helping the user analyze their journal entries, mood patterns, and synthesis accuracy ratings. Look for correlations between astrological conditions and recorded experiences. Be data-driven and honest — point out where the data supports or contradicts traditional expectations. Keep responses under 200 words unless asked to elaborate.`
};

// ── Context builders per tab ──
function buildChatContext(){
  const id=chatContextId();
  try{
    const now=getTargetDate();
    const jd=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours()+now.getUTCMinutes()/60);
    const cur=computeAll(jd);
    const T=jdToT(jd);

    if(id==='home'||id==='today'){
      const moonSign=signOf(cur.Moon);
      const mPhase=moonPhaseInfo(moonPhase(T));
      const vocResult=isVoidOfCourse(cur.Moon,jd);
      const retros=['Mercury','Venus','Mars','Jupiter','Saturn'].filter(p=>{const ms=motionStatus(p,jd);return ms&&ms.retrograde;});
      const prof=computeProfections(now);
      const pHours=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
      let curHour=null;
      if(pHours){
        const utNow=now.getUTCHours()+now.getUTCMinutes()/60;
        const idx=currentHourIndex(pHours.hours,utNow);
        curHour=pHours.hours[idx];
      }
      // Top transits
      const TPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
      const NPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Ascendant','MC'];
      const transits=[];
      for(const tp of TPS){for(const np of NPS){
        if(tp===np)continue;
        const asp=findAspect(cur[tp],NATAL[np],tp,np,jd);
        if(asp)transits.push({tp,np,aspect:asp.name,orb:asp.orbActual.toFixed(1),motion:asp.motion,importance:transitImportance(tp,np,asp)});
      }}
      transits.sort((a,b)=>b.importance-a.importance);
      return JSON.stringify({
        date:now.toISOString().split('T')[0],
        moonSign:moonSign.name,moonPhase:mPhase.name,
        voc:vocResult.voc,vocEndsIn:vocResult.voc?Math.round(vocResult.endsIn*60)+'min':null,
        planetaryHour:curHour?curHour.ruler:null,
        profection:{yearLord:prof.yearLord,monthLord:prof.monthLord},
        retrogrades:retros,
        topTransits:transits.slice(0,8).map(t=>t.tp+' '+t.aspect+' natal '+t.np+' ('+t.orb+'°, '+t.motion+')')
      },null,1);
    }

    if(id==='natal'){
      const planets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
      const positions={};
      for(const p of planets){
        const lon=NATAL[p];const sign=signOf(lon);const house=houseOf(lon);
        const dig=getDignity(p,lon);
        positions[p]={sign:sign.name,degree:sign.degree,house,dignity:dig?dig.label:null};
      }
      const aspects=findNatalAspects().slice(0,15).map(a=>a.p1+' '+a.aspect+' '+a.p2+' ('+a.orb.toFixed(1)+'°)');
      return JSON.stringify({natalPositions:positions,natalAspects:aspects,ascendant:signOf(NATAL.Ascendant).name,mc:signOf(NATAL.MC).name,sect:SECT.isNocturnal?'nocturnal':'diurnal'},null,1);
    }

    if(id==='tools-synastry'){
      if(typeof selectedChartId!=='undefined'&&selectedChartId&&typeof savedCharts!=='undefined'){
        const chartB=savedCharts.find(c=>c.id===selectedChartId);
        if(chartB){
          const{natal:natalB}=getChartNatal(chartB);
          const aspects=computeSynastryAspects(NATAL,natalB);
          return JSON.stringify({
            personA:'Alexander',
            personB:chartB.name,
            topAspects:aspects.slice(0,12).map(a=>a.pA+' '+a.aspect+' '+a.pB+' ('+a.orb.toFixed(1)+'°)')
          },null,1);
        }
      }
      return '{"note":"No synastry partner selected yet. The user can still ask general synastry questions."}';
    }

    if(id==='tools-elect'){
      const vocResult=isVoidOfCourse(cur.Moon,jd);
      const pHours=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
      const moonSign=signOf(cur.Moon);
      return JSON.stringify({
        currentMoonSign:moonSign.name,
        voc:vocResult.voc,
        planetaryHours:pHours?pHours.hours.slice(0,12).map(h=>h.ruler+' ('+h.start.toFixed(1)+'h UTC)'):null
      },null,1);
    }

    // Lore, Map, Ledger — minimal context
    return '{}';
  }catch(e){
    console.error('buildChatContext:',e);
    return '{}';
  }
}

// ── API call with streaming ──
async function chatSend(){
  const key=loadClaudeKey();
  if(!key){chatError='Add your Claude API key in Settings first.';renderApp();return;}
  const text=chatInput.trim();
  if(!text)return;

  switchChatContext();
  chatMessages.push({role:'user',text});
  chatInput='';
  chatLoading=true;chatError='';
  renderApp();

  // Auto-scroll chat to bottom
  requestAnimationFrame(()=>{
    const el=document.getElementById('chat-messages');
    if(el)el.scrollTop=el.scrollHeight;
  });

  const id=chatContextId();
  const sysPrompt=CHAT_PROMPTS[id]||CHAT_PROMPTS.home;
  const ctx=buildChatContext();

  // Build message history (keep last 10 exchanges for context window)
  const historyMsgs=chatMessages.slice(-20).map(m=>({role:m.role,content:m.text}));

  // Prepend context as first user message if this is the first or context changed
  const contextMsg={role:'user',content:`[Current astrological context — do not repeat this data back, just use it to ground your answers]\n${ctx}`};
  const assistantAck={role:'assistant',content:'Understood. I have your current chart context. How can I help?'};

  const apiMessages=[contextMsg,assistantAck,...historyMsgs];

  try{
    const res=await fetch(CLAUDE_API_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key':key,
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true'
      },
      body:JSON.stringify({
        model:CHAT_MODEL,
        max_tokens:1024,
        system:sysPrompt,
        messages:apiMessages
      })
    });

    if(!res.ok){
      let errText='';
      try{const j=await res.json();errText=j.error&&j.error.message||JSON.stringify(j);}catch(e){errText=await res.text();}
      errText=String(errText).replace(/<[^>]*>/g,'').slice(0,300);
      const hint=res.status===429?' Rate limited — wait a moment.':res.status===401?' Check your API key.':'';
      throw new Error('API '+res.status+hint+' '+errText);
    }

    const data=await res.json();
    const reply=(data.content||[]).map(c=>c.type==='text'?c.text:'').join('\n').trim();
    chatMessages.push({role:'assistant',text:reply});
    chatHistories[chatTabContext]=chatMessages;
    saveChatHistory();
  }catch(e){
    chatError=e.message||String(e);
  }

  chatLoading=false;
  renderApp();
  requestAnimationFrame(()=>{
    const el=document.getElementById('chat-messages');
    if(el)el.scrollTop=el.scrollHeight;
  });
}

// ── Toggle ──
function toggleChat(){
  chatOpen=!chatOpen;
  if(chatOpen){
    switchChatContext();
    loadChatHistory();
    chatMessages=chatHistories[chatContextId()]||[];
  }
  renderApp();
  if(chatOpen){
    requestAnimationFrame(()=>{
      const inp=document.getElementById('chat-input');
      if(inp)inp.focus();
      const el=document.getElementById('chat-messages');
      if(el)el.scrollTop=el.scrollHeight;
    });
  }
}
function clearChatHistory(){
  const id=chatContextId();
  chatMessages=[];
  chatHistories[id]=[];
  saveChatHistory();
  renderApp();
}

// ── Chat label per tab ──
function chatLabel(){
  const id=chatContextId();
  const labels={
    home:'your day',today:'today\'s sky',natal:'your chart',
    'tools-synastry':'this synastry','tools-elect':'timing',
    'tools-lore':'astrology','tools-map':'this map','tools-ledger':'your journal'
  };
  return labels[id]||'astrology';
}

// ── Render ──
function renderChatButton(){
  const key=loadClaudeKey();
  if(!key)return '';
  return `<div class="chat-fab ${chatOpen?'open':''}" onclick="toggleChat()">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${chatOpen
        ?'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
        :'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>'}
    </svg>
  </div>`;
}

function renderChatPanel(){
  if(!chatOpen)return '';
  const id=chatContextId();
  const label=chatLabel();
  let h='';
  h+=`<div class="chat-panel">`;
  h+=`<div class="chat-header">`;
  h+=`<div class="chat-header-title">Ask Claude about ${label}</div>`;
  h+=`<div class="chat-header-actions">`;
  if(chatMessages.length>0)h+=`<button class="chat-clear" onclick="event.stopPropagation();clearChatHistory()" title="Clear history">Clear</button>`;
  h+=`</div></div>`;

  // Messages
  h+=`<div class="chat-messages" id="chat-messages">`;
  if(chatMessages.length===0){
    h+=`<div class="chat-empty">`;
    h+=`<div class="chat-empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>`;
    h+=`<div class="chat-empty-text">Ask anything about ${label}</div>`;
    h+=`<div class="chat-empty-hint">${chatSuggestions(id)}</div>`;
    h+=`</div>`;
  } else {
    for(const m of chatMessages){
      const cls=m.role==='user'?'chat-msg-user':'chat-msg-assistant';
      const escaped=m.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
      h+=`<div class="${cls}">${escaped}</div>`;
    }
  }
  if(chatLoading){
    h+=`<div class="chat-msg-assistant chat-typing"><span></span><span></span><span></span></div>`;
  }
  if(chatError){
    h+=`<div class="chat-error">${chatError.replace(/</g,'&lt;')}</div>`;
  }
  h+=`</div>`;

  // Input
  h+=`<div class="chat-input-row">`;
  h+=`<input id="chat-input" class="chat-input-field" type="text" placeholder="Ask about ${label}..." value="${(chatInput||'').replace(/"/g,'&quot;')}" onkeydown="if(event.key==='Enter'){event.preventDefault();chatSend()}" oninput="chatInput=this.value" autocomplete="off">`;
  h+=`<button class="chat-send" onclick="chatSend()" ${chatLoading?'disabled':''}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>`;
  h+=`</div>`;
  h+=`</div>`;
  return h;
}

function chatSuggestions(id){
  const s={
    home:'"What should I focus on today?" or "Is this a good day for creative work?"',
    today:'"Tell me about this Saturn transit" or "When does the VOC end?"',
    natal:'"What does my Moon in this sign mean?" or "Explain my Sun-Saturn aspect"',
    'tools-synastry':'"How do we communicate?" or "What are our biggest challenges?"',
    'tools-elect':'"When should I have this conversation?" or "Is tonight good for a date?"',
    'tools-lore':'"What is sect?" or "Explain whole-sign houses"',
    'tools-map':'"What would living in Tokyo activate?" or "Best cities for my career?"',
    'tools-ledger':'"Any patterns in my mood data?" or "When did I rate readings as hits?"'
  };
  return s[id]||'"What does this mean?"';
}

// Init
loadChatHistory();
