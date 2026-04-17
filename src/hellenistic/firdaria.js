// ══════════════════════════════════════════════════════════════
// hellenistic/firdaria.js — Persian time-lord periods
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const FIRDARIA_YEARS={Sun:10,Venus:8,Mercury:13,Moon:9,Saturn:11,Jupiter:12,Mars:7};
const FIRDARIA_DAY=['Sun','Venus','Mercury','Moon','Saturn','Jupiter','Mars'];
const FIRDARIA_NIGHT=['Moon','Saturn','Jupiter','Mars','Sun','Venus','Mercury'];

// Each major period is divided into 7 equal sub-periods, beginning with the
// major lord and following the same sequence.
function computeFirdaria(birthDate,isNocturnal){
  const seq=isNocturnal?FIRDARIA_NIGHT:FIRDARIA_DAY;
  const majors=[];
  let cursor=0;
  for(let i=0;i<seq.length;i++){
    const lord=seq[i];
    const years=FIRDARIA_YEARS[lord];
    const subLen=years/7;
    const subs=[];
    // Sub-period sequence: starting at the major lord, cycle through seq
    const startIdx=seq.indexOf(lord);
    for(let j=0;j<7;j++){
      const subLord=seq[(startIdx+j)%seq.length];
      subs.push({
        level:2,
        lord:subLord,
        startYears:cursor+j*subLen,
        endYears:cursor+(j+1)*subLen,
        startDate:new Date(birthDate.getTime()+(cursor+j*subLen)*365.2425*86400000),
        endDate:new Date(birthDate.getTime()+(cursor+(j+1)*subLen)*365.2425*86400000),
        lengthYears:subLen
      });
    }
    majors.push({
      level:1,
      lord,
      startYears:cursor,
      endYears:cursor+years,
      startDate:new Date(birthDate.getTime()+cursor*365.2425*86400000),
      endDate:new Date(birthDate.getTime()+(cursor+years)*365.2425*86400000),
      lengthYears:years,
      subperiods:subs
    });
    cursor+=years;
  }
  return majors;
}

function findCurrentFirdaria(majors,ageYears){
  for(const m of majors){
    if(ageYears>=m.startYears&&ageYears<m.endYears){
      const sub=m.subperiods.find(s=>ageYears>=s.startYears&&ageYears<s.endYears);
      return{major:m,sub:sub};
    }
  }
  return null;
}

const FIRDARIA_VOICE={
  Sun:{theme:'Visibility, authority, identity',brief:['A chapter for being seen and taking the leading role. Work that requires you to be known benefits; anonymity chafes.','The Sun rules this period — your identity IS the instrument. What you do in public matters more than what you do in private.','A Solar chapter: the light is on you. Lean into visibility, leadership, and the courage to be recognized.']},
  Venus:{theme:'Love, art, pleasure, partnership',brief:['Relationships and aesthetic pursuits carry extra weight. The heart leads.','A Venusian chapter: what you desire shapes what you become. Follow beauty, not obligation.','Venus rules this period — love, money, and taste aren\'t distractions. They\'re the curriculum.']},
  Mercury:{theme:'Thought, communication, commerce, learning',brief:['A chapter for writing, studying, trading, teaching. The mind is the operative instrument.','Mercury rules this period — your words, your ideas, and your network are the primary tools.','A Mercurial chapter: information is power, and the right conversation changes everything.']},
  Moon:{theme:'Emotion, family, the body, home',brief:['Inner life, roots, the body\'s needs. The mother-function takes center stage.','The Moon rules this period — feeling leads, logic follows. Home and belonging set the tempo.','A Lunar chapter: honor the tides. What nurtures you is what matters most now.']},
  Saturn:{theme:'Discipline, structure, limit, maturity',brief:['A chapter of consolidation and earned mastery. Hard but formative. What gets built now lasts.','Saturn rules this period — no shortcuts, no inflation, no pretending. The work IS the reward.','A Saturnian chapter: the weight is real, but so is the durability of what you build under it.']},
  Jupiter:{theme:'Expansion, meaning, teaching, opportunity',brief:['A chapter of broadening — travel, philosophy, generosity, mentors appearing. The horizon widens.','Jupiter rules this period — say yes to what excites you. Growth is the mandate.','A Jovian chapter: faith returns, doors open, and what was small discovers it can be big.']},
  Mars:{theme:'Contest, courage, separation, action',brief:['A chapter requiring boldness. Conflicts surface. The gift is decisiveness; the risk is unchosen battles.','Mars rules this period — what you fight for reveals what you care about.','A Martial chapter: energy is high, patience is low, and courage is the operating currency.']},
};
