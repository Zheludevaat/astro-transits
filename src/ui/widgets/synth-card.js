// ============================================================================
// synth-card.js — Synthesis/consultation UI state, generation, and key setup
// Extracted from index.html (Phase 0 — pure mechanical extraction)
// ============================================================================

// -- Synastry Claude synthesis cache --
const SYN_SYNTH_CACHE_KEY='astro_syn_synth_cache_v1';
function loadSynSynthCache(){try{return JSON.parse(localStorage.getItem(SYN_SYNTH_CACHE_KEY)||'null');}catch(e){return null;}}
function saveSynSynthCache(c){try{localStorage.setItem(SYN_SYNTH_CACHE_KEY,JSON.stringify(c));}catch(e){}}

// -- Synastry synthesis state --
let synSynthResult=loadSynSynthCache(),synSynthLoading=false,synSynthError='',synSynthExpanded=false;

// -- Transit synthesis state --
let synthKey=loadClaudeKey(),synthFocus='',synthLoading=false,synthError='',
    synthResult=loadClaudeCache(),synthKeyVisible=false,synthSettingsOpen=false,synthExpanded=false,
    synthTab=(loadClaudeKey()?'consult':'setup'),synthCopied=false;
function synthToggleExpanded(){synthExpanded=!synthExpanded;renderApp();}
function synthSelectTab(t){synthTab=t;renderApp();}
function synthSetKey(k){synthKey=k;saveClaudeKey(k);if(k&&k.trim())synthTab='consult';renderApp();}
function synthCopyOutput(){
  if(!synthResult||!synthResult.text)return;
  const txt=synthResult.text;
  const doFlag=()=>{synthCopied=true;renderApp();setTimeout(()=>{synthCopied=false;renderApp();},1800);};
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(doFlag).catch(()=>{
      const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();
      try{document.execCommand('copy');doFlag();}catch(e){}finally{document.body.removeChild(ta);}
    });
  } else {
    const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');doFlag();}catch(e){}finally{document.body.removeChild(ta);}
  }
}
function synthShareOutput(){
  if(!synthResult||!synthResult.text)return;
  const txt=synthResult.text;
  if(navigator.share){
    navigator.share({title:'Astrological Consultation',text:txt}).catch(()=>{});
  } else {
    synthCopyOutput();
  }
}
function synthRenderBlocks(text){
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const blocks=text.split(/\n\s*\n+/).map(s=>s.trim()).filter(Boolean);
  return blocks.map(b=>`<div class="synth-section">${esc(b).replace(/\n/g,'<br>')}</div>`).join('');
}
function synthClearKey(){if(confirm('Remove saved API key?')){synthKey='';saveClaudeKey('');renderApp();}}
function renderInlineKeySetup(){
  let s='';
  s+=`<div class="synth-sub">Bring your own Anthropic API key. Requests go directly from this device to Anthropic — no intermediate server.</div>`;
  s+=`<div class="synth-field">`;
  s+=`<label class="synth-field-label">Anthropic API Key ${synthKey?'<span style="color:var(--emerald);font-weight:700">· saved</span>':'<span class="optional">(required)</span>'}</label>`;
  s+=`<input class="synth-input" type="${synthKeyVisible?'text':'password'}" placeholder="sk-ant-..." value="${(synthKey||'').replace(/"/g,'&quot;')}" onchange="synthSetKey(this.value)" oninput="synthKey=this.value" onclick="event.stopPropagation()">`;
  s+=`</div>`;
  s+=`<div class="synth-row" style="margin-bottom:10px">`;
  s+=`<button class="synth-btn secondary" onclick="synthToggleKeyVisible()">${synthKeyVisible?'Hide':'Show'}</button>`;
  if(synthKey)s+=`<button class="synth-btn secondary" onclick="synthClearKey()">Remove</button>`;
  s+=`</div>`;
  s+=`<div class="synth-safety"><strong>On privacy:</strong> your key lives only in this browser\'s localStorage. It never leaves your device except as an Authorization header to Anthropic.</div>`;
  return s;
}
function synthSetFocus(f){synthFocus=f;}
function synthToggleKeyVisible(){synthKeyVisible=!synthKeyVisible;renderApp();}
function synthToggleSettings(){synthSettingsOpen=!synthSettingsOpen;renderApp();}
async function synthGenerate(){
  if(!synthKey){synthError='Please add your Anthropic API key in settings first.';renderApp();return;}
  // Token discipline: if there's a reading from <1hr ago, confirm before spending tokens.
  if(synthResult&&synthResult.ts){
    const ageMin=Math.round((Date.now()-synthResult.ts)/60000);
    if(ageMin<60){
      if(!confirm('You already have a reading from '+ageMin+' min ago. Generate a new one? (uses API tokens)'))return;
    }
  }
  synthLoading=true;synthError='';renderApp();
  try{
    const now=getTargetDate();
    const jd=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours()+now.getUTCMinutes()/60);
    const cur=computeAll(jd);
    const T=jdToT(jd);
    const mPhase=moonPhaseInfo(moonPhase(T));
    const moonSign=signOf(cur.Moon);
    const phaseAngle=moonPhase(T);
    const vocResult=isVoidOfCourse(cur.Moon,jd);
    const retros=['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'].filter(p=>{const ms=motionStatus(p,jd);return ms&&ms.retrograde;});
    const prof=computeProfections(now);
    const pHours=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
    const lots=computeLots(cur,NATAL.Ascendant,SECT.isNocturnal);
    const mansion=computeMansion(cur.Moon);
    // Transits
    const TPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
    const NPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode','Ascendant','MC'];
    const transits=[];
    for(const tp of TPS){for(const np of NPS){
      if(tp===np&&!['Saturn','Jupiter','Mars','Chiron','NorthNode'].includes(tp))continue;
      const asp=findAspect(cur[tp],NATAL[np],tp,np,jd);
      if(asp)transits.push({tp,np,aspect:asp,importance:transitImportance(tp,np,asp)});
    }}
    const vibe=vibeCalc(transits);
    const stats={};
    // ZR current
    const birthDate=new Date(Date.UTC(BIRTH.year,BIRTH.month-1,BIRTH.day,Math.floor(BIRTH.hour),Math.round((BIRTH.hour%1)*60)));
    const ageYears=(now.getTime()-birthDate.getTime())/(365.2425*86400000);
    const spiritIdx=Math.floor(norm(lots.Spirit)/30);
    const zrMajors=computeZR(spiritIdx,birthDate,Math.max(ageYears+15,60));
    const zrCur=findCurrentZRPeriod(zrMajors,ageYears);
    const firdaria=computeFirdaria(birthDate,SECT.isNocturnal);
    const firCur=findCurrentFirdaria(firdaria,ageYears);
    const ctx=buildChartContext(cur,jd,transits,vibe,mPhase,retros,stats,vocResult,moonSign,phaseAngle,prof,pHours,lots,mansion,null,firCur,zrCur&&zrCur.l1,zrCur&&zrCur.l2);
    const result=await callClaude(ctx,synthFocus.trim());
    synthResult=result;saveClaudeCache(result);
    // Auto-expand a fresh reading the first time it appears
    setSynthOutputCollapsed(false);
    synthLoading=false;renderApp();
  }catch(e){
    synthError=e.message||String(e);
    synthLoading=false;renderApp();
  }
}

async function synSynthGenerate(){
  if(!synthKey){synSynthError='Please add your Anthropic API key first.';renderApp();return;}
  if(synSynthResult&&synSynthResult.ts){
    const ageMin=Math.round((Date.now()-synSynthResult.ts)/60000);
    if(ageMin<60){if(!confirm('You have a reading from '+ageMin+' min ago. Generate a new one?'))return;}
  }
  synSynthLoading=true;synSynthError='';renderApp();
  try{
    const chartA=savedCharts.find(c=>c.id==='alexander');
    const chartB=savedCharts.find(c=>c.id===selectedChartId);
    if(!chartA||!chartB)throw new Error('Select a person first.');
    const{natal:natalA,jd:jdA}=getChartNatal(chartA);
    const{natal:natalB,jd:jdB}=getChartNatal(chartB);
    const housesA=computeWholeSignHouses(natalA.Ascendant);
    const housesB=computeWholeSignHouses(natalB.Ascendant);
    const aspects=computeSynastryAspects(natalA,natalB);
    const traditional=computeSynastryTraditional(natalA,housesA,natalB,housesB,jdA,jdB,aspects);
    const ctx=buildSynastryContext(natalA,natalB,aspects,traditional,chartA.name,chartB.name);
    const result=await callClaudeSynastry(ctx);
    synSynthResult=result;saveSynSynthCache(result);
    synSynthExpanded=true;
    synSynthLoading=false;renderApp();
  }catch(e){
    synSynthError=e.message||String(e);
    synSynthLoading=false;renderApp();
  }
}
