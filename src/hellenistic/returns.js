// ══════════════════════════════════════════════════════════════
// hellenistic/returns.js — Solar and Lunar Returns
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// SOLAR & LUNAR RETURNS
// ══════════════════════════════════════════════════════════════
// A Solar Return is the chart cast for the moment the transiting Sun
// returns to its exact natal position each year — valid birthday to
// birthday. A Lunar Return repeats every ~27.3 days as the Moon
// returns to natal longitude, governing the upcoming lunar month.

function _angDiff(a,b){let d=((a-b+540)%360)-180;return d;}

function findReturnJD(targetLon,approxJd,body){
  // Bisect/secant: find JD within ±7d of approxJd where body crosses targetLon.
  const fn=body==='Sun'
    ?(jd)=>_angDiff(sunLongitude(jdToT(jd)),targetLon)
    :(jd)=>_angDiff(moonLongitude(jdToT(jd)),targetLon);
  // Search a window; sample to bracket a sign change
  const halfWindow=body==='Sun'?10:2;
  let lo=approxJd-halfWindow,hi=approxJd+halfWindow;
  let fLo=fn(lo),fHi=fn(hi);
  // If same sign, step out
  let steps=0;
  while(fLo*fHi>0 && steps<20){
    lo-=halfWindow;hi+=halfWindow;fLo=fn(lo);fHi=fn(hi);steps++;
  }
  if(fLo*fHi>0)return approxJd; // couldn't bracket
  // Bisection
  for(let i=0;i<60;i++){
    const mid=(lo+hi)/2;const fM=fn(mid);
    if(Math.abs(fM)<1e-5)return mid;
    if(fLo*fM<0){hi=mid;fHi=fM;}else{lo=mid;fLo=fM;}
  }
  return(lo+hi)/2;
}

function findSolarReturnJD(year){
  // Birthday approximation
  const approx=julianDate(year,BIRTH.month,BIRTH.day,BIRTH.hour);
  return findReturnJD(NATAL.Sun,approx,'Sun');
}

function findLunarReturnJD(fromJd,forward){
  // Approximate: natal Moon position, stepping back/forward in ~27.3d increments
  const synodic=27.32166;
  // Start near fromJd, search bracket containing natal moon crossing
  // Use angular progress: moon is at L now; we need crossing of natalMoon.
  const curL=moonLongitude(jdToT(fromJd));
  let offset=_angDiff(NATAL.Moon,curL); // deg ahead (+) or behind (-) the natal
  // Moon moves ~13.2°/day; rough dt:
  let dt=offset/13.176;
  if(forward){if(dt<0)dt+=synodic;}
  else{if(dt>0)dt-=synodic;}
  const approx=fromJd+dt;
  return findReturnJD(NATAL.Moon,approx,'Moon');
}

function computeReturn(rjd){
  const R=computeAll(rjd);
  R.Ascendant=computeAsc(rjd,BIRTH.lat,BIRTH.lon);
  R.MC=computeMC(rjd,BIRTH.lon);
  R.jd=rjd;
  R.date=jdToDate(rjd);
  return R;
}

const SOLAR_RETURN_HOUSE_THEMES={
  1:'the year reshapes you — identity, body, bearing',
  2:'the year turns on resources, body, income, what you hold',
  3:'the year moves through siblings, short trips, daily thought',
  4:'the year returns you home — family, land, foundation',
  5:'the year is pleasure, children, creation, romance',
  6:'the year is labor, health, service, discipline',
  7:'the year is partnership, open enemies, contract',
  8:'the year is shared resource, mortality, depth, inheritance',
  9:'the year is travel, learning, teaching, the distant horizon',
  10:'the year is vocation, public standing, authority',
  11:'the year is friendship, alliance, good fortune, hopes realized',
  12:'the year is retreat, hidden work, loss, the unseen'
};

function interpretSolarReturn(R){
  // Which natal house does the SR Sun fall in? Also SR Asc sign, SR Moon sign.
  const srSunHouse=houseOf(R.Sun);
  const srAscSign=signOf(R.Ascendant).name;
  const srMoonSign=signOf(R.Moon).name;
  const srMoonHouse=houseOf(R.Moon);
  return{srSunHouse,srAscSign,srMoonSign,srMoonHouse,
    sunTheme:SOLAR_RETURN_HOUSE_THEMES[srSunHouse]||'',
    moonNote:`Heart of the year meets the ${srMoonSign} register in house ${srMoonHouse}.`};
}

function interpretLunarReturn(R){
  const lrMoonHouse=houseOf(R.Moon);
  const lrAscSign=signOf(R.Ascendant).name;
  const lrSunHouse=houseOf(R.Sun);
  return{lrMoonHouse,lrAscSign,lrSunHouse,
    moonTheme:SOLAR_RETURN_HOUSE_THEMES[lrMoonHouse]||'',
    note:`This month wears a ${lrAscSign} face; the lunar body works through your natal ${lrMoonHouse}${lrMoonHouse===1?'st':lrMoonHouse===2?'nd':lrMoonHouse===3?'rd':'th'} house.`};
}
function fmtZRDate(d){
  const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  return`${mo} ${d.getFullYear()}`;
}
