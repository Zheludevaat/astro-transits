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
  'Sun-Chiron|conjunction':'Identity fused with a core wound. Your sense of self is shaped by early pain — healing yourself becomes your visible purpose.',
  'Sun-Chiron|opposition':'Others mirror your deepest wound back to you. Healing comes through relationship and accepting the help you give so freely to others.',
  'Sun-Chiron|square':'Who you are and where you hurt are in friction. Achievement is shadowed by inadequacy until you stop performing wholeness and allow the crack.',
  'Sun-Chiron|trine':'Your wound becomes your gift without excessive struggle. Teaching, healing, or mentoring flows from lived experience.',
  'Sun-Chiron|sextile':'Opportunities to heal through self-expression when you choose vulnerability over armor.',
  'Moon-Chiron|conjunction':'Emotional body carries a primal wound — abandonment, neglect, or early sorrow. Nurturing others heals you, but you must also receive care.',
  'Moon-Chiron|opposition':'Intimate others touch your oldest hurt. Emotional healing happens through bonds that refuse to let you hide.',
  'Moon-Chiron|square':'Emotional needs and old pain clash. Caretaking others at your own expense, or rejecting comfort to avoid vulnerability.',
  'Moon-Chiron|trine':'Instinctive healer — your emotional wounds have composted into compassion. You create safety for others naturally.',
  'Moon-Chiron|sextile':'Emotional healing available through deliberate self-care and allowing others to witness your vulnerability.',
  'Venus-Chiron|conjunction':'Love itself is the wound and the medicine. Attraction pulls you toward what hurts — and through it, toward wholeness.',
  'Venus-Chiron|square':'Desire and old pain collide. Relationships repeat wounding patterns until you stop choosing from the wound and start choosing from worth.',
  'Venus-Chiron|opposition':'Partners expose the place where you feel unlovable. Healing comes when you let someone stay after they have seen the scar.',
  'Venus-Chiron|trine':'Your experience of heartbreak has given you a rare tenderness. You love with depth because you know what it costs, and others feel safe in your care.',
  'Venus-Chiron|sextile':'Opportunities for healing arrive through art, beauty, or gentle connection when you allow yourself to receive pleasure without guilt.',

  // Mercury-Chiron
  'Mercury-Chiron|conjunction':'Mind and wound are fused — you may have been silenced early or told your thoughts were wrong. Your voice becomes medicine once you trust it.',
  'Mercury-Chiron|opposition':'Others challenge or dismiss your ideas in ways that reopen old intellectual wounds. Teaching what once hurt you to learn is the path to integration.',
  'Mercury-Chiron|square':'Painful friction between what you know and how you communicate it. Words fail at the worst moments until you stop performing intelligence and speak from honest uncertainty.',
  'Mercury-Chiron|trine':'Your mind naturally translates suffering into understanding. Writing, counseling, or teaching flows from wounds you have already composted into insight.',
  'Mercury-Chiron|sextile':'Healing through language is available when you choose it. Naming what hurts — in conversation, in writing — releases its hold on you.',

  // Mars-Chiron
  'Mars-Chiron|conjunction':'Your drive is tangled with a core wound around assertion, anger, or masculinity. Action itself can feel dangerous until you reclaim your right to fight for yourself.',
  'Mars-Chiron|opposition':'Others\' aggression or competitiveness reopens a wound around your own power. Healing comes when you stop retreating and stand your ground without becoming what hurt you.',
  'Mars-Chiron|square':'Anger and old pain collide — you either overcompensate with force or collapse into passivity. Learning to act from wholeness rather than woundedness is the lifelong work.',
  'Mars-Chiron|trine':'Your experience of struggle has given you a warrior\'s compassion. You defend the vulnerable instinctively because you remember what it felt like to be undefended.',
  'Mars-Chiron|sextile':'Healing is available through physical effort, competition, or courageous action when you channel your drive deliberately rather than reactively.',

  // Jupiter-Chiron
  'Jupiter-Chiron|conjunction':'Faith and wound are fused. Your search for meaning is driven by early encounters with suffering — you become a teacher or healer precisely because you needed one.',
  'Jupiter-Chiron|opposition':'Others\' certainty or abundance highlights your own crisis of faith. Wisdom arrives when you stop looking for answers outside and trust the knowledge your pain has given you.',
  'Jupiter-Chiron|square':'Belief and woundedness clash. Overcompensating with forced optimism or collapsing into cynicism are both traps — genuine hope is earned through honest reckoning with loss.',
  'Jupiter-Chiron|trine':'Your wounds have naturally deepened into philosophy. You offer perspective that only someone who has suffered and found meaning can provide.',
  'Jupiter-Chiron|sextile':'Opportunities for healing arrive through travel, study, or encounters with foreign perspectives when you remain open to growth beyond your comfort zone.',

  // Saturn-Chiron
  'Saturn-Chiron|conjunction':'Authority and woundedness are fused. You carry heavy responsibility around your pain — healing feels like a duty, and you may become the mentor you never had.',
  'Saturn-Chiron|opposition':'External structures or authority figures press on your deepest wound. Mastery comes when you stop seeking permission to heal and build your own framework for wholeness.',
  'Saturn-Chiron|square':'Discipline and old pain grind against each other. You may work relentlessly to prove the wound wrong, or freeze under its weight — real healing requires patience with yourself.',
  'Saturn-Chiron|trine':'Time and experience have quietly alchemized your suffering into competence. You carry your wound with dignity and offer others the steady ground they need to heal.',
  'Saturn-Chiron|sextile':'Healing through structure, discipline, and slow commitment is available when you build routines that honor both your limitations and your resilience.'
};
