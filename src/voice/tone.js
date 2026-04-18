// ── tone.js ──
// Extracted from index.html — Phase 0 mechanical extraction.
// Tone guidance constants: TONE_PLANET_HIGH/MID/LOW, TONE_GENERIC_HIGH/MID/LOW,
// ANNUAL_THEME, MONTH_THEME.

const TONE_PLANET_HIGH={
  Sun:'Solar confidence is strong today. Your authority, visibility, and creative output are amplified. Step into the spotlight — you have backing.',
  Moon:'Emotional intelligence is your advantage today. Relationships, intuition, and nurturing efforts flow. Trust your gut and attend to people.',
  Mercury:'Your mind is sharp and communication channels are open. Write, pitch, negotiate, sign, and schedule the important conversations today.',
  Venus:'Pleasure, charm, and social grace are amplified. Relationships, creative projects, and financial negotiations are strongly favored.',
  Mars:'Physical energy and drive are high and well-directed. Compete, exercise, initiate, and push through obstacles — the fire is working for you.',
  Jupiter:'Expansion and opportunity are active. Take the bigger risk, say yes to the invitation, and think about what you want to grow. Luck is available.',
  Saturn:'Structure and discipline pay off today. The energy is serious but productive — build, commit, and do the work that compounds over time.',
  Uranus:'Expect the unexpected — breakthroughs, sudden clarity, and liberation from patterns you did not realize were holding you. Lean into change rather than resisting it.',
  Neptune:'Intuition and imagination are heightened. Creative and spiritual work is deeply supported. Trust what you sense but verify anything that requires facts.',
  Pluto:'Deep power is available. Confront what you have been avoiding — the truth that surfaces today has the force to transform everything downstream. Use it wisely.',
  Chiron:'Your sensitivity is your instrument today. Healing work, honest conversations, and vulnerability all carry unusual weight. What hurts is also what teaches.',
  NorthNode:'Fate is in the room. Encounters, decisions, and redirections today carry a quality of inevitability. Follow the synchronicities — they are not coincidental.'
};
const TONE_PLANET_MID={
  Sun:'Your identity and will are in a mixed field today. Assert yourself where it matters, but pick your moments rather than pushing on everything.',
  Moon:'Emotions are active but uneven. Some connections will flow, others will need patience. Check in with yourself before reacting.',
  Mercury:'Communication is possible but requires care. Double-check details, clarify assumptions, and avoid sending anything in frustration.',
  Venus:'Relationships and pleasures have both friction and reward. Don\'t force social situations — lean into what\'s easy and defer what isn\'t.',
  Mars:'Energy is present but volatile. Channel the drive into physical or productive outlets. Avoid confrontations that don\'t serve you.',
  Jupiter:'Some doors open, others stick. Growth is possible but not guaranteed. Don\'t overcommit — selective optimism beats blind expansion.',
  Saturn:'Pressure is real but manageable. Focus on obligations and structure — the day rewards discipline but punishes overreach.',
  Uranus:'Restlessness and innovation compete. Some disruptions are productive, others are noise. Distinguish between genuine insight and reactive impulse before acting.',
  Neptune:'The boundary between imagination and confusion is thin today. Creative and empathic work benefits; decisions requiring precision do not. Sleep on anything important.',
  Pluto:'Power dynamics are in play but the direction is unclear. Avoid forcing outcomes. Observe what is surfacing — transformation is underway but not yet ripe for action.',
  Chiron:'Old wounds are activated but not overwhelming. You can choose to engage the healing or let it pass. Teaching, counseling, and honest reflection are all available but optional.',
  NorthNode:'Subtle course corrections are happening. Nothing dramatic, but the choices you make today nudge your trajectory. Pay attention to what pulls you forward versus what pulls you back.'
};
const TONE_PLANET_LOW={
  Sun:'Your vitality and confidence are under pressure. Conserve energy, avoid ego battles, and don\'t make identity-level decisions under this cloud.',
  Moon:'Emotional storms are likely. Protect your inner peace — avoid people who drain you, cancel what you can, and prioritize self-care.',
  Mercury:'Communication is treacherous. Misunderstandings, lost messages, and mental fog dominate. Verify everything twice and delay important decisions.',
  Venus:'Relationships and finances are strained. Don\'t make major purchases, start new relationships, or force social harmony. Let beauty wait.',
  Mars:'Anger, accidents, and impulsive decisions threaten. Move your body, avoid confrontation, and don\'t send the email. The fire is destructive today.',
  Jupiter:'Overconfidence and excess are the traps. What looks like opportunity may be inflation. Don\'t overcommit, overspend, or overpromise.',
  Saturn:'The weight is heavy. Accept limitations rather than fighting them. Rest, reduce commitments, and do only what is truly load-bearing.',
  Uranus:'Instability is high and the disruption is not productive yet. Avoid making permanent decisions from a temporary state of chaos. Ground yourself and wait for the static to clear.',
  Neptune:'Confusion, deception, and escapism dominate. Do not sign anything, trust anyone new, or make decisions based on how you feel rather than what you know. Protect your clarity.',
  Pluto:'Power struggles, compulsions, and the weight of things that refuse to stay buried. Do not try to control what is beyond your grip. Surrender is not defeat — it is strategy.',
  Chiron:'The wound is raw today. Old inadequacies, rejections, or failures resurface with fresh sting. Do not make decisions from the pain. Rest, retreat, and remember that this passes.',
  NorthNode:'The path forward is obscured and old habits are louder than new directions. Do not force growth. Sometimes the most aligned thing you can do is rest until the compass recalibrates.'
};
const TONE_GENERIC_HIGH=['The energy supports bold action. Schedule important conversations, pitches, or creative work today.','This is a strong day to initiate. Move forward on things that matter.','Favorable conditions for making things happen. Aim for what matters.'];
const TONE_GENERIC_MID=['A mixed day — some support, some friction. Lead with your strengths.','Pick your battles today. Some efforts will flow, others will meet resistance.','Moderate energy. Focus on steady progress rather than breakthroughs.'];
const TONE_GENERIC_LOW=['A heavy day. Reduce commitments, protect your energy, and handle only what truly cannot wait.','Difficult energy. This is a day for damage control and self-care, not ambition.','Demanding transits are active. Move slowly and give yourself more margin than usual.'];

const ANNUAL_THEME={
  Aries:'A year of initiative — new starts, self-assertion, and confronting what you have been avoiding.',
  Taurus:'A year of consolidation — money, comfort, what you own, and what you value enough to hold.',
  Gemini:'A year of information — learning, communicating, short trips, siblings, curiosity as engine.',
  Cancer:'A year of roots — home, family, emotional foundations, what makes you feel secure.',
  Leo:'A year of expression — creativity, romance, children, pleasure, and the courage to be seen.',
  Virgo:'A year of refinement — health, routines, service, skill-building, and fixing what is broken.',
  Libra:'A year of relationship — partnerships, contracts, negotiation, the mirror of other people.',
  Scorpio:'A year of depth — shared resources, debts, transformation, sex, death, and what is hidden.',
  Sagittarius:'A year of expansion — travel, higher education, publishing, belief systems, reaching further.',
  Capricorn:'A year of structure — career, reputation, authority, ambition, and long-term commitments.',
  Aquarius:'A year of community — friends, networks, collective causes, and your vision for the future.',
  Pisces:'A year of dissolution — endings, rest, spirituality, surrender, and preparation for rebirth.'
};

const MONTH_THEME={
  Aries:'Self-assertion and new starts dominate this month. What you initiate now sets the tone. Act on what you want, not what others expect.',
  Taurus:'Material security and sensory pleasure are foregrounded. Attend to finances, possessions, and what you value enough to protect.',
  Gemini:'Communication, learning, and local movement pick up. Expect more conversations, errands, and information to process.',
  Cancer:'Home, family, and emotional roots surface. Domestic matters need attention. What makes you feel safe is the question.',
  Leo:'Creative expression, romance, and visibility. You need to be seen this month. Make things, play, take risks you enjoy.',
  Virgo:'Health, routines, and service. Fix what is broken, refine your systems, attend to the body. Craft over spectacle.',
  Libra:'Relationships and contracts. Other people are the main event. Negotiate, commit, or confront what is unbalanced.',
  Scorpio:'Shared resources, debts, power dynamics, and what is hidden. Go deeper. Transformation is available but not free.',
  Sagittarius:'Expansion through travel, education, publishing, or belief. Reach beyond your usual range. Faith and adventure.',
  Capricorn:'Career, reputation, and authority. What you build this month is visible and lasting. Ambition is appropriate.',
  Aquarius:'Community, friends, and collective vision. Your network matters more than your solo effort this month.',
  Pisces:'Rest, endings, spirituality, and the unseen. Let go of what has served its purpose. Prepare the ground for what comes next.'
};
