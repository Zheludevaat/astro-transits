// ── hard-brings.js ──
// Extracted from index.html — Phase 0 mechanical extraction.
// HARD_BRINGS, HARD_BRINGS_V, REMEDY_HOUSE constants and hardBringsHouse function.

const HARD_BRINGS={
Saturn:{brings:'Delays, obligations, authority pressure, the weight of consequences catching up. Physical fatigue or low energy.',
  remedy:'Structure your day tightly. Do the hardest task first. Accept the limitation rather than fighting it — Saturn respects discipline. Rest early. Avoid overcommitting.',
  traditional:'Saturn is mitigated by Jupiter aspects, Venus hours, and warmth/moisture. In a nocturnal chart, Saturn is the out-of-sect malefic — his difficulties land harder.'},
Mars:{brings:'Irritation, arguments, accidents, impulsive decisions, confrontation. High energy that turns destructive without direction.',
  remedy:'Channel the energy into physical exertion — exercise, cleaning, manual work. Avoid sending the angry email. Count to ten before responding to provocation. In a nocturnal chart, Mars is the in-sect malefic — his edge is somewhat tempered.',
  traditional:'Mars is mitigated by Venus aspects, Jupiter hours, and cooling/moistening. Physical outlets are the classical remedy.'},
Pluto:{brings:'Power struggles, compulsive behavior, confrontation with what you\'ve been avoiding. The sense that something must die for something new to live.',
  remedy:'Name what you\'re feeling rather than acting it out. Pluto respects honesty and crumbles under denial. Let go of what you\'re gripping too tightly. Seek depth, not control.',
  traditional:'Pluto transits cannot be hurried or bypassed. The only remedy is conscious engagement with the transformation.'},
Uranus:{brings:'Sudden disruptions, restlessness, the urge to break free regardless of consequences. Technology failures. Unexpected news.',
  remedy:'Don\'t make permanent decisions based on today\'s restlessness. The disruption is pointing toward something authentic, but the first impulse is usually too radical. Wait 48 hours before acting on the urge to blow something up.',
  traditional:'Uranus breaks what Saturn built. If the structure was sound, it survives. If not, its collapse is a mercy.'},
Neptune:{brings:'Confusion, boundary dissolution, idealization, escapist urges. Difficulty distinguishing what is real. Susceptibility to deception.',
  remedy:'Verify everything twice. Don\'t sign contracts. Avoid substances that blur your edges further. Channel the sensitivity into art, music, or meditation rather than escapism.',
  traditional:'Neptune dissolves by nature. The remedy is Saturnian: structure, routine, grounding in physical reality.'},
Chiron:{brings:'Resurfacing of old wounds, feelings of inadequacy or exposure. Sensitivity in the area of life this transit touches.',
  remedy:'The wound is surfacing because you are ready to face it. Don\'t armor up — vulnerability is the medicine here. Talk to someone you trust. The pain is purposeful.',
  traditional:'Chiron\'s wound heals by being witnessed, not by being fixed. The healer\'s path runs through the wound, not around it.'},
};

const HARD_BRINGS_V={
Saturn:{
  brings:['Delays, obligations, authority pressure, the weight of consequences.','Fatigue, restriction, the sense that nothing moves fast enough.','Cold reality: what isn\'t working becomes impossible to ignore.'],
  remedy:['Structure your day tightly. Do the hardest task first. Saturn respects discipline.','Accept the limitation rather than fighting it. The restriction is the instruction.','Rest early, commit to less, and build what\'s load-bearing. Skip the decorative.']
},
Mars:{
  brings:['Irritation, arguments, accidents, impulsive decisions.','High energy with no clean outlet. Anger looking for a target.','Confrontation — someone pushes, you push back, or vice versa.'],
  remedy:['Channel the energy into physical exertion. Avoid the angry email.','Count to ten. Then count again. The first impulse is usually too sharp.','Move your body before you move your mouth. The fire needs somewhere to go.']
},
Pluto:{
  brings:['Power struggles, compulsive behavior, confrontation with what you\'ve been avoiding.','The sense that something must die for something new to live.','Control issues surface — yours or someone else\'s.'],
  remedy:['Name what you\'re feeling rather than acting it out. Pluto respects honesty.','Let go of what you\'re gripping too tightly. Control is the illusion.','Seek depth, not control. The transformation can\'t be managed — only met.']
},
Uranus:{
  brings:['Sudden disruptions, restlessness, the urge to break free at any cost.','Unexpected news, technology failures, plans changing without warning.','The unbearable feeling that nothing can stay the way it is.'],
  remedy:['Don\'t make permanent decisions based on today\'s restlessness. Wait 48 hours.','The disruption points toward something authentic — but the first impulse is usually too radical.','Let the shock land before you react. Clarity follows chaos, not during it.']
},
Neptune:{
  brings:['Confusion, boundary dissolution, escapist urges, difficulty seeing what\'s real.','Susceptibility to deception — from others or from yourself.','The veil drops over everything. Facts become opinions become feelings.'],
  remedy:['Verify everything twice. Don\'t sign contracts. Avoid what blurs your edges further.','Channel the sensitivity into art or meditation rather than escapism.','Stay grounded in physical reality: eat, walk, touch something solid.']
},
Chiron:{
  brings:['Resurfacing of old wounds, feelings of inadequacy or exposure.','Sensitivity in the area of life this transit touches.','The original hurt echoes through a present-day trigger.'],
  remedy:['The wound surfaces because you\'re ready to face it. Don\'t armor up.','Talk to someone you trust. The pain is purposeful.','Chiron heals by being witnessed, not by being fixed. Let it be seen.']
}
};

// ── Universal variant picker for dictionaries ──
function pickV(variants,seed){
  if(!variants)return '';
  if(typeof variants==='string')return variants;
  if(Array.isArray(variants))return pick(variants,seed);
  return variants;
}
function sphereActive(planet){const pool=SPHERE_ACTIVE_V[planet];return pool?pick(pool,todaySeed()):(SPHERE[planet]||{}).when_active||'';}
function sphereStressed(planet){const pool=SPHERE_STRESSED_V[planet];return pool?pick(pool,todaySeed()):(SPHERE[planet]||{}).when_stressed||'';}
function lordFrame(planet){const pool=LORD_FRAME_V[planet];return pool?pick(pool,todaySeed()):LORD_FRAME[planet]||'';}
function domFlavor(planet){const pool=DOMINANT_FLAVOR_V[planet];return pool?pick(pool,todaySeed()):DOMINANT_FLAVOR[planet]||'';}
function retroVoice(planet){const pool=RETRO_VOICE_V[planet];return pool?pick(pool,todaySeed()):RETRO_VOICE[planet]||'';}
function hardBrings(planet,field){const pool=HARD_BRINGS_V[planet];if(!pool)return (HARD_BRINGS[planet]||{})[field]||'';const arr=pool[field];return arr?pick(arr,todaySeed()):'';}
// House-specific context for hard transits — what the difficulty looks like in each life area
const REMEDY_HOUSE={
1:'This hits your body and identity directly. Physical self-care is non-negotiable — sleep, movement, how you present yourself.',
2:'This targets your finances and self-worth. Avoid impulsive spending. Protect what you have. The pressure is about what you value.',
3:'This activates your communication zone. Watch your words, double-check messages, and be careful with siblings or neighbors.',
4:'This lands in your home and family sector. Domestic tensions surface. The foundation is being tested — attend to your roots.',
5:'This touches creativity, romance, and pleasure. Joy requires more effort. Creative blocks or romantic friction are likely.',
6:'This hits your daily routines and health. The body speaks louder under pressure. Adjust your schedule before it adjusts you.',
7:'This activates your relationship sector. Partnerships are under pressure — conflicts demand honest negotiation, not avoidance.',
8:'This targets shared resources, debts, and deep psychology. Power dynamics intensify. What you owe — financially or emotionally — comes due.',
9:'This hits your beliefs and horizons. Travel complications, educational setbacks, or a crisis of meaning. Examine what you believe and why.',
10:'This targets your career and public reputation. Professional pressure increases. Authority figures test you. What you\'ve built is evaluated.',
11:'This activates your social network and future vision. Friendships are tested. Group dynamics become difficult. Your ideals meet resistance.',
12:'This hits your hidden sector — isolation, self-undoing, and the unconscious. The difficulty is internal and hard to name. Rest. Reflect. Don\'t fight ghosts.'
};
function hardBringsHouse(house){return REMEDY_HOUSE[house]||'';}
