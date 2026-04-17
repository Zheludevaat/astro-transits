// ══════════════════════════════════════════════════════════════
// synthesis/context-builder.js — Chart context builders for Claude
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

function buildChartContext(cur,jd,transits,vibe,mPhase,retros,stats,vocResult,moonSign,phaseAngle,prof,pHours,lots,mansion,fortuneCur,firdariaCur,zrCurL1,zrCurL2){
  // Strip down computed state to a structured brief for Claude.
  const now=new Date();
  const dateStr=now.toLocaleString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'});
  const fmt=(p,v)=>{const s=signOf(v);return`${p} ${s.name} ${s.degree.toFixed(1)}° (house ${houseOf(v)})`;};
  const planets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
  const moonDecan=computeDecan(cur.Moon);
  const sunDecan=computeDecan(cur.Sun);
  const curLit=pHours&&PLANETARY_LITURGY[pHours.dayRuler]?PLANETARY_LITURGY[pHours.dayRuler]:null;

  // Current planetary hour
  let curHour=null;
  if(pHours){
    const utNow=now.getUTCHours()+now.getUTCMinutes()/60;
    const idx=currentHourIndex(pHours.hours,utNow);
    curHour=pHours.hours[idx];
  }

  // Top transits by importance
  const topTransits=[...transits].sort((a,b)=>(b.importance||0)-(a.importance||0)).slice(0,8).map(t=>{
    const ap=t.aspect;
    return`${t.tp} ${ap.name} natal ${t.np==='Ascendant'?'Ascendant':t.np==='MC'?'MC':t.np} (orb ${ap.orb.toFixed(2)}°, ${ap.applying?'applying':'separating'}, importance ${t.importance})`;
  });

  const fsNatal=scanNatalFixedStars(1.0).map(h=>`${h.point} ⊙ ${h.star.name} (${h.orb.toFixed(2)}° — nature ${h.star.nature})`);
  const fsTrans=scanTransitFixedStars(cur,jd,0.5).map(h=>`${h.point} ⊙ ${h.star.name} (${h.orb.toFixed(2)}° — nature ${h.star.nature})`);

  const ctx={
    meta:{
      dateLocal:dateStr,
      birthLocation:`Stony Brook, NY (${BIRTH.lat}°N, ${Math.abs(BIRTH.lon)}°W)`,
      birthDate:`${BIRTH.year}-${String(BIRTH.month).padStart(2,'0')}-${String(BIRTH.day).padStart(2,'0')} ${Math.floor(BIRTH.hour)}:${String(Math.round((BIRTH.hour%1)*60)).padStart(2,'0')} local`,
      sect:SECT.isNocturnal?'nocturnal':'diurnal',
      sectLight:SECT.sectLight,
      sectBenefic:SECT.sectBenefic,
      outOfSectMalefic:SECT.outOfSectMalefic
    },
    natal:{
      ascendant:`${signOf(NATAL.Ascendant).name} ${signOf(NATAL.Ascendant).degree.toFixed(1)}°`,
      mc:`${signOf(NATAL.MC).name} ${signOf(NATAL.MC).degree.toFixed(1)}°`,
      planets:planets.map(p=>fmt(p,NATAL[p])),
      fixedStars:fsNatal
    },
    today:{
      planets:planets.map(p=>fmt(p,cur[p])),
      moonPhase:`${mPhase.name} (${phaseAngle.toFixed(0)}° from Sun)`,
      moonSign:moonSign.name,
      moonDecan:`Decan ${moonDecan.decanNum} of ${moonDecan.signName}, ruled by ${moonDecan.ruler} — Tarot: ${moonDecan.card||''} ${moonDecan.title?'('+moonDecan.title+')':''}`,
      moonMansion:mansion?`Mansion ${mansion.index} ${mansion.name||''} (${mansion.nature})`:null,
      sunDecan:`Decan ${sunDecan.decanNum} of ${sunDecan.signName}, ruled by ${sunDecan.ruler}`,
      voc:vocResult&&vocResult.active?`VOC until Moon enters ${vocResult.nextSign}`:'Moon is not void of course',
      planetaryHour:curHour?`Hour of ${curHour.ruler}`:null,
      dayRuler:pHours?pHours.dayRuler:null,
      dayLiturgyIntent:curLit?curLit.intent:null,
      retrogrades:retros.join(', ')||'none',
      vibeScore:vibe.score,
      transitFixedStars:fsTrans,
      topTransits:topTransits
    },
    periods:{
      profectionYearLord:`${prof.yearLord} (age ${prof.ageYears}, ${prof.yearSign} profected Ascendant)`,
      profectionMonthLord:`${prof.monthLord} (${prof.monthSign})`,
      zrL1:zrCurL1?`${zrCurL1.sign} (${zrCurL1.ruler}), ${fmtZRDate(zrCurL1.startDate)} – ${fmtZRDate(zrCurL1.endDate)}${zrCurL1.peak?', PEAK':''}${zrCurL1.lbFollows?', Loosing of the Bond follows':''}`:null,
      zrL2:zrCurL2?`${zrCurL2.sign} (${zrCurL2.ruler}), ${fmtZRDate(zrCurL2.startDate)} – ${fmtZRDate(zrCurL2.endDate)}${zrCurL2.peak?', PEAK':''}`:null,
      firdariaMajor:firdariaCur?`${firdariaCur.major.lord} major (${fmtZRDate(firdariaCur.major.startDate)} – ${fmtZRDate(firdariaCur.major.endDate)})`:null,
      firdariaSub:firdariaCur?`${firdariaCur.sub.lord} sub (${fmtZRDate(firdariaCur.sub.startDate)} – ${fmtZRDate(firdariaCur.sub.endDate)})`:null
    },
    lots:lots?{
      fortune:`${signOf(lots.Fortune).name} ${signOf(lots.Fortune).degree.toFixed(1)}°`,
      spirit:`${signOf(lots.Spirit).name} ${signOf(lots.Spirit).degree.toFixed(1)}°`,
      eros:`${signOf(lots.Eros).name} ${signOf(lots.Eros).degree.toFixed(1)}°`,
      victory:`${signOf(lots.Victory).name} ${signOf(lots.Victory).degree.toFixed(1)}°`,
      courage:`${signOf(lots.Courage).name} ${signOf(lots.Courage).degree.toFixed(1)}°`,
      necessity:`${signOf(lots.Necessity).name} ${signOf(lots.Necessity).degree.toFixed(1)}°`,
      nemesis:`${signOf(lots.Nemesis).name} ${signOf(lots.Nemesis).degree.toFixed(1)}°`
    }:null
  };
  return ctx;
}
function buildSynastryContext(natalA,natalB,synAspects,traditional,chartAName,chartBName){
  const fmt=(p,v)=>{const s=signOf(v);return`${p} ${s.name} ${s.degree.toFixed(1)}°`;};
  const planets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode'];
  const topAspects=[...synAspects].sort((a,b)=>parseFloat(a.orbActual)-parseFloat(b.orbActual)).slice(0,15).map(a=>`${a.pA} ${a.aspect} ${a.pB} (orb ${a.orbActual}°, ${a.type})`);
  const overlays=(traditional.houseOverlays||[]).map(o=>`${o.person==='B'?chartBName:chartAName}'s ${o.planet} in ${o.person==='B'?chartAName:chartBName}'s House ${o.house}`);
  return{
    personA:{name:chartAName,planets:planets.filter(p=>natalA[p]!==undefined).map(p=>fmt(p,natalA[p])),ascendant:natalA.Ascendant!==undefined?`${signOf(natalA.Ascendant).name} ${signOf(natalA.Ascendant).degree.toFixed(1)}°`:null},
    personB:{name:chartBName,planets:planets.filter(p=>natalB[p]!==undefined).map(p=>fmt(p,natalB[p])),ascendant:natalB.Ascendant!==undefined?`${signOf(natalB.Ascendant).name} ${signOf(natalB.Ascendant).degree.toFixed(1)}°`:null},
    synastryAspects:topAspects,
    houseOverlays:overlays,
    lunarContact:traditional.lunarContact?traditional.lunarContactType:'none',
    venusMarsChem:traditional.venusMarsMutual?traditional.venusMarsMutualType:'none',
    saturnContacts:traditional.saturnContacts,
    elementBalance:traditional.elementBalance,
    receptions:(traditional.receptions||[]).map(r=>r.type==='mutual'?`${r.pA} and ${r.pB}: mutual reception`:`${r.guest} received by ${r.host} in ${r.sign}`)
  };
}
