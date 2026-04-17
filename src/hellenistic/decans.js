// ══════════════════════════════════════════════════════════════
// hellenistic/decans.js — 36-decan corpus with Picatrix faces
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

// DECANS + PICATRIX FACES (36 ten-degree subdivisions)
// ══════════════════════════════════════════════════════════════
// Chaldean/Bonatti rulers: for each sign, three decans follow Chaldean
// order starting from the sign's traditional ruler.
const DECAN_RULERS={
  Aries:['Mars','Sun','Venus'],
  Taurus:['Mercury','Moon','Saturn'],
  Gemini:['Jupiter','Mars','Sun'],
  Cancer:['Venus','Mercury','Moon'],
  Leo:['Saturn','Jupiter','Mars'],
  Virgo:['Sun','Venus','Mercury'],
  Libra:['Moon','Saturn','Jupiter'],
  Scorpio:['Mars','Sun','Venus'],
  Sagittarius:['Mercury','Moon','Saturn'],
  Capricorn:['Jupiter','Mars','Sun'],
  Aquarius:['Venus','Mercury','Moon'],
  Pisces:['Saturn','Jupiter','Mars'],
};

// Tarot Decan Attributions — Golden Dawn / Crowley system.
// Each of the 36 minor arcana pips (2–10 of each suit) corresponds to one decan.
// Suit follows triplicity: Wands=Fire, Cups=Water, Swords=Air, Disks=Earth.
// Pip number rises with degrees: cardinal=2-3-4, fixed=5-6-7, mutable=8-9-10.
// The card is a vehicle for understanding the planet-in-sign quality of that 10° slice.
const TAROT_DECANS={
  'Aries-1':{card:'2 of Wands',title:'Lord of Dominion',meaning:'Mars in Aries decan 1. Pure will, the spark before the work begins. The energy is yours to direct — but it has not yet met resistance, so it can squander itself in restless motion. Use this slice to begin, not to sustain.',keyword:'Ignition'},
  'Aries-2':{card:'3 of Wands',title:'Lord of Established Strength',meaning:'Sun in Aries decan 2. The first surge has organised into a real position. You can see what you are building. The danger is mistaking the founding act for the whole work — pride hardens here. Consolidate, then keep moving.',keyword:'Foundation'},
  'Aries-3':{card:'4 of Wands',title:'Lord of Perfected Work',meaning:'Venus in Aries decan 3. Mars cooled by Venus: a celebration after a hard push, a finished structure that rests for one breath before the next campaign. Honour the completion. Don\'t coast.',keyword:'Completion'},
  'Taurus-1':{card:'5 of Disks',title:'Lord of Worry',meaning:'Mercury in Taurus decan 1. The mind worries the body\'s resources — counting, anxious about scarcity, unable to rest in what\'s actually present. Ground the worry in concrete inventory; abstract dread will not solve material questions.',keyword:'Scarcity-anxiety'},
  'Taurus-2':{card:'6 of Disks',title:'Lord of Success',meaning:'Moon in Taurus decan 2. The Moon is exalted here — material flow finds its rhythm. Resources arrive and pass through you. Generosity and reception both work; stinginess clogs the channel.',keyword:'Flow'},
  'Taurus-3':{card:'7 of Disks',title:'Lord of Failure',meaning:'Saturn in Taurus decan 3. The work has hit the long grinding middle. What looked promising stalls. Failure here is structural, not personal — finish or cut, but don\'t romanticise the slog.',keyword:'Stagnation'},
  'Gemini-1':{card:'8 of Swords',title:'Lord of Interference',meaning:'Jupiter in Gemini decan 1. Too many ideas, too many voices, the mind tangled in its own options. Jupiter\'s expansiveness scatters Mercury\'s precision. Pick one thread and follow it; second-guessing is the whole problem.',keyword:'Distraction'},
  'Gemini-2':{card:'9 of Swords',title:'Lord of Cruelty',meaning:'Mars in Gemini decan 2. The mind turns its blade inward — 3am thoughts, intrusive replays, sharp self-judgment. The cruelty is mental, not real. Get out of bed, write it down, name what is actually happening.',keyword:'Mental siege'},
  'Gemini-3':{card:'10 of Swords',title:'Lord of Ruin',meaning:'Sun in Gemini decan 3. An idea or argument has run its full course and collapsed. The relief of accepting it is over. Don\'t resurrect what just died — the ground is now clear for something new.',keyword:'Endpoint'},
  'Cancer-1':{card:'2 of Cups',title:'Lord of Love',meaning:'Venus in Cancer decan 1. Two cups touch. The opening of feeling toward another, mutual recognition, the quiet beginning of any real bond. Reach toward; do not grasp.',keyword:'Bonding'},
  'Cancer-2':{card:'3 of Cups',title:'Lord of Abundance',meaning:'Mercury in Cancer decan 2. Feeling overflows into shared joy — gathering, celebration, talk that nourishes. The risk is letting overflow drown what was meant to be tended privately.',keyword:'Conviviality'},
  'Cancer-3':{card:'4 of Cups',title:'Lord of Luxury',meaning:'Moon in Cancer decan 3. The Moon at home: feeling settles into itself and can become satiated, even bored. A gift is held out and you don\'t see it. Look up from the comfortable rut.',keyword:'Satiety'},
  'Leo-1':{card:'5 of Wands',title:'Lord of Strife',meaning:'Saturn in Leo decan 1. Pride meets pride. Competing wills, sparring without resolution, ego friction that keeps everyone honest if no one cracks. Useful for sharpening; ruinous if taken personally.',keyword:'Friction'},
  'Leo-2':{card:'6 of Wands',title:'Lord of Victory',meaning:'Jupiter in Leo decan 2. The win arrives, recognition follows, and you are visibly the one who made it happen. The trap is needing the applause to keep coming. Take the bow, then return to the work.',keyword:'Recognition'},
  'Leo-3':{card:'7 of Wands',title:'Lord of Valour',meaning:'Mars in Leo decan 3. You have the high ground; everyone else has numbers. Hold the position. This is the courage of a defender, not a conqueror — don\'t leave the wall to chase.',keyword:'Defense'},
  'Virgo-1':{card:'8 of Disks',title:'Lord of Prudence',meaning:'Sun in Virgo decan 1. Patient apprenticeship, the willingness to do something small a hundred times correctly. Mastery accrues quietly. Don\'t skip steps for spectacle.',keyword:'Craft'},
  'Virgo-2':{card:'9 of Disks',title:'Lord of Gain',meaning:'Venus in Virgo decan 2. Discrimination meets pleasure: the good thing chosen well, the harvest enjoyed. Self-sufficient grace. The shadow is fastidiousness — do not let the perfect refuse the good.',keyword:'Discerning gain'},
  'Virgo-3':{card:'10 of Disks',title:'Lord of Wealth',meaning:'Mercury in Virgo decan 3. The full storehouse, the operation that runs on its own. Inheritance, both literal and structural. Now the question is what to do with what you have built — stewardship, not acquisition.',keyword:'Established wealth'},
  'Libra-1':{card:'2 of Swords',title:'Lord of Peace Restored',meaning:'Moon in Libra decan 1. After conflict, a held truce. Both sides set down their arms but neither has surrendered. Don\'t mistake equilibrium for resolution; use this pause to negotiate the real thing.',keyword:'Truce'},
  'Libra-2':{card:'3 of Swords',title:'Lord of Sorrow',meaning:'Saturn in Libra decan 2. The cut that had to come — the relationship ended, the truth named. Pain that clarifies. Saturn here gives the fall a structure: grieve cleanly, do not embellish.',keyword:'Clean grief'},
  'Libra-3':{card:'4 of Swords',title:'Lord of Truce',meaning:'Jupiter in Libra decan 3. Withdrawal to recover, the deliberate pause. Set the sword down on the tomb and rest. Returning to the fight too soon undoes the recovery.',keyword:'Recovery'},
  'Scorpio-1':{card:'5 of Cups',title:'Lord of Disappointment',meaning:'Mars in Scorpio decan 1. What you wanted has spilled. The grief is loud; what remains, you cannot yet see. Sit with the loss before turning to the two cups still standing.',keyword:'Loss'},
  'Scorpio-2':{card:'6 of Cups',title:'Lord of Pleasure',meaning:'Sun in Scorpio decan 2. Memory and innocence — the past returns sweet, an old current of feeling re-emerges. Honest pleasure, not an escape. Receive without trying to recreate.',keyword:'Remembered joy'},
  'Scorpio-3':{card:'7 of Cups',title:'Lord of Debauch',meaning:'Venus in Scorpio decan 3. Many cups offered, all glittering, most poisoned. Fantasy, projection, the temptation to believe what you are being shown. Discriminate before drinking.',keyword:'Illusion'},
  'Sagittarius-1':{card:'8 of Wands',title:'Lord of Swiftness',meaning:'Mercury in Sagittarius decan 1. Arrows in flight — messages arrive, plans accelerate, a long-stuck thing suddenly moves. Catch the wave; the window is short.',keyword:'Acceleration'},
  'Sagittarius-2':{card:'9 of Wands',title:'Lord of Great Strength',meaning:'Moon in Sagittarius decan 2. The lone defender bandaged but standing, ready for the next assault. Reserve power earned by everything you have already absorbed. Don\'t lower the guard yet.',keyword:'Earned strength'},
  'Sagittarius-3':{card:'10 of Wands',title:'Lord of Oppression',meaning:'Saturn in Sagittarius decan 3. Carrying more than you should, because you committed and you keep your word. Honour does not require martyrdom. Set down what was never yours.',keyword:'Burden'},
  'Capricorn-1':{card:'2 of Disks',title:'Lord of Change',meaning:'Jupiter in Capricorn decan 1. Two pans of the scale, constantly rebalancing — work and rest, money in and out, multiple roles. Flow with the oscillation; a fixed posture topples.',keyword:'Juggling'},
  'Capricorn-2':{card:'3 of Disks',title:'Lord of Works',meaning:'Mars in Capricorn decan 2. Mars is exalted in Capricorn — disciplined effort meets structural ambition. Skilled labour with a clear plan. The work itself is the satisfaction.',keyword:'Skilled labour'},
  'Capricorn-3':{card:'4 of Disks',title:'Lord of Power',meaning:'Sun in Capricorn decan 3. The fortress finished, gates closed, walls high. Security earned, but at the cost of openness. Loosen the grip occasionally or the structure becomes a prison.',keyword:'Consolidation'},
  'Aquarius-1':{card:'5 of Swords',title:'Lord of Defeat',meaning:'Venus in Aquarius decan 1. A win that costs more than it gives — burned bridges, alienated allies, the satisfaction of being right. Choose your battles. Some wins are losses in slow motion.',keyword:'Pyrrhic victory'},
  'Aquarius-2':{card:'6 of Swords',title:'Lord of Science',meaning:'Mercury in Aquarius decan 2. Crossing from rough waters to calmer ones. Method, analysis, the mind solving by stepping back. Take the boat; the swim is unnecessary.',keyword:'Passage'},
  'Aquarius-3':{card:'7 of Swords',title:'Lord of Futility',meaning:'Moon in Aquarius decan 3. Sneaking out with most of what you came for, leaving the rest. Cleverness without commitment. Sometimes wise; often a way of avoiding the harder honest move.',keyword:'Half-measures'},
  'Pisces-1':{card:'8 of Cups',title:'Lord of Indolence',meaning:'Saturn in Pisces decan 1. Walking away from a setup that no longer feeds you, even though it looks fine from outside. The cups are full but empty. Trust the leaving.',keyword:'Leaving'},
  'Pisces-2':{card:'9 of Cups',title:'Lord of Happiness',meaning:'Jupiter in Pisces decan 2. Jupiter at home in Pisces: the wish granted, satisfaction that fills you up. Receive cleanly, without the reflex to discount it.',keyword:'Wish fulfilled'},
  'Pisces-3':{card:'10 of Cups',title:'Lord of Satiety',meaning:'Mars in Pisces decan 3. The full rainbow — happiness shared, the family scene, the picture that contains everything you wanted. Mars here keeps it from going saccharine: love that includes friction is what holds.',keyword:'Fullness'},
};

function computeDecan(lon){
  const s=signOf(lon);
  const signName=s.name;
  const degIntoSign=norm(lon)%30;
  const decanIdx=Math.floor(degIntoSign/10); // 0,1,2
  const rulers=DECAN_RULERS[signName]||['','',''];
  const ruler=rulers[decanIdx];
  const face=TAROT_DECANS[signName+'-'+(decanIdx+1)]||{};
  return{
    signName,
    decanIdx,
    decanNum:decanIdx+1,
    ruler,
    rangeStart:decanIdx*10,
    rangeEnd:(decanIdx+1)*10,
    degIntoDecan:degIntoSign-decanIdx*10,
    // Backward-compat: keep .image/.indication so any old call sites still render.
    image:face.card?(face.card+' — '+face.title):'',
    indication:face.meaning,
    card:face.card,
    title:face.title,
    meaning:face.meaning,
    keyword:face.keyword
  };
}
