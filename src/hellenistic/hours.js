// ══════════════════════════════════════════════════════════════
// hellenistic/hours.js — Sunrise/sunset, planetary hours, consult
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const DAY_RULERS=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']; // Sun..Sat
const DAY_RULER_TONE={
  Sun:'a day for visibility, leadership, and vitality — put your name on the work',
  Moon:'a day of moods, memory, and the tidal instinct — trust how you feel',
  Mars:'a day for decisive action, courage, and cutting through — push hard',
  Mercury:'a day of messages, trades, and thinking out loud — move information',
  Jupiter:'a day for expansion, teaching, and asking for more — aim wider',
  Venus:'a day for love, art, and repairing what\'s beautiful — soften',
  Saturn:'a day for structure, responsibility, and hard truths — do the grown-up thing'
};

// ── Sunrise / Sunset ──
function computeSunTimes(jd,lat,lon){
  const jd0=Math.floor(jd-0.5)+0.5; // 0h UT of this day
  const T=jdToT(jd0+0.5); // ~noon
  const sunLon_=sunLongitude(T);
  const eps=23.4393-0.0130*T;
  const decl=Math.asin(sin(eps)*sin(sunLon_))*RAD;

  // Hour angle for h0=-0.833 (standard refraction)
  const cosHA=(sin(-0.833)-sin(lat)*sin(decl))/(cos(lat)*cos(decl));
  if(Math.abs(cosHA)>1)return null;
  const HA=Math.acos(cosHA)*RAD; // degrees

  // Right ascension of Sun
  const ra=norm(atan2d(cos(eps)*sin(sunLon_),cos(sunLon_)));

  // GMST at 0h UT
  const T0=jdToT(jd0);
  const GMST0=norm(280.46061837+360.98564736629*(jd0-2451545.0)+0.000387933*T0*T0);

  // Transit hour (UT)
  let transit=((ra-GMST0-lon)%360+360)%360;
  const transitUT=transit/15; // degrees→hours

  const sunriseUT=transitUT-HA/15;
  const sunsetUT=transitUT+HA/15;

  return{sunrise:sunriseUT,sunset:sunsetUT,transit:transitUT};
}

// ── Planetary Hours ──
function computePlanetaryHours(jd,lat,lon){
  const times=computeSunTimes(jd,lat,lon);
  if(!times)return null;
  let{sunrise,sunset}=times;
  // Clamp to 0-24 range
  if(sunrise<0)sunrise+=24;if(sunrise>24)sunrise-=24;
  if(sunset<0)sunset+=24;if(sunset>24)sunset-=24;

  const dayLen=sunset-sunrise;
  const nightLen=24-dayLen;
  const dayHr=dayLen/12;
  const nightHr=nightLen/12;

  // Day of week → day ruler
  const d=jdToDate(jd);
  const dow=d.getDay(); // 0=Sun
  const dayPlanets=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
  const dayRuler=dayPlanets[dow];
  const dayName=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dow];

  // Chaldean order
  const chaldean=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
  const startIdx=chaldean.indexOf(dayRuler);

  const hours=[];
  for(let i=0;i<24;i++){
    const isDay=i<12;
    const hrLen=isDay?dayHr:nightHr;
    const start=isDay?sunrise+i*dayHr:sunset+(i-12)*nightHr;
    const end=start+hrLen;
    const ruler=chaldean[(startIdx+i)%7];
    hours.push({ruler,start,end,isDay,index:i});
  }

  return{hours,sunrise,sunset,dayRuler,dayName};
}

// Find current planetary hour index
function currentHourIndex(hours,utHours){
  for(let i=0;i<hours.length;i++){
    let s=hours[i].start,e=hours[i].end;
    // Handle wrap around midnight
    if(e>24){if(utHours>=s||utHours<e-24)return i;}
    else if(s<0){if(utHours>=s+24||utHours<e)return i;}
    else{if(utHours>=s&&utHours<e)return i;}
  }
  return 0;
}

function fmtHourTime(h){
  // Convert UT hours to OBSERVER local time (Europe/Zurich, DST-aware)
  const off=tzOffsetHours(new Date());
  let local=h+off;
  if(local<0)local+=24;if(local>=24)local-=24;
  const hr=Math.floor(local);const mn=Math.round((local-hr)*60);
  const ampm=hr>=12?'PM':'AM';const h12=hr===0?12:hr>12?hr-12:hr;
  return h12+':'+String(mn).padStart(2,'0')+ampm;
}

// ── Planetary Hour Purpose (traditional electional) ──
const HOUR_PURPOSE={
Sun:{good:'Authority, leadership, asking favors of powerful people, health matters, creative expression, making yourself visible.',
  avoid:'Hiding, passivity, or anything requiring subtlety.',
  brief:'Visibility and authority. Good for bold moves, presentations, approaching leaders.'},
Moon:{good:'Travel, messages, public dealings, nurturing, cooking, gardening, household matters, beginning journeys.',
  avoid:'Anything requiring long-term permanence (Moon changes too quickly).',
  brief:'Flow and feeling. Good for messages, travel plans, domestic tasks, intuitive decisions.'},
Mars:{good:'Physical contests, surgery, confrontation, cutting, separating, mechanical work, courage.',
  avoid:'Beginning partnerships, delicate negotiations, anything requiring harmony.',
  brief:'Force and contention. Good for hard conversations, physical exertion, cutting through obstacles.'},
Mercury:{good:'Writing, studying, trade, contracts, communication, learning, short journeys, messages, accounting.',
  avoid:'Emotional confrontations, permanent commitments that bypass rational analysis, physical tasks requiring brute force, and spiritual practices that need stillness — Mercury scatters contemplative focus.',
  brief:'Thought and exchange. Good for emails, writing, studying, negotiations, commerce.'},
Jupiter:{good:'Legal matters, religion, philosophy, generosity, loan requests, teaching, beginning ventures with others.',
  avoid:'Detail work, penny-pinching, narrow technical debugging, and anything requiring skepticism or restraint — Jupiter overestimates and overlooks fine print.',
  brief:'Expansion and goodwill. Good for important meetings, legal matters, asking for help, big-picture planning.'},
Venus:{good:'Love, pleasure, art, beauty, social gatherings, reconciliation, courtship, buying beautiful things.',
  avoid:'Confrontation, separation, surgery.',
  brief:'Harmony and pleasure. Good for dates, creative work, reconciliation, social events, beauty.'},
Saturn:{good:'Long-term planning, building lasting structures, discipline, boundary-setting, solitude, working with earth and stone.',
  avoid:'New ventures, celebrations, asking favors, anything requiring speed or spontaneity.',
  brief:'Discipline and limits. Good for long-term planning, boundary-setting, solitary focused work.'},
};

// ── Consult Synthesis (the "what should I do right now?" answer) ──
function synthesizeConsult(transits,vibe,vocResult,moonSign,prof,pHours,isToday){
  if(!pHours||!isToday)return null;

  const now=new Date();
  const utNow=now.getUTCHours()+now.getUTCMinutes()/60;
  const curIdx=currentHourIndex(pHours.hours,utNow);
  const curHour=pHours.hours[curIdx];
  const nextHour=pHours.hours[(curIdx+1)%24];
  const hp=HOUR_PURPOSE[curHour.ruler]||{};
  const nhp=HOUR_PURPOSE[nextHour.ruler]||{};

  // Minutes until next hour
  let minsLeft=Math.round((curHour.end-utNow)*60);
  if(minsLeft<0)minsLeft+=24*60;
  if(minsLeft>120)minsLeft=Math.round(minsLeft);

  const sentences=[];

  // Current hour guidance
  sentences.push(`You are in a ${curHour.ruler} hour (${minsLeft} minutes remaining). ${hourBrief(curHour.ruler)}`);

  // VOC warning
  if(vocResult&&vocResult.voc){
    sentences.push('The Moon is void of course — this is not the time to start anything you want to stick. Finish tasks in progress, organize, or rest.');
  }

  // Dominant transit energy — just the top transit if hard
  const hardActive=transits.filter(t=>t.aspect.type==='hard'&&t.importance>18);
  const easyActive=transits.filter(t=>(t.aspect.type==='easy'||t.aspect.name==='conjunction')&&t.importance>18);

  const CONSULT_HARD_CLOSE=[
    'This is not the hour for impulsive action in that domain.',
    'Move carefully here — the pressure is real and reactive decisions will cost you.',
    'Proceed with awareness. The friction is instructive but the timing is not forgiving.',
    'Tread deliberately. The energy in this area punishes haste and rewards patience.',
    'Avoid forcing outcomes here. The resistance is trying to tell you something.'
  ];
  const CONSULT_EASY_CLOSE=[
    'Use the momentum — support like this does not last indefinitely.',
    'The current is with you here. Don\'t waste the ease on hesitation.',
    'Lean into this. What you attempt in this area has wind at its back.',
    'The opening is real. Act on it while the energy cooperates.',
    'This is the area of least resistance today. Direct your effort here.'
  ];
  const CONSULT_LORD_CLOSE=[
    'what happens now connects to the year\'s larger story.',
    'today\'s events carry weight beyond the immediate — this threads into your annual arc.',
    'pay extra attention. The year\'s ruling theme is in play today.',
    'this activates the deeper narrative of your profected year. It matters more than it looks.',
    'events in this domain echo forward. Today\'s choices compound across the year.'
  ];
  const cSeed=todaySeed();
  if(hardActive.length>0){
    const t=hardActive[0];
    const sp=SPHERE[t.tp]||{};
    const hv=HOUSE_VOICE[t.house]||{};
    sentences.push(`Be aware that ${sp.name||t.tp} is pressing on your ${(hv.name||'').toLowerCase()} — ${sphereStressed(t.tp)||'move carefully in this area'}. ${pick(CONSULT_HARD_CLOSE,cSeed)}`);
  } else if(easyActive.length>0){
    const t=easyActive[0];
    const sp=SPHERE[t.tp]||{};
    const hv=HOUSE_VOICE[t.house]||{};
    sentences.push(`${sp.name||t.tp} supports your ${(hv.name||'').toLowerCase()} right now — ${sphereActive(t.tp)||'take what is offered'}. ${pick(CONSULT_EASY_CLOSE,cSeed+1)}`);
  }

  // Profected lord relevance
  const lordTransits=transits.filter(t=>t.tp===prof.yearLord||t.np===prof.yearLord).filter(t=>t.importance>10);
  if(lordTransits.length>0){
    sentences.push(`Your lord of the year (${prof.yearLord}) is active in today\'s transits — ${pick(CONSULT_LORD_CLOSE,cSeed+2)}`);
  }

  // Next hour preview
  sentences.push(`Next hour: ${nextHour.ruler} (${fmtHourTime(nextHour.start)}). ${hourBrief(nextHour.ruler)}`);

  return{
    text:sentences.join(' '),
    hourRuler:curHour.ruler,
    hourPurpose:hp,
    minsLeft,
    nextRuler:nextHour.ruler,
    nextStart:fmtHourTime(nextHour.start),
    factors:{
      hour:curHour.ruler,
      moon:`${moonSign.name} ${vocResult&&vocResult.voc?'(VOC)':''}`,
      vibe:vibe.score,
      yearLord:prof.yearLord
    }
  };
}

// ── Variant pools for hourBrief/hourGood/hourAvoid ──
const HOUR_PURPOSE_V={
Sun:{brief:['Visibility and authority. Good for bold moves, presentations, approaching leaders.','Solar hour: step into the spotlight. Self-promotion, leadership asks, and creative confidence peak.','The Sun\'s hour favors what wants to be seen. Make your case, show your work, claim your space.','Vitality peaks. Act on what you believe in, approach someone powerful, or make the creative leap.','The hour of the king — do what deserves your name on it. Avoid hiding behind others.','Confidence is naturally high. Ask for what you want directly, perform, lead, or create.'],
  good:['Authority, leadership, asking favors of powerful people, health matters, creative expression.','Making yourself visible, approaching authority, creative presentations, health vitality.','Leadership moves, bold self-expression, approaching VIPs, physical health attention.'],
  avoid:['Hiding, passivity, or anything requiring subtlety.','Situations that need you to be invisible or deferential. The Sun wants to shine.','Sneakiness, excessive caution, or projects that depend on staying unnoticed.']},
Moon:{brief:['Flow and feeling. Good for messages, travel plans, domestic tasks, intuitive decisions.','Lunar hour: emotions guide well. Household tasks, short trips, and nurturing conversations thrive.','The Moon\'s hour favors instinct over analysis. Travel, home matters, and emotional honesty.','Let your gut lead. Nurture what needs tending — home, body, people you care for.','Emotional radar is sharp. Have the soft conversation, start the journey, feed someone.','Receptive hour. Take in rather than push out — listen, absorb, respond to what surfaces.'],
  good:['Travel, messages, public dealings, nurturing, cooking, gardening, household matters.','Domestic tasks, caregiving, messages, starting journeys, emotional conversations.','Short trips, public-facing tasks, intuitive decisions, anything involving home or family.'],
  avoid:['Anything requiring long-term permanence — the Moon changes too quickly.','Binding commitments that need stability. The Moon shifts faster than contracts should.','Major life decisions, permanent investments — lunar hour is for flow, not fixtures.']},
Mars:{brief:['Force and contention. Good for hard conversations, physical exertion, cutting through obstacles.','Martial hour: channel aggression constructively. Exercise, confrontation, mechanical work.','Mars hour: move your body, cut what needs cutting, have the conversation you\'ve been avoiding.','Courage is cheap right now — spend it. Train, confront, push through the block.','The hour of the blade. Clean cuts, not negotiation. Say the hard thing or lift the heavy thing.','High-octane hour. Physical exertion, decisive action, and the willingness to fight for what matters.'],
  good:['Physical contests, surgery, confrontation, cutting, separating, mechanical work, courage.','Hard conversations, competition, exercise, separating from what\'s finished, technical repairs.','Anything requiring force, speed, or courage. Surgery, athletics, clearing obstacles.'],
  avoid:['Beginning partnerships, delicate negotiations, anything requiring harmony.','Gentle conversations, romantic overtures, or tasks requiring patience and diplomacy.','Peace talks, first dates, delicate negotiations — Mars doesn\'t do nuance.']},
Mercury:{brief:['Thought and exchange. Good for emails, writing, studying, negotiations, commerce.','Mercury\'s hour: the mind is sharp. Write, negotiate, learn, trade, make the call.','The most versatile hour. Communication, commerce, contracts, and intellectual work all thrive.','Mental agility peaks. Send the message, close the deal, learn the thing, make the connection.','The messenger\'s hour — information flows, conversations land, and logistics click into place.','Quick-witted hour. Write, code, negotiate, research, or untangle something complicated.'],
  good:['Writing, studying, trade, contracts, communication, learning, short journeys, messages.','Negotiations, emails, accounting, research, teaching, any exchange of information.','Intellectual tasks, signing papers, sending important messages, learning something new.'],
  avoid:['Emotional confrontations that bypass logic, tasks requiring brute force, or deep spiritual stillness.','Heart-to-heart conversations that need feeling over analysis. Mercury dissects when it should listen.','Purely physical labor, meditative practices, or anything that requires you to stop thinking and just feel.']},
Jupiter:{brief:['Expansion and goodwill. Good for important meetings, legal matters, big-picture planning.','Jupiter\'s hour: generosity flows both ways. Ask for what you need, offer what you can.','The hour of the Greater Benefic. Doors open. Vision expands. Fortune favors the bold request.','Big-picture hour. Think strategically, make the grand gesture, or seek wise counsel.','Abundance is available — ask for the raise, pitch the idea, or start the venture.','The most fortunate hour. Legal matters, education, mentorship, and any act of good faith thrive.'],
  good:['Legal matters, generosity, loan requests, teaching, beginning ventures with others.','Philosophical conversations, charitable acts, approaching mentors, expanding your network.','Big asks, educational pursuits, legal proceedings, anything requiring faith and good will.'],
  avoid:['Detail-oriented debugging, penny-pinching, cynical second-guessing, or nitpicking fine print.','Micromanagement, tight-fisted budgeting, or tasks requiring skepticism over faith.','Narrow technical work, forensic accounting, or anything that needs contraction rather than expansion.']},
Venus:{brief:['Harmony and pleasure. Good for dates, creative work, reconciliation, social events.','Venus hour: beauty, connection, and pleasure are favored. Create, love, reconcile, enjoy.','The sweetest hour. Art, romance, social grace, and anything that brings beauty or peace.','Aesthetic intelligence peaks. Dress well, make peace, create something beautiful, or reach out to someone you love.','The hour of the heart. Relationships deepen, creativity flows, and what is beautiful feels accessible.','Pleasure is productive now. Connect, create, reconcile, or simply enjoy something fully.'],
  good:['Love, pleasure, art, beauty, social gatherings, reconciliation, courtship.','Creative expression, romantic connections, buying beautiful things, peace-making.','Aesthetic projects, social invitations, apologies that need to land softly, gift-giving.'],
  avoid:['Confrontation, separation, surgery.','Hard conversations, aggressive competition, or anything that requires toughness over grace.','Bluntness, cutting ties, or tasks that need Mars energy. Venus doesn\'t do sharp edges.']},
Saturn:{brief:['Discipline and limits. Good for long-term planning, boundary-setting, solitary focused work.','Saturn\'s hour: the serious hour. Plan ahead, set boundaries, build what needs to last.','The hour that rewards patience. Structure, discipline, and quiet persistent effort pay off.','Grind hour. Do the work that nobody sees but everybody depends on. Foundations first.','Focus narrows and deepens. Cut the noise, set the limit, build the thing that survives.','The elder\'s hour. Solitary effort, long-range planning, and the courage to say no to what doesn\'t serve.'],
  good:['Long-term planning, building lasting structures, discipline, boundary-setting, solitude.','Focused solo work, legal formalities, organizational tasks, anything requiring endurance.','Strategic planning, financial restructuring, setting firm limits, working with limitations.'],
  avoid:['New ventures, celebrations, asking favors, anything requiring speed or spontaneity.','Parties, impulsive starts, asking for help, or anything depending on enthusiasm.','Spontaneity, festivity, or tasks requiring lightness and speed. Saturn works slow.']}
};

function hourBrief(ruler){const pool=(HOUR_PURPOSE_V[ruler]||{}).brief;return pool?pick(pool,todaySeed()):(HOUR_PURPOSE[ruler]||{}).brief||'';}
function hourGood(ruler){const pool=(HOUR_PURPOSE_V[ruler]||{}).good;return pool?pick(pool,todaySeed()):(HOUR_PURPOSE[ruler]||{}).good||'';}
function hourAvoid(ruler){const pool=(HOUR_PURPOSE_V[ruler]||{}).avoid;return pool?pick(pool,todaySeed()):(HOUR_PURPOSE[ruler]||{}).avoid||'';}
