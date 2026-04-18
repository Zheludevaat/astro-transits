// ══════════════════════════════════════════════════════════════
// hellenistic/zr.js — Zodiacal Releasing from Spirit and Fortune
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const ZR_YEARS={
  Aries:15,Taurus:8,Gemini:20,Cancer:25,Leo:19,Virgo:20,
  Libra:8,Scorpio:15,Sagittarius:12,Capricorn:27,Aquarius:27,Pisces:12
};
const ZR_COLORS={
  Aries:'#e0425d',Taurus:'#3dd9a0',Gemini:'#f5b843',Cancer:'#9b6dff',
  Leo:'#ffb142',Virgo:'#5cd6a8',Libra:'#f58ca3',Scorpio:'#c13b5a',
  Sagittarius:'#8a5cf0',Capricorn:'#4a6278',Aquarius:'#4a9eff',Pisces:'#7fc6e8'
};
// Returns sign index (0=Aries) for an L-period index given the starting sign
function zrNext(signIdx){return(signIdx+1)%12;}

// Compute Level 1 and Level 2 periods from startLot to limitDate
// birthDate: Date object; startSignIdx: 0-11; yearsTotal: how many years to project
function computeZR(startSignIdx,birthDate,yearsTotal){
  const periods=[];
  let cursor=0; // years elapsed since birth
  let signIdx=startSignIdx;
  while(cursor<yearsTotal){
    const signName=SIGNS[signIdx];
    const len=ZR_YEARS[signName];
    const p={
      level:1,
      signIdx,
      sign:signName,
      ruler:TRAD_RULERS[signName],
      startYears:cursor,
      endYears:cursor+len,
      startDate:new Date(birthDate.getTime()+cursor*365.2425*86400000),
      endDate:new Date(birthDate.getTime()+(cursor+len)*365.2425*86400000),
      lengthYears:len,
      peak:((signIdx-startSignIdx+12)%12)%3===0 && ((signIdx-startSignIdx+12)%12)!==0,
      subperiods:[]
    };
    // Sub-periods (L2): each L1 is divided proportionally by the same zodiacal rule
    let subSignIdx=signIdx;
    let subCursor=0;
    while(subCursor<len-0.001){
      const subSignName=SIGNS[subSignIdx];
      const subLenRaw=ZR_YEARS[subSignName];
      const subLen=Math.min(subLenRaw,len-subCursor);
      p.subperiods.push({
        level:2,
        signIdx:subSignIdx,
        sign:subSignName,
        ruler:TRAD_RULERS[subSignName],
        startYears:cursor+subCursor,
        endYears:cursor+subCursor+subLen,
        startDate:new Date(birthDate.getTime()+(cursor+subCursor)*365.2425*86400000),
        endDate:new Date(birthDate.getTime()+(cursor+subCursor+subLen)*365.2425*86400000),
        lengthYears:subLen,
        truncated:subLen<subLenRaw,
        peak:((subSignIdx-startSignIdx+12)%12)%3===0 && ((subSignIdx-startSignIdx+12)%12)!==0
      });
      subCursor+=subLen;
      subSignIdx=zrNext(subSignIdx);
    }
    periods.push(p);

    // LB detection: if NEXT sign is the 8th from startSignIdx, jump to 9th
    const nextIdx=zrNext(signIdx);
    if(((nextIdx-startSignIdx+12)%12)===7){
      p.lbFollows=true;
      signIdx=(startSignIdx+8)%12;
    } else {
      signIdx=nextIdx;
    }
    cursor+=len;
  }
  return periods;
}

function findCurrentZRPeriod(periods,nowYears){
  for(const p of periods){
    if(nowYears>=p.startYears&&nowYears<p.endYears){
      const sub=p.subperiods.find(s=>nowYears>=s.startYears&&nowYears<s.endYears);
      return{l1:p,l2:sub};
    }
  }
  return null;
}

const ZR_SIGN_VOICE = {
  Aries: {
    spirit: {
      brief: 'Bold new beginnings, pioneering drive',
      desc: 'This is a chapter of initiative and self-assertion. You are called to start things, take risks, and act on instinct rather than waiting for permission. Independence is the theme -- you forge ahead even when the path is unclear.'
    },
    fortune: {
      brief: 'Physical vitality surges, watch for recklessness',
      desc: 'The body runs hot with energy and restlessness. You may feel driven to move, compete, or push physical limits. Channel this surge deliberately -- accidents and inflammation come from unchecked impulsiveness.'
    }
  },
  Taurus: {
    spirit: {
      brief: 'Steady building, material consolidation',
      desc: 'This period rewards patience and persistence over flash. You are laying foundations -- acquiring resources, stabilizing what you have, and building something meant to last. Rushing undermines the chapter\'s purpose.'
    },
    fortune: {
      brief: 'Financial stability, comfort through the senses',
      desc: 'The body craves rest, good food, and sensory pleasure. Health improves through regularity and ease rather than intensity. Finances tend to stabilize, though indulgence can become its own trap if unchecked.'
    }
  },
  Gemini: {
    spirit: {
      brief: 'Intellectual exploration, diverse connections',
      desc: 'Curiosity drives this chapter. You may juggle multiple projects, learn new skills, or expand your social network rapidly. The risk is scattering your energy -- the gift is versatility and the ability to adapt to anything.'
    },
    fortune: {
      brief: 'Nervous energy, health tied to mental state',
      desc: 'The body mirrors the mind\'s restlessness. Sleep and nervous system health need attention. Short trips, errands, and daily variety keep you stimulated, but overstimulation leads to anxiety and scattered vitality.'
    }
  },
  Cancer: {
    spirit: {
      brief: 'Emotional roots, nurturing what matters most',
      desc: 'Career and purpose orient around home, family, or emotional security. You may feel called to protect, nurture, or create a foundation for others. Public ambition takes a back seat to private meaning during this chapter.'
    },
    fortune: {
      brief: 'Digestion and mood drive health, seek comfort',
      desc: 'The body is sensitive to emotional states -- stomach, chest, and fluid balance reflect inner turbulence. Nourishing food, safe environments, and emotional care are the best medicine. Comfort is not indulgence here; it is necessity.'
    }
  },
  Leo: {
    spirit: {
      brief: 'Creative authority, stepping into visibility',
      desc: 'This chapter demands you be seen. Leadership, creative expression, and personal authority come to the foreground. You are learning to own your presence and take up space -- false modesty undermines the period\'s potential.'
    },
    fortune: {
      brief: 'Heart vitality, energy through joy and play',
      desc: 'The body thrives on warmth, movement, and delight. Heart health and circulation deserve attention. Vitality comes through doing what you love rather than grinding -- pleasure is genuinely medicinal in this period.'
    }
  },
  Virgo: {
    spirit: {
      brief: 'Refinement, skill-building, purposeful service',
      desc: 'This is a chapter of craft and discernment. You refine your methods, improve your competence, and serve something larger through careful work. The danger is perfectionism that prevents completion -- done is better than flawless.'
    },
    fortune: {
      brief: 'Health-conscious period, gut and routine matter',
      desc: 'The body responds powerfully to routine, diet, and daily habits. Digestive health and nervous tension are focal points. Small consistent adjustments outperform dramatic interventions -- this period rewards discipline over heroics.'
    }
  },
  Libra: {
    spirit: {
      brief: 'Partnerships, balance, diplomacy in action',
      desc: 'Purpose flows through relationship and collaboration during this chapter. You advance by finding the right allies, negotiating well, and creating harmony in your professional world. Going it alone is the wrong move here.'
    },
    fortune: {
      brief: 'Kidney and lower back focus, balance in all things',
      desc: 'The body seeks equilibrium. Overwork or excess in any direction shows up as lower back strain, kidney stress, or skin issues. Beauty, art, and pleasant environments genuinely improve physical wellbeing during this time.'
    }
  },
  Scorpio: {
    spirit: {
      brief: 'Deep transformation, power through crisis',
      desc: 'This is an intense chapter that strips away what is no longer true. Career and purpose may involve confronting hidden dynamics, managing crises, or undergoing profound reinvention. Power comes through willingness to face what others avoid.'
    },
    fortune: {
      brief: 'Reproductive health, detox, hidden conditions surface',
      desc: 'The body purges and regenerates. Chronic or hidden health issues may surface for resolution. Reproductive health, elimination, and emotional toxicity all demand attention. Healing here is deep but rarely comfortable.'
    }
  },
  Sagittarius: {
    spirit: {
      brief: 'Expansion, vision, teaching or publishing',
      desc: 'Purpose broadens dramatically. Travel, higher education, publishing, or philosophical exploration define this chapter. You are meant to aim high and think big -- the risk is overextension, but the reward is genuine wisdom and reach.'
    },
    fortune: {
      brief: 'Liver and thighs, excess poses the real risk',
      desc: 'The body tends toward expansion -- weight gain, liver strain, or overindulgence. Physical adventure and outdoor movement are ideal outlets. The real health risk is too much of a good thing rather than deprivation.'
    }
  },
  Capricorn: {
    spirit: {
      brief: 'Ambitious structure, long-term career building',
      desc: 'This is the chapter of serious achievement. You build institutional credibility, take on responsibility, and pursue goals that require years of sustained effort. The work is hard but the results are durable and respected.'
    },
    fortune: {
      brief: 'Bones, joints, and teeth need care; slow but steady',
      desc: 'The body ages in visible ways -- knees, bones, teeth, and skin demand maintenance. Recovery takes longer but endurance is strong. Consistent structural care (posture, stretching, calcium) prevents the brittleness this period can bring.'
    }
  },
  Aquarius: {
    spirit: {
      brief: 'Innovation, community, unconventional path',
      desc: 'Purpose aligns with collective concerns, technology, or reform. You may feel alienated from mainstream paths and drawn to experimental or humanitarian work. The chapter rewards originality and willingness to be the odd one out.'
    },
    fortune: {
      brief: 'Circulation, ankles, nervous system irregularities',
      desc: 'The body may behave unpredictably -- circulation issues, electrical sensitivity, or unusual symptoms that defy easy diagnosis. Nervous system care, grounding practices, and adequate hydration help stabilize an erratic physical pattern.'
    }
  },
  Pisces: {
    spirit: {
      brief: 'Surrender, spiritual depth, creative dissolution',
      desc: 'This chapter dissolves old structures and invites trust in something beyond personal control. Career may feel foggy or guided by intuition rather than strategy. Creative and spiritual work thrives; rigid ambition falters.'
    },
    fortune: {
      brief: 'Feet, immune system, sensitivity to substances',
      desc: 'The body is porous and absorptive -- medication, alcohol, and environmental toxins hit harder. Immune sensitivity increases. Rest, water, and gentle movement protect a system that is unusually open during this period.'
    }
  }
};
