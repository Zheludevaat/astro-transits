// ══════════════════════════════════════════════════════════════
// hellenistic/mansions.js — 28 Lunar Mansions (Manazil al-Qamar)
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

// Each spans 360/28 = 12.857 degrees starting at 0 Aries
const MANSIONS=[
 {name:'Al Sharatain',eng:'The Two Signs',nature:'favorable',good:'Journeys, discord, war, destruction of enemies.',avoid:'Buying, lending, planting.',
  modern:'The Moon here activates beginnings and journeys. Energy is forward-moving and impatient \u2014 start things, make the first move, take the trip. Don\'t expect subtlety; this mansion rewards bold, direct action.'},
 {name:'Al Butain',eng:'The Belly',nature:'favorable',good:'Finding lost things, retention of captives, treasure-hunting.',avoid:'Voyages by sea.',
  modern:'Good for recovering what was lost \u2014 misplaced objects, forgotten ideas, old contacts worth reconnecting with. Patience and careful searching pay off today. Dig into what you already have rather than chasing something new.'},
 {name:'Al Thurayya',eng:'The Pleiades',nature:'favorable',good:'Alchemy, hunting, voyages, revenge on enemies.',avoid:'Sowing, marriage, buildings.',
  modern:'A restless, transformative energy. Great for pursuing goals with focus and intensity, especially creative or investigative work. Less ideal for settling down or making permanent commitments \u2014 this mansion wants movement, not roots.'},
 {name:'Al Dabaran',eng:'The Follower',nature:'unfavorable',good:'Destruction and hindrance of works only.',avoid:'Nearly all beginnings; sowing, marriage, journeys.',
  modern:'A day to clear the decks rather than build. Cancel what isn\'t working, end draining commitments, and declutter. Trying to force new starts will meet friction \u2014 lean into endings and editing instead.'},
 {name:'Al Haq\'ah',eng:'The White Spot',nature:'favorable',good:'Safety at sea, the return of travelers, love between friends.',avoid:'Marriage, enmity, sowing.',
  modern:'Protective and reunion-oriented energy. Reach out to friends you haven\'t spoken to in a while; welcome people back into your life. Travel is safe and connections deepen naturally. Keep things warm and low-pressure.'},
 {name:'Al Han\'ah',eng:'The Brand',nature:'favorable',good:'Hunting, besieging cities, revenge. Favorable for reaping harvests.',avoid:'Voyages, marriage.',
  modern:'Time to collect what you\'ve earned. Follow up on invoices, harvest the results of past effort, close deals. The energy is focused and persistent \u2014 good for finishing, less good for starting fresh or making romantic gestures.'},
 {name:'Al Dhira',eng:'The Forearm',nature:'favorable',good:'Gain in all things, friendship, travelers\' safety.',avoid:'',
  modern:'One of the most broadly favorable mansions. Almost anything you attempt today has a tailwind. Friendships flourish, money flows more easily, and travel goes smoothly. Use this open window \u2014 it\'s genuinely rare.'},
 {name:'Al Nathrah',eng:'The Gap',nature:'favorable',good:'Love, friendship, fellow-travelers, driving away mice.',avoid:'Destructive works.',
  modern:'Warmth and companionship define this mansion. Spend time with people you care about, collaborate on shared projects, or simply enjoy good company. Avoid tearing things down \u2014 this energy builds bonds, not walls.'},
 {name:'Al Tarf',eng:'The Glance',nature:'unfavorable',good:'Hindering travelers, sowing discord.',avoid:'Positive beginnings, marriage.',
  modern:'Watch for misunderstandings and delays today. Plans may stall or people may rub each other the wrong way. Keep your schedule flexible and avoid launching anything important. A good day to lay low and handle small, private tasks.'},
 {name:'Al Jabhah',eng:'The Forehead',nature:'unfavorable',good:'Works of hatred, war, destruction of buildings; causes enemies to flee.',avoid:'Marriage, love, commerce.',
  modern:'Confrontational energy \u2014 useful if you need to stand your ground or push back against something unfair, but corrosive for relationships. Avoid financial negotiations and romantic conversations. Channel the intensity into boundaries, not bridges.'},
 {name:'Al Zubrah',eng:'The Mane',nature:'favorable',good:'Profit from voyages, deliverance of prisoners, beneficial to merchants.',avoid:'Sowing.',
  modern:'Strong for business, trade, and any kind of exchange. Sell, negotiate, pitch, or publish. This mansion favors putting your work into the world and being compensated fairly. Less about planting seeds, more about moving product.'},
 {name:'Al Sarfah',eng:'The Changer',nature:'favorable',good:'Voyages, safe return, gain by commerce, liberation of captives.',avoid:'Marriage.',
  modern:'The energy of turning points and course corrections. If something needs to shift in your life \u2014 a habit, a direction, a strategy \u2014 this mansion supports the pivot. Travel and commerce go well. Commitments can wait; transitions cannot.'},
 {name:'Al Awwa\'',eng:'The Barker',nature:'favorable',good:'Love, benevolence, gain, travel, marriage; cures the sick.',avoid:'',
  modern:'A genuinely healing mansion. Relationships mend, generosity is rewarded, and health improves. This is one of the best days for heartfelt conversations, apologies, or simply showing up for someone. Whatever you give comes back multiplied.'},
 {name:'Al Simak',eng:'The Unarmed',nature:'unfavorable',good:'Divorce, destruction of houses and enemies, discord.',avoid:'Love, partnership, fellowship.',
  modern:'Separation energy dominates. If you need to cut ties, walk away from a bad deal, or enforce a boundary, this mansion supports it. But don\'t try to build partnerships or deepen intimacy today \u2014 the current pulls things apart, not together.'},
 {name:'Al Ghafr',eng:'The Cover',nature:'unfavorable',good:'Digging, extracting treasures, works of malice.',avoid:'Marriage, travel.',
  modern:'A day for uncovering hidden things \u2014 research, investigation, reading the fine print. Good for digging into problems but bad for surface-level socializing or travel. Stay home, go deep, and trust what you find beneath the obvious.'},
 {name:'Al Zubana',eng:'The Claws',nature:'unfavorable',good:'Redeeming captives, discord.',avoid:'Travel, beginnings.',
  modern:'Tense and gripping energy. Useful if you need to free yourself or someone else from a stuck situation \u2014 escape a bad contract, break a pattern, advocate for someone trapped. Otherwise, avoid starting new projects or traveling. Focus on liberation.'},
 {name:'Al Iklil',eng:'The Crown',nature:'favorable',good:'Improving fortune, friendships, besieging and taking cities.',avoid:'Marriage.',
  modern:'Ambition and social capital are highlighted. Push for a promotion, pitch your vision, rally allies to your cause. This mansion crowns effort with recognition. Just don\'t confuse professional triumph with personal intimacy \u2014 keep romance separate.'},
 {name:'Al Qalb',eng:'The Heart',nature:'unfavorable',good:'Discord, conspiracy against enemies, revenge.',avoid:'Travel, love, trade.',
  modern:'Emotionally intense and potentially volatile. Grievances surface and power struggles sharpen. If you must confront something, do so strategically and with restraint. Avoid impulsive purchases, travel, or love confessions \u2014 the heart is too hot to trust today.'},
 {name:'Al Shaulah',eng:'The Sting',nature:'unfavorable',good:'Besieging of cities, taking prisoners, destruction of enemies.',avoid:'Voyages, marriage, sowing.',
  modern:'Sharp, aggressive energy that can wound or protect depending on how you wield it. Good for enforcing consequences and holding the line. Terrible for gentle beginnings. Don\'t propose, don\'t plant, don\'t set sail \u2014 but do defend what matters.'},
 {name:'Al Na\'am',eng:'The Ostriches',nature:'unfavorable',good:'Taming wild beasts, strengthening prisons, destroying friendships.',avoid:'Positive works, travel.',
  modern:'Discipline and containment are favored over freedom and expansion. Use this energy to rein in bad habits, set hard limits, or impose structure on chaos. Creative or social plans will feel restricted \u2014 work within constraints rather than fighting them.'},
 {name:'Al Baldah',eng:'The City',nature:'favorable',good:'Harvest, gain, buildings, travel, marriage, cures the sick.',avoid:'',
  modern:'Civilization energy at its best \u2014 build, gather, travel, commit, heal. This is a mansion of abundance and civic life. Almost everything constructive is supported. Make appointments, sign leases, schedule the trip, have the conversation you\'ve been putting off.'},
 {name:'Sa\'d al-Dhabih',eng:'Lucky One of the Slaughter',nature:'favorable',good:'Flight from tyranny, healing the sick, keeping secrets.',avoid:'Marriage.',
  modern:'Quiet power and self-preservation. Good for escaping toxic situations, healing from illness or burnout, and keeping your plans close to your chest. Don\'t announce, don\'t commit publicly \u2014 move in silence and protect your energy.'},
 {name:'Sa\'d Bula',eng:'Lucky Swallower',nature:'favorable',good:'Divorce, liberation of captives, healing.',avoid:'Binding oaths.',
  modern:'Release and recovery. Let go of what no longer serves you \u2014 relationships, obligations, grudges, subscriptions. Healing accelerates when you stop holding on. Just don\'t sign binding agreements or make promises; this mansion dissolves, it doesn\'t bind.'},
 {name:'Sa\'d al-Su\'ud',eng:'Luckiest of the Lucky',nature:'favorable',good:'Marriage, victory over enemies, good works of all kinds.',avoid:'',
  modern:'The most auspicious mansion of all. Whatever you\'ve been waiting for the right moment to do \u2014 this is it. Propose, launch, sign, celebrate. Fortune is genuinely on your side. The only mistake is wasting this energy on something small.'},
 {name:'Sa\'d al-Akhbiyah',eng:'Lucky of the Tents',nature:'favorable',good:'Besieging armies, revenge, divorce, destruction of buildings.',avoid:'Marriage, sowing.',
  modern:'Strategic and protective. Good for securing your position, defending your interests, and dismantling things that need to come down. Think demolition before renovation. Not the day to marry or plant \u2014 but excellent for clearing ground for what comes next.'},
 {name:'Al Fargh al-Awwal',eng:'First Outpouring',nature:'unfavorable',good:'Union, love, discord of enemies, ruin of wells.',avoid:'Marriage, beginning journeys.',
  modern:'Emotional floodgates open. Deep connections are possible but so is overwhelm. Good for honest emotional conversations and weakening opposition, but not for formal commitments or setting out on new paths. Feel the feelings, but don\'t build on them yet.'},
 {name:'Al Fargh al-Thani',eng:'Second Outpouring',nature:'favorable',good:'Gain, marriage, harvest, redeeming of captives.',avoid:'',
  modern:'The overflow becomes abundance. What poured out in the previous mansion now settles into tangible gain. Excellent for financial moves, weddings, collecting what\'s owed, and bringing people home. This is harvest energy \u2014 gather freely.'},
 {name:'Al Risha\'',eng:'The Cord',nature:'favorable',good:'Union, security in fishing, safety at sea, recovery of merchandise.',avoid:'Marriage.',
  modern:'Tying things together. Contracts, collaborations, reunions, and recoveries all go well. If something slipped away \u2014 a deal, an item, a connection \u2014 this mansion helps you reel it back in. Focus on securing what you have rather than chasing what you don\'t.'},
];
const MANSION_ARC=360/28; // 12.857°
function computeMansion(moonLon){
  const idx=Math.floor(norm(moonLon)/MANSION_ARC)%28;
  const start=idx*MANSION_ARC;
  const within=norm(moonLon)-start;
  const m=MANSIONS[idx];
  return{index:idx+1,start,end:start+MANSION_ARC,within,...m};
}
