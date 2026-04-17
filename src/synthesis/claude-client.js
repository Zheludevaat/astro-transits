// ══════════════════════════════════════════════════════════════
// synthesis/claude-client.js — Anthropic API bridge
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const CLAUDE_KEY_STORAGE='astro_claude_key_v1';
const CLAUDE_CACHE_STORAGE='astro_claude_cache_v1';
const CLAUDE_MODEL='claude-sonnet-4-6';
const CLAUDE_API_URL='https://api.anthropic.com/v1/messages';

function loadClaudeKey(){try{return localStorage.getItem(CLAUDE_KEY_STORAGE)||'';}catch(e){return'';}}
function saveClaudeKey(k){try{if(k)localStorage.setItem(CLAUDE_KEY_STORAGE,k);else localStorage.removeItem(CLAUDE_KEY_STORAGE);}catch(e){}}
function loadClaudeCache(){try{return JSON.parse(localStorage.getItem(CLAUDE_CACHE_STORAGE)||'null');}catch(e){return null;}}
function saveClaudeCache(c){try{localStorage.setItem(CLAUDE_CACHE_STORAGE,JSON.stringify(c));}catch(e){}}

async function callClaude(chartContext,userFocus){
  const key=loadClaudeKey();
  if(!key)throw new Error('No API key set.');
  const userMsg=`Here is today's sky read against the native's nativity.

${userFocus?'The native is asking: '+userFocus+'\n\n':''}Chart context (JSON):
\`\`\`json
${JSON.stringify(chartContext,null,2)}
\`\`\`

Write an integrated reading. Open with the quality of the day, move through the most significant transits, and close by situating today inside the governing ZR period and firdaria. Name the relevant traditional authorities where it strengthens the point.`;

  const body={
    model:CLAUDE_MODEL,
    max_tokens:2048,
    system:CLAUDE_SYSTEM_PROMPT,
    messages:[{role:'user',content:userMsg}]
  };
  const ctrl=new AbortController();
  const timeoutId=setTimeout(()=>ctrl.abort(),60000); // 60s timeout
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
  } catch(e){
    clearTimeout(timeoutId);
    if(e.name==='AbortError')throw new Error('Request timed out after 60s. Check connection and retry.');
    throw e;
  }
  clearTimeout(timeoutId);
  if(!res.ok){
    let errText='';
    try{const j=await res.json();errText=j.error&&j.error.message||JSON.stringify(j);}catch(e){errText=await res.text();}
    // Cap error text length + strip HTML tags to prevent 10MB error pages from bloating state
    errText=String(errText).replace(/<[^>]*>/g,'').slice(0,400);
    const hint=res.status===429?' (rate limited — wait a minute and retry)':res.status===401?' (check your API key)':res.status>=500?' (Anthropic server error — try again shortly)':'';
    throw new Error('API error '+res.status+hint+': '+errText);
  }
  const data=await res.json();
  const text=(data.content||[]).map(c=>c.type==='text'?c.text:'').join('\n').trim();
  return{text,usage:data.usage||null,ts:Date.now()};
}
// SYN_SYNTH_CACHE_KEY, loadSynSynthCache, saveSynSynthCache are in src/ui/widgets/synth-card.js

async function callClaudeSynastry(synCtx){
  const key=loadClaudeKey();
  if(!key)throw new Error('No API key set.');
  const userMsg=`Here is the synastry data for ${synCtx.personA.name} and ${synCtx.personB.name}.

Chart context (JSON):
\`\`\`json
${JSON.stringify(synCtx,null,2)}
\`\`\`

Write an integrated synastry reading. Open with the overall chemistry and tone of the relationship, move through the most significant inter-chart contacts, discuss the growth edges, and close with the long-term potential. Name the relevant aspects concretely.`;

  const body={
    model:CLAUDE_MODEL,
    max_tokens:2048,
    system:CLAUDE_SYNASTRY_PROMPT,
    messages:[{role:'user',content:userMsg}]
  };
  const ctrl=new AbortController();
  const timeoutId=setTimeout(()=>ctrl.abort(),60000);
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
    if(e.name==='AbortError')throw new Error('Request timed out after 60s.');
    throw e;
  }
  clearTimeout(timeoutId);
  if(!res.ok){
    let errText='';
    try{const j=await res.json();errText=j.error&&j.error.message||JSON.stringify(j);}catch(e){errText=await res.text();}
    errText=String(errText).replace(/<[^>]*>/g,'').slice(0,400);
    const hint=res.status===429?' (rate limited)':res.status===401?' (check API key)':'';
    throw new Error('API error '+res.status+hint+': '+errText);
  }
  const data=await res.json();
  const text=(data.content||[]).map(c=>c.type==='text'?c.text:'').join('\n').trim();
  return{text,usage:data.usage||null,ts:Date.now()};
}
