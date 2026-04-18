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
  Aries:'Go. Do not wait for the invitation, the approval, the perfect moment. This return chart puts Aries on the front door of the year, and the year responds to people who move first. You read as direct, maybe blunt, probably impatient. Good. Hesitation costs more than mistakes right now.',
  Taurus:'Slow down. The year will try to rush you and you should refuse. Taurus rising on a return chart is the ground under your feet — stable, physical, stubborn in the best way. People see someone unshakable. What you build this year with your hands, your money, your patience will outlast the year itself.',
  Gemini:'Two roads, three ideas, four conversations happening at once — and somehow you are keeping up with all of them. The return chart puts Gemini at the helm, which means the year is won or lost on your ability to stay curious without scattering. People find you quick, funny, hard to pin down. Let them.',
  Cancer:'Before anything else: how does this year feel? That is not a throwaway question. Cancer rising on the return means feelings are running the operation whether the mind agrees or not. You come across as someone people can confide in, someone soft enough to hold the hard thing. Home pulls. Family pulls. Let the pull teach you where to put your weight.',
  Leo:'The spotlight is not optional this year. Leo on the ascendant means the return chart wants you seen, heard, witnessed in your fullness. Warmth pours off you — generosity, creative fire, the kind of presence that changes the temperature of a room. The year bends toward whoever has the courage to perform sincerely.',
  Virgo:'Precision matters now. Every detail you fix, every inefficiency you strip out, every morning routine you finally nail down — it compounds. Virgo rising on the return makes you look competent, put-together, useful. The year does not reward grand gestures. It rewards the person who showed up prepared and did the thing right.',
  Libra:'Other people are the curriculum. Libra rising on the return chart means every significant development this year arrives through a relationship — partner, collaborator, rival, mirror. You move through the world with grace and diplomacy, and people trust your fairness. The hard part is knowing when fairness to others becomes unfairness to yourself.',
  Scorpio:'Nothing surface-level will satisfy you this year and you should stop pretending otherwise. Scorpio on the ascendant gives the return chart an intensity that other people can feel before you say a word. You read as private, sharp, unwilling to pretend. Power — who has it, who wants it, who is hiding it — is the real subject of every conversation.',
  Sagittarius:'Somewhere you have never been is calling. Physically, intellectually, spiritually — the return chart with Sagittarius rising cannot sit still inside last year\'s borders. You come across as restless and optimistic, the person at the table who believes something bigger is possible. Bet on the long shot. The year penalizes those who play it safe.',
  Capricorn:'Results. That is what this year is about, and the return chart is not interested in excuses. Capricorn on the ascendant lends you a seriousness that people read as authority — measured, responsible, older than your age. Every month is a brick. Lay them well. By the end of the year, the structure will be visible to everyone, not just you.',
  Aquarius:'Step back from the personal drama and look at the pattern. Aquarius rising on the return chart lifts your perspective past your own story and toward the group, the cause, the future that has not been built yet. You strike people as independent, a little eccentric, uninterested in conformity for its own sake. The year rewards original thinking and punishes herd mentality.',
  Pisces:'The year arrives quietly, like fog. Pisces on the ascendant means the return chart is governed by intuition, imagination, and a permeability that can be gift or liability depending on how you manage it. People sense something gentle and hard to define about you. Dreams are louder than plans. Follow the images, the hunches, the feelings that have no rational source — they are navigating for you.'
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
