// ══════════════════════════════════════════════════════════════
// hellenistic/lots.js — Seven Hermetic Lots
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

function computeLots(cur,asc,isNocturnal){
  const A=asc;const Sun=cur.Sun;const Moon=cur.Moon;const Mer=cur.Mercury;
  const Ven=cur.Venus;const Mar=cur.Mars;const Jup=cur.Jupiter;const Sat=cur.Saturn;

  // Fortune: body — D: Asc+Moon-Sun; N: Asc+Sun-Moon
  const Fortune=norm(isNocturnal?(A+Sun-Moon):(A+Moon-Sun));
  // Spirit: soul/purpose — inverse of Fortune
  const Spirit=norm(isNocturnal?(A+Moon-Sun):(A+Sun-Moon));
  // Eros: desire — D: Asc+Venus-Spirit; N: Asc+Spirit-Venus
  const Eros=norm(isNocturnal?(A+Spirit-Ven):(A+Ven-Spirit));
  // Necessity: constraint — D: Asc+Fortune-Mercury; N: Asc+Mercury-Fortune
  const Necessity=norm(isNocturnal?(A+Mer-Fortune):(A+Fortune-Mer));
  // Courage: daring — D: Asc+Fortune-Mars; N: Asc+Mars-Fortune
  const Courage=norm(isNocturnal?(A+Mar-Fortune):(A+Fortune-Mar));
  // Victory: faith/triumph — D: Asc+Jupiter-Spirit; N: Asc+Spirit-Jupiter
  const Victory=norm(isNocturnal?(A+Spirit-Jup):(A+Jup-Spirit));
  // Nemesis: exposure/retribution — D: Asc+Fortune-Saturn; N: Asc+Saturn-Fortune
  const Nemesis=norm(isNocturnal?(A+Sat-Fortune):(A+Fortune-Sat));

  return{Fortune,Spirit,Eros,Necessity,Courage,Victory,Nemesis};
}

const LOT_MEANING={
  Fortune:{name:'Fortune',short:'Body & circumstance',long:'Where the body thrives — livelihood, health, the house where fortune lands without effort. What comes to you rather than what you pursue.'},
  Spirit:{name:'Spirit',short:'Purpose & action',long:'Where the soul applies its will — vocation, what you were sent to do. The active counterpart to Fortune\'s passive reception.'},
  Eros:{name:'Eros',short:'Desire & attraction',long:'What the heart pulls toward — the object of longing, the magnetic direction of desire beyond mere pleasure.'},
  Necessity:{name:'Necessity',short:'Constraint & compulsion',long:'Where fate tightens — the place you cannot negotiate with, the compulsions you must accept or break yourself against.'},
  Courage:{name:'Courage',short:'Daring & martial force',long:'Where boldness must be summoned — the domain requiring audacity, the place where hesitation costs you.'},
  Victory:{name:'Victory',short:'Faith & triumph',long:'Where trust is rewarded — the arena of successful striving, the belief that sustains you through struggle.'},
  Nemesis:{name:'Nemesis',short:'Exposure & limit',long:'Where the Saturnian reckoning lands — the hidden adversary, the place where hubris meets its limit. The shadow of Fortune.'},
};

// ── LOT_MEANING variant long descriptions ──
const LOT_MEANING_V={
Fortune:{long:['Where the body thrives — livelihood and health. What comes to you rather than what you pursue.','Fortune marks the place of embodied luck: physical vitality, material provision, and what fate deposits at your feet.','The Lot of Fortune is passive reception — where life gives without your having to ask. Health, circumstance, and what arrives unbidden.']},
Spirit:{long:['Where the soul applies its will — vocation and purpose. The active counterpart to Fortune\'s passive reception.','Spirit marks where you choose to direct your energy. Your vocation, your cause, your deliberate contribution.','The Lot of Spirit is Fortune\'s active twin: not what you receive but what you build with what you\'ve been given.']},
Eros:{long:['What the heart pulls toward — the object of longing, the magnetic direction of desire beyond mere pleasure.','Eros marks the direction of your deepest attraction. Not just romance — the thing you can\'t stop wanting.','The Lot of Eros points where desire runs hottest. Follow it and you find what the heart has already decided.']},
Necessity:{long:['Where fate tightens — the compulsions you must accept or break yourself against.','Necessity marks the non-negotiable. The part of life where free will meets its boundary wall.','The Lot of Necessity shows where you cannot bargain. Acceptance here isn\'t weakness — it\'s wisdom.']},
Courage:{long:['Where boldness must be summoned — the domain requiring audacity, the place where hesitation costs you.','Courage marks the arena where timidity fails and only daring succeeds. Your field of required bravery.','The Lot of Courage identifies where you need martial nerve. The house it falls in is where cowardice has the highest price.']},
Victory:{long:['Where trust is rewarded — the arena of successful striving, the belief that sustains you through struggle.','Victory marks the place where effort meets recognition. The arena where faith in your own capacity is vindicated.','The Lot of Victory shows where perseverance pays. Struggle in this house leads somewhere — unlike most struggles.']},
Nemesis:{long:['Where the reckoning lands — the hidden adversary, the place where hubris meets its limit.','Nemesis marks the domain of earned consequences. What you\'ve avoided confronting gathers here.','The Lot of Nemesis is Fortune\'s shadow. Where Fortune gives, Nemesis audits. This house demands humility.']}
};

function lotLong(name){const pool=(LOT_MEANING_V[name]||{}).long;return pool?pick(pool,todaySeed()):(LOT_MEANING[name]||{}).long||'';}
