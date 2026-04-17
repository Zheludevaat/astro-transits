// ══════════════════════════════════════════════════════════════
// hellenistic/fixedstars.js — Fixed stars array and scanning
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const FIXED_STARS=[
  {name:'Algol',       lon2026:56.68,  lat:22.42,  mag:2.12, nature:'Saturn/Jupiter',
    meaning:'The Medusa\'s head. Traditional image of violent death, decapitation, loss of head; in modern practice, the unsuppressed feminine rage and the face one cannot look at directly.'},
  {name:'Alcyone',     lon2026:60.45,  lat:4.03,   mag:2.87, nature:'Moon/Mars',
    meaning:'Brightest of the Pleiades. "Something to weep about" — mourning, vision, and the seven sisters. Linked with eyesight and with prophecy.'},
  {name:'Aldebaran',   lon2026:70.08,  lat:-5.47,  mag:0.85, nature:'Mars',
    meaning:'The Bull\'s eye and royal star of the East. Honour, integrity, courage — but success carries the shadow of its own undoing. One of the four Persian royal stars.'},
  {name:'Rigel',       lon2026:77.32,  lat:-31.13, mag:0.13, nature:'Jupiter/Mars',
    meaning:'Orion\'s bright foot. Technical skill, teaching, science, good fortune through practical knowledge.'},
  {name:'Betelgeuse',  lon2026:89.05,  lat:-16.03, mag:0.50, nature:'Mars/Mercury',
    meaning:'Orion\'s shoulder. Martial honour, great fortune through action, high rank. A star of champions.'},
  {name:'Sirius',      lon2026:104.35, lat:-39.60, mag:-1.46, nature:'Jupiter/Mars',
    meaning:'The Dog Star, brightest in the sky. Fame, honour, devotion, ardour. The heliacal rising of Sirius was sacred to the Egyptians — beginning of the Nile flood. The faithful heart.'},
  {name:'Canopus',     lon2026:105.27, lat:-76.00, mag:-0.74, nature:'Saturn/Jupiter',
    meaning:'Second-brightest star. Long journeys by water, pilot and helmsman, the guide across dark seas. Honour earned through voyage and trial.'},
  {name:'Castor',      lon2026:110.65, lat:10.10,  mag:1.58, nature:'Mercury',
    meaning:'One of the Gemini twins. Sudden fame and sudden loss, mental quickness, writing, violence touched by genius.'},
  {name:'Pollux',      lon2026:113.58, lat:6.68,   mag:1.14, nature:'Mars',
    meaning:'The mortal twin made immortal. Athletic, martial, sometimes cruel; the boxer\'s star.'},
  {name:'Procyon',     lon2026:116.05, lat:-16.02, mag:0.38, nature:'Mercury/Mars',
    meaning:'The Little Dog. Swift rise and swift fall; sudden advancement followed by its reversal. Wealth easily gained and easily lost.'},
  {name:'Regulus',     lon2026:150.15, lat:0.47,   mag:1.35, nature:'Mars/Jupiter',
    meaning:'The Heart of the Lion, royal star of the North. Kingship, high rank, military honour. Grants success that holds only so long as the native does not seek revenge — the traditional fall of Regulus is through vengeance.'},
  {name:'Denebola',    lon2026:171.93, lat:12.27,  mag:2.13, nature:'Saturn/Venus',
    meaning:'The Lion\'s tail. Reversal of fortune, notoriety, grief that brings change; also the bearer of hard-earned wisdom.'},
  {name:'Vindemiatrix',lon2026:190.22, lat:16.21,  mag:2.83, nature:'Saturn/Mercury',
    meaning:'The "gatherer of grapes". Widowhood, depression, disgrace; but also subtlety, skill in writing and in the fermenting of what has been harvested.'},
  {name:'Spica',       lon2026:204.15, lat:-2.05,  mag:0.98, nature:'Venus/Mars',
    meaning:'The Ear of Wheat, one of the four "lucky" stars. Grace, brilliance, the gift unearned. Traditional star of the wife of the Sun, held to be unusually auspicious.'},
  {name:'Arcturus',    lon2026:204.52, lat:30.75,  mag:-0.05, nature:'Mars/Jupiter',
    meaning:'Brightest star of the Northern sky. Prosperity through hard work and foresight, pioneering success, the inspired leader.'},
  {name:'Antares',     lon2026:250.08, lat:-4.57,  mag:1.06, nature:'Mars/Jupiter',
    meaning:'Heart of the Scorpion, royal star of the West. Courage, martial honour, sudden destruction. The warrior\'s star — victory possible but through danger, and its traditional fall is through obstinacy.'},
  {name:'Vega',        lon2026:285.77, lat:61.73,  mag:0.03, nature:'Venus/Mercury',
    meaning:'The lyre of Orpheus. Artistic charm, beautiful voice, the gift that moves others — but also pride in the gift.'},
  {name:'Altair',      lon2026:302.13, lat:29.30,  mag:0.77, nature:'Mars/Jupiter',
    meaning:'The Eagle. Boldness, sudden fortune, flight above enemies; military command and the journey through thin air.'},
  {name:'Deneb Algedi',lon2026:323.98, lat:-2.57,  mag:2.85, nature:'Saturn/Jupiter',
    meaning:'Tail of the Sea-Goat. Life and death, sorrow and joy, the ancient "just judge" — benefic after hardship.'},
  {name:'Fomalhaut',   lon2026:334.38, lat:-21.08, mag:1.16, nature:'Venus/Mercury',
    meaning:'The Mouth of the Fish, royal star of the South. The one who turns material fortune into spiritual vision — or loses both by refusing the turn. Often marks the mystic, artist, or visionary.'},
  {name:'Achernar',    lon2026:345.92, lat:-59.37, mag:0.50, nature:'Jupiter',
    meaning:'End of the River. Success through travel, religious or philosophical honour, crowning of long effort.'},
  {name:'Markab',      lon2026:353.77, lat:19.40,  mag:2.48, nature:'Mars/Mercury',
    meaning:'Saddle of Pegasus. Honour and steadiness, the useful servant, but danger from fire and weapons.'},
  {name:'Scheat',      lon2026:359.87, lat:31.08,  mag:2.44, nature:'Mars/Mercury',
    meaning:'Wing of Pegasus. Drowning, accidents by water, intellectual brilliance touched with danger.'},
];

// Precession-adjusted longitude (small correction for years away from 2026)
function fixedStarLon(star,jd){
  const yr=(jd-2461041)/365.2425; // years since 2026.0
  return((star.lon2026+0.01397*yr)%360+360)%360;
}

// Given a longitude, find fixed stars conjunct within orb (in deg).
function findFixedStarConjunctions(lon,jd,orb){
  const hits=[];
  for(const s of FIXED_STARS){
    const sLon=fixedStarLon(s,jd);
    let d=Math.abs(sLon-lon);if(d>180)d=360-d;
    if(d<=orb)hits.push({star:s,orb:d,sLon});
  }
  return hits.sort((a,b)=>a.orb-b.orb);
}

// Scan natal planets + angles for fixed-star contacts. Orb: ~1° by default.
function scanNatalFixedStars(orb){
  const pts=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Ascendant','MC'];
  const nJd=NJD;
  const out=[];
  for(const p of pts){
    if(NATAL[p]===undefined)continue;
    const hits=findFixedStarConjunctions(NATAL[p],nJd,orb||1.0);
    for(const h of hits)out.push({point:p,...h});
  }
  return out;
}

// Scan current transit positions for fixed-star contacts. Tighter orb (0.5°).
function scanTransitFixedStars(cur,jd,orb){
  const pts=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  const out=[];
  for(const p of pts){
    if(cur[p]===undefined)continue;
    const hits=findFixedStarConjunctions(cur[p],jd,orb||0.5);
    for(const h of hits)out.push({point:p,...h});
  }
  return out;
}
