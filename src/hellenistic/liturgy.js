// ══════════════════════════════════════════════════════════════
// hellenistic/liturgy.js — Planetary-day liturgy correspondences
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const PLANETARY_LITURGY={
  Sun:{
    weekday:'Sunday',color:'Gold',metal:'Gold',stone:'Ruby, citrine, amber',
    incense:'Frankincense, cinnamon, storax',herb:'Bay laurel, sunflower, chamomile',
    direction:'East',number:6,
    intent:'Authority, vitality, public work, healing, recognition.',
    focus:'Rise early. Face east. Do the thing that bears your name. Sunday is for legacy, for what you would stand behind if asked — not for small obligations.',
    avoid:'Mean, hidden, or servile work. Unconscious drift. Complaint.',
    meditation:'I am seen. I act in my own name.'
  },
  Moon:{
    weekday:'Monday',color:'Silver, pearl white',metal:'Silver',stone:'Moonstone, pearl, selenite',
    incense:'Jasmine, white sandalwood, camphor',herb:'Willow, lotus, mugwort, cucumber',
    direction:'West',number:9,
    intent:'Rest, dreaming, water, memory, reception, domestic work.',
    focus:'Monday restores. Sleep longer. Drink water. Tend the home. Let conversation be soft. What you take in today will feed the week.',
    avoid:'Aggression, public confrontation, fasting hard.',
    meditation:'I receive. I am fed.'
  },
  Mars:{
    weekday:'Tuesday',color:'Red, iron-red',metal:'Iron',stone:'Garnet, red jasper, bloodstone',
    incense:'Dragon\'s blood, tobacco, pepper',herb:'Nettle, garlic, thistle, ginger',
    direction:'South',number:5,
    intent:'Cut, strive, train, confront, excise. Surgical clarity.',
    focus:'Tuesday is for the thing you have been avoiding. Train the body. Finish the difficult email. Make the cut. Mars wants decision, not deliberation.',
    avoid:'Diplomacy, delicate contracts, peace-making, cosmetics.',
    meditation:'I strike clean. I do not apologise for the necessary.'
  },
  Mercury:{
    weekday:'Wednesday',color:'Mixed, iridescent, pale yellow',metal:'Mercury (quicksilver) / brass',stone:'Agate, opal, citrine',
    incense:'Mastic, lavender, fennel',herb:'Fennel, lavender, dill, marjoram',
    direction:'Center / crossroads',number:8,
    intent:'Speak, write, teach, travel, exchange, sort, connect.',
    focus:'Wednesday is for language and logistics. Handle correspondence. Schedule. Edit. Make the argument you have been drafting in your head. Books are welcome today.',
    avoid:'Silent brooding, unresolved grievance, binding permanent commitments.',
    meditation:'I carry the message. I speak and it moves.'
  },
  Jupiter:{
    weekday:'Thursday',color:'Royal blue, deep purple',metal:'Tin',stone:'Lapis lazuli, sapphire, amethyst',
    incense:'Cedar, sage, nutmeg, saffron',herb:'Sage, oak, dandelion, fig',
    direction:'Upward / the heights',number:4,
    intent:'Expand, bless, teach, invest, petition, host, forgive.',
    focus:'Thursday is Jupiter\'s day: ask for more. Submit the proposal. Make the introduction. Say the generous thing. Good for signing papers, starting new ventures, calling the person who intimidates you.',
    avoid:'Pettiness, stinginess, cynicism dressed as realism.',
    meditation:'The gate is open. I ask for the whole loaf.'
  },
  Venus:{
    weekday:'Friday',color:'Green, rose, copper',metal:'Copper',stone:'Emerald, rose quartz, jade',
    incense:'Rose, sandalwood, benzoin, myrtle',herb:'Rose, myrtle, vervain, damiana',
    direction:'The soft quarter',number:7,
    intent:'Beauty, love, art, pleasure, reconciliation, ornament.',
    focus:'Friday is for the aesthetic life. Cook. Dress well. Send flowers. Make up with someone. Begin an art piece. Venus rewards the pleasurable instead of the efficient.',
    avoid:'Austere cutting, harsh critique, accounting disputes.',
    meditation:'I choose the beautiful version.'
  },
  Saturn:{
    weekday:'Saturday',color:'Black, lead grey, dark violet',metal:'Lead',stone:'Onyx, obsidian, jet, smoky quartz',
    incense:'Myrrh, patchouli, cypress, asafoetida',herb:'Cypress, yew, comfrey, hemlock (reverence only)',
    direction:'Down / the depths',number:3,
    intent:'Endure, review, bound, conclude, confront mortality, fast.',
    focus:'Saturday is for endings and for the long arithmetic. Pay the bill. Audit the calendar. Visit the grave. Clean the hardest room. Saturn loves the honest face.',
    avoid:'Celebration, first kisses, elective surgery, optimism inflation.',
    meditation:'What is true will hold. What is false will crack.'
  }
};
