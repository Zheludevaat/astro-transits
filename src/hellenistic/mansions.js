// ══════════════════════════════════════════════════════════════
// hellenistic/mansions.js — 28 Lunar Mansions (Manazil al-Qamar)
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

// Each spans 360/28 = 12.857 degrees starting at 0 Aries
const MANSIONS=[
 {name:'Al Sharatain',eng:'The Two Signs',nature:'favorable',good:'Journeys, discord, war, destruction of enemies.',avoid:'Buying, lending, planting.'},
 {name:'Al Butain',eng:'The Belly',nature:'favorable',good:'Finding lost things, retention of captives, treasure-hunting.',avoid:'Voyages by sea.'},
 {name:'Al Thurayya',eng:'The Pleiades',nature:'favorable',good:'Alchemy, hunting, voyages, revenge on enemies.',avoid:'Sowing, marriage, buildings.'},
 {name:'Al Dabaran',eng:'The Follower',nature:'unfavorable',good:'Destruction and hindrance of works only.',avoid:'Nearly all beginnings; sowing, marriage, journeys.'},
 {name:'Al Haq\'ah',eng:'The White Spot',nature:'favorable',good:'Safety at sea, the return of travelers, love between friends.',avoid:'Marriage, enmity, sowing.'},
 {name:'Al Han\'ah',eng:'The Brand',nature:'favorable',good:'Hunting, besieging cities, revenge. Favorable for reaping harvests.',avoid:'Voyages, marriage.'},
 {name:'Al Dhira',eng:'The Forearm',nature:'favorable',good:'Gain in all things, friendship, travelers\' safety.',avoid:''},
 {name:'Al Nathrah',eng:'The Gap',nature:'favorable',good:'Love, friendship, fellow-travelers, driving away mice.',avoid:'Destructive works.'},
 {name:'Al Tarf',eng:'The Glance',nature:'unfavorable',good:'Hindering travelers, sowing discord.',avoid:'Positive beginnings, marriage.'},
 {name:'Al Jabhah',eng:'The Forehead',nature:'unfavorable',good:'Works of hatred, war, destruction of buildings; causes enemies to flee.',avoid:'Marriage, love, commerce.'},
 {name:'Al Zubrah',eng:'The Mane',nature:'favorable',good:'Profit from voyages, deliverance of prisoners, beneficial to merchants.',avoid:'Sowing.'},
 {name:'Al Sarfah',eng:'The Changer',nature:'favorable',good:'Voyages, safe return, gain by commerce, liberation of captives.',avoid:'Marriage.'},
 {name:'Al Awwa\'',eng:'The Barker',nature:'favorable',good:'Love, benevolence, gain, travel, marriage; cures the sick.',avoid:''},
 {name:'Al Simak',eng:'The Unarmed',nature:'unfavorable',good:'Divorce, destruction of houses and enemies, discord.',avoid:'Love, partnership, fellowship.'},
 {name:'Al Ghafr',eng:'The Cover',nature:'unfavorable',good:'Digging, extracting treasures, works of malice.',avoid:'Marriage, travel.'},
 {name:'Al Zubana',eng:'The Claws',nature:'unfavorable',good:'Redeeming captives, discord.',avoid:'Travel, beginnings.'},
 {name:'Al Iklil',eng:'The Crown',nature:'favorable',good:'Improving fortune, friendships, besieging and taking cities.',avoid:'Marriage.'},
 {name:'Al Qalb',eng:'The Heart',nature:'unfavorable',good:'Discord, conspiracy against enemies, revenge.',avoid:'Travel, love, trade.'},
 {name:'Al Shaulah',eng:'The Sting',nature:'unfavorable',good:'Besieging of cities, taking prisoners, destruction of enemies.',avoid:'Voyages, marriage, sowing.'},
 {name:'Al Na\'am',eng:'The Ostriches',nature:'unfavorable',good:'Taming wild beasts, strengthening prisons, destroying friendships.',avoid:'Positive works, travel.'},
 {name:'Al Baldah',eng:'The City',nature:'favorable',good:'Harvest, gain, buildings, travel, marriage, cures the sick.',avoid:''},
 {name:'Sa\'d al-Dhabih',eng:'Lucky One of the Slaughter',nature:'favorable',good:'Flight from tyranny, healing the sick, keeping secrets.',avoid:'Marriage.'},
 {name:'Sa\'d Bula',eng:'Lucky Swallower',nature:'favorable',good:'Divorce, liberation of captives, healing.',avoid:'Binding oaths.'},
 {name:'Sa\'d al-Su\'ud',eng:'Luckiest of the Lucky',nature:'favorable',good:'Marriage, victory over enemies, good works of all kinds.',avoid:''},
 {name:'Sa\'d al-Akhbiyah',eng:'Lucky of the Tents',nature:'favorable',good:'Besieging armies, revenge, divorce, destruction of buildings.',avoid:'Marriage, sowing.'},
 {name:'Al Fargh al-Awwal',eng:'First Outpouring',nature:'unfavorable',good:'Union, love, discord of enemies, ruin of wells.',avoid:'Marriage, beginning journeys.'},
 {name:'Al Fargh al-Thani',eng:'Second Outpouring',nature:'favorable',good:'Gain, marriage, harvest, redeeming of captives.',avoid:''},
 {name:'Al Risha\'',eng:'The Cord',nature:'favorable',good:'Union, security in fishing, safety at sea, recovery of merchandise.',avoid:'Marriage.'},
];
const MANSION_ARC=360/28; // 12.857°
function computeMansion(moonLon){
  const idx=Math.floor(norm(moonLon)/MANSION_ARC)%28;
  const start=idx*MANSION_ARC;
  const within=norm(moonLon)-start;
  const m=MANSIONS[idx];
  return{index:idx+1,start,end:start+MANSION_ARC,within,...m};
}
