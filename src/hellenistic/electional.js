// ══════════════════════════════════════════════════════════════
// hellenistic/electional.js — Electional micro-tool
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const ELECTIONAL_TASKS={
  'hard-convo':{label:'Hard conversation',icon:'Mars',
    idealHour:['Mars','Mercury'],avoidHour:['Venus','Moon'],
    idealMoon:['fire','air'],vocOk:false,
    notes:'Mars hour gives you the edge and directness to say the difficult thing without softening it into meaninglessness. Mercury hour works when the conversation requires nuance, sequencing, or persuasion rather than blunt force. A waxing Moon adds momentum and ensures the conversation leads somewhere rather than circling. Avoid Venus hour — it will tempt you to smooth things over before the real issue surfaces.'},
  'reconcile':{label:'Reconcile / repair',icon:'Venus',
    idealHour:['Venus','Jupiter','Moon'],avoidHour:['Mars','Saturn'],
    idealMoon:['water','earth'],vocOk:true,
    notes:'Venus hour softens both parties and makes vulnerability feel safe. Jupiter hour brings generosity of spirit — the willingness to forgive more than what feels fair. Moon hour adds emotional honesty and receptivity. Mars hour turns the reconciliation into a new argument; Saturn hour hardens both positions and makes forgiveness feel like weakness. Water or earth Moons ground the emotional work.'},
  'send-email':{label:'Send important email',icon:'Mercury',
    idealHour:['Mercury','Jupiter'],avoidHour:['Saturn'],
    idealMoon:['air','fire'],vocOk:false,
    notes:'Mercury governs all correspondence — the hour sharpens your phrasing and ensures the message reads as intended. Jupiter hour if the email is asking for something, as Jupiter governs generosity and the willingness to say yes. Avoid Void of Course Moon: emails sent during VOC tend to get ignored, misread, or lost in the inbox. Saturn hour makes your tone heavier than you intend.'},
  'sign-contract':{label:'Sign contract',icon:'Jupiter',
    idealHour:['Jupiter','Mercury','Sun'],avoidHour:['Saturn','Mars','Moon'],
    idealMoon:['earth','fire'],vocOk:false,retroAvoid:['Mercury'],
    notes:'Jupiter hour expands what it touches — contracts signed under Jupiter tend to grow beyond their initial scope in favorable ways. Mercury hour ensures the language is precise and both parties understand the terms. Avoid Mercury retrograde absolutely: miscommunication hides in the fine print, and terms you thought were clear get reinterpreted later. Saturn hour buries restrictions you will not see until they bind you. VOC Moon means the contract never quite takes hold.'},
  'ask-favor':{label:'Ask for help / favor',icon:'Jupiter',
    idealHour:['Jupiter','Sun','Venus'],avoidHour:['Saturn','Mars'],
    idealMoon:['fire','air'],vocOk:false,
    notes:'Jupiter is the planet of generosity — its hour makes people more willing to give. Sun hour works when approaching authority figures, as the solar principle respects directness and dignified requests. Venus hour suits personal favors where charm and warmth matter more than hierarchy. A waxing Moon is significantly better than waning: the waxing phase builds toward yes, while waning energy dissipates before commitment lands. Saturn hour makes the other person feel burdened by your ask.'},
  'date':{label:'Date / romance',icon:'Venus',
    idealHour:['Venus','Moon','Jupiter'],avoidHour:['Saturn','Mars'],
    idealMoon:['water','earth'],vocOk:true,
    notes:'Venus is the classical ruler of love, beauty, and attraction — her hour makes both people more open, more charming, and more willing to be seen. Moon hour deepens emotional connection and makes the conversation feel intimate rather than performative. Jupiter hour adds levity, laughter, and the feeling that anything is possible. Avoid Saturn hour: it makes the date feel like an interview. Avoid Mars hour: it introduces friction, competitiveness, or the wrong kind of heat.'},
  'start-project':{label:'Begin a project',icon:'Sun',
    idealHour:['Sun','Jupiter','Mars'],avoidHour:['Saturn','Moon'],
    idealMoon:['fire','earth'],vocOk:false,retroAvoid:['Mercury'],
    notes:'A waxing Moon is essential for any new beginning — what starts during the waxing phase has natural momentum to grow. Void of Course Moon is the single worst condition for launching anything: the project drifts, fizzles, or gets absorbed into something else. Sun hour gives the project a strong identity and visibility; Jupiter hour gives it scope and good fortune; Mars hour gives it drive and competitive edge. Avoid Mercury retrograde for anything involving communication, technology, or logistics — the foundation will need rebuilding.'},
  'focus-work':{label:'Focused work / study',icon:'Mercury',
    idealHour:['Mercury','Saturn','Sun'],avoidHour:['Moon','Venus'],
    idealMoon:['earth','air'],vocOk:true,
    notes:'Saturn hour provides the deepest discipline — it narrows attention and eliminates distraction, making it ideal for hard, grinding, solitary work. Mercury hour sharpens analytical thinking, reading comprehension, and the ability to hold complex ideas in working memory. Sun hour adds confidence and creative clarity. Moon hour scatters focus with emotional intrusions and restlessness; Venus hour pulls attention toward pleasure, socializing, and the senses — neither is your friend when deep work is the goal.'},
  'rest-retreat':{label:'Rest / retreat',icon:'Moon',
    idealHour:['Moon','Venus','Saturn'],avoidHour:['Mars','Sun'],
    idealMoon:['water','earth'],vocOk:true,
    notes:'Void of Course Moon is genuinely good here — its defining quality is that nothing new demands your attention, which is exactly what rest requires. Moon hour wraps you in softness and makes surrender feel natural rather than lazy. Venus hour turns rest into pleasure: baths, music, gentle company. Saturn hour provides the rarer gift of productive solitude — the kind of rest that comes from being alone with your thoughts. Avoid Mars hour: it will make you restless and guilty for not doing something.'},
  'physical':{label:'Exercise / physical exertion',icon:'Mars',
    idealHour:['Mars','Sun'],avoidHour:['Saturn','Moon'],
    idealMoon:['fire','air'],vocOk:true,
    notes:'Mars hour is made for physical exertion — it provides the burst of aggressive energy, competitive drive, and willingness to push past discomfort that training requires. Sun hour adds stamina, confidence, and the kind of vital force that sustains longer efforts. Saturn hour makes you feel heavy, old, and reluctant — every rep feels harder than it should. Moon hour scatters physical focus and makes you emotionally reactive to the discomfort rather than channeling it.'},
  'buy-beautiful':{label:'Buy something beautiful',icon:'Venus',
    idealHour:['Venus','Jupiter'],avoidHour:['Saturn','Mars'],
    idealMoon:['earth','water'],vocOk:true,retroAvoid:['Venus','Mercury'],
    notes:'Venus rules beautiful things, and her hour sharpens your aesthetic judgment — you are more likely to choose something you will still love in six months. Jupiter hour adds the feeling of abundance that makes generosity toward yourself feel natural rather than guilty. Avoid Venus retrograde: your sense of what is beautiful is temporarily distorted, and purchases made under Venus Rx frequently result in buyer\'s remorse. Mercury retrograde introduces shipping delays, miscommunications about specifications, and items arriving different from what was advertised.'},
  'difficult-decision':{label:'Make a hard decision',icon:'Sun',
    idealHour:['Sun','Saturn','Mercury'],avoidHour:['Moon','Venus'],
    idealMoon:['fire','earth'],vocOk:false,
    notes:'Sun hour brings clarity about what you actually want — the solar principle cuts through ambivalence by illuminating your core identity and priorities. Saturn hour provides sober, unsentimental judgment that weighs long-term consequences over short-term comfort. Mercury hour helps you think sequentially, weigh trade-offs, and see the situation from multiple angles. Avoid Moon hour: emotions shift too quickly for a decision to feel settled. Avoid VOC Moon: decisions made during VOC tend not to stick — you will revisit and second-guess.'},
};

const SIGN_ELEMENTS={Aries:'fire',Leo:'fire',Sagittarius:'fire',
  Taurus:'earth',Virgo:'earth',Capricorn:'earth',
  Gemini:'air',Libra:'air',Aquarius:'air',
  Cancer:'water',Scorpio:'water',Pisces:'water'};

// Score a single time window for the given task
function scoreElectionalWindow(task,hourRuler,moonSignName,moonPhaseAngle,vocActive,retros){
  const t=ELECTIONAL_TASKS[task];if(!t)return null;
  let score=50;
  const reasons=[];const factors=[];

  // Hour match
  if(t.idealHour.includes(hourRuler)){
    const rank=t.idealHour.indexOf(hourRuler);
    const bonus=rank===0?30:rank===1?22:16;
    score+=bonus;
    reasons.push(`${hourRuler} hour — ideal for ${t.label.toLowerCase()}`);
    factors.push({label:`${hourRuler} hour`,type:'good'});
  } else if(t.avoidHour.includes(hourRuler)){
    score-=25;
    reasons.push(`${hourRuler} hour works against this kind of action`);
    factors.push({label:`${hourRuler} hour`,type:'bad'});
  } else {
    score-=5;
    factors.push({label:`${hourRuler} hour`,type:'neutral'});
  }

  // Moon sign element
  const moonEl=SIGN_ELEMENTS[moonSignName];
  if(t.idealMoon.includes(moonEl)){
    score+=12;
    reasons.push(`Moon in ${moonSignName} (${moonEl}) supports the nature of this work`);
    factors.push({label:`Moon ${moonEl}`,type:'good'});
  } else {
    score-=4;
    factors.push({label:`Moon ${moonEl}`,type:'neutral'});
  }

  // Moon phase — waxing (0-180) is generative, waning (180-360) is releasing
  const waxing=moonPhaseAngle<180;
  const startTasks=['start-project','ask-favor','hard-convo','send-email','sign-contract','buy-beautiful','date','physical'];
  const releaseTasks=['rest-retreat','reconcile'];
  if(startTasks.includes(task)){
    if(waxing){score+=5;factors.push({label:'Waxing',type:'good'});}
    else{score-=5;factors.push({label:'Waning',type:'bad'});}
  } else if(releaseTasks.includes(task)){
    if(!waxing){score+=5;factors.push({label:'Waning',type:'good'});}
  }

  // VOC Moon
  if(vocActive){
    if(t.vocOk){factors.push({label:'VOC ok',type:'neutral'});}
    else{score-=20;reasons.push('Moon is void of course — intentions won\'t stick');factors.push({label:'VOC',type:'bad'});}
  }

  // Retrograde concerns
  if(t.retroAvoid){
    for(const rp of t.retroAvoid){
      if(retros.includes(rp)){
        score-=18;
        reasons.push(`${rp} retrograde — classical warning against this task`);
        factors.push({label:`${rp} Rx`,type:'bad'});
      }
    }
  }

  score=Math.max(0,Math.min(100,score));
  return{score,reasons,factors};
}

// Find top windows over the next N days (hour granularity)
function findBestElectionalWindows(task,daysAhead,limit){
  const results=[];
  const now=new Date();
  daysAhead=daysAhead||7;limit=limit||3;

  for(let d=0;d<daysAhead;d++){
    const date=new Date(now.getTime()+d*86400000);
    const jd=julianDate(date.getUTCFullYear(),date.getUTCMonth()+1,date.getUTCDate(),date.getUTCHours()+date.getUTCMinutes()/60);
    const ph=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
    if(!ph)continue;
    // Compute day's position snapshot (Moon, retros) at midday UT
    const y=date.getUTCFullYear(),m=date.getUTCMonth()+1,dy=date.getUTCDate();
    const midJd=julianDate(y,m,dy,12);
    const midPos=computeAll(midJd);
    const moonSignName=signOf(midPos.Moon).name;
    const sun=midPos.Sun;const moon=midPos.Moon;
    const phaseAngle=((moon-sun)+360)%360;
    const retros=[];
    for(const p of ['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune']){
      const ms=motionStatus(p,midJd);if(ms&&ms.retrograde)retros.push(p);
    }
    const vocResult=isVoidOfCourse(midPos.Moon,midJd);

    for(let hi=0;hi<24;hi++){
      const hr=ph.hours[hi];
      // Convert hour start (UT hours) to an actual Date
      const hrDate=new Date(date);
      hrDate.setUTCHours(0,0,0,0);
      hrDate.setUTCMilliseconds(hr.start*3600*1000);
      // Skip windows already in the past
      if(hrDate.getTime()<now.getTime()-60000)continue;
      // Stop after 7 days from now
      if(hrDate.getTime()>now.getTime()+daysAhead*86400000)continue;

      // VOC for this specific hour (approximation: use day-level VOC)
      const vocActive=!!(vocResult&&vocResult.voc);

      const res=scoreElectionalWindow(task,hr.ruler,moonSignName,phaseAngle,vocActive,retros);
      if(!res)continue;

      // Duration in minutes
      const durMin=Math.round((hr.end-hr.start)*60);

      results.push({
        date:hrDate,
        endDate:new Date(hrDate.getTime()+durMin*60000),
        ruler:hr.ruler,
        isDay:hr.isDay,
        moonSign:moonSignName,
        durMin:durMin,
        score:res.score,
        reasons:res.reasons,
        factors:res.factors
      });
    }
  }

  results.sort((a,b)=>b.score-a.score);
  // Deduplicate adjacent hours of same ruler by keeping highest-scoring per day-ruler pair
  const seen={};const top=[];
  for(const r of results){
    const key=r.date.toDateString()+'|'+r.ruler;
    if(seen[key])continue;
    seen[key]=true;
    top.push(r);
    if(top.length>=limit)break;
  }
  return top;
}

function fmtElectionalWhen(d){
  const now=new Date();
  const sameDay=d.toDateString()===now.toDateString();
  const tmrw=new Date(now.getTime()+86400000);
  const isTomorrow=d.toDateString()===tmrw.toDateString();
  const hr=d.getHours();const mn=d.getMinutes();
  const ampm=hr>=12?'PM':'AM';const h12=hr===0?12:hr>12?hr-12:hr;
  const t=h12+':'+String(mn).padStart(2,'0')+ampm;
  if(sameDay)return'Today '+t;
  if(isTomorrow)return'Tomorrow '+t;
  const dayName=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
  const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  return`${dayName} ${mo} ${d.getDate()} ${t}`;
}
