// src/ui/app.js — main render pipeline, extracted from index.html

// ─── Natal aspects ───

// ─── Home dashboard helpers ───
function timeGreeting(date){
  const h=new Date(date.toLocaleString('en-US',{timeZone:OBSERVER.tzName})).getHours();
  if(h<5)return'Late night';if(h<12)return'Good morning';if(h<17)return'Good afternoon';if(h<21)return'Good evening';return'Late evening';
}
function moonPhaseSvg(phaseAngle,size){
  // phaseAngle: 0 = new, 180 = full, 0-180 waxing, 180-360 waning
  const r=size/2-2;const cx=size/2,cy=size/2;
  const a=((phaseAngle%360)+360)%360;
  const illum=(1-Math.cos(a*DEG))/2;
  const waxing=a<180;
  const gid='mg'+Math.round(a*10);
  const grad=`<defs><radialGradient id="${gid}"><stop offset="0%" stop-color="#fff8e0"/><stop offset="100%" stop-color="#c8b48c"/></radialGradient></defs>`;
  // Special cases
  if(illum<.005){
    // New — show dim outline + faint earthshine hint so user can see "it's there"
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="home-moon-svg">`+
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1a1a" stroke="rgba(255,200,120,.4)" stroke-width="1" stroke-dasharray="2 3"/></svg>`;
  }
  if(illum>.995){
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="home-moon-svg">${grad}<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gid})"/></svg>`;
  }
  // For visibility at small sizes, clamp the *drawn* illumination so crescents/gibbous always show.
  // At 44px, 15% floor gives ~6px wide crescent — clearly visible.
  const minVis=.15,maxVis=.85;
  let drawIllum=illum;
  if(drawIllum<minVis)drawIllum=minVis;
  if(drawIllum>maxVis)drawIllum=maxVis;
  // Recompute the equivalent phase angle for drawing: illum = (1-cos θ')/2  →  θ' = acos(1-2·illum)
  const theta=Math.acos(1-2*drawIllum)*RAD; // 0..180
  const drawPhase=waxing?theta:(360-theta);
  const termR=Math.abs(r*Math.cos(drawPhase*DEG));
  let litPath;
  if(drawIllum<.5){
    if(waxing){
      litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 1 ${cx} ${cy+r} A ${termR} ${r} 0 0 0 ${cx} ${cy-r} Z`;
    } else {
      litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 0 ${cx} ${cy+r} A ${termR} ${r} 0 0 1 ${cx} ${cy-r} Z`;
    }
  } else {
    if(waxing){
      litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 1 ${cx} ${cy+r} A ${termR} ${r} 0 0 1 ${cx} ${cy-r} Z`;
    } else {
      litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 0 ${cx} ${cy+r} A ${termR} ${r} 0 0 0 ${cx} ${cy-r} Z`;
    }
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="home-moon-svg">`+
    grad+
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1a1a" stroke="#3a3a3a" stroke-width="0.5"/>`+
    `<path d="${litPath}" fill="url(#${gid})" stroke="rgba(255,248,224,.5)" stroke-width="0.5"/>`+
    `</svg>`;
}

// Dignities

// Transit duration labels

// ══════════════════════════════════════════════════════════════
// TRADITIONAL ASTROLOGY ENGINE — Sect, Profections, Hours
// ══════════════════════════════════════════════════════════════

// Traditional domicile rulers (Scorpio→Mars, Aquarius→Saturn, Pisces→Jupiter)

// Nocturnal chart (Sun below horizon at birth)

// ── Profections ──

// ── Sunrise / Sunset ──

// ── Planetary Hours ──

// Find current planetary hour index

// ── Planetary Hour Purpose (traditional electional) ──

// ── Consult Synthesis (the "what should I do right now?" answer) ──

// ── Hard Transit Three-Part Frame ──

// ══════════════════════════════════════════════════════════════
// ELECTIONAL MICRO-TOOL — Rank upcoming time windows by task
// ══════════════════════════════════════════════════════════════
// Each task maps to a traditional planetary signature with preferred hour,
// avoided hour, preferred Moon signs (by element/nature), and VOC tolerance.

// Score a single time window for the given task

// Find top windows over the next N days (hour granularity)

// ══════════════════════════════════════════════════════════════
// 28 LUNAR MANSIONS (Manazil al-Qamar) — Picatrix indications
// Each spans 360/28 = 12.857° starting at 0° Aries

// SEVEN HERMETIC LOTS — sect-aware traditional formulas
// ══════════════════════════════════════════════════════════════
// All lots: if nocturnal (this user's chart is), formula is reversed.
// Result = norm(Asc + A - B) mod 360

// ══════════════════════════════════════════════════════════════
// JOURNAL — persistent entries with astro context snapshots
// ══════════════════════════════════════════════════════════════
const JOURNAL_KEY='astro_journal_v1';
const MOOD_LABELS={1:'Heavy',2:'Low',3:'Neutral',4:'Light',5:'Open'};

function loadJournal(){
  try{const raw=localStorage.getItem(JOURNAL_KEY);if(!raw)return[];
    const arr=JSON.parse(raw);return Array.isArray(arr)?arr:[];
  }catch(e){return[];}
}
function saveJournal(entries){
  try{localStorage.setItem(JOURNAL_KEY,JSON.stringify(entries));}catch(e){console.error('journal save',e);}
}
function captureJournalContext(cur,jd,transits,vibe,vocResult,moonSign,prof,pHours,phaseAngle,retros,stats){
  // Snapshot the astro configuration at entry time for later pattern matching
  const ctx={
    moonSign:moonSign.name,
    moonMansion:computeMansion(cur.Moon).index,
    phasePct:Math.round(phaseAngle/3.6),
    yearLord:prof.yearLord,
    monthLord:prof.monthLord,
    vibe:vibe.score,
    voc:!!vocResult.voc,
    retros:retros.join(','),
    stations:stats.join(','),
  };
  if(pHours){
    const utNow=new Date().getUTCHours()+new Date().getUTCMinutes()/60;
    const idx=currentHourIndex(pHours.hours,utNow);
    ctx.hourRuler=pHours.hours[idx].ruler;
  }
  // Top 2 transits as compact signature
  const top=transits.slice(0,2).map(t=>`${t.tp}_${t.aspect.name}_${t.np}`);
  ctx.topTransits=top;
  return ctx;
}

function journalAddEntry(mood,note,ctx){
  const entries=loadJournal();
  entries.unshift({
    ts:Date.now(),
    mood,
    note:note||'',
    ctx
  });
  // Keep last 500
  if(entries.length>500)entries.length=500;
  saveJournal(entries);
  return entries;
}

function journalDelete(ts){
  const entries=loadJournal().filter(e=>e.ts!==ts);
  saveJournal(entries);
  return entries;
}

function exportLedgerJSON(){
  const entries=loadJournal();
  const blob=new Blob([JSON.stringify(entries,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='astro-journal-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Build a rolling ledger summary for injection into Claude synthesis prompt
function buildLedgerSummary(lookback){
  if(!lookback)lookback=90;
  const entries=loadJournal();
  const cutoff=Date.now()-(lookback*24*60*60*1000);
  const tracked=entries.filter(e=>e.ts>=cutoff&&e.ctx&&e.ctx.synthesisText);
  if(tracked.length<14)return null; // need minimum 14 tracked entries

  const summary={totalTracked:tracked.length,lookbackDays:lookback,ratings:{hit:0,partial:0,miss:0,untested:0},moodAvg:0,moodCount:0,tokenAccuracy:{}};
  let moodSum=0;
  for(const e of tracked){
    const r=e.ctx.synthesisRating;
    if(r&&summary.ratings[r]!==undefined)summary.ratings[r]++;
    else summary.ratings.untested++;
    if(e.mood){moodSum+=e.mood;summary.moodCount++;}
    // Per-token accuracy
    const tokens=e.ctx.synthesisTokens||[];
    for(const t of tokens){
      const tType=t.split(':')[0];
      if(!summary.tokenAccuracy[tType])summary.tokenAccuracy[tType]={hit:0,partial:0,miss:0,untested:0,total:0};
      const ta=summary.tokenAccuracy[tType];
      ta.total++;
      if(r&&ta[r]!==undefined)ta[r]++;
      else ta.untested++;
    }
  }
  summary.moodAvg=summary.moodCount?Math.round(moodSum/summary.moodCount*10)/10:0;
  // Mood-factor correlations: which factors correlate with mood >= 4
  const highMoodEntries=tracked.filter(e=>e.mood>=4);
  const factorMoodCorr={};
  for(const e of highMoodEntries){
    const tokens=e.ctx.synthesisTokens||[];
    for(const t of tokens){
      const tType=t.split(':')[0];
      factorMoodCorr[tType]=(factorMoodCorr[tType]||0)+1;
    }
  }
  summary.highMoodFactors=factorMoodCorr;
  return summary;
}

// Find past entries with similar astro configuration
function findEchoEntries(ctx){
  const entries=loadJournal();
  const echoes=[];
  for(const e of entries){
    if(!e.ctx)continue;
    let score=0;
    if(e.ctx.hourRuler===ctx.hourRuler)score+=3;
    if(e.ctx.moonSign===ctx.moonSign)score+=2;
    if(e.ctx.yearLord===ctx.yearLord)score+=2;
    if(e.ctx.monthLord===ctx.monthLord)score+=2;
    if(e.ctx.moonMansion===ctx.moonMansion)score+=3;
    if(e.ctx.voc===ctx.voc)score+=1;
    // Shared transit signatures
    const et=e.ctx.topTransits||[];
    for(const t of(ctx.topTransits||[])){
      if(et.includes(t))score+=4;
    }
    if(score>=5)echoes.push({entry:e,score});
  }
  echoes.sort((a,b)=>b.score-a.score);
  return echoes.slice(0,2);
}

// ══════════════════════════════════════════════════════════════
// ZODIACAL RELEASING — from Spirit and Fortune (Hellenistic)
// ══════════════════════════════════════════════════════════════
// Each sign's ruler has a "minor period" in years. Period-lengths:
// Returns sign index (0=Aries) for an L-period index given the starting sign

// Compute Level 1 and Level 2 periods from startLot to limitDate
// birthDate: Date object; startSignIdx: 0-11; yearsTotal: how many years to project

// ══════════════════════════════════════════════════════════════
// FIRDARIA — Persian time-lord periods (complements ZR)
// ══════════════════════════════════════════════════════════════
// Nocturnal order (user's chart): Moon→Saturn→Jupiter→Mars→Sun→Venus→Mercury
// Diurnal order: Sun→Venus→Mercury→Moon→Saturn→Jupiter→Mars
// Total: 75 years (diurnal) or 75 years (nocturnal); traditions vary 70-75

// Each major period is divided into 7 equal sub-periods, beginning with the
// major lord and following the same sequence.

// ══════════════════════════════════════════════════════════════
// DECANS + PICATRIX FACES (36 ten-degree subdivisions)
// ══════════════════════════════════════════════════════════════
// Chaldean/Bonatti rulers: for each sign, three decans follow Chaldean
// order starting from the sign's traditional ruler.

// Tarot Decan Attributions — Golden Dawn / Crowley system.
// Each of the 36 minor arcana pips (2–10 of each suit) corresponds to one decan.
// Suit follows triplicity: Wands=Fire, Cups=Water, Swords=Air, Disks=Earth.
// Pip number rises with degrees: cardinal=2-3-4, fixed=5-6-7, mutable=8-9-10.
// The card is a vehicle for understanding the planet-in-sign quality of that 10° slice.

// ══════════════════════════════════════════════════════════════
// SOLAR & LUNAR RETURNS
// ══════════════════════════════════════════════════════════════
// A Solar Return is the chart cast for the moment the transiting Sun
// returns to its exact natal position each year — valid birthday to
// birthday. A Lunar Return repeats every ~27.3 days as the Moon
// returns to natal longitude, governing the upcoming lunar month.

// ══════════════════════════════════════════════════════════════
// CLAUDE SYNTHESIS PIPELINE
// ══════════════════════════════════════════════════════════════
// A lightweight bridge to the Anthropic API. The user provides an
// API key (stored locally, never transmitted elsewhere). On request,
// the app bundles the current computed state — natal chart, transits,
// ZR/firdaria/profection lords, lots, mansion, decan, liturgy, VOC —
// into a structured prompt and asks Claude for an integrated reading
// in a traditional-but-modern voice.
//
// WARNING: storing an API key client-side means it is visible to
// anyone with access to the device. This is intended for personal
// use on a trusted phone only.

// ── Synastry Claude synthesis ──

// ══════════════════════════════════════════════════════════════
// NOTIFICATIONS (foreground + optional service-worker)
// ══════════════════════════════════════════════════════════════
// Foreground notifications fire while the app is open in a tab or
// running as an installed PWA. Real background push would require
// a backend with VAPID; this engine covers the common case —
// the app is frequently consulted during the day and fires local
// alerts for planetary hour changes, Moon sign ingresses, VOC
// transitions, and a morning briefing at a user-set time.

const NOTIF_PREFS_KEY='astro_notif_prefs_v1';
const DEFAULT_NOTIF_PREFS={
  enabled:false,
  morningBrief:true,
  morningTime:'07:30',  // local HH:MM
  moonIngress:true,
  vocAlerts:true,
  planetaryHour:false,  // can be noisy — default off
  lastFiredIds:{}
};

function loadNotifPrefs(){
  try{
    const raw=localStorage.getItem(NOTIF_PREFS_KEY);
    if(!raw)return{...DEFAULT_NOTIF_PREFS};
    return{...DEFAULT_NOTIF_PREFS,...JSON.parse(raw)};
  }catch(e){return{...DEFAULT_NOTIF_PREFS};}
}
function saveNotifPrefs(p){
  try{localStorage.setItem(NOTIF_PREFS_KEY,JSON.stringify(p));}catch(e){}
}

let notifPrefs=loadNotifPrefs();

async function requestNotificationPermission(){
  if(!('Notification' in window)){
    alert('Notifications are not supported in this browser.');
    return false;
  }
  let perm=Notification.permission;
  if(perm==='default'){
    try{perm=await Notification.requestPermission();}catch(e){perm='denied';}
  }
  if(perm==='granted'){
    notifPrefs.enabled=true;saveNotifPrefs(notifPrefs);
    registerServiceWorker();
    startNotificationEngine();
    return true;
  } else {
    notifPrefs.enabled=false;saveNotifPrefs(notifPrefs);
    return false;
  }
}

// Register an inline service worker via Blob URL so installed PWAs
// can show notifications when the page is in background (iOS 16.4+
// home-screen PWAs support notifications via registered SW).
let _swReg=null;
async function registerServiceWorker(){
  if(!('serviceWorker' in navigator))return;
  if(_swReg)return _swReg;
  try{
    // Prefer a same-origin /sw.js if one exists (hostable); else inline via blob.
    const swSource=`
      self.addEventListener('install',e=>self.skipWaiting());
      self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
      self.addEventListener('message',async(e)=>{
        const d=e.data||{};
        if(d.type==='notify'){
          try{ await self.registration.showNotification(d.title||'',{body:d.body||'',tag:d.tag||'',icon:d.icon,badge:d.badge,silent:!!d.silent}); }catch(err){}
        }
      });
      self.addEventListener('notificationclick',e=>{
        e.notification.close();
        e.waitUntil((async()=>{
          const all=await self.clients.matchAll({type:'window'});
          for(const c of all){if('focus' in c)return c.focus();}
          if(self.clients.openWindow)return self.clients.openWindow('/');
        })());
      });
    `;
    const blob=new Blob([swSource],{type:'text/javascript'});
    const url=URL.createObjectURL(blob);
    _swReg=await navigator.serviceWorker.register(url);
    return _swReg;
  }catch(e){return null;}
}

// Fire a notification. If the page is visible, use an in-page Notification;
// else send via the registered service worker so it persists/tray-shows.
async function fireNotification(title,body,tag,opts){
  if(!notifPrefs.enabled)return;
  if(!('Notification' in window)||Notification.permission!=='granted')return;
  opts=opts||{};
  // Dedupe: don't fire the same tag twice in one engine tick
  if(tag&&notifPrefs.lastFiredIds[tag]===opts.fireKey)return;
  if(tag&&opts.fireKey){notifPrefs.lastFiredIds[tag]=opts.fireKey;saveNotifPrefs(notifPrefs);}
  try{
    if(_swReg&&_swReg.active){
      _swReg.active.postMessage({type:'notify',title,body,tag,silent:opts.silent});
    } else {
      new Notification(title,{body,tag,silent:opts.silent});
    }
  }catch(e){}
}

// The engine runs every 60s while the app is open. It computes the
// current state and compares against fireKeys stored in prefs, so
// each event fires at most once per occurrence.
let _notifTimer=null;
function startNotificationEngine(){
  stopNotificationEngine();
  checkNotifications(); // immediate check
  _notifTimer=setInterval(checkNotifications,60000);
}
function stopNotificationEngine(){
  if(_notifTimer){clearInterval(_notifTimer);_notifTimer=null;}
}

function checkNotifications(){
  if(!notifPrefs.enabled)return;
  try{
    const now=new Date();
    const jd=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours()+now.getUTCMinutes()/60);
    const cur=computeAll(jd);

    // Morning briefing
    if(notifPrefs.morningBrief){
      const[hh,mm]=(notifPrefs.morningTime||'07:30').split(':').map(Number);
      const todayKey=now.toISOString().slice(0,10);
      if(now.getHours()===hh&&now.getMinutes()>=mm&&now.getMinutes()<mm+2){
        const tag='morning-brief';
        if(notifPrefs.lastFiredIds[tag]!==todayKey){
          const phase=moonPhaseInfo(moonPhase(jdToT(jd))).name;
          const mSign=signOf(cur.Moon).name;
          const pHours=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
          const dayRuler=pHours?pHours.dayRuler:'';
          fireNotification(
            'Today\'s sky',
            `Day of ${dayRuler}. Moon in ${mSign}, ${phase}.`,
            tag,
            {fireKey:todayKey}
          );
        }
      }
    }

    // Moon ingress: sign change since last check
    if(notifPrefs.moonIngress){
      const curMoonSign=signOf(cur.Moon).name;
      const tag='moon-ingress';
      const fireKey=now.toISOString().slice(0,10)+'-'+curMoonSign;
      const prev=notifPrefs.lastFiredIds['_moonSign'];
      if(prev&&prev!==curMoonSign){
        fireNotification('Moon ingress',`The Moon has entered ${curMoonSign}.`,tag,{fireKey});
      }
      notifPrefs.lastFiredIds['_moonSign']=curMoonSign;
      saveNotifPrefs(notifPrefs);
    }

    // VOC start/end: transition since last check
    if(notifPrefs.vocAlerts){
      const voc=isVoidOfCourse(cur.Moon,jd);
      const prev=notifPrefs.lastFiredIds['_voc'];
      const curIs=voc&&voc.active?'on':'off';
      if(prev&&prev!==curIs){
        if(curIs==='on'){
          fireNotification('Moon goes void','The Moon has made her last aspect. Hold off on new undertakings until she enters '+(voc.nextSign||'the next sign')+'.','voc-on',{fireKey:now.getTime()});
        } else {
          fireNotification('Moon out of void','The Moon has entered '+signOf(cur.Moon).name+'. New undertakings are available again.','voc-off',{fireKey:now.getTime()});
        }
      }
      notifPrefs.lastFiredIds['_voc']=curIs;
      saveNotifPrefs(notifPrefs);
    }

    // Planetary hour change
    if(notifPrefs.planetaryHour){
      const pHours=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
      if(pHours){
        const utNow=now.getUTCHours()+now.getUTCMinutes()/60;
        const idx=currentHourIndex(pHours.hours,utNow);
        const hr=pHours.hours[idx];
        const fireKey=now.toISOString().slice(0,13)+'-'+hr.ruler;
        const tag='phour';
        if(notifPrefs.lastFiredIds[tag]!==fireKey){
          fireNotification('Planetary hour of '+hr.ruler,(PLANETARY_LITURGY[hr.ruler]||{}).intent||'',tag,{fireKey});
        }
      }
    }
  }catch(e){/* non-fatal */}
}

// Launch engine on page load if previously enabled
function bootNotifications(){
  if(!('Notification' in window))return;
  if(Notification.permission==='granted'&&notifPrefs.enabled){
    registerServiceWorker();
    startNotificationEngine();
  }
}

// ══════════════════════════════════════════════════════════════
// FIXED STARS
// ══════════════════════════════════════════════════════════════
// Ecliptic longitudes at epoch 2026.0 (ICRS → ecliptic).
// Precession advances longitude by ~50.29" per year (~0.01397°/yr).
// The stars below are the principal named stars used in traditional
// astrology. Nature column follows Ptolemy (Tetrabiblos I.9).
//
// nature: Ptolemaic planetary temperament
// magnitude: apparent visual magnitude (lower = brighter)
// Absolute ecliptic longitudes 0-360° at epoch 2026.0 (tropical zodiac).
// lat = ecliptic latitude in degrees.

// Precession-adjusted longitude (small correction for years away from 2026)

// Given a longitude, find fixed stars conjunct within orb (in deg).

// Scan natal planets + angles for fixed-star contacts. Orb: ~1° by default.

// Scan current transit positions for fixed-star contacts. Tighter orb (0.5°).

// ══════════════════════════════════════════════════════════════
// SOURCE-GROUNDED REFERENCE INDEX
// ══════════════════════════════════════════════════════════════
// Per-term practical info — replaces source/lineage with what actually helps when reading a chart.
// {whenItMatters, howToRead, watchFor}
// Each entry: {category, term, summary, source, lineage}
// Categories: Technique, Object, Concept, Tradition, Figure

function groupReferences(){
  const groups={};
  for(const r of REFERENCES){
    if(!groups[r.cat])groups[r.cat]=[];
    groups[r.cat].push(r);
  }
  return groups;
}

// ══════════════════════════════════════════════════════════════
// PLANETARY-DAY LITURGY
// ══════════════════════════════════════════════════════════════
// Traditional correspondences per weekday ruler — color, metal,
// incense, herb, stone, direction, number, day-intent, and a brief
// liturgical focus. Drawn from Picatrix, Agrippa, and common
// Hellenistic-to-Hermetic practice. Used as a gentle daily structure,
// not magical prescription.

function fmtJournalDate(ts){
  const d=new Date(ts);const now=new Date();
  const dayMs=86400000;
  const diff=Math.floor((now-d)/dayMs);
  if(diff===0){
    const hr=d.getHours();const mn=d.getMinutes();
    const ampm=hr>=12?'PM':'AM';const h12=hr===0?12:hr>12?hr-12:hr;
    return'Today '+h12+':'+String(mn).padStart(2,'0')+ampm;
  }
  if(diff===1)return'Yesterday';
  if(diff<7)return diff+' days ago';
  const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  return`${mo} ${d.getDate()}`+(d.getFullYear()!==now.getFullYear()?' '+d.getFullYear():'');
}

// ══════════════════════════════════════════════════════════════
// DEEP INTERPRETATION ENGINE — Layered content system
// ══════════════════════════════════════════════════════════════

// What each planet BRINGS when it transits (activates) something
const TRANSIT_VOICE={
Sun:{theme:'Identity & Vitality',desc:'The Sun illuminates whatever it touches, bringing conscious awareness, vitality, and a desire for authentic expression. It asks: what do you truly want here? This is a brief but clarifying spotlight.'},
Moon:{theme:'Emotions & Instincts',desc:'The Moon stirs your emotional depths and instinctive reactions. It reveals what you need to feel safe and nurtured. These are fast-moving mood shifts that expose deeper feelings you may normally suppress.'},
Mercury:{theme:'Mind & Communication',desc:'Mercury activates your thinking, conversations, decisions, and daily connections. Information arrives, plans form, and your mental process gets stimulated. Pay attention to what you hear, read, and say right now.'},
Venus:{theme:'Love & Values',desc:'Venus brings pleasure, attraction, harmony, and questions about what you truly value. Relationships soften or sweeten. Your sense of beauty and desire for connection heightens. What are you drawn toward?'},
Mars:{theme:'Drive & Action',desc:'Mars pushes you to act, assert, compete, or confront. Your energy and courage spike but so can irritation and impatience. This is fuel — the question is whether you direct it consciously or let it ignite reactively.'},
Jupiter:{theme:'Growth & Opportunity',desc:'Jupiter expands whatever it touches — for better or worse. Doors open, optimism rises, and your perspective broadens. The gift is opportunity; the risk is overextension or taking good fortune for granted.'},
Saturn:{theme:'Structure & Maturity',desc:'Saturn arrives as the teacher demanding accountability. It restricts, tests, and restructures. What isn\'t working gets exposed. This feels heavy, but Saturn builds things that last. Accept the discipline — it\'s building your foundation.'},
Uranus:{theme:'Liberation & Disruption',desc:'Uranus shatters what has become stale or inauthentic. Expect the unexpected — sudden changes, breakthroughs, restlessness, or the urge to break free. What feels destabilizing is actually liberating you from outgrown patterns.'},
Neptune:{theme:'Transcendence & Dissolution',desc:'Neptune dissolves boundaries between real and imagined. Inspiration, spiritual connection, and creativity heighten — but so can confusion, deception, and escapism. Trust your intuition but verify the facts.'},
Pluto:{theme:'Transformation & Power',desc:'Pluto works at the deepest level, forcing confrontation with power, control, and what lies hidden. Nothing superficial survives this transit. What dies needed to die. What emerges is more authentic and powerful than before.'},
Chiron:{theme:'Healing & Vulnerability',desc:'Chiron reopens old wounds — not to punish but to heal. You may feel raw, exposed, or revisit painful patterns. The gift is that your deepest pain, fully faced, becomes your greatest source of wisdom and your ability to heal others.'},
NorthNode:{theme:'Destiny & Evolution',desc:'The North Node creates fated-feeling encounters and nudges you toward your evolutionary path. Events feel significant, karmic, or like course corrections. Pay attention — life is pointing you somewhere important.'},
};

// What each natal point REPRESENTS — personalized to actual birth chart

// How each aspect type modifies the interaction
const ASPECT_VOICE={
conjunction:{label:'Fusion',feel:'Intensely focused',
  desc:'The transit planet\'s energy merges completely with this part of your chart. There\'s no separation — you ARE this energy right now. This is the most personally felt of all aspects. The intensity can be overwhelming or exhilarating depending on the planets involved.',
  advice:'Don\'t resist the merge. Whatever this transit is bringing, lean into it fully. Half-measures won\'t work under a conjunction.'},
opposition:{label:'Awareness',feel:'Pulled in two directions',
  desc:'You feel this transit most clearly through other people and external circumstances. There\'s a tension between what the transit planet demands and what your natal point needs. The key insight: what you\'re seeing "out there" is actually reflecting something within you.',
  advice:'Look for the mirror. The tension you feel with others is showing you something about yourself. Integration, not choosing sides, is the path forward.'},
square:{label:'Challenge',feel:'Pressure to change',
  desc:'This is the aspect of crisis and growth. The transit creates friction that forces action — you can\'t stay comfortable. Something must change, and the discomfort is the catalyst. Squares produce the most tangible, lasting results when you work with them instead of against them.',
  advice:'Don\'t avoid the discomfort — it\'s showing you exactly where growth is needed. Take concrete action. Squares reward courage and initiative.'},
trine:{label:'Flow',feel:'Natural ease',
  desc:'The transit harmoniously supports this area of life. Talents are enhanced, opportunities come easily, and things feel aligned. The energy flows without resistance. The only risk is passivity — trines give gifts, but you still need to reach for them.',
  advice:'This is your window of ease — use it. Start things, create, connect. Don\'t mistake this for permanent — channel the good energy while it lasts.'},
sextile:{label:'Opportunity',feel:'Gentle opening',
  desc:'The transit offers doors that open if you\'re willing to walk through them. Less dramatic than a trine but more motivating — you need to take some initiative. Good for learning, networking, and starting new ventures with natural support.',
  advice:'Take the initiative. This aspect rewards action. The opportunity is real but it won\'t pursue you — you need to step toward it.'},
quincunx:{label:'Adjustment',feel:'Something\'s off',
  desc:'The transit and your natal point have nothing in common, creating a persistent sense that something doesn\'t fit. You can\'t power through or ignore it — creative adaptation is required. Health disruptions, schedule upheavals, and the need to juggle incompatible demands are common.',
  advice:'Stop trying to force things to fit. The lesson here is flexibility and creative problem-solving. Small adjustments, not dramatic overhauls.'},
'semi-sextile':{label:'Subtle Shift',feel:'Background nudge',
  desc:'A quiet, persistent influence working just below conscious awareness. Like a pebble in your shoe — not dramatic but impossible to completely ignore. It slowly shifts your perspective on this area of life without obvious triggers.',
  advice:'Pay attention to small signals and minor irritations. They\'re pointing toward something that needs subtle recalibration.'},
};

// Where in life this plays out (house context)

// ── Special deep interpretations for high-impact transits ──
const DEEP={
Pluto_conjunction_Sun:'Pluto is merging with your Sun — your fundamental identity is being dismantled and rebuilt from the ground up. This is one of the most powerful transits possible, happening only once or twice in a lifetime. You may feel compelled to confront issues of power, control, and authenticity that you\'ve avoided for years. Old identities, roles, and self-concepts that no longer reflect who you truly are will be stripped away. This can feel like an ego death. Relationships, career paths, and life structures that were built on a false foundation may collapse. What emerges is a more powerful, authentic version of you — but the process is not gentle. Trust the transformation even when it feels like destruction.',
Pluto_conjunction_Moon:'Pluto is sitting on your Moon, dredging up your deepest emotional patterns, childhood wounds, and unconscious needs. This is an emotional pressure cooker. Feelings you\'ve suppressed for years — grief, rage, fear, longing — demand to be felt and processed. Your relationship with women, mother figures, and your own nurturing instincts undergoes radical transformation. You may become obsessive about emotional security or go through periods of intense isolation. The gift: emotional honesty and depth that wasn\'t possible before. You\'re learning to feel everything fully and survive it.',
Pluto_conjunction_Uranus:'A once-in-a-lifetime transit reshaping your relationship with individuality, freedom, and radical change. The structures of your independence are being transformed at the deepest level. Expect sudden, permanent shifts in how you express your uniqueness. Old rebellions become mature liberation. What felt like chaos becomes your authentic path.',
Saturn_conjunction_Sun:'Saturn is sitting on your Sun — your core identity is being tested and restructured. This happens roughly every 29 years and marks a major maturation point. You may feel heavy, burdened with new responsibilities, or confronted by authority figures. Energy can feel low. But this isn\'t punishment — it\'s crystallization. Saturn asks: is your life reflecting who you truly are? Where the answer is no, things fall away. What survives has been proven real. Accept the weight — it\'s building something that lasts for decades.',
Saturn_conjunction_Moon:'Saturn is pressing on your Moon — your emotional life, comfort zone, and sense of inner security are being restructured. This can feel isolating, emotionally cold, or like your needs aren\'t being met. Old emotional patterns and dependencies that no longer serve you are being outgrown. Relationships with family or mother figures may feel strained. But Saturn is teaching you emotional maturity — the ability to nurture yourself, set healthy boundaries, and build genuine inner stability rather than depending on external comfort.',
Saturn_conjunction_Saturn:'Your Saturn Return — one of astrology\'s most significant passages. Everything in your life that isn\'t working, that was built on someone else\'s expectations, or that you\'ve outgrown now demands restructuring. Careers change, relationships end or solidify, and you\'re forced to take full responsibility for your own life. It\'s heavy but necessary. This is the bridge between youth and true adulthood. What you build in the next two years will define the next 29.',
Saturn_conjunction_Mercury:'Saturn is restructuring how you think, communicate, and make decisions. Your mind becomes more disciplined but may also feel heavy or pessimistic. Important contracts, tests, or formal communications demand precision. You\'re learning to think more carefully, speak more deliberately, and commit to ideas that have lasting value. Mental shortcuts and casual promises no longer work.',
Saturn_conjunction_Venus:'Saturn is testing your relationships and values. Love feels serious, commitments deepen or end, and superficial connections fall away. You may feel lonely or question whether you deserve love. Financial discipline is required. But this transit builds lasting bonds — the relationships and values that survive Saturn\'s test are the real ones.',
Saturn_conjunction_Mars:'Saturn is putting the brakes on your drive and ambition. You may feel frustrated, blocked, or physically depleted. Anger simmers without easy release. But this transit teaches you disciplined action — the difference between explosive impulse and sustained effort. Channel the frustration into patient, strategic work. What you build through this restriction will outlast anything achieved through raw force.',
Jupiter_conjunction_Sun:'Jupiter is expanding your sense of self, bringing optimism, confidence, and new opportunities. This is one of the luckiest transits — doors open, people are generous, and you feel like more is possible. Travel, education, and publishing are favored. The risk is overconfidence or taking on too much. Enjoy the expansion but keep one foot on the ground.',
Jupiter_conjunction_Moon:'Jupiter warms your emotional life, bringing comfort, generosity, and a sense of emotional abundance. Home improvements, family celebrations, and feeling nurtured are highlighted. Your intuition is strong and your capacity for empathy expands. A wonderful time for emotional healing and deepening family bonds.',
Jupiter_conjunction_Jupiter:'Your Jupiter Return — a renewal of faith, vision, and life direction that happens every 12 years. Your philosophical outlook refreshes, new teachers or mentors may appear, and you feel a pull toward growth and adventure. It\'s time to dream bigger and recommit to what gives your life meaning.',
Uranus_conjunction_Sun:'Uranus is electrifying your identity — expect sudden, liberating changes to who you are and how you live. This transit can feel like an earthquake in your sense of self. Old identities crack open. You may change careers, relationships, locations, or appearance dramatically and suddenly. The common thread is authenticity: whatever was constraining your true nature gets shattered. Embrace the disruption — you\'re becoming more yourself than ever.',
Uranus_conjunction_Moon:'Uranus is disrupting your emotional patterns and domestic life. Expect sudden mood swings, unexpected changes at home, and a fierce need for emotional freedom. Old comfort zones feel suffocating. You may move suddenly, change family dynamics, or discover emotions you didn\'t know you had. Unsettling but ultimately liberating.',
Neptune_conjunction_Sun:'Neptune is dissolving the boundaries of your identity. You may feel confused about who you are, unusually sensitive, or drawn to spiritual and creative pursuits. Your ego softens — which can be beautiful (compassion, inspiration) or disorienting (confusion, loss of direction). Stay grounded in practical routines while allowing your identity to become more fluid and compassionate.',
Neptune_conjunction_Moon:'Neptune is dissolving your emotional boundaries. Empathy heightens to an almost psychic degree. You absorb others\' feelings, dreams become vivid and meaningful, and you may feel uncharacteristically vulnerable. Beautiful for artistic and spiritual growth, but watch for emotional manipulation, substance issues, or difficulty distinguishing your feelings from others\'.',
Chiron_conjunction_Sun:'Chiron is touching your core identity, reopening fundamental wounds around self-worth and purpose. You may revisit old pain about not being seen, valued, or allowed to be yourself. This hurts — but it\'s healing. By facing these wounds consciously, you transform them into wisdom. You emerge as someone who can help others face their own identity crises.',
Chiron_conjunction_Moon:'Chiron is pressing on your deepest emotional wounds — particularly around nurturing, belonging, and mother. Old feelings of abandonment, emotional neglect, or not being allowed to have needs may surface with surprising intensity. This is deep healing work. Allow the feelings without judgment.',
Chiron_conjunction_Chiron:'Your Chiron Return (around age 50) — a profound encounter with your core wound and the wisdom it has given you. You\'re being asked to fully accept the wound you\'ve carried your whole life and recognize how it became your greatest gift. This is when the wounded healer archetype fully activates.',
NorthNode_conjunction_Sun:'The North Node is activating your Sun — a fated period for your identity and life purpose. Encounters feel destined. You may meet people or encounter situations that accelerate your growth in exactly the direction your soul needs to go. Say yes to what calls you, even if it\'s unfamiliar.',
Saturn_square_Sun:'Saturn is creating friction with your identity and life direction. You feel tested, restricted, and forced to prove yourself. Authority figures challenge you. Responsibilities mount. But this pressure is refining you — it reveals where your life structure is weak and demands you strengthen it through effort, not luck.',
Saturn_opposition_Sun:'Saturn opposes your Sun, creating tension between your desires and external demands. You may feel like the world is pushing back against who you are. Relationships with authority, partners, or institutions feel strained. The lesson: mature self-expression means balancing your needs with your responsibilities to others.',
Pluto_square_Sun:'Pluto is creating intense friction with your core identity. Power struggles, control issues, and confrontations with dark truths about yourself and others dominate. Something about how you\'ve been living is fundamentally unsustainable and Pluto is forcing a crisis to catalyze change. Resist the urge to manipulate or control — surrender to the transformation.',
Pluto_opposition_Sun:'Pluto opposes your Sun, projecting its transformative intensity through other people and external events. Someone or something is forcing you to confront your shadow — issues of power, control, jealousy, or manipulation that you\'d rather not see. The transformation happens when you own these qualities in yourself rather than fighting them in others.',
Uranus_square_Sun:'Uranus is shaking the foundations of your identity through unexpected challenges and disruptions. You feel restless, rebellious, and desperate for change — but the path isn\'t clear. Impulsive decisions tempt you. The key is conscious revolution: make the changes you need, but with some awareness of consequences.',
Jupiter_trine_Sun:'Beautiful flow between expansion and your core self. Confidence comes naturally, opportunities align with who you are, and generosity flows both ways. Travel, education, and creative expression are especially favored. This is harvest energy — enjoy what you\'ve built.',
Saturn_trine_Sun:'Saturn supports your identity with steady, reliable energy. Your discipline pays off. Authority figures recognize your competence. This is a time of quiet achievement — nothing flashy, but the results are solid and lasting. Good for long-term commitments.',

// ── Transits to Ascendant ──
Pluto_conjunction_Ascendant:'Pluto is crossing your Ascendant — one of the most powerful identity transits possible. Your entire self-presentation, physical appearance, and the way others perceive you is undergoing radical transformation. People may find you more intense, magnetic, or intimidating. Power dynamics in close relationships shift fundamentally. You may experience a physical transformation, a complete image overhaul, or a crisis that forces you to show the world who you really are beneath all the masks. This transit burns away every false persona.',
Saturn_conjunction_Ascendant:'Saturn is crossing your Ascendant, beginning a new 29-year cycle of personal development. You feel the weight of new responsibilities settling onto your shoulders. Your appearance may seem more serious or aged. Others perceive you as more authoritative but also more distant. This is a major maturation point — you are being asked to take full ownership of how you show up in the world. Health and physical vitality need attention. The structures you build around your identity now will define you for years.',
Uranus_conjunction_Ascendant:'Uranus crossing your Ascendant is a lightning bolt to your identity. Your appearance, style, and entire approach to life changes suddenly and dramatically. You may feel unrecognizable to people who knew the old you — and that is exactly the point. Restlessness is extreme. Relationships that cannot accommodate the new you will fall away. This is liberation from every way you have been performing instead of being authentic.',
Jupiter_conjunction_Ascendant:'Jupiter crossing your Ascendant brings a wave of optimism, confidence, and opportunity to your personal life. You feel expansive, generous, and magnetic. Others are drawn to your warmth. Physical health improves, weight may fluctuate (Jupiter expands everything). New beginnings feel blessed. Travel, education, and personal growth accelerate. You are larger than life right now — enjoy it but stay grounded.',
Neptune_conjunction_Ascendant:'Neptune dissolving across your Ascendant blurs the boundaries of your identity. You become more empathetic, intuitive, and creatively inspired — but also more confused about who you are. Others project their fantasies onto you. You may appear glamorous or mysterious without trying. Watch for deception in close relationships and avoid substances that blur your already-soft boundaries. Channel this into art, spirituality, or compassionate service.',
Chiron_conjunction_Ascendant:'Chiron crossing your Ascendant reopens wounds around your identity, body, and how you present yourself to the world. Old insecurities about appearance, acceptability, or your right to take up space surface with surprising force. You may feel exposed or raw in social situations. But this vulnerability is the doorway to deep healing — by facing these wounds publicly, you become someone who gives others permission to be imperfect too.',
Pluto_square_Ascendant:'Pluto is creating intense friction with your public identity. Power struggles with others challenge how you present yourself. Someone or something is trying to control your image, your body, or your autonomy. The pressure forces you to claim your power more consciously — to stop accommodating others at the expense of your authentic self.',
Saturn_square_Ascendant:'Saturn creates friction between your responsibilities and your personal identity. You feel constrained, judged, or unable to express yourself freely. Physical energy may be low. The lesson is finding a sustainable way to be yourself while honoring your commitments to others.',
Uranus_square_Ascendant:'Uranus disrupts your identity through unexpected external events. Relationships, living situations, or your physical circumstances change suddenly, forcing you to adapt who you are. The restlessness is productive if you channel it into conscious reinvention rather than reactive decisions.',
Saturn_opposition_Ascendant:'Saturn opposing your Ascendant focuses its weight on your closest relationships. Partners, collaborators, and one-on-one connections demand maturity, commitment, or dissolution. You cannot hide behind charm — others see you clearly and expect substance. Relationships that survive this are built to last.',
Pluto_opposition_Ascendant:'Pluto opposing your Ascendant projects its transformative intensity through your closest relationships. A partner, collaborator, or adversary becomes the catalyst for deep personal change. Power struggles in relationships force you to confront your own need for control. The transformation happens through the mirror of others.',

// ── Transits to MC (Midheaven) ──
Pluto_conjunction_MC:'Pluto is crossing your Midheaven — your career, public reputation, and life direction are being fundamentally transformed. You may experience a total career change, a dramatic rise or fall in status, or a confrontation with authority that redefines your professional identity. Power dynamics with bosses, institutions, or the public become intense. What emerges is a career path that reflects your deepest authentic ambitions, not what you thought you should want.',
Saturn_conjunction_MC:'Saturn crossing your Midheaven is the peak of a 29-year career cycle. Maximum professional responsibility, visibility, and pressure arrive simultaneously. You may receive a promotion, a major achievement, or a sobering realization about what your career has cost you. This is the summit — what you have built is now visible to everyone. If the foundation was solid, you are rewarded. If not, restructuring is required.',
Jupiter_conjunction_MC:'Jupiter crossing your Midheaven is one of the best career transits possible. Professional opportunities expand, recognition arrives, and your reputation grows. Promotions, public honors, or a lucky break in your field are likely. Your vision for your life direction broadens. Say yes to opportunities that align with your authentic ambitions.',
Uranus_conjunction_MC:'Uranus crossing your Midheaven shatters your career trajectory. A sudden job change, unexpected recognition, or dramatic disruption to your professional life forces you onto an entirely new path. The career you thought you wanted may fall away to reveal the career your authentic self actually needs. Embrace the chaos — it is redirecting you.',
Neptune_conjunction_MC:'Neptune dissolving across your Midheaven creates confusion about your career direction and public identity. Your professional goals become foggy. You may feel disillusioned with success or drawn toward more spiritual, creative, or service-oriented work. Others may misperceive your professional identity. Stay flexible — clarity will come, but not on your timeline.',
Chiron_conjunction_MC:'Chiron crossing your Midheaven brings old wounds about achievement, authority, and public recognition to the surface. You may feel inadequate professionally, revisit failures, or question whether your career reflects your true purpose. The healing comes through accepting that your vulnerabilities and struggles are part of what makes your contribution unique.',
Saturn_square_MC:'Saturn creates friction with your career path. Professional obstacles, authority conflicts, or a sense of being stuck force you to reassess whether your current direction is truly right. Hard work is required but may feel unrewarded in the short term. The structures you strengthen now support long-term professional success.',
Pluto_square_MC:'Pluto creates intense pressure on your career and public life. Power struggles with bosses or institutions, ethical dilemmas, or forced career changes demand that you align your professional life with your deepest values. Superficial ambition gets destroyed — only authentic purpose survives.',

// ── Hard aspects to Moon ──
Pluto_square_Moon:'Pluto is creating intense emotional friction. Compulsive feelings, jealousy, control issues in intimate relationships, and confrontations with deep psychological patterns dominate. Your emotional security is being challenged at a fundamental level. Old coping mechanisms — emotional manipulation, withdrawal, or obsessive attachment — are being exposed. The pressure forces emotional honesty that was previously impossible.',
Pluto_opposition_Moon:'Pluto opposing your Moon projects its intensity through intimate relationships and family dynamics. Someone close to you becomes the catalyst for deep emotional transformation. You may feel emotionally overwhelmed, controlled, or manipulated — but the real work is recognizing these patterns within yourself. Emotional power that was given away is being reclaimed.',
Uranus_square_Moon:'Uranus is disrupting your emotional patterns through unexpected events at home, in family, or in your inner world. Sudden mood swings, restlessness, and a fierce need for emotional freedom make your usual comfort zones feel suffocating. Relationships that restrict your emotional authenticity become unbearable. The disruption serves liberation.',
Uranus_opposition_Moon:'Uranus opposing your Moon creates sudden disruptions in domestic life, family relationships, and emotional security. Unexpected events force you out of emotional ruts. A move, a family upheaval, or a sudden shift in your closest relationships breaks patterns you didn\'t realize were constraining you. Unsettling but ultimately freeing.',
Saturn_square_Moon:'Saturn is pressing against your emotional nature, creating feelings of isolation, emotional coldness, or inadequacy. Family obligations weigh heavily. You may feel unable to express your needs or receive the nurturing you crave. The lesson is learning to provide your own emotional security — to be your own source of comfort rather than depending on others.',
Saturn_opposition_Moon:'Saturn opposing your Moon creates tension between your professional responsibilities and your emotional needs. Work-life balance feels impossible. Family or domestic situations demand sacrifice. You may feel emotionally unsupported by partners or family. Building genuine inner security — not dependent on external validation — is the work.',
Neptune_square_Sun:'Neptune creates confusion and dissolution around your identity and life direction. Boundaries between self and others blur uncomfortably. You may feel lost, disillusioned, or deceived about who you are. Creative and spiritual inspiration is high, but so is the risk of escapism, substance issues, or self-deception. Stay anchored in practical reality while allowing your identity to evolve.',
Neptune_opposition_Sun:'Neptune opposing your Sun projects its dissolving energy through other people. You may idealize partners, be deceived in relationships, or attract people who mirror your own confusion back to you. Discernment in relationships is essential. The lesson is compassion without self-abandonment.',
Neptune_square_Moon:'Neptune dissolves your emotional boundaries, creating heightened sensitivity, confusion, and vulnerability. You absorb others\' emotions like a sponge. Dreams are vivid and meaningful but daily life feels foggy. Family secrets or illusions about your childhood may surface. Channel the sensitivity into creative expression rather than escapism.',
Neptune_opposition_Moon:'Neptune opposing your Moon creates emotional confusion through relationships and family dynamics. You may idealize family members or partners, ignoring red flags. Boundaries in intimate relationships dissolve — beautiful for empathy, dangerous for codependency. Trust your intuition but verify the facts about the people closest to you.',

// ── Additional important transits ──
Jupiter_square_Sun:'Jupiter creates tension through overexpansion of your ego and life direction. You may take on too much, overcommit, or become arrogant. The friction between your ambitions and your actual capacity forces a correction. Scale back the grandiose plans and focus on what is genuinely achievable. Growth requires pruning.',
Jupiter_opposition_Sun:'Jupiter opposing your Sun inflates expectations in relationships and external circumstances. Others may overpromise, or you may expect too much from partnerships. Legal matters, business deals, and philosophical disagreements test your judgment. The lesson is balanced optimism — hope without naivety.',
Jupiter_square_Moon:'Jupiter creates emotional overexpansion. Feelings are amplified — generosity is excessive, indulgence is tempting, and emotional boundaries are too loose. Family situations may become overwhelming in their abundance. The challenge is enjoying emotional richness without losing your center.',
Uranus_opposition_Sun:'Uranus opposing your Sun creates sudden disruptions through other people and external events. Partners, collaborators, or circumstances shock you out of complacency. The tension between who you have been and who you are becoming plays out through relationships. Liberation comes through integrating the disruption rather than fighting it.',
Chiron_square_Sun:'Chiron creates friction with your core identity through painful encounters with your deepest insecurities. You may feel fundamentally inadequate or face situations that trigger old wounds about your worth. The pain is purposeful — it is showing you exactly where healing is needed so you can finally address what you have been avoiding.',
Chiron_opposition_Sun:'Chiron opposing your Sun brings your core wound into your relationships. Others trigger your deepest insecurities, or you find yourself drawn to wounded people who mirror your own pain. The healing comes through seeing your wound reflected in others and recognizing that your vulnerability is also your greatest gift.',
NorthNode_conjunction_Moon:'The North Node activating your Moon creates fated emotional encounters and shifts in your domestic life. You may feel drawn to new living situations, family connections, or emotional experiences that feel destined. Trust what feels deeply right even if it does not make logical sense — your soul is guiding you toward emotional growth.',
NorthNode_conjunction_Ascendant:'The North Node crossing your Ascendant is one of the most personally fated transits. Your identity is being pulled toward its evolutionary direction. People enter your life who accelerate your growth. Opportunities that align with your soul purpose appear. Say yes to what feels like destiny, even if it requires becoming someone new.',
NorthNode_conjunction_MC:'The North Node activating your Midheaven creates fated career developments. Professional opportunities feel destined. Mentors, authority figures, or public recognition arrive at exactly the right moment. Your career is being aligned with your soul purpose. Trust the direction life is pointing you professionally.',
};

// ── Retrograde interpretations per planet ──
const RETRO_VOICE={
Mercury:'Mercury retrograde turns communication, technology, and travel inside out. Misunderstandings multiply, old contacts reappear, and plans unravel. But this isn\'t just chaos — it\'s an invitation to review, revise, and reconsider. Reread the fine print. Reconnect with people from your past. Redo what was rushed. The slowdown is the point.',
Venus:'Venus retrograde pulls you inward to reassess relationships, finances, and what you truly value. Old lovers may resurface. Attractions feel confused. It\'s not the time to start new relationships or make major purchases — instead, reflect on what and who you genuinely love versus what was just comfortable.',
Mars:'Mars retrograde frustrates your drive and initiative. Energy levels drop, anger simmers without productive outlet, and projects stall. Don\'t start new ventures or pick fights. Instead, review your strategies, redirect your ambition, and address the anger you\'ve been suppressing. When Mars goes direct, you\'ll know exactly where to aim.',
Jupiter:'Jupiter retrograde turns growth inward. External expansion slows so you can digest what you\'ve already experienced. It\'s time to develop inner wisdom, revisit abandoned studies, and question whether your beliefs still serve your growth. The expansion continues — it\'s just happening on the inside.',
Saturn:'Saturn retrograde reviews your commitments, structures, and responsibilities. Are you disciplined in the right areas? Are your boundaries healthy? Old duties resurface and demand attention. Karmic debts come due. This is maintenance work on the foundation of your life.',
Uranus:'Uranus retrograde internalizes the revolution. Instead of external upheaval, the disruption happens in your psyche — old conditioning breaks down, and you quietly shed beliefs and patterns that were limiting your freedom. The breakthrough is internal first.',
Neptune:'Neptune retrograde lifts the fog slightly, offering clearer vision about where you\'ve been deceiving yourself or others. Illusions become harder to maintain. Dreams become more symbolic and revelatory. Use this clarity for spiritual refinement and creative editing.',
Pluto:'Pluto retrograde turns its transformative intensity inward. External power struggles ease but internal psychological work intensifies. You\'re processing deep changes that were initiated when Pluto was direct. Allow the inner alchemy without rushing back to external action.',
Chiron:'Chiron retrograde deepens your healing work. Wounds you thought were resolved may resurface for another layer of processing. This is refinement, not regression. You\'re developing deeper compassion and wisdom from your pain.',
};

// ── Educational glossary ──
const GLOSSARY={
'Orb':'The orb is how far from exact an aspect is, measured in degrees. A 0° orb means the aspect is perfectly exact and at peak intensity. A wider orb (like 5-8°) means the aspect is present but weaker. Think of it like standing near a campfire — the closer you are (smaller orb), the more heat you feel.',
'Applying':'An applying aspect means the transit planet is moving TOWARD exact alignment with your natal point. The energy is building, becoming stronger each day. Think of it like a wave approaching the shore — the impact hasn\'t peaked yet.',
'Separating':'A separating aspect means the transit planet has already passed the exact point and is moving away. The energy is fading. The peak experience has passed, and you\'re now integrating what happened.',
'Exact':'An exact aspect means the transit planet is at the precise degree of alignment with your natal point (0° orb). This is the peak moment of the transit — its influence is at maximum intensity.',
'Stationary':'A stationary planet appears to stand still in the sky as it shifts between direct and retrograde motion. A stationary planet\'s energy is concentrated and intensified, like a magnifying glass focusing sunlight.',
'Retrograde':'When a planet appears to move backward through the zodiac (an optical illusion caused by orbital mechanics). Retrograde periods are times of review, revision, and internalization of that planet\'s themes.',
'Void of Course':'The Moon is void of course when it makes no more major aspects before changing signs. Traditional astrology says: don\'t start important new things during VOC. Existing projects are fine; new initiatives may fizzle. Good for routine tasks, rest, and meditation.',
'Transit':'A transit is when a currently-moving planet forms an aspect (geometric angle) to a point in your birth chart. It\'s how the current sky activates your personal astrology.',
'House':'Houses are 12 divisions of your birth chart, each governing a different area of life (identity, money, communication, home, etc.). When a transit happens in a particular house, that life area gets activated.',
'Conjunction':'Two planets at the same degree (0°). The most intense aspect — their energies merge completely. Can be harmonious or challenging depending on the planets.',
'Opposition':'Two planets 180° apart. Creates tension, awareness, and often plays out through relationships and external events. The lesson is finding balance between two opposing needs.',
'Square':'Two planets 90° apart. Creates friction, pressure, and the motivation to act. Challenging but productive — squares are where the most growth happens.',
'Trine':'Two planets 120° apart. Natural harmony and flow. Talents and opportunities come easily. The risk is passivity.',
'Sextile':'Two planets 60° apart. Gentle opportunities that reward initiative. Less dramatic than a trine but more motivating.',
'Dignity':'A planet\'s dignity describes how well it functions in a particular zodiac sign. A planet in its own sign (domicile) is at full power. In the opposite sign (detriment), it struggles.',
'Energy Score':'A composite rating (1-10) reflecting the overall tone of today\'s transits. Higher scores indicate more harmonious, flowing energy. Lower scores indicate more challenging, growth-oriented energy. Neither is inherently good or bad — easy days offer comfort while challenging days drive the most transformation.',
'VOC_REC':'The Moon makes no more aspects before leaving the sign. Don\'t start anything new — new projects, important emails, big purchases, or first dates begun during Void of Course tend to fizzle. Good window for: finishing what\'s in progress, organizing, routine maintenance, rest, meditation, and sleeping on decisions.',
'STATION_REC':'A planet appearing to stop in the sky concentrates its power to an extreme point. Whatever this planet signifies is amplified far beyond its normal volume today. Move carefully in its domain — the energy is intense and focused.',
'RETRO_REC_Mercury':'Mercury retrograde: communication tangles, technology glitches, and old contacts resurfacing. Review contracts before signing. Back up your data. Reconnect with people from your past. Don\'t launch — refine.',
'RETRO_REC_Venus':'Venus retrograde: relationships from the past return for reconsideration. Your sense of what you value and who you love is being revised. Not the time for major purchases, cosmetic changes, or new romantic commitments.',
'RETRO_REC_Mars':'Mars retrograde: your energy and drive turn inward. Direct action meets resistance; push too hard and you exhaust yourself. Conserve energy, revisit old projects, and let simmering frustrations cool before acting on them.',
'RETRO_REC_Jupiter':'Jupiter retrograde: growth turns inward. External expansion slows while inner wisdom deepens. Good for philosophical reflection, education, and revising your belief system. Bad for overextending.',
'RETRO_REC_Saturn':'Saturn retrograde: structures you\'ve built are tested from within. Revisit old responsibilities, reassess commitments, and shore up foundations. Discipline applied internally now prevents external collapse later.',
'RETRO_REC_Uranus':'Uranus retrograde: the impulse toward change turns reflective. Rather than breaking free externally, you\'re processing where authentic liberation actually lies. Inner revolution precedes outer.',
'RETRO_REC_Neptune':'Neptune retrograde: the fog clears slightly. Illusions you\'ve held become more visible. Good for seeing through self-deception, reassessing spiritual practices, and getting honest about escapist habits.',
'RETRO_REC_Pluto':'Pluto retrograde: transformation deepens rather than erupts. The deep psychological work goes underground. Power dynamics that were playing out externally are now being processed internally.',
'RETRO_REC_Chiron':'Chiron retrograde: healing turns inward. Wounds you thought were resolved resurface for another layer. This is refinement, not regression. Trust the process.',
'Profection':'A traditional Hellenistic timing technique. Every year of life, one sign of your chart (starting from the Ascendant) becomes activated. The ruler of that sign becomes your "Time Lord" for the year — the planet whose themes dominate. Each month within that year, a second sign is activated. It tells you which chapter of life you\'re reading.',
'Sect Light':'In Hellenistic astrology, every chart has a "sect" — diurnal (day) or nocturnal (night), based on whether the Sun was above or below the horizon at birth. Day charts are ruled by the Sun; night charts by the Moon. The Sect Light is the luminary of your sect — the one that guides your core vitality.',
'Decan':'Each 30° sign divides into three 10° "decans" or "faces," each ruled by a different planet in Chaldean order. The decan gives finer detail to a planet\'s expression. In Picatrix tradition, each decan also has a talismanic image used for magical work.',
'Lunar Mansion':'The 28 Manazil al-Qamar — lunar mansions from Perso-Arabic astrology. As the Moon travels the zodiac each month, it passes through 28 stations of ~12.86° each. Each mansion has traditional indications for what magic or action it favors. Picatrix gives specific recommendations for travel, healing, love, and other workings.',
'Lots':'Hermetic Lots (sometimes called Arabic Parts) are mathematical points on the chart derived from distances between planets. The seven Hermetic Lots — Fortune, Spirit, Eros, Necessity, Courage, Victory, Nemesis — describe the geometry of destiny, will, love, compulsion, courage, victory, and fate\'s hidden edge.',
'Zodiacal Releasing':'A Hellenistic timing technique from Vettius Valens. Starting from a Lot (Fortune for body/external life; Spirit for soul/action), time unfolds in nested chapters: L1 = major period (years), L2 = sub-period (months). Peak periods (when the activated sign is angular to the start) are moments of heightened significance. "Loosing of the Bond" marks major life pivots.',
'Firdaria':'A Perso-Arabic timing system where each planet rules a span of years in sequence (75 years total for the full cycle). Day charts start with the Sun; night charts with the Moon. Each major period subdivides into sub-periods ruled by the other planets, giving layered timing.',
'Fixed Stars':'Beyond the planets, fixed stars — like Regulus, Spica, Algol, Antares — were used for millennia to mark fate, royalty, and catastrophe. When a natal planet sits within ~1° of a bright named star, the star\'s nature threads through that planet\'s expression.',
'Planetary Hours':'Each daylight and nighttime period divides into 12 unequal hours, each ruled by a planet in Chaldean order (Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon). The ruling planet of an hour is the best time for activities matching that planet\'s nature.',
'Moon Phase':'The Moon\'s cycle from New to Full and back takes ~29.5 days. Each phase carries its own energy: New Moon = begin, First Quarter = build, Full Moon = culmination, Last Quarter = release. Illumination percentage shows how much of the Moon\'s disk is visible.',
};

// ── Combine layers into full interpretation ──
function getDeepInterp(tp,np,aspectName,house){
  const key=tp+'_'+aspectName+'_'+np;
  const deep=DEEP[key];
  const tv=TRANSIT_VOICE[tp]||{};
  const nv=NATAL_VOICE[np]||{};
  const av=ASPECT_VOICE[aspectName]||{};
  const hv=HOUSE_VOICE[house]||{};

  let summary='',full='',advice='',houseContext='';

  if(deep){
    summary=deep.split('. ').slice(0,2).join('. ')+'.';
    full=deep;
  }else{
    const tDesc=tv.desc||'A subtle cosmic influence is at work.';
    const nDesc=nv.desc||'';
    const aDesc=av.desc||'';
    summary=`${tv.theme||tp} energy is activating ${nv.title||np}. ${av.feel||''} — ${(av.desc||'').split('.')[0]}.`;
    full=tDesc+'\n\n'+aDesc;
    if(nDesc)full+='\n\nIn your chart, this targets '+nDesc.charAt(0).toLowerCase()+nDesc.slice(1);
  }
  advice=av.advice||'';
  const tpPIH=planetInHouse(tPlanet,house);
  if(tpPIH)houseContext='Playing out in your '+hv.name+' sector: '+tpPIH;
  else if(hv.desc)houseContext='Playing out in your '+hv.name+' sector: '+houseVoiceDesc(house);

  return{summary,full,advice,houseContext,aspectLabel:av.label||aspectName,aspectFeel:av.feel||''};
}

// ── Moon sign emotional flavor ──
const MOON_SIGN_FLAVOR={
Aries:'The Moon in Aries charges the emotional atmosphere with urgency, impulsiveness, and a need for action. Feelings are hot and fast — quick to flare, quick to pass. Good for bold moves, bad for patience.',
Taurus:'The Moon in Taurus steadies the emotional atmosphere. You crave comfort, good food, physical pleasure, and stability. Feelings are slow and grounded. A good day to savor what you have rather than chase what you don\'t.',
Gemini:'The Moon in Gemini makes the emotional atmosphere restless and chatty. Feelings process through talking, texting, and thinking. You need variety and stimulation. A good day for conversations, learning, and connecting with your immediate world.',
Cancer:'The Moon in Cancer — its home sign — heightens emotional sensitivity to its peak. Feelings are deep, nurturing instincts are strong, and you crave the comfort of home and family. A powerful day for emotional honesty and self-care.',
Leo:'The Moon in Leo warms the emotional atmosphere with generosity, drama, and a need for recognition. Creativity flows, self-expression feels natural, and you want to be seen and appreciated. Follow what makes your heart sing.',
Virgo:'The Moon in Virgo brings a practical, detail-oriented quality to the emotional atmosphere. You feel better when things are organized, clean, and useful. Good for health routines, problem-solving, and service — but watch for over-analysis of feelings.',
Libra:'The Moon in Libra smooths the emotional atmosphere with a need for harmony, beauty, and connection. Relationships are front and center. You seek balance and fairness. A good day for partnerships, aesthetics, and diplomacy.',
Scorpio:'The Moon in Scorpio deepens the emotional atmosphere to its most intense. Feelings are powerful, perceptive, and potentially obsessive. You see beneath the surface of everything. Good for deep conversations and transformation — bad for superficial interactions.',
Sagittarius:'The Moon in Sagittarius lifts the emotional atmosphere with optimism, restlessness, and a hunger for meaning. You need freedom, adventure, and big-picture perspective. A good day for exploration and philosophical thinking — bad for detail work.',
Capricorn:'The Moon in Capricorn sobers the emotional atmosphere. Feelings are measured, controlled, and practical. You process emotions through achievement and structure. A productive day — but make sure you\'re not burying feelings under work.',
Aquarius:'The Moon in Aquarius detaches the emotional atmosphere from personal concerns and lifts it toward the collective. You feel more rational, idealistic, and socially oriented. Good for community, innovation, and humanitarian thinking.',
Pisces:'The Moon in Pisces dissolves the emotional atmosphere into sensitivity, imagination, and empathy. Boundaries blur, intuition sharpens, and you absorb the moods of everyone around you. A beautiful day for creativity and spirituality — but protect your energy.'
};

// ── Dominant planet flavor for guidance ──
const DOMINANT_FLAVOR={
Saturn:'Saturn is driving today\'s energy, bringing themes of discipline, responsibility, and necessary limitation. This is a day for serious work, facing obligations head-on, and building things that last. Resist the urge to escape the pressure — lean into it.',
Pluto:'Pluto dominates today\'s cosmic weather, pulling you toward deep transformation, power dynamics, and confrontation with what\'s hidden. Intensity is unavoidable. What feels like destruction is actually clearing space for something more authentic.',
Neptune:'Neptune colors today\'s energy with dreaminess, inspiration, and blurred boundaries. Your intuition is heightened but so is your susceptibility to confusion. Trust your creative impulses but double-check the facts.',
Uranus:'Uranus electrifies today\'s energy with unpredictability, restlessness, and flashes of insight. Expect the unexpected. Routine feels unbearable. The disruptions are pointing you toward greater authenticity.',
Jupiter:'Jupiter expands today\'s energy with optimism, opportunity, and the desire for growth. Doors open, perspectives broaden, and generosity flows. The risk is overextension — channel the abundance wisely.',
Mars:'Mars fuels today\'s energy with drive, assertion, and potentially friction. You have the energy to push through obstacles, but impatience and irritability are elevated. Direct the fire consciously.',
Venus:'Venus softens today\'s energy with themes of love, beauty, pleasure, and connection. Relationships harmonize, creativity flows, and your appreciation for life\'s sweetness deepens. A good day for the heart.',
Mercury:'Mercury sharpens today\'s energy with mental activity, conversations, and information exchange. Your thinking is active and communication matters more than usual. Pay attention to what you hear and say.',
Sun:'The Sun illuminates today\'s energy with clarity about identity and purpose. Who you are and what you want comes into focus. Express yourself with confidence.',
Moon:'The Moon colors today\'s energy with emotional shifts, instinctive reactions, and a need for comfort. Honor your feelings without letting them drive every decision.',
Chiron:'Chiron colors today\'s energy with healing themes. Old wounds may surface, but they are surfacing because you are ready to face them. Vulnerability is not weakness today — it\'s wisdom.',
NorthNode:'The North Node gives today a fated quality. Events and encounters feel significant, as if life is pointing you somewhere important. Pay attention to synchronicities.'
};

// ══════════════════════════════════════════════════════════════
// HERMETIC SYNTHESIS ENGINE — Three-layer interpretive system
// ══════════════════════════════════════════════════════════════

// Planets as spherical intelligences (Hermetic significatory register)
const SPHERE={
Sun:{name:'the Sun',office:'illuminates and clarifies',when_active:'what you truly want becomes visible',when_stressed:'your sense of purpose is tested',domain:'identity and authentic expression'},
Moon:{name:'the Moon',office:'reflects and nourishes',when_active:'feelings run close to the surface and instincts sharpen',when_stressed:'emotional security feels uncertain',domain:'feeling, memory, and the body\'s rhythms'},
Mercury:{name:'Mercury',office:'connects and discerns',when_active:'your mind is quick and conversations carry weight',when_stressed:'misunderstandings multiply and plans tangle',domain:'thought, speech, and the movement of information'},
Venus:{name:'Venus',office:'harmonizes and attracts',when_active:'what you love and what loves you move closer together',when_stressed:'relationships reveal their fault lines',domain:'desire, beauty, and the bonds between people'},
Mars:{name:'Mars',office:'tests and initiates',when_active:'you have the fuel to push through obstacles',when_stressed:'friction rises and patience thins',domain:'action, courage, and the will to contend'},
Jupiter:{name:'Jupiter',office:'expands and blesses',when_active:'doors open and perspective broadens',when_stressed:'excess and overreach become temptations',domain:'growth, meaning, and the larger pattern'},
Saturn:{name:'Saturn',office:'structures and constrains',when_active:'what is solid proves itself and what is not falls away',when_stressed:'the weight of obligation presses harder than usual',domain:'discipline, time, and the consequences of choices'},
Uranus:{name:'Uranus',office:'disrupts and liberates',when_active:'sudden clarity arrives about what must change',when_stressed:'instability shakes what you thought was settled',domain:'authenticity, revolution, and the shock of the new'},
Neptune:{name:'Neptune',office:'dissolves and inspires',when_active:'intuition sharpens and the imagination opens',when_stressed:'boundaries blur and illusion creeps in',domain:'imagination, spirit, and the longing for what transcends'},
Pluto:{name:'Pluto',office:'transforms and exposes',when_active:'something hidden comes to light and demands to be faced',when_stressed:'power dynamics surface and control becomes the question',domain:'depth, power, and the death that precedes renewal'},
Chiron:{name:'Chiron',office:'wounds and heals',when_active:'vulnerability becomes a source of wisdom',when_stressed:'old pain resurfaces looking for resolution',domain:'the wound that teaches, the healer who was first a patient'},
NorthNode:{name:'the North Node',office:'draws you forward',when_active:'encounters feel fated and direction clarifies',when_stressed:'the pull toward growth feels uncomfortable',domain:'destiny, evolution, and the soul\'s trajectory'},
};

// Profected lord framing sentences
const LORD_FRAME={
Sun:'This is a year governed by the Sun — your identity, vitality, and sense of purpose set the terms for everything else.',
Moon:'This is a year governed by the Moon — your emotional life, instincts, and need for security define the shape of events.',
Mercury:'This is a year governed by Mercury — communication, learning, and the movement of ideas drive what unfolds.',
Venus:'This is a year governed by Venus — relationships, pleasure, and what you value most are the axis everything turns on.',
Mars:'This is a year governed by Mars — action, conflict, and the courage to assert yourself determine the year\'s shape.',
Jupiter:'This is a year governed by Jupiter — growth, opportunity, and the expansion of your world set the pace.',
Saturn:'This is a year governed by Saturn — responsibility, structure, and the patient building of something lasting define this chapter.',
};

// ══════════════════════════════════════════════════════════════
// TIER 2: COMPOSABLE TEXT ENGINE — seeded fragments for inexhaustible prose
// ══════════════════════════════════════════════════════════════

// Deterministic seed: same inputs → same text for the day, different tomorrow

// ── Opening frames by aspect type ──
const OPENING_FRAMES={
conjunction:['This merger','This fusion','This convergence','This intensification','This total overlay','This blending of forces','This concentration'],
opposition:['This tension','This face-to-face encounter','This polarization','This mirror','This standoff','This dual awareness','This tug-of-war'],
square:['This pressure','This friction','This challenge','This structural collision','This productive crisis','This forced reckoning','This grinding contact'],
trine:['This flow','This ease','This natural cooperation','This mutual resonance','This effortless current','This inherited grace','This open channel'],
sextile:['This opportunity','This gentle cooperation','This available bridge','This complementary angle','This invitation to connect','This opening','This quiet alignment'],
quincunx:['This misalignment','This awkward adjustment','This persistent itch','This off-kilter tension','This thing that never quite fits','This subtle discomfort','This recalibration'],
'semi-sextile':['This quiet friction','This adjacent restlessness','This background hum','This subtle transition','This low-grade tension','This whispered demand']
};

// ── What the transit planet DOES (verb/action pools) ──
const TRANSIT_VERB={
Sun:{
  hard:['burns away pretense around','forces visibility on','exposes the gap between who you think you are and','demands authentic expression from','lights up the tension in'],
  easy:['clarifies','illuminates with warmth','gives confidence to','brings recognition to','reveals the best path through'],
  conjunction:['fuses with and magnifies','makes inseparable from your identity','floods with conscious awareness','concentrates the full light on','completely merges with']
},
Moon:{
  hard:['unsettles the feelings around','agitates instinctive reactions to','triggers old patterns in','disturbs the emotional ground of','stirs up what you\'ve been avoiding about'],
  easy:['soothes and supports','nourishes the emotional roots of','makes comfortable','aligns feeling with','brings intuitive clarity to'],
  conjunction:['makes personal and immediate','floods with feeling','brings right to the surface of your body','emotionalizes everything about','puts instinct in charge of']
},
Mercury:{
  hard:['tangles communication around','overcomplicates your thinking about','generates misunderstanding in','forces you to rethink','creates mental friction around'],
  easy:['clarifies thinking about','opens productive conversations around','connects the dots in','brings useful information to','sharpens your analysis of'],
  conjunction:['fills your mind with','makes the dominant topic of thought','brings news about','makes you articulate about','puts language on']
},
Venus:{
  hard:['reveals dissatisfaction with','tests your values around','creates tension in relationships touching','makes you question what you want from','shows the price of pleasure in'],
  easy:['softens and sweetens','harmonizes the energy around','attracts good things to','adds grace and beauty to','eases the way through'],
  conjunction:['makes you want','magnetizes you toward','infuses desire into','makes irresistible','brings love or money to']
},
Mars:{
  hard:['generates heat and conflict around','pushes aggressively against','creates urgency and impatience in','forces confrontation about','inflames the tension in'],
  easy:['energizes and motivates','gives you the fuel to act on','adds courage to','drives productive action in','gives you the edge to push through'],
  conjunction:['ignites','activates with full force','brings raw energy to','demands action on','makes you fight for']
},
Jupiter:{
  hard:['inflates expectations around','overextends your reach in','creates excess in','exaggerates the stakes of','promises more than it delivers in'],
  easy:['expands and blesses','opens doors in','brings opportunity to','protects and supports','broadens your understanding of'],
  conjunction:['amplifies everything about','maximizes your fortune in','grants abundance in','makes enormous','bestows faith and confidence on']
},
Saturn:{
  hard:['constricts and tests','adds weight and obligation to','delays gratification in','reveals structural weakness in','strips away illusion about','demands accountability for'],
  easy:['stabilizes and grounds','adds durability to','rewards discipline in','proves what is solid about','brings mature clarity to'],
  conjunction:['crystallizes','compresses into essence','makes inescapably real','removes all shortcuts from','defines the limits of']
},
Uranus:{
  hard:['disrupts and destabilizes','shatters assumptions about','electrifies with sudden change in','makes unpredictable','breaks the pattern of'],
  easy:['liberates and innovates','brings fresh perspective to','frees you from stale patterns in','opens an unexpected door in','adds originality to'],
  conjunction:['revolutionizes','awakens you sharply to','completely reinvents','makes unrecognizable','sends a bolt through']
},
Neptune:{
  hard:['confuses and dissolves','erodes certainty about','generates illusion around','weakens your grip on','makes it impossible to see clearly in'],
  easy:['inspires and softens','adds imagination to','connects you spiritually to','brings compassion to','dissolves rigid thinking about'],
  conjunction:['merges with the dream of','dissolves the boundary around','makes transcendent','floods with vision','spiritualizes']
},
Pluto:{
  hard:['forces transformation in','brings power struggles to','exposes what\'s buried under','compels you to face the truth about','destroys and rebuilds'],
  easy:['empowers quietly','adds depth and intensity to','gives you leverage in','transforms without crisis','regenerates from within'],
  conjunction:['completely transforms','annihilates the old form of','resurrects from the ashes of','brings death and rebirth to','makes the unconscious conscious in']
},
Chiron:{
  hard:['reopens old wounds around','makes you confront pain in','brings healing crisis to','shows where you\'re still broken regarding','asks you to teach what hurt you about'],
  easy:['brings gentle healing to','offers wisdom through vulnerability in','integrates past pain about','makes your wound a gift in','opens a compassionate channel to'],
  conjunction:['lays bare the core wound in','makes your deepest vulnerability your teacher about','focuses all healing energy on','confronts you with the original hurt of']
},
NorthNode:{
  hard:['creates karmic tension around','forces evolutionary growth in','pulls you uncomfortably toward','makes you face your resistance to','demands that you grow through'],
  easy:['aligns your path with','confirms the rightness of','brings fated encounters to','smooths the way toward destiny in','supports your evolution through'],
  conjunction:['points directly at your fate in','makes undeniable the destiny of','draws you magnetically toward','marks a turning point in','activates the soul\'s purpose regarding']
}
};

// ── House gerunds (WHERE in life) ──
const HOUSE_GERUND={
1:['in how you present yourself','in your body and bearing','in the face you show the world','through your physical presence and identity','in the way others first perceive you','at the level of raw self-expression','through your instinctive first response to the world'],
2:['in what you own and value','through your material resources','in how you earn and spend','in the things that make you feel secure','through questions of self-worth and financial stability','in your relationship with money and comfort','at the level of what you believe you deserve'],
3:['in your daily conversations','through siblings, neighbors, and local movement','in how you think and communicate','in the short journeys and messages of your day','through the information you absorb and transmit','in the texture of your daily mental life','at the level of ordinary exchanges that carry more weight than usual'],
4:['in your roots and foundation','through home and family','in the most private part of your life','at the bottom of everything — where you come from','through ancestral patterns and emotional bedrock','in the walls that shelter you and the memories they contain','at the level of belonging and emotional ground'],
5:['in your creative self-expression','through romance, children, or pleasure','in what you make for the joy of making it','in the parts of life where you play','through the courage to be seen doing what you love','in the arena of heart-led risk-taking','at the level of what delights and what you delight in'],
6:['in your daily rituals and health','through work, service, and maintenance','in the small adjustments that keep life running','in the body\'s routines and the day\'s obligations','through the practical machinery of your life','in the gap between how you feel and how your schedule demands you function','at the level of daily discipline and physical well-being'],
7:['in your one-on-one relationships','through partnerships and committed bonds','in the mirror that other people hold up to you','in the space between you and another person','through what your closest relationships reveal about you','in the negotiations that define shared life','at the level of who you choose and who chooses you'],
8:['in your deepest transformations','through shared resources, sex, or death','in the things you don\'t show anyone','in the place where you let go of control','through the currency of trust and vulnerability','in the psychological basement where the real negotiations happen','at the level of power, debt, and irreversible change'],
9:['in your search for meaning','through travel, education, or belief','in the part of your mind that needs the big picture','in what you believe and why you believe it','through the expansion of your worldview and philosophy','in the hunger for understanding that transcends the practical','at the level of faith, conviction, and intellectual horizon'],
10:['in your career and public role','through your reputation and authority','in what the world sees when it looks at your life','in your most visible achievements and responsibilities','through the structures of ambition and legacy you are building','in the arena where effort meets recognition','at the level of your public contribution and professional identity'],
11:['in your vision and community','through friendships and collective goals','in the circles you move in and the future you imagine','in what you hope for beyond yourself','through the networks and alliances that shape your trajectory','in the ideals you hold for the world as well as yourself','at the level of social belonging and shared aspiration'],
12:['in the hidden parts of your life','through solitude, meditation, or self-undoing','in what you process alone and in silence','in the blind spots and the spiritual work done behind closed doors','through the unconscious patterns that run beneath the surface','in the part of your psyche that only dreams can reach','at the level of surrender, dissolution, and the work done in exile']
};

// ── Advice closers (what to DO) ──
const ADVICE_CLOSE={
hard:{
  Sun:['Stand your ground. This is testing whether your identity is real.','The discomfort is diagnostic — it shows you where you\'re not aligned.','Don\'t flinch. What burns away was already dead.','Your ego is being stress-tested. What survives is the authentic part.','The light is harsh today but it shows you the truth. Look at it.'],
  Moon:['Feel it, but don\'t let the feeling make the decision.','Tend to yourself before you tend to the crisis.','The emotional wave will pass. Don\'t build permanent structures on it.','Your body is processing something your mind will understand tomorrow.','The discomfort is a feeling, not a fact. Let it move through.'],
  Mercury:['Think twice before you speak. Then think again.','The miscommunication is the message — something wasn\'t clear.','Write it down before you say it out loud.','Slow down the mental pace. Speed creates errors today.','The misunderstanding is showing you what you assumed but never verified.'],
  Venus:['What you want and what\'s good for you may not be the same thing today.','Relationship friction reveals where you\'ve been compromising too much — or not enough.','Beauty doesn\'t make it true. Examine what attracts you.','The ache is showing you what you actually need versus what you settled for.','Don\'t chase comfort. Sit with the dissatisfaction — it has something to teach you.'],
  Mars:['Channel the anger into something physical. Don\'t let it leak sideways.','Pick your battles. Not every provocation deserves a response.','The impulse to fight is real, but so is the impulse to destroy what you need.','Move your body before you make any decisions. The fire needs a physical outlet.','Aggression without purpose is just destruction. Find the purpose first.'],
  Jupiter:['Rein it in. Enthusiasm without structure creates mess.','Say no to at least one thing that sounds amazing.','Growth that outruns your foundations is just inflation.','The opportunity is real but the scale needs reducing. Think smaller to land it.','Overcommitment is the shadow of generosity. Check your calendar before you say yes.'],
  Saturn:['Do the hard thing first. The rest of the day gets easier.','This is a load-bearing day — what you build now has to hold weight.','The restriction is the instruction. Work within it.','Patience is not passive — it is the active decision to outlast the pressure.','The delay is protection disguised as frustration. What was not ready would have broken.'],
  Uranus:['Let the disruption land before you react.','Don\'t confuse shock with insight — wait a day.','What feels like chaos may be liberation you haven\'t recognized yet.','The instability is showing you which of your structures was already hollow.','Breathe through the surprise. The meaning arrives after the event, not during it.'],
  Neptune:['Verify before you trust.','The intuition is real; the interpretation may not be.','Art, prayer, water — find a way to process this that isn\'t verbal.','The fog is not permanent. Wait for clarity before committing to anything.','What looks beautiful right now may not survive scrutiny. Give it time.'],
  Pluto:['Let the dead thing die. Stop resuscitating it.','The power struggle is internal, even if it looks external.','What\'s being destroyed has already served its purpose.','The compulsion to control is strongest when control is least available. Surrender.','Name the thing you are afraid to lose. Then ask if keeping it is actually serving you.'],
  Chiron:['The pain is old. Don\'t blame today\'s circumstances for yesterday\'s wound.','Your vulnerability is not a defect — it\'s the place your wisdom comes from.','Help someone else with the exact thing that hurts you.','The trigger is new but the wound is familiar. Separate the two before responding.','Healing does not mean the pain disappears. It means the pain becomes useful.'],
  NorthNode:['Growth is uncomfortable by design. Lean in.','What feels wrong may just feel unfamiliar.','The resistance is the sign that this is the right direction.','Your comfort zone is not your destiny. Step past the edge.','The path of least resistance leads back to where you started. Choose the harder one.']
},
easy:{
  Sun:['Step into the spotlight. This is your moment.','Express yourself without apology.','The path is clear — walk it with confidence.','Your identity and your actions are aligned. Make something of it.','Visibility comes naturally today — be seen doing what matters.'],
  Moon:['Trust your instincts today.','The emotional ground is stable. Plant something.','Nurture what matters and let it nurture you back.','Your gut is calibrated well right now. Follow the feeling.','Emotional intelligence is high. Use it for the conversation you\'ve been putting off.'],
  Mercury:['Say the thing you\'ve been thinking.','Conversations today carry more than usual weight.','Your mind is sharp — use it to solve, not just to analyze.','Communication flows with unusual precision. Send the important message now.','The idea that arrives today is worth acting on. Write it down immediately.'],
  Venus:['Enjoy this. Not everything has to be hard.','Reach out to someone you love.','Beauty and pleasure are not distractions — they\'re fuel.','Your taste is reliable today. Trust what attracts you.','Connection is easy right now. Don\'t waste the ease on isolation.'],
  Mars:['Act on what you\'ve been planning.','Your energy is clean and directed — spend it on what matters.','Move your body. The answer comes through action.','Courage is available and the timing supports it. Go.','Initiative pays off today. Start the thing you have been planning.'],
  Jupiter:['Say yes. The opportunity is real.','Expand toward the thing that excites you.','Generosity given today comes back multiplied.','Luck is a real force today and it rewards those who show up. Show up.','The bigger version of the plan is the right version. Think expansively.'],
  Saturn:['The structure you\'ve built is being rewarded.','Discipline pays off today. Keep going.','What you\'ve earned is yours. Own it.','The patience you invested earlier is returning dividends now.','Commit to the long-term play. Today the foundation is solid enough to hold it.'],
  Uranus:['Follow the flash of insight.','Break from routine in a way that thrills you.','Freedom and stability don\'t have to be opposites today.','The unconventional approach is the right one. Trust the instinct to deviate.','Something new is possible that was not possible yesterday. Act on it.'],
  Neptune:['Trust the vision. The dream is closer than it looks.','Let your imagination lead for once.','The boundary between you and something beautiful is thin today.','Creative inspiration is especially pure right now. Channel it before it fades.','The intuition and the reality are aligned. Trust what you feel.'],
  Pluto:['You have quiet power today. Use it wisely.','Transformation doesn\'t have to be violent. Today it\'s organic.','What\'s changing is changing in your favor.','Depth is available without the usual suffering. Go deep while the door is open.','Your ability to see beneath the surface is unusually sharp. Trust what you find.'],
  Chiron:['Healing is happening without you having to force it.','The wound is integrating into wisdom.','Share what you\'ve learned from your pain — it helps someone.','The tenderness you feel is strength, not weakness. Let it teach you.','Something that used to hurt now simply informs. Progress is quiet but real.'],
  NorthNode:['You\'re on the right path. The confirmation is subtle but real.','Fate is friendly today. Notice the synchronicities.','What\'s unfolding is exactly what needs to unfold.','The alignment between where you are and where you\'re going is unusually clear.','Trust the direction even if you can\'t see the destination. The path knows.']
},
conjunction:{
  Sun:['Whatever emerges from this fusion — claim it fully.','You can\'t separate yourself from this. Lean in.','This IS you right now. Work with it.','Identity and circumstance merge completely. Authenticity is the only strategy.','The universe is holding a mirror. What you see is yours.'],
  Moon:['The feeling and the fact are the same thing today.','Your body knows what your mind hasn\'t processed yet.','Everything is personal. Accept it.','Instinct is intelligence today. The gut speaks louder than the spreadsheet.','The emotional charge is not a distortion — it is the data.'],
  Mercury:['Name it. Give language to what\'s forming.','The word and the thing are merging — be precise.','Think out loud. The clarity comes mid-sentence.','The idea crystallizing right now is worth writing down before it evaporates.','Communication is creation today. What you articulate becomes real.'],
  Venus:['What you love and what you are overlap completely.','Desire is identity today. Follow it honestly.','Merge with what attracts you — resistance is artificial.','The heart and the situation are speaking the same language. Listen to both.','What pleases you today reveals something essential about who you are.'],
  Mars:['Pure fuel. Point it somewhere productive.','Your will and your energy are one thing right now.','Act. The alignment between want and capacity won\'t last.','The body and the intention are synchronized. Move decisively.','Force is available and the moment invites it. Don\'t hold back.'],
  Jupiter:['You and opportunity are the same address.','The expansion is personal. Say yes to yourself.','Faith IS the action today.','The door opening right now is sized exactly for who you are becoming.','Growth is not theoretical today — it is lived. Expand.'],
  Saturn:['The weight is your teacher. Listen to it.','You\'re being forged. It\'s not comfortable and it\'s not optional.','Responsibility and identity are the same today.','What feels heavy is also what is most real. Work with it.','The test is not whether you can escape the weight but whether you can build with it.'],
  Uranus:['You are the disruption. Own it.','Something permanent changes about who you are.','The old version of you just became obsolete.','The break with the past is not a loss — it is an upgrade.','What is emerging cannot be planned or predicted. Let it arrive.'],
  Neptune:['You dissolve into something larger.','The boundary between you and the numinous thins to nothing.','Not everything can be grasped. Let this one wash over you.','The mystical and the practical overlap. Trust the strange clarity.','Surrender control of the narrative. Something is being written through you.'],
  Pluto:['Total metamorphosis. The old self is compost.','Power courses through you. Be careful what you point it at.','What dies today was already haunting you.','The transformation is not optional but the resistance to it is. Choose wisely.','You are being reborn in real time. Let the old skin fall.'],
  Chiron:['The wound IS the gift. You can\'t have one without the other.','This is the heart of your healing story.','Sit with the pain — it has something to teach you that only you can learn.','The tenderness and the strength are the same thing today.','What broke you is becoming what makes you wise. Let the process complete.'],
  NorthNode:['This is the evolutionary moment. Everything converges.','Fate and will are indistinguishable today.','What happens now was always going to happen.','The synchronicity is too precise to be coincidence. Pay attention.','Your life is being recalibrated toward its purpose. Cooperate.']
}
};

// ── Dignity reframes ──
const DIGNITY_REFRAME={
domicile:['at full power in its own sign','operating from home turf','at its most natural and effective','with the full authority of rulership'],
exaltation:['magnified and honored','elevated beyond its usual range','riding high in its sign of exaltation','amplified and celebrated'],
detriment:['uncomfortable and working against the grain','in unfamiliar territory','operating at a disadvantage','forced to express through an alien medium'],
fall:['weakened and undermined','at its lowest dignity','struggling to function effectively','working with diminished resources']
};

// ── Moon sign x phase matrix (96 combos: 12 signs x 8 phases) ──
const MOON_SIGN_PHASE={
Aries:{'New Moon':'Raw impulse seeds in darkness. Set intentions around courage, independence, and what you are willing to fight for. The energy is primal — let it coalesce before you act.','Waxing Crescent':'The spark catches and momentum builds toward something brave. Don\'t overthink the direction — Aries crescent energy rewards forward motion, not perfect planning.','First Quarter':'Push through the resistance — action, not hesitation. The friction you feel is the pressure that turns impulse into commitment. Choose the harder version of what you want.','Waxing Gibbous':'Refine the charge. Courage still drives but it needs direction now. Temper the impulse with strategy — the goal is precision, not just force.','Full Moon':'The fire peaks. Anger or triumph illuminates what you\'ve built since the new moon. Whatever you started is now fully visible — own it or redirect it.','Waning Gibbous':'Share the battle story. What you learned through confrontation or courage now becomes wisdom you can teach. Generosity with hard-won knowledge is Aries at its best.','Last Quarter':'Let go of the fight you no longer need. Some battles were necessary to get here; others became habits. Release the ones that are keeping you stuck in combat mode.','Waning Crescent':'Rest the warrior. The next charge is coming but this is not the moment for it. Stillness now replenishes the reserves that reckless action depleted.'},
Taurus:{'New Moon':'Slow seeds in rich soil. Plant what you want to last — relationships, habits, investments. Taurus new moons reward patience and penalize rushing.','Waxing Crescent':'Growth is slow and physical. Trust the body\'s pace rather than the mind\'s impatience. What you tend with your hands now will outlast what you plan in your head.','First Quarter':'Choose comfort or growth — you may not get both today. The tension between security and expansion is real, and Taurus wants you to choose the one with deeper roots.','Waxing Gibbous':'Polish what you\'re building. Quality over speed, permanence over novelty. The extra care you invest now is the difference between something that lasts and something disposable.','Full Moon':'The harvest is tangible. What you\'ve grown is real, solid, and present in your life. Look at what you have — not what you lack — and let the abundance register.','Waning Gibbous':'Give generously from your abundance. Taurus waning gibbous teaches that sharing does not diminish you — it proves that what you built has surplus worth distributing.','Last Quarter':'Release an attachment to something you no longer need. The possession, the habit, the comfort zone — whatever you\'re gripping is preventing the next planting season.','Waning Crescent':'Savor the quiet. Let the senses rest without stimulation. Taurus balsamic phase is for baths, silence, warm food, and the kind of rest that money cannot buy.'},
Gemini:{'New Moon':'Ideas seed in the dark. Don\'t chase them yet — just notice which thoughts keep returning. The ones that stick past the new moon are the ones worth following.','Waxing Crescent':'Conversations spark and threads multiply. Follow the one that excites you most, not the one that seems most practical. Gemini crescent energy rewards curiosity over caution.','First Quarter':'Choose a direction. Too many options paralyze and Gemini\'s gift for seeing all sides becomes a trap when decision is required. Pick one thread and commit to pulling it.','Waxing Gibbous':'Edit the message. Cleverness got you this far but clarity takes you further. Trim the excess words, cut the secondary argument, and say the essential thing plainly.','Full Moon':'Information peaks. What you learn today changes your understanding of something you thought you already knew. The Gemini full moon is a revelation disguised as data.','Waning Gibbous':'Teach what you know. The connections you\'ve made in your mind become real when you articulate them to someone else. Sharing knowledge is how Gemini energy matures.','Last Quarter':'Drop the topic that\'s become circular. The conversation you keep having with yourself — or with that person — has taught you everything it can. Move on.','Waning Crescent':'Let the mind go quiet. Not everything needs words, analysis, or a clever take. Gemini balsamic phase is for letting the mental chatter settle into silence.'},
Cancer:{'New Moon':'Emotional seeds planted in the deepest privacy. Tend your inner garden with the care you would give a child. What you nurture in secret now will sustain you publicly later.','Waxing Crescent':'Vulnerability builds into something protective. The shell is still soft but the instinct to shield what matters is growing. Nurture carefully — both yourself and what depends on you.','First Quarter':'The shell must crack to grow. Emotional friction today is not an attack — it is an invitation to outgrow a defense you built when you were smaller and more afraid.','Waxing Gibbous':'Fine-tune the nest. Small acts of care — a meal cooked with attention, a message sent with real feeling — refine the emotional foundation you are building.','Full Moon':'Feelings crest. What you\'ve been holding surfaces with full force and demands to be witnessed. The Cancer full moon does not do subtle — let the emotion move through you completely.','Waning Gibbous':'Feed others from your emotional abundance. The love and security you\'ve built is not just for you. Sharing it — through care, cooking, listening — multiplies rather than depletes it.','Last Quarter':'Release the old family pattern. The inherited behavior, the guilt reflex, the caretaking that costs you — it served a purpose once but it is done serving you now.','Waning Crescent':'Retreat to the womb of solitude. Rest is medicine, not laziness. Cancer balsamic phase asks for warm blankets, early sleep, and the courage to need nothing from anyone for a night.'},
Leo:{'New Moon':'Creative impulse sparks in the dark. The stage is empty and waiting for what only you can bring to it. Set intentions around self-expression, courage, and the willingness to be seen.','Waxing Crescent':'Self-expression gathers momentum. The thing you want to create or show the world is taking shape. Build toward being seen — not for approval, but because the work deserves light.','First Quarter':'The ego is tested. Pride must serve something larger than itself today or it becomes a liability. The question is not whether you are good enough — it is whether your work serves the moment.','Waxing Gibbous':'Refine the performance. The raw creative energy needs polish before it meets its audience. Edit, rehearse, and resist the Leo temptation to go public before the work is truly ready.','Full Moon':'The spotlight is fully on. What you have created, expressed, or dared to show stands in full view. This is applause or reckoning — either way, the exposure is total and the truth is clarifying.','Waning Gibbous':'Shine your light on others. Generosity is the highest expression of Leo energy. Celebrate someone else\'s work, amplify a voice that isn\'t being heard, or simply be warm without requiring anything in return.','Last Quarter':'Let go of the need for approval. The applause was real but the addiction to it was not. Release the performance that was for other people and keep only the expression that is genuinely yours.','Waning Crescent':'The performer rests. Be ordinary for a moment. Leo balsamic phase needs the relief of anonymity — no stage, no audience, just the simple pleasure of being a person and not a persona.'},
Virgo:{'New Moon':'Quiet seeds of order. Notice what needs fixing without fixing it yet. Virgo new moon rewards the diagnostic eye — identify the problem precisely before reaching for the tool.','Waxing Crescent':'Systems build themselves when you attend to the details. The habit, the routine, the small adjustment — these accumulate into something that the big dramatic gesture never achieves.','First Quarter':'Perfectionism meets reality. Good enough IS enough today. The friction between your standards and what is actually possible produces either progress or paralysis — choose progress.','Waxing Gibbous':'Refine the routine. Small calibrations create disproportionately large results. The health practice, the work habit, the organizational system — adjust the thing that is almost right.','Full Moon':'The analysis is complete. See the pattern whole rather than as a list of problems. Virgo full moon reveals the system clearly — and clarity is more valuable than perfection right now.','Waning Gibbous':'Serve someone who needs what you know. Your analytical gifts and practical competence are worth more when shared. The teacher in Virgo appears when the critic steps aside.','Last Quarter':'Release the standard that was never achievable. Perfectionism is Virgo\'s shadow, and this quarter moon asks you to forgive yourself for being human in the places you demanded you be flawless.','Waning Crescent':'Let the body rest. Not everything is a problem to solve. Virgo balsamic phase asks you to stop optimizing and simply exist — unproductive, imperfect, and at peace with both.'},
Libra:{'New Moon':'Relational seeds in the dark. Set intentions around balance, fairness, and the kind of partnership that elevates both people rather than diminishing either.','Waxing Crescent':'Harmony builds through small gestures. A thoughtful message, a beautiful arrangement, an act of consideration — Libra crescent energy rewards grace, not grand statements.','First Quarter':'Choose peace or truth — sometimes they\'re not the same. The tension between keeping the harmony and saying the honest thing is real. Libra quarter moon demands you choose with integrity.','Waxing Gibbous':'Refine the relationship. Address the imbalance you\'ve been accommodating. Libra gibbous energy gives you the diplomatic skill to raise the hard topic without breaking the bond.','Full Moon':'The partnership peaks. What you see in the other person is a mirror of yourself — the admiration and the frustration both. The Libra full moon illuminates relationships with uncomfortable clarity.','Waning Gibbous':'Share beauty. Create harmony in your environment through art, arrangement, or simply by making a space more welcoming. What you give to aesthetics, aesthetics returns to your state of mind.','Last Quarter':'End the false compromise. The arrangement that looked like balance was actually one person shrinking. Libra quarter moon gives permission to exit the deal that was never fair.','Waning Crescent':'Solitude after togetherness. Balance needs both poles — relationship and independence, company and quiet. Libra balsamic phase is for being alone without being lonely.'},
Scorpio:{'New Moon':'Deep seeds in absolute darkness. The most powerful intentions form here because Scorpio new moon touches the part of you that does not flinch from the truth about what you want.','Waxing Crescent':'Intensity builds below the surface. Trust the undertow — what is gathering in your psyche right now is preparing for a confrontation or a transformation that the surface mind cannot yet name.','First Quarter':'Confront the shadow. What you resist controls you and Scorpio quarter moon makes that dynamic painfully visible. The friction is not with someone else — it is with the part of yourself you have been refusing to acknowledge.','Waxing Gibbous':'Deepen the investigation. You\'re close to the truth and the truth is close to being useful. Scorpio gibbous energy refines your ability to see through pretense — your own and everyone else\'s.','Full Moon':'Everything hidden surfaces. Raw, exposed, undeniable. Scorpio full moon is the most psychologically intense lunation of the cycle — what emerges now has been composting for months.','Waning Gibbous':'Share the depth. Vulnerability transforms others too, and Scorpio waning gibbous asks you to offer the hard-won truth rather than hoard it. Your willingness to be seen in your complexity gives others permission.','Last Quarter':'Release the obsession. Open your grip on the thing you have been controlling, monitoring, or refusing to let go of. Scorpio quarter moon says: the power you reclaim by releasing exceeds the power you spend by holding.','Waning Crescent':'Dissolve into the dark. Ego death before rebirth. Scorpio balsamic phase is the deepest surrender in the zodiac — let the old self compost completely so the new one has soil.'},
Sagittarius:{'New Moon':'Seeds of faith. What do you believe is possible when the cynical voice goes quiet? Sagittarius new moon plants the ambition that requires faith to pursue and evidence will eventually reward.','Waxing Crescent':'The horizon calls. Begin moving toward meaning — a journey, a study, a conversation with someone who sees the world differently. Sagittarius crescent energy rewards expansion over certainty.','First Quarter':'Belief meets reality. Does your philosophy hold under pressure? The friction between what you want to be true and what is actually true produces either wisdom or denial — choose wisdom.','Waxing Gibbous':'Refine the vision. Big picture, yes — but where are the details? Sagittarius gibbous energy needs the arrow to be aimed precisely, not just shot enthusiastically in a promising direction.','Full Moon':'Truth arrives with the force of revelation. Your perspective expands dramatically and what seemed complicated a month ago resolves into a single, clear understanding. Let the insight land.','Waning Gibbous':'Teach what you\'ve found. The experience you gathered is more valuable when articulated. Sagittarius waning gibbous is the professor phase — share the wider view with anyone ready to hear it.','Last Quarter':'Release the belief that no longer serves your growth. The philosophy, the ideology, the story you told yourself about how the world works — if it restricts more than it liberates, let it go.','Waning Crescent':'Silence the philosopher. Let mystery stay mysterious. Sagittarius balsamic phase is for awe without explanation — watch the sky without needing to name what you see.'},
Capricorn:{'New Moon':'Structural seeds. Build intentions around legacy, discipline, and what you want to be true about your life five years from now. Capricorn new moon rewards the plan, not the dream.','Waxing Crescent':'The climb begins. Small, steady, deliberate steps that no one notices but that compound into something undeniable. Capricorn crescent energy is the boring work that builds empires.','First Quarter':'Ambition meets limitation. Choose the harder path — it lasts. The easier option dissolves under stress and the Capricorn quarter moon is testing which of your commitments is actually load-bearing.','Waxing Gibbous':'Refine the structure. What is load-bearing? What is decoration? Strip the ornamental from the essential and put your energy where it survives scrutiny, not where it looks impressive.','Full Moon':'The achievement crystallizes. What you built stands in plain view and can no longer be denied or diminished. Capricorn full moon is recognition earned through effort — let yourself feel it.','Waning Gibbous':'Mentor someone. Your experience is more valuable than you think and Capricorn waning gibbous is the phase where the builder becomes the teacher. What you suffered through can spare someone else.','Last Quarter':'Release the ambition that was never yours. The goal you inherited from a parent, a culture, or an earlier version of yourself — if it doesn\'t fit who you are now, put it down without guilt.','Waning Crescent':'The mountain rests. Even stone needs stillness. Capricorn balsamic phase asks the climber to stop climbing for one night and remember that rest is not the opposite of achievement.'},
Aquarius:{'New Moon':'Revolutionary seeds. What would you change if you had no fear and no concern for what people think? Aquarius new moon plants the vision that is too radical for any other sign to hold.','Waxing Crescent':'The collective stirs. Your weird idea might be exactly what the situation needs. Aquarius crescent energy rewards originality and punishes conformity — trust the signal that only you are receiving.','First Quarter':'Freedom clashes with belonging. Choose, then live with it. Aquarius quarter moon exposes the tension between individuality and community — you cannot dissolve yourself into the group without losing what makes you useful to it.','Waxing Gibbous':'Refine the innovation. Original doesn\'t mean unfinished, and Aquarius gibbous energy is where the visionary becomes the engineer. Make the weird idea actually work in practice.','Full Moon':'The vision peaks. Your individual truth meets the group mind and the result is either breakthrough or alienation. Aquarius full moon asks whether your revolution serves anyone besides yourself.','Waning Gibbous':'Distribute the insight. What helps you helps everyone, and Aquarius waning gibbous is the open-source phase — release the idea, share the discovery, let others build on what you started.','Last Quarter':'Release the ideology that became a cage. The belief system that once freed you has calcified into its own orthodoxy. Aquarius quarter moon says: even liberation needs liberating sometimes.','Waning Crescent':'Detach from the cause. Your nervous system needs a break from caring about the future of everything. Aquarius balsamic phase is for being a person, not a position.'},
Pisces:{'New Moon':'The most fertile dark. Seeds dissolve into pure potential — no form, no limit, no certainty. Pisces new moon asks you to intend without specifying, to want without grasping.','Waxing Crescent':'Imagination builds toward form. Don\'t rush the emergence — Pisces crescent energy needs the dream to stay soft and unresolved a little longer. What takes shape too quickly loses its magic.','First Quarter':'Reality presses on the dream. What survives the pressure is sacred and what dissolves was never meant to be solid. Pisces quarter moon separates the vision from the fantasy.','Waxing Gibbous':'Refine the vision without destroying its mystery. The temptation is to make the intangible concrete, but Pisces gibbous energy asks for editing that preserves the numinous quality of what you are making.','Full Moon':'The veil lifts. Spiritual and emotional flood — transcendent or overwhelming depending on how much inner work you have done. Pisces full moon is the most psychically open moment of the entire cycle.','Waning Gibbous':'Pour compassion outward. Your empathy is a gift when offered freely and a wound when absorbed indiscriminately. Pisces waning gibbous asks you to serve without drowning.','Last Quarter':'Release the martyr role. Saving yourself is not selfish — it is the prerequisite for saving anyone else. Pisces quarter moon gives permission to stop sacrificing and start recuperating.','Waning Crescent':'Total dissolution. Surrender to sleep, to water, to the divine nothing. Pisces balsamic phase is the end of the entire lunar cycle — everything releases, nothing needs to be held.'}
};

// ── Expanded verdict variants (buildVerdict draws from these) ──
const VERDICT_HARD_LEAD=[
  'expect friction, and use it to push through something stuck',
  'the pressure is productive if you don\'t fight it',
  'resistance is the teacher today — don\'t avoid the discomfort',
  'something is being tested. Let it be tested',
  'the obstacle IS the path today',
  'lean into the difficulty — it\'s shaping something necessary'
];
const VERDICT_EASY_LEAD=[
  'doors are open in that direction — walk through them',
  'support is available; the question is whether you\'ll use it',
  'the current is with you — paddle',
  'what wants to happen is allowed to happen today',
  'the wind is at your back. Go where it takes you',
  'cooperation flows easily — take advantage'
];
const VERDICT_CONJ_LEAD=[
  'the two themes fuse — watch for what emerges',
  'this convergence changes everything it touches',
  'nothing can be separated today — work with the whole',
  'the overlap is total. What appears is something new',
  'this synthesis won\'t happen again for a while — pay attention'
];
const VERDICT_QUIET=[
  'A quiet day. No loud transits in orb — use the space.',
  'The sky is calm. Your own agenda runs the day.',
  'No major planetary pressure today. Breathe.',
  'The cosmos gives you room. What do you actually want to do?',
  'Relatively still overhead. A day for your own rhythm.'
];

// ── Compose a full aspect interpretation from fragments ──
function composeTransitText(tPlanet,nPoint,aspectName,aspectType,house,date){
  const seed=textSeed(date||new Date().toDateString(),tPlanet,nPoint,aspectName);
  const frames=OPENING_FRAMES[aspectName]||OPENING_FRAMES.conjunction;
  const verbKey=aspectType==='hard'?'hard':aspectType==='easy'?'easy':'conjunction';
  const verbs=(TRANSIT_VERB[tPlanet]||TRANSIT_VERB.Sun)[verbKey]||(TRANSIT_VERB[tPlanet]||TRANSIT_VERB.Sun).conjunction;
  const gerunds=HOUSE_GERUND[house]||HOUSE_GERUND[1];
  const advPool=(ADVICE_CLOSE[verbKey]||ADVICE_CLOSE.conjunction)[tPlanet]||(ADVICE_CLOSE[verbKey]||ADVICE_CLOSE.conjunction).Sun;
  const nLabel=nPoint==='NorthNode'?'your North Node':nPoint==='Ascendant'?'your Ascendant':nPoint==='MC'?'your Midheaven':'your natal '+nPoint;
  return `${pick(frames,seed)} ${pick(verbs,seed+1)} ${nLabel} ${pick(gerunds,seed+2)}. ${pick(advPool,seed+3)}`;
}

// ── Compose a Shape of Day sentence from fragments ──
function composeShapeSentence(tPlanet,nPoint,aspectName,aspectType,house,importance){
  const seed=textSeed(new Date().toDateString(),tPlanet,nPoint,'shape');
  const sph=SPHERE[tPlanet]||{};const hv=HOUSE_VOICE[house]||{};
  const verbKey=aspectType==='hard'?'hard':aspectType==='easy'?'easy':'conjunction';
  const verbs=(TRANSIT_VERB[tPlanet]||TRANSIT_VERB.Sun)[verbKey]||[];
  const gerunds=HOUSE_GERUND[house]||HOUSE_GERUND[1];
  const advPool=(ADVICE_CLOSE[verbKey]||ADVICE_CLOSE.conjunction)[tPlanet]||[];
  const nLabel=nPoint==='NorthNode'?'your North Node':nPoint==='Ascendant'?'your self-presentation':nPoint==='MC'?'your public standing':'your natal '+nPoint;
  return `${sph.name||tPlanet} ${pick(verbs,seed)||sph.office||'acts on'} ${nLabel} ${pick(gerunds,seed+1)}. ${pick(advPool,seed+2)||'Work with it.'}`;
}

// ── Moon sign+phase text lookup with fallback ──
function moonSignPhaseText(signName,phaseName){
  const sp=MOON_SIGN_PHASE[signName];
  if(sp&&sp[phaseName])return sp[phaseName];
  return MOON_SIGN_FLAVOR[signName]||'';
}

// ── Dignity context string ──
function dignityContext(planet,lon){
  const dig=getDignity(planet,lon);
  if(!dig)return '';
  const key=dig.label.toLowerCase().split(' ')[0]; // domicile, exaltation, detriment, fall
  const pool=DIGNITY_REFRAME[key];
  if(!pool)return '';
  const seed=textSeed(new Date().toDateString(),planet,'dig');
  return ' — '+pick(pool,seed);
}

// ── SPHERE variant pools (when_active / when_stressed rotate daily) ──
const SPHERE_ACTIVE_V={
Sun:['what you truly want becomes visible','your sense of purpose sharpens to a fine point','identity clarifies — you know who you are today','the conscious self burns bright and demands recognition','you radiate something today that others respond to without being asked','the question of who you are has a clearer answer than usual'],
Moon:['feelings run close to the surface and instincts sharpen','your body tells you things your mind hasn\'t processed yet','emotional intelligence peaks — trust the gut','the inner tide rises and everything feels personal','what you need — not want, need — announces itself clearly','the emotional body is awake and reading the room before you are'],
Mercury:['your mind is quick and conversations carry weight','information arrives that changes your understanding','thought becomes action — say the thing','the network hums — messages, ideas, connections multiply','the right word finds you at the right moment','mental clarity peaks — problems that baffled you last week yield to fresh logic'],
Venus:['what you love and what loves you move closer together','beauty registers more deeply and desire clarifies','the heart opens and relationships sweeten','pleasure isn\'t indulgence today — it\'s fuel','attraction operates with unusual precision — you know what you want','the aesthetic sense sharpens and the world looks better than it did yesterday'],
Mars:['you have the fuel to push through obstacles','initiative peaks — the body knows where to go','courage is available if you reach for it','the engine runs hot — point it at something worthy','decisive action feels natural rather than forced','the body has energy it didn\'t have yesterday — spend it on something that matters'],
Jupiter:['doors open and perspective broadens','faith feels justified and generosity flows','the horizon pulls you forward — something wants to expand','what was stuck loosens and what was small grows','optimism is not naive today — it is backed by real possibility','the bigger picture comes into focus and the small worries shrink accordingly'],
Saturn:['what is solid proves itself and what is not falls away','the load-bearing structures of your life are tested and hold','discipline earns its reward today','time becomes an ally — what you build now lasts','patience pays off in a way you can actually measure','the hard work you did when no one was watching finally shows results'],
Uranus:['sudden clarity arrives about what must change','the unexpected breaks a pattern you didn\'t know you were stuck in','authenticity becomes non-negotiable','lightning illuminates a path you couldn\'t see before','the old way of doing things cracks and a better one shows through','freedom stops being an idea and becomes a felt experience'],
Neptune:['intuition sharpens and the imagination opens','the boundary between inner and outer life thins','something beautiful and hard to name passes through you','the dream speaks — listen without analyzing','creative inspiration arrives fully formed, as if from somewhere outside yourself','the spiritual antenna is tuned to a signal the rational mind can\'t decode'],
Pluto:['something hidden comes to light and demands to be faced','power shifts — who has it, who wants it, who deserves it','what\'s dying is composting into what comes next','the truth arrives whether you invited it or not','you feel stronger than the thing that frightened you last month','an old pattern finally breaks — not with drama but with quiet finality'],
Chiron:['vulnerability becomes a source of wisdom','the wound opens not to hurt you but to teach you','helping others heals the helper','old pain releases its grip a degree','the thing that once shamed you becomes the thing that connects you to others','compassion deepens — not the easy kind, the kind that costs something'],
NorthNode:['encounters feel fated and direction clarifies','the universe gives a nudge — pay attention','synchronicity replaces coincidence','your trajectory bends toward where it was always going','a person or situation appears that feels like it was always supposed to happen','the next step on your path becomes visible — you just have to take it']
};
const SPHERE_STRESSED_V={
Sun:['your sense of purpose is tested','you feel invisible or unrecognized','identity wavers — who are you when the mirrors break?','the spotlight feels too hot or too absent','confidence drains and the question of what you are doing with your life returns uninvited','the gap between who you want to be and who you appear to be feels uncomfortably wide'],
Moon:['emotional security feels uncertain','the body is anxious before the mind catches up','old emotional patterns replay uninvited','you absorb what isn\'t yours to carry','the need for comfort outpaces what is available','you react before you think and the reaction reveals something you were not ready to see'],
Mercury:['misunderstandings multiply and plans tangle','the mind races without arriving anywhere','words fail or wound unintentionally','information overload meets decision paralysis','the message you sent lands differently than you intended — and you can\'t unsend it','your thoughts loop without resolving and the mental noise becomes exhausting'],
Venus:['relationships reveal their fault lines','what you want and what\'s good for you diverge','the heart aches for what it can\'t have','beauty feels hollow — the surface isn\'t enough','loneliness sharpens even in company — something in the connection is missing','you spend or indulge to fill a gap that spending and indulging cannot reach'],
Mars:['friction rises and patience thins','anger leaks into the wrong conversations','energy spikes without productive direction','the impulse to fight outpaces the reason to fight','frustration turns inward and becomes a grinding irritability with no clean outlet','you know you need to act but every available action feels wrong or premature'],
Jupiter:['excess and overreach become temptations','optimism blinds you to real problems','more is not better today','faith inflates past what evidence supports','you promise more than you can deliver and the overshoot costs you credibility','the desire to expand overwhelms the capacity to sustain what already exists'],
Saturn:['the weight of obligation presses harder than usual','you feel old, tired, and underpaid by life','walls go up where bridges should be','fear of failure becomes self-fulfilling','the rules feel suffocating but breaking them feels worse','you are carrying something that is no longer yours to carry and the fatigue is the proof'],
Uranus:['instability shakes what you thought was settled','restlessness makes every commitment feel like a cage','the disruption is real but the solution isn\'t clear yet','rebellion without direction just makes a mess','the urge to blow everything up is strong but the blueprint for what comes next is missing','change is happening whether you consent to it or not and the loss of control stings'],
Neptune:['boundaries blur and illusion creeps in','you can\'t tell what\'s real from what you want to be real','escapism beckons — watch the exits','confusion masquerades as depth','you feel everything and understand nothing — the empathy is real but the clarity is absent','someone or something is not what it appears to be and the truth will take time to surface'],
Pluto:['power dynamics surface and control becomes the question','something underground demands attention you don\'t want to give','the compulsion to fix, control, or destroy intensifies','what you\'re gripping is gripping you back','a truth you have been avoiding announces itself and refuses to be ignored','the feeling that something must die is correct but the willingness to let it go is not yet there'],
Chiron:['old pain resurfaces looking for resolution','you feel exposed in the place that never fully healed','inadequacy whispers louder than competence','the wound teaches, but today the lesson stings','a present situation triggers an old injury and for a moment you are back where it started','the help you give others is easier than the help you refuse to give yourself'],
NorthNode:['the pull toward growth feels uncomfortable','you resist the direction life is pointing you','what\'s familiar feels safer than what\'s right','fate knocks, and you pretend not to hear','the path forward is visible but the cost of taking it looks higher than staying put','growth demands you leave something behind and you are not sure you are ready']
};

// ── LORD_FRAME variants ──
const LORD_FRAME_V={
Sun:['This is a year governed by the Sun — your identity, vitality, and sense of purpose set the terms for everything else.','A Solar year: who you are IS the question. Every event reflects back to the core self.','The Sun lords this year — visibility, authority, and the courage to be seen define what unfolds.'],
Moon:['This is a year governed by the Moon — your emotional life, instincts, and need for security define the shape of events.','A Lunar year: feelings lead, logic follows. Home, body, and belonging set the tempo.','The Moon lords this year — everything is personal, tidal, and closer to the bone.'],
Mercury:['This is a year governed by Mercury — communication, learning, and the movement of ideas drive what unfolds.','A Mercurial year: the message matters. Conversations, contracts, and connections shape your trajectory.','Mercury lords this year — your mind, your words, and your network are the primary instruments.'],
Venus:['This is a year governed by Venus — relationships, pleasure, and what you value most are the axis everything turns on.','A Venusian year: love, money, and beauty aren\'t distractions — they\'re the curriculum.','Venus lords this year — who you desire and what you cherish define the chapter.'],
Mars:['This is a year governed by Mars — action, conflict, and the courage to assert yourself determine the year\'s shape.','A Martial year: initiative, anger, and the willingness to compete write the headlines.','Mars lords this year — what you fight for reveals what you care about.'],
Jupiter:['This is a year governed by Jupiter — growth, opportunity, and the expansion of your world set the pace.','A Jovian year: faith returns, horizons widen, and what was small becomes big.','Jupiter lords this year — say yes to the things that scare you in a good way.'],
Saturn:['This is a year governed by Saturn — responsibility, structure, and the patient building of something lasting define this chapter.','A Saturnian year: the work is the work. No shortcuts, no inflation, no pretending.','Saturn lords this year — what you build under pressure is what survives.']
};

// ── DOMINANT_FLAVOR variants ──
const DOMINANT_FLAVOR_V={
Saturn:['Saturn is driving today\'s energy, bringing themes of discipline, responsibility, and necessary limitation. Lean into it.','Saturn dominates the sky — today rewards seriousness, punishes shortcuts, and teaches through weight.','The Saturnian theme is loud today. What feels heavy is also what\'s real. Do the hard thing first.'],
Pluto:['Pluto dominates today\'s cosmic weather, pulling you toward deep transformation and confrontation with what\'s hidden.','Pluto runs the show — intensity, power dynamics, and the refusal to stay on the surface define the day.','A Plutonian day: something wants to die so something else can live. Let it.'],
Neptune:['Neptune colors today\'s energy with dreaminess, inspiration, and blurred boundaries. Trust art, doubt facts.','Neptune sets the tone — the veil is thin, the imagination is on, and reality is negotiable.','A Neptunian day: beautiful for vision, dangerous for contracts. Float where you can, anchor where you must.'],
Uranus:['Uranus electrifies today\'s energy with unpredictability and flashes of insight.','Uranus runs the current — expect the unexpected and don\'t cling to the plan.','A Uranian day: something breaks, something liberates. Often they\'re the same thing.'],
Jupiter:['Jupiter expands today\'s energy with optimism, opportunity, and the desire for growth.','Jupiter is generous today — doors open, perspectives widen, and faith feels earned.','A Jovian day: abundance is available. The risk is wanting too much of a good thing.'],
Mars:['Mars fuels today\'s energy with drive, assertion, and potentially friction.','Mars is hot today — energy is high, patience is low, and the body wants to move.','A Martial day: channel the fire into something physical or something brave. Don\'t let it idle.'],
Venus:['Venus softens today\'s energy with themes of love, beauty, pleasure, and connection.','Venus sweetens the day — relationships ease, creativity flows, and the senses sharpen.','A Venusian day: what feels good is also what\'s right. For once, pleasure and purpose align.'],
Mercury:['Mercury sharpens today\'s energy with mental activity, conversations, and information exchange.','Mercury buzzes today — the mind is quick, the inbox is full, and words carry weight.','A Mercurial day: think, talk, write, connect. The network is the resource.'],
Sun:['The Sun illuminates today\'s energy with clarity about identity and purpose.','The Sun dominates — who you are comes into focus, and what you want is obvious.','A Solar day: confidence is natural, visibility is high, and the spotlight rewards authenticity.'],
Moon:['The Moon colors today\'s energy with emotional shifts, instinctive reactions, and a need for comfort.','The Moon sets the tone — everything is felt before it\'s thought. Honor that.','A Lunar day: mood leads, body speaks, and the inner tides run the schedule.'],
Chiron:['Chiron colors today\'s energy with healing themes. Old wounds surface because you\'re ready.','Chiron is active — tenderness is not weakness today. What hurts is teaching.','A Chironic day: the wound opens toward healing, not toward harm. Let it breathe.'],
NorthNode:['The North Node gives today a fated quality. Pay attention to synchronicities.','The nodal axis is loud — encounters feel meaningful and direction sharpens.','A nodal day: the universe is steering. Let it.']
};

// ── RETRO_VOICE variants ──
const RETRO_VOICE_V={
Mercury:[
'Mercury retrograde scrambles the signal between intention and reception. Emails land wrong, technology stutters, and plans made last week quietly unravel. This is not a curse — it is a forced audit. Reread everything before you send it. Reconnect with people you dropped. Revisit the project you shelved in March. The slowdown strips away the illusion that speed equals progress.',
'Mercury stations retrograde and the world starts speaking in riddles. Contracts hide clauses, messages cross in transit, and the thing you were sure you understood reveals a second meaning. Don\'t launch. Don\'t sign without rereading. Do pick up the phone when an old name appears — Mercury Rx brings back the conversations that weren\'t finished.',
'Mercury is retrograde, which means the messenger god is walking backward through your life. Old contacts resurface, forgotten threads reconnect, and the thing you said too quickly comes back for revision. Back up your data, double-check your travel plans, and reread the fine print. This is editing season — the draft was the direct period; the polish is now.',
'Mercury retrograde is not three weeks of doom — it is three weeks of radical revision. The ideas you launched too fast get a second look. The person you lost touch with reappears at exactly the right moment. Technology breaks to show you what you were depending on blindly. Slow down, re-examine, and trust that the delay is saving you from the version that wasn\'t ready.'
],
Venus:[
'Venus retrograde is a long look in the mirror of desire. What you thought you wanted starts to shimmer and dissolve. Old lovers surface — not always in person, sometimes just in memory — to ask whether you\'ve actually moved on or just moved away. Don\'t start new relationships or make major purchases. Sit with the question of what you genuinely value versus what was merely comfortable.',
'Venus stations retrograde and your heart starts renegotiating its terms. Attractions that felt certain now feel complicated. Beauty standards shift. Money decisions want revision. This is not the time for cosmetic changes, new commitments, or expensive indulgences — it is the time to ask whether what you love truly loves you back, and whether what you spend on actually nourishes.',
'Venus is retrograde, pulling you into a deep reassessment of love, pleasure, and worth. Relationships from your past may knock on the door. Let them in long enough to learn what they came to teach, but don\'t sign a lease together. Financial patterns reveal themselves. The art you make now is revision, not creation — and the revision is where the real beauty lives.',
'Venus retrograde recalibrates your sense of what is beautiful, valuable, and worth pursuing. The person you were attracted to last month may look different now. The purchase you were excited about feels hollow. This is clarity disguised as confusion. Old relationships return not to restart but to resolve. Let the wanting settle before you act on it.'
],
Mars:[
'Mars retrograde drops your energy into a lower gear and frustrates every attempt to push forward. Projects stall, anger simmers without productive outlet, and your usual assertiveness feels blunted. Don\'t start new ventures or pick fights you can\'t finish. Instead, review your strategies, revisit abandoned campaigns, and let the pressure build toward a clearer target. When Mars goes direct, you\'ll know exactly where to aim.',
'Mars stations retrograde and the engine that usually drives you forward begins to idle. Physical energy fluctuates. Aggression turns inward and becomes frustration if you don\'t consciously redirect it. Exercise helps. New battles do not. Use this time to audit where you\'ve been spending force — some of those battles were never yours to fight, and Mars Rx is when you finally see it.',
'Mars is retrograde, which means your initiative meets resistance at every turn. This is not the universe punishing you — it is the universe saying: are you sure this is the right direction? The anger you feel is real but its target may be wrong. Don\'t start new projects. Do revisit the ones you abandoned. Physical movement is essential; rash decisions are not.',
'Mars retrograde turns the warrior inward. External momentum stalls so you can examine the quality of your ambition. Is your drive coming from desire or desperation? Are you fighting for something or just fighting? The frustration is the diagnostic tool — what makes you angry now reveals what actually matters. Conserve fuel. Redirect. Sharpen the blade for when Mars goes direct.'
],
Jupiter:[
'Jupiter retrograde turns the telescope inward. External opportunities slow down so you can properly digest what has already arrived. Overextension gets called in. Beliefs that you accepted on faith come up for examination. This is not shrinkage — it is the difference between eating and actually absorbing nutrients. Inner wisdom deepens when you stop reaching for the next thing.',
'Jupiter stations retrograde and the feeling of limitless possibility contracts to a quieter, more honest scope. Travel plans stall, educational ambitions pause, and the philosophy you were broadcasting starts to feel like it needs more internal testing. Good. The expansion continues — it is just happening where conviction is forged rather than where confidence is performed.',
'Jupiter is retrograde, which means growth turns reflective. The question is no longer how much more but whether what you already have is being used well. Abandoned studies resurface. Beliefs you outgrew whisper from the margins. Listen — not to go backward, but because the old wisdom has something to say about the new situation. Faith is being refined, not destroyed.',
'Jupiter retrograde is the inhale after months of exhale. You have been expanding, saying yes, reaching outward. Now the motion reverses and asks: did you actually mean all of that? Which commitments were genuine growth and which were just hunger for more? The answers come through reflection, revisiting old teachers, and sitting with what is rather than chasing what could be.'
],
Saturn:[
'Saturn retrograde puts the foundation under a structural inspection. Commitments you made are tested from the inside. Old responsibilities you thought were discharged come back for final accounting. Karmic debts — the work you owe, the discipline you skipped, the promise you made to yourself and broke — demand attention. This is unglamorous maintenance work, but it is the realest work there is.',
'Saturn stations retrograde and the question becomes: is what you built actually load-bearing? The structures of your life — career, relationship frameworks, daily discipline — get audited not by external events but by internal honesty. Where you cut corners, you\'ll feel the stress fracture. Where you did the work properly, the foundation holds. Fix what\'s cracking before it shows on the surface.',
'Saturn is retrograde, reviewing the terms of your contract with maturity. Are your boundaries healthy or just rigid? Are your responsibilities genuinely yours or inherited defaults? Old duties resurface — not as punishment but as unfinished business that needs proper closure. The discomfort is proportional to how much structural work you\'ve been avoiding.',
'Saturn retrograde is when the taskmaster turns the inspection inward. External authority loosens its grip slightly, but internal authority — your own standards, your own discipline — tightens. This is the period where you stop blaming the system and ask what you owe yourself. The karmic ledger balances in private, and the work you do now determines what survives the next stress test.'
],
Uranus:[
'Uranus retrograde moves the revolution underground. Instead of sudden external disruptions, the liberation happens in your psyche — old programming surfaces, inherited beliefs lose their grip, and the patterns you followed without questioning start to feel unbearable. The breakthrough is internal first. You are quietly becoming someone who no longer fits the old container.',
'Uranus stations retrograde and the lightning that was striking externally turns into a slow electrical rewiring of your inner architecture. The conditioning you absorbed from family, culture, or fear begins to break down — not dramatically, but steadily, like ice melting. By the time Uranus goes direct, you will have freed yourself from something you didn\'t even know was holding you.',
'Uranus is retrograde, which means the agent of disruption is working from the inside. External chaos quiets, but internal restlessness intensifies. You are shedding beliefs you didn\'t know you carried, releasing identities that were never really yours. This is not comfortable — freedom never is at first — but the person emerging on the other side is more authentically you.',
'Uranus retrograde is the revolution that happens in the mirror. Nothing breaks externally — or if it does, the break reveals something that was already fracturing beneath the surface. Freedom is being redefined from the inside. Pay attention to what suddenly feels intolerable: that is the outdated structure Uranus is asking you to outgrow.'
],
Neptune:[
'Neptune retrograde lifts the fog just enough to see where you have been deceiving yourself — or letting yourself be deceived. Illusions you were comfortable maintaining become harder to sustain. This is not disillusionment as punishment; it is clarity arriving gently. Use this period for spiritual refinement, creative editing, and the courage to see things as they actually are.',
'Neptune stations retrograde and the glamour dims by one degree. Enough to notice. The relationship you idealized reveals its ordinary cracks. The escape route you relied on — substances, fantasies, avoidance — stops working as smoothly. This is a gift disguised as disappointment. What survives Neptune Rx is what was real all along.',
'Neptune is retrograde, which means the dream is being edited rather than expanded. The visions you were chasing get a reality check — not to crush them but to refine them into something that can actually exist in the waking world. Dreams become more symbolic and revelatory during this time. Pay attention to what your sleep is telling you.',
'Neptune retrograde is when the artist becomes the editor. The inspiration that poured in during the direct period now needs to be tested against reality. Which visions hold up in daylight? Which dissolve when you examine them honestly? The spiritual practice that survives this period is the one built on truth rather than wishful thinking.'
],
Pluto:[
'Pluto retrograde turns its transformative intensity inward. The power dynamics that were playing out in your external life go underground, and the real confrontation becomes psychological. You are processing deep changes that were initiated when Pluto was direct. The alchemy continues — it just happens in the crucible of your inner life rather than on the visible stage.',
'Pluto stations retrograde and the compulsions quiet down — not because they are resolved but because they have moved to a deeper layer. External power struggles ease, but the internal work of honestly facing your own shadow intensifies. Let the transformation proceed at its own pace. Rushing Pluto is like trying to hurry a tectonic plate.',
'Pluto is retrograde, which means the death-and-rebirth cycle has turned inward. Whatever was dying in your life continues to compost, but the process is happening below the surface where you can feel it but not see it. Trust the decomposition. What is being broken down will feed what comes next — but only if you stop trying to preserve what needs to go.',
'Pluto retrograde is the underworld journey that happens with your eyes closed. The transformation is no less real for being invisible. Old identities, old power structures, old ways of controlling your world are being dissolved from within. The temptation is to rush back to external action — resist it. The inner alchemy needs to complete before you rebuild.'
],
Chiron:[
'Chiron retrograde deepens the healing work by reopening wounds you thought were resolved. This is not regression — it is refinement. The pain surfaces at a subtler layer, one that was inaccessible before. You are developing deeper compassion, first for yourself and then, inevitably, for everyone who carries a similar wound. The hurt is the curriculum.',
'Chiron stations retrograde and the scar tissue thins. An old hurt — one you integrated, processed, moved past — reveals that it still has something to teach you. Don\'t armor up. The vulnerability is the medicine. This is the layer of healing where you stop being brave about the wound and start being honest about it.',
'Chiron is retrograde, which means the healer is healing the healer. Whatever wisdom you have gained from your deepest pain is now being tested at a finer resolution. You may feel raw in areas you thought were long settled. That rawness is not weakness — it is the wound finishing its work. Compassion for yourself comes first; the rest follows.',
'Chiron retrograde asks you to revisit the original wound — not to relive it but to understand it at a depth that was previously unavailable. You have grown since you last looked at this. You can hold more now. The feelings that surface are not old feelings recycling — they are the deeper layers that only become accessible after the surface has healed.'
]
};

// ── HARD_BRINGS variants ──

// pickV, sphereActive, sphereStressed, lordFrame, domFlavor, retroVoice, hardBrings
// are defined in src/voice/hard-brings.js

// ── Multi-variant NATAL_ASPECT_DEPTH ──
const NATAL_ASPECT_DEPTH_V={
'Sun-Moon|conjunction':['Inner life and outer identity fused — wholeness, but less inner dialogue. Born near a new moon.','Your will and your feeling are one current. Powerful unity, but you may not see your own blind spots.','The Sun-Moon conjunction means you don\'t need to negotiate between who you are and what you feel — they\'re the same thing.'],
'Sun-Moon|opposition':['Will and feeling pull against each other. Born near a full moon — a lifetime of negotiating between want and need.','Your conscious self and your emotional self live across the chart from each other. Partners mirror what you can\'t integrate alone.','The full moon birth: everything is illuminated, nothing is simple. You oscillate between head and heart until you stop choosing.'],
'Sun-Moon|square':['Tension between conscious direction and emotional nature. Family-of-origin patterns replay until integrated.','The square between your lights means inner friction is your baseline. It\'s also your engine.','Your will and your feelings are at cross purposes — which makes you more interesting than comfortable.'],
'Sun-Saturn|conjunction':['Authority and self fused — heavy responsibility from early on, maturity accelerated, father-theme intense.','Saturn sitting on the Sun ages you early and rewards you late. The gravity is real but so is the gravitas.','You were born old. The compensation is that you get younger as everyone else gets older.'],
'Sun-Saturn|square':['Self-worth is tested. Achievement through discipline, but prone to self-doubt.','Saturn squares the Sun and installs a critic in your head. The critic is wrong about your worth but right about the need for effort.','Every achievement feels like it\'s not enough — until you realize the standard was never yours to begin with.'],
'Sun-Pluto|conjunction':['Intense will, survivor\'s edge. Power dynamics are a core theme.','Pluto on the Sun: you were born in the fire. You know what power costs.','The Sun-Pluto conjunction means you don\'t do anything lightly. Intensity is your nature, not your choice.'],
'Moon-Saturn|conjunction':['Emotional gravity. Mother-theme strict or absent. Feelings kept under discipline.','Saturn on the Moon: you learned early that emotions are expensive. Unlearning that is the work.','The emotional thermostat was set low in childhood. You\'re still adjusting it upward.'],
'Moon-Saturn|square':['Emotional loneliness until self-parented. Slow to trust, but steady once bonded.','The Moon-Saturn square builds walls around the heart. The work is learning which walls are protection and which are prison.','You don\'t trust easily — and when you do, you test the bond before you relax into it.'],
'Venus-Mars|conjunction':['Desire and attraction fused — passionate, magnetic, sometimes volatile in love.','Venus and Mars together: what you want and what you attract are the same burning thing.','The erotic and the aesthetic merge completely. Relationships are intense by design.'],
'Venus-Saturn|square':['Feeling unworthy of love, or attracted to distant partners. Earned affection.','Saturn squares Venus and says love must be deserved. The lie is in the \'must.\' The truth is in the patience.','You love carefully, slowly, and with a fear of rejection that diminishes only through evidence.'],
'Mars-Saturn|conjunction':['Disciplined drive — blacksmith energy. Hard-won competence, frustration if blocked.','Mars and Saturn together: the forge. Everything you build costs more effort and lasts longer.','You know how to work through resistance because you were born in it.'],
'Jupiter-Saturn|conjunction':['The great chronocrator — structure meets expansion. Ambition built carefully.','Jupiter and Saturn together: the architect of empires and the auditor of dreams, collaborating.','This conjunction defines a generation — and in your chart, it means your ambition has both vision and scaffolding.'],
'Sun-Moon|trine':['Inner harmony between will and feeling. What you want and what you need rarely conflict — a gift that can also make you complacent.','Your conscious direction and emotional nature cooperate easily. Life flows, but you may need external friction to grow since the internal engine purrs quietly.','The Sun-Moon trine is grace: identity and instinct aligned. The risk is never being forced to develop the depth that difficulty creates.'],
'Sun-Moon|sextile':['Will and feeling in friendly dialogue. You integrate identity and emotion through conscious effort rather than automatic harmony.','The Sun-Moon sextile offers cooperation that requires initiative. The opportunity to unite head and heart is always available but must be actively taken.','Your lights work well together when you pay attention. The sextile is a door that opens easily but does not open itself.'],
'Sun-Mercury|conjunction':['Mind and identity fuse — you think in terms of who you are and communicate from the center. Subjective brilliance, but blind spots come from never seeing yourself from outside.','Mercury sitting on the Sun means your self-concept IS your thinking process. Articulate, identified with your mind, and sometimes unable to distinguish thought from truth.','The Sun-Mercury conjunction makes you a natural communicator — but the message is always filtered through ego. The strength is coherence; the risk is solipsism.'],
'Sun-Venus|conjunction':['Grace, charm, and an identity built around beauty, pleasure, or harmony. People like you — which can be a gift or a trap depending on what you do with it.','Venus on the Sun softens your edges and makes you magnetic. Art, love, and aesthetics are core to who you are — not hobbies, but identity.','The Sun-Venus conjunction makes charm structural rather than strategic. You attract naturally, but the question is whether you attract what genuinely nourishes.'],
'Sun-Mars|conjunction':['Will and drive fused — you run hot. Courage, initiative, and a confrontational edge that earns respect or provokes conflict depending on how well it is channeled.','Mars on the Sun installs an engine in the identity. You act first, reflect later, and bring intensity to everything. The body and the will are not separate.','The Sun-Mars conjunction is raw vitality and competitive fire. You were not built for passivity. The task is directing the fire, not dampening it.'],
'Sun-Mars|square':['The will and the drive are at odds — you want one thing and your energy pushes toward another. Action and identity are in productive friction.','Mars squares the Sun and installs a restless engine that periodically overheats. The frustration is chronic but so is the motivation it produces.','Your assertiveness and your sense of self rub against each other. The square creates an achiever who never feels quite satisfied — which keeps you moving.'],
'Sun-Mars|opposition':['Your identity and your assertive drive face off across the chart. Other people often carry the Mars energy you project — you attract confrontation until you own it.','Sun opposite Mars: the force is real but it tends to show up in other people. Partners, rivals, and challengers mirror the aggression you are not expressing directly.','The opposition puts your will and your warrior nature in dialogue through others. Learning to own your anger without projecting it is the long work of this aspect.'],
'Sun-Jupiter|conjunction':['Expansive identity, natural optimism, and a sense that life owes you something good — which it often delivers. The risk is inflation: promising more than reality can sustain.','Jupiter on the Sun gives you an outsized personality and an instinct for opportunity. Generosity and self-belief are genuine, but so is the tendency to overcommit.','The Sun-Jupiter conjunction is a big life lived loudly. Faith in yourself is justified more often than not, but the one time it is not can be spectacular.'],
'Sun-Jupiter|square':['Restless expansion clashes with identity. You aim too high, promise too much, and occasionally deliver something genuinely remarkable because the ambition pushed you past reasonable limits.','Jupiter squares the Sun and installs chronic overreach. The saving grace is that your reach exceeds your grasp in a productive direction — you grow by failing upward.','Your sense of self bumps against your sense of possibility. The square creates someone who is never content with what is, which is both your engine and your exhaustion.'],
'Sun-Saturn|opposition':['Authority figures and external structures mirror the self-doubt you carry internally. Discipline feels imposed from outside until you internalize it as self-respect.','Sun opposite Saturn: the father, the boss, the system — something always seems to be telling you no. The work is discovering that the no was your own all along.','The opposition places your vitality and Saturn\'s restriction in a seesaw with other people. Partnerships tend to replay authority dynamics until the lesson is learned.'],
'Sun-Uranus|conjunction':['Identity fused with revolution. You are constitutionally unable to be ordinary and constitutionally uncomfortable with being too predictable.','Uranus on the Sun electrifies the personality. Brilliant, eccentric, and allergic to conformity — the challenge is sustaining something long enough to build on it.','The Sun-Uranus conjunction makes you a natural disruptor. Authenticity is non-negotiable, but stability requires conscious effort because your instinct is to bolt.'],
'Sun-Neptune|conjunction':['Identity dissolves into imagination, spirituality, or confusion depending on how consciously this is lived. You are porous, creative, and sometimes uncertain where you end and others begin.','Neptune on the Sun blurs the edges of selfhood. You absorb atmospheres, channel creative visions, and occasionally lose track of who you actually are.','The Sun-Neptune conjunction is the artist\'s aspect and the mystic\'s affliction. Boundaries between self and other are thin — use it for empathy and art, not for self-erasure.'],
'Sun-Pluto|square':['Will and power in grinding friction. You are driven by forces you do not fully control, and the need to transform yourself periodically is not optional.','Pluto squares the Sun and installs a relentless intensity. You compulsively reinvent yourself, confront power dynamics, and refuse to stay on the surface.','The Sun-Pluto square is survival energy woven into the personality. You have been through something — or many things — that made you harder and more perceptive than most.'],
'Sun-Pluto|opposition':['Your personal power is mirrored by others. Partnerships become arenas for power struggles until you stop outsourcing your intensity.','Sun opposite Pluto: you attract powerful, transformative people and situations because the Plutonian energy is projected. The work is to own your own depth.','The opposition places your will and Pluto\'s compulsive intensity in dialogue through relationships. Control issues surface in partnerships until both sides are owned.'],
'Moon-Venus|conjunction':['Emotional nature and love language are one. You need beauty, comfort, and affection to feel safe. Warmth is genuine but dependency can be the shadow.','Venus on the Moon fuses feeling and pleasure. You process emotions through comfort, art, and connection. The kindness is instinctive but the neediness can be too.','The Moon-Venus conjunction is one of the gentler natal aspects — you know how to nurture and be nurtured. The risk is avoiding discomfort at the cost of honesty.'],
'Moon-Mars|conjunction':['Feelings and anger are not separate. Emotional reactions are immediate, physical, and sometimes volatile. Passion runs deep and surfaces fast.','Mars on the Moon means you feel first and think later. The emotional intensity is real — channel it into creation, competition, or courage rather than letting it scatter.','The Moon-Mars conjunction installs a warrior in the emotional body. You defend what you love fiercely and react to emotional threats with more force than the situation usually requires.'],
'Moon-Mars|square':['Emotional reactivity at war with assertive impulse. You get angry before you understand why and act on feelings before they have had time to stabilize.','Mars squares the Moon and creates an inner friction between what you feel and what you do about it. The explosive potential is real but so is the motivation it generates.','The Moon-Mars square is a difficult but productive aspect. Emotional discomfort drives action — the task is learning to pause between the feeling and the response.'],
'Moon-Jupiter|conjunction':['Emotional generosity and instinctive optimism. You feel things expansively and your emotional resilience is unusual — unless Jupiter inflates the feelings past what is warranted.','Jupiter on the Moon gives you a big emotional nature that processes through philosophy, humor, and generosity. The warmth is real; the tendency to feel too much is the shadow.','The Moon-Jupiter conjunction makes you emotionally generous, philosophically inclined in your feelings, and prone to emotional excess. Your instincts are lucky but not infallible.'],
'Moon-Pluto|conjunction':['Emotional intensity at the deepest level. You feel everything at maximum volume and the emotional body is wired for survival, transformation, and the refusal to stay on the surface.','Pluto on the Moon means your feelings are not casual. Emotional experiences are life-or-death in texture. The depth is extraordinary but the need for control over emotional safety is real.','The Moon-Pluto conjunction is the deepest emotional placement in the zodiac. Trust is earned through proven reliability over years, not through declarations. Your emotional radar misses nothing.'],
'Moon-Pluto|square':['Emotional power struggles, usually originating in childhood. The need to control the emotional environment and the fear of vulnerability are core themes.','Pluto squares the Moon and installs a threat detector in the emotional body. You scan for danger, control for safety, and feel betrayed by anything less than total honesty.','The Moon-Pluto square means emotional security was hard-won and easily threatened. The compulsion to manage how others feel about you is the pattern that loosens last.'],
'Venus-Mars|square':['Desire and assertion at cross purposes. What you want and how you go after it create friction — romantic relationships tend to be passionate and volatile.','Mars squares Venus and creates a push-pull between attraction and aggression. The erotic charge is real but the fights are the price of the passion.','The Venus-Mars square means love and war coexist in your approach to intimacy. You are drawn to intensity and then frustrated by its consequences.'],
'Venus-Mars|opposition':['Attraction and assertion face off through partners. You attract what you desire but the dynamic frequently involves power struggles or polarized gender expression.','Venus opposite Mars: the magnetic pull toward others is strong but the relationships it creates tend to replay the tension between receptivity and dominance.','The opposition places love and drive on opposite sides of the chart. Partners embody what you project — and the projection dissolves only when both energies are owned.'],
'Venus-Jupiter|conjunction':['Pleasure, generosity, and an appetite for beauty that borders on excess. Life feels bountiful and your taste is large. The gift is grace; the shadow is overindulgence.','Jupiter on Venus amplifies everything Venus touches: love is bigger, spending is larger, and the aesthetic sense is wider than most. Moderation is not your native language.','The Venus-Jupiter conjunction is one of the most pleasant natal aspects — but pleasant and productive are different things. Your charm is real but discipline in pleasure is the growth edge.'],
'Venus-Saturn|conjunction':['Love is serious, committed, and slow to trust. You earn affection through reliability rather than charm and your relationships tend to improve with time rather than peak early.','Saturn on Venus ages love prematurely but rewards it eventually. Early relationships feel restricted or disappointing; later ones are among the deepest and most enduring.','The Venus-Saturn conjunction means you do not love casually. Commitment, loyalty, and the willingness to endure difficulty for the sake of a bond define your romantic nature.'],
'Venus-Pluto|conjunction':['Love and power fuse. Relationships are intense, transformative, and never casual. You attract depth and sometimes obsession in equal measure.','Pluto on Venus means you love at the level of the soul and the shadow simultaneously. Jealousy, possessiveness, and transformative intimacy are all native to this aspect.','The Venus-Pluto conjunction creates someone for whom love is always a matter of life and death. The depth is extraordinary but the need for control in relationships is the pattern to watch.'],
'Mars-Pluto|conjunction':['Willpower at the level of compulsion. You do not do anything halfway and the drive to dominate, transform, or survive is wired into the body.','Pluto on Mars installs a nuclear engine. The power is immense but the temptation to force outcomes rather than allowing them is the lifelong tension.','The Mars-Pluto conjunction is sheer force of will made manifest. You endure what others cannot, push through what others abandon, and struggle with the difference between power and control.'],
'Mercury-Saturn|conjunction':['Thinking is disciplined, slow, and thorough. The mind works methodically and dislikes superficiality. You were born a serious thinker but may have been told you were slow before your rigor was recognized.','Saturn on Mercury ages the mind early. You think in structures, remember in systems, and speak only after the thought is fully formed. The gravity is real but so is the authority your words carry.','The Mercury-Saturn conjunction builds a mind that favors depth over speed. Communication is deliberate, learning is methodical, and the self-doubt about intelligence is almost always wrong.'],
'Mercury-Saturn|square':['Thinking under pressure. Self-censorship, fear of saying the wrong thing, and a mental rigor that produces excellent work at the cost of confidence.','Saturn squares Mercury and installs an editor who never sleeps. Everything you say passes through a filter of Is this good enough? The work is excellent; the self-doubt is exhausting.','The Mercury-Saturn square creates a thinker who is harder on themselves than any external critic could be. The discipline is genuine but the fear of intellectual inadequacy is the pattern to soften.'],
'Mercury-Jupiter|conjunction':['The mind thinks big. Philosophy, teaching, and the desire to understand everything at the level of meaning rather than mechanism define your intellect.','Jupiter on Mercury creates a mind that is naturally expansive, optimistic in its thinking, and prone to the assumption that more information equals more wisdom. Usually it does.','The Mercury-Jupiter conjunction gives you the teacher\'s mind and the philosopher\'s appetite. You learn fast, connect broadly, and occasionally overstate what you actually know.'],
'Mercury-Uranus|conjunction':['The mind is electric, unconventional, and several steps ahead of the conversation. Brilliant insights arrive suddenly and the thinking process is nonlinear in a way that others find either genius or confusing.','Uranus on Mercury rewires cognition. You think in flashes, see patterns others miss, and grow bored with any idea that stays conventional for too long.','The Mercury-Uranus conjunction is the inventor\'s aspect. Original thought is effortless; patience with ordinary conversation is not. The challenge is translating the lightning into language others can follow.'],
'Mercury-Neptune|conjunction':['The mind is porous, imaginative, and sometimes confused. You think in images, metaphors, and feelings rather than clean logic. Brilliant for creativity; challenging for contracts.','Neptune on Mercury dissolves the boundary between thought and imagination. You channel ideas more than construct them, and the line between intuition and wishful thinking requires constant attention.','The Mercury-Neptune conjunction gives you the poet\'s mind. Communication is evocative rather than precise, and your greatest insights come from the place between waking and sleeping.'],
'Mercury-Pluto|conjunction':['The mind is penetrating, obsessive, and unable to accept surface explanations. You think at depth and communicate with an intensity that some find compelling and others find unsettling.','Pluto on Mercury creates the detective\'s mind. You see through pretense, research until you hit bedrock, and speak with a directness that cuts through evasion.','The Mercury-Pluto conjunction means you never think casually. Every conversation is a potential excavation and every piece of information is evaluated for what it conceals.']
};
// ── TRANSIT_VOICE variant descriptions ──
const TRANSIT_VOICE_V={
Sun:{desc:['The Sun illuminates whatever it touches, bringing conscious awareness and a desire for authentic expression. What do you truly want here?','The Sun arrives as spotlight — what it illuminates becomes impossible to ignore. Identity questions surface with clarity.','Solar transits are brief but clarifying. Vitality spikes, the ego activates, and you see yourself more honestly than usual.']},
Moon:{desc:['The Moon stirs your emotional depths and instinctive reactions, revealing what you need to feel safe. Fast-moving mood shifts expose deeper feelings.','Lunar transits move quickly but cut deep. Your gut knows something your mind hasn\'t caught up to yet.','The Moon passes through and rearranges your emotional furniture. Pay attention to what surfaces — it\'s been waiting.']},
Mercury:{desc:['Mercury activates your thinking, conversations, and decisions. Information arrives, plans form, and your mental process gets stimulated.','Mercury sharpens the signal. Messages, meetings, and mental connections accelerate. What you learn now matters.','Mercury\'s transit brings the right conversation at the right time — or the wrong word at the worst moment. Stay alert.']},
Venus:{desc:['Venus brings pleasure, attraction, and questions about what you truly value. Relationships soften. Your sense of beauty heightens.','Venus transits open the heart a degree or two. What you\'re drawn toward right now tells you something about what you need.','Venus arrives and the world looks better. Use this energy for connection, creation, and anything that nourishes.']},
Mars:{desc:['Mars pushes you to act, assert, and confront. Energy spikes but so can irritation. This is fuel — direct it consciously.','Mars transits light a fire under whatever they touch. The question is whether you use the heat or get burned by it.','Mars brings courage and impatience in equal measure. Physical outlets help. Rash decisions don\'t.']},
Jupiter:{desc:['Jupiter expands whatever it touches — doors open, optimism rises, perspectives broaden. The risk is overextension.','Jupiter transits feel like permission. More is available. But more isn\'t always better — discernment separates gift from excess.','Jupiter offers opportunity that requires participation. The door is open — walk through it or it closes.']},
Saturn:{desc:['Saturn arrives as the teacher demanding accountability. It restricts and restructures. Accept the discipline — it builds what lasts.','Saturn\'s transit removes the decorative and exposes the structural. What\'s load-bearing survives; what isn\'t doesn\'t.','Saturn asks one question: is this real? Where the answer is no, expect contraction. Where yes, expect solidification.']},
Uranus:{desc:['Uranus shatters what has become stale. Expect the unexpected — sudden changes and the urge to break free from outgrown patterns.','Uranus doesn\'t negotiate. The change arrives before you\'re ready — and you discover you were readier than you thought.','Uranian transits liberate through disruption. What feels chaotic now is freedom in retrospect.']},
Neptune:{desc:['Neptune dissolves boundaries between real and imagined. Inspiration heightens but so can confusion. Trust intuition, verify facts.','Neptune softens the edges of reality. Beautiful for creativity, dangerous for decisions. Not the time to sign contracts.','Neptune transits make the world shimmer. Some of what you see is revelation; some is mirage. Time tells which is which.']},
Pluto:{desc:['Pluto works at the deepest level, forcing confrontation with power and what lies hidden. Nothing superficial survives.','Pluto doesn\'t ask. It takes what\'s dead and compostes it. The process is not comfortable but the soil is richer.','Pluto transits are once-in-a-lifetime events. What changes now stays changed. Resist the urge to preserve what needs to die.']},
Chiron:{desc:['Chiron reopens old wounds — not to punish but to heal. Your deepest pain, fully faced, becomes your greatest wisdom.','Chiron\'s transit touches the nerve that never quite healed. This is refinement, not regression — deeper healing, not reinjury.','Chiron brings vulnerability that serves a purpose. The exposure is the medicine, uncomfortable as it feels.']},
NorthNode:{desc:['The North Node creates fated-feeling encounters and nudges you toward your evolutionary path. Pay attention — life is pointing somewhere.','Nodal transits carry the scent of destiny. Coincidences cluster. People appear who feel significant before you know why.','The North Node activates your growth direction. Events now aren\'t random — they\'re course corrections toward what you\'re becoming.']}
};
// ── HOUSE_VOICE variant descriptions ──
const HOUSE_VOICE_V={
1:{desc:['This plays out through your physical body, appearance, and how you present yourself. Others notice a change in you.','Your identity and self-image are the arena. How you carry yourself shifts, and the world responds differently.','The first house is the most personal: this lands on you directly — your body, your look, your instinctive self-presentation.']},
2:{desc:['This affects your finances, possessions, and deep sense of self-worth. Material security comes into question.','Money and values intertwine here. What you own and what you\'re worth feel newly negotiable.','The second house makes it material: income shifts, spending patterns change, and worth gets recalculated — financially and personally.']},
3:{desc:['This activates conversations, short trips, siblings, writing, and how you process information. Your thinking shifts.','The third house is mental weather: new information arrives, communication patterns change, learning accelerates.','Daily interactions and the flow of information are where this transit makes itself felt. Pay attention to what you hear and say.']},
4:{desc:['This touches your home, family, emotional foundation, and private inner world. The roots are stirred.','The fourth house goes deep: family dynamics, ancestral patterns, and the place you call home are all in play.','Home and emotional security are the stage. Moves, renovations, or family conversations are likely channels.']},
5:{desc:['This lights up romance, creative expression, and what makes your heart sing. Self-expression becomes urgent.','The fifth house is where joy lives: creativity, romance, play, and the courage to be seen doing what you love.','Creative and romantic energy activates. Risk-taking feels more natural. The heart wants what it wants.']},
6:{desc:['This affects your daily routines, health, and work habits. The body and the schedule both ask for adjustment.','Sixth house transits are practical: health, daily rhythm, work conditions, and service to others are the channels.','The sixth house is where life meets logistics. Routines change, health demands attention, and small adjustments compound.']},
7:{desc:['This activates partnerships — romantic, business, and close friendships. You see yourself through the mirror of others.','Seventh house transits bring other people into sharp focus. Relationships deepen, dissolve, or demand renegotiation.','The house of the other: what someone else does or says reveals something about you. The mirror is active.']},
8:{desc:['This goes deep — shared resources, intimacy, power dynamics, and confrontation with what you normally avoid.','The eighth house doesn\'t do surface. Intimacy, debt, control, and psychological honesty are all activated.','Eighth house transits strip the varnish off. What\'s been hidden — yours or someone else\'s — becomes visible.']},
9:{desc:['This broadens your horizons — travel, education, philosophy, and your search for life\'s bigger meaning.','Ninth house energy wants expansion: foreign places, new belief systems, or a teacher who changes your perspective.','Your worldview is the target. What you believe, study, or pursue as meaning gets stretched or challenged.']},
10:{desc:['This affects your career, public reputation, and the legacy you\'re building. Professional turning points are possible.','The tenth house is public: career, status, authority figures, and how the world measures your contribution.','Tenth house transits are career weather. What you\'ve built is tested, recognized, or restructured.']},
11:{desc:['This activates your social network, friendships, and your vision for the future. Finding your tribe is the theme.','Eleventh house transits reshape your social world: who you associate with and what future you\'re building together.','Community and aspiration are the arena. Friendships shift, group affiliations change, and your vision gets clearer or muddier.']},
12:{desc:['This works below the surface — solitude, dreams, hidden patterns, and what you can\'t see is shifting.','The twelfth house is the backstage of consciousness: what\'s ending, dissolving, or preparing to emerge works in silence.','Twelfth house transits are felt more than seen. Dreams intensify, solitude calls, and the unconscious does its work.']}
};
// ── HOUR_PURPOSE variant briefs ──
// ── LOT_MEANING variant long descriptions ──
// ── Variant accessor functions for new pools ──
function transitVoiceDesc(planet){const pool=(TRANSIT_VOICE_V[planet]||{}).desc;return pool?pick(pool,todaySeed()):(TRANSIT_VOICE[planet]||{}).desc||'';}
function houseVoiceDesc(house){const pool=(HOUSE_VOICE_V[house]||{}).desc;return pool?pick(pool,todaySeed()):(HOUSE_VOICE[house]||{}).desc||'';}
// Planet-modulated house context — what a specific planet does in a specific house
function planetInHouse(planet,house){
  const PH={
    Sun:{1:'Your identity and physical presence are spotlighted.',2:'Vitality flows toward earning, possessions, and self-worth.',3:'Self-expression becomes verbal and intellectual.',4:'Authority turns inward — home and family demand your leadership.',5:'Creative confidence blazes. Romance and self-expression are the stage.',6:'Your energy is channeled into work routines and health discipline.',7:'Your identity is reflected through partnerships. Others define you now.',8:'Your willpower confronts shared resources, debt, and deep psychology.',9:'Your sense of self expands through travel, learning, and belief.',10:'Career and public reputation are the primary stage for your identity.',11:'Your vision and social network become central to self-expression.',12:'Ego retreats. Inner work, solitude, and rest serve you better than visibility.'},
    Moon:{1:'Emotions are visible on the surface. Your mood affects how others perceive you.',2:'Emotional security ties to finances and possessions.',3:'Feelings flow through words and daily interactions.',4:'Emotional roots are activated. Home and family are the emotional center.',5:'Heart-led creativity and romance. Joy and play are emotionally necessary.',6:'Emotional well-being ties directly to daily routines and physical health.',7:'Emotional needs are met through partnerships and close relationships.',8:'Deep emotions around intimacy, shared resources, and psychological patterns surface.',9:'Emotional fulfillment comes through expanding horizons and belief.',10:'Public role and career carry emotional weight and vulnerability.',11:'Emotional life plays out through friendships and community.',12:'The emotional world goes underground. Dreams, solitude, and hidden feelings dominate.'},
    Mercury:{1:'Mental energy sharpens your self-presentation and communication style.',2:'Thinking turns practical — financial planning, negotiations, and value assessments.',3:'Mercury is at home here. Communication, learning, and local connections accelerate.',4:'Mental energy focuses on home, family conversations, and private reflection.',5:'Creativity becomes intellectual. Witty communication and mental play.',6:'Analysis turns to health, routines, and systems improvement.',7:'Communication centers on partnerships and negotiations.',8:'Research, investigation, and deep analytical thinking are activated.',9:'Intellectual expansion through study, philosophy, and foreign perspectives.',10:'Professional communication and public speaking are highlighted.',11:'Networking, group discussions, and future planning dominate mentally.',12:'Mental processes turn inward. Journaling, therapy, and unconscious pattern recognition.'},
    Venus:{1:'Charm and attractiveness increase. Self-presentation becomes more graceful.',2:'Financial opportunities and material pleasures are emphasized.',3:'Social grace flows through conversation and local connections.',4:'Domestic beauty and family harmony are highlighted.',5:'Romance, creative beauty, and pleasure are maximized.',6:'Daily life becomes more pleasant. Work relationships improve.',7:'Relationship harmony peaks. Partnership attracts beauty and ease.',8:'Intimacy deepens. Shared finances and emotional bonds intensify.',9:'Beauty and pleasure connect to travel, culture, and higher learning.',10:'Professional charm and public favor increase. Career benefits from social grace.',11:'Friendships bring joy. Social networks become sources of pleasure.',12:'Private pleasures, artistic solitude, and hidden romances activate.'},
    Mars:{1:'Physical energy and assertiveness increase. You project strength.',2:'Aggressive pursuit of income and defense of possessions.',3:'Communication becomes sharp, competitive, and direct.',4:'Domestic energy intensifies — home projects, family conflicts, or fierce protectiveness.',5:'Creative drive surges. Competitive romance. Physical play and bold expression.',6:'Work drive intensifies. Health requires physical outlets. Workload increases.',7:'Relationship energy becomes confrontational or passionately direct.',8:'Power struggles around shared resources. Intense psychological confrontation.',9:'Aggressive pursuit of truth, adventure, and philosophical conviction.',10:'Career ambition sharpens. Professional competition and drive increase.',11:'Group dynamics become competitive. Fighting for collective causes.',12:'Hidden anger, self-sabotage, or channeled rage through private discipline.'},
    Jupiter:{1:'Personal growth and confidence expand. Opportunities come to you directly.',2:'Financial growth and material abundance. Values expand.',3:'Learning opportunities multiply. Communication brings luck.',4:'Home expansion — moves, renovations, family growth.',5:'Creative abundance. Romance expands. Joy and play flourish.',6:'Health improves. Work opportunities grow. Service brings rewards.',7:'Partnerships bring growth and opportunity. Legal matters favor you.',8:'Shared resources expand. Inheritance, investment, or deep psychological breakthroughs.',9:'Maximum expansion through travel, education, and faith. Jupiter is at home.',10:'Career growth and public recognition. Professional opportunities multiply.',11:'Social network expands. Friendships bring opportunity. Vision grows.',12:'Spiritual growth through solitude and inner work. Hidden blessings.'},
    Saturn:{1:'Identity is tested. Physical limitations or a more serious demeanor emerge.',2:'Financial restriction and forced reassessment of what you truly value.',3:'Communication becomes careful. Learning requires discipline.',4:'Home and family undergo structural pressure. Foundations are tested.',5:'Creative expression requires discipline. Joy must be earned.',6:'Health demands attention. Work routines need restructuring. Discipline in daily life.',7:'Partnerships undergo serious testing. Commitment or dissolution.',8:'Shared resources are restricted. Psychological confrontation with control.',9:'Belief systems are tested. Education requires persistence. Travel is purposeful.',10:'Career is under maximum pressure. Authority is earned or stripped.',11:'Friendships are pruned. Community responsibilities increase.',12:'Hidden burdens surface. Solitude becomes necessary. Endings formalize.'}
  };
  const ph=PH[planet];
  return ph?ph[house]||'':'';
}

function natalAspectDepth(p1,p2,aspectName){
  const key=natalAspectKey(p1,p2,aspectName);
  const pool=NATAL_ASPECT_DEPTH_V[key];
  if(pool)return pick(pool,todaySeed());
  return NATAL_ASPECT_DEPTH[key]||'';
}

// ── Upgraded getDeepInterp with composed fallback ──
function getDeepInterpV2(tp,np,aspectName,house){
  const key=tp+'_'+aspectName+'_'+np;
  const deep=DEEP[key];
  const tv=TRANSIT_VOICE[tp]||{};
  const nv=NATAL_VOICE[np]||{};
  const av=ASPECT_VOICE[aspectName]||{};
  const hv=HOUSE_VOICE[house]||{};

  let summary='',full='',advice='',houseContext='';

  if(deep){
    summary=deep.split('. ').slice(0,2).join('. ')+'.';
    full=deep;
  }else{
    // Compose from fragments instead of static template
    summary=composeTransitText(tp,np,aspectName,av.type||'conjunction',house);
    const sph=SPHERE[tp]||{};
    full=`${sph.name||tp} ${sph.office||'acts'}, ${sphereActive(tp)}. `;
    full+=`${av.desc||''}\n\n`;
    if(nv.desc)full+=`In your chart, this targets ${nv.desc.charAt(0).toLowerCase()+nv.desc.slice(1)}`;
  }
  advice=composeTransitText(tp,np,aspectName,av.type||'conjunction',house).split('. ').pop();
  if(hv.desc){
    const gerunds=HOUSE_GERUND[house]||HOUSE_GERUND[1];
    const tpPIH2=planetInHouse(tp,house);
    houseContext=`Playing out ${pick(gerunds,todaySeed())}: ${tpPIH2||houseVoiceDesc(house)}`;
  }

  return{summary,full,advice,houseContext,aspectLabel:av.label||aspectName,aspectFeel:av.feel||''};
}

// Synthesize the Shape of the Day paragraph (Layer 1)
function synthesizeShapeOfDay(transits,vibe,mPhase,retros,stats,vocResult,moonSign,prof,pHours,isToday){
  const sentences=[];

  // 1. Profected lord sets the frame
  const top3=transits.slice(0,3);
  const lordIsActive=top3.some(t=>t.tp===prof.yearLord||t.np===prof.yearLord);
  const sph=SPHERE[prof.yearLord]||{};
  if(lordIsActive){
    sentences.push(`Your lord of the year, ${sph.name||prof.yearLord}, is directly active today — ${sphereActive(prof.yearLord)||'pay close attention'}. What happens now speaks to the year\'s central themes.`);
  }

  // 2. Dominant transit energy
  const hardTop=transits.filter(t=>t.aspect.type==='hard'&&t.importance>15);
  const easyTop=transits.filter(t=>(t.aspect.type==='easy'||t.aspect.name==='conjunction')&&t.importance>15);

  if(hardTop.length>=2){
    const t1=hardTop[0],t2=hardTop[1];
    sentences.push(composeShapeSentence(t1.tp,t1.np,t1.aspect.name,t1.aspect.type,t1.house,t1.importance));
    const p2=SPHERE[t2.tp]||{};const h2=HOUSE_VOICE[t2.house]||{};
    sentences.push(`Meanwhile, ${p2.name||t2.tp} tests your ${(h2.name||'life').toLowerCase()}${dignityContext(t2.tp,t2.tLon)}. The friction is not punishment — it carries information about what needs to change.`);
  } else if(hardTop.length===1){
    const t1=hardTop[0];
    sentences.push(composeShapeSentence(t1.tp,t1.np,t1.aspect.name,t1.aspect.type,t1.house,t1.importance)+dignityContext(t1.tp,t1.tLon));
  } else if(easyTop.length>=2){
    const t1=easyTop[0];
    sentences.push(composeShapeSentence(t1.tp,t1.np,t1.aspect.name,t1.aspect.type,t1.house,t1.importance));
    const p2=SPHERE[easyTop[1].tp]||{};
    sentences.push(`${p2.name||easyTop[1].tp} adds its own harmonious note${dignityContext(easyTop[1].tp,easyTop[1].tLon)}. The question is not whether you have support but whether you will use it.`);
  } else if(easyTop.length===1){
    const t1=easyTop[0];
    sentences.push(composeShapeSentence(t1.tp,t1.np,t1.aspect.name,t1.aspect.type,t1.house,t1.importance)+dignityContext(t1.tp,t1.tLon));
  } else if(vibe.score>=5){
    const seed=todaySeed();
    const quietLines=['The planetary spheres are relatively quiet today — no single intelligence dominates. This is neutral time, good for steady work and your own agenda.','The sky offers a pause. No planet demands your attention. Use the space for what only you can decide.','A rare lull overhead. The cosmos releases its grip — your own priorities run the show.'];
    sentences.push(pick(quietLines,seed));
  } else {
    const seed=todaySeed();
    const complexLines=['Today\'s cosmic weather is complex, with multiple subtle pressures rather than one clear signal. Move deliberately and stay attentive to small shifts.','Several quiet currents run at once today. No single planet dominates, but the cumulative weight is real. Stay alert to undercurrents.','The sky hums with low-level activity — no headline transit, but a web of minor aspects that color everything.'];
    sentences.push(pick(complexLines,seed));
  }

  // 3. Moon condition
  const moonSph=SPHERE.Moon;
  if(vocResult&&vocResult.voc){
    sentences.push(`The Moon is void of course in ${moonSign.name} — she makes no further aspects before leaving the sign. This is a pause in the day\'s emotional rhythm. Don\'t launch anything new; finish what\'s in motion, organize, rest.`);
  } else {
    const mspText=moonSignPhaseText(moonSign.name,mPhase.name);
    sentences.push(`Moon in ${moonSign.name}, ${mPhase.name}: ${mspText}`);
  }

  // 4. Retrogrades as undercurrent
  if(retros.length>=3){
    sentences.push(`${retros.length} planets are retrograde — ${retros.slice(0,3).join(', ')} among them. The cosmos is in a reflective season. Forward motion meets internal revision; let both proceed.`);
  } else if(retros.length>0&&retros.some(r=>['Saturn','Jupiter','Pluto'].includes(r))){
    const retroDomains=retros.map(r=>(SPHERE[r]||{}).domain||'its domain');
    const seed=todaySeed();
    const retroFrames=['turning $D inward for revision','sending $D underground for review','folding $D back on itself — internal work first'];
    sentences.push(`${retros.join(' and ')} ${retros.length>1?'are':'is'} retrograde, ${pick(retroFrames,seed).replace('$D',retroDomains.join(' and '))}.`);
  }

  // 5. Stations (high-impact)
  if(stats.length>0){
    const stn=stats[0];const sp=SPHERE[stn]||{};
    const stationFrames=[
      `${sp.name||stn} is stationary — the moment a planet appears to stop concentrates its power to an almost unbearable point. Whatever ${sp.name||stn} signifies is amplified today.`,
      `${sp.name||stn} stands still in the sky, and its signal becomes deafening. ${sphereStressed(stn)||'The pressure is real.'} Everything in its domain is magnified.`,
      `A station of ${sp.name||stn}: the planet pauses, and its themes — ${sp.domain||'its nature'} — burn at maximum intensity. Handle with care.`
    ];
    sentences.push(pick(stationFrames,todaySeed()));
  }

  return sentences.join(' ');
}

// ── Daily guidance generator (Three-layer structure) ──

const MOON_PHASE_MEANINGS={
'New Moon':'The New Moon marks a beginning. Set intentions, plant seeds, and start fresh. Energy is low but potential is high. What you initiate now grows with the waxing Moon over the next two weeks.',
'Waxing Crescent':'Momentum is building. The seeds you planted at the New Moon are taking root. Commit to your intentions and take your first concrete steps. Challenges test your resolve.',
'First Quarter':'A turning point. You may face obstacles or decisions that test your commitment to what you started. Push through resistance — this friction creates strength.',
'Waxing Gibbous':'Refine and adjust. The energy is building toward fullness but something needs tweaking. Edit, improve, and prepare for the peak that\'s coming.',
'Full Moon':'Peak energy and illumination. What you started at the New Moon reaches a culmination — results become visible, emotions peak, and truths are revealed. Release what\'s complete.',
'Waning Gibbous':'Share what you\'ve harvested. This is a time for teaching, distributing, and expressing gratitude. The intensity of the Full Moon softens into wisdom.',
'Last Quarter':'Release and let go. What no longer serves your growth needs to be cleared away. Make space for the next cycle. Forgive, declutter, and surrender.',
'Waning Crescent':'Rest and reflect. The lunar cycle is ending. Withdraw, dream, meditate, and prepare your spirit for the new beginning approaching. Energy is low — honor that.',
};

// ── Vibe calculator (importance-weighted) ──

// ── Build transit timeline (upcoming exact dates for non-Moon transits) ──
function buildTimeline(transits,jd){
  const events=[];
  const seen=new Set();
  for(const t of transits){
    if(t.tp==='Moon')continue;
    const key=t.tp+'-'+t.np+'-'+t.aspect.name;
    if(seen.has(key))continue;seen.add(key);
    if(t.exactDate){
      const now=jdToDate(jd);
      const diffDays=Math.round((t.exactDate.getTime()-now.getTime())/(86400000));
      if(diffDays>=-3&&diffDays<=90){
        events.push({
          tp:t.tp,np:t.np,aspect:t.aspect,date:t.exactDate,diffDays,
          importance:t.importance,duration:t.duration,
          cls:t.aspect.type==='hard'?'hard':t.aspect.type==='easy'?'easy':t.aspect.name==='conjunction'?'conj':'minor'
        });
      }
    }
  }
  // Also scan for major transits not currently in orb but coming soon
  const outerPlanets=['Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron'];
  const natalPoints=['Sun','Moon','Mercury','Venus','Mars','Ascendant','MC'];
  for(const tp of outerPlanets){
    for(const np of natalPoints){
      const key=tp+'-'+np;
      if(Array.from(seen).some(k=>k.startsWith(key)))continue;
      // Check if an aspect forms within next 60 days
      for(const asp of ASPECTS){
        if(asp.type==='minor')continue;
        const nLon=NATAL[np];
        for(let d=1;d<=60;d+=3){
          const testJd=jd+d;const tLon=getLon(tp,testJd);
          let diff=Math.abs(norm(tLon-nLon)-asp.angle);if(diff>180)diff=360-diff;
          if(diff<2){
            const exactD=findExactDate(tp,np,asp.angle,testJd);
            const now=jdToDate(jd);
            const diffDays=Math.round((exactD.getTime()-now.getTime())/86400000);
            if(diffDays>3&&diffDays<=60){
              events.push({tp,np,aspect:{...asp,motion:'approaching'},date:exactD,diffDays,
                importance:transitImportance(tp,np,asp),duration:DUR[tp],cls:asp.type==='hard'?'hard':asp.type==='easy'?'easy':asp.name==='conjunction'?'conj':'minor'
              });
              seen.add(key+'-'+asp.name);
            }
            break;
          }
        }
      }
    }
  }
  events.sort((a,b)=>a.diffDays-b.diffDays);
  return events.slice(0,12);
}

// ══════════════════════════════════════════════════════════════
// MOON SVG + CHART WHEEL
// ══════════════════════════════════════════════════════════════

function renderMoonSVG(phaseAngle,size){
  const cx=size/2,cy=size/2,r=size/2-4;
  const a=((phaseAngle%360)+360)%360;
  const illuminated=.5*(1-Math.cos(a*DEG));
  const waxing=a<180;
  const gid='rmg'+Math.round(a*10);
  // Special cases
  if(illuminated<.005){
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;filter:drop-shadow(0 0 10px rgba(155,109,255,.2))">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#12153a" stroke="rgba(155,109,255,.25)" stroke-width="1" stroke-dasharray="2 3"/></svg>`;
  }
  if(illuminated>.995){
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;filter:drop-shadow(0 0 10px rgba(155,109,255,.2))">
      <defs><radialGradient id="${gid}"><stop offset="0%" stop-color="#f0e8d0"/><stop offset="100%" stop-color="#c8b890"/></radialGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gid})"/></svg>`;
  }
  // Clamp for visibility at small sizes
  const minVis=.15,maxVis=.85;
  let drawIllum=illuminated;
  if(drawIllum<minVis)drawIllum=minVis;
  if(drawIllum>maxVis)drawIllum=maxVis;
  const theta=Math.acos(1-2*drawIllum)*RAD;
  const drawPhase=waxing?theta:(360-theta);
  const termR=Math.abs(r*Math.cos(drawPhase*DEG));
  let litPath;
  if(drawIllum<.5){
    if(waxing){litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 1 ${cx} ${cy+r} A ${termR} ${r} 0 0 0 ${cx} ${cy-r} Z`;}
    else{litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 0 ${cx} ${cy+r} A ${termR} ${r} 0 0 1 ${cx} ${cy-r} Z`;}
  } else {
    if(waxing){litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 1 ${cx} ${cy+r} A ${termR} ${r} 0 0 1 ${cx} ${cy-r} Z`;}
    else{litPath=`M ${cx} ${cy-r} A ${r} ${r} 0 0 0 ${cx} ${cy+r} A ${termR} ${r} 0 0 0 ${cx} ${cy-r} Z`;}
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;filter:drop-shadow(0 0 10px rgba(155,109,255,.2))">
    <defs><radialGradient id="${gid}"><stop offset="0%" stop-color="#f0e8d0"/><stop offset="100%" stop-color="#c8b890"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#12153a" stroke="rgba(155,109,255,.15)" stroke-width="1"/>
    <path d="${litPath}" fill="url(#${gid})" stroke="rgba(240,232,208,.4)" stroke-width="0.5"/></svg>`;
}

let showAspectLines=true,showTransitRing=true;
let showNatalAspectLines=true;

// Chart-embeddable sigil functions (nested SVG for embedding in chart wheel)

// ══════════════════════════════════════════════════════════════
// INTERACTIVE UI + MAIN RENDER
// ══════════════════════════════════════════════════════════════

let expandedCards={},dayOffset=0,activeTab='home',activeFilter='all';
let showAllTransits=false; // toggle to show all transit cards instead of top 5
let toolsSubTab='synastry'; // 'synastry'|'map'|'elect'|'lore'|'ledger'
let guideMode='cards'; // 'cards'|'glossary'|'walkthrough'
let guideSearch='';
let guideWalkthroughStep=0;
let settingsEditingObserver=false;
let settingsEditingBirth=false;
let synAspects=[];
let synExpanded=null;
let synListOpen=false;
let synTechOpen=false;
let acPlanetToggles={Sun:true,Moon:true,Venus:true,Mars:true,Jupiter:true,Saturn:true,Mercury:false,Uranus:false,Neptune:false,Pluto:false,Chiron:false,NorthNode:false};
let acTapInfo=null;
let acSelectedChartId='alexander';
let acAstrocartoLines=null;

const MAP_REGIONS={
  world:{name:'World',viewBox:'0 0 360 180'},
  europe:{name:'Europe',viewBox:'140 15 80 55'},
  northAmerica:{name:'N. America',viewBox:'20 15 130 75'},
  asia:{name:'Asia',viewBox:'200 10 160 85'},
  southAmerica:{name:'S. America',viewBox:'75 70 80 80'},
  africa:{name:'Africa',viewBox:'150 30 80 105'},
  oceania:{name:'Oceania',viewBox:'275 70 90 80'},
  middleEast:{name:'Middle East',viewBox:'195 30 65 50'}
};
let acRegion='world';

const ASTRO_INTENTIONS={
  romance:{label:'Romance',planets:['Venus','Moon','Jupiter'],color:'var(--emerald)'},
  career:{label:'Career',planets:['Sun','Jupiter','Saturn','Mars'],color:'var(--gold)'},
  creativity:{label:'Creativity',planets:['Venus','Sun','Neptune','Moon'],color:'var(--violet)'},
  healing:{label:'Healing',planets:['Chiron','Moon','Neptune','Jupiter'],color:'var(--azure)'},
  settling:{label:'Roots',planets:['Moon','Saturn','Venus','Sun'],color:'var(--pearl)'}
};
let acIntention=null;

let savedLocations=(function(){try{return JSON.parse(localStorage.getItem('ac_saved_locs_v1'))||[];}catch(e){return[];}})();
function loadSavedLocations(){try{savedLocations=JSON.parse(localStorage.getItem('ac_saved_locs_v1'))||[];}catch(e){savedLocations=[];}}
function saveSavedLocations(){try{localStorage.setItem('ac_saved_locs_v1',JSON.stringify(savedLocations));}catch(e){}}
function addSavedLocation(name,lat,geoLon){savedLocations.push({name,lat,geoLon,id:Date.now()});saveSavedLocations();}
function removeSavedLocation(id){savedLocations=savedLocations.filter(l=>l.id!==id);saveSavedLocations();renderApp();}

function getNearestLines(lat,geoLon,lines,topN){
  topN=topN||3;
  const results=[];
  const lonDist=function(a,b){const d=Math.abs(a-b);return Math.min(d,360-d);};
  for(var planet of Object.keys(acPlanetToggles)){
    if(!(planet in lines))continue;
    var pl=lines[planet];
    results.push({planet:planet,angleType:'mc',dist:lonDist(geoLon,pl.mc)});
    results.push({planet:planet,angleType:'ic',dist:lonDist(geoLon,pl.ic)});
    if(pl.asc){for(var pt of pl.asc){results.push({planet:planet,angleType:'asc',dist:Math.sqrt(lonDist(geoLon,pt.lon)**2+(lat-pt.lat)**2)});}}
    if(pl.dsc){for(var pt of pl.dsc){results.push({planet:planet,angleType:'dsc',dist:Math.sqrt(lonDist(geoLon,pt.lon)**2+(lat-pt.lat)**2)});}}
  }
  results.sort(function(a,b){return a.dist-b.dist;});
  var seen={};
  return results.filter(function(r){var k=r.planet+r.angleType;if(seen[k])return false;seen[k]=true;return true;}).slice(0,topN);
}

function selectIntention(key){
  if(acIntention===key){acIntention=null;}
  else{
    acIntention=key;
    var intent=ASTRO_INTENTIONS[key];
    for(var p of Object.keys(acPlanetToggles))acPlanetToggles[p]=false;
    for(var p of intent.planets)acPlanetToggles[p]=true;
  }
  renderApp();
}

function computeLineCrossings(lines,activeToggles){
  var crossings=[];
  var activePlanets=Object.keys(activeToggles).filter(function(p){return activeToggles[p]&&lines[p];});
  var toMapX=function(geoLon){return((geoLon+180)%360+360)%360;};
  for(var i=0;i<activePlanets.length;i++){
    for(var j=0;j<activePlanets.length;j++){
      if(i===j)continue;
      var pA=activePlanets[i],pB=activePlanets[j];
      var plA=lines[pA],plB=lines[pB];
      var curveTypes=['asc','dsc'];
      for(var ci=0;ci<curveTypes.length;ci++){
        var curveType=curveTypes[ci];
        if(!plA[curveType]||plA[curveType].length<2)continue;
        var angTypes=['mc','ic'];
        for(var ai=0;ai<angTypes.length;ai++){
          var angType=angTypes[ai];
          var vLon=plB[angType];
          if(vLon===undefined)continue;
          var vX=toMapX(vLon);
          var pts=plA[curveType];
          for(var k=1;k<pts.length;k++){
            var x0=toMapX(pts[k-1].lon),x1=toMapX(pts[k].lon);
            if(Math.abs(x1-x0)>180)continue;
            if((x0<=vX&&x1>=vX)||(x1<=vX&&x0>=vX)){
              var t=(x0===x1)?0.5:(vX-x0)/(x1-x0);
              var crossLat=pts[k-1].lat+t*(pts[k].lat-pts[k-1].lat);
              if(crossLat>85||crossLat<-85)continue;
              crossings.push({pA:pA,pB:pB,angA:curveType,angB:angType,lat:crossLat,lon:vX,geoLon:vLon});
            }
          }
        }
      }
    }
  }
  var unique=[];
  for(var c of crossings){
    var dup=unique.find(function(u){return Math.abs(u.lat-c.lat)<3&&Math.abs(u.lon-c.lon)<3&&((u.pA===c.pA&&u.pB===c.pB)||(u.pA===c.pB&&u.pB===c.pA));});
    if(!dup)unique.push(c);
  }
  return unique;
}

let todayZone=(function(){try{return localStorage.getItem('today_zone_v1')||'all';}catch(e){return 'all';}})();
function setTodayZone(z){todayZone=z;try{localStorage.setItem('today_zone_v1',z);}catch(e){}renderApp();window.scrollTo({top:0,behavior:'smooth'});}

// ── Theme system ──
const THEME_KEY='astro_theme_v1';
let themeOverride=(function(){try{return localStorage.getItem(THEME_KEY)||null;}catch(e){return null;}})();
function detectTheme(){
  if(themeOverride)return themeOverride;
  // Respect system preference first
  try{
    if(window.matchMedia){
      if(window.matchMedia('(prefers-color-scheme: dark)').matches)return'dark';
      if(window.matchMedia('(prefers-color-scheme: light)').matches)return'light';
    }
  }catch(e){}
  // Fallback: sun-follows time-of-day
  const h=new Date().getHours();
  return(h>=6&&h<18)?'light':'dark';
}
function applyTheme(t){document.documentElement.classList.toggle('light',t==='light');
  document.querySelector('meta[name=theme-color]').content=t==='light'?'#f4f0e6':'#05081a';}
function toggleTheme(){
  const cur=detectTheme();
  themeOverride=cur==='light'?'dark':'light';
  try{localStorage.setItem(THEME_KEY,themeOverride);}catch(e){}
  applyTheme(themeOverride);
  renderApp();
}
applyTheme(detectTheme());
// React to system theme changes when user hasn't manually overridden
try{
  const mq=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
  if(mq&&mq.addEventListener)mq.addEventListener('change',()=>{if(!themeOverride){applyTheme(detectTheme());if(typeof renderApp==='function')renderApp();}});
}catch(e){}

// Swipe navigation handled below

// ── Show more transits ──
let showAllTransits=false;
function toggleShowAll(){showAllTransits=!showAllTransits;renderApp();}

// ── Guidance expand ──
let guidanceExpanded=false;
function toggleGuidance(){guidanceExpanded=!guidanceExpanded;
  const el=document.querySelector('.guidance-preview');
  if(el)el.classList.toggle('expanded',guidanceExpanded);
  const btn=document.querySelector('.guidance-toggle');
  if(btn)btn.textContent=guidanceExpanded?'Show less':'Read more';}

// ── Layer toggles ──
const layersExpanded={l2:true,l3:false};
// ── Mechanic group toggles (Layer 3 categories) ──
const mechGroupOpen={timing:true,positions:false,timelords:false,transits:false,practice:false};
function toggleMechGroup(g){mechGroupOpen[g]=!mechGroupOpen[g];renderApp();}
// ── Time-scale strip state ──
let tsOpenCell=null; // 'now'|'month'|'year'|'chapter'|null
function toggleTsCell(cell){tsOpenCell=tsOpenCell===cell?null:cell;renderApp();}
let consultOpen=false;
let consultV2Open=false;
let consultEventType=null;
let consultWindow='next3h';
let consultInvolved=[];
let consultFreeText='';
let consultLoading=false;
let consultResult=null;
let consultError=null;
function openConsult(){consultOpen=true;renderApp();}
function closeConsult(){consultOpen=false;renderApp();}
function openConsultV2(){consultV2Open=true;consultResult=null;consultError=null;renderApp();}
function closeConsultV2(){consultV2Open=false;consultLoading=false;consultResult=null;consultError=null;consultEventType=null;consultFreeText='';consultInvolved=[];renderApp();}
function pickConsultEvent(t){consultEventType=t;renderApp();}
function pickConsultWindow(w){consultWindow=w;renderApp();}
function toggleConsultInvolved(id){
  const idx=consultInvolved.indexOf(id);
  if(idx>=0)consultInvolved.splice(idx,1);else consultInvolved.push(id);
  renderApp();
}
function onConsultFreeText(v){consultFreeText=v;}
async function runConsult(){
  if(!consultEventType||consultLoading)return;
  consultLoading=true;consultError=null;consultResult=null;renderApp();
  try{
    const charts=consultInvolved.map(id=>savedCharts.find(c=>c.id===id)).filter(Boolean);
    const windowLabels={now:'Right now',next3h:'Next 3 hours',today:'Today',week:'This week'};
    const result=await consultMoment({
      eventType:consultEventType,
      windowScope:windowLabels[consultWindow]||consultWindow,
      involvedCharts:charts.length?charts:null,
      freeText:consultFreeText||null
    });
    consultResult=result;
    saveConsult(result);
  }catch(e){
    consultError=e.message||'Consult failed';
  }
  consultLoading=false;renderApp();
}
let electionalOpen=false;
let electionalTask=null;
let electionalResults=null;
function openElectional(){electionalOpen=true;renderApp();}
function closeElectional(){electionalOpen=false;electionalTask=null;electionalResults=null;renderApp();}
function pickElectionalTask(task){
  electionalTask=task;
  try{electionalResults=findBestElectionalWindows(task,7,3);}
  catch(e){console.error('electional error',e);electionalResults=[];}
  renderApp();
}
let mansionExpanded=false;
function toggleMansion(){mansionExpanded=!mansionExpanded;renderApp();}
let toneExpanded=false;
function toggleTone(){toneExpanded=!toneExpanded;renderApp();}
let hourNowExpanded=false;
function toggleHourNow(){hourNowExpanded=!hourNowExpanded;renderApp();}
let moonExpanded=false;
function toggleMoon(){moonExpanded=!moonExpanded;renderApp();}
let profExpanded=null; // 'year'|'month'|'sect'|null
function toggleProf(which){profExpanded=profExpanded===which?null:which;renderApp();}
let synthOutputCollapsed=(function(){try{return localStorage.getItem('synth_output_collapsed_v1')==='1';}catch(e){return true;}})();
function setSynthOutputCollapsed(v){synthOutputCollapsed=v;try{localStorage.setItem('synth_output_collapsed_v1',v?'1':'0');}catch(e){}renderApp();}
function toggleSynthOutput(){setSynthOutputCollapsed(!synthOutputCollapsed);}
let expandedLot=null;
function toggleLot(name){expandedLot=expandedLot===name?null:name;renderApp();}
let sunCardExpanded=false;
function toggleSunCard(){sunCardExpanded=!sunCardExpanded;renderApp();}
let expandedPlanet=null;
function togglePlanet(p){expandedPlanet=expandedPlanet===p?null:p;renderApp();}
let expandedShift=null;
function toggleShift(p){expandedShift=expandedShift===p?null:p;renderApp();}
let expandedDayTransit=null;
function toggleDayTransit(id){expandedDayTransit=expandedDayTransit===id?null:id;renderApp();}

// ── Journal state ──
let journalMood=null;
let journalNoteInput='';
let journalHistoryOpen=false;
let journalContextPending=null; // set when user picks a mood — captures current astro snapshot
let journalTrackSynthesis=true; // default: save synthesis with entry
let journalSynthesisRating=null; // 'hit'|'partial'|'miss'|'untested'|null
let journalSynthesisFeedback='';
let journalShowSynthTracking=false; // expand the synthesis tracking section
function pickMood(m){
  journalMood=m;
  // Context is captured at save time against current renderApp closure values via global stash
  renderApp();
  // Focus note
  setTimeout(()=>{const el=document.getElementById('journal-note');if(el)el.focus();},50);
}
function onJournalNoteInput(v){journalNoteInput=v;}
function toggleJournalSynthTracking(){journalShowSynthTracking=!journalShowSynthTracking;renderApp();}
function setJournalSynthRating(r){journalSynthesisRating=r;renderApp();}
function onJournalSynthFeedback(v){journalSynthesisFeedback=v;}
function saveJournalEntry(){
  if(!journalMood){return;}
  const ctx=window._pendingJournalCtx||{};
  // Add synthesis tracking if enabled
  if(journalTrackSynthesis&&window._pendingSynthesisForJournal){
    const s=window._pendingSynthesisForJournal;
    ctx.synthesisText=s.text||'';
    ctx.synthesisTokens=s.tokens||[];
    ctx.synthesisSource=s.source||'deterministic';
  }
  if(journalSynthesisRating)ctx.synthesisRating=journalSynthesisRating;
  if(journalSynthesisFeedback)ctx.synthesisFeedback=journalSynthesisFeedback;
  journalAddEntry(journalMood,journalNoteInput,ctx);
  journalMood=null;
  journalNoteInput='';
  journalSynthesisRating=null;
  journalSynthesisFeedback='';
  journalShowSynthTracking=false;
  renderApp();
}
function cancelJournalEntry(){journalMood=null;journalNoteInput='';journalSynthesisRating=null;journalSynthesisFeedback='';journalShowSynthTracking=false;renderApp();}
function toggleJournalHistory(){journalHistoryOpen=!journalHistoryOpen;renderApp();}
function deleteJournalEntry(ts){
  if(!confirm('Delete this entry?'))return;
  journalDelete(ts);renderApp();
}

// ── ZR state ──
let zrExpanded=false;
let zrSource='Spirit'; // 'Spirit' or 'Fortune'
function toggleZR(){zrExpanded=!zrExpanded;renderApp();}
function setZRSource(s){zrSource=s;renderApp();}
let firExpanded=false;
function toggleFirdaria(){firExpanded=!firExpanded;renderApp();}

let returnsExpanded=false;
function toggleReturns(){returnsExpanded=!returnsExpanded;renderApp();}

let liturgyExpanded=false;
function toggleLiturgy(){liturgyExpanded=!liturgyExpanded;renderApp();}

let notifExpanded=false;
function toggleNotif(){notifExpanded=!notifExpanded;renderApp();}
async function notifRequestPerm(){
  const ok=await requestNotificationPermission();
  if(!ok&&Notification.permission==='denied'){
    alert('Notifications are blocked. Enable them in your browser settings to receive alerts.');
  }
  renderApp();
}
function notifSetPref(key,val){
  notifPrefs[key]=val;saveNotifPrefs(notifPrefs);renderApp();
  if(notifPrefs.enabled)startNotificationEngine();
}
function notifToggleMaster(){
  if(notifPrefs.enabled){
    notifPrefs.enabled=false;saveNotifPrefs(notifPrefs);stopNotificationEngine();renderApp();
  } else notifRequestPerm();
}

let fsNatalExpanded=false,fsTransitExpanded=false,natalAspectsExpanded=false;
function toggleFSNatal(){fsNatalExpanded=!fsNatalExpanded;renderApp();}
function toggleNatalAspects(){natalAspectsExpanded=!natalAspectsExpanded;renderApp();}
function toggleFSTransit(){fsTransitExpanded=!fsTransitExpanded;renderApp();}

let refExpanded={},refCategory='All',refQuery='';
let refIntroDismissed=false;
try{refIntroDismissed=!!localStorage.getItem('ref-intro-seen')}catch(e){}
function dismissRefIntro(){refIntroDismissed=true;try{localStorage.setItem('ref-intro-seen','1')}catch(e){}renderApp();}
function toggleRef(term){refExpanded[term]=!refExpanded[term];renderApp();}
function setRefCat(c){refCategory=c;renderApp();}
function setRefQuery(q){refQuery=q;renderApp();}
let decanExpanded=false;
function toggleDecan(){decanExpanded=!decanExpanded;renderApp();}
function toggleLayer2(){layersExpanded.l2=!layersExpanded.l2;
  const el=document.getElementById('layer2');if(el)el.style.display=layersExpanded.l2?'block':'none';
  const ar=document.getElementById('l2-arrow');if(ar)ar.innerHTML=layersExpanded.l2?'&#9660;':'&#9654;';}
function toggleLayer3(){layersExpanded.l3=!layersExpanded.l3;
  const el=document.getElementById('layer3');if(el)el.style.display=layersExpanded.l3?'block':'none';
  const ar=document.getElementById('l3-arrow');if(ar)ar.innerHTML=layersExpanded.l3?'&#9660;':'&#9654;';}

// Caches
const _forecastCache={},_exactDateCache={};
function cachedExactDate(tp,np,aspectAngle,jd){
  const key=tp+np+aspectAngle;
  if(!_exactDateCache[key])_exactDateCache[key]=findExactDate(tp,np,aspectAngle,jd);
  return _exactDateCache[key];
}
function cachedForecast(baseJd){
  const key=Math.round(baseJd*10);
  if(!_forecastCache[key])_forecastCache[key]=compute7Day(baseJd);
  return _forecastCache[key];
}

function getTargetDate(){const d=new Date();d.setDate(d.getDate()+dayOffset);return d;}

// ── Tooltip system ──
function showTooltip(term,el){
  const g=GLOSSARY[term];if(!g)return;
  const tip=document.getElementById('tooltip-el');
  // Check if there's a lore entry for this term
  let loreLink='';
  if(typeof REFERENCES!=='undefined'&&typeof openLoreForToken==='function'){
    // Map glossary terms to lore token types
    const termToToken={'Profection':'profection-year','Sect Light':'sect-light','Zodiacal Releasing':'zr-spirit','Firdaria':'firdaria-major','Lots':'lot','Lunar Mansions':'mansion','Planetary Hours':'hour','Decans':'decan-sun','Fixed Stars':'fixed-star','Solar Return':'return-solar','Lunar Return':'return-lunar'};
    const tokenType=termToToken[term];
    const loreTerm=tokenType&&typeof CITATION_LORE!=='undefined'?CITATION_LORE[tokenType]:null;
    if(loreTerm&&REFERENCES.some(r=>r.term===loreTerm)){
      loreLink=`<div style="margin-top:6px"><span onclick="event.stopPropagation();openLoreForToken('${tokenType}')" style="color:var(--violet);cursor:pointer;font-size:11px;text-decoration:underline">What is this? Read in Lore</span></div>`;
    }
  }
  tip.innerHTML=`<strong>${term}</strong>${g}${loreLink}<div class="tip-close-hint">tap to dismiss</div>`;
  const rect=el.getBoundingClientRect();
  tip.style.left=Math.min(rect.left,window.innerWidth-290)+'px';
  tip.style.top=(rect.top-tip.offsetHeight-8)+'px';
  tip.classList.add('open');
  // Long auto-dismiss; user can tap anywhere to close sooner.
  if(window._tipTO) clearTimeout(window._tipTO);
  window._tipTO=setTimeout(()=>tip.classList.remove('open'),20000);
  const close=(ev)=>{ if(tip.contains(ev.target))return; tip.classList.remove('open');
    document.removeEventListener('touchstart',close,true);
    document.removeEventListener('mousedown',close,true);
  };
  setTimeout(()=>{document.addEventListener('touchstart',close,true);document.addEventListener('mousedown',close,true);},150);
}
function showTip(term){const el=event.currentTarget;event.stopPropagation();showTooltip(term,el);}

// ── Planet Modal ──
function openPlanetModal(planet,cur,jd){
  const modal=document.getElementById('planet-modal');
  const nLon=NATAL[planet];const tLon=cur[planet];
  const nSign=signOf(nLon),tSign=signOf(tLon);
  const nHouse=houseOf(nLon),tHouse=houseOf(tLon);
  const nDig=getDignity(planet,nLon),tDig=getDignity(planet,tLon);
  const ms=motionStatus(planet,jd);
  const tv=TRANSIT_VOICE[planet]||{};const nv=NATAL_VOICE[planet]||{};
  const label=planet==='NorthNode'?'North Node':planet;

  let h=`<div class="modal-sheet"><div class="modal-handle"></div>`;
  h+=`<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">`;
  h+=`<div>${pSVG(planet,36,'var(--gold)')}</div>`;
  h+=`<div><div style="font-size:20px;font-weight:700;color:var(--bright)">${label}</div>`;
  h+=`<div style="font-size:12px;color:var(--text2)">${tv.theme||''}</div></div></div>`;

  // Current transit position
  h+=`<div class="section-title">Current Position</div>`;
  h+=`<div class="card">`;
  h+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">`;
  h+=`<div><div style="font-size:14px;font-weight:600;color:var(--bright)">${fmtLong(tLon)}</div>`;
  h+=`<div style="font-size:12px;color:var(--text2)">House ${tHouse} — ${(HOUSE_VOICE[tHouse]||{}).name||''}</div></div>`;
  h+=`<div style="text-align:right">`;
  if(ms.retrograde)h+=`<div style="font-size:11px;font-weight:700;color:var(--crimson)">RETROGRADE</div>`;
  else if(ms.stationary)h+=`<div style="font-size:11px;font-weight:700;color:var(--amber)">STATIONARY</div>`;
  else h+=`<div style="font-size:11px;color:var(--text2)">Direct</div>`;
  if(tDig)h+=`<div style="font-size:10px;font-weight:700;color:${tDig.color}">${tDig.label}</div>`;
  h+=`</div></div>`;
  h+=`<div style="font-size:13px;line-height:1.6;color:var(--text)">${transitVoiceDesc(planet)}</div>`;
  if(ms.retrograde&&RETRO_VOICE_V[planet])h+=`<div style="margin-top:8px;font-size:12px;line-height:1.6;color:var(--violet);padding:10px;background:var(--violet-soft);border-radius:var(--r-sm)">${retroVoice(planet)}</div>`;
  const tDec=computeDecan(tLon);
  if(tDec&&tDec.card){
    h+=`<div class="pm-decan">`;
    h+=`<div class="pm-decan-head">Decan ${tDec.decanNum} of ${tDec.signName} — ${tDec.ruler}${tDec.keyword?' · '+tDec.keyword:''}</div>`;
    h+=`<div class="pm-decan-image"><strong>${tDec.card}</strong> — ${tDec.title}</div>`;
    h+=`<div class="pm-decan-ind">${tDec.meaning}</div>`;
    h+=`</div>`;
  }
  h+=`</div>`;

  // Natal position
  h+=`<div class="section-title">In Your Birth Chart</div>`;
  h+=`<div class="card">`;
  h+=`<div style="font-size:14px;font-weight:600;color:var(--bright);margin-bottom:4px">${fmtLong(nLon)}</div>`;
  h+=`<div style="font-size:12px;color:var(--text2);margin-bottom:8px">House ${nHouse} — ${(HOUSE_VOICE[nHouse]||{}).name||''}</div>`;
  if(nDig)h+=`<div style="font-size:11px;font-weight:700;color:${nDig.color};margin-bottom:6px">${nDig.label}: ${nDig.desc}</div>`;
  h+=`<div style="font-size:13px;line-height:1.6;color:var(--text)">${nv.desc||''}</div>`;
  h+=`<div style="font-size:12px;line-height:1.5;color:var(--text2);margin-top:6px;font-style:italic">${houseVoiceDesc(nHouse)}</div>`;
  const nDec=computeDecan(nLon);
  if(nDec&&nDec.card){
    h+=`<div class="pm-decan">`;
    h+=`<div class="pm-decan-head">Decan ${nDec.decanNum} of ${nDec.signName} — ${nDec.ruler}${nDec.keyword?' · '+nDec.keyword:''}</div>`;
    h+=`<div class="pm-decan-image"><strong>${nDec.card}</strong> — ${nDec.title}</div>`;
    h+=`<div class="pm-decan-ind">${nDec.meaning}</div>`;
    h+=`</div>`;
  }
  h+=`</div>`;

  h+=`<div style="padding:12px 0;text-align:center"><button onclick="closeModal()" style="background:var(--surface);border:none;color:var(--text2);padding:10px 24px;border-radius:var(--r-lg);font-size:13px;font-weight:600;cursor:pointer">Close</button></div>`;
  h+=`</div>`;
  modal.innerHTML=h;modal.classList.add('open');
}
function closeModal(){document.getElementById('planet-modal').classList.remove('open');}

// ── 7-Day Forecast Engine ──
function compute7Day(baseJd){
  const days=[];
  for(let d=-1;d<=5;d++){
    const fJd=baseJd+d;const fCur=computeAll(fJd);
    const TPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
    const NPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode','Ascendant','MC'];
    const fTransits=[];
    for(const tp of TPS){for(const np of NPS){
      if(tp===np&&!['Saturn','Jupiter','Mars','Chiron','NorthNode'].includes(tp))continue;
      const asp=findAspect(fCur[tp],NATAL[np],tp,np,fJd);
      if(asp)fTransits.push({tp,np,aspect:asp,importance:transitImportance(tp,np,asp)});
    }}
    const v=vibeCalc(fTransits);
    const date=jdToDate(fJd);
    days.push({offset:d,date,score:v.score,transits:fTransits,count:fTransits.length});
  }
  return days;
}

// ══════════════════════════════════════════════════════════════
// MAIN RENDER
// ══════════════════════════════════════════════════════════════

// ============================================================================
// SECTION 3: CHART MANAGEMENT FUNCTIONS
// ============================================================================

// ============================================================================
// SECTION 4: SYNASTRY COMPUTATION
// ============================================================================

function getAspectType(aspectName, pA, pB) {
  if (aspectName === 'trine' || aspectName === 'sextile') return 'easy';
  if (aspectName === 'square' || aspectName === 'opposition') return 'challenging';
  if (aspectName === 'conjunction') {
    const malefics = ['Mars','Saturn','Pluto'];
    const personals = ['Sun','Moon','Mercury','Venus','Ascendant','MC'];
    const inv = [pA, pB];
    if (inv.some(p => malefics.includes(p)) && inv.some(p => personals.includes(p))) return 'challenging';
    if (inv.filter(p => malefics.includes(p)).length === 2) return 'challenging';
    return 'easy';
  }
  return 'neutral';
}

function shortArcMidpoint(a, b) {
  const norm = v => ((v % 360) + 360) % 360;
  a = norm(a); b = norm(b);
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return norm(a + diff / 2);
}

function findSynAspect(lonA, lonB) {
  const aspects = [
    { name:'conjunction', angle:0, orb:8 },
    { name:'sextile', angle:60, orb:5 },
    { name:'square', angle:90, orb:6 },
    { name:'trine', angle:120, orb:6 },
    { name:'opposition', angle:180, orb:8 }
  ];
  const d = Math.abs(lonA - lonB);
  const minD = Math.min(d, 360 - d);
  for (const asp of aspects) {
    const diff = Math.abs(minD - asp.angle);
    if (diff <= asp.orb) return { ...asp, orbActual: diff };
  }
  return null;
}

function computeSynastryAspects(natalA, natalB) {
  const aspects = [];
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Chiron', 'NorthNode'];
  const angleLons = { asc: natalA.Ascendant, mc: natalA.MC };
  const angleLonsB = { asc: natalB.Ascendant, mc: natalB.MC };

  const allPlanetsA = { ...natalA, ...angleLons };
  const allPlanetsB = { ...natalB, ...angleLonsB };

  const keys = [...planets, 'asc', 'mc'];

  for (let pA of keys) {
    if (!(pA in allPlanetsA)) continue;
    for (let pB of keys) {
      if (!(pB in allPlanetsB)) continue;

      const lonA = allPlanetsA[pA];
      const lonB = allPlanetsB[pB];

      const diff = Math.abs(lonA - lonB);
      const minDiff = Math.min(diff, 360 - diff);

      const orbs = {
        conjunction: 8,
        opposition: 8,
        trine: 6,
        sextile: 5,
        square: 6
      };

      let aspect = null;
      let orbActual = 360;

      for (let [asp, orb] of Object.entries(orbs)) {
        let ang = 0;
        if (asp === 'conjunction') ang = 0;
        else if (asp === 'opposition') ang = 180;
        else if (asp === 'trine') ang = 120;
        else if (asp === 'sextile') ang = 60;
        else if (asp === 'square') ang = 90;

        const d1 = Math.abs(minDiff - ang);
        const d2 = Math.abs(minDiff - (360 - ang));
        const d = Math.min(d1, d2);

        if (d < orb && d < orbActual) {
          aspect = asp;
          orbActual = d;
        }
      }

      if (aspect) {
        aspects.push({
          pA,
          pB,
          aspect,
          orbActual: orbActual.toFixed(2),
          type: getAspectType(aspect, pA, pB)
        });
      }
    }
  }

  return aspects.sort((a, b) => parseFloat(a.orbActual) - parseFloat(b.orbActual));
}

function computeSynastryTraditional(natalA, housesA, natalB, housesB, jdA, jdB, aspects) {
  const traditional = {
    lunarContact: false,
    lunarContactType: '',
    venusMarsMutual: false,
    saturnContacts: 0,
    elementBalance: '',
    houseOverlays: []
  };

  // Aspect-aware Sun-Moon contact (all 5 major aspects, both directions)
  const sm1 = findSynAspect(natalA.Sun, natalB.Moon);
  const sm2 = findSynAspect(natalB.Sun, natalA.Moon);
  const bestSM = [sm1, sm2].filter(Boolean).sort((a,b) => a.orbActual - b.orbActual)[0];
  if (bestSM) {
    traditional.lunarContact = true;
    traditional.lunarContactType = `${bestSM.name} (${bestSM.orbActual.toFixed(1)}°)`;
  }

  // Aspect-aware Venus-Mars contact (all 5 major aspects, both directions)
  const vm1 = findSynAspect(natalA.Venus, natalB.Mars);
  const vm2 = findSynAspect(natalB.Venus, natalA.Mars);
  const bestVM = [vm1, vm2].filter(Boolean).sort((a,b) => a.orbActual - b.orbActual)[0];
  if (bestVM) {
    traditional.venusMarsMutual = true;
    traditional.venusMarsMutualType = `${bestVM.name} (${bestVM.orbActual.toFixed(1)}°)`;
  }

  // Count Saturn hard aspects from the computed aspects array
  traditional.saturnContacts = aspects ? aspects.filter(a =>
    (a.pA === 'Saturn' || a.pB === 'Saturn') &&
    (a.type === 'challenging')
  ).length : 0;

  // Element balance
  const signEl = (lon) => { const s = Math.floor(lon / 30) % 12; return ['fire','earth','air','water'][s % 4]; };
  const elCountA = { fire:0, earth:0, air:0, water:0 };
  const elCountB = { fire:0, earth:0, air:0, water:0 };
  for (const p of ['Sun','Moon','Mercury','Venus','Mars']) {
    if (natalA[p] !== undefined) elCountA[signEl(natalA[p])]++;
    if (natalB[p] !== undefined) elCountB[signEl(natalB[p])]++;
  }
  // Find dominant elements
  const domA = Object.entries(elCountA).sort((a,b) => b[1]-a[1])[0][0];
  const domB = Object.entries(elCountB).sort((a,b) => b[1]-a[1])[0][0];
  const elCompat = { 'fire-fire':'igniting','fire-air':'inspiring','fire-earth':'productive tension','fire-water':'steamy tension',
    'earth-earth':'grounding','earth-air':'complementary','earth-water':'nurturing','air-air':'intellectual','air-water':'creative tension','water-water':'deeply emotional' };
  const elKey = [domA,domB].sort().join('-');
  traditional.elementBalance = elCompat[elKey] || 'mixed';

  // House overlays: where partner's Sun/Moon/Venus fall in your houses
  const houseOf = (lon, houses) => {
    for (let i = 11; i >= 0; i--) {
      if (lon >= houses[i]) return i + 1;
    }
    return 12;
  };
  for (const p of ['Sun','Moon','Venus','Mars']) {
    if (natalB[p] !== undefined) {
      traditional.houseOverlays.push({ planet: p, person: 'B', house: houseOf(natalB[p], housesA) });
    }
    if (natalA[p] !== undefined) {
      traditional.houseOverlays.push({ planet: p, person: 'A', house: houseOf(natalA[p], housesB) });
    }
  }

  // ── Ruler of the 7th house ──
  const sign7A = SIGNS[Math.floor(((housesA[6] % 360 + 360) % 360) / 30)];
  const ruler7A = RULERS[sign7A];
  if (ruler7A && natalA[ruler7A] !== undefined) {
    traditional.ruler7thA = { ruler: ruler7A, sign: sign7A, houseInB: houseOf(natalA[ruler7A], housesB) };
  }
  const sign7B = SIGNS[Math.floor(((housesB[6] % 360 + 360) % 360) / 30)];
  const ruler7B = RULERS[sign7B];
  if (ruler7B && natalB[ruler7B] !== undefined) {
    traditional.ruler7thB = { ruler: ruler7B, sign: sign7B, houseInA: houseOf(natalB[ruler7B], housesA) };
  }

  // ── Sect compatibility ──
  const sunHouseA = houseOf(natalA.Sun, housesA);
  const sunHouseB = houseOf(natalB.Sun, housesB);
  const sectA = sunHouseA >= 7 ? 'diurnal' : 'nocturnal';
  const sectB = sunHouseB >= 7 ? 'diurnal' : 'nocturnal';
  traditional.sectMatch = sectA === sectB;
  traditional.sectA = sectA;
  traditional.sectB = sectB;

  // ── Mutual reception ──
  traditional.receptions = [];
  const personalPlanets = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  for (const pA of personalPlanets) {
    if (natalA[pA] === undefined) continue;
    const signA = SIGNS[Math.floor(natalA[pA] / 30) % 12];
    const rulerOfSignA = RULERS[signA];
    for (const pB of personalPlanets) {
      if (natalB[pB] === undefined || pB !== rulerOfSignA) continue;
      const signB = SIGNS[Math.floor(natalB[pB] / 30) % 12];
      const rulerOfSignB = RULERS[signB];
      if (rulerOfSignB === pA) {
        traditional.receptions.push({ type:'mutual', pA, pB, signA, signB });
      } else {
        traditional.receptions.push({ type:'one-way', guest:pA, host:pB, sign:signA });
      }
    }
  }

  return traditional;
}

function computeRelationshipWeather(natalA,natalB,partnerName){
  const items=[];
  const now=getTargetDate();
  const jd=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours()+now.getUTCMinutes()/60);
  const cur=computeAll(jd);
  const transitPlanets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  const natalTargets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Ascendant'];
  const WEATHER_ASPECTS=[{name:'conjunction',angle:0,orb:6,type:'conjunction'},{name:'opposition',angle:180,orb:5,type:'hard'},{name:'trine',angle:120,orb:5,type:'easy'},{name:'square',angle:90,orb:5,type:'hard'},{name:'sextile',angle:60,orb:4,type:'easy'}];
  const meanings={
    'Sun|conjunction':'Your identity lights up this area of the relationship.',
    'Sun|trine':'Easy warmth and mutual visibility between you.',
    'Sun|square':'Friction around ego and direction — stay aware.',
    'Sun|opposition':'Opposing pulls on shared goals.',
    'Moon|conjunction':'Emotional activation — feelings run close to the surface.',
    'Moon|trine':'Emotional ease and nurturing energy flows.',
    'Moon|square':'Emotional friction — be gentle with each other.',
    'Venus|conjunction':'Affection and attraction heightened.',
    'Venus|trine':'Harmonious romantic and social energy.',
    'Venus|square':'Desire and values may clash — negotiate.',
    'Mars|conjunction':'Passionate energy — channel it well.',
    'Mars|trine':'Productive shared drive and motivation.',
    'Mars|square':'Irritability or arguments more likely — take space if needed.',
    'Mars|opposition':'Tension around action and desire.',
    'Saturn|conjunction':'Serious tone — commitment themes surface.',
    'Saturn|square':'Pressure and restriction on this connection.',
    'Jupiter|conjunction':'Expansion and optimism in the relationship.',
    'Jupiter|trine':'Growth and good fortune between you.',
  };
  for(const tp of transitPlanets){
    if(cur[tp]===undefined)continue;
    for(const np of natalTargets){
      if(natalB[np]===undefined)continue;
      for(const asp of WEATHER_ASPECTS){
        let d=Math.abs(norm(cur[tp]-natalB[np])-asp.angle);if(d>180)d=360-d;
        if(d<=asp.orb){
          const key=`${tp}|${asp.name}`;
          const meaning=meanings[key]||`Transit ${tp} ${asp.name} activates ${partnerName}'s ${np}.`;
          items.push({transit:tp,natal:np,aspect:asp.name,type:asp.type,orb:d.toFixed(1),meaning});
          break;
        }
      }
    }
  }
  items.sort((a,b)=>parseFloat(a.orb)-parseFloat(b.orb));
  return items.slice(0,6);
}

function generateSynastryNarrative(aspects, traditional) {
  let parts = [];

  const easy = aspects.filter(a => a.type === 'easy').length;
  const hard = aspects.filter(a => a.type === 'challenging').length;
  const total = easy + hard;
  const ratio = total > 0 ? easy / total : 0.5;

  // Find standout feature to lead with
  const tight = aspects.filter(a => parseFloat(a.orbActual) < 2);
  const hasSunMoon = traditional.lunarContact;
  const hasVenusMars = traditional.venusMarsMutual;
  const heavySaturn = traditional.saturnContacts > 2;
  let ledWithDistinctive = false;

  if (tight.length > 0 && parseFloat(tight[0].orbActual) < 0.5) {
    const t = tight[0];
    parts.push(`This synastry is defined by a near-exact ${t.pA} ${t.aspect} ${t.pB} at just ${t.orbActual}°. Everything else in the comparison is secondary to this — it's the signature of your connection.`);
    ledWithDistinctive = true;
  } else if (hasSunMoon && hasVenusMars) {
    parts.push('This is a rare synastry: both the emotional foundation (Sun-Moon) and the physical chemistry (Venus-Mars) are active. Most relationships have one or the other — having both is the traditional marker of a bond that works on every level.');
    ledWithDistinctive = true;
  } else if (heavySaturn && !hasSunMoon) {
    parts.push('Saturn dominates this synastry without a Sun-Moon cushion. The bond feels serious — perhaps obligatory — but the emotional ease that makes commitment feel natural is something you\'ll need to build consciously.');
    ledWithDistinctive = true;
  }

  // Fall back to ratio-based opener if no distinctive lead
  if (!ledWithDistinctive) {
    if (ratio > 0.7) parts.push('This is a notably harmonious synastry — the charts flow together with natural ease.');
    else if (ratio > 0.55) parts.push('This synastry leans toward harmony, with enough creative tension to keep things dynamic.');
    else if (ratio > 0.4) parts.push('This synastry is evenly balanced between harmony and challenge — a relationship that demands growth from both people.');
    else parts.push('This is an intense synastry with strong friction — the kind that either forges something powerful or burns bright and fast.');
  }

  // Luminaries (skip if already led with Sun-Moon + Venus-Mars combo)
  if (hasSunMoon && !ledWithDistinctive) {
    if (traditional.lunarContactType && traditional.lunarContactType.includes('conjunction')) {
      parts.push('The Sun-Moon contact here is exceptionally tight — you feel an almost fated recognition, as if you\'ve known each other before.');
    } else {
      parts.push('A significant Sun-Moon link creates natural emotional understanding between you — the foundation most astrologers consider essential for lasting bonds.');
    }
  }

  // Venus-Mars (skip if already mentioned)
  if (hasVenusMars && !(ledWithDistinctive && hasSunMoon)) {
    parts.push('Venus and Mars are connected across your charts, generating the kind of magnetic physical chemistry that draws people together and keeps the spark alive.');
  }

  // Saturn (skip if already led with Saturn dominance)
  if (!ledWithDistinctive || !heavySaturn) {
    if (traditional.saturnContacts > 2) {
      parts.push('Multiple Saturn contacts give this bond a karmic, destined quality — serious commitment and hard-won lessons are woven into the fabric of your connection.');
    } else if (traditional.saturnContacts === 1) {
      parts.push('A single Saturn contact provides just enough gravity to anchor the relationship without weighing it down.');
    }
  }

  // Tight aspects (skip if already led with the tightest)
  if (tight.length > 0 && !(ledWithDistinctive && parseFloat(tight[0].orbActual) < 0.5)) {
    const t = tight[0];
    parts.push(`The tightest aspect is ${t.pA} ${t.aspect} ${t.pB} at just ${t.orbActual}° — this is felt strongly by both people and colors the entire relationship.`);
  }

  // Elements — only when distinctive (not 'mixed')
  const distinctiveElements = ['igniting','steamy tension','deeply emotional','grounding','intellectual'];
  if (traditional.elementBalance && distinctiveElements.includes(traditional.elementBalance)) {
    const elTone = {
      'igniting':'fire-on-fire energy that\'s exciting but needs careful handling',
      'steamy tension':'passionate emotional intensity that swings between heat and overwhelm',
      'deeply emotional':'profound mutual sensitivity — feelings run deep for both of you',
      'grounding':'shared practicality and material comfort — you build naturally together',
      'intellectual':'a feast of conversation and ideas — the mental connection is the engine'
    };
    if (elTone[traditional.elementBalance]) {
      parts.push(`Elementally, this pairing brings ${elTone[traditional.elementBalance]}.`);
    }
  }

  // Mutual reception mention if present
  if (traditional.receptions && traditional.receptions.filter(r => r.type === 'mutual').length > 0) {
    parts.push('A mutual reception between your charts creates a hidden exchange — a back-channel of cooperation that strengthens the bond beneath the surface.');
  }

  return parts.join(' ');
}

// ============================================================================
// SECTION 5: SYNASTRY BIWHEEL RENDERER
// ============================================================================

function renderSynastryWheel(natalA, housesA, natalB, housesB, synAspects, size = 400, nameA, nameB) {
  size = Math.min(size, 400);
  const cx = size / 2;
  const cy = size / 2;
  const ascDeg = natalA.Ascendant;
  function toXY(deg, r) { const a = (180 - (deg - ascDeg)) * DEG; return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }; }
  // Ring radii
  const rOuter = size / 2 - 4;
  const rZodInner = rOuter - 22;
  const rA = rZodInner - 4;
  const rB = rA - 28;
  const rInner = size * 0.12;
  const signNames = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="biwheel-svg" style="background:transparent">`;
  svg += `<defs><filter id="bw-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="var(--bg)" stroke="var(--gold-line)" stroke-width="1"/>`;

  // ── Zodiac band ──
  svg += `<circle cx="${cx}" cy="${cy}" r="${rZodInner}" fill="none" stroke="var(--gold-line)" stroke-width="0.5"/>`;
  for (let i = 0; i < 12; i++) {
    const deg0 = i * 30, deg1 = (i+1) * 30, mid = deg0 + 15;
    const p1 = toXY(deg0, rOuter), p2 = toXY(deg0, rZodInner);
    svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="var(--gold-line)" stroke-width="0.5"/>`;
    if (i % 2 === 0) {
      const a1=toXY(deg0,rOuter), b1=toXY(deg1,rOuter), b2=toXY(deg1,rZodInner), a2=toXY(deg0,rZodInner);
      svg += `<path d="M ${a1.x} ${a1.y} A ${rOuter} ${rOuter} 0 0 0 ${b1.x} ${b1.y} L ${b2.x} ${b2.y} A ${rZodInner} ${rZodInner} 0 0 1 ${a2.x} ${a2.y} Z" fill="rgba(212,168,67,.04)"/>`;
    }
    const mp = toXY(mid, (rOuter+rZodInner)/2), gsz = 10;
    svg += `<g transform="translate(${mp.x-gsz/2},${mp.y-gsz/2})">${sSVG(signNames[i], gsz, 'var(--gold)')}</g>`;
    for (let t=1;t<3;t++) { const td=deg0+t*10, t1=toXY(td,rOuter), t2=toXY(td,rOuter-3); svg += `<line x1="${t1.x}" y1="${t1.y}" x2="${t2.x}" y2="${t2.y}" stroke="var(--gold-line)" stroke-width="0.3" opacity="0.5"/>`; }
  }

  // ── House lines (A's) ──
  for (let i = 0; i < 12; i++) {
    const p1 = toXY(housesA[i], rZodInner), p2 = toXY(housesA[i], rInner);
    svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="var(--gold-line)" stroke-width="${i===0||i===9?1.2:0.4}" opacity="${i===0||i===9?0.8:0.3}"/>`;
  }

  // ── Ring circles ──
  svg += `<circle cx="${cx}" cy="${cy}" r="${rA}" fill="none" stroke="var(--gold-line)" stroke-width="0.3" opacity="0.4"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${rB}" fill="none" stroke="rgba(74,158,255,.3)" stroke-width="0.3"/>`;

  // ── Aspect lines (A at rA → B at rB) ──
  for (let asp of synAspects.slice(0, 20)) {
    const km = { asc:'Ascendant', mc:'MC' };
    const lonAv = natalA[asp.pA] !== undefined ? natalA[asp.pA] : natalA[km[asp.pA]];
    const lonBv = natalB[asp.pB] !== undefined ? natalB[asp.pB] : natalB[km[asp.pB]];
    if (lonAv === undefined || lonBv === undefined) continue;
    const pa = toXY(lonAv, rA), pb = toXY(lonBv, rB);
    const ac = asp.type === 'easy' ? 'var(--emerald)' : 'var(--crimson)';
    const orb = parseFloat(asp.orbActual);
    svg += `<line x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}" stroke="${ac}" stroke-width="${orb<2?1.2:0.8}" opacity="${orb<2?0.55:orb<4?0.35:0.2}"/>`;
  }

  // ── A's planets (outer - gold) ──
  const pList = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
  const psz = 16;
  for (let p of pList) { if (!(p in natalA)) continue; const pt=toXY(natalA[p],rA); svg += `<g transform="translate(${pt.x-psz/2},${pt.y-psz/2})">${pSVG(p,psz,'var(--gold)')}</g>`; }
  let pt = toXY(natalA.Ascendant, rA);
  svg += `<circle cx="${pt.x}" cy="${pt.y}" r="7" fill="none" stroke="var(--gold)" stroke-width="1"/><text x="${pt.x}" y="${pt.y+3}" font-size="7" fill="var(--gold)" text-anchor="middle" font-weight="700">AC</text>`;
  pt = toXY(natalA.MC, rA);
  svg += `<circle cx="${pt.x}" cy="${pt.y}" r="7" fill="none" stroke="var(--gold)" stroke-width="1"/><text x="${pt.x}" y="${pt.y+3}" font-size="7" fill="var(--gold)" text-anchor="middle" font-weight="700">MC</text>`;

  // ── B's planets (inner - azure) ──
  const bsz = 14;
  for (let p of pList) { if (!(p in natalB)) continue; const pt=toXY(natalB[p],rB); svg += `<g transform="translate(${pt.x-bsz/2},${pt.y-bsz/2})">${pSVG(p,bsz,'var(--azure)')}</g>`; }
  pt = toXY(natalB.Ascendant, rB);
  svg += `<circle cx="${pt.x}" cy="${pt.y}" r="6" fill="none" stroke="var(--azure)" stroke-width="0.8"/><text x="${pt.x}" y="${pt.y+2.5}" font-size="6" fill="var(--azure)" text-anchor="middle" font-weight="700">AC</text>`;
  pt = toXY(natalB.MC, rB);
  svg += `<circle cx="${pt.x}" cy="${pt.y}" r="6" fill="none" stroke="var(--azure)" stroke-width="0.8"/><text x="${pt.x}" y="${pt.y+2.5}" font-size="6" fill="var(--azure)" text-anchor="middle" font-weight="700">MC</text>`;

  // ── Center hub ──
  svg += `<circle cx="${cx}" cy="${cy}" r="${rInner}" fill="var(--bg)" stroke="var(--gold-line)" stroke-width="0.8"/>`;
  const nA = (nameA||'You').length>8?(nameA||'You').substring(0,7)+'.':nameA||'You';
  const nB = (nameB||'Partner').length>8?(nameB||'Partner').substring(0,7)+'.':nameB||'Partner';
  svg += `<text x="${cx}" y="${cy-5}" font-size="8" fill="var(--gold)" text-anchor="middle" font-weight="600">${nA}</text>`;
  svg += `<text x="${cx}" y="${cy+7}" font-size="8" fill="var(--azure)" text-anchor="middle" font-weight="600">${nB}</text>`;

  svg += `</svg>`;
  return svg;
}

// ============================================================================
// SECTION 6: SYNASTRY ASPECT GRID
// ============================================================================

function renderSynastryGrid(natalA, natalB, synAspects) {
  const planetsA = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  const planetsB = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  let html = `<div class="aspect-grid">`;

  // Header row
  html += `<div class="grid-header" style="border-right: 1px solid var(--hairline);"></div>`;
  for (let p of planetsA) {
    html += `<div class="grid-header">${pSVG(p, 14, 'var(--gold)')}</div>`;
  }

  // Data rows
  for (let pB of planetsB) {
    html += `<div class="grid-header" style="border-right: 1px solid var(--hairline);">${pSVG(pB, 14, 'var(--azure)')}</div>`;

    for (let pA of planetsA) {
      const asp = synAspects.find(a =>
        (a.pA === pA && a.pB === pB) ||
        (a.pA === pB && a.pB === pA)
      );

      html += `<div class="grid-cell" onclick="toggleSynInterpretation('${pA}','${pB}')">`;

      if (asp) {
        const aspColor = asp.type === 'easy' ? 'var(--emerald)' : 'var(--crimson)';
        html += aSVG(asp.aspect, 24, aspColor);
      }

      html += `</div>`;
    }
  }

  html += `</div>`;

  // Expanded interpretation panel
  html += `<div id="syn-interp-panel">`;
  if (synExpanded) {
    const [pA, pB] = synExpanded.split('-');
    const asp = synAspects.find(a =>
      (a.pA === pA && a.pB === pB) ||
      (a.pA === pB && a.pB === pA)
    );

    if (asp) {
      const interpKey = `${asp.pA}-${asp.pB}|${asp.aspect}`;
      const interp = getSynastryInterpretation(interpKey, asp);

      html += `<div class="aspect-interpretation">
        <div class="header" onclick="toggleSynInterpretation('${pA}','${pB}')">
          ${pSVG(asp.pA, 20, 'var(--gold)')}
          ${aSVG(asp.aspect, 16, asp.type === 'easy' ? 'var(--emerald)' : 'var(--crimson)')}
          ${pSVG(asp.pB, 20, 'var(--azure)')}
          <span class="title">${asp.pA} ${asp.aspect} ${asp.pB}</span>
          <span style="font-size:var(--fs-label);color:var(--text3);margin-left:auto">orb ${asp.orbActual}°</span>
        </div>
        <div class="detail">${interp.detail}</div>
        ${interp.counsel?'<div style="margin-top:10px;padding:10px;border-radius:var(--r-sm);background:rgba(61,217,160,.06);border-left:2px solid var(--emerald)"><div style="font-size:var(--fs-label);font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--emerald);margin-bottom:4px">Counsel</div><div style="font-size:var(--fs-body);line-height:1.6;color:var(--text)">'+interp.counsel+'</div></div>':''}
      </div>`;
    }
  }
  html += `</div>`; // close syn-interp-panel

  return html;
}

function renderSynInterpretationCard(key) {
  const [pA, pB] = key.split('-');
  const asp = synAspects.find(a =>
    (a.pA === pA && a.pB === pB) ||
    (a.pA === pB && a.pB === pA)
  );
  if (!asp) return '';
  const interpKey = `${asp.pA}-${asp.pB}|${asp.aspect}`;
  const interp = getSynastryInterpretation(interpKey, asp);
  let card=`<div class="aspect-interpretation">
    <div class="header" onclick="toggleSynInterpretation('${pA}','${pB}')">
      ${pSVG(asp.pA, 20, 'var(--gold)')}
      ${aSVG(asp.aspect, 16, asp.type === 'easy' ? 'var(--emerald)' : 'var(--crimson)')}
      ${pSVG(asp.pB, 20, 'var(--azure)')}
      <span class="title">${asp.pA} ${asp.aspect} ${asp.pB}</span>
      <span style="font-size:var(--fs-label);color:var(--text3);margin-left:auto">orb ${asp.orbActual}°</span>
    </div>
    <div class="detail">${interp.detail}</div>`;
  if(interp.counsel){
    card+=`<div style="margin-top:10px;padding:10px;border-radius:var(--r-sm);background:rgba(61,217,160,.06);border-left:2px solid var(--emerald)">`;
    card+=`<div style="font-size:var(--fs-label);font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--emerald);margin-bottom:4px">Counsel</div>`;
    card+=`<div style="font-size:var(--fs-body);line-height:1.6;color:var(--text)">${interp.counsel}</div>`;
    card+=`</div>`;
  }
  card+=`</div>`;
  return card;
}

function toggleSynInterpretation(pA, pB) {
  const key = pA + '-' + pB;
  if (synExpanded === key) { synExpanded = null; }
  else { synExpanded = key; }
  const container = document.getElementById('syn-interp-panel');
  if (container) {
    container.innerHTML = synExpanded ? renderSynInterpretationCard(synExpanded) : '';
  } else {
    renderApp();
  }
}

// ============================================================================
// SECTION 7: ASTROCARTOGRAPHY COMPUTATION
// ============================================================================

function computeAstroCartoLines(birthJD, natalPositions) {
  const T = jdToT(birthJD);
  const GAST = getGAST(T);

  const lines = {};
  const planets = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];

  for (let planet of planets) {
    if (!(planet in natalPositions)) continue;

    const ecLon = natalPositions[planet];
    const ra = eclToRA(ecLon);
    const dec = eclToDec(ecLon);

    // MC: planet on upper meridian when LST = RA => geo_lon = RA - GAST
    const mcLon = ((ra - GAST) % 360 + 360) % 360;

    lines[planet] = {
      mc: mcLon,
      ic: (mcLon + 180) % 360,
      asc: computeASCLine(ra, dec, GAST),
      dsc: computeDSCLine(ra, dec, GAST)
    };
  }

  return lines;
}

function eclToRA(lon) {
  const D = Math.PI / 180;
  const OBLIQ = 23.4392911 * D;
  const ra = Math.atan2(Math.sin(lon * D) * Math.cos(OBLIQ), Math.cos(lon * D)) * (180 / Math.PI);
  return ((ra % 360) + 360) % 360;
}

function eclToDec(lon) {
  const D = Math.PI / 180;
  const OBLIQ = 23.4392911 * D;
  return Math.asin(Math.sin(lon * D) * Math.sin(OBLIQ)) * (180 / Math.PI);
}

function computeASCLine(ra, dec, GAST) {
  const D = Math.PI / 180;
  const points = [];
  for (let lat = -65; lat <= 65; lat += 1) {
    const cosH = -Math.tan(lat * D) * Math.tan(dec * D);
    if (cosH < -1 || cosH > 1) continue;
    const H = Math.acos(cosH) * (180 / Math.PI);
    const LST = ((ra - H) % 360 + 360) % 360;
    const geoLon = ((LST - GAST) % 360 + 360) % 360;
    points.push({ lat, lon: geoLon });
  }
  return points;
}

function computeDSCLine(ra, dec, GAST) {
  const D = Math.PI / 180;
  const points = [];
  for (let lat = -65; lat <= 65; lat += 1) {
    const cosH = -Math.tan(lat * D) * Math.tan(dec * D);
    if (cosH < -1 || cosH > 1) continue;
    const H = Math.acos(cosH) * (180 / Math.PI);
    const LST = ((ra + H) % 360 + 360) % 360;
    const geoLon = ((LST - GAST) % 360 + 360) % 360;
    points.push({ lat, lon: geoLon });
  }
  return points;
}

function getGAST(T) {
  const D = 2451545.0 + T * 36525 - 2451545;
  const gmst = (18.697374558 + 24.06570982441908 * D) % 24;
  return ((gmst * 15) % 360 + 360) % 360;
}

// ============================================================================
// SECTION 8: WORLD MAP SVG + RENDERING
// ============================================================================

// World continent outlines in viewBox coords (x = lon+180 [0..360], y = 90-lat [0..180])
// Pre-converted so we don't need a transform on the <g>
const WORLD_PATHS = [
  // Africa
  "M 174,55 L 176,54 L 180,44 L 180,41 L 183,40 L 185,42 L 190,40 L 193,41 L 195,43 L 198,44 L 200,47 L 203,49 L 206,51 L 210,54 L 215,56 L 218,59 L 220,62 L 220,67 L 218,70 L 216,74 L 214,78 L 212,82 L 210,87 L 208,91 L 209,95 L 211,100 L 213,104 L 215,110 L 214,114 L 212,118 L 210,122 L 208,124 L 206,123 L 198,121 L 195,118 L 192,115 L 190,110 L 188,105 L 186,100 L 185,95 L 183,91 L 180,87 L 178,82 L 176,78 L 174,73 L 172,68 L 170,63 L 168,59 L 170,57 Z",
  // Europe
  "M 170,57 L 174,55 L 176,54 L 180,44 L 180,41 L 178,39 L 176,38 L 172,38 L 170,36 L 173,34 L 176,33 L 180,32 L 185,31 L 190,31 L 195,32 L 200,33 L 203,35 L 205,37 L 208,38 L 210,36 L 211,34 L 209,32 L 207,30 L 205,28 L 203,25 L 200,22 L 195,20 L 190,18 L 186,17 L 182,18 L 178,20 L 176,23 L 172,25 L 168,26 L 165,28 L 162,30 L 160,33 L 158,36 L 160,38 L 162,40 L 162,42 L 160,43 L 158,42 L 156,40 L 155,42 L 157,45 L 160,46 L 162,48 L 165,49 L 168,51 L 170,54 Z",
  // UK + Ireland
  "M 174,28 L 176,26 L 178,25 L 179,27 L 178,29 L 176,30 L 174,30 Z M 170,27 L 172,26 L 173,28 L 172,30 L 170,29 Z",
  // Iceland
  "M 156,24 L 158,22 L 162,22 L 163,24 L 160,25 L 157,25 Z",
  // Scandinavia
  "M 185,17 L 188,14 L 192,12 L 196,10 L 198,12 L 200,16 L 202,20 L 200,24 L 198,26 L 195,28 L 192,27 L 190,25 L 188,22 L 186,19 Z",
  // Asia (main mass)
  "M 205,37 L 210,36 L 215,34 L 220,33 L 225,32 L 230,30 L 235,28 L 240,27 L 248,29 L 252,28 L 255,30 L 258,32 L 262,34 L 265,36 L 268,38 L 272,40 L 276,42 L 280,44 L 284,46 L 288,48 L 290,50 L 292,52 L 295,53 L 298,50 L 300,48 L 302,46 L 305,45 L 310,44 L 315,46 L 318,48 L 320,50 L 318,53 L 315,55 L 312,57 L 310,59 L 308,62 L 305,64 L 302,66 L 300,68 L 297,70 L 294,68 L 290,67 L 286,66 L 283,65 L 280,66 L 278,68 L 275,70 L 272,72 L 270,74 L 268,76 L 265,78 L 262,80 L 258,82 L 256,80 L 254,78 L 252,75 L 250,72 L 248,70 L 246,68 L 243,65 L 240,62 L 238,60 L 235,58 L 232,55 L 230,52 L 228,50 L 225,48 L 222,46 L 220,44 L 218,42 L 215,40 L 210,38 Z",
  // India
  "M 248,70 L 252,72 L 255,75 L 258,78 L 260,82 L 262,85 L 261,88 L 258,90 L 255,88 L 252,85 L 250,82 L 248,78 L 247,75 L 246,72 Z",
  // Arabian Peninsula
  "M 220,62 L 225,60 L 228,62 L 230,65 L 232,68 L 230,70 L 228,72 L 225,73 L 222,72 L 220,70 L 218,67 L 218,64 Z",
  // Southeast Asia / Indonesia
  "M 280,82 L 283,80 L 286,82 L 290,83 L 293,82 L 296,83 L 300,85 L 303,84 L 306,85 L 310,84 L 312,86 L 308,88 L 304,87 L 300,88 L 296,87 L 292,86 L 288,85 L 284,84 Z",
  // Japan
  "M 310,44 L 312,42 L 315,40 L 317,38 L 319,36 L 320,38 L 318,41 L 316,44 L 313,46 Z",
  // North America
  "M 10,25 L 15,22 L 20,20 L 25,18 L 30,16 L 40,14 L 50,12 L 55,13 L 60,16 L 65,18 L 70,20 L 75,22 L 80,25 L 85,28 L 88,30 L 90,33 L 92,36 L 95,38 L 98,40 L 100,42 L 102,44 L 104,46 L 105,48 L 108,50 L 110,52 L 112,55 L 114,58 L 116,60 L 118,63 L 120,65 L 122,67 L 120,68 L 118,66 L 114,64 L 110,62 L 106,60 L 102,58 L 98,56 L 95,55 L 92,56 L 90,58 L 88,60 L 86,62 L 84,64 L 82,66 L 80,64 L 78,62 L 75,60 L 72,58 L 68,56 L 65,55 L 62,56 L 60,58 L 58,60 L 55,58 L 52,56 L 50,54 L 48,52 L 46,50 L 44,48 L 42,46 L 40,44 L 38,42 L 36,40 L 33,38 L 30,36 L 27,34 L 24,32 L 20,30 L 16,28 L 12,27 Z",
  // Central America
  "M 82,66 L 85,68 L 88,70 L 90,72 L 92,74 L 95,76 L 97,78 L 98,80 L 100,81 L 98,82 L 96,80 L 94,78 L 92,76 L 90,75 L 88,73 L 86,71 L 84,69 L 82,68 Z",
  // South America
  "M 100,81 L 102,82 L 105,80 L 108,78 L 110,80 L 112,82 L 115,83 L 118,84 L 120,86 L 122,88 L 125,90 L 128,92 L 130,95 L 132,98 L 135,102 L 136,106 L 135,110 L 133,114 L 131,118 L 128,122 L 126,126 L 124,130 L 122,134 L 120,137 L 118,140 L 115,142 L 112,143 L 110,140 L 108,136 L 106,132 L 105,128 L 104,124 L 103,120 L 102,116 L 100,112 L 98,108 L 96,104 L 95,100 L 94,96 L 95,92 L 96,88 L 98,85 Z",
  // Australia
  "M 295,115 L 300,113 L 305,112 L 310,112 L 315,113 L 320,115 L 325,118 L 330,120 L 332,123 L 333,127 L 330,130 L 326,132 L 322,133 L 318,132 L 314,130 L 310,128 L 306,126 L 302,124 L 298,122 L 296,120 L 295,118 Z",
  // New Zealand
  "M 350,132 L 352,130 L 354,132 L 353,135 L 351,136 L 349,135 Z M 352,136 L 354,135 L 356,137 L 355,140 L 353,140 L 352,138 Z",
  // Greenland
  "M 125,20 L 130,18 L 135,16 L 140,14 L 145,12 L 150,10 L 155,12 L 158,15 L 155,18 L 150,20 L 145,22 L 140,22 L 135,21 L 130,20 Z",
  // Madagascar
  "M 225,105 L 227,103 L 229,105 L 229,109 L 228,112 L 226,113 L 224,111 L 224,108 Z"
];

const AC_COLORS = {
  Sun:'#d4a843', Moon:'#e8e0d0', Mercury:'#9089ab', Venus:'#3dd9a0', Mars:'#e0425d',
  Jupiter:'#9b6dff', Saturn:'#5a5478', Uranus:'#4a9eff', Neptune:'#9370db', Pluto:'#dc143c',
  Chiron:'#d0cae0', NorthNode:'#d4a843'
};

const CITIES = [
  { name: 'London', lat: 51.5, lon: -0.1 },
  { name: 'New York', lat: 40.7, lon: -74.0 },
  { name: 'Tokyo', lat: 35.7, lon: 139.7 },
  { name: 'Sydney', lat: -33.9, lon: 151.2 },
  { name: 'São Paulo', lat: -23.5, lon: -46.6 },
  { name: 'Cairo', lat: 30.0, lon: 31.2 },
  { name: 'Mumbai', lat: 19.1, lon: 72.9 },
  { name: 'Paris', lat: 48.9, lon: 2.3 },
  { name: 'Berlin', lat: 52.5, lon: 13.4 },
  { name: 'Moscow', lat: 55.8, lon: 37.6 },
  { name: 'Dubai', lat: 25.2, lon: 55.3 },
  { name: 'Singapore', lat: 1.3, lon: 103.8 },
  { name: 'LA', lat: 34.1, lon: -118.2 },
  { name: 'Mexico City', lat: 19.4, lon: -99.1 },
  { name: 'Lagos', lat: 6.5, lon: 3.4 },
  { name: 'Bangkok', lat: 13.8, lon: 100.5 },
  { name: 'Istanbul', lat: 41.0, lon: 29.0 },
  { name: 'Buenos Aires', lat: -34.6, lon: -58.4 },
  { name: 'Nairobi', lat: -1.3, lon: 36.8 },
  { name: 'Rome', lat: 41.9, lon: 12.5 }
];

function renderAstroCartoMap(lines, toggles, tapInfo, width = 400, height = 250, viewBox = '0 0 360 180') {
  let svg = `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">`;

  // Defs — glow filter and ocean gradient
  svg += `<defs>
    <filter id="ac-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="ocean-rg" cx="50%" cy="40%"><stop offset="0%" stop-color="#101845"/><stop offset="100%" stop-color="#070b28"/></radialGradient>
  </defs>`;

  // Ocean
  svg += `<rect width="360" height="180" fill="url(#ocean-rg)"/>`;

  // Graticule
  for (let lon = 0; lon < 360; lon += 30) svg += `<line x1="${lon}" y1="0" x2="${lon}" y2="180" stroke="rgba(255,255,255,.06)" stroke-width="0.3"/>`;
  for (let lat = -60; lat <= 60; lat += 30) svg += `<line x1="0" y1="${90-lat}" x2="360" y2="${90-lat}" stroke="rgba(255,255,255,.06)" stroke-width="0.3"/>`;
  // Tropics and equator
  svg += `<line x1="0" y1="${90-23.44}" x2="360" y2="${90-23.44}" stroke="rgba(212,168,67,.15)" stroke-width="0.3" stroke-dasharray="2,3"/>`;
  svg += `<line x1="0" y1="${90+23.44}" x2="360" y2="${90+23.44}" stroke="rgba(212,168,67,.15)" stroke-width="0.3" stroke-dasharray="2,3"/>`;
  svg += `<line x1="0" y1="90" x2="360" y2="90" stroke="rgba(212,168,67,.2)" stroke-width="0.4"/>`;

  // Continents — clearly visible against ocean
  for (const p of WORLD_PATHS) {
    svg += `<path d="${p}" fill="rgba(30,40,75,.9)" stroke="rgba(120,140,200,.4)" stroke-width="0.5" stroke-linejoin="round"/>`;
  }

  // City reference dots
  for (const city of CITIES) {
    const cx = ((city.lon + 180) % 360 + 360) % 360;
    const cy = 90 - city.lat;
    svg += `<circle cx="${cx}" cy="${cy}" r="0.8" fill="rgba(255,255,255,.4)"/>`;
    svg += `<text x="${cx + 2}" y="${cy + 1}" font-size="3.5" fill="rgba(255,255,255,.35)" font-family="system-ui">${city.name}</text>`;
  }

  // Planet lines
  const toMapX = (geoLon) => ((geoLon + 180) % 360 + 360) % 360;
  const activePlanets = Object.keys(toggles).filter(p => toggles[p]);

  const drawSegments = (pts, color, w, op, dash) => {
    if (!pts || pts.length < 2) return '';
    const mapped = pts.map(p => ({ lat: p.lat, lon: toMapX(p.lon) }));
    let out = '', segs = [[mapped[0]]];
    for (let i = 1; i < mapped.length; i++) {
      if (Math.abs(mapped[i].lon - mapped[i-1].lon) > 180) segs.push([]);
      segs[segs.length-1].push(mapped[i]);
    }
    for (const seg of segs) {
      if (seg.length < 2) continue;
      let d = `M ${seg[0].lon.toFixed(1)} ${(90 - seg[0].lat).toFixed(1)}`;
      for (let i = 1; i < seg.length; i++) d += ` L ${seg[i].lon.toFixed(1)} ${(90 - seg[i].lat).toFixed(1)}`;
      out += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" opacity="${op}"${dash?' stroke-dasharray="'+dash+'"':''} filter="url(#ac-glow)"/>`;
    }
    return out;
  };

  if (lines) {
    for (let planet of activePlanets) {
      if (!(planet in lines)) continue;
      const pl = lines[planet];
      const c = AC_COLORS[planet] || '#9089ab';

      // MC line (solid vertical)
      svg += `<line x1="${toMapX(pl.mc)}" y1="5" x2="${toMapX(pl.mc)}" y2="175" stroke="${c}" stroke-width="1.5" opacity="0.75" filter="url(#ac-glow)"/>`;
      // IC line (dashed vertical)
      svg += `<line x1="${toMapX(pl.ic)}" y1="5" x2="${toMapX(pl.ic)}" y2="175" stroke="${c}" stroke-width="1.2" opacity="0.45" stroke-dasharray="4,3"/>`;
      // ASC curve
      svg += drawSegments(pl.asc, c, 1.3, 0.65, '');
      // DSC curve
      svg += drawSegments(pl.dsc, c, 1.0, 0.4, '3,2');

      // Tiny planet icon at MC top
      svg += `<g transform="translate(${toMapX(pl.mc)}, 4)" opacity="0.8">${pSVG(planet, 7, c)}</g>`;
    }
  }

  // Line crossing diamond markers
  if (lines) {
    const xings = computeLineCrossings(lines, toggles);
    for (const xing of xings) {
      const cx = xing.lon, cy = 90 - xing.lat;
      svg += `<polygon points="${cx},${cy-3} ${cx+2},${cy} ${cx},${cy+3} ${cx-2},${cy}" class="ac-crossing-marker" opacity="0.85"/>`;
    }
  }

  // Birth location marker
  if (lines && lines._birthLoc) {
    const bx = ((lines._birthLoc.lon % 360) + 360 + 180) % 360;
    const by = 90 - lines._birthLoc.lat;
    svg += `<circle cx="${bx}" cy="${by}" r="2" fill="#d4a843"/>`;
    svg += `<circle cx="${bx}" cy="${by}" r="5" fill="none" stroke="#d4a843" stroke-width="0.6" opacity="0.5">`;
    svg += `<animate attributeName="r" from="4" to="8" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite"/>`;
    svg += `</circle>`;
  }

  // Tap pin
  if (tapInfo) {
    const px = tapInfo.lon, py = 90 - tapInfo.lat;
    svg += `<circle cx="${px}" cy="${py}" r="3.5" class="map-pin" filter="url(#ac-glow)"/>`;
    svg += `<line x1="${px}" y1="${py-5}" x2="${px}" y2="${py-10}" stroke="#d4a843" stroke-width="0.8" opacity="0.6"/>`;
  }

  svg += `</svg>`;
  return svg;
}

// ============================================================================
// SECTION 9: ASTROCARTOGRAPHY VOICE
// ============================================================================

// ============================================================================
// SECTION 10: SYNASTRY VOICE (INTERPRETATION DATABASE)
// ============================================================================

function getSynastryInterpretation(key, aspect) {
  // Try exact key
  if (SYNASTRY_VOICE[key]) return SYNASTRY_VOICE[key];

  // Try reversed planets
  const [pA, pB] = key.split('|')[0].split('-');
  const revKey = `${pB}-${pA}|${aspect.aspect}`;
  if (SYNASTRY_VOICE[revKey]) return SYNASTRY_VOICE[revKey];

  // Better fallback: compose from existing voice databases
  const tvA = TRANSIT_VOICE[aspect.pA] || {};
  const tvB = TRANSIT_VOICE[aspect.pB] || {};
  const av = ASPECT_VOICE[aspect.aspect] || {};

  const feel = av.feel ? `${av.feel} — ${(tvA.theme || aspect.pA).toLowerCase()} meets ${(tvB.theme || aspect.pB).toLowerCase()}.` : `A ${aspect.aspect} between these planets.`;
  const detail = `${aspect.pA} (${tvA.theme || 'one energy'}) meets ${aspect.pB} (${tvB.theme || 'another energy'}) through a ${aspect.aspect}. ${av.desc || ''} In synastry, this means one person's ${(tvA.theme || '').toLowerCase()} activates the other's ${(tvB.theme || '').toLowerCase()}, creating ${aspect.type === 'easy' ? 'natural flow and mutual support' : 'friction that demands conscious work from both people'}.`;

  return { feel, detail };
}

// ============================================================================
// SECTION 11: TAB CONTENT RENDERING
// ============================================================================

function renderSynastryTab() {
  loadCharts();

  let h = '';

  // Header + explainer (always shown)
  h += `<div style="padding:14px 16px 8px">`;
  h += `<div class="section-title" style="margin-top:0">Synastry</div>`;
  h += `<div style="font-size:var(--fs-body);line-height:1.55;color:var(--text2);margin-bottom:10px">Compare your birth chart with another person to see how your planets interact. Synastry reveals the natural chemistry, tensions, and themes between two people.</div>`;
  h += `</div>`;

  if (savedCharts.length <= 1) {
    h += `<div style="padding:20px 16px 30px;text-align:center">
      <svg width="120" height="80" viewBox="0 0 120 80" style="margin-bottom:14px;opacity:.7">
        <circle cx="45" cy="40" r="28" fill="none" stroke="var(--gold)" stroke-width="1.5" opacity=".5"/>
        <circle cx="75" cy="40" r="28" fill="none" stroke="var(--azure)" stroke-width="1.5" opacity=".5"/>
        <path d="M60,18 A28,28 0 0,1 60,62 A28,28 0 0,1 60,18Z" fill="rgba(212,168,67,.08)"/>
        <circle cx="45" cy="40" r="2" fill="var(--gold)" opacity=".6"/>
        <circle cx="75" cy="40" r="2" fill="var(--azure)" opacity=".6"/>
      </svg>
      <p style="color:var(--text2);font-size:var(--fs-body);line-height:1.5;margin-bottom:16px;max-width:280px;margin-left:auto;margin-right:auto">Add someone to compare charts with. You will need their birth date, approximate birth time, and birth city.</p>
      <button class="add-chart-btn" onclick="showChartForm=true; editingChartId=null; renderApp();">Add Person</button>
    </div>`;
    return h;
  }

  h += `<div class="synastry-container">`;

  // Chart selector row
  h += `<div style="margin-bottom:16px">`;
  h += `<label style="color:var(--text3);font-size:var(--fs-label);letter-spacing:.5px;display:block;margin-bottom:5px">Compare your chart with:</label>`;
  h += `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">`;
  h += `<select style="flex:1;min-width:140px;padding:8px 10px;background:var(--card);color:var(--text);border:1px solid var(--gold-line);border-radius:var(--r-md);font-size:var(--fs-body)" onchange="selectedChartId=this.value;synAspects=[];synExpanded=null;renderApp();">`;
  h += `<option value="">-- Select --</option>`;
  for (let chart of savedCharts) {
    if (chart.id === 'alexander') continue;
    h += `<option value="${chart.id}" ${selectedChartId===chart.id?'selected':''}>${chart.name}</option>`;
  }
  h += `</select>`;
  h += `<button class="add-chart-btn" onclick="showChartForm=true;editingChartId=null;renderApp();">+ Add</button>`;
  if (selectedChartId) {
    h += `<button class="edit-chart-btn" style="background:var(--surface);color:var(--text2);border:1px solid var(--gold-line)" onclick="editingChartId='${selectedChartId}';showChartForm=true;renderApp();">Edit</button>`;
    h += `<button class="delete-chart-btn" onclick="if(confirm('Remove this person?')){deleteChart('${selectedChartId}');selectedChartId=null;renderApp();}">Remove</button>`;
  }
  h += `</div></div>`;

  if (selectedChartId) {
    const chartA = savedCharts.find(c => c.id === 'alexander');
    const chartB = savedCharts.find(c => c.id === selectedChartId);

    if (chartA && chartB) {
      const { natal: natalA, jd: jdA } = getChartNatal(chartA);
      const { natal: natalB, jd: jdB } = getChartNatal(chartB);

      const housesA = computeWholeSignHouses(natalA.Ascendant);
      const housesB = computeWholeSignHouses(natalB.Ascendant);

      synAspects = computeSynastryAspects(natalA, natalB);
      const traditional = computeSynastryTraditional(natalA, housesA, natalB, housesB, jdA, jdB, synAspects);

      // ── Claude Synastry Synthesis ──
      {
        h += `<div class="synth-card" style="margin-bottom:12px">`;
        h += `<div class="synth-head" onclick="synSynthExpanded=!synSynthExpanded;renderApp()" style="cursor:pointer">`;
        h += `<span class="synth-title" style="color:var(--violet)">Claude Reading</span>`;
        h += `<span class="section-chev ${synSynthExpanded?'open':''}" style="color:var(--text3)">&#9654;</span>`;
        h += `</div>`;
        if(!synSynthExpanded){
          const sub=synthKey
            ?(synSynthResult&&synSynthResult.text?'Last reading saved. Tap to open.':'Ready. Tap to generate a deep synastry reading.')
            :'Add an API key to enable Claude readings.';
          h += `<div class="synth-sub" style="margin-top:6px">${sub}</div>`;
        }
        if(synSynthExpanded){
          if(!synthKey){
            h += renderInlineKeySetup();
          } else {
            h += `<div class="synth-row" style="margin-top:8px">`;
            h += `<button class="synth-btn ${synSynthLoading?'loading':''}" onclick="synSynthGenerate()" ${synSynthLoading?'disabled':''}>${synSynthLoading?'<span class="synth-spinner"></span>Reading the charts':(synSynthResult&&synSynthResult.text?'Generate new reading':'Generate Deep Reading')}</button>`;
            h += `</div>`;
            if(synSynthError)h += `<div class="synth-error">${synSynthError.replace(/</g,'&lt;')}</div>`;
            if(synSynthResult&&synSynthResult.text){
              const when=synSynthResult.ts?new Date(synSynthResult.ts).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';
              h += `<div class="synth-output" style="margin-top:10px">`;
              h += `<div class="synth-output-header"><span class="synth-output-stamp">${when?'Reading · '+when:'Reading'}</span></div>`;
              h += synthRenderBlocks(synSynthResult.text);
              const u=synSynthResult.usage||{};
              h += `<div class="synth-output-meta">${CLAUDE_MODEL}${u.input_tokens?' · '+u.input_tokens+' in / '+u.output_tokens+' out':''}</div>`;
              h += `</div>`;
            }
          }
        }
        h += `</div>`;
      }

      // Narrative (guidance-style gradient card) — fallback when no Claude reading
      const narrative = generateSynastryNarrative(synAspects, traditional);
      if(!synSynthResult||!synSynthResult.text){
        h += `<div class="synastry-narrative syn-section">${narrative}</div>`;
      }

      // ── Relationship Weather: This Week Between You ──
      {
        const weatherItems=computeRelationshipWeather(natalA,natalB,chartB.name);
        if(weatherItems.length>0){
          h += `<div class="card syn-section" style="border-left:3px solid var(--azure)">`;
          h += `<div style="font-size:var(--fs-label);color:var(--azure);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:8px;font-weight:700">This Week Between You</div>`;
          for(const w of weatherItems){
            h += `<div style="margin-bottom:10px;font-size:var(--fs-body);line-height:1.6;color:var(--text)">`;
            h += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">${pSVG(w.transit,14,'var(--bright)')} ${aSVG(w.aspect,12,w.type==='hard'?'var(--crimson)':'var(--emerald)')} ${pSVG(w.natal,14,'var(--azure)')}`;
            h += `<span style="font-weight:600">${w.transit} ${w.aspect} ${chartB.name}'s ${w.natal}</span>`;
            h += `<span style="font-size:var(--fs-label);color:var(--text3);margin-left:auto">${w.orb}°</span></div>`;
            h += `<div style="color:var(--text2)">${w.meaning}</div>`;
            h += `</div>`;
          }
          h += `</div>`;
        }
      }

      // ── Aspect Balance ──
      const easyCount = synAspects.filter(a => a.type === 'easy').length;
      const hardCount = synAspects.filter(a => a.type === 'challenging').length;
      const totalAsp = easyCount + hardCount;
      const harmonyPct = totalAsp > 0 ? Math.round((easyCount / totalAsp) * 100) : 50;
      h += `<div class="card syn-section">`;
      h += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">`;
      h += `<span style="font-size:var(--fs-body);font-weight:600;color:var(--text)">Aspect Balance</span>`;
      h += `<span style="font-size:var(--fs-label);color:var(--text3)">${totalAsp} aspects found</span>`;
      h += `</div>`;
      h += `<div class="syn-balance-bar">`;
      h += `<div class="syn-balance-fill" style="width:${harmonyPct}%;background:var(--emerald)"></div>`;
      h += `<div class="syn-balance-fill" style="width:${100-harmonyPct}%;background:var(--crimson)"></div>`;
      h += `</div>`;
      h += `<div style="display:flex;justify-content:space-between;margin-top:6px;font-size:var(--fs-label)">`;
      h += `<span style="color:var(--emerald)">${easyCount} harmonious (${harmonyPct}%)</span>`;
      h += `<span style="color:var(--crimson)">${hardCount} challenging (${100-harmonyPct}%)</span>`;
      h += `</div>`;
      h += `</div>`;

      // ── Sign Comparison ──
      const signName = (lon) => { const signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']; return signs[Math.floor(lon/30)%12]; };
      const signDeg = (lon) => Math.floor(lon % 30);
      h += `<div class="card syn-section">`;
      h += `<div class="section-title" style="margin:0 0 10px">Sign Comparison</div>`;
      h += `<div class="syn-sign-grid">`;
      h += `<div class="sgrid-label"></div><div class="sgrid-a">${chartA.name}</div><div class="sgrid-b">${chartB.name}</div>`;
      // Planet rows
      const compPlanets = [
        ['Sun','var(--gold)'],['Moon','var(--pearl)'],['Venus','var(--emerald)'],['Mars','var(--crimson)']
      ];
      for (const [p,c] of compPlanets) {
        h += `<div class="sgrid-planet">${pSVG(p,14,c)} <span style="color:var(--text2)">${p}</span></div>`;
        h += `<div class="sgrid-val">${signName(natalA[p])} ${signDeg(natalA[p])}°</div>`;
        h += `<div class="sgrid-val">${signName(natalB[p])} ${signDeg(natalB[p])}°</div>`;
      }
      h += `<div class="sgrid-planet"><span style="color:var(--text2);font-weight:600;font-size:var(--fs-label)">AC</span></div>`;
      h += `<div class="sgrid-val">${signName(natalA.Ascendant)} ${signDeg(natalA.Ascendant)}°</div>`;
      h += `<div class="sgrid-val">${signName(natalB.Ascendant)} ${signDeg(natalB.Ascendant)}°</div>`;
      h += `</div>`;
      // Composite Moon
      const compMoonLon = shortArcMidpoint(natalA.Moon, natalB.Moon);
      const compMoonSign = signName(compMoonLon);
      h += `<div class="composite-moon">`;
      h += `<div style="font-size:var(--fs-label);color:var(--text3);letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px">Composite Moon</div>`;
      h += `<div style="display:flex;align-items:center;gap:6px">${pSVG('Moon',18,'var(--violet)')} <span style="font-size:var(--fs-sub);color:var(--bright);font-weight:600">${compMoonSign}</span></div>`;
      const compMoonDescs = {Aries:'The relationship itself feels direct, impulsive, and action-oriented. You activate each other.',Taurus:'The bond craves stability, sensory comfort, and quiet presence. Slow to start but deeply loyal.',Gemini:'Communication is the lifeblood. You talk, text, and think together constantly.',Cancer:'Emotionally protective and nurturing. Home and family become central themes.',Leo:'Warm, generous, and expressive. You bring out each other\'s confidence and playfulness.',Virgo:'Practical devotion. You show love through acts of service and thoughtful attention to detail.',Libra:'Harmony-seeking and aesthetically attuned. Partnership balance matters deeply to you both.',Scorpio:'Intensely bonded. The relationship demands depth, honesty, and emotional courage.',Sagittarius:'Adventurous and philosophical. You grow through travel, learning, and shared beliefs.',Capricorn:'Serious and goal-oriented. The bond builds something lasting and respects commitment.',Aquarius:'Friendship-based and freedom-loving. You give each other space to be individuals.',Pisces:'Deeply intuitive and compassionate. Boundaries blur in the best and most challenging ways.'};
      h += `<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.55;margin-top:4px">${compMoonDescs[compMoonSign] || ''}</div>`;
      h += `</div>`;
      h += `</div>`;

      // ── Dominant Theme ──
      const tightAspects = synAspects.filter(a => parseFloat(a.orbActual) < 3);
      if (tightAspects.length > 0) {
        const topAsp = tightAspects[0];
        const topInterp = getSynastryInterpretation(`${topAsp.pA}-${topAsp.pB}|${topAsp.aspect}`, topAsp);
        h += `<div class="card syn-section" style="border-left:3px solid var(--gold)">`;
        h += `<div style="font-size:var(--fs-label);color:var(--text3);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:8px">Dominant Theme</div>`;
        h += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">`;
        h += pSVG(topAsp.pA, 22, 'var(--gold)');
        h += aSVG(topAsp.aspect, 16, topAsp.type === 'easy' ? 'var(--emerald)' : 'var(--crimson)');
        h += pSVG(topAsp.pB, 22, 'var(--azure)');
        h += `<span style="font-size:var(--fs-card);font-weight:600;color:var(--bright)">${topAsp.pA} ${topAsp.aspect} ${topAsp.pB}</span>`;
        h += `<span style="font-size:var(--fs-label);color:var(--text3);margin-left:auto">orb ${topAsp.orbActual}°</span>`;
        h += `</div>`;
        h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">${topInterp.detail}</div>`;
        h += `</div>`;
      }

      // ── Full Aspect List (collapsible) ──
      h += `<div class="card syn-section">`;
      h += `<div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="synListOpen=!synListOpen;renderApp();">`;
      h += `<span style="font-size:var(--fs-body);font-weight:600;color:var(--gold)">All Aspects (${synAspects.length})</span>`;
      h += `<span class="section-chev${typeof synListOpen!=='undefined'&&synListOpen?' open':''}" style="color:var(--text3);font-size:var(--fs-sub)">&#9656;</span>`;
      h += `</div>`;
      if (typeof synListOpen !== 'undefined' && synListOpen) {
        const sortedAsp = [...synAspects].sort((a,b) => parseFloat(a.orbActual) - parseFloat(b.orbActual));
        for (const asp of sortedAsp) {
          const aspColor = asp.type === 'easy' ? 'var(--emerald)' : 'var(--crimson)';
          const orbVal = parseFloat(asp.orbActual);
          const aspOpacity = orbVal < 2 ? '1' : orbVal < 4 ? '.85' : '.6';
          const aspWeight = orbVal < 2 ? '600' : '400';
          h += `<div class="syn-asp-item" style="opacity:${aspOpacity}" onclick="synExpanded='${asp.pA}-${asp.pB}';renderApp();">`;
          h += pSVG(asp.pA, 14, 'var(--gold)');
          h += aSVG(asp.aspect, 12, aspColor);
          h += pSVG(asp.pB, 14, 'var(--azure)');
          h += `<span style="font-size:var(--fs-body);color:var(--text);font-weight:${aspWeight}">${asp.pA} ${asp.aspect} ${asp.pB}</span>`;
          h += `<span style="font-size:var(--fs-label);color:var(--text3);margin-left:auto">${asp.orbActual}°</span>`;
          h += `</div>`;
        }
      }
      h += `</div>`;

      // Traditional indicators with explanations
      h += `<div class="traditional-indicators syn-section">`;
      h += `<div class="section-title" style="margin:0 0 4px">Compatibility Markers</div>`;
      h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:12px;line-height:1.5">Classical astrology uses these tests to gauge the depth and nature of a bond.</div>`;

      h += `<div class="indicator-item">`;
      h += `<div class="indicator-label">${pSVG('Sun',14,'var(--gold)')} ${pSVG('Moon',14,'var(--pearl)')} Lunar Contact</div>`;
      h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
      if (traditional.lunarContact) {
        h += `<span style="color:var(--emerald);font-weight:600">Present</span> — ${traditional.lunarContactType}. `;
        h += `One person's Sun illuminates the other's Moon, creating instinctive emotional understanding — the foundation of lasting intimacy.`;
      } else {
        h += `<span style="color:var(--text3)">Absent</span> — No close Sun-Moon link. `;
        h += `Emotional attunement doesn't come automatically, but other aspects can build understanding over time.`;
      }
      h += `</div></div>`;

      h += `<div class="indicator-item">`;
      h += `<div class="indicator-label">${pSVG('Venus',14,'var(--emerald)')} ${pSVG('Mars',14,'var(--crimson)')} Venus-Mars Chemistry</div>`;
      h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
      if (traditional.venusMarsMutual) {
        h += `<span style="color:var(--emerald);font-weight:600">Present</span> — `;
        h += `Venus (what you desire) connects with Mars (how you pursue). The classic indicator of physical and romantic chemistry.`;
      } else {
        h += `<span style="color:var(--text3)">Absent</span> — `;
        h += `No direct Venus-Mars link. Attraction may express through intellectual rapport, emotional safety, or shared purpose.`;
      }
      h += `</div></div>`;

      h += `<div class="indicator-item">`;
      h += `<div class="indicator-label">${pSVG('Saturn',14,'var(--text2)')} Saturn Bonds</div>`;
      h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
      if (traditional.saturnContacts > 2) {
        h += `<span style="color:var(--gold);font-weight:600">${traditional.saturnContacts} contacts</span> — `;
        h += `Heavy Saturn presence. This bond feels fated and serious — commitment and longevity, but also tests and hard-won lessons.`;
      } else if (traditional.saturnContacts > 0) {
        h += `<span style="color:var(--text2);font-weight:600">${traditional.saturnContacts} contact${traditional.saturnContacts>1?'s':''}</span> — `;
        h += `Enough Saturn structure for staying power without it feeling heavy or restrictive.`;
      } else {
        h += `<span style="color:var(--text3)">None</span> — `;
        h += `No Saturn contacts. The connection may feel light and free, but lasting commitment might need conscious building.`;
      }
      h += `</div></div>`;

      h += `<div class="indicator-item">`;
      h += `<div class="indicator-label">Elemental Balance</div>`;
      h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
      h += `<span style="color:var(--gold);font-weight:600;text-transform:capitalize">${traditional.elementBalance}</span> — `;
      const elDescriptions = {
        'igniting': 'Both charts are fire-dominant. Passion and mutual inspiration — but watch for burnout or ego clashes.',
        'inspiring': 'Fire meets air — ideas catch fire, conversation flows, and you push each other toward action.',
        'productive tension': 'Fire meets earth — one dreams, the other builds. Creative friction that produces real results.',
        'steamy tension': 'Fire meets water — intense emotional chemistry that swings between passion and overwhelm.',
        'grounding': 'Both charts are earth-dominant. Practical, stable, and naturally aligned on material goals.',
        'complementary': 'Earth meets air — the thinker and the builder. You cover each other\'s blind spots.',
        'nurturing': 'Earth meets water — emotional needs meet practical care. Naturally domestic and protective.',
        'intellectual': 'Both charts are air-dominant. Endless conversation and ideas — may need grounding in shared experience.',
        'creative tension': 'Air meets water — the mind meets the heart. Stimulating but sometimes confusing.',
        'deeply emotional': 'Both charts are water-dominant. Profound emotional resonance — but boundaries can blur.',
        'mixed': 'A diverse elemental spread — different energies that complement each other with mutual understanding.'
      };
      h += elDescriptions[traditional.elementBalance] || 'A blend of elemental energies.';
      h += `</div></div>`;

      // 7th house ruler
      if (traditional.ruler7thA || traditional.ruler7thB) {
        h += `<div class="indicator-item">`;
        h += `<div class="indicator-label">${pSVG('Venus',14,'var(--azure)')} 7th House Ruler</div>`;
        h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
        if (traditional.ruler7thA) {
          h += `Your 7th house ruler (${pSVG(traditional.ruler7thA.ruler,13,'var(--gold)')}&nbsp;${traditional.ruler7thA.ruler}) falls in ${chartB.name}'s <strong>House ${traditional.ruler7thA.houseInB}</strong> — your partnership instinct activates that area of their life.<br>`;
        }
        if (traditional.ruler7thB) {
          h += `${chartB.name}'s 7th house ruler (${pSVG(traditional.ruler7thB.ruler,13,'var(--azure)')}&nbsp;${traditional.ruler7thB.ruler}) falls in your <strong>House ${traditional.ruler7thB.houseInA}</strong> — their partnership instinct activates that area of your life.`;
        }
        h += `</div></div>`;
      }

      // Sect compatibility
      if (traditional.sectA && traditional.sectB) {
        h += `<div class="indicator-item">`;
        h += `<div class="indicator-label">${pSVG('Sun',14,'var(--gold)')} ${pSVG('Moon',14,'var(--pearl)')} Sect</div>`;
        h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
        const sectLabel = s => s === 'diurnal' ? 'Day (Sun sect)' : 'Night (Moon sect)';
        if (traditional.sectMatch) {
          h += `<span style="color:var(--emerald);font-weight:600">Same sect</span> — both ${sectLabel(traditional.sectA)}. `;
          h += `You share the same fundamental orientation to the world. Day charts lead with clarity and action; night charts lead with intuition and receptivity. Same-sect pairs often feel an instinctive kinship in how they approach life.`;
        } else {
          h += `<span style="color:var(--gold);font-weight:600">Opposite sect</span> — ${sectLabel(traditional.sectA)} and ${sectLabel(traditional.sectB)}. `;
          h += `You approach the world from different orientations — one leading with solar clarity, the other with lunar intuition. This creates complementary strengths when respected, and frustration when one style is treated as superior.`;
        }
        h += `</div></div>`;
      }

      // Mutual reception
      if (traditional.receptions && traditional.receptions.length > 0) {
        h += `<div class="indicator-item">`;
        h += `<div class="indicator-label">Reception</div>`;
        h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6">`;
        for (const r of traditional.receptions) {
          if (r.type === 'mutual') {
            h += `${pSVG(r.pA,13,'var(--gold)')}&nbsp;${r.pA} and ${pSVG(r.pB,13,'var(--azure)')}&nbsp;${r.pB}: <span style="color:var(--emerald);font-weight:600">Mutual reception</span> — each planet occupies a sign the other rules, creating a hidden bond of cooperation and exchange.<br>`;
          } else {
            h += `${pSVG(r.guest,13,'var(--azure)')}&nbsp;${r.guest} in ${r.sign}: <span style="color:var(--gold)">Received</span> by ${pSVG(r.host,13,'var(--gold)')}&nbsp;${r.host} — one person's planet is welcomed into the other's domain, strengthening that connection.<br>`;
          }
        }
        h += `</div></div>`;
      }

      // House overlays with interpretations
      if (traditional.houseOverlays && traditional.houseOverlays.length > 0) {
        const HOUSE_OVERLAY_VOICE = {
          Sun: {1:'shapes how you see yourself — you feel more alive and defined',2:'affects your sense of self-worth and finances',3:'lights up your mind — conversation flows and ideas multiply',4:'feels like home — deep emotional familiarity',5:'ignites creativity, romance, and playfulness',6:'motivates daily improvements in health and routines',7:'naturally fits the partner role — feels fated',8:'intense and transformative — power dynamics and intimacy',9:'expands your worldview — travel and meaning-seeking',10:'affects career and public standing — power couple energy',11:'deep friendship foundation — shared hopes and social circles',12:'soul-level connection that feels both magical and elusive'},
          Moon: {1:'triggers strong instinctive emotional reactions in you',2:'stirs feelings about security, comfort, and material needs',3:'creates emotional ease in daily communication',4:'deep domestic comfort — they feel like family',5:'nurtures your creative and romantic expression',6:'brings emotional awareness to your daily routines',7:'fulfills your emotional need for partnership',8:'reaches your deepest emotional vulnerabilities',9:'expands your emotional horizons and sense of meaning',10:'emotionally invests in your career and public role',11:'creates emotional bonds through shared community',12:'taps into your unconscious — dreams and hidden feelings surface'},
          Venus: {1:'finds you attractive — you feel beautiful and valued around them',2:'shared values and financial compatibility',3:'easy affectionate communication — flirtatious rapport',4:'creates a beautiful, loving home environment',5:'highly romantic placement — pleasure flows naturally',6:'brings grace and harmony to shared daily life',7:'classic partnership attraction — they embody what you seek',8:'deep financial and intimate bonding',9:'shared love of travel, culture, and philosophical exploration',10:'enhances your public image and professional relationships',11:'friendship and shared social pleasures',12:'hidden or private love — a quiet, soulful connection'},
          Mars: {1:'energizes and challenges your self-expression',2:'drives ambition around money and shared resources',3:'stimulates mental debates and lively exchanges',4:'activates your domestic life — renovations or family energy',5:'sparks passionate romance and creative drive',6:'motivates you in health and work — productive energy',7:'strong physical attraction and competitive partnership dynamics',8:'intensely transformative — power and sexuality',9:'adventurous energy — travel and philosophical sparring',10:'fuels career ambition and public assertiveness',11:'activates shared goals and community involvement',12:'stirs hidden desires and unconscious drives'}
        };
        h += `<div class="indicator-item">`;
        h += `<div class="indicator-label">House Overlays</div>`;
        h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:6px">Where key planets land in the other's chart, activating specific life areas.</div>`;
        h += `<div style="font-size:var(--fs-body);color:var(--text);line-height:1.7">`;
        const overlayImportance=(o)=>{let s=0;if(o.house===7)s+=10;if(o.house===1)s+=6;if(o.house===5)s+=5;if(o.house===8)s+=4;const pRank={Sun:10,Moon:9,Venus:8,Mars:6};s+=(pRank[o.planet]||3);return s;};
        const bOverlays = traditional.houseOverlays.filter(o => o.person === 'B').sort((a,b)=>overlayImportance(b)-overlayImportance(a));
        const aOverlays = traditional.houseOverlays.filter(o => o.person === 'A').sort((a,b)=>overlayImportance(b)-overlayImportance(a));
        for (const o of bOverlays) {
          const voiceText = HOUSE_OVERLAY_VOICE[o.planet] && HOUSE_OVERLAY_VOICE[o.planet][o.house] ? ` — ${HOUSE_OVERLAY_VOICE[o.planet][o.house]}` : '';
          h += `${pSVG(o.planet,13,'var(--azure)')} <span style="color:var(--azure)">${chartB.name}'s ${o.planet}</span> in your <strong>House ${o.house}</strong>${voiceText}<br>`;
        }
        for (const o of aOverlays) {
          const voiceText = HOUSE_OVERLAY_VOICE[o.planet] && HOUSE_OVERLAY_VOICE[o.planet][o.house] ? ` — ${HOUSE_OVERLAY_VOICE[o.planet][o.house]}` : '';
          h += `${pSVG(o.planet,13,'var(--gold)')} <span style="color:var(--gold)">Your ${o.planet}</span> in ${chartB.name}'s <strong>House ${o.house}</strong>${voiceText}<br>`;
        }
        h += `</div></div>`;
      }

      h += `</div>`;

      // ── Technical View (collapsible: biwheel + aspect grid) ──
      h += `<div class="card syn-section" style="padding:12px">`;
      h += `<div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="synTechOpen=!synTechOpen;renderApp()">`;
      h += `<span style="font-size:var(--fs-body);font-weight:600;color:var(--text2)">Technical View</span>`;
      h += `<span class="section-chev${synTechOpen?' open':''}" style="color:var(--text3);font-size:var(--fs-sub)">&#9656;</span>`;
      h += `</div>`;
      if(!synTechOpen){
        h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-top:6px">Biwheel and aspect grid. Tap to expand.</div>`;
      }
      if(synTechOpen){
        // Biwheel
        const wheelSize = Math.min(window.innerWidth - 48, 360);
        h += `<div class="biwheel-wrap" style="margin-top:12px">`;
        h += `<div class="biwheel-legend">`;
        h += `<span><span class="biwheel-legend-dot" style="background:var(--gold)"></span>${chartA.name} (outer)</span>`;
        h += `<span><span class="biwheel-legend-dot" style="background:var(--azure)"></span>${chartB.name} (inner)</span>`;
        h += `</div>`;
        h += `<div class="biwheel-container">`;
        h += renderSynastryWheel(natalA, housesA, natalB, housesB, synAspects, wheelSize, chartA.name, chartB.name);
        h += `</div>`;
        h += `<div class="biwheel-hint">Lines between planets show aspects. Green = harmony, red = tension.</div>`;
        h += `</div>`;
        // Aspect grid
        h += `<div style="margin-top:16px">`;
        h += `<div class="section-title">Aspect Grid</div>`;
        h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:8px">${chartA.name}'s planets (columns) vs ${chartB.name}'s planets (rows). Tap a cell to read its meaning.</div>`;
        h += renderSynastryGrid(natalA, natalB, synAspects);
        h += `</div>`;
      }
      h += `</div>`;
    }
  }

  h += `</div>`;

  return h;
}

function renderAstroCartoTab() {
  loadCharts();

  let h = '';
  h += `<div class="astrocarto-container">`;

  // Header
  h += `<div class="ac-header">`;
  const acChartForTitle = savedCharts.find(c => c.id === acSelectedChartId);
  const acTitleName = acChartForTitle ? (acChartForTitle.name === 'Alexander' ? 'Your' : acChartForTitle.name + "'s") : 'Your';
  h += `<div class="section-title" style="margin-top:0">${acTitleName} World Map</div>`;
  h += `<p>At the exact moment you were born, each planet was in a specific position in the sky. This map draws lines on Earth showing where each planet was rising, setting, at its highest, or at its lowest. Near these lines, that planet's energy is strongest for you — influencing career, love, home life, and more depending on the line type.</p>`;
  h += `</div>`;

  // Chart selector
  if (savedCharts.length > 1) {
    h += `<div style="padding:0 16px 10px">`;
    h += `<label style="font-size:var(--fs-label);color:var(--text3);display:block;margin-bottom:4px">Showing lines for:</label>`;
    h += `<select style="width:100%;padding:8px;background:var(--card);color:var(--text);border:1px solid var(--gold-line);border-radius:var(--r-sm);font-size:var(--fs-body)" onchange="acSelectedChartId=this.value;acTapInfo=null;acAstrocartoLines=null;renderApp();">`;
    for (let chart of savedCharts) {
      h += `<option value="${chart.id}" ${acSelectedChartId===chart.id?'selected':''}>${chart.name}</option>`;
    }
    h += `</select></div>`;
  }

  const selectedChart = savedCharts.find(c => c.id === acSelectedChartId);

  if (selectedChart) {
    const { natal: natalPos, jd } = getChartNatal(selectedChart);

    if (!acAstrocartoLines || acAstrocartoLines.chart !== acSelectedChartId) {
      acAstrocartoLines = computeAstroCartoLines(jd, natalPos);
      acAstrocartoLines.chart = acSelectedChartId;
      acAstrocartoLines._birthLoc = { lat: selectedChart.lat, lon: selectedChart.lon };
    }

    // Intention chips
    h += `<div class="ac-intention-row">`;
    for (let ik of Object.keys(ASTRO_INTENTIONS)) {
      const intent = ASTRO_INTENTIONS[ik];
      const iActive = acIntention === ik;
      h += `<button class="ac-intention-chip ${iActive?'active':''}" style="${iActive?'background:'+intent.color+';border-color:'+intent.color:''}" onclick="selectIntention('${ik}')">`;
      h += intent.label;
      h += `</button>`;
    }
    h += `</div>`;

    // Planet toggles
    h += `<div class="planet-toggles">`;
    const pNames = {Sun:'Sun',Moon:'Moon',Mercury:'Merc',Venus:'Venus',Mars:'Mars',Jupiter:'Jup',Saturn:'Sat',Uranus:'Ura',Neptune:'Nep',Pluto:'Pluto',Chiron:'Chi',NorthNode:'Node'};
    for (let planet of Object.keys(pNames)) {
      const active = acPlanetToggles[planet];
      h += `<button class="planet-toggle ${active?'active':''}" onclick="acPlanetToggles['${planet}']=!acPlanetToggles['${planet}'];acIntention=null;renderApp();">`;
      h += pSVG(planet, 13, active ? 'var(--bg)' : 'var(--text2)');
      h += `<span>${pNames[planet]}</span>`;
      h += `</button>`;
    }
    h += `</div>`;

    // Legend — plain English
    h += `<div class="ac-legend">`;
    h += `<span><span class="ac-leg-line" style="border-top:2px solid var(--gold)"></span> Highest (career)</span>`;
    h += `<span><span class="ac-leg-line" style="border-top:2px dashed var(--gold)"></span> Lowest (home)</span>`;
    h += `<span><span class="ac-leg-line" style="border-top:2px solid var(--gold);opacity:.6"></span> Rising (self)</span>`;
    h += `<span><span class="ac-leg-line" style="border-top:2px dashed var(--gold);opacity:.4"></span> Setting (others)</span>`;
    h += `</div>`;

    // Region selector
    h += `<div class="ac-region-row">`;
    for (let rk of Object.keys(MAP_REGIONS)) {
      const reg = MAP_REGIONS[rk];
      h += `<button class="ac-region-btn ${acRegion===rk?'active':''}" onclick="acRegion='${rk}';renderApp();">${reg.name}</button>`;
    }
    h += `</div>`;

    // Map
    const mapWidth = Math.min(window.innerWidth - 20, 500);
    const regionVB = MAP_REGIONS[acRegion].viewBox;
    h += `<div class="ac-map-wrap" onclick="handleMapClick(event, this, acAstrocartoLines)">`;
    h += renderAstroCartoMap(acAstrocartoLines, acPlanetToggles, acTapInfo, mapWidth, Math.round(mapWidth * 0.55), regionVB);
    h += `<div class="ac-map-hint">Tap the map to read any line</div>`;
    h += `</div>`;

    // Info card on tap
    if (acTapInfo) {
      const angleData = getChartSpecificAstroCartoVoice(acTapInfo.nearestLine.planet, acTapInfo.nearestLine.angleType.toLowerCase(), natalPos);
      const angleLabels = {mc:'Highest Point — Career Line',ic:'Lowest Point — Home Line',asc:'Rising — Identity Line',dsc:'Setting — Relationship Line'};
      const angleFullNames = {mc:'Where this planet boosts your career, visibility, and public reputation',ic:'Where this planet strengthens your home life, roots, and inner world',asc:'Where this planet amplifies who you are, your energy, and first impressions',dsc:'Where this planet draws in partnerships, love, and key relationships'};
      const angleLabel = angleLabels[acTapInfo.nearestLine.angleType] || acTapInfo.nearestLine.angleType.toUpperCase();

      h += `<div class="ac-info-card">`;
      // Tap coordinates + nearest city
      const tapLat = acTapInfo.lat.toFixed(1);
      const displayLon = acTapInfo.geoLon !== undefined ? (acTapInfo.geoLon > 180 ? acTapInfo.geoLon - 360 : acTapInfo.geoLon) : 0;
      const latDir = acTapInfo.lat >= 0 ? 'N' : 'S';
      const lonDir = displayLon >= 0 ? 'E' : 'W';
      let coordStr = `${Math.abs(parseFloat(tapLat))}${latDir}, ${Math.abs(displayLon).toFixed(1)}${lonDir}`;
      let nearestCity = null, minCityDist = Infinity;
      for (const city of CITIES) {
        const dLat = city.lat - acTapInfo.lat;
        const cityGeo = ((city.lon % 360) + 360) % 360;
        const tapGeo = acTapInfo.geoLon !== undefined ? acTapInfo.geoLon : 0;
        const dLon = Math.min(Math.abs(tapGeo - cityGeo), 360 - Math.abs(tapGeo - cityGeo));
        const dist = Math.sqrt(dLat * dLat + dLon * dLon);
        if (dist < minCityDist) { minCityDist = dist; nearestCity = city; }
      }
      h += `<div style="font-size:var(--fs-label);color:var(--text3);padding:6px 10px 0;display:flex;gap:8px;align-items:center">`;
      h += `<span>${coordStr}</span>`;
      if (nearestCity && minCityDist < 30) h += `<span>Near ${nearestCity.name}</span>`;
      h += `</div>`;

      h += `<div class="ac-info-head">`;
      h += `<div>`;
      h += `<div style="display:flex;align-items:center;gap:8px">`;
      h += pSVG(acTapInfo.nearestLine.planet, 22, AC_COLORS[acTapInfo.nearestLine.planet] || '#d0cae0');
      h += `<div class="ac-info-title">${acTapInfo.nearestLine.planet} ${angleLabel}</div>`;
      h += `</div>`;
      const angleFull = angleFullNames[acTapInfo.nearestLine.angleType] || '';
      if (angleFull) h += `<div style="font-size:var(--fs-label);color:var(--text3);margin-top:2px;margin-left:30px">${angleFull}</div>`;
      if (angleData) h += `<div class="ac-info-short" style="margin-left:30px">${angleData.short}</div>`;
      h += `</div>`;
      h += `<button class="ac-info-close" onclick="acTapInfo=null;renderApp();">&times;</button>`;
      h += `</div>`;
      if (angleData) {
        h += `<div class="ac-info-detail">${angleData.detail}</div>`;
        // Practical advice (planet-specific)
        const advice = getPlanetSpecificAdvice(acTapInfo.nearestLine.planet, acTapInfo.nearestLine.angleType);
        if (advice) {
          h += `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--hairline)">`;
          h += `<div style="font-size:var(--fs-label);color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Practical Use</div>`;
          h += `<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.5">${advice}</div>`;
          h += `</div>`;
        }
      }
      // Save location button
      h += `<div style="padding:6px 10px 0">`;
      h += `<button class="ac-save-btn" onclick="var n=prompt('Name this location:');if(n){addSavedLocation(n,${acTapInfo.lat.toFixed(2)},${(acTapInfo.geoLon!==undefined?acTapInfo.geoLon:0).toFixed(2)});renderApp();}">`;
      h += `+ Save this location</button>`;
      h += `</div>`;
      h += `</div>`;
    }

    // ── Planet Breakdown Cards ──
    const activePlanets = Object.keys(acPlanetToggles).filter(p => acPlanetToggles[p] && acAstrocartoLines[p]);
    if (activePlanets.length > 0) {
      h += `<div style="padding:10px 12px 4px">`;
      h += `<div class="section-title">Your Planet Lines</div>`;
      h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:8px">Each planet has lines on the map. Tap a card below to see what that planet means for you in different places.</div>`;
      h += `</div>`;
      h += `<div class="ac-planet-cards">`;
      for (const planet of activePlanets) {
        const voice = ASTROCARTO_VOICE[planet];
        if (!voice) continue;
        const c = AC_COLORS[planet] || '#9089ab';
        // One-liner combining all four angles
        const mcShort = voice.mc ? voice.mc.short.split('.')[0] : '';
        const ascShort = voice.asc ? voice.asc.short.split('.')[0] : '';

        h += `<div class="ac-planet-card" onclick="acTapInfo={lat:0,lon:acAstrocartoLines['${planet}'].mc,nearestLine:{planet:'${planet}',angleType:'mc'}};renderApp();">`;
        h += `<div class="ac-pc-head">`;
        h += pSVG(planet, 18, c);
        h += `<span class="ac-pc-name" style="color:${c}">${planet}</span>`;
        const pl = acAstrocartoLines[planet];
        let lineCount = 0;
        if (pl.mc !== undefined) lineCount++;
        if (pl.ic !== undefined) lineCount++;
        if (pl.asc && pl.asc.length > 1) lineCount++;
        if (pl.dsc && pl.dsc.length > 1) lineCount++;
        h += `<span class="ac-pc-angles">${lineCount} line${lineCount !== 1 ? 's' : ''} on map</span>`;
        h += `</div>`;
        h += `<div class="ac-pc-brief">`;
        h += `<strong>Career line:</strong> ${mcShort}. `;
        h += `<strong>Identity line:</strong> ${ascShort}.`;
        h += `</div>`;
        h += `</div>`;
      }
      h += `</div>`;
    }

    // ── Understanding the Four Line Types ──
    if (!acTapInfo) {
      h += `<div style="padding:10px 12px">`;
      h += `<div class="section-title">What the Lines Mean</div>`;
      h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:10px">Every planet draws four lines on the map. Each line type affects a different part of your life:</div>`;
      const angleExplainers = [
        { name: 'Highest Point (MC)', color: 'var(--gold)', desc: 'Where the planet was directly overhead. Near this line, that planet\'s energy boosts your career, public image, and ambitions. You\'ll be noticed and recognized here.' },
        { name: 'Lowest Point (IC)', color: 'var(--violet)', desc: 'Where the planet was directly below. Near this line, you feel deeply rooted. It strengthens home, family, and your inner emotional world.' },
        { name: 'Rising Line (ASC)', color: 'var(--emerald)', desc: 'Where the planet was coming up over the horizon. This line amplifies your personal identity and energy. You feel most like yourself here.' },
        { name: 'Setting Line (DSC)', color: 'var(--azure)', desc: 'Where the planet was going below the horizon. This line attracts relationships, partnerships, and key people into your life.' }
      ];
      for (const a of angleExplainers) {
        h += `<div class="card" style="margin-bottom:8px;padding:12px;border-left:3px solid ${a.color}">`;
        h += `<div style="font-size:var(--fs-body);font-weight:600;color:${a.color};margin-bottom:4px">${a.name}</div>`;
        h += `<div style="font-size:var(--fs-meta);color:var(--text);line-height:1.55">${a.desc}</div>`;
        h += `</div>`;
      }
      h += `</div>`;
    }

    // ── Power Crossings ──
    const crossings = computeLineCrossings(acAstrocartoLines, acPlanetToggles);
    if (crossings.length > 0) {
      h += `<div style="padding:10px 12px 4px">`;
      h += `<div class="section-title">Power Crossings</div>`;
      h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:8px">Where two planetary lines cross, their energies combine powerfully. These locations carry double significance.</div>`;
      h += `</div>`;
      h += `<div style="padding:0 12px">`;
      for (const xing of crossings.slice(0, 12)) {
        const cA = AC_COLORS[xing.pA] || '#9089ab';
        const cB = AC_COLORS[xing.pB] || '#9089ab';
        const angLabels2 = {asc:'Rising',dsc:'Setting',mc:'Highest',ic:'Lowest'};
        let nearCity = null, minD = Infinity;
        for (const city of CITIES) {
          const dLat = city.lat - xing.lat;
          const cityGeo = ((city.lon % 360) + 360) % 360;
          const dLon = Math.min(Math.abs(xing.geoLon - cityGeo), 360 - Math.abs(xing.geoLon - cityGeo));
          const d = Math.sqrt(dLat * dLat + dLon * dLon);
          if (d < minD) { minD = d; nearCity = city; }
        }
        const interp = getCrossingInterpretation(xing.pA, xing.pB, xing.angA, xing.angB);
        h += `<div class="ac-crossing-card">`;
        h += `<div class="ac-crossing-head">`;
        h += pSVG(xing.pA, 16, cA);
        h += `<span style="font-size:var(--fs-body);font-weight:600;color:${cA}">${xing.pA} ${angLabels2[xing.angA]||xing.angA}</span>`;
        h += `<span style="color:var(--text3);font-size:var(--fs-label)">x</span>`;
        h += pSVG(xing.pB, 16, cB);
        h += `<span style="font-size:var(--fs-body);font-weight:600;color:${cB}">${xing.pB} ${angLabels2[xing.angB]||xing.angB}</span>`;
        h += `</div>`;
        if (nearCity && minD < 40) h += `<div class="ac-crossing-city">Near ${nearCity.name}</div>`;
        h += `<div class="ac-crossing-interp">${interp}</div>`;
        h += `</div>`;
      }
      h += `</div>`;
    }

    // ── My Places (Saved Locations) ──
    loadSavedLocations();
    if (savedLocations.length > 0) {
      h += `<div class="ac-saved-section">`;
      h += `<div class="section-title">My Places</div>`;
      h += `<div style="font-size:var(--fs-meta);color:var(--text3);margin-bottom:8px">Saved locations with your nearest planetary lines.</div>`;
      for (const loc of savedLocations) {
        const latD = loc.lat >= 0 ? 'N' : 'S';
        const dispLon = loc.geoLon > 180 ? loc.geoLon - 360 : loc.geoLon;
        const lonD = dispLon >= 0 ? 'E' : 'W';
        const nearest = getNearestLines(loc.lat, loc.geoLon, acAstrocartoLines, 3);
        h += `<div class="ac-saved-card">`;
        h += `<div class="ac-saved-name">${loc.name}</div>`;
        h += `<div class="ac-saved-coords">${Math.abs(loc.lat).toFixed(1)}${latD}, ${Math.abs(dispLon).toFixed(1)}${lonD}</div>`;
        h += `<div class="ac-saved-lines">`;
        for (const nl of nearest) {
          const angL = {mc:'Highest',ic:'Lowest',asc:'Rising',dsc:'Setting'};
          const c = AC_COLORS[nl.planet] || '#9089ab';
          h += `<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px">`;
          h += pSVG(nl.planet, 14, c);
          h += `<span style="color:${c};font-weight:600">${nl.planet}</span> <span>${angL[nl.angleType]||nl.angleType}</span> <span style="color:var(--text3)">(${nl.dist.toFixed(0)} away)</span>`;
          h += `</div>`;
        }
        h += `</div>`;
        h += `<button class="ac-saved-remove" onclick="removeSavedLocation(${loc.id})">&times;</button>`;
        h += `</div>`;
      }
      h += `</div>`;
    }
  }

  h += `</div>`;
  return h;
}

function handleMapClick(evt, svgEl, lines) {
  const rect = svgEl.querySelector('svg').getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;

  const svg = svgEl.querySelector('svg');
  const viewBox = svg.getAttribute('viewBox').split(' ');
  const vbX = parseFloat(viewBox[0]);
  const vbY = parseFloat(viewBox[1]);
  const vbWidth = parseFloat(viewBox[2]);
  const vbHeight = parseFloat(viewBox[3]);

  const svgLon = vbX + (x / rect.width) * vbWidth;
  const geoLon = ((svgLon - 180) % 360 + 360) % 360;
  const lat = 90 - (vbY + (y / rect.height) * vbHeight);

  let nearest = null;
  let minDist = Infinity;

  for (let planet of Object.keys(acPlanetToggles)) {
    if (!acPlanetToggles[planet]) continue;
    if (!(planet in lines)) continue;

    const planetLine = lines[planet];
    const lonDist = (a, b) => { const d = Math.abs(a - b); return Math.min(d, 360 - d); };

    const mcDist = lonDist(geoLon, planetLine.mc);
    if (mcDist < minDist) { minDist = mcDist; nearest = { planet, angleType: 'mc' }; }

    const icDist = lonDist(geoLon, planetLine.ic);
    if (icDist < minDist) { minDist = icDist; nearest = { planet, angleType: 'ic' }; }

    if (planetLine.asc) {
      for (let pt of planetLine.asc) {
        const dist = Math.sqrt(lonDist(geoLon, pt.lon) ** 2 + (lat - pt.lat) ** 2);
        if (dist < minDist) { minDist = dist; nearest = { planet, angleType: 'asc' }; }
      }
    }

    if (planetLine.dsc) {
      for (let pt of planetLine.dsc) {
        const dist = Math.sqrt(lonDist(geoLon, pt.lon) ** 2 + (lat - pt.lat) ** 2);
        if (dist < minDist) { minDist = dist; nearest = { planet, angleType: 'dsc' }; }
      }
    }
  }

  if (nearest && minDist < 20) {
    acTapInfo = { lat, lon: svgLon, geoLon, nearestLine: nearest };
  }

  renderApp();
}

// ============================================================================
// SECTION 12: CHART INPUT FORM MODAL
// ============================================================================

let citySearchResults = [];
let cityResolved = null; // {name, lat, lon, tz}

function searchCity() {
  const q = document.getElementById('chart-city').value.trim();
  if (q.length < 2) return;
  document.querySelector('.city-search-btn').textContent = '...';
  fetch('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + encodeURIComponent(q), {
    headers: { 'Accept-Language': 'en' }
  })
  .then(r => r.json())
  .then(results => {
    citySearchResults = results.map(r => ({
      name: r.display_name.split(',').slice(0, 3).join(','),
      lat: parseFloat(r.lat),
      lon: parseFloat(r.lon)
    }));
    renderCityResults();
    document.querySelector('.city-search-btn').textContent = 'Search';
  })
  .catch(() => {
    document.querySelector('.city-search-btn').textContent = 'Search';
  });
}

function pickCity(idx) {
  const c = citySearchResults[idx];
  if (!c) return;
  // Estimate timezone from longitude as fallback
  const tzEst = Math.round(c.lon / 15 * 2) / 2;
  cityResolved = { name: c.name, lat: c.lat, lon: c.lon, tz: tzEst };
  citySearchResults = [];
  document.getElementById('chart-city').value = c.name;
  renderCityResults();
  // Look up the accurate timezone for this city at the birth date entered in the form
  lookupTimezoneForBirthDate(c.lat, c.lon);
}

function lookupTimezoneForBirthDate(lat, lon) {
  // Read birth date from form fields to get the historically accurate timezone (DST-aware)
  const yearEl = document.getElementById('chart-year');
  const monthEl = document.getElementById('chart-month');
  const dayEl = document.getElementById('chart-day');
  const hourEl = document.getElementById('chart-hour');
  const minEl = document.getElementById('chart-minute');
  const yr = yearEl ? parseInt(yearEl.value) || 2000 : 2000;
  const mo = monthEl ? parseInt(monthEl.value) || 1 : 1;
  const dy = dayEl ? parseInt(dayEl.value) || 1 : 1;
  const hr = hourEl ? parseInt(hourEl.value) || 12 : 12;
  const mn = minEl ? parseInt(minEl.value) || 0 : 0;
  // Build a UNIX timestamp for the birth date (approximate — assumes UTC, but TimeZoneDB is forgiving)
  const birthDate = new Date(Date.UTC(yr, mo - 1, dy, hr, mn, 0));
  const unixTime = Math.floor(birthDate.getTime() / 1000);

  const apiKey = 'HKUOZZMT8VZS';
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}&time=${unixTime}`;
  fetch(url)
    .then(r => r.json())
    .then(data => {
      if (data.status === 'OK' && data.gmtOffset !== undefined) {
        const tzHours = data.gmtOffset / 3600;
        if (cityResolved) {
          cityResolved.tz = tzHours;
          cityResolved.tzName = data.zoneName || '';
          // Update display
          const info = document.getElementById('city-resolved-info');
          if (info) {
            info.textContent = cityResolved.name + ' (' + cityResolved.lat.toFixed(2) + ', ' + cityResolved.lon.toFixed(2) + ', UTC' + (tzHours >= 0 ? '+' : '') + tzHours + (cityResolved.tzName ? ' ' + cityResolved.tzName : '') + ')';
          }
          // Update the tz dropdown
          const tzSel = document.getElementById('chart-tz-select');
          if (tzSel) tzSel.value = String(tzHours);
        }
      }
    })
    .catch(() => { /* keep lon-based estimate */ });
}

function renderCityResults() {
  const wrap = document.getElementById('city-results-box');
  if (!wrap) return;
  if (citySearchResults.length === 0) {
    wrap.innerHTML = '';
    return;
  }
  let h = '';
  citySearchResults.forEach((c, i) => {
    h += `<div onclick="pickCity(${i})">${c.name}</div>`;
  });
  wrap.innerHTML = h;
  // Show resolved info
  const info = document.getElementById('city-resolved-info');
  if (info && cityResolved) {
    info.textContent = cityResolved.name + ' (' + cityResolved.lat.toFixed(2) + ', ' + cityResolved.lon.toFixed(2) + ', UTC' + (cityResolved.tz >= 0 ? '+' : '') + cityResolved.tz + ')';
  }
}

function renderChartFormModal() {
  let formData = {};
  if (editingChartId && editingChartId !== 'alexander') {
    const chart = savedCharts.find(c => c.id === editingChartId);
    if (chart) formData = { ...chart };
  } else {
    formData = { name: '', year: new Date().getFullYear(), month: 1, day: 1, hour: 12, minute: 0, lat: 0, lon: 0, tz: 0 };
  }

  const cityVal = cityResolved ? cityResolved.name : (formData.cityName || '');
  const resolvedText = cityResolved
    ? cityResolved.name + ' (' + cityResolved.lat.toFixed(2) + ', ' + cityResolved.lon.toFixed(2) + ', UTC' + (cityResolved.tz >= 0 ? '+' : '') + cityResolved.tz + ')'
    : (formData.lat && formData.lon ? (formData.cityName || '') + ' (' + formData.lat.toFixed(2) + ', ' + formData.lon.toFixed(2) + ', UTC' + (formData.tz >= 0 ? '+' : '') + formData.tz + ')' : '');

  return `<div class="chart-form-modal" onclick="if(event.target===this){showChartForm=false;editingChartId=null;citySearchResults=[];cityResolved=null;renderApp();}">
    <div class="chart-form-panel">
      <h2>${editingChartId ? 'Edit Chart' : 'Add Person'}</h2>

      <div class="form-group">
        <label>Name *</label>
        <input type="text" id="chart-name" value="${formData.name || ''}" placeholder="Full name">
      </div>

      <div class="form-group">
        <label>Birth Date *</label>
        <div class="form-row three">
          <input type="number" id="chart-day" min="1" max="31" value="${formData.day || 1}" placeholder="Day" onchange="if(cityResolved)lookupTimezoneForBirthDate(cityResolved.lat,cityResolved.lon)">
          <input type="number" id="chart-month" min="1" max="12" value="${formData.month || 1}" placeholder="Month" onchange="if(cityResolved)lookupTimezoneForBirthDate(cityResolved.lat,cityResolved.lon)">
          <input type="number" id="chart-year" value="${formData.year || 2000}" placeholder="Year" onchange="if(cityResolved)lookupTimezoneForBirthDate(cityResolved.lat,cityResolved.lon)">
        </div>
      </div>

      <div class="form-group">
        <label>Birth Time *</label>
        <div class="form-row">
          <input type="number" id="chart-hour" min="0" max="23" value="${Math.floor(formData.hour || 12)}" placeholder="HH (0-23)" onchange="if(cityResolved)lookupTimezoneForBirthDate(cityResolved.lat,cityResolved.lon)">
          <input type="number" id="chart-minute" min="0" max="59" value="${Math.round(((formData.hour || 12) % 1) * 60)}" placeholder="MM">
        </div>
      </div>

      <div class="form-group">
        <label>Birth City *</label>
        <div class="city-search-wrap">
          <input type="text" id="chart-city" value="${cityVal}" placeholder="Search city..." onkeydown="if(event.key==='Enter'){event.preventDefault();searchCity();}">
          <button class="city-search-btn" type="button" onclick="searchCity()">Search</button>
          <div class="city-results" id="city-results-box"></div>
        </div>
        <div class="city-resolved" id="city-resolved-info">${resolvedText}</div>
      </div>

      <div class="form-group">
        <label>Timezone (UTC offset at birth) *</label>
        <select id="chart-tz-select" style="width:100%;padding:0.6rem;background-color:var(--bg);color:var(--text);border:1px solid var(--gold-line);border-radius:var(--r-sm);font-size:0.95rem;box-sizing:border-box">
          ${(function(){
            const tzVal = cityResolved ? cityResolved.tz : (formData.tz || 0);
            let opts = '';
            for (let t = -12; t <= 14; t += 0.5) {
              const label = 'UTC' + (t >= 0 ? '+' : '') + t;
              opts += '<option value="' + t + '"' + (t === tzVal ? ' selected' : '') + '>' + label + '</option>';
            }
            return opts;
          })()}
        </select>
        <div style="font-size:var(--fs-label);color:var(--text3);margin-top:4px">Auto-detected from city and birth date (including daylight saving time). Override manually only if you know it's wrong.</div>
      </div>

      <div class="form-buttons">
        <button class="save-btn" onclick="saveChartFromForm();">Save</button>
        <button class="cancel-btn" onclick="showChartForm=false;editingChartId=null;citySearchResults=[];cityResolved=null;renderApp();">Cancel</button>
      </div>
    </div>
  </div>`;
}

function renderApp(){
  const now=getTargetDate();const isToday=dayOffset===0;
  const jd=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),
    isToday?now.getUTCHours()+now.getUTCMinutes()/60:12);
  const T=jdToT(jd),cur=computeAll(jd);
  const mPhase=moonPhaseInfo(moonPhase(T)),moonSign=signOf(cur.Moon);
  const phaseAngle=moonPhase(T);
  const vocResult=isVoidOfCourse(cur.Moon,jd);

  const TPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
  const NPS=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode','Ascendant','MC'];
  const transits=[];
  for(const tp of TPS){for(const np of NPS){
    if(tp===np&&!['Saturn','Jupiter','Mars','Chiron','NorthNode'].includes(tp))continue;
    const asp=findAspect(cur[tp],NATAL[np],tp,np,jd);
    if(asp){const exactInfo=(tp!=='Moon')?cachedExactDate(tp,np,asp.angle,jd):null;
      transits.push({tp,np,tLon:cur[tp],nLon:NATAL[np],aspect:asp,
        importance:transitImportance(tp,np,asp),
        interp:getDeepInterpV2(tp,np,asp.name,houseOf(cur[tp])),
        duration:DUR[tp],house:houseOf(cur[tp]),exactDate:exactInfo});}
  }}
  transits.sort((a,b)=>b.importance-a.importance);

  const retros=[],stats=[];
  for(const p of['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron']){
    const ms=motionStatus(p,jd);if(ms.stationary)stats.push(p);else if(ms.retrograde)retros.push(p);}
  const vibe=vibeCalc(transits);
  const ingresses=findIngresses(cur,jd);

  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];

  let h='';

  // ── HEADER ──
  const timeStr=isToday?' · '+new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:OBSERVER.tzName})+' '+OBSERVER.label:'';
  h+=`<div class="header" style="position:relative">`;
  const themeIcon=detectTheme()==='light'?
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  h+=`<div class="theme-toggle" onclick="toggleTheme()">${themeIcon}</div>`;
  h+=`<div class="header-sub">Your Transits</div>`;
  h+=`<div class="header-date">${months[now.getMonth()]} ${now.getDate()}</div>`;
  h+=`<div class="header-day">${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getDay()]}${timeStr}</div>`;
  // Profections (hoisted for time-scale strip + Today tab)
  const prof=computeProfections(now);

  // Planetary hours (hoisted for strip + Home + Today)
  const pHoursHome=computePlanetaryHours(jd,OBSERVER.lat,OBSERVER.lon);
  let curHourHome=null;
  if(pHoursHome&&isToday){
    const utNow=jd;
    const idxH=currentHourIndex(pHoursHome.hours,utNow);
    curHourHome=pHoursHome.hours[idxH];
    curHourHome.minsLeft=Math.max(0,Math.round((curHourHome.end-utNow)*24*60));
  }

  // ZR + Firdaria (hoisted for time-scale strip)
  const birthDate=new Date(BIRTH.year,BIRTH.month-1,BIRTH.day);
  const ageYears=prof.ageYears;
  const spiritLotLon=typeof lotLong==='function'?lotLong('Spirit'):norm(NATAL.Ascendant+NATAL.Sun-NATAL.Moon);
  const fortuneLotLon=typeof lotLong==='function'?lotLong('Fortune'):norm(NATAL.Ascendant+NATAL.Moon-NATAL.Sun);
  const spiritSignIdx=Math.floor(norm(spiritLotLon)/30);
  const fortuneSignIdx=Math.floor(norm(fortuneLotLon)/30);
  const zrSpirit=computeZR(spiritSignIdx,birthDate,40);
  const curSpirit=findCurrentZRPeriod(zrSpirit,ageYears);
  const firdaria=computeFirdaria(birthDate);
  const curFir=findCurrentFirdaria(firdaria,ageYears);

  // ── TIME-SCALE STRIP (replaces Lord of Year badge) ──
  h+=`<div class="ts-strip">`;
  // Cell 1: Now (current hour)
  h+=`<div class="ts-cell ${tsOpenCell==='now'?'open':''}" onclick="toggleTsCell('now')">`;
  h+=`<div class="ts-cell-label">Now</div>`;
  if(curHourHome){
    h+=`<div class="ts-cell-val">${pSVG(curHourHome.ruler,14,'var(--gold)')}</div>`;
    h+=`<div class="ts-cell-sub">${curHourHome.minsLeft}m left</div>`;
  } else {
    h+=`<div class="ts-cell-val">${pSVG(pHoursHome?pHoursHome.dayRuler:'Sun',14,'var(--text2)')}</div>`;
    h+=`<div class="ts-cell-sub">${pHoursHome?pHoursHome.dayRuler+"'s day":'--'}</div>`;
  }
  h+=`</div>`;
  // Cell 2: Month (profected month)
  h+=`<div class="ts-cell ${tsOpenCell==='month'?'open':''}" onclick="toggleTsCell('month')">`;
  h+=`<div class="ts-cell-label">Month</div>`;
  h+=`<div class="ts-cell-val">${pSVG(prof.monthLord,14,'var(--violet)')}</div>`;
  h+=`<div class="ts-cell-sub">${prof.monthSign?prof.monthSign.substring(0,3):''}</div>`;
  h+=`</div>`;
  // Cell 3: Year (lord of the year)
  h+=`<div class="ts-cell ${tsOpenCell==='year'?'open':''}" onclick="toggleTsCell('year')">`;
  h+=`<div class="ts-cell-label">Year</div>`;
  h+=`<div class="ts-cell-val">${pSVG(prof.yearLord,14,'var(--gold)')}</div>`;
  h+=`<div class="ts-cell-sub">${prof.yearSign?prof.yearSign.substring(0,3):''} · ${ageYears}</div>`;
  h+=`</div>`;
  // Cell 4: Chapter (ZR Spirit L1 + Firdaria major)
  h+=`<div class="ts-cell ${tsOpenCell==='chapter'?'open':''}" onclick="toggleTsCell('chapter')">`;
  h+=`<div class="ts-cell-label">Chapter</div>`;
  if(curSpirit){
    h+=`<div class="ts-cell-val">${sSVG(curSpirit.l1Sign||'Aries',14,'var(--azure)')}</div>`;
    h+=`<div class="ts-cell-sub">${curFir?curFir.major.lord.substring(0,3):''}</div>`;
  } else {
    h+=`<div class="ts-cell-val">${curFir?pSVG(curFir.major.lord,14,'var(--azure)'):''}</div>`;
    h+=`<div class="ts-cell-sub">--</div>`;
  }
  h+=`</div>`;
  h+=`</div>`; // end ts-strip

  // Time-scale detail panels
  h+=`<div class="ts-panel ${tsOpenCell==='now'?'open':''}" id="ts-panel-now">`;
  if(curHourHome){
    const hb=typeof hourBrief==='function'?hourBrief(curHourHome.ruler):'';
    h+=`This is the hour of ${curHourHome.ruler}. ${hb} ${curHourHome.minsLeft} minutes remain before the hour shifts.`;
  } else if(pHoursHome){
    h+=`Today is ${pHoursHome.dayRuler}'s day. ${typeof DAY_RULER_TONE!=='undefined'&&DAY_RULER_TONE[pHoursHome.dayRuler]?DAY_RULER_TONE[pHoursHome.dayRuler]:''}`;
  }
  h+=`</div>`;
  h+=`<div class="ts-panel ${tsOpenCell==='month'?'open':''}" id="ts-panel-month">`;
  h+=`Month lord: ${prof.monthLord} in ${prof.monthSign}. ${typeof MONTH_THEME!=='undefined'&&MONTH_THEME[prof.monthSign]?MONTH_THEME[prof.monthSign]:'The profected month colors the texture of daily events.'}`;
  h+=`</div>`;
  h+=`<div class="ts-panel ${tsOpenCell==='year'?'open':''}" id="ts-panel-year">`;
  h+=`Year of ${prof.yearLord} (${prof.yearSign}, Age ${ageYears}). ${typeof ANNUAL_THEME!=='undefined'&&ANNUAL_THEME[prof.yearSign]?ANNUAL_THEME[prof.yearSign]:'The annual lord sets the year\'s central themes.'}`;
  h+=`</div>`;
  h+=`<div class="ts-panel ${tsOpenCell==='chapter'?'open':''}" id="ts-panel-chapter">`;
  if(curSpirit){
    h+=`ZR Spirit: ${curSpirit.l1Sign||'--'} period (L1). `;
    if(curSpirit.peak)h+=`This is a peak period — cardinal energy activates. `;
    if(curSpirit.lb)h+=`Loosing of the Bond: the theme shifts unexpectedly. `;
  }
  if(curFir){
    const fv=typeof FIRDARIA_VOICE!=='undefined'?FIRDARIA_VOICE[curFir.major.lord]:null;
    h+=`Firdaria: ${curFir.major.lord} major period. ${fv?fv.theme||fv.brief||'':''}`;
  }
  h+=`</div>`;

  h+=`<div class="date-nav">`;
  h+=`<button onclick="navDay(-1)">&#8249;</button>`;
  h+=`<button class="today-btn ${!isToday?'show':''}" onclick="navToday()">Today</button>`;
  h+=`<button onclick="navDay(1)">&#8250;</button></div></div>`;

  // ══════════ TODAY TAB ══════════
  h+=`<div class="tab-content ${activeTab==='today'?'active':''}">`;

  // Hoisted: used by consult, hours strip, liturgy, guidance, journal context
  const pHours=pHoursHome;

  // ── VOC Persistent Banner (above everything) ──
  if(vocResult.voc){
    const vocTotalMin=vocResult.endsIn?Math.round(vocResult.endsIn*24*60):0;
    const vocH=Math.floor(vocTotalMin/60);
    const vocM=vocTotalMin%60;
    const vocTimeStr=vocH>0?`${vocH}h ${vocM}m`:`${vocM}m`;
    const vocNext=vocResult.nextSign||'';
    const vocSubText=vocNext?`Moon enters ${vocNext} in ${vocTimeStr}`:`Ends in ${vocTimeStr}`;
    h+=`<div class="voc-banner" onclick="showTip('VOC_REC')">`;
    h+=`<div class="voc-icon"><svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="15.5" x2="12" y2="16"/></svg></div>`;
    h+=`<div class="voc-body">`;
    h+=`<div class="voc-title">Void-of-Course Moon</div>`;
    h+=`<div class="voc-sub">${vocSubText} &mdash; pause new starts</div>`;
    h+=`</div>`;
    if(vocTotalMin>0){
      h+=`<div class="voc-countdown"><div class="voc-cd-num">${vocTimeStr}</div><div class="voc-cd-label">remaining</div></div>`;
    }
    h+=`</div>`;
  }

  // ══════════ LAYER 1: THE SHAPE OF THE DAY ══════════
  {
    const mansion=typeof computeMansion==='function'?computeMansion(cur.Moon):null;
    const topT=transits.filter(t=>t.importance>10).slice(0,5);
    const dayShapeCtx={
      dateStr:now.toLocaleDateString('en-CA'),
      isToday,jd,cur,transits,mPhase,vocResult,moonSign,prof,pHours,
      retros,vibe,phaseAngle,
      dominant:vibe?vibe.dominant:null,
      topTransits:topT,
      mansion,
      currentHour:curHourHome,
      dayRuler:pHours?pHours.dayRuler:null
    };
    const dayShape=synthesizeDayShape(dayShapeCtx);
    // Stash synthesis for journal tracking
    window._pendingSynthesisForJournal={text:dayShape.text,tokens:typeof extractCitations==='function'?extractCitations(dayShape.text):[],source:dayShape.source||'deterministic'};
    h+=`<div class="day-shape">`;
    h+=`<div class="day-shape-text">${renderCitations(dayShape.text)}</div>`;
    h+=`<div class="day-shape-meta">`;
    if(dayShape.source==='claude'){
      const ts=dayShape.timestamp?new Date(dayShape.timestamp).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:OBSERVER.tzName}):'';
      h+=`<span>Generated ${ts}</span>`;
      h+=`<span class="day-shape-regen" onclick="event.stopPropagation();_dayShapeLLMDate=null;_dayShapeLLMPending=false;backgroundGenerateDayShape(window._lastDayShapeCtx||{},new Date().toLocaleDateString('en-CA'))">regenerate</span>`;
    } else {
      h+=`<span style="opacity:.5">deterministic reading</span>`;
      if(typeof loadClaudeKey==='function'&&loadClaudeKey()){
        h+=`<span class="day-shape-regen" onclick="event.stopPropagation();_dayShapeLLMDate=null;_dayShapeLLMPending=false;backgroundGenerateDayShape(window._lastDayShapeCtx||{},new Date().toLocaleDateString('en-CA'))">request synthesis</span>`;
      }
    }
    h+=`</div></div>`;
    window._lastDayShapeCtx=dayShapeCtx;

    // ══════════ LAYER 2: CONTRIBUTING FACTORS ══════════
    h+=`<div class="factors-block">`;

    // Factor 1: Profected lord status
    const profLordSign=signOf(cur[prof.yearLord]||0);
    const profLordHouse=houseOf(cur[prof.yearLord]||0);
    const profLordDig=getDignity(prof.yearLord,cur[prof.yearLord]||0);
    const profLordAsp=topT.find(t=>t.tp===prof.yearLord||t.np===prof.yearLord);
    h+=`<div class="factor-line" onclick="openMechanic('mech-profections','profection-year','${prof.yearLord}')">`;
    h+=`<div class="factor-icon">${pSVG(prof.yearLord,16,'var(--gold)')}</div>`;
    h+=`<div class="factor-text">${prof.yearLord}, your Year-Lord, is in ${profLordSign.name} at ${profLordSign.degree}° in your ${profLordHouse}${profLordHouse===1?'st':profLordHouse===2?'nd':profLordHouse===3?'rd':'th'}${profLordDig?' ('+profLordDig.label+')':''}${profLordAsp?', '+profLordAsp.aspect.motion+' '+profLordAsp.aspect.name+' your natal '+profLordAsp.np:''}</div>`;
    h+=`<div class="factor-tag" style="background:var(--gold-soft);color:var(--gold)">Year</div>`;
    h+=`</div>`;

    // Factor 2: Active ZR period
    if(curSpirit){
      const zrNote=curSpirit.peak?' Cardinal peak — active phase.':curSpirit.lb?' Loosing of the Bond — themes shift.':'';
      h+=`<div class="factor-line" onclick="openMechanic('mech-zr','zr-spirit','')">`;
      h+=`<div class="factor-icon">${sSVG(curSpirit.l1Sign||'Aries',16,'var(--azure)')}</div>`;
      h+=`<div class="factor-text">ZR Spirit: ${curSpirit.l1Sign||'--'} period.${zrNote}${curSpirit.l2Sign?' L2: '+curSpirit.l2Sign+'.':''}</div>`;
      h+=`<div class="factor-tag" style="background:var(--azure-soft,rgba(90,160,255,.12));color:var(--azure)">Arc</div>`;
      h+=`</div>`;
    }

    // Factor 3: Moon condition
    h+=`<div class="factor-line" onclick="openMechanic('mech-moon','mansion','')">`;
    h+=`<div class="factor-icon">${renderMoonSVG(phaseAngle||0,16)}</div>`;
    let moonFactorText=`Moon ${mPhase.name} in ${moonSign.name} ${signOf(cur.Moon).degree}°`;
    if(mansion)moonFactorText+=`, ${mansion.mansion||mansion.name||'Mansion '+(mansion.index||'')} (${mansion.nature||'mixed'})`;
    if(vocResult.voc){
      const vocMin=vocResult.endsIn?Math.round(vocResult.endsIn*60):0;
      moonFactorText+=`. Void after ${vocMin>60?Math.floor(vocMin/60)+'h '+vocMin%60+'m':vocMin+'m'}`;
    }
    h+=`<div class="factor-text">${moonFactorText}</div>`;
    h+=`<div class="factor-tag" style="background:var(--violet-soft);color:var(--violet)">Moon</div>`;
    h+=`</div>`;

    // Factor 4: Top transit
    if(topT.length){
      const t0=topT[0];
      const t0tp=t0.tp==='NorthNode'?'North Node':t0.tp;
      const t0np=t0.np==='NorthNode'?'North Node':t0.np==='Ascendant'?'Ascendant':t0.np==='MC'?'Midheaven':t0.np;
      const t0col=t0.aspect.type==='hard'?'var(--crimson)':t0.aspect.type==='easy'?'var(--emerald)':'var(--gold)';
      h+=`<div class="factor-line" onclick="openMechanic('mech-transits','transit','${t0.tp}-${t0.np}')">`;
      h+=`<div class="factor-icon">${pSVG(t0.tp,16,t0col)}</div>`;
      h+=`<div class="factor-text">${t0tp} ${t0.aspect.name} ${t0np} (${t0.aspect.orbActual.toFixed(1)}° orb, ${t0.aspect.motion})</div>`;
      h+=`<div class="factor-tag" style="background:${t0.aspect.type==='hard'?'rgba(200,40,60,.12)':'rgba(40,180,100,.12)'};color:${t0col}">${t0.aspect.type==='hard'?'Hard':t0.aspect.type==='easy'?'Flow':'Fuse'}</div>`;
      h+=`</div>`;
    }

    // Factor 5: Hour and day
    if(curHourHome||pHours){
      const dayR=pHours?pHours.dayRuler:'';
      const hourR=curHourHome?curHourHome.ruler:dayR;
      h+=`<div class="factor-line" onclick="openMechanic('mech-hours','hour','')">`;
      h+=`<div class="factor-icon">${pSVG(hourR,16,'var(--text2)')}</div>`;
      let hourText=`Day of ${dayR}.`;
      if(curHourHome)hourText+=` Hour of ${hourR} — ${curHourHome.minsLeft}m remaining.`;
      h+=`<div class="factor-text">${hourText}</div>`;
      h+=`<div class="factor-tag" style="background:rgba(155,109,255,.1);color:var(--text2)">Hour</div>`;
      h+=`</div>`;
    }

    // Factor 6: Notable retrograde/station (personal planets only)
    const personalRetros=retros.filter(r=>['Mercury','Venus','Mars'].includes(r));
    const personalStats=typeof stats!=='undefined'?stats.filter(s=>['Mercury','Venus','Mars','Jupiter','Saturn'].includes(s)):[];
    if(personalStats.length){
      h+=`<div class="factor-line" onclick="openMechanic('mech-transits','','')">`;
      h+=`<div class="factor-icon">${pSVG(personalStats[0],16,'var(--crimson)')}</div>`;
      h+=`<div class="factor-text">${personalStats[0]} is stationary — its themes are amplified to maximum intensity.</div>`;
      h+=`<div class="factor-tag" style="background:rgba(200,40,60,.12);color:var(--crimson)">Station</div>`;
      h+=`</div>`;
    } else if(personalRetros.length){
      h+=`<div class="factor-line" onclick="openMechanic('mech-transits','','')">`;
      h+=`<div class="factor-icon">${pSVG(personalRetros[0],16,'var(--text2)')}</div>`;
      h+=`<div class="factor-text">${personalRetros.join(', ')} retrograde — internal revision outpaces forward motion.</div>`;
      h+=`<div class="factor-tag" style="background:rgba(155,109,255,.1);color:var(--text2)">Rx</div>`;
      h+=`</div>`;
    }

    h+=`</div>`; // end factors-block
  }

  // ══════════ LAYER 3: MECHANICS (collapsed by default) ══════════
  h+=`<div class="mech-toggle" onclick="layersExpanded.l3=!layersExpanded.l3;renderApp()">`;
  h+=`${layersExpanded.l3?'Hide':'Show'} technique`;
  h+=`</div>`;
  h+=`<div id="layer3-mechanics" style="display:${layersExpanded.l3?'block':'none'}">`;

  // ═══ GROUP: TIMING ═══
  h+=`<div class="mech-group ${mechGroupOpen.timing?'open':''}">`;
  h+=`<div class="mech-group-head" onclick="toggleMechGroup('timing')"><div class="mech-group-title">Timing &amp; Hours</div><div class="mech-group-chev">&#9654;</div></div>`;
  h+=`<div class="mech-group-body">`;

  // ── Consult (always-visible preview, expandable) ──
  if(isToday){
    const consult=synthesizeConsult(transits,vibe,vocResult,moonSign,prof,pHours,isToday);
    if(consult){
      // Compact preview — always shown
      h+=`<div class="consult-preview${consultOpen?' open':''}" onclick="${consultOpen?'closeConsult()':'openConsult()'}">`;
      h+=`<div class="cp-pre-icon">${pSVG(consult.hourRuler,18,'var(--gold)')}</div>`;
      h+=`<div class="cp-pre-body">`;
      h+=`<div class="cp-pre-title">${consult.hourRuler} hour &middot; right now</div>`;
      h+=`<div class="cp-pre-line">${hourBrief(consult.hourRuler)}${vocResult.voc?' Moon is void — pause new starts.':''}</div>`;
      h+=`</div>`;
      h+=`<div class="cp-pre-mins"><div class="cp-pre-mins-num">${consult.minsLeft}</div><div class="cp-pre-mins-label">min left</div></div>`;
      h+=`<div class="cp-pre-chevron"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6,9 12,15 18,9"/></svg></div>`;
      h+=`</div>`;
      // Expanded panel — toggled
      if(consultOpen){
        h+=`<div class="consult-panel">`;
        h+=`<div class="cp-body">${consult.text}</div>`;
        h+=`<div class="cp-factors">`;
        h+=`<span class="cp-factor">${pSVG(consult.hourRuler,12,'var(--text2)')} ${consult.hourRuler} hour</span>`;
        h+=`<span class="cp-factor">${pSVG('Moon',12,'var(--text2)')} Moon ${consult.factors.moon}</span>`;
        h+=`<span class="cp-factor">${pSVG(prof.yearLord,12,'var(--text2)')} Year: ${prof.yearLord}</span>`;
        h+=`<span class="cp-factor">Vibe: ${consult.factors.vibe}/10</span>`;
        h+=`</div>`;
        const hp=consult.hourPurpose;
        if(hp.good){
          h+=`<div class="cp-hour">`;
          h+=`<div class="cp-hour-title">${consult.hourRuler} Hour — ${consult.minsLeft}min left</div>`;
          h+=`<div class="cp-hour-body"><strong style="color:var(--emerald)">Good for:</strong> ${hp.good}</div>`;
          h+=`<div class="cp-hour-body" style="margin-top:4px"><strong style="color:var(--crimson)">Avoid:</strong> ${hp.avoid}</div>`;
          h+=`</div>`;
        }
        h+=`</div>`;
      }
    }
  }

  // ── Consult v2: Event-aware pre-event consultation ──
  if(isToday&&typeof EVENT_TYPES!=='undefined'){
    if(!consultV2Open){
      h+=`<div style="margin:8px 0;text-align:center">`;
      h+=`<button onclick="openConsultV2()" style="background:var(--card);border:1px solid var(--gold-line);border-radius:8px;padding:8px 20px;color:var(--gold);font-size:12px;font-weight:600;cursor:pointer;letter-spacing:.3px">Consult the moment</button>`;
      h+=`</div>`;
    } else {
      h+=`<div style="background:var(--card);border:1px solid var(--gold-line);border-radius:10px;padding:14px;margin:8px 0">`;
      h+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">`;
      h+=`<div style="font-size:13px;font-weight:600;color:var(--gold)">Consult the moment</div>`;
      h+=`<button onclick="closeConsultV2()" style="background:none;border:none;color:var(--text2);font-size:18px;cursor:pointer;padding:0 4px">&times;</button>`;
      h+=`</div>`;

      // Step 1: Pick event type
      h+=`<div style="font-size:11px;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">What are you doing?</div>`;
      h+=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">`;
      for(const [key,et] of Object.entries(EVENT_TYPES)){
        const sel=consultEventType===key;
        h+=`<button onclick="pickConsultEvent('${key}')" style="background:${sel?'var(--gold-soft)':'var(--bg)'};border:1px solid ${sel?'var(--gold-line)':'var(--border)'};border-radius:6px;padding:8px 4px;cursor:pointer;text-align:center;transition:all .15s">`;
        h+=`<div>${pSVG(et.icon,16,sel?'var(--gold)':'var(--text2)')}</div>`;
        h+=`<div style="font-size:10px;color:${sel?'var(--gold)':'var(--text2)'};margin-top:3px;line-height:1.2">${et.label}</div>`;
        h+=`</button>`;
      }
      h+=`</div>`;

      // Step 2: Pick window
      h+=`<div style="font-size:11px;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">When?</div>`;
      h+=`<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">`;
      const windows=[['now','Now'],['next3h','Next 3h'],['today','Today'],['week','This week']];
      for(const [val,label] of windows){
        const sel=consultWindow===val;
        h+=`<button onclick="pickConsultWindow('${val}')" style="background:${sel?'var(--gold-soft)':'var(--bg)'};border:1px solid ${sel?'var(--gold-line)':'var(--border)'};border-radius:6px;padding:6px 12px;font-size:11px;color:${sel?'var(--gold)':'var(--text2)'};cursor:pointer">${label}</button>`;
      }
      h+=`</div>`;

      // Step 3: Involved charts (if any saved besides Alexander)
      const otherCharts=savedCharts.filter(c=>c.id!=='alexander');
      if(otherCharts.length>0){
        h+=`<div style="font-size:11px;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">Who's involved? (optional)</div>`;
        h+=`<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">`;
        for(const c of otherCharts){
          const sel=consultInvolved.includes(c.id);
          h+=`<button onclick="toggleConsultInvolved('${c.id}')" style="background:${sel?'var(--gold-soft)':'var(--bg)'};border:1px solid ${sel?'var(--gold-line)':'var(--border)'};border-radius:6px;padding:5px 10px;font-size:11px;color:${sel?'var(--gold)':'var(--text2)'};cursor:pointer">${c.name}</button>`;
        }
        h+=`</div>`;
      }

      // Step 4: Free text
      h+=`<div style="margin-bottom:12px">`;
      h+=`<input type="text" placeholder="Context (optional): e.g. first call with new investor" oninput="onConsultFreeText(this.value)" value="${consultFreeText.replace(/"/g,'&quot;')}" style="width:100%;box-sizing:border-box;background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:12px;color:var(--text);outline:none">`;
      h+=`</div>`;

      // Generate button
      const canGenerate=consultEventType&&!consultLoading&&loadClaudeKey();
      h+=`<button onclick="runConsult()" ${canGenerate?'':'disabled'} style="width:100%;background:${canGenerate?'var(--gold)':'var(--border)'};border:none;border-radius:8px;padding:10px;font-size:13px;font-weight:600;color:${canGenerate?'#000':'var(--text2)'};cursor:${canGenerate?'pointer':'default'};transition:all .15s">`;
      h+=consultLoading?'Reading the moment...':(!loadClaudeKey()?'Set API key first':'Generate consult');
      h+=`</button>`;

      // Error
      if(consultError){
        h+=`<div style="margin-top:8px;padding:8px;background:rgba(200,40,60,.1);border-radius:6px;font-size:12px;color:var(--crimson)">${consultError}</div>`;
      }

      // Result
      if(consultResult){
        h+=`<div style="margin-top:12px;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px">`;
        h+=`<div style="font-size:13px;color:var(--text);line-height:1.7">${consultResult.text}</div>`;
        h+=`<div style="margin-top:8px;font-size:10px;color:var(--text2)">Haiku &middot; $${(consultResult.cost||0).toFixed(4)} &middot; ${new Date(consultResult.ts).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</div>`;
        h+=`</div>`;
      }

      h+=`</div>`;
    }
  }

  // ── Hour Clock (Phase 5) ──
  if(pHours&&isToday){
    const utNowClock=now.getUTCHours()+now.getUTCMinutes()/60;
    const curIdxClock=currentHourIndex(pHours.hours,utNowClock);
    const moonLonClock=cur.Moon;
    const sunLonClock=cur.Sun;
    const mansionClock=typeof computeMansion==='function'?computeMansion(moonLonClock):null;
    const decanClock=typeof computeDecan==='function'?computeDecan(sunLonClock):null;
    const moonSignClock=SIGNS[Math.floor(moonLonClock/30)];
    const moonDeg=(moonLonClock%30).toFixed(0);
    const phaseAngleClock=((moonLonClock-sunLonClock+360)%360);
    const illum=Math.round((1-Math.cos(phaseAngleClock*Math.PI/180))/2*100);
    const phaseNameClock=typeof moonPhase==='function'?moonPhase(phaseAngleClock):'';

    h+=`<div id="mech-hours" style="text-align:center;padding:8px 0">`;
    // Build SVG
    const S=280,C=S/2,R1=130,R2=108,R3=88,R4=68,R5=50;
    let svg=`<svg viewBox="0 0 ${S} ${S}" width="${S}" style="max-width:100%">`;

    // Helper: arc path for a segment
    function arcSeg(cx,cy,rOuter,rInner,startDeg,endDeg){
      const sa=startDeg*Math.PI/180,ea=endDeg*Math.PI/180;
      const x1=cx+rOuter*Math.cos(sa),y1=cy+rOuter*Math.sin(sa);
      const x2=cx+rOuter*Math.cos(ea),y2=cy+rOuter*Math.sin(ea);
      const x3=cx+rInner*Math.cos(ea),y3=cy+rInner*Math.sin(ea);
      const x4=cx+rInner*Math.cos(sa),y4=cy+rInner*Math.sin(sa);
      const la=(endDeg-startDeg)>180?1:0;
      return `M${x1},${y1} A${rOuter},${rOuter} 0 ${la},1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 ${la},0 ${x4},${y4} Z`;
    }

    // Outer ring: 24 planetary hours
    for(let i=0;i<24;i++){
      const startA=-90+(i*15);
      const endA=startA+15;
      const isCur=i===curIdxClock;
      const hr=pHours.hours[i];
      const fill=isCur?'var(--gold)':hr.isDay?'rgba(255,255,255,.06)':'rgba(0,0,0,.2)';
      const stroke=isCur?'var(--gold)':'rgba(255,255,255,.12)';
      svg+=`<path d="${arcSeg(C,C,R1,R2,startA,endA)}" fill="${fill}" stroke="${stroke}" stroke-width="0.5" opacity="${isCur?1:0.8}"/>`;
      // Glyph label at midpoint
      const midA=(startA+7.5)*Math.PI/180;
      const gR=(R1+R2)/2;
      const gx=C+gR*Math.cos(midA);
      const gy=C+gR*Math.sin(midA);
      const glyphCol=isCur?'#000':'var(--text2)';
      svg+=`<text x="${gx}" y="${gy}" text-anchor="middle" dominant-baseline="central" font-size="8" fill="${glyphCol}" font-weight="${isCur?'700':'400'}">${hr.ruler.slice(0,2)}</text>`;
    }

    // Middle ring: 28 lunar mansions
    if(mansionClock){
      const mArc=360/28;
      for(let i=0;i<28;i++){
        const startA=-90+(i*mArc);
        const endA=startA+mArc;
        const isCur=(i+1)===mansionClock.index;
        const fill=isCur?'rgba(155,109,255,.5)':'rgba(155,109,255,.08)';
        svg+=`<path d="${arcSeg(C,C,R2-1,R3,startA,endA)}" fill="${fill}" stroke="rgba(155,109,255,.15)" stroke-width="0.3"/>`;
        if(isCur){
          const midA2=(startA+mArc/2)*Math.PI/180;
          const tR=(R2+R3)/2;
          svg+=`<text x="${C+tR*Math.cos(midA2)}" y="${C+tR*Math.sin(midA2)}" text-anchor="middle" dominant-baseline="central" font-size="7" fill="var(--violet)" font-weight="600">${mansionClock.index}</text>`;
        }
      }
    }

    // Inner ring: 36 decans (show all, highlight current Sun decan)
    if(decanClock){
      const dArc=10;
      for(let i=0;i<36;i++){
        const startA=-90+(i*dArc);
        const endA=startA+dArc;
        const signIdx=Math.floor(i/3);
        const decanInSign=i%3;
        const isCur=(SIGNS[signIdx]===decanClock.signName&&decanInSign===decanClock.decanIdx);
        const fill=isCur?'rgba(var(--gold-rgb,212,175,55),.4)':'rgba(255,255,255,.03)';
        svg+=`<path d="${arcSeg(C,C,R3-1,R4,startA,endA)}" fill="${isCur?'rgba(212,175,55,.35)':fill}" stroke="rgba(255,255,255,.08)" stroke-width="0.3"/>`;
      }
    }

    // Center: Moon info
    const moonPhaseSvgStr=typeof renderMoonSVG==='function'?renderMoonSVG(phaseAngleClock,24):'';
    svg+=`<circle cx="${C}" cy="${C}" r="${R5}" fill="var(--card)" stroke="rgba(255,255,255,.1)" stroke-width="0.5"/>`;
    // Moon text info (can't embed HTML SVGs easily, so use text)
    svg+=`<text x="${C}" y="${C-12}" text-anchor="middle" font-size="10" fill="var(--bright)" font-weight="600">${moonSignClock}</text>`;
    svg+=`<text x="${C}" y="${C+2}" text-anchor="middle" font-size="14" fill="var(--gold)" font-weight="700">${moonDeg}deg</text>`;
    svg+=`<text x="${C}" y="${C+16}" text-anchor="middle" font-size="8" fill="var(--text2)">${illum}% ${phaseNameClock}</text>`;

    // Current hour gold radial bar
    if(curIdxClock>=0){
      const curHrClock=pHours.hours[curIdxClock];
      const nextHrClock=pHours.hours[(curIdxClock+1)%24];
      const elapsed=utNowClock-curHrClock.start;
      let duration=nextHrClock.start-curHrClock.start;
      if(duration<=0)duration+=24;
      const pct=Math.min(elapsed/duration,1);
      const handA=(-90+curIdxClock*15+pct*15)*Math.PI/180;
      svg+=`<line x1="${C+R4*Math.cos(handA)}" y1="${C+R4*Math.sin(handA)}" x2="${C+R1*Math.cos(handA)}" y2="${C+R1*Math.sin(handA)}" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" opacity="0.8"/>`;
    }

    svg+=`</svg>`;
    h+=svg;

    // Legend line
    const curHrName=pHours.hours[curIdxClock]?pHours.hours[curIdxClock].ruler:'';
    h+=`<div style="font-size:11px;color:var(--text2);margin-top:6px">`;
    const legendParts=[`Hour of ${curHrName}`,mansionClock?`Mansion ${mansionClock.index}`:'',decanClock?`${decanClock.signName} decan ${decanClock.decanNum}`:''].filter(Boolean);
    h+=legendParts.join(' &middot; ');
    h+=`</div>`;
    h+=`</div>`;
  }

  // ── Planetary Hours Strip (detail view — hidden when clock is shown) ──
  if(pHours&&!isToday){
    const utNow=isToday?now.getUTCHours()+now.getUTCMinutes()/60:12;
    const curIdx=currentHourIndex(pHours.hours,utNow);
    h+=`<div class="hours-strip" id="mech-hours-strip">`;
    // Now-highlight block
    if(isToday && curIdx>=0 && curIdx<24){
      const curHr=pHours.hours[curIdx];
      const nextHr=pHours.hours[(curIdx+1)%24];
      const hpNowBrief=hourBrief(curHr.ruler);
      const hpNowGood=hourGood(curHr.ruler);
      const hpNowAvoid=hourAvoid(curHr.ruler);
      // Minutes left in current hour
      const utNow2=now.getUTCHours()+now.getUTCMinutes()/60;
      let minsLeft=Math.round((nextHr.start-utNow2)*60);
      if(minsLeft<0)minsLeft+=24*60;
      h+=`<div class="hours-now ${hourNowExpanded?'open':''}" onclick="toggleHourNow()">`;
      h+=`<div class="hours-now-glyph">${pSVG(curHr.ruler,22,'var(--gold)')}</div>`;
      h+=`<div class="hours-now-body">`;
      h+=`<div class="hours-now-label">Right Now · Hour of ${curHr.ruler} <span class="section-chev ${hourNowExpanded?'open':''}">&#9654;</span></div>`;
      h+=`<div class="hours-now-title">${hpNowBrief?hpNowBrief.split('.')[0]+'.':curHr.ruler+' hour'}</div>`;
      if(hpNowBrief){
        const rest=hpNowBrief.split('.').slice(1).join('.').trim();
        if(rest)h+=`<div class="hours-now-intent">${rest}</div>`;
      }
      h+=`</div>`;
      h+=`<div class="hours-now-time">${fmtHourTime(curHr.start)}<div class="hours-now-mins">${minsLeft}m left</div></div>`;
      h+=`</div>`;
      if(hourNowExpanded){
        h+=`<div class="hours-now-detail">`;
        if(hpNowGood)h+=`<div class="hnd-row"><span class="hnd-k good">Good for</span><span class="hnd-v">${hpNowGood}</span></div>`;
        if(hpNowAvoid)h+=`<div class="hnd-row"><span class="hnd-k bad">Avoid</span><span class="hnd-v">${hpNowAvoid}</span></div>`;
        h+=`<div class="hnd-row"><span class="hnd-k">Next</span><span class="hnd-v">${pSVG(nextHr.ruler,12,'var(--text2)')} ${nextHr.ruler} hour at ${fmtHourTime(nextHr.start)} — ${hourBrief(nextHr.ruler)}</span></div>`;
        h+=`</div>`;
      }
    }
    h+=`<div class="hours-label"><span>Planetary Hours · Day of ${pHours.dayRuler} <span class="help" onclick="event.stopPropagation();showTip('Planetary Hours')">?</span></span>`;
    h+=`<span class="sun-times">${fmtHourTime(pHours.sunrise)} - ${fmtHourTime(pHours.sunset)}</span></div>`;
    h+=`<div class="hours-row" id="hours-row">`;
    for(let i=0;i<24;i++){
      const hr=pHours.hours[i];
      const isCur=i===curIdx&&isToday;
      const cls=isCur?'hour-cell current':hr.isDay?'hour-cell':'hour-cell night';
      h+=`<div class="${cls}">`;
      h+=`<div class="h-time">${fmtHourTime(hr.start)}</div>`;
      h+=`<div class="h-ruler">${pSVG(hr.ruler,16,isCur?'var(--gold)':'var(--text2)')}</div>`;
      h+=`<div class="h-name">${hr.ruler}</div></div>`;
    }
    h+=`</div></div>`;
  }

  // ── Electional Micro-Tool ("Choose a time") ──
  if(isToday&&!electionalOpen){
    h+=`<div class="elect-btn" onclick="openElectional()">`;
    h+=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`;
    h+=`Choose a time for something</div>`;
  }
  if(electionalOpen&&isToday){
    h+=`<div class="elect-panel">`;
    h+=`<button class="ep-close" onclick="closeElectional()">&times;</button>`;
    h+=`<div class="ep-title">${pSVG('Jupiter',14,'var(--violet)')} Elect a Time</div>`;
    h+=`<div class="ep-hint">What do you want to do? I'll find the three best windows in the next week.</div>`;
    h+=`<div class="elect-tasks">`;
    for(const [key,t] of Object.entries(ELECTIONAL_TASKS)){
      const sel=electionalTask===key?' selected':'';
      h+=`<div class="elect-task${sel}" onclick="pickElectionalTask('${key}')">${t.label}</div>`;
    }
    h+=`</div>`;
    if(electionalTask&&electionalResults){
      const t=ELECTIONAL_TASKS[electionalTask];
      h+=`<div style="font-size:11px;color:var(--text3);margin-bottom:6px;line-height:1.5"><em>${t.notes}</em></div>`;
      if(electionalResults.length===0){
        h+=`<div style="font-size:12px;color:var(--text2);padding:10px">No clearly favorable windows found in the next week. Consider waiting, or proceed with the best available hour.</div>`;
      } else {
        h+=`<div class="elect-windows">`;
        for(let i=0;i<electionalResults.length;i++){
          const w=electionalResults[i];
          const rankCls=i===0?'':i===1?'rank2':'rank3';
          const poorCls=w.score<55?' poor':'';
          const scoreCls=w.score>=70?'':w.score>=55?'mid':'low';
          h+=`<div class="elect-window ${rankCls}${poorCls}">`;
          h+=`<div class="ew-head">`;
          h+=`<div class="ew-when">${pSVG(w.ruler,14,'var(--bright)')} ${fmtElectionalWhen(w.date)} · ${w.durMin}min</div>`;
          h+=`<div class="ew-score ${scoreCls}">${w.score}</div>`;
          h+=`</div>`;
          if(w.reasons.length)h+=`<div class="ew-reasons">${w.reasons.join('. ')}.</div>`;
          h+=`<div class="ew-factors">`;
          for(const f of w.factors){
            h+=`<span class="ew-chip ${f.type}">${f.label}</span>`;
          }
          h+=`</div>`;
          h+=`</div>`;
        }
        h+=`</div>`;
      }
    }
    h+=`</div>`;
  }

  // Alerts — reframed as recommendations
  if(retros.length||stats.length||ingresses.length){
    h+=`<div class="alerts">`;
    for(const p of stats){
      const sp=SPHERE[p]||{};
      h+=`<div class="pill station" onclick="showTip('STATION_REC')">${pSVG(p,14,'var(--amber)')} ${p}: high intensity<span class="help">?</span></div>`;
    }
    for(const p of retros){
      const retroPillV={Mercury:['Review, don\'t launch','Rethink before acting','Revisit, don\'t initiate'],Venus:['Reflect on values','Reassess desires','Old flames, old questions'],Mars:['Conserve energy','Don\'t force outcomes','Redirect, don\'t charge']};
      const recPool=retroPillV[p];
      const recTxt=recPool?pick(recPool,todaySeed()):`${p}: revision season`;
      h+=`<div class="pill retro" onclick="showTip('RETRO_REC_${p}')">${pSVG(p,14,'var(--crimson)')} ${recTxt}<span class="help">?</span></div>`;
    }
    for(const ig of ingresses)h+=`<div class="pill ingress">${pSVG(ig.planet,14,'var(--emerald)')} ${sSVG(ig.sign,13,'var(--emerald)')} shift in ${ig.days}d</div>`;
    h+=`</div>`;
  }

  // 7-Day Forecast Strip
  const forecast=cachedForecast(jd);
  h+=`<div class="forecast">`;
  for(const fd of forecast){
    const sel=fd.offset===0?'sel':'';
    const barH=Math.max(8,fd.score*4);
    const color=fd.score>=7?'var(--azure)':fd.score<=3?'var(--crimson)':'var(--gold)';
    h+=`<div class="forecast-day ${sel}" onclick="dayOffset+=${fd.offset};renderApp()">`;
    h+=`<div class="fd-name">${days[fd.date.getDay()]}</div>`;
    h+=`<div class="fd-num">${fd.date.getDate()}</div>`;
    h+=`<div class="fd-bar" style="height:${barH}px;background:${color};width:6px;border-radius:3px"></div>`;
    h+=`<div class="fd-score" style="color:${color}">${fd.score}</div>`;
    h+=`</div>`;
  }
  h+=`</div>`;

  // Energy Meter (expandable — arc ring + tone word, tap for breakdown)
  {
    const eColor=vibe.score>=7?'var(--azure)':vibe.score<=3?'var(--crimson)':'var(--gold)';
    const eTone=vibe.score>=8?'Bright':vibe.score>=6?'Favorable':vibe.score>=4?'Mixed':vibe.score>=2?'Demanding':'Hard';
    const eBrief=vibe.dominant?`Dominant: ${vibe.dominant}`:'';
    const C=2*Math.PI*18;const frac=Math.max(0,Math.min(1,vibe.score/10));
    h+=`<div class="energy" onclick="toggleTone()" style="cursor:pointer">`;
    h+=`<div class="energy-ring">`;
    h+=`<svg viewBox="0 0 44 44">`;
    h+=`<circle cx="22" cy="22" r="18" stroke="var(--surface)" stroke-width="3" fill="none"/>`;
    h+=`<circle class="energy-ring-arc" cx="22" cy="22" r="18" stroke="${eColor}" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-frac)}" style="--ring-full:${C};--ring-target:${C*(1-frac)}"/>`;
    h+=`</svg>`;
    h+=`<div class="energy-ring-num" style="color:${eColor}">${vibe.score}</div>`;
    h+=`</div>`;
    h+=`<div class="energy-body">`;
    h+=`<div class="energy-label">Tone of the Day <span class="help" onclick="event.stopPropagation();showTip('Energy Score')">?</span></div>`;
    h+=`<div class="energy-tone" style="color:${eColor}">${eTone}</div>`;
    if(eBrief)h+=`<div class="energy-context">${eBrief} · ${toneExpanded?'tap to collapse':'tap for breakdown'}</div>`;
    else h+=`<div class="energy-context">${toneExpanded?'tap to collapse':'tap for breakdown'}</div>`;
    h+=`</div>`;
    h+=`</div>`;
    if(toneExpanded){
      h+=`<div class="tone-detail">`;
      if(vibe.positives&&vibe.positives.length){
        h+=`<div class="tone-row"><div class="tone-row-label" style="color:var(--emerald)">Lifting today</div>`;
        for(const x of vibe.positives)h+=`<div class="tone-item"><span class="tone-dot" style="background:var(--emerald)"></span>${x.label}</div>`;
        h+=`</div>`;
      }
      if(vibe.negatives&&vibe.negatives.length){
        h+=`<div class="tone-row"><div class="tone-row-label" style="color:var(--crimson)">Pulling down</div>`;
        for(const x of vibe.negatives)h+=`<div class="tone-item"><span class="tone-dot" style="background:var(--crimson)"></span>${x.label}</div>`;
        h+=`</div>`;
      }
      if(vibe.dominant){
        const domFlav=domFlavor(vibe.dominant);
        if(domFlav)h+=`<div class="tone-narrative">${domFlav}</div>`;
      }
      if(!vibe.positives?.length&&!vibe.negatives?.length){
        h+=`<div class="tone-narrative">A quiet day — few active transits. Good for rest and working at your own pace.</div>`;
      }
      h+=`</div>`;
    }
    // Actionable tone guidance — planet-specific where possible
    const tGuid=(function(){
      const dom=vibe.dominant;
      if(vibe.score>=7){return (dom&&TONE_PLANET_HIGH[dom])?TONE_PLANET_HIGH[dom]:pick(TONE_GENERIC_HIGH,todaySeed());}
      if(vibe.score>=4){return (dom&&TONE_PLANET_MID[dom])?TONE_PLANET_MID[dom]:pick(TONE_GENERIC_MID,todaySeed());}
      return (dom&&TONE_PLANET_LOW[dom])?TONE_PLANET_LOW[dom]:pick(TONE_GENERIC_LOW,todaySeed());
    })();
    h+=`<div style="font-size:12px;line-height:1.6;color:var(--text);padding:6px 16px 10px;margin-top:-4px;opacity:.85"><em>${tGuid}</em></div>`;
  }

  h+=`</div></div>`; // end timing group

  // ═══ GROUP: POSITIONS ═══
  h+=`<div class="mech-group ${mechGroupOpen.positions?'open':''}">`;
  h+=`<div class="mech-group-head" onclick="toggleMechGroup('positions')"><div class="mech-group-title">Positions &amp; Sky</div><div class="mech-group-chev">&#9654;</div></div>`;
  h+=`<div class="mech-group-body">`;

  // ── Profection Row (tap chip for detail panel; tap ? for glossary) ──
  h+=`<div class="profection-row" id="mech-profections">`;
  const yearLordActive=transits.some(t=>(t.tp===prof.yearLord||t.np===prof.yearLord)&&t.importance>10);
  const ylaHtml=yearLordActive?`<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--emerald);margin-left:4px;vertical-align:middle;box-shadow:0 0 4px var(--emerald)"></span>`:'';
  h+=`<div class="prof-chip ${profExpanded==='year'?'open':''}" onclick="toggleProf('year')"><div><div class="prof-label">Year${ylaHtml} <span class="help" onclick="event.stopPropagation();showTip('Profection')">?</span></div><div class="prof-val">${pSVG(prof.yearLord,14,'var(--gold)')} ${prof.yearSign}</div></div></div>`;
  h+=`<div class="prof-chip ${profExpanded==='month'?'open':''}" onclick="toggleProf('month')"><div><div class="prof-label">Month <span class="help" onclick="event.stopPropagation();showTip('Profection')">?</span></div><div class="prof-val">${pSVG(prof.monthLord,14,'var(--violet)')} ${prof.monthSign}</div></div></div>`;
  h+=`<div class="prof-chip ${profExpanded==='sect'?'open':''}" onclick="toggleProf('sect')"><div><div class="prof-label">Sect Light <span class="help" onclick="event.stopPropagation();showTip('Sect Light')">?</span></div><div class="prof-val">${pSVG(SECT.sectLight,14,'var(--azure)')} ${SECT.sectLight}</div></div></div>`;
  h+=`</div>`;
  if(profExpanded){
    h+=`<div class="prof-detail">`;
    if(profExpanded==='year'){
      h+=`<div class="prof-detail-head">Year ${prof.ageYears} · Profected to ${prof.yearSign}, ruled by ${prof.yearLord}</div>`;
      const annTheme=ANNUAL_THEME[prof.yearSign]||'';
      if(annTheme)h+=`<div style="font-size:13px;line-height:1.6;color:var(--bright);padding:8px 12px;margin-bottom:8px;border-radius:var(--r-sm);background:rgba(212,168,67,.08);border-left:2px solid var(--gold);font-style:italic">${annTheme}</div>`;
      h+=`<div class="prof-detail-body">${(function(){
        const YL={Sun:'The Sun is your Time Lord — your identity, authority, and life direction set the year\'s main thread. Visibility increases. What you do this year defines how others see you.',Moon:'The Moon is your Time Lord — emotional life, family, domestic needs, and instinctive responses drive the year. Inner security matters more than outer achievement.',Mercury:'Mercury is your Time Lord — communication, learning, commerce, and daily mental activity drive the year. Information is your currency. Expect more writing, meetings, and decisions.',Venus:'Venus is your Time Lord — relationships, pleasure, beauty, and values set the year\'s tone. Love, art, and money are foregrounded. What you attract reflects what you value.',Mars:'Mars is your Time Lord — drive, conflict, courage, and physical energy dominate. The year demands action and initiative. Passivity is not an option. Channel the fire deliberately.',Jupiter:'Jupiter is your Time Lord — expansion, faith, opportunity, and generosity drive the year. Doors open. The risk is overextension. Growth is available in the areas Jupiter touches.',Saturn:'Saturn is your Time Lord — discipline, limitation, accountability, and long-term building define the year. What isn\'t working gets exposed. What is load-bearing gets stronger.'};
        return (YL[prof.yearLord]||('The '+prof.yearLord+' becomes your Time Lord — its themes are foregrounded this year.'))+' Watch where '+prof.yearLord+' is currently transiting for the year\'s main thread.';
      })()}</div>`;
      // Show year lord's current position and any active transits involving it
      if(cur[prof.yearLord]!==undefined){
        const ylSign=signOf(cur[prof.yearLord]);
        const ylHouse=houseOf(cur[prof.yearLord]);
        const ylDig=getDignity(prof.yearLord,cur[prof.yearLord]);
        const ylMs=motionStatus(prof.yearLord,jd);
        const ylRx=ylMs.retrograde?' (retrograde)':ylMs.stationary?' (stationary)':'';
        h+=`<div style="margin-top:6px;padding:8px 10px;border-radius:var(--r-sm);background:rgba(212,168,67,.06);border-left:2px solid var(--gold)">`;
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--gold);margin-bottom:4px">${prof.yearLord} right now</div>`;
        h+=`<div style="font-size:12px;color:var(--text)">${pSVG(prof.yearLord,14,'var(--gold)')} ${ylSign.name} ${ylSign.degree}° · House ${ylHouse}${ylDig?' · '+ylDig.label:''}${ylRx}</div>`;
        const ylTransits=transits.filter(t=>t.tp===prof.yearLord||t.np===prof.yearLord);
        if(ylTransits.length>0){
          for(const yt of ylTransits.slice(0,3)){
            const other=yt.tp===prof.yearLord?yt.np:yt.tp;
            h+=`<div style="font-size:11px;color:var(--text2);margin-top:3px">${yt.aspect.name} natal ${other} (${yt.aspect.orbActual.toFixed(1)}°, ${yt.aspect.motion})</div>`;
          }
        }
        h+=`</div>`;
      }
    } else if(profExpanded==='month'){
      h+=`<div class="prof-detail-head">This month · Profected to ${prof.monthSign}, ruled by ${prof.monthLord}</div>`;
      const mTheme=MONTH_THEME[prof.monthSign]||'';
      if(mTheme)h+=`<div style="font-size:13px;line-height:1.6;color:var(--bright);padding:8px 12px;margin-bottom:8px;border-radius:var(--r-sm);background:rgba(155,109,255,.08);border-left:2px solid var(--violet);font-style:italic">${mTheme}</div>`;
      h+=`<div class="prof-detail-body">${(function(){
        const ML={Sun:'The Sun as monthly lord puts your identity, authority, and visibility center stage this month. Lead from the front.',Moon:'The Moon as monthly lord makes this an emotionally driven month. Home, family, and inner security need attention. Trust feeling over strategy.',Mercury:'Mercury as monthly lord makes this a month of communication, learning, and movement. Information flows fast — process it deliberately.',Venus:'Venus as monthly lord foregrounds relationships, beauty, and values this month. Social life activates. Attract rather than pursue.',Mars:'Mars as monthly lord injects urgency and drive. This month demands action — passivity creates frustration. Move your body and your agenda.',Jupiter:'Jupiter as monthly lord opens doors this month. Say yes to more. Growth, opportunity, and generosity are themes. The risk is excess.',Saturn:'Saturn as monthly lord brings seriousness and accountability this month. Do the hard thing first. Structure protects you.'};
        return (ML[prof.monthLord]||('The monthly lord '+prof.monthLord+' colors this month\'s texture — sub-themes, people, events that echo its nature.'))+' When '+prof.monthLord+' is active in transits, the month\'s sub-plot intensifies.';
      })()}</div>`;
      // Monthly lord current position + transits
      if(cur[prof.monthLord]!==undefined){
        const mlSign=signOf(cur[prof.monthLord]);
        const mlHouse=houseOf(cur[prof.monthLord]);
        const mlDig=getDignity(prof.monthLord,cur[prof.monthLord]);
        const mlMs=motionStatus(prof.monthLord,jd);
        const mlRx=mlMs.retrograde?' (retrograde)':mlMs.stationary?' (stationary)':'';
        h+=`<div style="margin-top:6px;padding:8px 10px;border-radius:var(--r-sm);background:rgba(155,109,255,.06);border-left:2px solid var(--violet)">`;
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--violet);margin-bottom:4px">${prof.monthLord} right now</div>`;
        h+=`<div style="font-size:12px;color:var(--text)">${pSVG(prof.monthLord,14,'var(--violet)')} ${mlSign.name} ${mlSign.degree}° · House ${mlHouse}${mlDig?' · '+mlDig.label:''}${mlRx}</div>`;
        const mlTransits=transits.filter(t=>t.tp===prof.monthLord||t.np===prof.monthLord);
        if(mlTransits.length>0){
          for(const mt of mlTransits.slice(0,3)){
            const other=mt.tp===prof.monthLord?mt.np:mt.tp;
            h+=`<div style="font-size:11px;color:var(--text2);margin-top:3px">${mt.aspect.name} natal ${other} (${mt.aspect.orbActual.toFixed(1)}°, ${mt.aspect.motion})</div>`;
          }
        }
        h+=`</div>`;
      }
    } else if(profExpanded==='sect'){
      h+=`<div class="prof-detail-head">Your Sect Light · ${SECT.sectLight} (${SECT.isNocturnal?'Nocturnal':'Diurnal'} chart)</div>`;
      h+=`<div class="prof-detail-body">Born with the ${SECT.isNocturnal?'Sun below':'Sun above'} the horizon, your core vitality is guided by the ${SECT.sectLight}. The ${SECT.sectLight}'s condition in your natal chart is the single most important significator of your overall fortunes — treat its transits and progressions with extra weight.</div>`;
      // Current transits to the sect light
      const slTransits=transits.filter(t=>t.np===SECT.sectLight);
      if(slTransits.length>0){
        h+=`<div style="margin-top:8px;padding:8px 10px;border-radius:var(--r-sm);background:rgba(74,158,255,.06);border-left:2px solid var(--azure)">`;
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--azure);margin-bottom:4px">Active transits to your ${SECT.sectLight}</div>`;
        for(const st of slTransits.slice(0,3)){
          h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:2px">${pSVG(st.tp,12,'var(--text2)')} ${st.tp} ${st.aspect.name} (${st.aspect.orbActual.toFixed(1)}°, ${st.aspect.motion}) — ${st.interp?st.interp.summary:''}</div>`;
        }
        h+=`</div>`;
      }
    }
    h+=`</div>`;
  }

  // ── Sun Position Card (expandable) ──
  {
    const sunSign=signOf(cur.Sun);
    const sunHouse=houseOf(cur.Sun);
    const sunHv=HOUSE_VOICE[sunHouse]||{};
    const sunDig=getDignity('Sun',cur.Sun);
    const sunDec=computeDecan(cur.Sun);
    const sunDecMeaning=sunDec.meaning?sunDec.meaning.replace(/^[A-Za-z]+ in [A-Za-z]+ decan \d+\.\s*/,''):'';
    h+=`<div id="mech-sun" style="padding:14px 16px;margin-bottom:10px;border-radius:var(--r-lg);background:var(--card);border:1px solid var(--hairline);cursor:pointer" onclick="toggleSunCard()">`;
    h+=`<div style="display:flex;align-items:center;gap:12px">`;
    h+=`<div style="flex-shrink:0">${pSVG('Sun',28,'var(--gold)')}</div>`;
    h+=`<div style="flex:1;min-width:0">`;
    h+=`<div style="font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--gold);margin-bottom:3px">Sun in ${sunSign.name} ${sSVG(sunSign.name,13,'var(--gold)')}</div>`;
    h+=`<div style="font-size:13px;color:var(--bright)">${sunSign.degree}° · House ${sunHouse}${sunHv.name?' · '+sunHv.name:''}${sunDig?' · '+sunDig.label:''}</div>`;
    h+=`<div style="font-size:11px;color:var(--text2);margin-top:3px">Decan ${sunDec.decanNum}: ${sunDec.card} — ${sunDec.title}</div>`;
    h+=`</div>`;
    h+=`<div style="flex-shrink:0;color:var(--text3);transition:transform .2s${sunCardExpanded?';transform:rotate(180deg)':''}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6,9 12,15 18,9"/></svg></div>`;
    h+=`</div>`;
    if(sunCardExpanded){
      h+=`<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--hairline)">`;
      // House context
      if(sunHv.desc){
        const sunPIH=planetInHouse('Sun',sunHouse);
        h+=`<div style="font-size:12px;line-height:1.6;color:var(--text);margin-bottom:8px"><strong style="color:var(--gold)">House ${sunHouse} — ${sunHv.name}:</strong> ${sunPIH||houseVoiceDesc(sunHouse)}</div>`;
      }
      // Dignity
      if(sunDig)h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:8px"><strong style="color:var(--gold)">${sunDig.label}:</strong> ${sunDig.desc}</div>`;
      // Decan meaning
      if(sunDecMeaning)h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:8px"><strong style="color:var(--gold)">Decan ${sunDec.decanNum} (${sunDec.card}):</strong> ${sunDecMeaning}</div>`;
      // Active transits to natal Sun
      const sunTransits=transits.filter(t=>t.np==='Sun');
      if(sunTransits.length>0){
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--gold);margin:8px 0 4px">Transits to your Sun</div>`;
        for(const st of sunTransits.slice(0,4)){
          h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:4px">${pSVG(st.tp,12,'var(--text2)')} ${st.tp} ${st.aspect.name} (${st.aspect.orbActual.toFixed(1)}°, ${st.aspect.motion}) — ${st.interp?st.interp.summary:''}</div>`;
        }
      }
      h+=`</div>`;
    }
    h+=`</div>`;
  }

  // ── Moon Position Card (unified: phase + sign + decan + mansion) ──
  {
    const illum=Math.round((1-Math.cos(phaseAngle*Math.PI/180))/2*100);
    const moonHouse=houseOf(cur.Moon);
    const mhv=HOUSE_VOICE[moonHouse]||{};
    const moonDig=getDignity('Moon',cur.Moon);
    const moonDecan=computeDecan(cur.Moon);
    const moonDecMeaning=moonDecan.meaning?moonDecan.meaning.replace(/^[A-Za-z]+ in [A-Za-z]+ decan \d+\.\s*/,''):'';
    const msf=moonSignPhaseText(moonSign.name,mPhase.name);
    const mansion=computeMansion(cur.Moon);

    h+=`<div id="mech-moon" style="padding:14px 16px;margin-bottom:10px;border-radius:var(--r-lg);background:var(--card);border:1px solid var(--hairline);cursor:pointer" onclick="toggleMoon()">`;
    h+=`<div style="display:flex;align-items:center;gap:12px">`;
    h+=`<div style="flex-shrink:0">${renderMoonSVG(phaseAngle,36)}</div>`;
    h+=`<div style="flex:1;min-width:0">`;
    h+=`<div style="font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--violet);margin-bottom:3px">Moon in ${moonSign.name} ${sSVG(moonSign.name,13,'var(--violet)')}</div>`;
    h+=`<div style="font-size:13px;color:var(--bright)">${signOf(cur.Moon).degree}° · House ${moonHouse}${mhv.name?' · '+mhv.name:''}${moonDig?' · '+moonDig.label:''}</div>`;
    h+=`<div style="font-size:11px;color:var(--text2);margin-top:3px">${mPhase.name} · ${illum}% lit · Decan ${moonDecan.decanNum}: ${moonDecan.card}</div>`;
    h+=`</div>`;
    h+=`<div style="flex-shrink:0;color:var(--text3);transition:transform .2s${moonExpanded?';transform:rotate(180deg)':''}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6,9 12,15 18,9"/></svg></div>`;
    h+=`</div>`;
    if(moonExpanded){
      h+=`<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--hairline)">`;
      // Phase + sign flavor
      if(msf)h+=`<div style="font-size:12px;line-height:1.6;color:var(--text);margin-bottom:8px">${msf}</div>`;
      // House context
      if(mhv.name){const moonPIH=planetInHouse('Moon',moonHouse);h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:8px"><strong style="color:var(--violet)">House ${moonHouse} — ${mhv.name}:</strong> ${moonPIH||houseVoiceDesc(moonHouse)}</div>`;}
      // Dignity
      if(moonDig)h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:8px"><strong style="color:var(--violet)">${moonDig.label}:</strong> ${moonDig.desc}</div>`;
      // Decan
      if(moonDecMeaning)h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:8px"><strong style="color:var(--violet)">Decan ${moonDecan.decanNum} · ${moonDecan.card} — ${moonDecan.title}:</strong> ${moonDecMeaning}</div>`;
      // Mansion
      h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:8px"><strong style="color:var(--violet)">Mansion ${mansion.index}: ${mansion.name}</strong> <span style="font-size:10px;color:${mansion.nature==='favorable'?'var(--emerald)':'var(--crimson)'};text-transform:uppercase">${mansion.nature}</span>`;
      if(mansion.good)h+=`<br><span style="color:var(--emerald)">Good for:</span> ${mansion.good}`;
      if(mansion.avoid)h+=`<br><span style="color:var(--crimson)">Avoid:</span> ${mansion.avoid}`;
      h+=`</div>`;
      // Active transits to natal Moon
      const moonTransits=transits.filter(t=>t.np==='Moon');
      if(moonTransits.length>0){
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--violet);margin:8px 0 4px">Transits to your Moon</div>`;
        for(const mt of moonTransits.slice(0,4)){
          h+=`<div style="font-size:12px;line-height:1.5;color:var(--text);margin-bottom:4px">${pSVG(mt.tp,12,'var(--text2)')} ${mt.tp} ${mt.aspect.name} (${mt.aspect.orbActual.toFixed(1)}°, ${mt.aspect.motion}) — ${mt.interp?mt.interp.summary:''}</div>`;
        }
      }
      // VOC status inline
      if(vocResult.voc){
        const vocTotalMin=vocResult.endsIn?Math.round(vocResult.endsIn*24*60):0;
        const vocH=Math.floor(vocTotalMin/60);const vocM=vocTotalMin%60;
        h+=`<div style="font-size:12px;color:var(--violet);margin-top:6px;font-weight:600">Void-of-course — Moon enters ${vocResult.nextSign||'next sign'} in ${vocH>0?vocH+'h ':''}${vocM}m. Pause new starts.</div>`;
      }
      h+=`</div>`;
    }
    h+=`</div>`;
  }

  // ── Planetary Day Liturgy ──
  if(pHours&&PLANETARY_LITURGY[pHours.dayRuler]){
    const lit=PLANETARY_LITURGY[pHours.dayRuler];
    h+=`<div class="liturgy-card" onclick="toggleLiturgy()">`;
    h+=`<div class="lit-head"><span class="lit-title">${pSVG(pHours.dayRuler,14,'var(--violet)')} ${lit.weekday} Liturgy</span>`;
    h+=`<span class="section-chev ${liturgyExpanded?'open':''}">&#9654;</span></div>`;
    h+=`<div class="lit-day">Day of ${pHours.dayRuler}</div>`;
    h+=`<div class="lit-ruler">${lit.intent}</div>`;
    if(liturgyExpanded){
      h+=`<div class="lit-body"><div class="lit-focus">${lit.focus}</div>`;
      h+=`<div class="lit-avoid"><strong>Avoid:</strong> ${lit.avoid}</div>`;
      h+=`<div class="lit-correspondences">`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Color</span><span class="lit-corr-v">${lit.color}</span></div>`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Metal</span><span class="lit-corr-v">${lit.metal}</span></div>`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Stone</span><span class="lit-corr-v">${lit.stone}</span></div>`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Incense</span><span class="lit-corr-v">${lit.incense}</span></div>`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Herb</span><span class="lit-corr-v">${lit.herb}</span></div>`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Direction</span><span class="lit-corr-v">${lit.direction}</span></div>`;
      h+=`<div class="lit-corr-row"><span class="lit-corr-k">Number</span><span class="lit-corr-v">${lit.number}</span></div>`;
      h+=`</div>`;
      h+=`<div class="lit-medit">"${lit.meditation}"</div></div>`;
    } else {
      h+=`<div class="lit-collapsed">Tap for correspondences, focus, and the day\'s meditation.</div>`;
    }
    h+=`</div>`;
  }

  // ── Current Sky: Planetary Positions (tappable) ──
  {
    const skyPlanets=['Mercury','Venus','Mars','Jupiter','Saturn'];
    h+=`<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-bottom:4px">`;
    for(const p of skyPlanets){
      const ps=signOf(cur[p]);
      const ph=houseOf(cur[p]);
      const ms=motionStatus(p,jd);
      const rxFlag=ms.retrograde?' Rx':ms.stationary?' St':'';
      const isOpen=expandedPlanet===p;
      h+=`<div style="text-align:center;padding:8px 4px;border-radius:var(--r-md);background:var(--card);border:1px solid ${isOpen?'var(--gold-line)':'var(--hairline)'};cursor:pointer" onclick="togglePlanet('${p}')">`;
      h+=`<div>${pSVG(p,18,isOpen?'var(--gold)':'var(--bright)')}</div>`;
      h+=`<div style="font-size:10px;font-weight:600;color:var(--bright);margin-top:3px">${ps.abbr}</div>`;
      h+=`<div style="font-size:9px;color:var(--text3)">H${ph}${rxFlag}</div>`;
      h+=`</div>`;
    }
    h+=`</div>`;
    // Expanded planet detail
    if(expandedPlanet&&skyPlanets.includes(expandedPlanet)){
      const ep=expandedPlanet;
      const eps=signOf(cur[ep]);
      const eph=houseOf(cur[ep]);
      const ephv=HOUSE_VOICE[eph]||{};
      const epDig=getDignity(ep,cur[ep]);
      const epMs=motionStatus(ep,jd);
      const epTransits=transits.filter(t=>t.tp===ep||t.np===ep);
      h+=`<div style="padding:10px 12px;margin-bottom:8px;border-radius:var(--r-md);background:var(--card);border:1px solid var(--gold-line);animation:fadeUp .2s ease both">`;
      h+=`<div style="font-size:12px;font-weight:600;color:var(--bright);margin-bottom:4px">${pSVG(ep,14,'var(--gold)')} ${ep} in ${eps.name} ${eps.degree}°${epMs.retrograde?' (retrograde)':epMs.stationary?' (stationary)':''}</div>`;
      h+=`<div style="font-size:11px;color:var(--text);line-height:1.5">House ${eph}${ephv.name?' — '+ephv.name:''}${epDig?' · '+epDig.label:''}</div>`;
      const epPIH=planetInHouse(ep,eph);
      if(epPIH)h+=`<div style="font-size:11px;color:var(--text);line-height:1.5;margin-top:4px">${epPIH}</div>`;
      if(epDig)h+=`<div style="font-size:11px;color:var(--text2);line-height:1.5;margin-top:4px">${epDig.desc}</div>`;
      if(epTransits.length>0){
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--gold);margin:6px 0 3px">Active aspects</div>`;
        for(const et of epTransits.slice(0,3)){
          const other=et.tp===ep?'natal '+et.np:et.tp;
          h+=`<div style="font-size:11px;color:var(--text);line-height:1.4;margin-bottom:2px">${et.aspect.name} ${other} (${et.aspect.orbActual.toFixed(1)}°) — ${et.interp?et.interp.summary:''}</div>`;
        }
      }
      if(epTransits.length===0)h+=`<div style="font-size:11px;color:var(--text3);margin-top:4px">No major aspects to natal planets right now.</div>`;
      h+=`</div>`;
    }
    // Outer planets row (smaller, tappable too)
    const outerPlanets=['Uranus','Neptune','Pluto','Chiron','NorthNode'];
    h+=`<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:4px">`;
    for(const p of outerPlanets){
      const ps=signOf(cur[p]);
      const ms=motionStatus(p,jd);
      const rxFlag=ms.retrograde?' Rx':ms.stationary?' St':'';
      const isOpen=expandedPlanet===p;
      h+=`<span style="font-size:10px;color:${isOpen?'var(--gold)':'var(--text3)'};display:inline-flex;align-items:center;gap:3px;cursor:pointer;padding:2px 4px;border-radius:4px;${isOpen?'background:var(--gold-soft)':''}" onclick="togglePlanet('${p}')">${pSVG(p,12,isOpen?'var(--gold)':'var(--text3)')} ${ps.abbr}${rxFlag}</span>`;
    }
    h+=`</div>`;
    // Expanded outer planet detail
    if(expandedPlanet&&outerPlanets.includes(expandedPlanet)){
      const ep=expandedPlanet;
      const eps=signOf(cur[ep]);
      const eph=houseOf(cur[ep]);
      const ephv=HOUSE_VOICE[eph]||{};
      const epDig=getDignity(ep,cur[ep]);
      const epMs=motionStatus(ep,jd);
      const epTransits=transits.filter(t=>t.tp===ep||t.np===ep);
      const epLabel=ep==='NorthNode'?'North Node':ep;
      h+=`<div style="padding:10px 12px;margin-bottom:8px;border-radius:var(--r-md);background:var(--card);border:1px solid var(--gold-line);animation:fadeUp .2s ease both">`;
      h+=`<div style="font-size:12px;font-weight:600;color:var(--bright);margin-bottom:4px">${pSVG(ep,14,'var(--gold)')} ${epLabel} in ${eps.name} ${eps.degree}°${epMs.retrograde?' (retrograde)':epMs.stationary?' (stationary)':''}</div>`;
      h+=`<div style="font-size:11px;color:var(--text);line-height:1.5">House ${eph}${ephv.name?' — '+ephv.name:''}${epDig?' · '+epDig.label:''}</div>`;
      if(epTransits.length>0){
        h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--gold);margin:6px 0 3px">Active aspects</div>`;
        for(const et of epTransits.slice(0,3)){
          const other=et.tp===ep?'natal '+et.np:et.tp;
          h+=`<div style="font-size:11px;color:var(--text);line-height:1.4;margin-bottom:2px">${et.aspect.name} ${other} (${et.aspect.orbActual.toFixed(1)}°) — ${et.interp?et.interp.summary:''}</div>`;
        }
      }
      h+=`</div>`;
    }
    h+=`<div style="height:8px"></div>`;
  }

  // ── Upcoming Sign Changes (tappable) ──
  if(ingresses.length>0){
    h+=`<div style="margin:6px 0 12px">`;
    h+=`<div style="font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--text2);margin-bottom:6px">Upcoming Shifts</div>`;
    for(const ig of ingresses){
      const curSign=signOf(cur[ig.planet]);
      const digNew=getDignity(ig.planet,ig.signIdx*30+15);
      const digNote=digNew?` — enters ${digNew.label.toLowerCase()}`:'';
      const isShiftOpen=expandedShift===ig.planet;
      h+=`<div style="padding:6px 10px;margin-bottom:4px;border-radius:var(--r-sm);background:var(--card);border:1px solid ${isShiftOpen?'var(--emerald-line)':'var(--hairline)'};cursor:pointer" onclick="toggleShift('${ig.planet}')">`;
      h+=`<div style="display:flex;align-items:center;gap:8px">`;
      h+=`${pSVG(ig.planet,16,'var(--emerald)')}`;
      h+=`<span style="font-size:12px;color:var(--text);flex:1">${ig.planet} ${sSVG(curSign.name,12,'var(--text3)')} ${curSign.name} &rarr; ${sSVG(ig.sign,12,'var(--emerald)')} ${ig.sign} in ${ig.days}d${digNote}</span>`;
      h+=`<span style="color:var(--text3);transition:transform .2s${isShiftOpen?';transform:rotate(180deg)':''}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6,9 12,15 18,9"/></svg></span>`;
      h+=`</div>`;
      if(isShiftOpen){
        const ingressNote=(function(){
          const planetNotes=INGRESS_NOTES[ig.planet];
          if(planetNotes&&planetNotes[ig.sign])return planetNotes[ig.sign];
          return ig.planet+' enters '+ig.sign+'.';
        })();
        h+=`<div style="margin-top:6px;padding-top:6px;border-top:1px solid var(--hairline);font-size:12px;line-height:1.6;color:var(--text)">${ingressNote}</div>`;
        // Natal planets in the destination sign
        const destNatal=[];
        for(const np of['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron']){
          if(NATAL[np]!==undefined&&Math.floor(NATAL[np]/30)===ig.signIdx)destNatal.push(np);
        }
        if(destNatal.length>0){
          h+=`<div style="font-size:11px;color:var(--gold);margin-top:6px;font-weight:600">Your natal ${destNatal.join(', ')} ${destNatal.length>1?'are':'is'} in ${ig.sign} — this ingress activates ${destNatal.length>1?'them':'it'} directly.</div>`;
        }
      }
      h+=`</div>`;
    }
    h+=`</div>`;
  }

  h+=`</div></div>`; // end positions group

  // ═══ GROUP: TRANSITS ═══
  h+=`<div class="mech-group ${mechGroupOpen.transits?'open':''}">`;
  h+=`<div class="mech-group-head" onclick="toggleMechGroup('transits')"><div class="mech-group-title">Transits &amp; Aspects</div><div class="mech-group-chev">&#9654;</div></div>`;
  h+=`<div class="mech-group-body">`;

  // ── Active Transits Summary (top 5, expandable) ──
  if(transits.length>0){
    h+=`<div style="margin:8px 0 12px">`;
    h+=`<div style="font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--text2);margin-bottom:8px">Active Transits (${transits.length})</div>`;
    const topT=showAllTransits?transits:transits.slice(0,5);
    for(const t of topT){
      const tpName=t.tp==='NorthNode'?'N.Node':t.tp;
      const npName=t.np==='NorthNode'?'N.Node':t.np==='Ascendant'?'Ascendant':t.np==='MC'?'Midheaven':t.np;
      const hv=HOUSE_VOICE[t.house]||{};
      const cls=t.aspect.type==='hard'?'hard':t.aspect.type==='easy'?'easy':'conj';
      const borderColor=cls==='hard'?'var(--crimson)':cls==='easy'?'var(--emerald)':'var(--gold)';
      const dtId=t.tp+'-'+t.np+'-'+t.aspect.name;
      const dtOpen=expandedDayTransit===dtId;
      h+=`<div style="padding:10px 12px;margin-bottom:6px;border-radius:var(--r-md);background:var(--card);border:1px solid ${dtOpen?'var(--gold-line)':'var(--hairline)'};border-left:3px solid ${borderColor};cursor:pointer" onclick="toggleDayTransit('${dtId}')">`;
      h+=`<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">`;
      h+=`${pSVG(t.tp,16,'var(--bright)')} <span style="color:var(--text3)">${aSVG(t.aspect.name,12,'var(--text3)')}</span> ${pSVG(t.np==='Ascendant'||t.np==='MC'?'Sun':t.np,16,'var(--text)')}`;
      h+=`<span style="font-size:12px;font-weight:600;color:var(--bright);flex:1">${tpName} ${t.aspect.name} ${npName}</span>`;
      h+=`<span style="font-size:10px;color:var(--text3)">${t.aspect.orbActual.toFixed(1)}° · ${t.aspect.motion}</span>`;
      h+=`</div>`;
      h+=`<div style="font-size:12px;line-height:1.5;color:var(--text)">${t.interp?t.interp.summary:''}</div>`;
      if(hv.name)h+=`<div style="font-size:10px;color:var(--text3);margin-top:3px">H${t.house}: ${hv.name} · ${t.duration}${t.exactDate?' · Exact '+fmtExactDate(t.exactDate):''}</div>`;
      if(dtOpen){
        h+=`<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--hairline)">`;
        if(t.interp&&t.interp.full)h+=`<div style="font-size:12px;line-height:1.7;color:var(--text);margin-bottom:6px">${t.interp.full.replace(/\n\n/g,'<br><br>')}</div>`;
        if(t.interp&&t.interp.houseContext)h+=`<div style="font-size:12px;line-height:1.5;padding:8px 10px;background:var(--surface);border-radius:var(--r-sm);margin-bottom:6px"><strong>House ${t.house}:</strong> ${t.interp.houseContext}</div>`;
        // Hard transit remedy
        const htE=HARD_BRINGS[t.tp]||HARD_BRINGS_V[t.tp];
        if(t.aspect.type==='hard'&&htE){
          h+=`<div style="padding:8px 10px;border-radius:var(--r-sm);background:rgba(61,217,160,.06);border-left:2px solid var(--emerald);margin-bottom:6px">`;
          h+=`<div style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--emerald);margin-bottom:3px">Remedy</div>`;
          h+=`<div style="font-size:12px;color:var(--text);line-height:1.5">${hardBrings(t.tp,'remedy')}</div>`;
          const rhc=hardBringsHouse(t.house);
          if(rhc)h+=`<div style="font-size:11px;color:var(--text2);line-height:1.5;margin-top:4px;font-style:italic">${rhc}</div>`;
          h+=`</div>`;
        }
        if(t.interp&&t.interp.advice)h+=`<div style="font-size:12px;color:var(--gold);font-style:italic">${t.interp.advice}</div>`;
        h+=`</div>`;
      }
      h+=`</div>`;
    }
    if(transits.length>5){
      if(showAllTransits){
        h+=`<div style="text-align:center;padding:8px;font-size:12px;color:var(--gold);cursor:pointer" onclick="showAllTransits=false;renderApp()">Show fewer &larr;</div>`;
      } else {
        h+=`<div style="text-align:center;padding:8px;font-size:12px;color:var(--gold);cursor:pointer" onclick="showAllTransits=true;renderApp()">See all ${transits.length} transits &rarr;</div>`;
      }
    }
    h+=`</div>`;
  }

  h+=`</div></div>`; // end transits group

  // ═══ GROUP: TIME LORDS ═══
  h+=`<div class="mech-group ${mechGroupOpen.timelords?'open':''}">`;
  h+=`<div class="mech-group-head" onclick="toggleMechGroup('timelords')"><div class="mech-group-title">Time Lords &amp; Lots</div><div class="mech-group-chev">&#9654;</div></div>`;
  h+=`<div class="mech-group-body">`;

  // ── Seven Hermetic Lots ──
  const lots=computeLots(cur,NATAL.Ascendant,SECT.isNocturnal);
  h+=`<div class="lots-section" id="mech-lots">`;
  h+=`<div class="lots-title"><span>Hermetic Lots <span class="help" onclick="event.stopPropagation();showTip('Lots')">?</span></span><span style="text-transform:none;letter-spacing:0;font-size:10px;color:var(--text3)">${SECT.isNocturnal?'Nocturnal':'Diurnal'} formulas</span></div>`;
  h+=`<div style="font-size:11px;line-height:1.55;color:var(--text3);padding:0 2px 8px;letter-spacing:.1px">Seven mathematical points mapping destiny, agency, desire, compulsion, courage, success, and fate\'s hidden edge. Tap any lot to see its meaning in your chart.</div>`;
  h+=`<div class="lots-grid">`;
  const lotOrder=['Fortune','Spirit','Eros','Necessity','Courage','Victory','Nemesis'];
  for(const ln of lotOrder){
    const lDeg=lots[ln];
    const s=signOf(lDeg);
    const lHouse=houseOf(lDeg);
    const lm=LOT_MEANING[ln];
    const isExp=expandedLot===ln;
    h+=`<div class="lot-chip${isExp?' expanded':''}" onclick="toggleLot('${ln}')">`;
    h+=`<div class="lot-name">${lm.name}</div>`;
    h+=`<div class="lot-pos">${sSVG(s.name,12,'var(--violet)')} ${s.degree}°${String(s.minute).padStart(2,'0')}'</div>`;
    h+=`<div class="lot-house">H${lHouse} · ${lm.short}</div>`;
    h+=`</div>`;
  }
  if(expandedLot){
    const lm=LOT_MEANING[expandedLot];
    const lDeg=lots[expandedLot];
    const s=signOf(lDeg);
    const lHouse=houseOf(lDeg);
    const hv=HOUSE_VOICE[lHouse]||{};
    h+=`<div class="lot-detail"><strong>${lm.name} in ${s.name}, House ${lHouse}${hv.name?' ('+hv.name+')':''}:</strong> ${lotLong(expandedLot)}</div>`;
  }
  h+=`</div></div>`;

  h+=`</div></div>`; // end timelords group

  // ═══ GROUP: PRACTICE ═══
  h+=`<div class="mech-group ${mechGroupOpen.practice?'open':''}">`;
  h+=`<div class="mech-group-head" onclick="toggleMechGroup('practice')"><div class="mech-group-title">Journal &amp; Synthesis</div><div class="mech-group-chev">&#9654;</div></div>`;
  h+=`<div class="mech-group-body">`;

  // ── Journal (only on Today) ──
  if(isToday){
    const journalEntries=loadJournal();
    // Capture current context for pending save
    const curCtx=captureJournalContext(cur,jd,transits,vibe,vocResult,moonSign,prof,pHours,phaseAngle,retros,stats);
    window._pendingJournalCtx=curCtx;

    // Echo: surface past entries with similar configuration
    const echoes=findEchoEntries(curCtx);

    h+=`<div class="journal-card">`;
    h+=`<div class="jc-title"><span>Journal</span>${journalEntries.length?`<span class="jc-count">${journalEntries.length} ${journalEntries.length===1?'entry':'entries'}</span>`:''}</div>`;

    // Echo card — pattern recognition from past entries
    if(echoes.length>0){
      for(const eco of echoes){
        const e=eco.entry;
        const moodLbl=MOOD_LABELS[e.mood]||'?';
        h+=`<div class="j-echo">`;
        h+=`<div class="j-echo-label">Echo — last time this configuration recurred</div>`;
        h+=`<div>On <strong>${fmtJournalDate(e.ts)}</strong> under similar conditions, you logged <strong>${moodLbl}</strong>${e.note?': "'+e.note.replace(/"/g,'&quot;')+'"':'.'}</div>`;
        h+=`</div>`;
      }
    }

    h+=`<div class="jc-prompt">How is this moment landing?</div>`;
    h+=`<div class="mood-row">`;
    for(let m=1;m<=5;m++){
      const sel=journalMood===m?' selected':'';
      h+=`<div class="mood-btn${sel}" data-m="${m}" onclick="pickMood(${m})">${MOOD_LABELS[m]}</div>`;
    }
    h+=`</div>`;

    if(journalMood){
      h+=`<textarea class="journal-note" id="journal-note" placeholder="One line about what's happening (optional)..." oninput="onJournalNoteInput(this.value)">${journalNoteInput.replace(/</g,'&lt;')}</textarea>`;
      // Synthesis tracking expand
      h+=`<div style="margin:6px 0 8px">`;
      h+=`<div onclick="toggleJournalSynthTracking()" style="font-size:11px;color:var(--text3);cursor:pointer;display:flex;align-items:center;gap:4px">`;
      h+=`<span style="font-size:8px">${journalShowSynthTracking?'&#9660;':'&#9654;'}</span> Track synthesis accuracy</div>`;
      if(journalShowSynthTracking){
        h+=`<div style="padding:8px 0 4px">`;
        h+=`<div style="font-size:11px;color:var(--text2);margin-bottom:6px">Did the synthesis fit today's experience?</div>`;
        h+=`<div style="display:flex;gap:6px;flex-wrap:wrap">`;
        const ratings=[['hit','Hit'],['partial','Partial'],['miss','Miss'],['untested','Didn\'t test']];
        for(const [val,label] of ratings){
          const sel=journalSynthesisRating===val?' style="background:var(--surface);color:var(--bright);border-color:var(--gold)"':'';
          h+=`<div onclick="setJournalSynthRating('${val}')" style="font-size:11px;padding:4px 10px;border-radius:var(--r-sm);border:1px solid var(--hairline);cursor:pointer;color:var(--text2)"${sel}>${label}</div>`;
        }
        h+=`</div>`;
        if(journalSynthesisRating&&journalSynthesisRating!=='untested'){
          h+=`<textarea id="journal-synth-fb" placeholder="Why? (optional)" oninput="onJournalSynthFeedback(this.value)" style="margin-top:6px;width:100%;padding:6px 10px;font-size:11px;background:var(--surface);color:var(--text);border:1px solid var(--hairline);border-radius:var(--r-sm);resize:none;height:40px">${journalSynthesisFeedback.replace(/</g,'&lt;')}</textarea>`;
        }
        h+=`</div>`;
      }
      h+=`</div>`;
      h+=`<div class="journal-actions">`;
      h+=`<button class="j-btn cancel" onclick="cancelJournalEntry()">Cancel</button>`;
      h+=`<button class="j-btn save" onclick="saveJournalEntry()">Save entry</button>`;
      h+=`</div>`;
    }

    // Latest entry preview
    if(journalEntries.length>0&&!journalMood){
      const latest=journalEntries[0];
      const moodLbl=MOOD_LABELS[latest.mood]||'?';
      h+=`<div class="j-latest">`;
      h+=`<div class="j-latest-head"><span class="j-latest-mood">${moodLbl}</span><span>${fmtJournalDate(latest.ts)}</span></div>`;
      if(latest.note)h+=`<div class="j-latest-note">${latest.note.replace(/</g,'&lt;')}</div>`;
      if(latest.ctx){
        h+=`<div class="j-latest-ctx">`;
        if(latest.ctx.hourRuler)h+=`<span class="j-ctx-chip">${latest.ctx.hourRuler} hour</span>`;
        if(latest.ctx.moonSign)h+=`<span class="j-ctx-chip">Moon ${latest.ctx.moonSign}</span>`;
        if(latest.ctx.yearLord)h+=`<span class="j-ctx-chip">Year: ${latest.ctx.yearLord}</span>`;
        if(latest.ctx.voc)h+=`<span class="j-ctx-chip">VOC</span>`;
        h+=`</div>`;
      }
      h+=`</div>`;
    }

    // History expander
    if(journalEntries.length>1){
      h+=`<div class="j-history">`;
      h+=`<div class="j-hist-toggle" onclick="toggleJournalHistory()">${journalHistoryOpen?'Hide history':`View ${journalEntries.length-1} earlier ${journalEntries.length-1===1?'entry':'entries'}`}</div>`;
      if(journalHistoryOpen){
        for(let i=1;i<Math.min(journalEntries.length,50);i++){
          const e=journalEntries[i];
          const moodLbl=MOOD_LABELS[e.mood]||'?';
          h+=`<div class="j-entry">`;
          h+=`<div class="j-entry-head"><span class="j-entry-mood m${e.mood}">${moodLbl}</span><span class="j-entry-date">${fmtJournalDate(e.ts)} <button class="j-delete" onclick="deleteJournalEntry(${e.ts})" title="Delete">&times;</button></span></div>`;
          if(e.note)h+=`<div class="j-entry-note">${e.note.replace(/</g,'&lt;')}</div>`;
          if(e.ctx){
            const parts=[];
            if(e.ctx.hourRuler)parts.push(e.ctx.hourRuler+' hr');
            if(e.ctx.moonSign)parts.push('Moon '+e.ctx.moonSign);
            if(e.ctx.yearLord)parts.push('Year '+e.ctx.yearLord);
            if(e.ctx.voc)parts.push('VOC');
            if(e.ctx.retros)parts.push(e.ctx.retros+' Rx');
            h+=`<div class="j-entry-ctx">${parts.join(' · ')}</div>`;
          }
          h+=`</div>`;
        }
      }
      h+=`</div>`;
    }

    h+=`</div>`;

    // ── Zodiacal Releasing ── (birthDate, ageYears, spiritSignIdx, zrSpirit, curSpirit hoisted to header)
    // Compute fortune-side and expanded projection for the full ZR view
    const projectYears=Math.max(ageYears+15,60);
    const zrSpiritFull=computeZR(spiritSignIdx,birthDate,projectYears);
    const zrFortune=computeZR(fortuneSignIdx,birthDate,projectYears);
    const curSpiritFull=findCurrentZRPeriod(zrSpiritFull,ageYears);
    const curFortune=findCurrentZRPeriod(zrFortune,ageYears);
    const activeZR=zrSource==='Spirit'?zrSpiritFull:zrFortune;
    const activeCur=zrSource==='Spirit'?curSpiritFull:curFortune;

    h+=`<div class="zr-card" id="mech-zr">`;
    h+=`<div class="zr-head" onclick="toggleZR()">`;
    h+=`<span>Zodiacal Releasing — Life Chapters <span class="help" onclick="event.stopPropagation();showTip('Zodiacal Releasing')">?</span></span>`;
    h+=`<span class="section-chev ${zrExpanded?'open':''}">&#9654;</span>`;
    h+=`</div>`;
    h+=`<div style="font-size:11px;line-height:1.55;color:var(--text3);padding:0 14px 6px;letter-spacing:.1px">Your life unfolds in nested chapters of varying length. Spirit tracks purpose and career; Fortune tracks body and circumstance. Peak periods mark moments of heightened visibility.</div>`;

    // Always show "now" summary (even when collapsed)
    h+=`<div class="zr-now">`;
    if(curSpirit){
      const l1=curSpirit.l1,l2=curSpirit.l2;
      h+=`<div class="zr-now-block">`;
      h+=`<div class="zr-now-label">Spirit (Purpose)</div>`;
      h+=`<div class="zr-now-sign">${sSVG(l1.sign,14,'var(--violet)')} ${l1.sign}${l1.peak?' <span style="color:var(--gold);font-size:11px">★ peak</span>':''}</div>`;
      h+=`<div class="zr-now-period">L1 chapter · ${l1.lengthYears}y · ruled by ${l1.ruler}</div>`;
      h+=`<div class="zr-now-dates">${fmtZRDate(l1.startDate)} – ${fmtZRDate(l1.endDate)}</div>`;
      if(l2){h+=`<div class="zr-now-sub">Sub-chapter (L2): ${l2.sign} — ${fmtZRDate(l2.startDate)} – ${fmtZRDate(l2.endDate)}</div>`;}
      h+=`</div>`;
    }
    if(curFortune){
      const l1=curFortune.l1,l2=curFortune.l2;
      h+=`<div class="zr-now-block">`;
      h+=`<div class="zr-now-label">Fortune (Body)</div>`;
      h+=`<div class="zr-now-sign">${sSVG(l1.sign,14,'var(--violet)')} ${l1.sign}${l1.peak?' <span style="color:var(--gold);font-size:11px">★ peak</span>':''}</div>`;
      h+=`<div class="zr-now-period">L1 chapter · ${l1.lengthYears}y · ruled by ${l1.ruler}</div>`;
      h+=`<div class="zr-now-dates">${fmtZRDate(l1.startDate)} – ${fmtZRDate(l1.endDate)}</div>`;
      if(l2){h+=`<div class="zr-now-sub">Sub-chapter (L2): ${l2.sign} — ${fmtZRDate(l2.startDate)} – ${fmtZRDate(l2.endDate)}</div>`;}
      h+=`</div>`;
    }
    h+=`</div>`;

    if(zrExpanded){
      h+=`<div class="zr-body">`;
      // Source toggle
      h+=`<div style="display:flex;gap:6px;margin-bottom:10px">`;
      h+=`<button class="j-btn ${zrSource==='Spirit'?'save':'cancel'}" onclick="setZRSource('Spirit')">Spirit</button>`;
      h+=`<button class="j-btn ${zrSource==='Fortune'?'save':'cancel'}" onclick="setZRSource('Fortune')">Fortune</button>`;
      h+=`</div>`;

      // L1 Gantt
      const startYear=0;
      const endYear=projectYears;
      const span=endYear-startYear;
      h+=`<div class="zr-gantt">`;
      h+=`<div class="zr-gantt-label">L1 — Major Chapters (${zrSource})</div>`;
      h+=`<div class="zr-timeline" style="height:36px">`;
      for(const p of activeZR){
        const leftPct=(p.startYears/span)*100;
        const widthPct=(p.lengthYears/span)*100;
        const isCurr=ageYears>=p.startYears&&ageYears<p.endYears;
        const color=ZR_COLORS[p.sign]||'#888';
        const cls=(isCurr?'current ':'')+(p.peak?'peak ':'')+(p.lbFollows?'lb':'');
        h+=`<div class="zr-segment ${cls}" style="left:${leftPct}%;width:${widthPct}%;background:${color}" title="${p.sign} ${fmtZRDate(p.startDate)}-${fmtZRDate(p.endDate)}${p.peak?' (PEAK)':''}${p.lbFollows?' (LB follows)':''}">${p.sign.slice(0,3)}</div>`;
      }
      // Now marker
      const nowPct=(ageYears/span)*100;
      h+=`<div class="zr-now-marker" style="left:${nowPct}%"></div>`;
      h+=`</div>`;
      // Axis
      h+=`<div class="zr-axis">`;
      for(let y=0;y<=endYear;y+=Math.ceil(endYear/6)){
        const yr=birthDate.getFullYear()+y;
        h+=`<span>${yr}</span>`;
      }
      h+=`</div>`;
      h+=`</div>`;

      // L2 Gantt — only the current L1's sub-periods
      if(activeCur&&activeCur.l1){
        const p=activeCur.l1;
        h+=`<div class="zr-gantt">`;
        h+=`<div class="zr-gantt-label">L2 — Sub-chapters within ${p.sign}</div>`;
        h+=`<div class="zr-timeline" style="height:28px">`;
        for(const s of p.subperiods){
          const leftPct=((s.startYears-p.startYears)/p.lengthYears)*100;
          const widthPct=((s.endYears-s.startYears)/p.lengthYears)*100;
          const isCurr=ageYears>=s.startYears&&ageYears<s.endYears;
          const color=ZR_COLORS[s.sign]||'#888';
          const cls=(isCurr?'current ':'')+(s.peak?'peak':'');
          h+=`<div class="zr-segment ${cls}" style="left:${leftPct}%;width:${widthPct}%;background:${color}" title="${s.sign} ${fmtZRDate(s.startDate)}-${fmtZRDate(s.endDate)}${s.peak?' (peak)':''}">${s.sign.slice(0,3)}</div>`;
        }
        // Now marker (relative to L1)
        const relPct=((ageYears-p.startYears)/p.lengthYears)*100;
        if(relPct>=0&&relPct<=100){
          h+=`<div class="zr-now-marker" style="left:${relPct}%"></div>`;
        }
        h+=`</div>`;
        h+=`<div class="zr-axis">`;
        h+=`<span>${fmtZRDate(p.startDate)}</span>`;
        h+=`<span>${fmtZRDate(p.endDate)}</span>`;
        h+=`</div>`;
        h+=`</div>`;
      }

      h+=`<div class="zr-note">Periods derived from the Hellenistic technique of Valens. Each sign releases for a number of years equal to its lord's minor period. <strong>★ Peak</strong> periods occur when the chapter falls in an angle (1st, 4th, 7th, 10th) from the starting sign — these are high-intensity phases of the life theme. <strong>LB</strong> (loosing of the bond) marks a structural break: when the next period would fall in the 8th sign from the start, it jumps to the 9th — often felt as a major life pivot. Spirit tracks purpose and action; Fortune tracks body and circumstance.</div>`;
      h+=`</div>`;
    }
    h+=`</div>`;

    // ── Firdaria ── (firdaria, curFir hoisted to header)
    // Re-compute with sect awareness for the full display
    const firdariaFull=computeFirdaria(birthDate,SECT.isNocturnal);
    const curFirFull=findCurrentFirdaria(firdariaFull,ageYears);
    h+=`<div class="fir-card" id="mech-firdaria">`;
    h+=`<div class="fir-head" onclick="toggleFirdaria()">`;
    h+=`<span>Firdaria — Time-Lord Periods (${SECT.isNocturnal?'Nocturnal':'Diurnal'}) <span class="help" onclick="event.stopPropagation();showTip('Firdaria')">?</span></span>`;
    h+=`<span class="section-chev ${firExpanded?'open':''}">&#9654;</span>`;
    h+=`</div>`;
    h+=`<div style="font-size:11px;line-height:1.55;color:var(--text3);padding:0 14px 6px;letter-spacing:.1px">A Persian time-lord system spanning your whole life. Each planet rules a decade-long chapter with shorter sub-periods cycling through all seven traditional planets.</div>`;

    if(curFirFull){
      const maj=curFirFull.major,sub=curFirFull.sub;
      const majVoice=FIRDARIA_VOICE[maj.lord]||{};
      const subVoice=FIRDARIA_VOICE[sub.lord]||{};
      h+=`<div class="fir-now">`;
      h+=`<div class="fir-lord-block">`;
      h+=`<div class="fir-lord-label">Major Lord</div>`;
      h+=`<div class="fir-lord-name">${pSVG(maj.lord,16,'var(--azure)')} ${maj.lord}</div>`;
      h+=`<div class="fir-lord-theme">${majVoice.theme||''}</div>`;
      h+=`<div class="fir-lord-dates">${fmtZRDate(maj.startDate)} – ${fmtZRDate(maj.endDate)} · ${maj.lengthYears}y</div>`;
      h+=`</div>`;
      h+=`<div class="fir-lord-block">`;
      h+=`<div class="fir-lord-label">Sub-Lord</div>`;
      h+=`<div class="fir-lord-name">${pSVG(sub.lord,16,'var(--azure)')} ${sub.lord}</div>`;
      h+=`<div class="fir-lord-theme">${subVoice.theme||''}</div>`;
      h+=`<div class="fir-lord-dates">${fmtZRDate(sub.startDate)} – ${fmtZRDate(sub.endDate)}</div>`;
      h+=`</div>`;
      h+=`</div>`;
      const majBrief=Array.isArray(majVoice.brief)?pick(majVoice.brief,todaySeed()):majVoice.brief||'';
      h+=`<div class="fir-brief"><strong>${maj.lord}/${sub.lord}:</strong> ${majBrief} ${sub.lord!==maj.lord?'<strong>Within this, the '+sub.lord+' sub-period emphasizes '+(subVoice.theme||'').toLowerCase()+'.</strong>':''}</div>`;
    }

    if(firExpanded){
      h+=`<div class="fir-timeline">`;
      // Major Gantt
      const totalYears=firdariaFull.reduce((a,m)=>a+m.lengthYears,0);
      h+=`<div class="zr-gantt">`;
      h+=`<div class="zr-gantt-label">Major Periods — ${totalYears}y total</div>`;
      h+=`<div class="zr-timeline" style="height:36px">`;
      const firColors={Sun:'#f5b843',Moon:'#9b6dff',Mercury:'#5cd6a8',Venus:'#f58ca3',Mars:'#e0425d',Jupiter:'#4a9eff',Saturn:'#4a6278'};
      for(const m of firdariaFull){
        const leftPct=(m.startYears/totalYears)*100;
        const widthPct=(m.lengthYears/totalYears)*100;
        const isCurr=ageYears>=m.startYears&&ageYears<m.endYears;
        h+=`<div class="zr-segment ${isCurr?'current':''}" style="left:${leftPct}%;width:${widthPct}%;background:${firColors[m.lord]}" title="${m.lord} ${fmtZRDate(m.startDate)}-${fmtZRDate(m.endDate)} (${m.lengthYears}y)">${m.lord.slice(0,2)}</div>`;
      }
      const nowPct=Math.min(100,(ageYears/totalYears)*100);
      h+=`<div class="zr-now-marker" style="left:${nowPct}%"></div>`;
      h+=`</div>`;
      h+=`<div class="zr-axis">`;
      h+=`<span>${birthDate.getFullYear()}</span>`;
      h+=`<span>${birthDate.getFullYear()+Math.round(totalYears/2)}</span>`;
      h+=`<span>${birthDate.getFullYear()+totalYears}</span>`;
      h+=`</div>`;
      h+=`</div>`;

      // Sub-period Gantt for current major
      if(curFirFull){
        const maj=curFirFull.major;
        h+=`<div class="zr-gantt">`;
        h+=`<div class="zr-gantt-label">Sub-Periods within ${maj.lord}</div>`;
        h+=`<div class="zr-timeline" style="height:28px">`;
        for(const s of maj.subperiods){
          const leftPct=((s.startYears-maj.startYears)/maj.lengthYears)*100;
          const widthPct=((s.endYears-s.startYears)/maj.lengthYears)*100;
          const isCurr=ageYears>=s.startYears&&ageYears<s.endYears;
          h+=`<div class="zr-segment ${isCurr?'current':''}" style="left:${leftPct}%;width:${widthPct}%;background:${firColors[s.lord]}" title="${maj.lord}/${s.lord} ${fmtZRDate(s.startDate)}-${fmtZRDate(s.endDate)}">${s.lord.slice(0,2)}</div>`;
        }
        const relPct=((ageYears-maj.startYears)/maj.lengthYears)*100;
        h+=`<div class="zr-now-marker" style="left:${relPct}%"></div>`;
        h+=`</div>`;
        h+=`<div class="zr-axis"><span>${fmtZRDate(maj.startDate)}</span><span>${fmtZRDate(maj.endDate)}</span></div>`;
        h+=`</div>`;
      }

      h+=`<div class="zr-note">Firdaria is a Persian time-lord technique complementing Zodiacal Releasing. The ${SECT.isNocturnal?'nocturnal':'diurnal'} sequence begins with the ${SECT.isNocturnal?'Moon':'Sun'}. Each major period is divided into 7 equal sub-periods that cycle through the same planetary order. Where ZR describes thematic chapters by sign, firdaria describes the ruling planetary influence directly.</div>`;
      h+=`</div>`; // close .fir-timeline
    }
    h+=`</div>`;

    // ── Solar & Lunar Returns ──
    const nowMsR=now.getTime();
    // Figure out which SR governs now: this year's SR if we've passed it, else last year's
    const thisYear=now.getUTCFullYear();
    let srJd=findSolarReturnJD(thisYear);
    let srDate=jdToDate(srJd);
    if(srDate.getTime()>nowMsR){
      srJd=findSolarReturnJD(thisYear-1);
      srDate=jdToDate(srJd);
    }
    const srNextJd=findSolarReturnJD(srDate.getUTCFullYear()+1);
    const srNextDate=jdToDate(srNextJd);
    const SR=computeReturn(srJd);
    const srI=interpretSolarReturn(SR);
    // Lunar return: most recent before-or-at now
    const curJd=julianDate(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours()+now.getUTCMinutes()/60);
    const lrJd=findLunarReturnJD(curJd,false);
    const lrDate=jdToDate(lrJd);
    const lrNextJd=findLunarReturnJD(lrJd+3,true); // forward from +3d
    const lrNextDate=jdToDate(lrNextJd);
    const LR=computeReturn(lrJd);
    const lrI=interpretLunarReturn(LR);
    const dFmt=(d)=>d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
    h+=`<div class="ret-card">`;
    h+=`<div class="ret-head" onclick="toggleReturns()">`;
    h+=`<span>Solar &amp; Lunar Returns</span>`;
    h+=`<span class="section-chev ${returnsExpanded?'open':''}">&#9654;</span>`;
    h+=`</div>`;
    h+=`<div class="ret-row">`;
    h+=`<div class="ret-block">`;
    h+=`<div class="ret-label">Solar Return · This Year</div>`;
    h+=`<div class="ret-when">${dFmt(srDate)}</div>`;
    h+=`<div class="ret-asc">Rising: ${srI.srAscSign} — Moon in ${srI.srMoonSign}</div>`;
    h+=`<div class="ret-theme">Sun returned to your natal register in house ${srI.srSunHouse}: ${srI.sunTheme}.</div>`;
    h+=`</div>`;
    h+=`<div class="ret-block">`;
    h+=`<div class="ret-label">Lunar Return · This Month</div>`;
    h+=`<div class="ret-when">${dFmt(lrDate)}</div>`;
    h+=`<div class="ret-asc">Rising: ${lrI.lrAscSign} — Moon in house ${lrI.lrMoonHouse}</div>`;
    h+=`<div class="ret-theme">${lrI.moonTheme}.</div>`;
    h+=`</div>`;
    h+=`</div>`;
    if(returnsExpanded){
      h+=`<div class="ret-detail"><strong style="color:var(--gold)">Solar Return</strong> — ${dFmt(srDate)} governs through ${dFmt(srNextDate)}. ${srI.moonNote} The year's Ascendant (${srI.srAscSign}) colours the tone of everything undertaken; the SR Moon in house ${srI.srMoonHouse} marks where the emotional weather will pool.</div>`;
      h+=`<div class="ret-detail"><strong style="color:var(--gold)">Lunar Return</strong> — ${dFmt(lrDate)} governs through roughly ${dFmt(lrNextDate)}. ${lrI.note} The LR Sun in house ${lrI.lrSunHouse} points at the month's centre of gravity.</div>`;
      h+=`<div class="zr-note">Returns are sub-charts: a Solar Return is cast for the exact instant the Sun returns to its natal longitude each year, and describes the birthday-to-birthday theme. A Lunar Return repeats every ~27.3 days and describes the texture of the coming lunar month. Both are read against the natal chart, not in isolation.</div>`;
    }
    h+=`</div>`;

    // ── Fixed Stars (Transit contacts today) ──
    const fsTrans=scanTransitFixedStars(cur,jd,0.5);
    h+=`<div class="fs-card">`;
    h+=`<div class="fs-head" onclick="toggleFSTransit()">`;
    h+=`<span>Fixed Star Contacts · Today <span class="help" onclick="event.stopPropagation();showTip('Fixed Stars')">?</span></span>`;
    h+=`<span class="section-chev ${fsTransitExpanded?'open':''}">&#9654;</span></div>`;
    h+=`<div class="fs-sub">Transiting planets within 0.5° of a named fixed star are conjunct — ancient astrology treated these contacts as powerful imprints on the day.</div>`;
    if(fsTrans.length===0){
      h+=`<div class="fs-empty">No transiting planet is in contact with a named fixed star today.</div>`;
    } else {
      for(const h1 of fsTrans){
        h+=`<div class="fs-hit">`;
        h+=`<div class="fs-hit-head"><div class="fs-hit-title">${pSVG(h1.point,12,'var(--gold)')} ${h1.point}<span class="fs-dot">☌</span>${h1.star.name}</div>`;
        h+=`<div class="fs-hit-orb">${h1.orb.toFixed(2)}° orb</div></div>`;
        h+=`<div class="fs-hit-nature">${h1.star.nature} · mag ${h1.star.mag}</div>`;
        if(fsTransitExpanded)h+=`<div class="fs-hit-meaning">${h1.star.meaning}</div>`;
        h+=`</div>`;
      }
    }
    h+=`</div>`;
  }

  // Transit biwheel with toggles
  h+=`<div class="chart-wrap">${renderChartWheel(cur,transits,jd,340)}</div>`;
  h+=`<div style="display:flex;justify-content:center;gap:8px;margin:-8px 0 12px">`;
  h+=`<div class="chart-toggle ${showTransitRing?'on':''}" onclick="toggleChart('transit')">Transits</div>`;
  h+=`<div class="chart-toggle ${showAspectLines?'on':''}" onclick="toggleChart('aspects')">Aspects</div>`;
  h+=`</div>`;

  // Daily Guidance (collapsible)
  const guidance=generateDailyGuidance(transits,vibe,mPhase,retros,stats,vocResult,moonSign,cur,phaseAngle,prof,pHours,isToday);
  h+=`<div class="guidance"><div class="guidance-title">Daily Guidance</div>`;
  h+=`<div class="guidance-preview${guidanceExpanded?' expanded':''}">${guidance}</div>`;
  h+=`<div class="guidance-toggle" onclick="toggleGuidance()">${guidanceExpanded?'Show less':'Read more'}</div></div>`;

  // ── Claude Synthesis ──
  {
    h+=`<div class="synth-card">`;
    h+=`<div class="synth-head" onclick="synthToggleExpanded()" style="cursor:pointer">`;
    h+=`<span class="synth-title">Claude Synthesis</span>`;
    h+=`<span class="section-chev ${synthExpanded?'open':''}" style="color:var(--text3)">&#9654;</span>`;
    h+=`</div>`;
    if(!synthExpanded){
      const sub=synthKey
        ?(synthResult&&synthResult.text?`Last reading saved. Tap to open.`:`Ready. Tap to consult Claude on today\'s sky.`)
        :`Add an API key to enable a traditional-voice daily reading.`;
      h+=`<div class="synth-sub" style="margin-top:6px">${sub}</div>`;
    }
    if(synthExpanded){
      const activeTabLocal = synthKey ? synthTab : 'setup';
      h+=`<div class="synth-seg" role="tablist">`;
      h+=`<button class="${activeTabLocal==='setup'?'on':''}" onclick="synthSelectTab('setup')">Setup</button>`;
      h+=`<button class="${activeTabLocal==='consult'?'on':''}" onclick="synthSelectTab('consult')" ${synthKey?'':'disabled style="opacity:.45;cursor:not-allowed"'}>Consult</button>`;
      h+=`</div>`;
      if(activeTabLocal==='setup'){
        h+=renderInlineKeySetup();
      } else {
        h+=`<div class="synth-sub">Ask Claude for an integrated reading of today\'s sky against your nativity — traditional voice, weighted by importance, nested from transit to ZR chapter.</div>`;
        h+=`<div class="synth-field">`;
        h+=`<label class="synth-field-label">Focus <span class="optional">(optional)</span></label>`;
        h+=`<textarea class="synth-input synth-textarea" placeholder="A decision, a relationship, a question you\'re holding..." oninput="synthSetFocus(this.value)">${(synthFocus||'').replace(/</g,'&lt;')}</textarea>`;
        h+=`</div>`;
        h+=`<div class="synth-row">`;
        h+=`<button class="synth-btn ${synthLoading?'loading':''}" onclick="synthGenerate()" ${synthLoading?'disabled':''}>${synthLoading?'<span class="synth-spinner"></span>Consulting the sky':(synthResult&&synthResult.text?'Generate new reading':'Generate reading')}</button>`;
        h+=`</div>`;
        h+=`<div class="token-estimate">Estimated cost: ~4,200 input / 600 output tokens · ~$0.014 per reading</div>`;
        if(synthError)h+=`<div class="synth-error">${synthError.replace(/</g,'&lt;')}</div>`;
        if(synthResult&&synthResult.text){
          const when=synthResult.ts?new Date(synthResult.ts).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';
          const wc=(synthResult.text.trim().split(/\s+/).length);
          if(synthOutputCollapsed){
            h+=`<div class="synth-output" style="margin-top:14px">`;
            h+=`<div class="synth-collapsed" onclick="toggleSynthOutput()">`;
            h+=`<div class="synth-collapsed-meta"><strong>Last reading</strong>${when?' · '+when:''}<br>${wc} words · tap to view</div>`;
            h+=`<div class="synth-expand-hint">Open ▾</div>`;
            h+=`</div></div>`;
          } else {
            h+=`<div class="synth-output">`;
            h+=`<div class="synth-output-header">`;
            h+=`<span class="synth-output-stamp">${when?'Reading · '+when:'Reading'}</span>`;
            h+=`<div style="display:flex;gap:6px">`;
            h+=`<button class="synth-output-copy ${synthCopied?'copied':''}" onclick="synthCopyOutput()">${synthCopied?'Copied':'Copy'}</button>`;
            h+=`<button class="synth-output-copy" onclick="synthShareOutput()">Share</button>`;
            h+=`<button class="synth-output-copy" onclick="toggleSynthOutput()">Collapse</button>`;
            h+=`</div>`;
            h+=`</div>`;
            h+=synthRenderBlocks(synthResult.text);
            const u=synthResult.usage||{};
            h+=`<div class="synth-output-meta">${CLAUDE_MODEL}${u.input_tokens?' · '+u.input_tokens+' in / '+u.output_tokens+' out':''}</div>`;
            h+=`</div>`;
          }
        }
      }
    }
    h+=`</div>`;
  }

  // Filter chips
  h+=`<div class="filters">`;
  h+=`<div class="filter-chip ${activeFilter==='all'?'on':''}" onclick="setFilter('all')">All (${transits.length})</div>`;
  const hardCount=transits.filter(t=>t.aspect.type==='hard').length;
  const easyCount=transits.filter(t=>t.aspect.type==='easy').length;
  const conjCount=transits.filter(t=>t.aspect.name==='conjunction').length;
  if(conjCount)h+=`<div class="filter-chip ${activeFilter==='conj'?'on':''}" onclick="setFilter('conj')">Conjunctions (${conjCount})</div>`;
  if(hardCount)h+=`<div class="filter-chip ${activeFilter==='hard'?'on':''}" onclick="setFilter('hard')">Challenges (${hardCount})</div>`;
  if(easyCount)h+=`<div class="filter-chip ${activeFilter==='easy'?'on':''}" onclick="setFilter('easy')">Flowing (${easyCount})</div>`;
  h+=`</div>`;

  // Transit list — show top 5, rest behind "show more"
  const filtered=activeFilter==='all'?transits:
    activeFilter==='hard'?transits.filter(t=>t.aspect.type==='hard'):
    activeFilter==='easy'?transits.filter(t=>t.aspect.type==='easy'):
    activeFilter==='conj'?transits.filter(t=>t.aspect.name==='conjunction'):transits;

  const SHOW_LIMIT=5;
  const visibleTransits=showAllTransits?filtered:filtered.slice(0,SHOW_LIMIT);

  if(filtered.length>0){
    h+=`<div class="section-title">Active Transits</div>`;
    for(let i=0;i<visibleTransits.length;i++){
      const t=filtered[i];
      const interp=t.interp;
      const cls=t.aspect.type==='hard'?'hard':t.aspect.type==='easy'?'easy':t.aspect.name==='conjunction'?'conj':'minor';
      const exactCls=t.aspect.motion==='exact'?' exact-transit':'';
      const tpName=t.tp==='NorthNode'?'North Node':t.tp;
      const npName=t.np==='NorthNode'?'North Node':t.np==='Ascendant'?'Ascendant':t.np==='MC'?'Midheaven':t.np;
      const hv=HOUSE_VOICE[t.house]||{};
      const id='t-'+t.tp+'-'+t.np+'-'+t.aspect.name;
      const isOpen=expandedCards[id];

      h+=`<div class="transit ${cls}${exactCls}${isOpen?' card-open':''}" data-card-id="${id}" onclick="toggleCard('${id}')" style="animation-delay:${Math.min(i,4)*40}ms">`;
      // Top row: planet glyphs + badge
      h+=`<div class="t-top"><div class="t-planets">${pSVG(t.tp,24,'var(--bright)')}`;
      h+=`<span style="color:var(--text3)">${aSVG(t.aspect.name,16,'var(--text3)')}</span>`;
      h+=`${pSVG(t.np==='Ascendant'||t.np==='MC'?'Sun':t.np,24,'var(--text)')}</div>`;
      h+=`<span class="t-badge ${cls}">${interp.aspectLabel}</span>
<svg class="t-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg></div>`;

      // Label
      h+=`<div class="t-label">${tpName} ${aSVG(t.aspect.name,13,'var(--text2)')} natal ${npName}</div>`;
      // Summary interpretation
      h+=`<div class="t-interp">${interp.summary}</div>`;
      // Advice
      if(interp.advice)h+=`<div class="t-advice">${interp.advice}</div>`;

      // Meta tags with tooltips
      h+=`<div class="t-meta">`;
      h+=`<div class="t-tag" onclick="event.stopPropagation();showTip('Orb')">${t.aspect.orbActual.toFixed(1)}° orb<span class="help">?</span></div>`;
      h+=`<div class="t-motion ${t.aspect.motion}" onclick="event.stopPropagation();showTip('${t.aspect.motion.charAt(0).toUpperCase()+t.aspect.motion.slice(1)}')">${t.aspect.motion}<span class="help">?</span></div>`;
      h+=`<div class="t-tag">${t.duration}</div>`;
      if(hv.name)h+=`<div class="t-tag" onclick="event.stopPropagation();showTip('House')">H${t.house}: ${hv.name}<span class="help">?</span></div>`;
      if(t.exactDate)h+=`<div class="t-tag">Exact ${fmtExactDate(t.exactDate)}</div>`;
      h+=`</div>`;

      // Timing arc: applying → exact → separating
      {
        const arcMax=8;
        const orbClamped=Math.min(t.aspect.orbActual,arcMax);
        let arcPct;
        if(t.aspect.motion==='applying')arcPct=Math.max(5,50-orbClamped/arcMax*50);
        else if(t.aspect.motion==='exact')arcPct=50;
        else arcPct=Math.min(95,50+orbClamped/arcMax*50);
        const arcColor=t.aspect.type==='hard'?'var(--crimson)':t.aspect.type==='easy'?'var(--emerald)':'var(--gold)';
        h+=`<div class="timing-arc">`;
        h+=`<div class="timing-arc-bar"><div class="timing-arc-fill" style="width:${arcPct}%;background:${arcColor};opacity:.35"></div><div class="timing-arc-dot" style="left:${arcPct}%;color:${arcColor};background:${arcColor}"></div></div>`;
        h+=`</div>`;
        h+=`<div class="timing-arc-labels"><span class="${t.aspect.motion==='applying'?'active':''}">Applying</span><span class="${t.aspect.motion==='exact'?'active':''}">Exact</span><span class="${t.aspect.motion==='separating'?'active':''}">Separating</span></div>`;
      }

      // Hard transit remedy — always visible
      const htExists=HARD_BRINGS[t.tp]||HARD_BRINGS_V[t.tp];
      if(t.aspect.type==='hard'&&htExists){
        const remedyText=hardBrings(t.tp,'remedy');
        if(remedyText){
          const rhcNow=hardBringsHouse(t.house);
          h+=`<div style="font-size:12px;line-height:1.5;padding:8px 10px;margin-top:6px;border-radius:var(--r-sm);background:rgba(61,217,160,.06);border-left:2px solid var(--emerald);color:var(--text)"><span style="font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--emerald)">Remedy</span><br>${remedyText}${rhcNow?'<br><span style="font-style:italic;color:var(--text2)">'+rhcNow+'</span>':''}</div>`;
        }
      }

      // Expandable deep detail
      h+=`<div class="t-expand ${isOpen?'open':''}"><div class="t-expand-inner">`;

      // Hard transits get three-part frame (full detail)
      if(t.aspect.type==='hard'&&htExists){
        h+=`<div class="ht-frame">`;
        h+=`<div class="ht-section brings"><div class="ht-label">What it tends to bring</div><div class="ht-text">${hardBrings(t.tp,'brings')}${hardBringsHouse(t.house)?'<div style="margin-top:4px;font-style:italic;color:var(--text2)">'+hardBringsHouse(t.house)+'</div>':''}</div></div>`;
        h+=`<div class="ht-section remedy"><div class="ht-label">What works against it</div><div class="ht-text">${hardBrings(t.tp,'remedy')}</div></div>`;
        const liftsDate=t.exactDate?fmtExactDate(t.exactDate):'';
        const sepInfo=t.aspect.motion==='separating'?'Already fading.':t.aspect.motion==='exact'?`Exact now — peak intensity.${liftsDate?' Begins easing after '+liftsDate+'.':''}`:liftsDate?`Building toward exact ${liftsDate}. Eases within ${t.duration} after peak.`:`Active for approximately ${t.duration}.`;
        h+=`<div class="ht-section lifts"><div class="ht-label">When it lifts</div><div class="ht-text">${sepInfo}</div></div>`;
        h+=`</div>`;
      }

      h+=`<div class="t-expand-section">${interp.full.replace(/\n\n/g,'<br><br>')}</div>`;
      if(interp.houseContext)h+=`<div class="t-expand-section" style="padding:10px;background:var(--surface);border-radius:var(--r-sm)"><strong>House ${t.house} Context</strong><br>${interp.houseContext}</div>`;
      const tDig=getDignity(t.tp,t.tLon);
      if(tDig)h+=`<div class="t-expand-section"><strong>${t.tp} in ${tDig.label}:</strong> ${tDig.desc}</div>`;
      const ms=motionStatus(t.tp,jd);
      if(ms.retrograde){const rv=retroVoice(t.tp);if(rv)h+=`<div class="t-expand-section" style="color:var(--violet)"><strong>${t.tp} Retrograde:</strong> ${rv}</div>`;}
      h+=`</div></div></div>`;
    }
  }
  if(!showAllTransits&&filtered.length>SHOW_LIMIT){
    h+=`<div class="show-more" onclick="event.stopPropagation();toggleShowAll()">Show ${filtered.length-SHOW_LIMIT} more transits</div>`;
  }
  if(showAllTransits&&filtered.length>SHOW_LIMIT){
    h+=`<div class="show-more" onclick="event.stopPropagation();toggleShowAll()">Show fewer</div>`;
  }

  // ── Transit Timeline ──
  const timeline=buildTimeline(transits,jd);
  if(timeline.length>0){
    h+=`<div class="section-title" id="mech-transits">Upcoming Transits</div>`;
    h+=`<div class="timeline">`;
    for(const ev of timeline){
      const tpName=ev.tp==='NorthNode'?'N.Node':ev.tp;
      const npName=ev.np==='NorthNode'?'N.Node':ev.np==='Ascendant'?'ASC':ev.np==='MC'?'MC':ev.np;
      const dateStr=fmtExactDate(ev.date);
      const dotCls=ev.diffDays<=0?'exact':ev.diffDays<=7?'applying':'separating';
      const whenStr=ev.diffDays===0?'Today':ev.diffDays===1?'Tomorrow':ev.diffDays<0?Math.abs(ev.diffDays)+'d ago':'in '+ev.diffDays+'d';
      h+=`<div class="tl-item">`;
      h+=`<div class="tl-date">${dateStr}<br><span style="font-size:9px;opacity:.6">${whenStr}</span></div>`;
      h+=`<div class="tl-dot ${dotCls}"></div>`;
      h+=`<div class="tl-body">`;
      h+=`<div class="tl-label">${tpName} ${aSVG(ev.aspect.name,12,'var(--text2)')} ${npName}<span class="tl-badge ${ev.cls}">${ev.aspect.name}</span></div>`;
      h+=`<div class="tl-desc">${ev.duration} transit · ${ev.aspect.type==='hard'?'Challenging':'Supportive'} energy${ev.importance>20?' · High impact':''}</div>`;
      h+=`</div></div>`;
    }
    h+=`</div>`;
  }

  // ── Notifications settings ──
  {
    const permState=('Notification' in window)?Notification.permission:'unsupported';
    const active=notifPrefs.enabled&&permState==='granted';
    h+=`<div class="notif-card">`;
    h+=`<div class="notif-head" onclick="toggleNotif()">`;
    h+=`<span>Notifications</span>`;
    h+=`<span class="section-chev ${notifExpanded?'open':''}">&#9654;</span></div>`;
    if(permState==='unsupported'){
      h+=`<div class="notif-status">Notifications are not supported in this browser.</div>`;
    } else if(permState==='denied'){
      h+=`<div class="notif-status">Blocked in browser settings. Enable there to receive alerts.</div>`;
    } else if(!active){
      h+=`<div class="notif-status">Turn on notifications to receive alerts for Moon ingresses, the void-of-course, planetary-hour changes, and a morning briefing.</div>`;
      h+=`<button class="notif-btn" onclick="notifToggleMaster()">Enable notifications</button>`;
    } else {
      h+=`<div class="notif-status"><strong>Active.</strong> You'll receive alerts while the app is open.</div>`;
      if(notifExpanded){
        h+=`<div class="notif-row"><div><div class="notif-label">Morning briefing</div><div class="notif-desc">Daily summary at your chosen time</div></div>`;
        h+=`<div style="display:flex;align-items:center;gap:10px"><input class="notif-time" type="time" value="${notifPrefs.morningTime}" onchange="notifSetPref('morningTime',this.value)" onclick="event.stopPropagation()"><div class="notif-toggle ${notifPrefs.morningBrief?'on':''}" onclick="notifSetPref('morningBrief',!notifPrefs.morningBrief)"></div></div></div>`;
        h+=`<div class="notif-row"><div><div class="notif-label">Moon ingress</div><div class="notif-desc">Alert when the Moon enters a new sign</div></div><div class="notif-toggle ${notifPrefs.moonIngress?'on':''}" onclick="notifSetPref('moonIngress',!notifPrefs.moonIngress)"></div></div>`;
        h+=`<div class="notif-row"><div><div class="notif-label">Void of course</div><div class="notif-desc">Alert at VOC start and end</div></div><div class="notif-toggle ${notifPrefs.vocAlerts?'on':''}" onclick="notifSetPref('vocAlerts',!notifPrefs.vocAlerts)"></div></div>`;
        h+=`<div class="notif-row"><div><div class="notif-label">Planetary hour</div><div class="notif-desc">Each new hour and its intent (can be frequent)</div></div><div class="notif-toggle ${notifPrefs.planetaryHour?'on':''}" onclick="notifSetPref('planetaryHour',!notifPrefs.planetaryHour)"></div></div>`;
        h+=`<div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="notif-btn off" onclick="notifToggleMaster()">Disable</button></div>`;
      } else {
        h+=`<div class="notif-desc" style="margin-top:4px">Tap to configure alert types.</div>`;
      }
    }
    h+=`</div>`;
  }

  h+=`</div></div>`; // end practice group
  h+=`</div>`; // end Layer 3 mechanics container
  h+=`</div>`; // end today tab

  // ══════════ NATAL TAB (natal chart, fixed stars, natal aspects, planet cards) ══════════
  h+=`<div class="tab-content ${activeTab==='natal'?'active':''}">`;
  {
    // ── Natal chart + natal aspects + fixed stars + planet cards ──
    const natalAspList=findNatalAspects();
    h+=`<div class="chart-wrap full" style="margin-bottom:16px">${renderChartWheel(cur,[],jd,400,natalAspList)}</div>`;
    h+=`<div style="display:flex;justify-content:center;gap:8px;margin:-8px 0 12px">`;
    h+=`<div class="chart-toggle ${showNatalAspectLines?'on':''}" onclick="showNatalAspectLines=!showNatalAspectLines;renderApp()">Aspects</div>`;
    h+=`</div>`;

    // Fixed Star natal contacts
    const fsNatal=scanNatalFixedStars(1.0);
    h+=`<div class="fs-card">`;
    h+=`<div class="fs-head" onclick="toggleFSNatal()">`;
    h+=`<span>Fixed Stars in Your Chart</span>`;
    h+=`<span class="section-chev ${fsNatalExpanded?'open':''}">&#9654;</span></div>`;
    h+=`<div class="fs-sub">Natal planets and angles within 1° of a named fixed star. These contacts were read by traditional astrologers as fate-threads — the star\'s nature woven into whatever point it touched.</div>`;
    if(fsNatal.length===0){
      h+=`<div class="fs-empty">No natal point sits within 1° of the principal named stars.</div>`;
    } else {
      for(const h1 of fsNatal){
        h+=`<div class="fs-hit">`;
        h+=`<div class="fs-hit-head"><div class="fs-hit-title">${pSVG(h1.point,12,'var(--gold)')} ${h1.point}<span class="fs-dot">☌</span>${h1.star.name}</div>`;
        h+=`<div class="fs-hit-orb">${h1.orb.toFixed(2)}° orb</div></div>`;
        h+=`<div class="fs-hit-nature">${h1.star.nature} · mag ${h1.star.mag}</div>`;
        if(fsNatalExpanded)h+=`<div class="fs-hit-meaning">${h1.star.meaning}</div>`;
        h+=`</div>`;
      }
    }
    h+=`</div>`;

    // ─── Natal Aspects ───
    h+=`<div class="fs-card">`;
    h+=`<div class="fs-head" onclick="toggleNatalAspects()">`;
    h+=`<span>Aspects in Your Chart</span>`;
    h+=`<span class="section-chev ${natalAspectsExpanded?'open':''}">&#9654;</span></div>`;
    h+=`<div class="fs-sub">Geometric relationships between natal points. Tight aspects (small orb) and those involving Sun, Moon, or angles carry the strongest weight. Tap any aspect for a deeper reading.</div>`;
    if(natalAspectsExpanded){
      if(natalAspList.length===0){
        h+=`<div class="fs-empty">No aspects within orb — rare, and worth noting.</div>`;
      } else {
        for(const a of natalAspList){
          const nat=ASPECT_NATURE[a.aspect]||{};
          const key=natalAspectKey(a.p1,a.p2,a.aspect);
          const depth=natalAspectDepth(a.p1,a.p2,a.aspect);
          const id='na-'+a.p1+'-'+a.p2+'-'+a.aspect;
          const isOpen=expandedCards[id];
          const lbl1=a.p1==='NorthNode'?'N.Node':a.p1;const lbl2=a.p2==='NorthNode'?'N.Node':a.p2;
          const tight=a.orb<=1?' tight':'';
          h+=`<div class="natal" data-card-id="${id}" onclick="toggleCard('${id}')" style="margin-top:8px">`;
          h+=`<div class="fs-hit-head"><div class="fs-hit-title">`;
          h+=`${pSVG(a.p1,14,'var(--gold)')} ${lbl1} <span class="fs-dot" style="color:${nat.color||'var(--text2)'};font-size:14px">${nat.glyph||''}</span> ${pSVG(a.p2,14,'var(--gold)')} ${lbl2}`;
          h+=`</div><div class="fs-hit-orb${tight}">${a.orb.toFixed(2)}°</div></div>`;
          h+=`<div class="fs-hit-nature" style="color:${nat.color||'var(--text2)'}">${a.aspect} · ${a.type}</div>`;
          h+=`<div class="natal-expand ${isOpen?'open':''}"><div style="padding:10px 0 0;border-top:1px solid var(--surface);margin-top:8px">`;
          h+=`<div style="font-size:12px;line-height:1.6;color:var(--text);margin-bottom:8px"><strong style="color:${nat.color||'var(--gold)'}">${a.aspect}:</strong> ${nat.nature||''}</div>`;
          if(depth){
            h+=`<div style="font-size:12px;line-height:1.6;color:var(--violet)"><strong>${lbl1} ${nat.glyph||''} ${lbl2}:</strong> ${depth}</div>`;
          } else {
            h+=`<div style="font-size:12px;line-height:1.6;color:var(--text2);font-style:italic">Apply the general ${a.aspect} nature above to the blend of ${lbl1}'s themes (${NATAL_VOICE[a.p1]?.title||a.p1}) with ${lbl2}'s themes (${NATAL_VOICE[a.p2]?.title||a.p2}).</div>`;
          }
          h+=`</div></div></div>`;
        }
      }
    } else {
      // Compact preview: top 6
      h+=`<div style="padding:8px 0 4px;display:flex;flex-wrap:wrap;gap:6px">`;
      for(const a of natalAspList.slice(0,6)){
        const nat=ASPECT_NATURE[a.aspect]||{};
        const lbl1=a.p1==='NorthNode'?'NN':a.p1.slice(0,3);const lbl2=a.p2==='NorthNode'?'NN':a.p2.slice(0,3);
        h+=`<span class="natal-tag" style="color:${nat.color||'var(--text2)'}">${lbl1} ${nat.glyph||''} ${lbl2}</span>`;
      }
      if(natalAspList.length>6)h+=`<span class="natal-tag" style="opacity:.6">+${natalAspList.length-6} more</span>`;
      h+=`</div>`;
    }
    h+=`</div>`;

    const natalPlanets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
    for(const p of natalPlanets){
      const lon=NATAL[p];const sign=signOf(lon);const house=houseOf(lon);
      const dig=getDignity(p,lon);const nv=NATAL_VOICE[p]||{};const hv=HOUSE_VOICE[house]||{};
      const label=p==='NorthNode'?'North Node':p;
      const id='n-'+p;const isOpen=expandedCards[id];

      h+=`<div class="natal" data-card-id="${id}" onclick="toggleCard('${id}')">`;
      h+=`<div class="natal-head">${pSVG(p,28,'var(--gold)')}<div>`;
      h+=`<div class="natal-name">${label}</div>`;
      h+=`<div class="natal-pos">${sign.name} ${sign.degree}° · House ${house}</div></div></div>`;
      if(nv.title)h+=`<div class="natal-title">${nv.title}</div>`;
      if(nv.desc)h+=`<div class="natal-desc">${nv.desc}</div>`;
      h+=`<div class="natal-tags">`;
      h+=`<span class="natal-tag">${sSVG(sign.name,13,'var(--text2)')} ${sign.name}</span>`;
      h+=`<span class="natal-tag" onclick="event.stopPropagation();showTip('House')">H${house}: ${hv.name||''}</span>`;
      if(dig)h+=`<span class="natal-tag" style="color:${dig.color}" onclick="event.stopPropagation()">${dig.label}</span>`;
      h+=`</div>`;

      // Expandable detail
      h+=`<div class="natal-expand ${isOpen?'open':''}"><div style="padding:12px 0 0;border-top:1px solid var(--surface);margin-top:10px">`;
      if(dig)h+=`<div style="font-size:12px;line-height:1.6;color:var(--text);margin-bottom:8px"><strong style="color:${dig.color}">${dig.label}:</strong> ${dig.desc}</div>`;
      const nPIH=planetInHouse(p,house);
      h+=`<div style="font-size:12px;line-height:1.6;color:var(--text);margin-bottom:8px"><strong>House ${house} (${hv.name||''}):</strong> ${nPIH||houseVoiceDesc(house)}</div>`;
      // House ruler connection
      const ruler=RULERS[sign.name];
      if(ruler&&NATAL[ruler]!==undefined){
        const rulerSign=signOf(NATAL[ruler]);const rulerHouse=houseOf(NATAL[ruler]);
        h+=`<div style="font-size:12px;line-height:1.6;color:var(--violet)"><strong>Sign Ruler:</strong> ${sign.name} is ruled by ${ruler} (in ${rulerSign.name}, House ${rulerHouse}). The condition of ${ruler} in your chart colors how this ${label} expresses itself.</div>`;
      }
      h+=`</div></div></div>`;
    }
  }
  h+=`</div>`;

  // ══════════ TOOLS TAB (Synastry + Map + Elect + Lore + Ledger) ══════════
  h+=`<div class="tab-content ${activeTab==='tools'?'active':''}">`;
  // Sub-tab bar
  h+=`<div class="tools-sub-bar" style="display:flex;gap:0;margin:0 0 12px;border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--hairline);font-size:11px;font-weight:600">`;
  const toolsTabs=[['synastry','Synastry'],['map','Map'],['elect','Elect'],['lore','Lore'],['ledger','Ledger']];
  for(const [k,label] of toolsTabs){
    h+=`<div onclick="switchToolsTab('${k}')" style="flex:1;text-align:center;padding:8px 0;cursor:pointer;${toolsSubTab===k?'background:var(--surface);color:var(--bright)':'color:var(--text3)'}">${label}</div>`;
  }
  h+=`</div>`;

  if(toolsSubTab==='synastry'){
    try{h+=renderSynastryTab();}catch(e){h+=`<div style="padding:20px;color:var(--text2);">Synastry loading error</div>`;console.error('SynastryTab:',e);}
  } else if(toolsSubTab==='map'){
    try{h+=renderAstroCartoTab();}catch(e){h+=`<div style="padding:20px;color:var(--text2);">Map loading error</div>`;console.error('AstroCartoTab:',e);}
  } else if(toolsSubTab==='elect'){
    // Electional tool — reuse existing electional panel logic
    h+=`<div style="padding:8px 0">`;
    h+=`<div style="font-size:14px;font-weight:600;color:var(--bright);margin-bottom:8px">${pSVG('Jupiter',16,'var(--violet)')} Elect a Time</div>`;
    h+=`<div style="font-size:12px;color:var(--text2);line-height:1.5;margin-bottom:12px">Choose what you want to do. The best windows in the next week will be scored and ranked.</div>`;
    h+=`<div class="elect-tasks">`;
    if(typeof ELECTIONAL_TASKS!=='undefined'){
      for(const [key,t] of Object.entries(ELECTIONAL_TASKS)){
        const sel=electionalTask===key?' selected':'';
        h+=`<div class="elect-task${sel}" onclick="pickElectionalTask('${key}')">${t.label}</div>`;
      }
    }
    h+=`</div>`;
    if(electionalTask&&electionalResults){
      const t=ELECTIONAL_TASKS[electionalTask];
      if(t&&t.notes)h+=`<div style="font-size:11px;color:var(--text3);margin-bottom:6px;line-height:1.5"><em>${t.notes}</em></div>`;
      if(electionalResults.length===0){
        h+=`<div style="font-size:12px;color:var(--text2);padding:10px">No clearly favorable windows found in the next week. Consider waiting, or proceed with the best available hour.</div>`;
      } else {
        h+=`<div class="elect-windows">`;
        for(let i=0;i<electionalResults.length;i++){
          const w=electionalResults[i];
          const rankCls=i===0?'':i===1?'rank2':'rank3';
          const poorCls=w.score<55?' poor':'';
          const scoreCls=w.score>=70?'':w.score>=55?'mid':'low';
          h+=`<div class="elect-window ${rankCls}${poorCls}">`;
          h+=`<div class="ew-head">`;
          h+=`<div class="ew-when">${pSVG(w.ruler,14,'var(--bright)')} ${fmtElectionalWhen(w.date)} · ${w.durMin}min</div>`;
          h+=`<div class="ew-score ${scoreCls}">${w.score}</div>`;
          h+=`</div>`;
          if(w.reasons.length)h+=`<div class="ew-reasons">${w.reasons.join('. ')}.</div>`;
          h+=`<div class="ew-factors">`;
          for(const f of w.factors){
            h+=`<span class="ew-chip ${f.type}">${f.label}</span>`;
          }
          h+=`</div>`;
          h+=`</div>`;
        }
        h+=`</div>`;
      }
    }
    h+=`</div>`;
  } else if(toolsSubTab==='lore'){
    // Lore / Reference content
    if(!refIntroDismissed){
      h+=`<div class="ref-intro" style="position:relative;padding-right:32px">A grounded index of the techniques, texts, and figures this app draws on — Hellenistic, Perso-Arabic, Latin, and Hermetic. Tap any term to open source and lineage.<span onclick="event.stopPropagation();dismissRefIntro()" style="position:absolute;top:8px;right:10px;cursor:pointer;color:var(--text3);font-size:16px;line-height:1;padding:4px">&times;</span></div>`;
    }
    const q=(refQuery||'').toLowerCase().trim();
    h+=`<div class="ref-search-wrap">`;
    h+=`<input class="ref-search" type="text" placeholder="Search terms, sources, figures..." value="${refQuery.replace(/"/g,'&quot;')}" oninput="setRefQuery(this.value)" onclick="event.stopPropagation()">`;
    const cats=['All','Technique','Object','Concept','Tradition','Figure'];
    h+=`<div class="ref-cats">`;
    for(const c of cats){
      h+=`<div class="ref-cat ${refCategory===c?'on':''}" onclick="setRefCat('${c}')">${c}</div>`;
    }
    h+=`</div>`;
    h+=`</div>`;
    const refFiltered=REFERENCES.filter(r=>{
      if(refCategory!=='All'&&r.cat!==refCategory)return false;
      if(!q)return true;
      return(r.term+' '+r.summary+' '+r.source+' '+r.lineage).toLowerCase().includes(q);
    });
    if(q||refCategory!=='All'){
      h+=`<div style="font-size:var(--fs-label);color:var(--text3);letter-spacing:.5px;padding:0 2px 6px;text-transform:uppercase;font-weight:600">Showing ${refFiltered.length} of ${REFERENCES.length}</div>`;
    }
    if(refFiltered.length===0){
      h+=`<div class="ref-empty">No references match your filter.</div>`;
    } else {
      const groups={};
      for(const r of refFiltered){if(!groups[r.cat])groups[r.cat]=[];groups[r.cat].push(r);}
      const catOrder=['Technique','Object','Concept','Tradition','Figure'];
      for(const c of catOrder){
        if(!groups[c])continue;
        h+=`<div class="ref-group">`;
        h+=`<div class="ref-group-head">${c}${c.endsWith('s')?'':'s'} · ${groups[c].length}</div>`;
        for(let ri=0;ri<groups[c].length;ri++){
          const r=groups[c][ri];
          const open=!!refExpanded[r.term];
          h+=`<div class="ref-card ${open?'open':''}" style="animation-delay:${Math.min(ri,6)*30}ms" onclick="toggleRef('${r.term.replace(/'/g,"\\'")}')">`;
          h+=`<div class="ref-term">${r.term}<span class="ref-term-chev">&#9654;</span></div>`;
          h+=`<div class="ref-summary">${r.summary}</div>`;
          if(open){
            const u=REF_USEFUL[r.term]||{};
            h+=`<div class="ref-meta">`;
            if(u.whenItMatters)h+=`<div class="ref-meta-row"><span class="ref-meta-k">When it matters</span><span class="ref-meta-v">${u.whenItMatters}</span></div>`;
            if(u.howToRead)h+=`<div class="ref-meta-row"><span class="ref-meta-k">How to read it</span><span class="ref-meta-v">${u.howToRead}</span></div>`;
            if(u.watchFor)h+=`<div class="ref-meta-row"><span class="ref-meta-k">Watch for</span><span class="ref-meta-v">${u.watchFor}</span></div>`;
            if(!u.whenItMatters&&!u.howToRead&&!u.watchFor){
              h+=`<div class="ref-meta-row"><span class="ref-meta-k">Note</span><span class="ref-meta-v">Practical guidance for this term has not been written yet — see the summary above.</span></div>`;
            }
            h+=`</div>`;
          }
          h+=`</div>`;
        }
        h+=`</div>`;
      }
    }
  } else if(toolsSubTab==='ledger'){
    // ═══════ LEDGER VIEW (Phase 3.3) ═══════
    const jEntries=loadJournal();
    const now3=Date.now();

    // ── Mood Stats Strip (30/90/365) ──
    h+=`<div style="font-size:14px;font-weight:600;color:var(--bright);margin-bottom:12px">Ledger</div>`;
    h+=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">`;
    for(const span of [30,90,365]){
      const cutoff=now3-(span*86400000);
      const inRange=jEntries.filter(e=>e.ts>=cutoff);
      const withMood=inRange.filter(e=>e.mood);
      const avg=withMood.length?withMood.reduce((s,e)=>s+e.mood,0)/withMood.length:0;
      const variance=withMood.length>1?Math.sqrt(withMood.reduce((s,e)=>s+Math.pow(e.mood-avg,2),0)/(withMood.length-1)):0;
      h+=`<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center">`;
      h+=`<div style="font-size:11px;color:var(--text2);margin-bottom:4px">${span}d</div>`;
      h+=`<div style="font-size:20px;font-weight:600;color:var(--bright)">${avg?avg.toFixed(1):'—'}</div>`;
      h+=`<div style="font-size:10px;color:var(--text2)">${withMood.length} entries${variance?(' · var '+variance.toFixed(1)):''}</div>`;
      h+=`</div>`;
    }
    h+=`</div>`;

    // ── Synthesis Accuracy Panel ──
    const tracked=jEntries.filter(e=>e.ctx&&e.ctx.synthesisText);
    const rated=tracked.filter(e=>e.ctx.synthesisRating&&e.ctx.synthesisRating!=='untested');
    h+=`<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:16px">`;
    h+=`<div style="font-size:13px;font-weight:600;color:var(--bright);margin-bottom:8px">Synthesis Accuracy</div>`;
    if(tracked.length===0){
      h+=`<div style="font-size:12px;color:var(--text2)">No synthesis entries tracked yet. Use the journal in Today to start logging synthesis accuracy.</div>`;
    } else {
      // Overall counts
      const rc={hit:0,partial:0,miss:0,untested:0};
      for(const e of tracked){const r=e.ctx.synthesisRating;if(r&&rc[r]!==undefined)rc[r]++;else rc.untested++;}
      const totalRated=rc.hit+rc.partial+rc.miss;
      const hitRate=totalRated?Math.round(rc.hit/totalRated*100):0;
      h+=`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px">`;
      h+=`<span style="font-size:12px;color:#4ade80">Hit: ${rc.hit}</span>`;
      h+=`<span style="font-size:12px;color:#fbbf24">Partial: ${rc.partial}</span>`;
      h+=`<span style="font-size:12px;color:#f87171">Miss: ${rc.miss}</span>`;
      h+=`<span style="font-size:12px;color:var(--text2)">Untested: ${rc.untested}</span>`;
      if(totalRated)h+=`<span style="font-size:12px;color:var(--bright);font-weight:600">Hit rate: ${hitRate}%</span>`;
      h+=`</div>`;

      // Per-token accuracy
      const tokenAcc={};
      for(const e of tracked){
        const tokens=e.ctx.synthesisTokens||[];
        const r=e.ctx.synthesisRating||'untested';
        for(const t of tokens){
          const tt=t.split(':')[0];
          if(!tokenAcc[tt])tokenAcc[tt]={hit:0,partial:0,miss:0,untested:0,total:0};
          tokenAcc[tt].total++;
          if(tokenAcc[tt][r]!==undefined)tokenAcc[tt][r]++;
        }
      }
      const tokenTypes=Object.keys(tokenAcc).sort((a,b)=>tokenAcc[b].total-tokenAcc[a].total);
      if(tokenTypes.length){
        h+=`<div style="font-size:11px;color:var(--text2);margin-bottom:4px;margin-top:8px">Per-technique accuracy</div>`;
        for(const tt of tokenTypes){
          const ta=tokenAcc[tt];
          const tRated=ta.hit+ta.partial+ta.miss;
          const tHit=tRated?Math.round(ta.hit/tRated*100):null;
          const label=typeof citationLabel==='function'?citationLabel(tt,''):tt;
          h+=`<div style="font-size:12px;color:var(--text1);padding:3px 0;display:flex;justify-content:space-between">`;
          h+=`<span>${label}</span>`;
          h+=`<span style="color:var(--text2)">${ta.hit}h/${ta.partial}p/${ta.miss}m (${ta.total} total${tHit!==null?' · '+tHit+'%':''})</span>`;
          h+=`</div>`;
        }
      }
    }
    h+=`</div>`;

    // ── Echo Cluster Grid ──
    h+=`<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:16px">`;
    h+=`<div style="font-size:13px;font-weight:600;color:var(--bright);margin-bottom:8px">Echo Clusters</div>`;
    // Group entries by shared configuration signatures
    const clusters={};
    for(const e of jEntries){
      if(!e.ctx)continue;
      const sig=[e.ctx.moonSign||'',e.ctx.yearLord||'',e.ctx.monthLord||''].join('|');
      if(!clusters[sig])clusters[sig]={entries:[],moonSign:e.ctx.moonSign,yearLord:e.ctx.yearLord,monthLord:e.ctx.monthLord};
      clusters[sig].entries.push(e);
    }
    const clusterArr=Object.values(clusters).filter(c=>c.entries.length>=2).sort((a,b)=>b.entries.length-a.entries.length).slice(0,8);
    if(clusterArr.length===0){
      h+=`<div style="font-size:12px;color:var(--text2)">Not enough entries to form clusters. Keep logging to see patterns.</div>`;
    } else {
      h+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">`;
      for(const c of clusterArr){
        const moods=c.entries.filter(e=>e.mood);
        const cAvg=moods.length?moods.reduce((s,e)=>s+e.mood,0)/moods.length:0;
        const moodColor=cAvg>=4?'#4ade80':cAvg>=3?'#fbbf24':'#f87171';
        h+=`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:8px;text-align:center">`;
        h+=`<div style="font-size:11px;color:var(--text2)">${c.moonSign||'?'} Moon</div>`;
        h+=`<div style="font-size:11px;color:var(--text2)">${c.yearLord||'?'} yr / ${c.monthLord||'?'} mo</div>`;
        h+=`<div style="font-size:18px;font-weight:600;color:${moodColor};margin:4px 0">${cAvg?cAvg.toFixed(1):'—'}</div>`;
        h+=`<div style="font-size:10px;color:var(--text2)">${c.entries.length} entries</div>`;
        h+=`</div>`;
      }
      h+=`</div>`;
    }
    h+=`</div>`;

    // ── Entry Timeline ──
    h+=`<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:16px">`;
    h+=`<div style="font-size:13px;font-weight:600;color:var(--bright);margin-bottom:8px">Entry Timeline</div>`;
    const timelineEntries=jEntries.slice(0,50);
    if(timelineEntries.length===0){
      h+=`<div style="font-size:12px;color:var(--text2)">No journal entries yet.</div>`;
    } else {
      for(const e of timelineEntries){
        const d=new Date(e.ts);
        const dateStr=d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
        const timeStr=d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
        const moodDots='*'.repeat(e.mood||0);
        const moodColor=(e.mood||0)>=4?'#4ade80':(e.mood||0)>=3?'#fbbf24':'#f87171';
        const hasSynth=e.ctx&&e.ctx.synthesisText;
        const rating=e.ctx&&e.ctx.synthesisRating;
        const ratingBadge=rating&&rating!=='untested'?` <span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${rating==='hit'?'#166534':rating==='partial'?'#854d0e':'#991b1b'};color:#fff">${rating}</span>`:'';

        h+=`<div style="border-bottom:1px solid var(--border);padding:8px 0;cursor:pointer" onclick="this.querySelector('.ledger-synth')&&this.querySelector('.ledger-synth').classList.toggle('ledger-synth-open')">`;
        h+=`<div style="display:flex;justify-content:space-between;align-items:center">`;
        h+=`<div><span style="font-size:12px;color:var(--text2)">${dateStr} ${timeStr}</span>`;
        h+=` <span style="color:${moodColor};font-size:13px;font-weight:600">${moodDots}</span>${ratingBadge}</div>`;
        if(e.ctx)h+=`<span style="font-size:10px;color:var(--text2)">${e.ctx.moonSign||''} ${e.ctx.yearLord||''}</span>`;
        h+=`</div>`;
        if(e.note)h+=`<div style="font-size:12px;color:var(--text1);margin-top:3px">${e.note.length>80?e.note.slice(0,80)+'...':e.note}</div>`;
        if(hasSynth){
          h+=`<div class="ledger-synth" style="max-height:0;overflow:hidden;transition:max-height .3s ease">`;
          h+=`<div style="font-size:11px;color:var(--text2);margin-top:6px;padding:6px;background:var(--bg);border-radius:4px;line-height:1.5">${e.ctx.synthesisText.length>300?e.ctx.synthesisText.slice(0,300)+'...':e.ctx.synthesisText}</div>`;
          if(e.ctx.synthesisFeedback)h+=`<div style="font-size:11px;color:var(--text2);margin-top:4px;font-style:italic">Feedback: ${e.ctx.synthesisFeedback}</div>`;
          h+=`</div>`;
        }
        h+=`</div>`;
      }
    }
    h+=`</div>`;

    // ── Past Consults ──
    if(typeof loadConsults==='function'){
      const consults=loadConsults();
      if(consults.length>0){
        h+=`<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:16px">`;
        h+=`<div style="font-size:13px;font-weight:600;color:var(--bright);margin-bottom:8px">Past Consults</div>`;
        for(const c of consults.slice(0,20)){
          const d=new Date(c.ts);
          const dateStr=d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
          const timeStr=d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
          const etLabel=c.eventType||'';
          const ratingBadge=c.rating?` <span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${c.rating==='hit'?'#166534':'#991b1b'};color:#fff">${c.rating}</span>`:'';
          h+=`<div style="border-bottom:1px solid var(--border);padding:8px 0;cursor:pointer" onclick="this.querySelector('.consult-expand')&&this.querySelector('.consult-expand').classList.toggle('ledger-synth-open')">`;
          h+=`<div style="display:flex;justify-content:space-between;align-items:center">`;
          h+=`<span style="font-size:12px;color:var(--text2)">${dateStr} ${timeStr}</span>`;
          h+=`<span style="font-size:11px;color:var(--gold)">${etLabel}</span>${ratingBadge}`;
          h+=`</div>`;
          if(c.freeText)h+=`<div style="font-size:11px;color:var(--text2);margin-top:2px">${c.freeText}</div>`;
          h+=`<div class="consult-expand" style="max-height:0;overflow:hidden;transition:max-height .3s ease">`;
          h+=`<div style="font-size:12px;color:var(--text1);margin-top:6px;padding:6px;background:var(--bg);border-radius:4px;line-height:1.5">${(c.text||'').slice(0,400)}</div>`;
          if(!c.rating){
            h+=`<div style="display:flex;gap:6px;margin-top:6px">`;
            h+=`<button onclick="event.stopPropagation();rateConsult(${c.ts},'hit');renderApp()" style="font-size:10px;padding:3px 10px;border-radius:4px;border:1px solid #166534;background:none;color:#4ade80;cursor:pointer">Hit</button>`;
            h+=`<button onclick="event.stopPropagation();rateConsult(${c.ts},'miss');renderApp()" style="font-size:10px;padding:3px 10px;border-radius:4px;border:1px solid #991b1b;background:none;color:#f87171;cursor:pointer">Miss</button>`;
            h+=`</div>`;
          }
          h+=`</div>`;
          h+=`</div>`;
        }
        h+=`</div>`;
      }
    }

    // ── Export Button ──
    h+=`<div style="text-align:center;padding:12px 0">`;
    h+=`<button onclick="exportLedgerJSON()" style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:10px 24px;color:var(--bright);font-size:13px;cursor:pointer">Export Journal as JSON</button>`;
    h+=`</div>`;
  }
  h+=`</div>`; // end tools tab

  // ══════════ HOME TAB (adaptive dashboard) ══════════
  h+=`<div class="tab-content ${activeTab==='home'?'active':''}">`;
  {
    const localNow=new Date(now.toLocaleString('en-US',{timeZone:OBSERVER.tzName}));
    const localH=localNow.getHours();
    const greeting=timeGreeting(now);
    const timeMode=localH<12?'morning':localH<17?'afternoon':'evening';

    // Moon phase visual
    const moonSvgHome=moonPhaseSvg(phaseAngle,72);

    // Planetary hour info
    const pHHome=pHoursHome;
    let curHrHome=null,minsLeftHome=0;
    if(pHHome){
      const utNow2=now.getUTCHours()+now.getUTCMinutes()/60;
      const idx2=currentHourIndex(pHHome.hours,utNow2);
      curHrHome=pHHome.hours[idx2];
      const nextHr=pHHome.hours[(idx2+1)%24];
      minsLeftHome=Math.round((nextHr.start-utNow2)*60);
      if(minsLeftHome<0)minsLeftHome+=24*60;
    }

    // Hero card
    h+=`<div style="text-align:center;padding:24px 0 16px">`;
    h+=`<div style="font-size:var(--fs-sub);color:var(--bright);font-weight:600;margin-bottom:4px">${greeting}</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2)">${now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',timeZone:OBSERVER.tzName})}</div>`;
    h+=`</div>`;

    // Moon + phase card
    h+=`<div style="display:flex;align-items:center;gap:16px;background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px;cursor:pointer" onclick="switchTab('today')">`;
    h+=`<div>${moonSvgHome}</div>`;
    h+=`<div style="flex:1">`;
    h+=`<div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">${mPhase} Moon in ${moonSign}</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2);margin-top:2px">${vocResult.voc?'Void of course — pause new starts':'Moon is applying aspects'}</div>`;
    h+=`</div>`;
    h+=`<div style="font-size:var(--fs-label);color:var(--text3)">&#8250;</div>`;
    h+=`</div>`;

    // Current hour card
    if(curHrHome){
      const hrPurpose=typeof HOUR_PURPOSES!=='undefined'&&HOUR_PURPOSES[curHrHome.ruler]?HOUR_PURPOSES[curHrHome.ruler]:{};
      h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px;cursor:pointer" onclick="switchTab('today')">`;
      h+=`<div style="display:flex;justify-content:space-between;align-items:center">`;
      h+=`<div style="display:flex;align-items:center;gap:8px">`;
      h+=`${pSVG(curHrHome.ruler,20,'var(--gold)')}`;
      h+=`<div><div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">Hour of ${curHrHome.ruler}</div>`;
      h+=`<div style="font-size:var(--fs-meta);color:var(--text2)">${hrPurpose.brief||'Traditional planetary hour'}</div></div>`;
      h+=`</div>`;
      h+=`<div style="text-align:right"><div style="font-size:var(--fs-metric);font-weight:600;color:var(--gold)">${minsLeftHome}m</div><div style="font-size:var(--fs-label);color:var(--text3)">remaining</div></div>`;
      h+=`</div>`;
      h+=`</div>`;
    }

    // Adaptive content by time of day
    if(timeMode==='morning'){
      // Morning: reading + plan focus
      h+=`<div style="font-size:var(--fs-label);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin:16px 0 8px">Today's Reading</div>`;
      const dayShape2=window._pendingSynthesisForJournal;
      if(dayShape2&&dayShape2.text){
        h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px;font-size:var(--fs-body);color:var(--text);line-height:1.7;cursor:pointer" onclick="switchTab('today')">`;
        h+=`${renderCitations(dayShape2.text.length>300?dayShape2.text.slice(0,300)+'...':dayShape2.text)}`;
        h+=`<div style="font-size:var(--fs-label);color:var(--gold);margin-top:8px">Read full reading &#8250;</div>`;
        h+=`</div>`;
      }
      // Top 2 transits
      const topHome=transits.filter(t=>t.importance>10).slice(0,2);
      if(topHome.length){
        h+=`<div style="font-size:var(--fs-label);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin:16px 0 8px">Key Transits</div>`;
        for(const t of topHome){
          h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer" onclick="switchTab('today')">`;
          h+=`${pSVG(t.tp,18,'var(--gold)')}`;
          h+=`<div style="flex:1"><div style="font-size:var(--fs-meta);color:var(--bright)">${t.tp} ${t.aspect.name} natal ${t.np}</div>`;
          h+=`<div style="font-size:var(--fs-label);color:var(--text2)">${t.aspect.motion} · ${t.orb||t.aspect.orbActual?.toFixed(1)||''}° orb</div></div>`;
          h+=`</div>`;
        }
      }
    } else if(timeMode==='afternoon'){
      // Afternoon: hour + consult focus
      h+=`<div style="font-size:var(--fs-label);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin:16px 0 8px">Quick Consult</div>`;
      h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px">`;
      h+=`<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6;margin-bottom:12px">Ask whether this moment is right for a specific action. The consult weighs the current planetary hour, Moon condition, active transits, and your natal chart.</div>`;
      h+=`<button onclick="switchTab('today');layersExpanded.l3=true;mechGroupOpen.timing=true;openConsultV2();renderApp()" style="background:var(--gold-soft);border:1px solid var(--gold-line);border-radius:var(--r-sm);padding:8px 20px;color:var(--gold);font-size:var(--fs-meta);font-weight:600;cursor:pointer;width:100%">Consult the Moment</button>`;
      h+=`</div>`;
      // Profection status
      h+=`<div style="font-size:var(--fs-label);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin:16px 0 8px">Year Lord</div>`;
      h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px;display:flex;align-items:center;gap:12px;cursor:pointer" onclick="switchTab('today')">`;
      h+=`${pSVG(prof.yearLord,28,'var(--gold)')}`;
      h+=`<div><div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">${prof.yearLord} is steering your year</div>`;
      const profLordSign2=signOf(cur[prof.yearLord]||0);
      h+=`<div style="font-size:var(--fs-meta);color:var(--text2)">Currently in ${profLordSign2.name} at ${profLordSign2.degree}°</div></div>`;
      h+=`</div>`;
    } else {
      // Evening: journal + reflection
      h+=`<div style="font-size:var(--fs-label);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin:16px 0 8px">Evening Reflection</div>`;
      h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px">`;
      h+=`<div style="font-size:var(--fs-body);color:var(--text);line-height:1.6;margin-bottom:12px">How did the day go? Log your mood and note, and the app will track which astrological configurations correlate with your experiences over time.</div>`;
      h+=`<button onclick="switchTab('today');layersExpanded.l3=true;mechGroupOpen.practice=true;renderApp()" style="background:var(--violet-soft);border:1px solid var(--violet-line);border-radius:var(--r-sm);padding:8px 20px;color:var(--violet);font-size:var(--fs-meta);font-weight:600;cursor:pointer;width:100%">Open Journal</button>`;
      h+=`</div>`;
      // Day summary
      const dayShape3=window._pendingSynthesisForJournal;
      if(dayShape3&&dayShape3.text){
        h+=`<div style="font-size:var(--fs-label);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin:16px 0 8px">Today's Reading</div>`;
        h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:16px;margin-bottom:12px;font-size:var(--fs-body);color:var(--text);line-height:1.7;cursor:pointer" onclick="switchTab('today')">`;
        h+=`${renderCitations(dayShape3.text.length>200?dayShape3.text.slice(0,200)+'...':dayShape3.text)}`;
        h+=`<div style="font-size:var(--fs-label);color:var(--gold);margin-top:8px">Full reading &#8250;</div>`;
        h+=`</div>`;
      }
    }

    // Quick links row
    h+=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">`;
    h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:14px;text-align:center;cursor:pointer" onclick="switchTab('natal')">`;
    h+=`<div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">Your Chart</div>`;
    h+=`<div style="font-size:var(--fs-label);color:var(--text2);margin-top:2px">Natal positions</div></div>`;
    h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:14px;text-align:center;cursor:pointer" onclick="switchTab('tools');toolsSubTab='synastry';renderApp()">`;
    h+=`<div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">Synastry</div>`;
    h+=`<div style="font-size:var(--fs-label);color:var(--text2);margin-top:2px">Compare charts</div></div>`;
    h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:14px;text-align:center;cursor:pointer" onclick="switchTab('tools');toolsSubTab='elect';renderApp()">`;
    h+=`<div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">Elect a Time</div>`;
    h+=`<div style="font-size:var(--fs-label);color:var(--text2);margin-top:2px">Best windows</div></div>`;
    h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:14px;text-align:center;cursor:pointer" onclick="switchTab('guide')">`;
    h+=`<div style="font-size:var(--fs-body);font-weight:600;color:var(--bright)">Guide</div>`;
    h+=`<div style="font-size:var(--fs-label);color:var(--text2);margin-top:2px">How it works</div></div>`;
    h+=`</div>`;

    // Retrogrades notice
    if(retros.length>0){
      h+=`<div style="background:var(--crimson-soft);border:1px solid var(--crimson-line);border-radius:var(--r-md);padding:12px;margin-top:12px;display:flex;align-items:center;gap:10px">`;
      h+=`<div style="font-size:var(--fs-meta);color:var(--crimson);font-weight:600">${retros.length} retrograde${retros.length>1?'s':''}</div>`;
      h+=`<div style="font-size:var(--fs-meta);color:var(--text2)">${retros.join(', ')}</div>`;
      h+=`</div>`;
    }
  }
  h+=`</div>`; // end home tab

  // ══════════ GUIDE TAB (cards + glossary + walkthrough) ══════════
  h+=`<div class="tab-content ${activeTab==='guide'?'active':''}">`;
  {
    // Guide mode switcher
    h+=`<div style="display:flex;gap:0;margin:0 0 16px;border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--hairline);font-size:var(--fs-ui);font-weight:600">`;
    const guideModes=[['cards','Feature Cards'],['glossary','Glossary'],['walkthrough','Walkthrough']];
    for(const [k,label] of guideModes){
      h+=`<div onclick="guideMode='${k}';renderApp()" style="flex:1;text-align:center;padding:8px 0;cursor:pointer;${guideMode===k?'background:var(--surface);color:var(--bright)':'color:var(--text3)'}">${label}</div>`;
    }
    h+=`</div>`;

    if(guideMode==='cards'){
      // ── Interactive Feature Cards ──
      const featureCards=[
        {title:'Daily Reading',icon:'Sun',desc:'Your personalized synthesis of the day, drawing on transits, profections, planetary hours, and time lords. Refreshed each morning.',beginner:'This is the big-picture view of what today looks like astrologically. Think of it as your daily weather report for the sky.',tab:'today'},
        {title:'Planetary Hours',icon:'Saturn',desc:'The day divided into 12 day-hours and 12 night-hours, each ruled by a classical planet. The hour ruler shapes the quality of the current moment.',beginner:'Each hour of the day has a planet in charge. A Venus hour is good for socializing; a Mars hour is good for assertive action. The app tells you which hour it is right now.',tab:'today'},
        {title:'Moon Tracking',icon:'Moon',desc:'Phase, sign, mansion, decan, void-of-course status, and mansion indications. The Moon moves through a sign every 2.5 days.',beginner:'The Moon changes signs every few days and affects your mood and energy. The app tracks exactly where it is and what that means for you.',tab:'today'},
        {title:'Consult the Moment',icon:'Mercury',desc:'Ask if now is the right time for a specific action. Uses planetary hour, Moon condition, transits, and your natal chart. Backed by Claude Haiku.',beginner:'About to have a difficult conversation or sign a contract? Ask the app if the timing is favorable. It checks all the astrological factors and gives you a plain-English answer.',tab:'today'},
        {title:'Natal Chart',icon:'Jupiter',desc:'Your birth chart: planet positions, house placements, dignity, ruler chains, fixed star contacts, and natal aspects with full interpretations.',beginner:'Your natal chart is the map of the sky at the exact moment you were born. It describes your personality, strengths, and life themes. This tab shows every detail.',tab:'natal'},
        {title:'Synastry',icon:'Venus',desc:'Compare two natal charts. See inter-chart aspects, a biwheel overlay, and a full compatibility reading covering chemistry, communication, and growth edges.',beginner:'Curious about compatibility with someone? Enter their birth details and see how your charts interact.',tab:'tools'},
        {title:'Astrocartography',icon:'Mars',desc:'A world map showing where each planet sits on your angles. Find places where specific planetary energies are strongest for you.',beginner:'Ever wonder why you feel different in different cities? Astrocartography maps which planet energies are strongest at each location on Earth.',tab:'tools'},
        {title:'Electional Tool',icon:'Jupiter',desc:'Pick a task and see the three best time windows in the next week, scored on hour ruler, Moon sign, VOC status, and retrogrades.',beginner:'Need to pick the best time to start something? The electional tool scans the next week and tells you when conditions are most favorable.',tab:'tools'},
        {title:'Reference Glossary',icon:'Saturn',desc:'A searchable index of astrological techniques, texts, and figures drawn from Hellenistic, Perso-Arabic, and Hermetic traditions.',beginner:'Not sure what a term means? The glossary explains every technique and concept the app uses, with sources.',tab:'tools'},
        {title:'Journal & Ledger',icon:'Moon',desc:'Log mood and notes daily. The app captures the astrological context and tracks which configurations correlate with your experiences over time.',beginner:'Keep a daily mood log. Over time, the app shows you patterns in how different astrological conditions affect your day.',tab:'tools'},
        {title:'Time Lords',icon:'Saturn',desc:'Zodiacal Releasing, Firdaria, and profections — long-arc timing techniques that describe what chapter of life you are in and what planet is steering it.',beginner:'These are the slow-moving cycles of your life. Think of them as seasons that last months or years. They tell you what themes are active now.',tab:'today'},
        {title:'Hermetic Lots',icon:'Jupiter',desc:'Seven mathematical points (Fortune, Spirit, Eros, Necessity, Courage, Victory, Nemesis) computed from your natal chart. Each maps a dimension of fate.',beginner:'Ancient formulas that combine your Sun, Moon, and Ascendant to reveal hidden themes in your chart like luck, purpose, love, and challenges.',tab:'today'}
      ];
      h+=`<div style="font-size:var(--fs-body);color:var(--text2);line-height:1.6;margin-bottom:16px">Tap any card to learn more. Each feature includes a plain-English explanation and a link to try it.</div>`;
      for(const fc of featureCards){
        const fcId='gc-'+fc.title.replace(/\s/g,'-');
        const isOpen=expandedCards[fcId];
        h+=`<div class="card" data-card-id="${fcId}" onclick="toggleCard('${fcId}')" style="cursor:pointer">`;
        h+=`<div style="display:flex;align-items:center;gap:10px">`;
        h+=`${pSVG(fc.icon,20,'var(--gold)')}`;
        h+=`<div style="flex:1;font-size:var(--fs-body);font-weight:600;color:var(--bright)">${fc.title}</div>`;
        h+=`<span style="font-size:10px;color:var(--text3);transition:transform .2s;${isOpen?'transform:rotate(90deg)':''}">&#9654;</span>`;
        h+=`</div>`;
        h+=`<div class="natal-expand ${isOpen?'open':''}"><div style="padding:10px 0 4px">`;
        h+=`<div style="font-size:var(--fs-meta);color:var(--text);line-height:1.6;margin-bottom:8px">${fc.desc}</div>`;
        h+=`<div style="font-size:var(--fs-meta);color:var(--emerald);line-height:1.6;margin-bottom:10px;padding:8px;background:var(--emerald-soft);border-radius:6px"><strong>In plain English:</strong> ${fc.beginner}</div>`;
        h+=`<button onclick="event.stopPropagation();switchTab('${fc.tab}')" style="background:var(--gold-soft);border:1px solid var(--gold-line);border-radius:6px;padding:5px 16px;font-size:var(--fs-ui);color:var(--gold);cursor:pointer">Try it &#8250;</button>`;
        h+=`</div></div>`;
        h+=`</div>`;
      }
    } else if(guideMode==='glossary'){
      // ── Searchable Glossary ──
      h+=`<input class="ref-search" type="text" placeholder="Search terms..." value="${guideSearch.replace(/"/g,'&quot;')}" oninput="guideSearch=this.value;renderApp()" style="width:100%;margin-bottom:12px">`;
      const gq=guideSearch.toLowerCase().trim();
      const glossaryTerms=[
        {term:'Sect',def:'Whether a chart is diurnal (day birth) or nocturnal (night birth). Your chart is nocturnal. This determines which planets are in sect (working with the chart) and which are out of sect (working against it). The sect light leads the team: Moon for nocturnal charts, Sun for diurnal.',simple:'Were you born during the day or night? This single fact changes how every planet in your chart behaves.'},
        {term:'Profection',def:'An annual timing technique. Starting from your Ascendant, each year of life advances one sign and one house. The ruler of that sign becomes your Year Lord, steering the year\'s themes.',simple:'Every birthday you enter a new astrological year, and a different planet takes the wheel.'},
        {term:'Void of Course',def:'When the Moon will make no more exact aspects before leaving its current sign. Actions begun during VOC traditionally fail to produce results or take unexpected turns.',simple:'A brief period when the Moon is "between tasks." Not ideal for starting something new.'},
        {term:'Dignity',def:'How well a planet can act in the sign it occupies. Domicile and exaltation are strong; detriment and fall are challenged. A dignified planet can express its nature freely.',simple:'Some signs are a planet\'s home turf; others are uncomfortable territory. The app tells you which.'},
        {term:'Applying',def:'An aspect that is still building toward exact alignment. The energy is incoming — the event or experience is approaching.',simple:'The aspect hasn\'t peaked yet. It\'s coming.'},
        {term:'Separating',def:'An aspect that has already peaked and is now unwinding. The energy is receding — the experience happened or is fading.',simple:'The aspect already peaked. The energy is fading.'},
        {term:'Zodiacal Releasing',def:'A Hellenistic timing technique from Vettius Valens. Releases from the Lot of Spirit divide life into chapters (L1 = years, L2 = months). Peaks occur at angles from the starting sign. Loosing of the Bond marks major transitions.',simple:'Divides your life into big chapters and sub-chapters, showing when major shifts in purpose and direction happen.'},
        {term:'Firdaria',def:'A Persian timing technique assigning a sequence of planetary lords to multi-year periods. Nocturnal charts begin with the Moon. Each major period has seven sub-periods.',simple:'A long-term planetary schedule. Right now, one planet is the main theme of your life chapter.'},
        {term:'Planetary Hours',def:'The day divided into 12 unequal day-hours and 12 night-hours, each ruled by a classical planet in Chaldean order. The hour ruler shapes the quality of the moment.',simple:'Every hour has a planet in charge. Venus hours are good for socializing; Saturn hours for focused work.'},
        {term:'Lunar Mansion',def:'One of 28 divisions of the Moon\'s path (12.86° each), from the Perso-Arabic tradition. Each mansion has specific indications for what activities to pursue or avoid.',simple:'The Moon passes through 28 ancient "stations" as it orbits. Each station has its own personality.'},
        {term:'Decan',def:'Each sign is divided into three 10° segments (decans), each with its own planetary ruler and symbolic meaning. The Chaldean decan system assigns rulers in the planetary order.',simple:'Each zodiac sign has three sub-sections. The decan tells you which "flavor" of the sign a planet is in.'},
        {term:'Hermetic Lots',def:'Mathematical points computed from three chart factors (usually two planets and the Ascendant). The seven lots (Fortune, Spirit, Eros, Necessity, Courage, Victory, Nemesis) map dimensions of fate and agency.',simple:'Ancient formulas that reveal hidden themes in your chart like luck, purpose, love, and challenges.'},
        {term:'Transit',def:'A currently moving planet forming an aspect to a point in your natal chart. The transit\'s importance depends on which planets are involved and how tight the aspect is.',simple:'When a planet in the sky right now lines up with a planet in your birth chart, that\'s a transit. It activates something in your chart.'},
        {term:'Aspect',def:'A geometric angle between two planets. The five Ptolemaic aspects are conjunction (0°), sextile (60°), square (90°), trine (120°), and opposition (180°). Each has a distinct nature.',simple:'When two planets are at specific angles to each other, they interact. Some angles are harmonious, others are tense.'},
        {term:'Fixed Stars',def:'Named stars near the ecliptic. Traditional astrologers read stars conjunct natal planets as fate-threads, adding mythological and temperamental qualities to the planet they touch.',simple:'Bright stars near your natal planets add extra meaning — like a star\'s personality rubbing off on your planet.'},
        {term:'Solar Return',def:'A chart cast for the exact moment the Sun returns to its natal degree each year. The return chart describes the year ahead.',simple:'Your birthday chart. The sky at the exact moment you turn a new age hints at what the coming year holds.'},
        {term:'Lunar Return',def:'A chart cast for the exact moment the Moon returns to its natal degree each month. Describes the coming lunar cycle.',simple:'Like a solar return but monthly. Shows the emotional weather for the next few weeks.'}
      ];
      const filteredGloss=glossaryTerms.filter(g=>!gq||g.term.toLowerCase().includes(gq)||g.def.toLowerCase().includes(gq));
      h+=`<div style="font-size:var(--fs-label);color:var(--text3);margin-bottom:8px">Showing ${filteredGloss.length} of ${glossaryTerms.length} terms</div>`;
      for(const g of filteredGloss){
        const gId='gg-'+g.term;
        const isOpen=expandedCards[gId];
        h+=`<div class="card" data-card-id="${gId}" onclick="toggleCard('${gId}')" style="cursor:pointer">`;
        h+=`<div style="display:flex;justify-content:space-between;align-items:center">`;
        h+=`<div style="font-size:var(--fs-body);font-weight:600;color:var(--gold)">${g.term}</div>`;
        h+=`<span style="font-size:10px;color:var(--text3);transition:transform .2s;${isOpen?'transform:rotate(90deg)':''}">&#9654;</span>`;
        h+=`</div>`;
        h+=`<div class="natal-expand ${isOpen?'open':''}"><div style="padding:8px 0 4px">`;
        h+=`<div style="font-size:var(--fs-meta);color:var(--text);line-height:1.6;margin-bottom:8px">${g.def}</div>`;
        h+=`<div style="font-size:var(--fs-meta);color:var(--emerald);line-height:1.6;padding:8px;background:var(--emerald-soft);border-radius:6px"><strong>Simply put:</strong> ${g.simple}</div>`;
        h+=`</div></div>`;
        h+=`</div>`;
      }
    } else if(guideMode==='walkthrough'){
      // ── Guided Walkthrough ──
      const walkSteps=[
        {title:'Welcome',content:'This app is a traditional astrology companion. It computes your chart from astronomical algorithms, tracks the sky in real time, and synthesizes a daily reading grounded in Hellenistic doctrine. It is not pop astrology — every number comes from mathematical computation, not a horoscope column. This walkthrough will show you each major feature.',simple:'Think of this as a smart astronomy calculator combined with an ancient interpretive tradition.'},
        {title:'The Home Tab',content:'Home adapts to the time of day. In the morning you see your daily reading and key transits. In the afternoon it highlights the current planetary hour and offers the Consult tool. In the evening it suggests journaling. Quick-link cards let you jump to any feature.',simple:'Your dashboard. It shows you what matters right now.'},
        {title:'The Today Tab',content:'The Today tab has three layers. Layer 1 is a plain-English synthesis of the day. Layer 2 lists the most significant factors. Layer 3 expands into the full workshop of techniques grouped into five categories: Timing, Positions, Transits, Time Lords, and Practice. Citation pills in the reading link directly to the technique they reference.',simple:'Layer 1 tells you the shape of the day. Layer 2 shows why. Layer 3 lets you dig deeper.'},
        {title:'Natal Tab',content:'Your birth chart as a studied object. The natal biwheel shows your planet positions, and below it you will find fixed star contacts, natal aspects with full interpretive cards, and per-planet cards showing sign, house, dignity, and ruler chains.',simple:'Everything about your birth chart in one place.'},
        {title:'Tools',content:'Five sub-tabs. Synastry compares two charts. Map shows your astrocartography lines on a world map. Elect finds the best time windows for a task. Lore is a searchable reference glossary. Ledger tracks your journal entries and synthesis accuracy over time.',simple:'Where you do things with astrology beyond reading the day.'},
        {title:'Settings',content:'Configure your Claude API key for AI-generated readings, view your birth data and observer location, manage notifications, clear caches, and export your journal data.',simple:'Adjust the app to work the way you want.'},
        {title:'Tips',content:'Swipe left/right to navigate days. Tap citation pills to jump to the technique they reference. The time-scale strip at the top shows where you sit across four nested time scales (hour, month, year, life chapter). Tap any cell for context. The app works offline once installed as a PWA.',simple:'Swipe to move between days. Tap gold pills for details. Install it as an app for offline use.'}
      ];
      const step=Math.min(guideWalkthroughStep,walkSteps.length-1);
      const ws=walkSteps[step];
      h+=`<div style="text-align:center;font-size:var(--fs-label);color:var(--text2);margin-bottom:12px">Step ${step+1} of ${walkSteps.length}</div>`;
      h+=`<div style="background:var(--card);border:1px solid var(--hairline);border-radius:var(--r-md);padding:20px;margin-bottom:16px">`;
      h+=`<div style="font-size:var(--fs-sub);font-weight:600;color:var(--bright);margin-bottom:12px">${ws.title}</div>`;
      h+=`<div style="font-size:var(--fs-body);color:var(--text);line-height:1.7;margin-bottom:12px">${ws.content}</div>`;
      h+=`<div style="font-size:var(--fs-meta);color:var(--emerald);line-height:1.6;padding:10px;background:var(--emerald-soft);border-radius:6px"><strong>In plain English:</strong> ${ws.simple}</div>`;
      h+=`</div>`;
      // Navigation
      h+=`<div style="display:flex;justify-content:space-between;align-items:center">`;
      if(step>0){
        h+=`<button onclick="guideWalkthroughStep--;renderApp()" style="background:var(--card);border:1px solid var(--hairline);border-radius:6px;padding:8px 20px;font-size:var(--fs-meta);color:var(--text2);cursor:pointer">&#8249; Previous</button>`;
      } else {
        h+=`<div></div>`;
      }
      // Progress dots
      h+=`<div style="display:flex;gap:4px">`;
      for(let di=0;di<walkSteps.length;di++){
        h+=`<div onclick="guideWalkthroughStep=${di};renderApp()" style="width:8px;height:8px;border-radius:50%;cursor:pointer;background:${di===step?'var(--gold)':'var(--surface)'}"></div>`;
      }
      h+=`</div>`;
      if(step<walkSteps.length-1){
        h+=`<button onclick="guideWalkthroughStep++;renderApp()" style="background:var(--gold-soft);border:1px solid var(--gold-line);border-radius:6px;padding:8px 20px;font-size:var(--fs-meta);color:var(--gold);cursor:pointer;font-weight:600">Next &#8250;</button>`;
      } else {
        h+=`<button onclick="switchTab('home')" style="background:var(--gold-soft);border:1px solid var(--gold-line);border-radius:6px;padding:8px 20px;font-size:var(--fs-meta);color:var(--gold);cursor:pointer;font-weight:600">Done</button>`;
      }
      h+=`</div>`;
    }
  }
  h+=`</div>`; // end guide tab

  // ══════════ SETTINGS TAB ══════════
  h+=`<div class="tab-content ${activeTab==='settings'?'active':''}">`;
  {
    const hasKey=!!loadClaudeKey();
    h+=`<div style="font-size:var(--fs-sub);font-weight:600;color:var(--bright);margin-bottom:16px">Settings</div>`;

    // API Key
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">Claude API Key</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.6;margin-bottom:8px">${hasKey?'Your API key is set. It enables AI-generated daily readings and consults. The key is stored only in your browser and sent directly to Anthropic.':'No key set. Without a key, you get deterministic readings composed from the voice corpus. Add a Claude API key to unlock AI-generated synthesis and consults.'}</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Status</div>`;
    h+=`<div class="guide-setting-desc">${hasKey?'Active':'Not configured'}</div></div>`;
    h+=`<button onclick="switchTab('today');layersExpanded.l3=true;mechGroupOpen.practice=true;renderApp()" style="background:var(--card);border:1px solid var(--gold-line);border-radius:6px;padding:5px 12px;font-size:var(--fs-ui);color:var(--gold);cursor:pointer">${hasKey?'Change key':'Set up'}</button>`;
    h+=`</div></div>`;

    // Observer Location
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">Observer Location</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.6;margin-bottom:8px">Where you are now. This affects planetary hours (sunrise/sunset), house cusps for transits, and astrocartography.</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Current</div>`;
    h+=`<div class="guide-setting-desc">${typeof OBSERVER!=='undefined'?OBSERVER.label+' ('+OBSERVER.lat.toFixed(2)+'N, '+OBSERVER.lon.toFixed(2)+'E)':'Not set'}</div></div>`;
    h+=`<span style="font-size:var(--fs-ui);color:var(--text3)">Hardcoded</span>`;
    h+=`</div></div>`;

    // Birth Data
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">Birth Data</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.6;margin-bottom:8px">Your natal chart data. The entire app is calibrated to this birth moment.</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Date &amp; Time</div>`;
    h+=`<div class="guide-setting-desc">${typeof BIRTH!=='undefined'?BIRTH.year+'-'+String(BIRTH.month).padStart(2,'0')+'-'+String(BIRTH.day).padStart(2,'0')+' at '+Math.floor(BIRTH.hour)+'h'+String(Math.round((BIRTH.hour%1)*60)).padStart(2,'0')+'m EDT':'Not set'}</div></div>`;
    h+=`<span style="font-size:var(--fs-ui);color:var(--text3)">Hardcoded</span>`;
    h+=`</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Location</div>`;
    h+=`<div class="guide-setting-desc">${typeof BIRTH!=='undefined'?'Stony Brook, NY ('+BIRTH.lat.toFixed(4)+'N, '+(-BIRTH.lon).toFixed(4)+'W)':'Not set'}</div></div>`;
    h+=`<span style="font-size:var(--fs-ui);color:var(--text3)">Hardcoded</span>`;
    h+=`</div></div>`;

    // Theme
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">Appearance</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Theme</div>`;
    h+=`<div class="guide-setting-desc">Dark mode with gold accent, Hermetic register.</div></div>`;
    h+=`<span style="font-size:var(--fs-ui);color:var(--text2)">Dark</span>`;
    h+=`</div></div>`;

    // Notifications
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">Notifications</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.6;margin-bottom:8px">Push notifications for moon ingresses, void-of-course periods, and planetary hours. Requires browser notification permission.</div>`;
    if(typeof notifPrefs!=='undefined'){
      h+=`<div class="guide-setting">`;
      h+=`<div><div class="guide-setting-label">Moon Ingress</div>`;
      h+=`<div class="guide-setting-desc">Alert when the Moon enters a new sign</div></div>`;
      h+=`<div class="notif-toggle ${notifPrefs.moonIngress?'on':''}" onclick="notifSetPref('moonIngress',!notifPrefs.moonIngress)" style="cursor:pointer"></div>`;
      h+=`</div>`;
      h+=`<div class="guide-setting">`;
      h+=`<div><div class="guide-setting-label">Void of Course</div>`;
      h+=`<div class="guide-setting-desc">Alert at VOC start and end</div></div>`;
      h+=`<div class="notif-toggle ${notifPrefs.vocAlerts?'on':''}" onclick="notifSetPref('vocAlerts',!notifPrefs.vocAlerts)" style="cursor:pointer"></div>`;
      h+=`</div>`;
      h+=`<div class="guide-setting">`;
      h+=`<div><div class="guide-setting-label">Planetary Hour</div>`;
      h+=`<div class="guide-setting-desc">Each new hour and its intent</div></div>`;
      h+=`<div class="notif-toggle ${notifPrefs.planetaryHour?'on':''}" onclick="notifSetPref('planetaryHour',!notifPrefs.planetaryHour)" style="cursor:pointer"></div>`;
      h+=`</div>`;
    } else {
      h+=`<div class="guide-setting"><div><div class="guide-setting-label">Status</div><div class="guide-setting-desc">Notification system not loaded</div></div></div>`;
    }
    h+=`</div>`;

    // Data & Storage
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">Data &amp; Storage</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Journal Entries</div>`;
    h+=`<div class="guide-setting-desc">${loadJournal().length} entries stored locally</div></div>`;
    h+=`<button onclick="switchTab('tools');toolsSubTab='ledger';renderApp()" style="background:var(--card);border:1px solid var(--hairline);border-radius:6px;padding:5px 12px;font-size:var(--fs-ui);color:var(--text2);cursor:pointer">View Ledger</button>`;
    h+=`</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Saved Charts</div>`;
    h+=`<div class="guide-setting-desc">${savedCharts.length} chart${savedCharts.length!==1?'s':''} for synastry</div></div>`;
    h+=`<button onclick="switchTab('tools');toolsSubTab='synastry';renderApp()" style="background:var(--card);border:1px solid var(--hairline);border-radius:6px;padding:5px 12px;font-size:var(--fs-ui);color:var(--text2);cursor:pointer">Manage</button>`;
    h+=`</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Export Journal</div>`;
    h+=`<div class="guide-setting-desc">Download all entries as JSON backup</div></div>`;
    h+=`<button onclick="exportLedgerJSON()" style="background:var(--card);border:1px solid var(--hairline);border-radius:6px;padding:5px 12px;font-size:var(--fs-ui);color:var(--text2);cursor:pointer">Export</button>`;
    h+=`</div>`;
    h+=`<div class="guide-setting">`;
    h+=`<div><div class="guide-setting-label">Clear Synthesis Cache</div>`;
    h+=`<div class="guide-setting-desc">Force a fresh AI reading tomorrow</div></div>`;
    h+=`<button onclick="try{localStorage.removeItem('dayShapeLLM_v2');_dayShapeLLMDate=null;alert('Cache cleared.')}catch(e){}" style="background:var(--card);border:1px solid var(--hairline);border-radius:6px;padding:5px 12px;font-size:var(--fs-ui);color:var(--text2);cursor:pointer">Clear</button>`;
    h+=`</div>`;
    h+=`</div>`;

    // About
    h+=`<div class="guide-section">`;
    h+=`<div class="guide-h2">About</div>`;
    h+=`<div style="font-size:var(--fs-meta);color:var(--text2);line-height:1.6">Traditional astrology companion built on Hellenistic doctrine. Positions from Meeus approximations. Houses are Placidus. All computation runs in-browser. Your data stays on your device. PWA with offline support.</div>`;
    h+=`</div>`;
  }
  h+=`</div>`; // end settings tab


  // ══════════ TAB BAR (6 tabs: Home / Today / Natal / Tools / Guide / Settings) ══════════
  const svgHome=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12l9-8 9 8"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>`;
  const svgToday=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/></svg>`;
  const svgNatal=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>`;
  const svgTools=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`;
  const svgGuide=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;
  const svgSettings=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`;
  let tabBarHtml='';
  tabBarHtml+=`<button class="${activeTab==='home'?'active':''}" onclick="switchTab('home')">${svgHome}<span>Home</span></button>`;
  tabBarHtml+=`<button class="${activeTab==='today'?'active':''}" onclick="switchTab('today')">${svgToday}<span>Today</span></button>`;
  tabBarHtml+=`<button class="${activeTab==='natal'?'active':''}" onclick="switchTab('natal')">${svgNatal}<span>Natal</span></button>`;
  tabBarHtml+=`<button class="${activeTab==='tools'?'active':''}" onclick="switchTab('tools')">${svgTools}<span>Tools</span></button>`;
  tabBarHtml+=`<button class="${activeTab==='guide'?'active':''}" onclick="switchTab('guide')">${svgGuide}<span>Guide</span></button>`;
  tabBarHtml+=`<button class="${activeTab==='settings'?'active':''}" onclick="switchTab('settings')">${svgSettings}<span>Settings</span></button>`;

  document.getElementById('app').innerHTML=h;
  document.getElementById('tab-bar-host').innerHTML=tabBarHtml;

  // Render chart form modal into its own host (above tab bar stacking context)
  const modalHost=document.getElementById('modal-form-host');
  if(modalHost){
    if(showChartForm){
      try{modalHost.innerHTML=renderChartFormModal();}catch(e){modalHost.innerHTML='';console.error('ChartForm:',e);}
    } else {
      modalHost.innerHTML='';
    }
  }

  // Sync body data-zone for CSS filtering (only meaningful on Today tab)
  document.body.setAttribute('data-zone', activeTab==='today'?todayZone:'all');

  // Auto-scroll planetary hours to current hour
  const hRow=document.getElementById('hours-row');
  const curCell=hRow&&hRow.querySelector('.current');
  if(curCell&&hRow){curCell.scrollIntoView({inline:'center',block:'nearest',behavior:'instant'});}

  // Restore focus to search inputs after re-render
  if(activeTab==='tools'&&toolsSubTab==='lore'&&refQuery){
    const si=document.querySelector('.ref-search');
    if(si){si.focus();const len=si.value.length;try{si.setSelectionRange(len,len);}catch(e){}}
  }
  if(activeTab==='guide'&&guideMode==='glossary'&&guideSearch){
    const gi=document.querySelector('.ref-search');
    if(gi){gi.focus();const len=gi.value.length;try{gi.setSelectionRange(len,len);}catch(e){}}
  }

  // Energy ring fill animation: start from full offset, animate to target
  const ringArc=document.querySelector('.energy-ring-arc');
  if(ringArc){
    const full=ringArc.style.getPropertyValue('--ring-full');
    const target=ringArc.getAttribute('stroke-dashoffset');
    ringArc.style.strokeDashoffset=full;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ringArc.style.strokeDashoffset=target;}));
  }
}

// ── Event handlers ──
function navDay(offset){
  const app=document.getElementById('app');
  const dir=offset>0?'slide-left':'slide-right';
  app.classList.add(dir);
  setTimeout(()=>{
    dayOffset+=offset;renderApp();
    app.classList.remove(dir);
    app.classList.add('slide-in');
    setTimeout(()=>app.classList.remove('slide-in'),280);
  },260);
}
function navToday(){
  if(dayOffset===0)return;
  const app=document.getElementById('app');
  app.classList.add(dayOffset>0?'slide-right':'slide-left');
  setTimeout(()=>{
    dayOffset=0;renderApp();
    app.classList.remove('slide-left','slide-right');
    app.classList.add('slide-in');
    setTimeout(()=>app.classList.remove('slide-in'),280);
  },260);
}
// dismissSplash defined in early <script> block above
function switchTab(tab){
  // backward compat: old tab names route to new 6-tab IA
  if(tab==='chart'){tab='natal';}
  if(tab==='synastry'){tab='tools';toolsSubTab='synastry';}
  if(tab==='map'){tab='tools';toolsSubTab='map';}
  if(tab==='lore'){tab='tools';toolsSubTab='lore';}
  activeTab=tab;renderApp();window.scrollTo(0,0);
}
function switchToolsTab(sub){toolsSubTab=sub;renderApp();window.scrollTo(0,0);}
// switchChartMode removed in v52 (Chart tab replaced by Natal tab)
function toggleCard(id){
  expandedCards[id]=!expandedCards[id];
  // Direct DOM toggle instead of full re-render
  const el=document.querySelector(`[data-card-id="${id}"] .t-expand, [data-card-id="${id}"] .natal-expand`);
  if(el){el.classList.toggle('open');return;}
  renderApp();
}
function toggleChart(opt){if(opt==='transit')showTransitRing=!showTransitRing;else showAspectLines=!showAspectLines;renderApp();}
function setFilter(f){activeFilter=f;renderApp();}

// Touch navigation
let touchStartX=0,touchStartY=0,swiping=false;
document.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY;swiping=true;},{passive:true});
document.addEventListener('touchmove',e=>{if(!swiping)return;if(Math.abs(e.touches[0].clientY-touchStartY)>Math.abs(e.touches[0].clientX-touchStartX)*1.2)swiping=false;},{passive:true});
document.addEventListener('touchend',e=>{if(!swiping||!splashDismissed)return;const dx=e.changedTouches[0].clientX-touchStartX;if(Math.abs(dx)>60){if(dx<0)navDay(1);else navDay(-1);}swiping=false;});

// Keyboard
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')navDay(-1);else if(e.key==='ArrowRight')navDay(1);else if(e.key==='Home'||e.key==='Escape')navToday();});

// Show/hide back-to-top FAB on scroll (tooltip stays open until tap)
document.addEventListener('scroll',()=>{
  const fab=document.getElementById('fab-top');
  if(fab){if(window.scrollY>500)fab.classList.add('show');else fab.classList.remove('show');}
});

loadCharts();
renderApp();
setInterval(()=>{if(dayOffset===0)renderApp();},10*60*1000);

// Boot notifications if user previously enabled them
try{bootNotifications();}catch(e){}

const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(prefersReduced){const s=document.createElement('style');s.textContent='*{animation:none!important;transition:none!important}';document.head.appendChild(s);}
