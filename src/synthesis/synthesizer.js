// ══════════════════════════════════════════════════════════════
// synthesis/synthesizer.js — Top-level day-shape synthesizer
// Phase 1.2: LLM-first with deterministic fallback
// ══════════════════════════════════════════════════════════════

// State for background LLM generation
let _dayShapeLLMPending=false;
let _dayShapeLLMDate=null;

// Main entry point: returns {text, source, timestamp}
function synthesizeDayShape(ctx){
  const dateKey=ctx.dateStr||new Date().toLocaleDateString('en-CA');

  // 1. Check LLM cache first
  const cached=loadClaudeCache();
  if(cached&&cached.dateKey===dateKey&&cached.dayShape){
    return {text:cached.dayShape,source:'claude',timestamp:cached.ts||null};
  }

  // 2. Deterministic fallback (always available, <50ms)
  const deterText=generateDayShapeDeterministic(ctx);

  // 3. Kick off background LLM generation if today and key exists and not already pending
  if(ctx.isToday&&!_dayShapeLLMPending&&_dayShapeLLMDate!==dateKey){
    const key=loadClaudeKey();
    if(key){
      _dayShapeLLMPending=true;
      _dayShapeLLMDate=dateKey;
      backgroundGenerateDayShape(ctx,dateKey).catch(()=>{}).finally(()=>{_dayShapeLLMPending=false;});
    }
  }

  return {text:deterText,source:'deterministic',timestamp:null};
}

// Background LLM call — replaces Layer 1 when done
async function backgroundGenerateDayShape(ctx,dateKey){
  try{
    const chartCtx=buildChartContext(ctx.jd,ctx.cur,ctx.transits,ctx.mPhase,ctx.vocResult,
      ctx.moonSign,ctx.prof,ctx.pHours,ctx.retros,ctx.vibe,ctx.phaseAngle);
    const result=await callClaude(chartCtx);
    if(result&&result.text){
      // Cache the LLM result
      const cache=loadClaudeCache()||{};
      cache.dateKey=dateKey;
      cache.dayShape=result.text;
      cache.ts=Date.now();
      cache.usage=result.usage;
      saveClaudeCache(cache);
      // Re-render to show LLM result
      renderApp();
    }
  }catch(e){
    console.warn('Background day-shape LLM failed:',e.message);
  }
}

// Deterministic day-shape paragraph with citation tokens
// Spec: 80-180 words, no glyphs, no degree numbers, no aspect names in prose
function generateDayShapeDeterministic(ctx){
  const sentences=[];

  // 1. Opening by vibe and dominant planet
  sentences.push(openingByVibeAndDominant(ctx.vibe,ctx.dominant));

  // 2. Annual/monthly lord context
  const lordSent=annualMonthlyContextSentence(ctx.prof);
  if(lordSent)sentences.push(lordSent);

  // 3. Moon condition
  const moonSent=moonShapeSentence(ctx.moonSign,ctx.mPhase,ctx.vocResult,ctx.mansion);
  if(moonSent)sentences.push(moonSent);

  // 4. Top transit
  const transitSent=topTransitSentence(ctx.topTransits,ctx.prof);
  if(transitSent)sentences.push(transitSent);

  // 5. Hour/day guidance
  const hourSent=hourGuidanceSentence(ctx.currentHour,ctx.dayRuler);
  if(hourSent)sentences.push(hourSent);

  return sentences.filter(Boolean).join(' ');
}

// ── Helper composers (draw from existing voice corpora) ──

function openingByVibeAndDominant(vibe,dominant){
  const seed=todaySeed();
  const s=vibe?vibe.score:5;
  if(s>=8){
    const pool=['The day opens with clear support from the spheres.','Something aligns today that has not aligned in a while.','The cosmic weather favors your efforts today.','A genuinely constructive day — the planets cooperate.'];
    return pick(pool,seed);
  }
  if(s<=3){
    const pool=['Today asks for patience and precision, not ambition.','The day carries friction that is best met with steadiness.','Not a day for launching — a day for navigating.','The sky is pressured. Move deliberately and keep your powder dry.'];
    return pick(pool,seed);
  }
  // Mixed (4-7)
  const dom=dominant?(SPHERE[dominant]||{}).name||dominant:null;
  if(dom){
    const pool=[
      `${dom} sets the tone today — its themes run through everything.`,
      `The day belongs to ${dom}. Let its nature guide your priorities.`,
      `${dom} is the loudest voice in the sky today.`
    ];
    return pick(pool,seed);
  }
  const pool=['A day of moderate cosmic weather — nothing dominates, and your own priorities can lead.','The planets offer a mixed signal today. Read the room before you act.','Neither easy nor harsh — the day rewards attentiveness over boldness.'];
  return pick(pool,seed);
}

function annualMonthlyContextSentence(prof){
  if(!prof)return null;
  const seed=todaySeed();
  const yearLord=prof.yearLord;
  const monthLord=prof.monthLord;
  const yearTheme=(ANNUAL_THEME&&ANNUAL_THEME[prof.yearSign])?ANNUAL_THEME[prof.yearSign]:'';
  const monthTheme=(MONTH_THEME&&MONTH_THEME[prof.monthSign])?MONTH_THEME[prof.monthSign]:'';

  if(yearLord===monthLord){
    return `Your year-lord and month-lord are the same — [profection-year:${yearLord}] doubles its influence. ${yearTheme?yearTheme.split('.')[0]+'.':'Everything funnels through a single planetary intelligence.'}`;
  }

  const frames=[
    `[profection-year:${yearLord}] governs the year while [profection-month:${monthLord}] shapes this month's texture.`,
    `This is ${yearLord}'s year and ${monthLord}'s month — [profection-year:${yearLord}] sets the arc, [profection-month:${monthLord}] colors the present.`,
    `The annual theme runs through [profection-year:${yearLord}]; the monthly filter is [profection-month:${monthLord}].`
  ];
  return pick(frames,seed);
}

function moonShapeSentence(moonSign,mPhase,vocResult,mansion){
  if(!moonSign)return null;
  const seed=todaySeed();
  const signName=moonSign.name||moonSign;

  if(vocResult&&vocResult.voc){
    const endH=vocResult.endsIn;
    let timing='later today';
    if(typeof endH==='number'&&endH<2)timing='within the next couple of hours';
    else if(typeof endH==='number'&&endH<8)timing='later today';
    else if(typeof endH==='number')timing='not until tomorrow';
    return `The Moon is void of course in ${signName} [mansion] — a pause in the emotional rhythm. ${timing==='within the next couple of hours'?'The pause lifts soon.':'Finish what is in motion; don\'t start what is new.'}`;
  }

  const phaseName=mPhase?mPhase.name:'';
  const mansionNote=mansion?` [mansion]`:'';
  const frames=[
    `Moon in ${signName}, ${phaseName}${mansionNote} — ${getMoonOneLiner(signName,phaseName)}.`,
    `The ${phaseName} Moon moves through ${signName}${mansionNote}, ${getMoonOneLiner(signName,phaseName).toLowerCase()}.`,
  ];
  return pick(frames,seed);
}

function getMoonOneLiner(signName,phaseName){
  // Draw first sentence from MOON_SIGN_PHASE if available
  if(typeof MOON_SIGN_PHASE!=='undefined'&&MOON_SIGN_PHASE[signName]&&MOON_SIGN_PHASE[signName][phaseName]){
    const full=MOON_SIGN_PHASE[signName][phaseName];
    return full.split('.')[0];
  }
  // Fallback
  if(typeof MOON_SIGN_FLAVOR!=='undefined'&&MOON_SIGN_FLAVOR[signName]){
    return MOON_SIGN_FLAVOR[signName].split('.')[0];
  }
  return 'the emotional tone shifts subtly';
}

function topTransitSentence(topTransits,prof){
  if(!topTransits||!topTransits.length)return null;
  const t=topTransits[0];
  if(!t||t.importance<10)return null;
  const seed=todaySeed();
  const tpName=t.tp==='NorthNode'?'the North Node':t.tp;
  const npName=t.np==='NorthNode'?'your North Node':t.np==='Ascendant'?'your rising sign':t.np==='MC'?'your public standing':'your '+t.np;
  const token=`[transit:${t.tp}-${t.np}]`;

  // Is this the year lord being transited?
  const isYearLord=prof&&(t.np===prof.yearLord||t.tp===prof.yearLord);

  if(t.aspect.type==='hard'){
    const pool=[
      `${tpName} presses against ${npName} ${token} — the friction is not random, it is diagnostic.`,
      `Expect tension from ${tpName} bearing down on ${npName} ${token}. What resists reveals where the work is.`,
      `The pressure from ${tpName} on ${npName} ${token} asks for patience, not panic.`
    ];
    let s=pick(pool,seed);
    if(isYearLord)s+=' This touches the year\'s central arc.';
    return s;
  }
  if(t.aspect.type==='easy'){
    const pool=[
      `${tpName} supports ${npName} ${token} — a current you can ride if you notice it.`,
      `Good news from ${tpName} reaching ${npName} ${token}. The support is genuine; use it.`,
      `${tpName} offers cooperation to ${npName} ${token}. The path of least resistance is also the right one today.`
    ];
    return pick(pool,seed);
  }
  // Conjunction
  const pool=[
    `${tpName} merges with ${npName} ${token} — a concentration of energy that changes everything it touches.`,
    `${tpName} sits directly on ${npName} ${token}. The themes fuse and something new emerges from the overlap.`
  ];
  return pick(pool,seed);
}

function hourGuidanceSentence(currentHour,dayRuler){
  if(!currentHour&&!dayRuler)return null;
  const seed=todaySeed();
  const ruler=currentHour?currentHour.ruler:null;
  const brief=ruler&&typeof hourBrief==='function'?hourBrief(ruler):'';

  if(ruler&&dayRuler&&ruler===dayRuler){
    return `This is both the day and the [hour] of ${ruler} — its signal is doubled. ${brief?brief:''}`;
  }
  if(ruler){
    return `The current [hour] belongs to ${ruler}. ${brief?brief:'Pay attention to its nature.'}`;
  }
  if(dayRuler){
    const dayTone=(typeof DAY_RULER_TONE!=='undefined'&&DAY_RULER_TONE[dayRuler])?DAY_RULER_TONE[dayRuler]:'';
    return `Today is ${dayRuler}'s day. ${dayTone||'Let its nature set the background rhythm.'}`;
  }
  return null;
}
