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
  1:'Your identity is the subject of the year. The Sun in the first house of the return chart places you at the centre of events, demanding that you show up visibly and take initiative. Expect a year of personal reinvention, physical vitality, and a sharper sense of who you are becoming.',
  2:'Your resources and livelihood dominate this year. The Sun illuminates questions of income, possessions, and what you truly value. Financial matters demand attention, and the year rewards you for building material stability on your own terms.',
  3:'Your daily environment and local connections shape the year. Siblings, neighbours, short journeys, and intellectual pursuits all come alive under this placement. Communication projects thrive and your mind is restless with new ideas.',
  4:'The year draws you inward toward home, family, and your private foundation. Roots are being examined -- where you come from, where you live, what gives you emotional security. Real estate matters, family dynamics, and ancestry may become central themes.',
  5:'Pleasure, creative expression, and romance colour the year. The Sun in the fifth house wants you to create, to take risks that feel joyful, and to reconnect with what makes life worth living. Children, love affairs, and artistic projects are all activated.',
  6:'The year is governed by work, health, and daily discipline. Routines require restructuring, and your body asks for attention. Service to others features prominently, and the year rewards you for showing up consistently rather than spectacularly.',
  7:'Partnerships and one-to-one relationships define the year. Whether in marriage, business, or open rivalry, other people are the mirror through which the year unfolds. Contracts, negotiations, and commitments demand your full engagement.',
  8:'Shared resources, debt, inheritance, and psychological depth mark the year. You are dealing with what belongs to others and what has power over you. Transformation is available but only through honest confrontation with loss, intimacy, or financial entanglement.',
  9:'The year opens toward distant horizons. Travel, higher education, philosophical inquiry, and encounters with foreign cultures or belief systems take centre stage. Your worldview is expanding, and the year rewards you for seeking wisdom beyond your familiar territory.',
  10:'Your public life and vocation are the focus of the year. Career milestones, reputation, and your standing in the community all receive solar emphasis. Authority figures play a role, and the year asks what legacy you are building in the world.',
  11:'Friendships, alliances, and collective aspirations shape the year. The community you belong to matters more than usual, and your hopes for the future are being tested and refined. Group endeavours prosper and beneficial connections arrive.',
  12:'The year turns inward toward solitude, hidden work, and what lies beneath the surface. Retreat is not defeat but preparation. Hospitals, institutions, spiritual practice, or behind-the-scenes labour may feature. The year teaches you what can only be learned in quiet.'
};

const LUNAR_RETURN_HOUSE_THEMES={
  1:'This month puts you front and centre. Your appearance, mood, and personal presence set the tone for everything. Expect to feel emotionally exposed and self-aware, as if the world is watching how you carry yourself.',
  2:'The month revolves around money, comfort, and what you need to feel secure. Emotional wellbeing is tied to material stability right now. Pay attention to spending patterns and to what genuinely nourishes you.',
  3:'Your neighbourhood, daily errands, and close communications dominate the month. Conversations carry emotional weight, and siblings or neighbours may require your attention. Mental restlessness is high -- channel it into writing or learning.',
  4:'Home and family absorb your emotional energy this month. You may feel a strong pull toward nesting, resolving old family dynamics, or simply needing more privacy. The foundation of your life is asking to be tended.',
  5:'Joy, romance, and creative expression colour this lunar month. The heart wants what it wants, and play is not optional. Children, dates, artistic projects, and anything that reconnects you with delight are all highlighted.',
  6:'Daily routines, health habits, and service to others define the month. Small adjustments to your schedule or diet yield outsized emotional returns. The work you do every day is where the meaning lives right now.',
  7:'Relationships take the lead this month. Partners, clients, and even rivals demand emotional engagement. The month teaches you something about compromise, projection, and what you need from others versus what you need from yourself.',
  8:'Emotional intensity runs high this month as themes of shared resources, intimacy, and hidden power surface. You may be processing grief, managing joint finances, or confronting psychological material you usually avoid. Transformation is available if you stay honest.',
  9:'The month expands your horizons through travel, study, or encounters with unfamiliar perspectives. Emotional restlessness pushes you toward meaning-making. Teaching, publishing, or any pursuit that broadens your worldview is favoured.',
  10:'Your career and public role absorb your emotional attention this month. How you are perceived matters more than usual, and professional responsibilities may feel personally weighted. The month rewards visible effort and ambition.',
  11:'Friendships, group activities, and future aspirations define the emotional texture of the month. Community belonging feels important, and the people around you shape your mood more than you expect. Hopes for the future crystallise.',
  12:'The month draws you into solitude, rest, and inner processing. Hidden emotions surface, and you may need more sleep, more quiet, or more time alone than usual. This is a month for spiritual practice, therapy, or simply letting the unconscious speak.'
};

const RETURN_ASC_SIGN={
  Aries:'A year of initiative and self-assertion. You present as bold and action-oriented, and the world responds to directness. Independence is the theme -- waiting for permission is not on the agenda.',
  Taurus:'A year of steadiness and material focus. You come across as grounded, patient, and unwilling to be rushed. The pace slows, and what matters is building something tangible and lasting.',
  Gemini:'A year of curiosity, communication, and variety. You present as adaptable, talkative, and intellectually hungry. Multiple interests compete for attention, and flexibility is your greatest asset.',
  Cancer:'A year of emotional depth and domestic focus. You come across as nurturing and protective, and home life takes precedence. Sensitivity is heightened -- use it as intelligence, not vulnerability.',
  Leo:'A year of visibility and creative confidence. You present as warm, generous, and eager to be recognised. Self-expression is not optional, and the year rewards courage in showing who you really are.',
  Virgo:'A year of refinement, analysis, and practical service. You come across as competent, detail-oriented, and health-conscious. The year rewards careful work and penalises shortcuts.',
  Libra:'A year of relationship, diplomacy, and aesthetic sensitivity. You present as fair-minded and socially graceful, and partnerships of all kinds shape the year. Balance is the goal, even when it is hard to find.',
  Scorpio:'A year of intensity, transformation, and emotional honesty. You come across as private, perceptive, and unwilling to tolerate superficiality. Power dynamics surface and demand to be addressed directly.',
  Sagittarius:'A year of expansion, travel, and philosophical seeking. You present as optimistic, restless, and hungry for meaning. The year favours bold leaps and punishes excessive caution.',
  Capricorn:'A year of discipline, ambition, and long-term strategy. You come across as serious, responsible, and focused on results. Structure is your friend, and the year rewards patience and persistence.',
  Aquarius:'A year of independence, innovation, and community engagement. You present as unconventional and forward-thinking, and group affiliations matter more than usual. The year asks you to think beyond personal concerns.',
  Pisces:'A year of intuition, compassion, and spiritual sensitivity. You come across as gentle, imaginative, and somewhat elusive. Boundaries blur, dreams intensify, and the year rewards faith over logic.'
};

function interpretSolarReturn(R){
  // Which natal house does the SR Sun fall in? Also SR Asc sign, SR Moon sign.
  const srSunHouse=houseOf(R.Sun);
  const srAscSign=signOf(R.Ascendant).name;
  const srMoonSign=signOf(R.Moon).name;
  const srMoonHouse=houseOf(R.Moon);
  return{srSunHouse,srAscSign,srMoonSign,srMoonHouse,
    sunTheme:SOLAR_RETURN_HOUSE_THEMES[srSunHouse]||'',
    ascTheme:RETURN_ASC_SIGN[srAscSign]||'',
    moonNote:`Heart of the year meets the ${srMoonSign} register in house ${srMoonHouse}.`};
}

function interpretLunarReturn(R){
  const lrMoonHouse=houseOf(R.Moon);
  const lrAscSign=signOf(R.Ascendant).name;
  const lrSunHouse=houseOf(R.Sun);
  return{lrMoonHouse,lrAscSign,lrSunHouse,
    moonTheme:LUNAR_RETURN_HOUSE_THEMES[lrMoonHouse]||'',
    note:`This month wears a ${lrAscSign} face; the lunar body works through your natal ${lrMoonHouse}${lrMoonHouse===1?'st':lrMoonHouse===2?'nd':lrMoonHouse===3?'rd':'th'} house.`};
}
function fmtZRDate(d){
  const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  return`${mo} ${d.getFullYear()}`;
}
