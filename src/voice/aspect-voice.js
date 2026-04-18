// ── aspect-voice.js ──
// Extracted from index.html — Phase 0 mechanical extraction.
// ASPECT_NATURE and NATAL_ASPECT_DEPTH constants.

const ASPECT_NATURE={
  'conjunction':{glyph:'☌',color:'var(--gold)',nature:'Fusion. The two planets blend into a single current — their themes cannot be separated. Powerful but sometimes lacks perspective.'},
  'opposition':{glyph:'☍',color:'var(--crimson)',nature:'Polarity. The two planets face each other across the chart — themes show up as tension, mirroring, or projection onto others, demanding integration.'},
  'trine':{glyph:'△',color:'var(--emerald)',nature:'Ease. The planets share an element and flow together freely — talent, often unconscious, can be taken for granted.'},
  'square':{glyph:'□',color:'var(--crimson)',nature:'Friction. The planets share modality but clash by element — tension that forces growth through crisis and effort.'},
  'sextile':{glyph:'⚹',color:'var(--emerald)',nature:'Opportunity. Planets in complementary elements — cooperation available if you reach for it, but not automatic.'},
  'quincunx':{glyph:'⚻',color:'var(--amber)',nature:'Adjustment. Planets in unrelated signs — themes never quite fit and require constant recalibration, often tied to health or habit.'},
  'semi-sextile':{glyph:'⚺',color:'var(--text2)',nature:'Subtle tension. Adjacent signs — quiet irritation or awkward transitions between themes.'}
};
const NATAL_ASPECT_DEPTH={
  'Sun-Moon|conjunction':'Inner life and outer identity fused — wholeness, but less inner dialogue. Born near a new moon.',
  'Sun-Moon|opposition':'Will and feeling pull against each other. Born near a full moon — a life of negotiating between what you want and what you need.',
  'Sun-Moon|square':'Tension between conscious direction and emotional nature. Family-of-origin patterns often replay until integrated.',
  'Sun-Moon|trine':'Ego and feeling cooperate. Rest comes easily; a settled core.',
  'Sun-Moon|sextile':'Purpose and emotion support each other when you act.',
  'Sun-Mercury|conjunction':'Identity and thought merge. Strong voice, but can over-identify with opinions.',
  'Sun-Venus|conjunction':'Love, art, and value fuse with identity — charm, vanity, or aesthetic sense as a life theme.',
  'Sun-Mars|conjunction':'Willpower amplified — drive, courage, or a chip on the shoulder. Cauldron of initiative.',
  'Sun-Mars|square':'Will clashes with drive. Anger and assertion must be trained rather than suppressed.',
  'Sun-Jupiter|trine':'Natural confidence, optimism, protection. Opportunities find you.',
  'Sun-Jupiter|square':'Overconfidence or overextension. Faith outpaces capacity until tempered.',
  'Sun-Saturn|conjunction':'Authority and self fused — heavy responsibility from early on, maturity accelerated, father-theme intense.',
  'Sun-Saturn|square':'Self-worth is tested. Achievement through discipline, but prone to self-doubt.',
  'Sun-Saturn|trine':'Quiet competence. Enduring structure. Good with long horizons.',
  'Sun-Saturn|opposition':'You measure yourself against external authority — until you become your own.',
  'Sun-Uranus|conjunction':'Lightning identity. Radically individual, prone to disruption of stable forms.',
  'Sun-Uranus|square':'Rebellion as reflex. Must learn to channel eccentricity productively.',
  'Sun-Neptune|conjunction':'Porous self. Artistic, mystical, but identity can dissolve in others\' fantasies.',
  'Sun-Neptune|square':'Confusion about who you are. Disillusionment as teacher.',
  'Sun-Pluto|conjunction':'Intense will, survivor\'s edge. Power dynamics are a core theme.',
  'Sun-Pluto|square':'Power struggles with authority, especially fathers. Transformation through crisis.',
  'Moon-Mercury|conjunction':'Feelings and thoughts fused — you think your way through moods, speak from the heart.',
  'Moon-Venus|trine':'Emotional warmth, aesthetic comfort, easy relating.',
  'Moon-Mars|square':'Quick temper, emotional volatility. Must learn to feel before reacting.',
  'Moon-Jupiter|trine':'Emotional abundance, faith, generosity. Protected instincts.',
  'Moon-Saturn|conjunction':'Emotional gravity. Mother-theme strict or absent. Feelings kept under discipline.',
  'Moon-Saturn|square':'Emotional loneliness until self-parented. Slow to trust, but steady once bonded.',
  'Moon-Uranus|square':'Emotional restlessness. Sudden mood shifts, fear of being tied down.',
  'Moon-Neptune|conjunction':'Dream-soaked feelings, psychic porousness, compassionate but prone to self-deception.',
  'Moon-Pluto|square':'Obsessive emotional undercurrents. Emotional crises as transformation.',
  'Mercury-Venus|conjunction':'Graceful speech, artistic thought, diplomatic voice.',
  'Mercury-Mars|conjunction':'Sharp mind, quick tongue, argumentative edge.',
  'Mercury-Jupiter|opposition':'Big ideas vs. detail. Teacher-student dynamic between local and far.',
  'Mercury-Saturn|conjunction':'Disciplined, serious mind. Slow but deep; prone to self-criticism about intellect.',
  'Mercury-Uranus|trine':'Quick, original mind. Insight arrives whole.',
  'Mercury-Neptune|square':'Confusion between imagination and fact. Must fact-check intuitions.',
  'Mercury-Pluto|conjunction':'Penetrating mind, research instinct, speaks hidden things.',
  'Venus-Mars|conjunction':'Desire and attraction fused — passionate, magnetic, sometimes volatile in love.',
  'Venus-Mars|square':'Love and desire pull different directions. Relationship tension as teacher.',
  'Venus-Mars|trine':'Attraction flows easily; creative and romantic currents cooperate.',
  'Venus-Jupiter|conjunction':'The great benefic — grace, generosity, aesthetic abundance.',
  'Venus-Saturn|conjunction':'Love tested by time and responsibility. Slow to open, loyal once committed.',
  'Venus-Saturn|square':'Feeling unworthy of love, or attracted to distant/older partners. Earned affection.',
  'Venus-Uranus|square':'Sudden attractions, unstable affections, freedom vs. intimacy.',
  'Venus-Neptune|conjunction':'Idealized love, artistic sensitivity, disillusionment cycles.',
  'Venus-Pluto|square':'Intense attachments, jealousy, transformative relationships.',
  'Mars-Jupiter|trine':'Action blessed with luck. Enthusiasm and courage.',
  'Mars-Saturn|conjunction':'Disciplined drive — blacksmith energy. Hard-won competence, frustration if blocked.',
  'Mars-Saturn|square':'Effort meets obstacle. Anger frozen or delayed. Forges resilience.',
  'Mars-Uranus|square':'Accident-prone or electric action. Sudden moves, impatience.',
  'Mars-Neptune|square':'Drive clouded by confusion. Misplaced anger, or effort that dissolves.',
  'Mars-Pluto|conjunction':'Volcanic drive, survivor\'s force, intensity in anything pursued.',
  'Jupiter-Saturn|conjunction':'The great chronocrator — structure meets expansion. Ambition built carefully. A generational signature.',
  'Jupiter-Saturn|opposition':'Faith vs. fear, growth vs. limit. Lifetime teacher-aspect.',
  'Jupiter-Uranus|trine':'Sudden breakthroughs, lucky timing with innovation.',
  'Jupiter-Neptune|conjunction':'Mystical faith, visionary but prone to inflation.',
  'Jupiter-Pluto|square':'Outsized ambition, hunger for power or meaning.',
  'Saturn-Uranus|square':'Tradition vs. revolution. Breaking and rebuilding as life-theme.',
  'Saturn-Neptune|square':'Structure dissolves under doubt. Faith tested by reality.',
  'Saturn-Pluto|conjunction':'Heavy generational weight, endurance forged through loss.',
  'Uranus-Neptune|sextile':'Generational: spiritual innovation, visionary technology.',
  'Uranus-Pluto|square':'Generational: revolution, systemic upheaval. 1960s/2010s.',
  'Sun-Ascendant|conjunction':'Identity matches presentation. What you are shows.',
  'Moon-Ascendant|conjunction':'Feeling shows on the surface. Emotionally transparent body.',
  'Mars-Ascendant|conjunction':'Assertive presence, athletic bearing, scar on the face common.',
  'Saturn-Ascendant|conjunction':'Serious appearance, aged early, gravitas.',
  'Sun-MC|conjunction':'Vocation aligned with identity. Publicly visible life.',
  'Saturn-MC|conjunction':'Career-defining authority, slow-climbing ambition.',

  // ── Mercury aspects ──────────────────────────────────────────────
  // Mercury-Venus (conjunction already exists)
  'Mercury-Venus|square':'Mercury and Venus never separate far enough to square in a natal chart — this aspect does not occur.',
  'Mercury-Venus|trine':'Mercury and Venus never separate far enough to trine in a natal chart — this aspect does not occur.',
  'Mercury-Venus|sextile':'Elegant communication, social intelligence. You write, speak, or negotiate with natural grace.',
  'Mercury-Venus|opposition':'Mercury and Venus never separate far enough to oppose in a natal chart — this aspect does not occur.',

  // Mercury-Mars
  // conjunction already exists
  'Mercury-Mars|opposition':'Your mind argues with your instincts. Debate sharpens thought, but you may speak before thinking and regret it.',
  'Mercury-Mars|square':'Mental tension drives you to fight for ideas. Sharp polemicist, but words can wound when frustration overflows.',
  'Mercury-Mars|trine':'Quick-witted and decisive. Thought flows into action without hesitation — good strategist, skilled debater.',
  'Mercury-Mars|sextile':'Mental agility supports your ambitions when you apply it. Persuasive when you care enough to engage.',

  // Mercury-Jupiter
  // opposition already exists
  'Mercury-Jupiter|conjunction':'A large mind — philosophical, pedagogical, sometimes verbose. You think in systems and teach instinctively.',
  'Mercury-Jupiter|square':'Ideas outpace evidence. Grandiose thinking or over-promising; wisdom comes through intellectual humility.',
  'Mercury-Jupiter|trine':'Natural comprehension of broad patterns. Publishing, teaching, or law come easily. Optimistic intellect.',
  'Mercury-Jupiter|sextile':'Opportunities arrive through learning and communication. Travel or foreign ideas expand your worldview when pursued.',

  // Mercury-Saturn
  // conjunction already exists
  'Mercury-Saturn|opposition':'Your thinking is challenged by external authority or hard reality. Rigor develops through friction with the world.',
  'Mercury-Saturn|square':'Self-doubt about intelligence. Slow, careful speech that masks a deeply structured mind. Overcoming mental blocks builds mastery.',
  'Mercury-Saturn|trine':'Methodical thinker, reliable analyst. You handle complexity patiently and communicate with earned authority.',
  'Mercury-Saturn|sextile':'Discipline supports learning when applied. Practical intelligence that improves with age and experience.',

  // Mercury-Uranus
  // trine already exists
  'Mercury-Uranus|conjunction':'Lightning mind — eccentric, inventive, restless. Ideas arrive as sudden downloads; boredom is your enemy.',
  'Mercury-Uranus|opposition':'Your thinking is disrupted by others\' radical viewpoints. Brilliance emerges through integrating opposing perspectives.',
  'Mercury-Uranus|square':'Mental restlessness, scattered genius. Nervous system runs hot. Must learn to finish what the flash of insight begins.',
  'Mercury-Uranus|sextile':'Original thinking available when you reach for it. Technology and unconventional methods sharpen your communication.',

  // Mercury-Neptune
  // square already exists
  'Mercury-Neptune|conjunction':'Poetic mind, intuitive thinker. Words carry feeling and image but can blur truth. Natural storyteller or medium.',
  'Mercury-Neptune|opposition':'Others project illusions onto your ideas, or you lose clarity in relationship dialogue. Discernment must be practiced.',
  'Mercury-Neptune|trine':'Imagination enriches thought effortlessly. Music, poetry, and spiritual concepts come naturally to your mind.',
  'Mercury-Neptune|sextile':'Intuition supports intellect when invited. Creative writing, counseling, or meditative practices sharpen perception.',

  // Mercury-Pluto
  // conjunction already exists
  'Mercury-Pluto|opposition':'Others\' secrets or manipulations provoke your investigative mind. Power struggles play out through words and information.',
  'Mercury-Pluto|square':'Obsessive thinking, mental intensity. You probe beneath surfaces compulsively — paranoia possible, but also genuine depth.',
  'Mercury-Pluto|trine':'Natural detective. You read hidden motives effortlessly and communicate with quiet, persuasive power.',
  'Mercury-Pluto|sextile':'Research and depth-psychology available as tools when needed. Strategic communication comes naturally in crisis.',

  // ── Venus aspects ────────────────────────────────────────────────
  // Venus-Jupiter
  // conjunction already exists
  'Venus-Jupiter|opposition':'Generosity and indulgence pull against each other. Love is large but must learn limits and reciprocity.',
  'Venus-Jupiter|square':'Excess in pleasure, spending, or romantic idealism. The good life must be earned, not assumed.',
  'Venus-Jupiter|trine':'Grace, abundance, social warmth. Gifts come easily — art, hospitality, good fortune in love.',
  'Venus-Jupiter|sextile':'Social opportunities and cultural enrichment available through effort. Generosity repaid when genuine.',

  // Venus-Saturn
  // conjunction and square already exist
  'Venus-Saturn|opposition':'Love tested by distance, duty, or age difference. Relationships mature through endurance and honest reckoning.',
  'Venus-Saturn|trine':'Loyal, enduring affection. You value substance over sparkle and build lasting bonds. Aesthetic taste refined by time.',
  'Venus-Saturn|sextile':'Practical approach to love and money yields steady returns. Commitment grows when responsibility is shared.',

  // Venus-Uranus
  // square already exists
  'Venus-Uranus|conjunction':'Love electrified — you crave freedom in relationship and are drawn to the unconventional. Sudden attractions and departures.',
  'Venus-Uranus|opposition':'Partners embody your unlived freedom. Relationships break and reform until you integrate independence with intimacy.',
  'Venus-Uranus|trine':'Easy originality in love and art. You attract unusual people and enjoy non-traditional arrangements naturally.',
  'Venus-Uranus|sextile':'Creative experimentation in relationships and aesthetics available when pursued. Open-mindedness enriches your bonds.',

  // Venus-Neptune
  // conjunction already exists
  'Venus-Neptune|opposition':'You project ideal love onto partners who cannot sustain it. Disillusionment teaches you to love what is real.',
  'Venus-Neptune|square':'Romantic fog — you fall in love with potential rather than people. Artistic sensitivity is high but boundaries are low.',
  'Venus-Neptune|trine':'Refined aesthetic sense, compassionate heart. Art, music, or spiritual devotion flow through your relationships.',
  'Venus-Neptune|sextile':'Imagination enriches love when grounded. Creative or spiritual practice deepens your capacity for connection.',

  // Venus-Pluto
  // square already exists
  'Venus-Pluto|conjunction':'Love is all-or-nothing. Magnetic intensity in relationships; possessiveness and jealousy must be transformed into depth.',
  'Venus-Pluto|opposition':'Partners activate your deepest desires and fears. Power dynamics in love demand conscious reckoning.',
  'Venus-Pluto|trine':'Deep, transformative love comes naturally. You bond at the soul level and are drawn to hidden beauty.',
  'Venus-Pluto|sextile':'Emotional depth available in relationships when you risk vulnerability. Regeneration through intimacy.',

  // ── Mars aspects ─────────────────────────────────────────────────
  // Mars-Jupiter
  // trine already exists
  'Mars-Jupiter|conjunction':'Crusader energy — bold, righteous action. Great physical vitality but must guard against overreach and zealotry.',
  'Mars-Jupiter|opposition':'Action clashes with belief. Overextension in pursuits until you learn when to fight and when to have faith.',
  'Mars-Jupiter|square':'Reckless confidence, jumping before looking. Competitive excess tempered by hard experience. Channel into sport or adventure.',
  'Mars-Jupiter|sextile':'Initiative supported by good timing and optimism when you act. Physical effort rewarded with expansion.',

  // Mars-Saturn
  // conjunction and square already exist
  'Mars-Saturn|opposition':'Drive meets external blockage. Frustration with authority figures or institutions forges eventual self-mastery.',
  'Mars-Saturn|trine':'Disciplined effort, controlled strength. Endurance athlete energy — you pace yourself and outlast opponents.',
  'Mars-Saturn|sextile':'Strategic patience available when needed. Hard work pays off in structured environments.',

  // Mars-Uranus
  // square already exists
  'Mars-Uranus|conjunction':'Explosive initiative, sudden action, accident-prone courage. You start revolutions and break molds — physically restless.',
  'Mars-Uranus|opposition':'Others\' unpredictability triggers your combativeness. Learning to respond rather than react is the lifelong work.',
  'Mars-Uranus|trine':'Quick reflexes, inventive action. You thrive in emergencies and innovate under pressure without losing your nerve.',
  'Mars-Uranus|sextile':'Unconventional methods support your goals when you experiment. Technology or reform channels your drive productively.',

  // Mars-Neptune
  // square already exists
  'Mars-Neptune|conjunction':'The spiritual warrior — action infused with vision, but motivation can dissolve into fantasy or escapism.',
  'Mars-Neptune|opposition':'Your drive is undermined by others\' confusion or deception. Clear intention must be cultivated against passive drift.',
  'Mars-Neptune|trine':'Inspired action, artistic athleticism. Dance, martial arts, or healing work channel your drive beautifully.',
  'Mars-Neptune|sextile':'Imagination fuels initiative when directed. Creative or charitable action satisfies your need to do something meaningful.',

  // Mars-Pluto
  // conjunction already exists
  'Mars-Pluto|opposition':'Power projected onto adversaries. Intense confrontations force you to own your own ruthlessness and transform it.',
  'Mars-Pluto|square':'Volcanic rage, compulsive drive. Power struggles are constant until you learn to wield force without domination.',
  'Mars-Pluto|trine':'Relentless willpower, strategic instinct. You regenerate through intense effort and thrive where others burn out.',
  'Mars-Pluto|sextile':'Deep reserves of strength available in crisis. Investigative or surgical precision supports your ambitions.',

  // ── Jupiter-Saturn ───────────────────────────────────────────────
  // conjunction and opposition already exist
  'Jupiter-Saturn|square':'Growth and contraction at war. Ambition frustrated by caution, or faith undercut by doubt — resolution through perseverance.',
  'Jupiter-Saturn|trine':'Measured expansion — you build large things patiently. Business sense, institutional wisdom, realistic optimism.',
  'Jupiter-Saturn|sextile':'Opportunities for structured growth when pursued with discipline. Planning and faith cooperate productively.',

  // ── Jupiter-Uranus ───────────────────────────────────────────────
  // trine already exists
  'Jupiter-Uranus|conjunction':'Sudden expansion, radical faith. You break philosophical molds and attract unexpected windfalls — restless idealism.',
  'Jupiter-Uranus|opposition':'Freedom and belief pull apart. Others embody the revolution you haven\'t claimed. Integration yields visionary leadership.',
  'Jupiter-Uranus|square':'Restless rebellion against convention. Over-the-top independence or dogmatic contrarianism until channeled into reform.',
  'Jupiter-Uranus|sextile':'Innovation and opportunity link when you take unconventional risks. Technology or progressive causes expand your horizon.',

  // ── Jupiter-Neptune ──────────────────────────────────────────────
  // conjunction already exists
  'Jupiter-Neptune|opposition':'Grand visions confront harsh reality through others. Spiritual inflation deflated by experience — wisdom follows.',
  'Jupiter-Neptune|square':'Boundless idealism without grounding. Spiritual bypassing or utopian thinking must be tempered by discernment.',
  'Jupiter-Neptune|trine':'Effortless faith, compassionate worldview. Artistic or spiritual gifts flow naturally — guard against complacency.',
  'Jupiter-Neptune|sextile':'Spiritual growth available through deliberate practice. Charitable or creative work enriches your philosophy.',

  // ── Jupiter-Pluto ────────────────────────────────────────────────
  // square already exists
  'Jupiter-Pluto|conjunction':'Enormous ambition, wealth-building instinct. Power and meaning fuse — potential for plutocracy or profound transformation.',
  'Jupiter-Pluto|opposition':'Your expansive vision is confronted by others\' power. Learning to grow without dominating or being dominated.',
  'Jupiter-Pluto|trine':'Natural capacity for influence and regeneration. Wealth, power, or deep knowledge accumulate without overt struggle.',
  'Jupiter-Pluto|sextile':'Strategic opportunities for empowerment when seized. Research, finance, or psychology channels your growth.',

  // ── Saturn-Uranus ────────────────────────────────────────────────
  // square already exists
  'Saturn-Uranus|conjunction':'Old and new fuse — you embody the tension between tradition and revolution. Disciplined innovation, or rigid rebellion.',
  'Saturn-Uranus|opposition':'Structure and freedom polarize through external events. Institutions crack when liberation is overdue — you feel both sides.',
  'Saturn-Uranus|trine':'Practical innovation. You reform systems from within and stabilize change without losing momentum.',
  'Saturn-Uranus|sextile':'Opportunities to modernize tradition when you act. Technology serves structure, discipline serves freedom.',

  // ── Saturn-Neptune ───────────────────────────────────────────────
  // square already exists
  'Saturn-Neptune|conjunction':'Dreams crystallized or crushed. You give form to the intangible — spiritual discipline, or disillusionment hardened into cynicism.',
  'Saturn-Neptune|opposition':'Material reality and spiritual longing face off. Institutions dissolve, faith is tested by hardship — integration is the task.',
  'Saturn-Neptune|trine':'Practical mysticism. You ground spiritual insight in real-world service — quiet, effective compassion.',
  'Saturn-Neptune|sextile':'Discipline supports spiritual practice when maintained. Structured imagination produces lasting creative or healing work.',

  // ── Saturn-Pluto ─────────────────────────────────────────────────
  // conjunction already exists
  'Saturn-Pluto|opposition':'Structural power confronts existential destruction. You live through systemic collapse and rebuilding — endurance is demanded.',
  'Saturn-Pluto|square':'Crushing pressure from authority or fate. Power hardened under extreme constraint — you break or become unbreakable.',
  'Saturn-Pluto|trine':'Deep endurance, strategic authority. You wield power patiently and survive what would destroy others.',
  'Saturn-Pluto|sextile':'Opportunities for transformation through disciplined effort. Crisis management and long-term restructuring are your forte.',

  // ── Outer planet generational aspects ─────────────────────────────
  'Uranus-Neptune|conjunction':'Generational: the dissolution and reinvention of collective imagination. Born in the early 1990s — spiritual and technological boundaries blur.',
  // Uranus-Neptune sextile already exists
  // Uranus-Pluto square already exists
  'Uranus-Pluto|conjunction':'Generational: radical collective transformation. Born in the 1960s — revolution, liberation, and upheaval coded into the psyche.',
  'Neptune-Pluto|sextile':'Generational: a centuries-long sextile binding spiritual evolution to collective transformation. Background hum of deep, slow change.',

  // ── Sun additional aspects ───────────────────────────────────────
  'Sun-Mars|opposition':'Your will is challenged by aggressive others, or you project your own combativeness. Courage comes through confrontation.',
  'Sun-Mars|trine':'Vitality, confidence, natural leadership. Energy and identity cooperate — you act on who you are without friction.',
  'Sun-Mars|sextile':'Initiative supports your purpose when you reach for it. Physical activity and healthy competition energize your identity.',
  'Sun-Jupiter|conjunction':'Solar king — large personality, generous spirit, natural faith. Over-identification with luck or entitlement is the shadow.',
  'Sun-Jupiter|opposition':'Others embody the optimism or excess you deny in yourself. Faith tested by projection, then integrated.',
  'Sun-Jupiter|sextile':'Opportunities align with purpose when you act on them. Quiet confidence and good timing.',
  'Sun-Saturn|sextile':'Discipline available to support your goals. Steady maturation, practical self-knowledge.',
  'Sun-Uranus|opposition':'Others\' rebellion mirrors your own unlived freedom. Relationships catalyze individuation.',
  'Sun-Uranus|trine':'Effortless originality. You are naturally yourself without needing to rebel — independence as a gift, not a fight.',
  'Sun-Uranus|sextile':'Opportunities for innovation when you step outside convention. Individuality expressed through chosen channels.',
  'Sun-Neptune|opposition':'Others embody your fantasies or illusions. Codependency and idealization teach you to see clearly.',
  'Sun-Neptune|trine':'Artistic, empathic, quietly spiritual. Imagination enriches identity without dissolving it.',
  'Sun-Neptune|sextile':'Creative and spiritual gifts available when cultivated. Subtle perception supports your path.',
  'Sun-Pluto|opposition':'Power struggles with others reveal your own depth. Transformation through intense one-on-one encounters.',
  'Sun-Pluto|trine':'Quiet intensity, natural authority. You regenerate through crisis and emerge stronger each time.',
  'Sun-Pluto|sextile':'Psychological insight available when you engage your depth. Strategic self-transformation.',

  // ── Moon additional aspects ──────────────────────────────────────
  'Moon-Mercury|opposition':'Feelings and thoughts pull apart. Over-rationalizing emotions or drowning logic in mood — balance is the work.',
  'Moon-Mercury|square':'Emotional reasoning clashes with objective thought. Nervous habits or anxious inner dialogue until integrated.',
  'Moon-Mercury|trine':'Feelings inform thought naturally. Emotionally intelligent communication and a good memory.',
  'Moon-Mercury|sextile':'Emotional awareness supports communication when you pay attention. Journaling or talk therapy comes naturally.',
  'Moon-Venus|conjunction':'Emotional warmth fused with aesthetic sense. Deep need for comfort, beauty, and harmonious relating.',
  'Moon-Venus|opposition':'Emotional needs and relational desires pull apart. What you need privately and what you attract publicly must be reconciled.',
  'Moon-Venus|square':'Comfort and love at cross-purposes. Emotional eating, spending, or settling for affection rather than facing the deeper need.',
  'Moon-Venus|sextile':'Emotional and social intelligence cooperate when engaged. Pleasing domestic environments, easy hospitality.',
  'Moon-Mars|conjunction':'Emotions and action fused — reactive, passionate, protective. Quick to anger, quick to defend those you love.',
  'Moon-Mars|opposition':'Feelings and impulses at war. Anger projected onto intimate partners until emotional assertiveness is owned.',
  'Moon-Mars|trine':'Emotional courage, instinctive action. You protect what matters and act on feelings without hesitation.',
  'Moon-Mars|sextile':'Emotional energy supports initiative when channeled. Healthy assertiveness in domestic or personal matters.',
  'Moon-Jupiter|conjunction':'Emotional abundance, faith as feeling. Generous instincts, sometimes excess in comfort-seeking or emotional inflation.',
  'Moon-Jupiter|opposition':'Inner abundance confronts outer expectation. Emotional generosity must learn boundaries.',
  'Moon-Jupiter|square':'Emotional excess — too much feeling, too much comfort, too much hope. Learning emotional proportion is the task.',
  'Moon-Jupiter|sextile':'Emotional optimism available when cultivated. Good instincts for opportunity, nourishing generosity.',
  'Moon-Saturn|opposition':'Emotional coldness projected or received. Mother-authority figures test your emotional autonomy — maturity is the reward.',
  'Moon-Saturn|trine':'Emotional steadiness, quiet resilience. You manage feelings with dignity and offer grounded support to others.',
  'Moon-Saturn|sextile':'Emotional discipline available when needed. Practical nurturing, reliable instincts.',
  'Moon-Uranus|conjunction':'Emotionally volatile, fiercely independent. Sudden mood shifts and an allergy to domestic routine.',
  'Moon-Uranus|opposition':'Others\' unpredictability shakes your emotional foundation. Freedom and security must be consciously balanced.',
  'Moon-Uranus|trine':'Emotionally liberated — you process feelings quickly and adapt to change without losing your center.',
  'Moon-Uranus|sextile':'Emotional flexibility available when embraced. Novel domestic arrangements or unconventional nurturing styles work for you.',
  'Moon-Neptune|opposition':'Others absorb or reflect your emotional confusion. Codependent patterns dissolve only through radical self-honesty.',
  'Moon-Neptune|square':'Emotional fog, boundary dissolution. Deep compassion but prone to absorbing others\' pain as your own.',
  'Moon-Neptune|trine':'Psychic sensitivity, compassionate instincts. Dreams are vivid and meaningful; artistic feeling flows naturally.',
  'Moon-Neptune|sextile':'Intuitive gifts available when cultivated through stillness. Gentle emotional perception, subtle empathy.',
  'Moon-Pluto|conjunction':'Emotional intensity at the core. Primal feelings — jealousy, grief, passion — run deep. Transformative relationship with the mother.',
  'Moon-Pluto|opposition':'Others trigger your deepest emotional material. Power struggles in intimate life demand psychological honesty.',
  'Moon-Pluto|trine':'Emotional depth and resilience come naturally. You process intense feeling without being destroyed and offer profound support.',
  'Moon-Pluto|sextile':'Emotional transformation available through inner work. Psychological insight strengthens your instincts.',

  // ── Chiron aspects ───────────────────────────────────────────────
  'Chiron-Sun|conjunction':'Identity fused with a core wound. Your sense of self is shaped by early pain — healing yourself becomes your visible purpose.',
  'Chiron-Sun|opposition':'Others mirror your deepest wound back to you. Healing comes through relationship and accepting the help you give so freely to others.',
  'Chiron-Sun|square':'Who you are and where you hurt are in friction. Achievement is shadowed by inadequacy until you stop performing wholeness and allow the crack.',
  'Chiron-Sun|trine':'Your wound becomes your gift without excessive struggle. Teaching, healing, or mentoring flows from lived experience.',
  'Chiron-Sun|sextile':'Opportunities to heal through self-expression when you choose vulnerability over armor.',
  'Chiron-Moon|conjunction':'Emotional body carries a primal wound — abandonment, neglect, or early sorrow. Nurturing others heals you, but you must also receive care.',
  'Chiron-Moon|opposition':'Intimate others touch your oldest hurt. Emotional healing happens through bonds that refuse to let you hide.',
  'Chiron-Moon|square':'Emotional needs and old pain clash. Caretaking others at your own expense, or rejecting comfort to avoid vulnerability.',
  'Chiron-Moon|trine':'Instinctive healer — your emotional wounds have composted into compassion. You create safety for others naturally.',
  'Chiron-Moon|sextile':'Emotional healing available through deliberate self-care and allowing others to witness your vulnerability.',
  'Chiron-Venus|conjunction':'Love itself is the wound and the medicine. Attraction pulls you toward what hurts — and through it, toward wholeness.',
  'Chiron-Venus|square':'Desire and old pain collide. Relationships repeat wounding patterns until you stop choosing from the wound and start choosing from worth.',
  'Chiron-Venus|opposition':'Partners expose the place where you feel unlovable. Healing comes when you let someone stay after they have seen the scar.',
  'Chiron-Venus|trine':'Your experience of heartbreak has given you a rare tenderness. You love with depth because you know what it costs, and others feel safe in your care.',
  'Chiron-Venus|sextile':'Opportunities for healing arrive through art, beauty, or gentle connection when you allow yourself to receive pleasure without guilt.',

  // Mercury-Chiron
  'Chiron-Mercury|conjunction':'Mind and wound are fused — you may have been silenced early or told your thoughts were wrong. Your voice becomes medicine once you trust it.',
  'Chiron-Mercury|opposition':'Others challenge or dismiss your ideas in ways that reopen old intellectual wounds. Teaching what once hurt you to learn is the path to integration.',
  'Chiron-Mercury|square':'Painful friction between what you know and how you communicate it. Words fail at the worst moments until you stop performing intelligence and speak from honest uncertainty.',
  'Chiron-Mercury|trine':'Your mind naturally translates suffering into understanding. Writing, counseling, or teaching flows from wounds you have already composted into insight.',
  'Chiron-Mercury|sextile':'Healing through language is available when you choose it. Naming what hurts — in conversation, in writing — releases its hold on you.',

  // Mars-Chiron
  'Chiron-Mars|conjunction':'Your drive is tangled with a core wound around assertion, anger, or masculinity. Action itself can feel dangerous until you reclaim your right to fight for yourself.',
  'Chiron-Mars|opposition':'Others\' aggression or competitiveness reopens a wound around your own power. Healing comes when you stop retreating and stand your ground without becoming what hurt you.',
  'Chiron-Mars|square':'Anger and old pain collide — you either overcompensate with force or collapse into passivity. Learning to act from wholeness rather than woundedness is the lifelong work.',
  'Chiron-Mars|trine':'Your experience of struggle has given you a warrior\'s compassion. You defend the vulnerable instinctively because you remember what it felt like to be undefended.',
  'Chiron-Mars|sextile':'Healing is available through physical effort, competition, or courageous action when you channel your drive deliberately rather than reactively.',

  // Jupiter-Chiron
  'Chiron-Jupiter|conjunction':'Faith and wound are fused. Your search for meaning is driven by early encounters with suffering — you become a teacher or healer precisely because you needed one.',
  'Chiron-Jupiter|opposition':'Others\' certainty or abundance highlights your own crisis of faith. Wisdom arrives when you stop looking for answers outside and trust the knowledge your pain has given you.',
  'Chiron-Jupiter|square':'Belief and woundedness clash. Overcompensating with forced optimism or collapsing into cynicism are both traps — genuine hope is earned through honest reckoning with loss.',
  'Chiron-Jupiter|trine':'Your wounds have naturally deepened into philosophy. You offer perspective that only someone who has suffered and found meaning can provide.',
  'Chiron-Jupiter|sextile':'Opportunities for healing arrive through travel, study, or encounters with foreign perspectives when you remain open to growth beyond your comfort zone.',

  // Saturn-Chiron
  'Chiron-Saturn|conjunction':'Authority and woundedness are fused. You carry heavy responsibility around your pain — healing feels like a duty, and you may become the mentor you never had.',
  'Chiron-Saturn|opposition':'External structures or authority figures press on your deepest wound. Mastery comes when you stop seeking permission to heal and build your own framework for wholeness.',
  'Chiron-Saturn|square':'Discipline and old pain grind against each other. You may work relentlessly to prove the wound wrong, or freeze under its weight — real healing requires patience with yourself.',
  'Chiron-Saturn|trine':'Time and experience have quietly alchemized your suffering into competence. You carry your wound with dignity and offer others the steady ground they need to heal.',
  'Chiron-Saturn|sextile':'Healing through structure, discipline, and slow commitment is available when you build routines that honor both your limitations and your resilience.',

  // ── NorthNode aspects ────────────────────────────────────────────
  // Chiron-NorthNode
  'Chiron-NorthNode|conjunction':'Your wound is your destiny. The place where you hurt most is precisely where your evolutionary path leads — healing becomes your life direction.',
  'Chiron-NorthNode|opposition':'Your wound pulls you back toward familiar comfort while your growth demands you move forward. Releasing the identity built around old pain opens the path ahead.',
  'Chiron-NorthNode|square':'Healing and growth are in friction. Old pain resists the direction your soul needs to travel, and you must tend the wound without letting it steer your course.',
  'Chiron-NorthNode|trine':'Your wound naturally feeds your evolution. Experiences of suffering have already prepared you for the path ahead, and mentoring others accelerates your own growth.',
  'Chiron-NorthNode|sextile':'Opportunities for growth arrive through healing work when you choose to engage. Teaching from your scars moves you toward your destined direction.',

  // Jupiter-NorthNode
  'Jupiter-NorthNode|conjunction':'Faith and destiny converge. Your evolutionary direction is supported by expansive optimism, and following your growth edge brings abundance and meaning.',
  'Jupiter-NorthNode|opposition':'Comfortable beliefs and inherited philosophies pull you away from your true path. Growth requires releasing the worldview you outgrew and trusting unfamiliar territory.',
  'Jupiter-NorthNode|square':'Your faith and your destiny are at cross-purposes. Overconfidence or dogmatic conviction delays growth until you learn to believe in the direction that frightens you.',
  'Jupiter-NorthNode|trine':'Natural luck supports your evolutionary path. Opportunities, teachers, and expansive experiences arrive easily when you move toward your destined direction.',
  'Jupiter-NorthNode|sextile':'Growth through learning, travel, or philosophical exploration is available when you actively pursue your evolutionary direction rather than waiting for signs.',

  // Mars-NorthNode
  'Mars-NorthNode|conjunction':'Your drive and destiny are fused. Bold, decisive action propels you toward your evolutionary path, and courage is the primary virtue required for your growth.',
  'Mars-NorthNode|opposition':'Familiar patterns of assertion and aggression pull you backward. Your growth demands a different relationship with anger, competition, and personal will.',
  'Mars-NorthNode|square':'Action and destiny clash. Impulsive moves derail your evolutionary path until you learn to fight for what truly matters rather than what merely provokes you.',
  'Mars-NorthNode|trine':'Initiative naturally supports your growth direction. Physical courage and willingness to act carry you toward your destiny without excessive struggle.',
  'Mars-NorthNode|sextile':'Deliberate effort and healthy assertiveness advance your evolutionary path when you channel your drive toward the unfamiliar rather than the comfortable.',

  // Mercury-NorthNode
  'Mercury-NorthNode|conjunction':'Your mind is pointed toward your destiny. The way you think, speak, and learn is central to your evolutionary direction, and following your curiosity is the path.',
  'Mercury-NorthNode|opposition':'Familiar mental habits and comfortable ideas pull you away from growth. Your evolution requires new ways of thinking, communicating, and processing information.',
  'Mercury-NorthNode|square':'Thought patterns and evolutionary direction grind against each other. Overthinking or clinging to what you already know delays the growth your soul requires.',
  'Mercury-NorthNode|trine':'Your intellect naturally serves your destiny. Learning, writing, and communication carry you toward your evolutionary direction with relative ease.',
  'Mercury-NorthNode|sextile':'Opportunities for growth arrive through conversations, study, or new information when you actively engage your mind with unfamiliar subjects.',

  // Moon-NorthNode
  'Moon-NorthNode|conjunction':'Your emotional instincts are aligned with your destiny. Following what you feel rather than what you know leads you toward your evolutionary direction.',
  'Moon-NorthNode|opposition':'Emotional comfort and familiar security pull you away from growth. Your evolution demands that you leave the nest — literally or figuratively — and risk vulnerability in new territory.',
  'Moon-NorthNode|square':'Emotional needs and evolutionary direction are in tension. Clinging to what feels safe delays the growth your soul demands, and you must learn to nurture yourself through change.',
  'Moon-NorthNode|trine':'Your instincts naturally support your growth direction. Emotional intelligence and receptivity carry you toward your destiny without forcing the process.',
  'Moon-NorthNode|sextile':'Growth arrives through emotional openness and caring connection when you choose to feel rather than defend. Vulnerability in the right direction moves you forward.',

  // Neptune-NorthNode
  'Neptune-NorthNode|conjunction':'Your destiny is woven with the transcendent. Spiritual surrender, artistic vision, or compassionate service defines your evolutionary path, though fog may obscure the way.',
  'Neptune-NorthNode|opposition':'Familiar illusions, escapism, or spiritual comfort pull you back from growth. Your evolution requires discernment — learning to dream forward rather than dissolving backward.',
  'Neptune-NorthNode|square':'Imagination and destiny are at odds. Confusion, idealization, or escapism cloud your growth direction until you ground your vision in committed, real-world effort.',
  'Neptune-NorthNode|trine':'Spiritual sensitivity and creative intuition naturally support your evolutionary path. Trusting the unseen and following subtle inner guidance moves you toward your destiny.',
  'Neptune-NorthNode|sextile':'Growth through contemplative practice, artistic work, or compassionate service is available when you deliberately open to the numinous rather than waiting for revelation.',

  // NorthNode-Pluto
  'NorthNode-Pluto|conjunction':'Your destiny demands total transformation. The evolutionary path leads through death-and-rebirth experiences, and surrendering control is the price of growth.',
  'NorthNode-Pluto|opposition':'Deep psychological patterns and power dynamics pull you away from your growth direction. Evolution requires releasing what you grip most tightly.',
  'NorthNode-Pluto|square':'Compulsive intensity and your evolutionary path clash. Power struggles or obsessive attachments derail growth until you learn to transform rather than control.',
  'NorthNode-Pluto|trine':'Deep regenerative power naturally supports your destiny. You shed old selves with relative ease and move toward your evolutionary direction through profound inner work.',
  'NorthNode-Pluto|sextile':'Transformative experiences advance your growth when you engage them willingly. Psychological depth and willingness to face darkness serve your evolutionary path.',

  // NorthNode-Saturn
  'NorthNode-Saturn|conjunction':'Your destiny is bound to discipline and responsibility. The evolutionary path demands maturity, structure, and willingness to carry weight others set down.',
  'NorthNode-Saturn|opposition':'Familiar duties and rigid structures pull you away from growth. Your evolution requires releasing the authority you hide behind and building a new framework from honest ground.',
  'NorthNode-Saturn|square':'Duty and destiny grind against each other. Fear, caution, or excessive responsibility delays your evolutionary direction until you learn which burdens to carry and which to set down.',
  'NorthNode-Saturn|trine':'Discipline and patience naturally support your growth path. Time is your ally, and steady commitment moves you toward your destiny without drama.',
  'NorthNode-Saturn|sextile':'Structured effort and practical planning advance your evolutionary direction when applied deliberately. Maturity gained through experience serves your destined path.',

  // NorthNode-Sun
  'NorthNode-Sun|conjunction':'Your core identity aligns with your destiny. Being fully yourself — not performing, not hiding — is the evolutionary direction. The path and the person are one.',
  'NorthNode-Sun|opposition':'Familiar self-expression and ego habits pull you back from growth. Your evolution demands that you become someone new rather than polishing who you already are.',
  'NorthNode-Sun|square':'Identity and destiny are in friction. Who you think you are conflicts with who you are becoming, and the ego must bend toward the soul rather than the reverse.',
  'NorthNode-Sun|trine':'Your sense of purpose naturally supports your evolutionary path. Confidence and self-expression carry you toward your destiny with creative momentum.',
  'NorthNode-Sun|sextile':'Growth arrives through self-expression and creative leadership when you step forward deliberately. Aligning your will with your destiny requires conscious choice.',

  // NorthNode-Uranus
  'NorthNode-Uranus|conjunction':'Your destiny is radical individuation. The evolutionary path demands that you break from convention and follow the most authentic, unpredictable version of yourself.',
  'NorthNode-Uranus|opposition':'Familiar rebellions or fixed ideologies pull you backward. Your growth requires a new kind of freedom — not reaction against the past, but genuine originality moving forward.',
  'NorthNode-Uranus|square':'Liberation and destiny clash. Erratic independence or stubborn attachment to outdated revolutions delays your growth until you channel disruption toward your true direction.',
  'NorthNode-Uranus|trine':'Innovation and originality naturally support your evolutionary path. Sudden insights, technological fluency, or unconventional choices carry you toward your destiny.',
  'NorthNode-Uranus|sextile':'Growth through experimentation and progressive thinking is available when you deliberately step outside the familiar. Embracing change advances your evolutionary path.',

  // NorthNode-Venus
  'NorthNode-Venus|conjunction':'Your destiny runs through love, beauty, and relationship. The evolutionary path asks you to value connection, pleasure, and harmony as sacred directions rather than distractions.',
  'NorthNode-Venus|opposition':'Comfortable relational patterns and aesthetic habits pull you away from growth. Your evolution requires a new understanding of what and whom you truly value.',
  'NorthNode-Venus|square':'Desire and destiny are in tension. Clinging to old attachments or settling for shallow pleasure delays the growth your soul requires in matters of love and worth.',
  'NorthNode-Venus|trine':'Grace and relational ease naturally support your evolutionary direction. Love, art, and beauty carry you toward your destiny with gentle momentum.',
  'NorthNode-Venus|sextile':'Growth through relationship, creative expression, or deepening your values is available when you reach for connection rather than retreating into self-sufficiency.',

  // ── Ascendant natal aspects ──────────────────────────────────────
  // Ascendant-Sun (conjunction exists as Sun-Ascendant)
  'Ascendant-Sun|opposition':'You project an image that contradicts your core self. Others meet your mask before your substance, and learning to unify the two is a lifelong task.',
  'Ascendant-Sun|trine':'Your appearance and identity cooperate naturally. People perceive you accurately, and you move through the world with an easy self-consistency.',
  'Ascendant-Sun|square':'How you come across clashes with who you actually are. First impressions mislead, and you must work to align outer presentation with inner truth.',
  'Ascendant-Sun|sextile':'Your persona supports your purpose when you consciously cultivate it. Small adjustments in self-presentation unlock recognition you deserve.',

  // Ascendant-Moon (conjunction exists as Moon-Ascendant)
  'Ascendant-Moon|opposition':'Your emotional nature is projected onto others rather than worn openly. Partners mirror your feelings back to you before you recognize them yourself.',
  'Ascendant-Moon|trine':'Feelings and appearance harmonize naturally. Your emotional state reads clearly on your face, and people trust your sincerity instinctively.',
  'Ascendant-Moon|square':'Inner moods clash with outer composure. You appear calm when upset or seem distressed when content, creating misunderstandings until you learn emotional transparency.',
  'Ascendant-Moon|sextile':'Emotional intelligence supports your public presence when you let it. Showing feeling at the right moment builds trust and warmth with others.',

  // Ascendant-Mars (conjunction exists as Mars-Ascendant)
  'Ascendant-Mars|opposition':'You attract combative people or project aggression you do not own. Others challenge you physically or energetically until you claim your own assertiveness.',
  'Ascendant-Mars|trine':'Physical vitality and personal style cooperate. You come across as energetic, direct, and capable without trying, and your body serves your will naturally.',
  'Ascendant-Mars|square':'Your drive and your image are at odds. You may appear more aggressive than you intend, or suppress your initiative to seem agreeable, neither of which serves you.',
  'Ascendant-Mars|sextile':'Assertiveness enhances your presentation when you deploy it deliberately. Physical confidence supports the impression you make in competitive settings.',

  // Ascendant-Mercury
  'Ascendant-Mercury|conjunction':'Your mind and your appearance are fused. You come across as quick, curious, and youthful, and people associate you with your words and ideas above all else.',
  'Ascendant-Mercury|opposition':'Others carry the intellectual energy you do not express outwardly. Partnerships sharpen your thinking and teach you to communicate what your persona conceals.',
  'Ascendant-Mercury|trine':'Speech and presence cooperate effortlessly. You articulate yourself clearly, and your manner puts people at ease in conversation.',
  'Ascendant-Mercury|square':'How you think and how you appear are in tension. Nervous energy shows physically, or your words contradict the image you project, until you integrate mind and mask.',
  'Ascendant-Mercury|sextile':'Communication skills support your public image when consciously applied. Writing, speaking, or teaching enhances how others perceive you.',

  // Ascendant-Venus
  'Ascendant-Venus|conjunction':'Beauty, charm, and grace are woven into your physical presence. You attract others effortlessly and are identified with aesthetic sensibility and social warmth.',
  'Ascendant-Venus|opposition':'You project charm onto partners or attract beauty you do not claim as your own. Relationships teach you to embody the grace you admire in others.',
  'Ascendant-Venus|trine':'Natural attractiveness and social ease flow through your appearance without effort. People find you pleasant, and harmonious environments form around you.',
  'Ascendant-Venus|square':'Your desire for approval clashes with your authentic presentation. You may over-accommodate or hide behind aesthetics until you learn that real charm comes from honesty.',
  'Ascendant-Venus|sextile':'Social grace enhances your image when you engage it deliberately. Small gestures of warmth and attention to appearance open doors for you.',

  // Ascendant-Jupiter
  'Ascendant-Jupiter|conjunction':'You come across as expansive, optimistic, and larger than life. Your physical presence takes up space, and people expect generosity and wisdom from you on sight.',
  'Ascendant-Jupiter|opposition':'Others embody the confidence or excess you do not display. Partnerships expand your worldview and teach you to project your own faith outward.',
  'Ascendant-Jupiter|trine':'Natural buoyancy in your appearance and manner. You seem fortunate, approachable, and wise, and opportunities arrive partly because people trust your bearing.',
  'Ascendant-Jupiter|square':'Your presentation overshoots or overpromises. You may appear more confident than you feel, or your expansiveness overwhelms smaller settings, until you learn proportion.',
  'Ascendant-Jupiter|sextile':'Optimism and breadth of vision enhance your public image when you lean into them. Travel, education, or philosophy visibly shape how others perceive you.',

  // Ascendant-Saturn (conjunction exists as Saturn-Ascendant)
  'Ascendant-Saturn|opposition':'Authority figures or institutions mirror back the discipline you have not claimed. Others impose structure on you until you embody your own gravitas.',
  'Ascendant-Saturn|trine':'Quiet dignity and competence mark your appearance. People take you seriously from the start, and your bearing conveys reliability without heaviness.',
  'Ascendant-Saturn|square':'Your image and your sense of duty are at odds. You may appear rigid or burdened, or compensate by hiding your seriousness behind a lighter mask.',
  'Ascendant-Saturn|sextile':'Discipline and maturity support your presentation when you allow them. A composed, professional image opens doors in hierarchical settings.',

  // Ascendant-Neptune
  'Ascendant-Neptune|conjunction':'Your appearance is elusive, glamorous, or hard to pin down. Others project their fantasies onto you, and your physical presence carries a dreamlike, chameleon quality.',
  'Ascendant-Neptune|opposition':'Partners dissolve the boundaries of your self-image. You lose yourself in others until you learn to maintain your own outline while remaining compassionate.',
  'Ascendant-Neptune|trine':'A gentle, artistic aura surrounds you without effort. People sense your sensitivity and imaginative nature, and you move through the world with a quiet ethereal grace.',
  'Ascendant-Neptune|square':'Your image is clouded by confusion or others\' projections. You may be chronically misread or struggle to present yourself clearly until you ground your persona in honesty.',
  'Ascendant-Neptune|sextile':'Imaginative and spiritual qualities enhance your presence when you cultivate them. Artistic self-expression or compassionate visibility serves you well.',

  // Ascendant-Uranus
  'Ascendant-Uranus|conjunction':'Your appearance signals rebellion, eccentricity, or radical individuality. People notice you immediately, and you cannot blend in even when you try.',
  'Ascendant-Uranus|opposition':'Others embody the freedom or disruption you do not express outwardly. Relationships jolt you into authenticity and force you to stop performing normalcy.',
  'Ascendant-Uranus|trine':'Originality flows through your appearance and manner effortlessly. You come across as independent and inventive without needing to provoke, and people find your uniqueness refreshing.',
  'Ascendant-Uranus|square':'Your need for individuality clashes with how the world receives you. Sudden changes in appearance or approach to life reflect inner restlessness until you integrate freedom with stability.',
  'Ascendant-Uranus|sextile':'Unconventional self-presentation works in your favor when you embrace it. Technological or progressive leanings visibly shape the impression you make.',

  // Ascendant-Pluto
  'Ascendant-Pluto|conjunction':'Intensity radiates from your physical presence. Others sense your depth and power immediately, and you cannot enter a room without shifting its atmosphere.',
  'Ascendant-Pluto|opposition':'Partners or adversaries activate your deepest survival instincts. Power dynamics in one-on-one encounters force you to transform how you present yourself to the world.',
  'Ascendant-Pluto|trine':'Magnetic presence and personal power flow naturally through your bearing. You command attention without demanding it, and people sense your resilience instinctively.',
  'Ascendant-Pluto|square':'Your intensity and your image are in conflict. You may intimidate without meaning to, or suppress your power to seem approachable, until you own your depth openly.',
  'Ascendant-Pluto|sextile':'Transformative energy enhances your public presence when you channel it. Reinventing your appearance or approach to life at key moments serves your evolution.',

  // Ascendant-Chiron
  'Ascendant-Chiron|conjunction':'Your wound is visible in your appearance or first impression. Others see your vulnerability before you speak, and your presence itself becomes a form of healing for those who recognize their own pain in you.',
  'Ascendant-Chiron|opposition':'Partners or close others expose the wound you carry in your self-image. Healing comes through relationships that refuse to let you hide behind your mask.',
  'Ascendant-Chiron|trine':'Your wound has become part of your natural presentation in a way that invites trust. People sense your lived experience and feel safe approaching you.',
  'Ascendant-Chiron|square':'How you appear and where you hurt are in friction. You may overcompensate in your presentation or withdraw from visibility until you accept that your scar is also your signature.',
  'Ascendant-Chiron|sextile':'Healing becomes visible in your self-presentation when you allow it. Showing your journey openly rather than hiding it earns you genuine respect.',

  // Ascendant-NorthNode
  'Ascendant-NorthNode|conjunction':'Your appearance and manner are aligned with your soul\'s evolutionary direction. Showing up authentically in the world is itself the path of growth.',
  'Ascendant-NorthNode|opposition':'Your comfort zone in self-presentation holds you back from your destined growth. Partnerships push you toward a truer way of meeting the world.',
  'Ascendant-NorthNode|trine':'Your natural style of engaging with life supports your evolutionary path. The persona you project aligns with where your soul is heading without forcing it.',
  'Ascendant-NorthNode|square':'Your habitual approach to life and your growth direction are at cross-purposes. Adjusting how you present yourself to the world is necessary for fulfilling your deeper potential.',
  'Ascendant-NorthNode|sextile':'Opportunities for growth arrive through shifts in self-presentation when you are willing to step outside your familiar image.',

  // ── MC (Midheaven) natal aspects ─────────────────────────────────
  // Chiron-MC (C < M)
  'Chiron-MC|conjunction':'Your wound is visible in your public life and career. Professional identity is shaped by early pain, and your vocation becomes a form of healing for yourself and others.',
  'Chiron-MC|opposition':'Private wounds interfere with public ambitions. Career crises force you to confront the pain you carry, and healing transforms your professional direction.',
  'Chiron-MC|trine':'Your experience of suffering has quietly shaped your professional competence. The public recognizes your hard-won wisdom, and your career benefits from authenticity.',
  'Chiron-MC|square':'Where you hurt and what you do publicly are in friction. Career setbacks reopen old wounds until you stop trying to prove yourself and start working from wholeness.',
  'Chiron-MC|sextile':'Healing becomes part of your professional identity when you allow it. Sharing your experience of overcoming difficulty publicly earns respect and opens vocational doors.',

  // Jupiter-MC (J < M)
  'Jupiter-MC|conjunction':'Your career carries a larger-than-life quality. Public reputation involves teaching, travel, philosophy, or expansion, and you are known for your broad vision.',
  'Jupiter-MC|opposition':'Faith and career ambition pull against each other. Your public role is tested by questions of meaning, and professional growth requires philosophical grounding.',
  'Jupiter-MC|trine':'Optimism and good fortune support your public life naturally. Opportunities in career arrive through generosity, education, or cultural breadth.',
  'Jupiter-MC|square':'Overexpansion or overconfidence threatens your reputation. Professional life demands you temper big vision with realistic planning and follow-through.',
  'Jupiter-MC|sextile':'Opportunities for career growth arrive through education, travel, or broadening your horizons when you actively pursue them.',

  // Mars-MC (Mars < MC)
  'Mars-MC|conjunction':'Drive and ambition define your public identity. You are known for energy, competitiveness, and initiative, and your career demands decisive action.',
  'Mars-MC|opposition':'Your assertive nature and your public role are in tension. Career advancement requires channeling combative energy into strategic professional action.',
  'Mars-MC|trine':'Physical energy and ambition support your career naturally. You act decisively in professional life, and your reputation benefits from your courage and initiative.',
  'Mars-MC|square':'Aggression or impatience disrupts your public standing. Professional life demands you learn to channel drive without creating unnecessary conflict.',
  'Mars-MC|sextile':'Assertiveness supports your career when applied strategically. Taking initiative at the right moment in professional settings advances your reputation.',

  // MC-Mercury
  'MC-Mercury|conjunction':'Communication defines your public role. You are known for your ideas, voice, or intellectual output, and your reputation is built on what you say and write.',
  'MC-Mercury|opposition':'Your thinking and your career direction pull apart. Professional life demands you integrate private intellectual life with public communication.',
  'MC-Mercury|trine':'Your mind and your career cooperate naturally. Ideas flow into professional achievement, and you are recognized for clarity, wit, or expertise.',
  'MC-Mercury|square':'How you think and what your career demands are in tension. Professional communication requires conscious refinement, and intellectual restlessness can scatter your public focus.',
  'MC-Mercury|sextile':'Communication skills support your career when you invest in them. Speaking, writing, or teaching in your professional sphere raises your public standing.',

  // MC-Moon
  'MC-Moon|conjunction':'Your emotional nature is on public display. Career and reputation are tied to nurturing, intuition, or domestic themes, and the public sees your feelings clearly.',
  'MC-Moon|opposition':'Private emotional needs and public responsibilities pull against each other. Home and career demand equal attention, and neglecting either creates crisis.',
  'MC-Moon|trine':'Emotional instincts support your public life naturally. Your career benefits from your ability to read people, and the public responds to your warmth.',
  'MC-Moon|square':'Inner feelings disrupt professional composure, or career demands override emotional needs. Integrating private vulnerability with public authority is the work.',
  'MC-Moon|sextile':'Emotional intelligence enhances your reputation when you apply it. Showing genuine care in professional settings builds lasting trust and loyalty.',

  // MC-Neptune
  'MC-Neptune|conjunction':'Your public image is glamorous, elusive, or idealized. Career involves imagination, spirituality, or service, and the world may not see you clearly.',
  'MC-Neptune|opposition':'Professional life is clouded by confusion or unrealistic expectations. Career clarity comes only after stripping away illusions about what success means to you.',
  'MC-Neptune|trine':'Imagination and vision enrich your career naturally. You are drawn to creative, healing, or spiritual vocations, and your public image carries an inspiring quality.',
  'MC-Neptune|square':'Career direction dissolves under shifting ideals or deception. Professional confusion persists until you commit to a vocation grounded in genuine service rather than fantasy.',
  'MC-Neptune|sextile':'Creative vision and spiritual sensitivity support your public role when you channel them deliberately. Artistic or charitable work enhances your reputation.',

  // MC-NorthNode
  'MC-NorthNode|conjunction':'Your career path is aligned with your soul\'s evolutionary direction. Public life and vocation serve your deepest growth, and professional achievement carries karmic weight.',
  'MC-NorthNode|opposition':'Your comfort zone pulls you away from your destined public role. Growth requires releasing attachment to private security and stepping into professional visibility.',
  'MC-NorthNode|trine':'Your natural career trajectory supports your evolutionary path. Professional choices align with deeper purpose without requiring dramatic sacrifice.',
  'MC-NorthNode|square':'Your habitual professional patterns and your soul\'s growth direction are at cross-purposes. Career changes that feel uncomfortable are often exactly what your development requires.',
  'MC-NorthNode|sextile':'Opportunities for growth arrive through career shifts when you are willing to pursue vocational directions that stretch beyond your familiar professional identity.',

  // MC-Pluto
  'MC-Pluto|conjunction':'Power and intensity define your public life. You are known for depth, transformation, or control, and your career involves encounters with hidden forces.',
  'MC-Pluto|opposition':'Power struggles shape your professional life. Career crises force transformation of your public identity, and you must learn to wield authority without being consumed by it.',
  'MC-Pluto|trine':'Transformative power flows through your career naturally. You rise through crisis, and your public reputation is strengthened by your capacity to regenerate.',
  'MC-Pluto|square':'Obsessive ambition or power conflicts disrupt your public life. Career demands you confront your relationship with control and learn to transform rather than dominate.',
  'MC-Pluto|sextile':'Strategic depth and psychological insight support your career when you apply them. Professional reinvention at critical moments strengthens your public standing.',

  // MC-Saturn (conjunction exists as Saturn-MC)
  'MC-Saturn|opposition':'Career ambition is tested by structural obstacles or authority figures. Professional mastery is earned slowly through perseverance and honest self-assessment.',
  'MC-Saturn|trine':'Discipline and endurance support your public role naturally. Your career benefits from patience, and your reputation grows steadily over time through consistent effort.',
  'MC-Saturn|square':'Professional life feels burdened by excessive responsibility or blocked by authority. Career breakthroughs come only after you stop resenting the weight and learn to carry it wisely.',
  'MC-Saturn|sextile':'Structured effort supports your career when you commit to it. Professional discipline and long-term planning yield slow but lasting results.',

  // MC-Sun (conjunction exists as Sun-MC)
  'MC-Sun|opposition':'Your public role and your private identity pull in opposite directions. Career fulfillment requires reconciling what the world demands with who you actually are.',
  'MC-Sun|trine':'Your identity and your public direction cooperate naturally. Career and life purpose feel aligned, and recognition comes without excessive striving.',
  'MC-Sun|square':'Who you are clashes with what you are expected to become publicly. Professional life requires conscious effort to honor both ambition and authenticity.',
  'MC-Sun|sextile':'Your sense of self supports your career path when you act on it. Small moves toward authentic self-expression in public life yield disproportionate rewards.',

  // MC-Uranus
  'MC-Uranus|conjunction':'Your public identity is marked by sudden changes, innovation, or rebellion. Career path is unconventional, and you are known for disrupting the status quo.',
  'MC-Uranus|opposition':'Your need for professional freedom clashes with private stability. Career disruptions force you to reinvent your public role until you find a path that honors your independence.',
  'MC-Uranus|trine':'Originality and innovation enhance your career naturally. You thrive in unconventional professional roles, and sudden opportunities advance your public standing.',
  'MC-Uranus|square':'Restlessness or sudden upheavals destabilize your career. Professional life demands you channel your need for freedom into innovation rather than mere disruption.',
  'MC-Uranus|sextile':'Unconventional approaches support your career when you dare to use them. Technology, reform, or progressive ideas enhance your professional reputation.',

  // MC-Venus
  'MC-Venus|conjunction':'Beauty, art, or social grace define your public identity. You are known for aesthetic sensibility or relational skill, and your career involves creating harmony.',
  'MC-Venus|opposition':'Personal values and public expectations are at odds. Career satisfaction requires aligning what you love with what the world rewards you for.',
  'MC-Venus|trine':'Charm and aesthetic sense naturally enhance your reputation. Your career benefits from your taste, diplomacy, and ability to make things beautiful or pleasant.',
  'MC-Venus|square':'What you value and what advances your career pull in different directions. Professional life demands you reconcile personal desires with public duty.',
  'MC-Venus|sextile':'Social grace and creative sensibility support your public image when you cultivate them. Small acts of beauty or diplomacy in your career yield significant goodwill.'
};
