// ── synastry-voice.js ──
// Extracted from index.html — Phase 0 mechanical extraction.
// SYNASTRY_VOICE constant.

const SYNASTRY_VOICE = {
  // Sun aspects
  'Sun-Sun|conjunction': {
    feel: 'A natural sense of sameness and mutual understanding of each other\'s core identity.',
    detail: 'You recognize yourselves in each other, sharing similar life purposes and essential natures. This creates ease in understanding each other\'s motivations and goals, though there\'s also potential for rivalry over dominance. Your combined presence is notably strong.'
  },
  'Sun-Sun|opposition': {
    feel: 'Opposite expressions of purpose that either polarize or perfectly complement.',
    detail: 'You approach life from fundamentally different angles, which can create friction or perfect balance depending on intention. The challenge is to appreciate rather than oppose each other\'s styles. This aspect often indicates growth through accepting differences.',
    counsel: 'Practice curiosity over judgment. When your partner\'s approach baffles you, ask "help me understand why this matters to you." Oppositions work best when each person takes turns leading in their area of strength.'
  },
  'Sun-Sun|trine': {
    feel: 'Effortless mutual respect and admiration of each other\'s way of being.',
    detail: 'You naturally support each other\'s individual expression and growth. There\'s a harmonious recognition of each other\'s strengths that makes partnership feel natural and fulfilling. This is one of the easiest placements for genuine collaboration.'
  },
  'Sun-Sun|square': {
    feel: 'Competitive tension that either motivates or frustrates both partners.',
    detail: 'You challenge each other\'s sense of self, which can either spur growth or create friction. The key is channeling this competitive energy constructively. Together you accomplish more than either would alone, but cooperation doesn\'t come naturally.',
    counsel: 'Name the competition when you notice it. Say "I think we\'re competing right now" — it defuses the charge. Find arenas where you can be on the same team: a shared project, a game, a cause you both care about. Channel the friction into fuel.'
  },
  'Sun-Sun|sextile': {
    feel: 'You bring out a better version of each other without even trying very hard.',
    detail: 'You genuinely admire the way the other person moves through the world, and that admiration is specific — not generic cheerleading but real recognition of what makes each of you distinct. Together you take on slightly bolder projects and pursue goals with more confidence than either of you musters alone. The dynamic is collaborative rather than competitive, and both people tend to feel more fully themselves in the relationship.'
  },

  // Sun-Moon
  'Sun-Moon|conjunction': {
    feel: 'Deep emotional and psychological attunement; you feel understood at a fundamental level.',
    detail: 'This is one of the most significant synastry contacts. One person\'s conscious identity (Sun) illuminates the other\'s emotional depths (Moon), creating profound mutual understanding. The Moon person feels seen and valued; the Sun person gains emotional richness. This creates a karmic bond and strong sense of destiny together.'
  },
  'Sun-Moon|opposition': {
    feel: 'Opposing emotional and personal styles that create tension and fascination.',
    detail: 'The Sun person\'s way of being triggers the Moon person\'s deepest emotional reactions. This can manifest as attraction to someone who both attracts and unsettles you. The dynamic demands maturity to appreciate opposites rather than demand sameness.',
    counsel: 'Recognize that the fascination and the friction have the same source. The Moon person should avoid making the Sun person responsible for their emotional security. The Sun person should resist dismissing the Moon person\'s reactions as irrational.'
  },
  'Sun-Moon|trine': {
    feel: 'Easy emotional understanding; the Moon person naturally feels safe with the Sun person.',
    detail: 'This aspect creates genuine emotional compatibility. The Sun person\'s warmth makes the Moon person feel secure and understood. Emotional needs are naturally met, and both partners feel genuinely supported. This is one of the most harmonious aspects for long-term partnership.'
  },
  'Sun-Moon|square': {
    feel: 'Emotional friction that challenges both partners to grow emotionally and psychologically.',
    detail: 'The Sun person may feel emotionally misunderstood or overwhelmed by the Moon person\'s reactions. The Moon person struggles with the Sun person\'s apparent emotional detachment. This aspect requires conscious emotional communication and the willingness to meet each other halfway.',
    counsel: 'When emotions rise, pause before reacting. The Moon person needs to feel heard before problem-solving begins; the Sun person needs space to process without being labeled cold. A daily check-in of "how are you really feeling?" can bridge this gap over time.'
  },
  'Sun-Moon|sextile': {
    feel: 'You understand each other\'s rhythm — when to talk, when to be quiet, when to push and when to let it go.',
    detail: 'The Sun person makes the Moon person feel safe enough to be emotional without performing strength, and the Moon person gives the Sun person a soft place to land without making them feel babied. You read each other\'s needs with a low-effort accuracy that makes daily life together remarkably smooth. The slight difference in your natures keeps things interesting; the underlying compatibility keeps things stable.'
  },

  // Venus-Mars
  'Venus-Mars|conjunction': {
    feel: 'Immediate sexual and romantic attraction; raw desire and affection mingle.',
    detail: 'This is one of the most potent synastry contacts for passion and chemistry. The Venus person finds the Mars person deeply attractive, while the Mars person is powerfully drawn to pursue. Sexual passion runs high, but lasting partnership requires moving beyond pure chemistry to deeper commitment.'
  },
  'Venus-Mars|opposition': {
    feel: 'Magnetic attraction that can become volatile; desire meets resistance.',
    detail: 'The Venus-Mars opposition creates intense fascination and sexual tension, but the dynamics can become adversarial. The Mars person may pursue too aggressively while the Venus person withdraws. The aspect demands mutual respect and clear communication about desires and boundaries.',
    counsel: 'The Mars person should practice slowing down and asking rather than pursuing. The Venus person should practice saying what they want directly instead of withdrawing. Scheduled time for both intimacy and independence helps balance the push-pull.'
  },
  'Venus-Mars|trine': {
    feel: 'Harmonious blend of passion and affection; desire expressed with tenderness.',
    detail: 'This aspect creates genuine sexual and romantic compatibility. Passion flows naturally without aggression, and affection is expressed in mutually satisfying ways. Both partners feel desired and appreciated. This aspect supports both passion and lasting commitment.'
  },
  'Venus-Mars|square': {
    feel: 'Sexual frustration or mismatch in desire; passion and affection clash.',
    detail: 'One partner\'s desire doesn\'t align with the other\'s sense of how affection should be expressed. This can create either ongoing frustration or exciting challenge, depending on how the couple approaches it. Sexual compatibility requires conscious negotiation.',
    counsel: 'Talk about desire outside the bedroom, when there is no pressure. Learn each other\'s love languages — what feels like pursuit to one person may feel like pressure to the other. The square demands creative compromise, not surrender.'
  },
  'Venus-Mars|sextile': {
    feel: 'You flirt well together — the chemistry is playful rather than overwhelming.',
    detail: 'The Mars person pursues with just enough heat to make the Venus person feel desired without being pressured, and Venus responds with a warmth that keeps Mars engaged without having to escalate. You touch casually. You tease each other in ways that land right. The sexual energy between you stays alive because neither person has to perform intensity — it emerges naturally through small, specific gestures of desire and affection.'
  },

  // Mercury-Mercury
  'Mercury-Mercury|conjunction': {
    feel: 'Perfect mental attunement; you finish each other\'s sentences and think alike.',
    detail: 'This creates excellent communication and shared intellectual interests. You understand each other\'s thinking without explanation, which makes conversation effortless. The risk is that you can become too much alike mentally, missing the stimulation of different perspectives.'
  },
  'Mercury-Mercury|opposition': {
    feel: 'Different thinking styles that either complement or create constant debate.',
    detail: 'You approach problems, communication, and learning from opposite angles. This can create stimulating discussion or unending argument depending on how you handle differences. The key is valuing how each person\'s mind works rather than insisting on agreement.',
    counsel: 'Establish a "debate vs. discussion" signal. Before a conversation, agree whether you are trying to decide something or just sharing perspectives. Many Mercury-opposition arguments happen because one person is brainstorming while the other is problem-solving.'
  },
  'Mercury-Mercury|trine': {
    feel: 'Easy intellectual rapport and compatible communication styles.',
    detail: 'Conversation flows naturally, and you understand each other\'s communication preferences. Intellectual interests align easily, and you support each other\'s learning and growth. This aspect creates a partnership where ideas flow freely and collaboration is easy.'
  },
  'Mercury-Mercury|square': {
    feel: 'Misunderstandings and communication friction despite good intentions.',
    detail: 'You tend to talk past each other or have different priorities in what\'s important to discuss. This requires conscious effort to hear and be heard. The friction can push both partners to communicate more clearly and intentionally.',
    counsel: 'Repeat back what you heard before responding. "So what you\'re saying is..." prevents the most common Mercury-square misfire. Write important things down when speaking fails — sometimes a text or note lands better than talking for this aspect.'
  },
  'Mercury-Mercury|sextile': {
    feel: 'Talking to each other is one of the best parts of the relationship.',
    detail: 'You do not think identically, but your different angles on things make conversations richer rather than frustrating. One person notices what the other missed. You recommend each other books, articles, and ideas with a hit rate that stays high over the years. Daily debriefs, long car rides, and lazy Sunday mornings talking in bed are where this bond does its best work.'
  },

  // Jupiter-Jupiter
  'Jupiter-Jupiter|conjunction': {
    feel: 'Mutual expansion and a shared sense of possibility and good fortune.',
    detail: 'Together you believe in bigger possibilities and tend to attract luck and opportunity. This can create wonderful expansion, but also financial or other overindulgence if not monitored. The partnership amplifies both people\'s natural optimism and generosity.'
  },
  'Jupiter-Jupiter|opposition': {
    feel: 'Competing visions of expansion that can either create balance or excess.',
    detail: 'You each have different ideas about growth and expansion. If you honor each other\'s vision, this creates comprehensive life planning; if not, it can mean constant disagreement about direction and values.'
  },
  'Jupiter-Jupiter|trine': {
    feel: 'Shared vision and natural alignment in values and life direction.',
    detail: 'You naturally want the same things in life and support each other\'s growth and expansion. This aspect creates genuine partnership where both people flourish. Together you achieve more than either would alone.'
  },
  'Jupiter-Jupiter|square': {
    feel: 'Different values or approaches to growth that create tension and negotiation.',
    detail: 'You each have strong opinions about what makes life good and how to succeed. This can push both partners to clarify their true values, or it can create ongoing friction about priorities and direction.'
  },
  'Jupiter-Jupiter|sextile': {
    feel: 'You make each other more generous and more adventurous than you would be apart.',
    detail: 'Together you take trips neither of you would plan alone, sign up for classes that stretch you, and say yes to invitations you might otherwise decline. Both people tend to feel that the relationship has genuinely expanded their world. You share a relaxed optimism that does not need to be forced — things simply tend to go a little better when you are together.'
  },

  // Saturn-Saturn
  'Saturn-Saturn|conjunction': {
    feel: 'Mutual commitment to responsibility and shared understanding of duty.',
    detail: 'You both take partnership seriously and are willing to do the work required for lasting commitment. Together you build something substantial and enduring. The potential shadow is taking each other too seriously or becoming overly formal.'
  },
  'Saturn-Saturn|opposition': {
    feel: 'Opposing approaches to commitment that demand mutual negotiation.',
    detail: 'You each have different ideas about responsibility, time, and what\'s required in partnership. This can create either balanced perspectives or constant tension about obligations and restrictions.'
  },
  'Saturn-Saturn|trine': {
    feel: 'Easy alignment on commitment and shared values around stability and responsibility.',
    detail: 'You naturally understand each other\'s need for structure and commitment. Partnership feels grounded and secure. Together you build something lasting and meaningful without the weight of forced obligation.'
  },
  'Saturn-Saturn|square': {
    feel: 'Karmic tension around commitment, responsibility, and control.',
    detail: 'You challenge each other\'s approach to duty and obligation — one person\'s discipline reads as rigidity to the other, and one person\'s flexibility reads as carelessness. The friction sharpens both approaches until you each adopt what actually works from the other\'s system.'
  },
  'Saturn-Saturn|sextile': {
    feel: 'You agree on the basics — what constitutes a promise, what hard work looks like, what counts as showing up.',
    detail: 'Neither person has to explain why reliability matters or why commitments should be kept. You share a quiet understanding of what a real partnership requires, and you both invest the effort without keeping score. The relationship feels solid without feeling heavy, and both people tend to become more competent and more organized together than they were apart.'
  },

  // Venus-Venus
  'Venus-Venus|conjunction': {
    feel: 'Compatible values and aesthetics; you like the same things.',
    detail: 'Your sense of beauty, values, and what makes life pleasant are nearly identical. This creates ease in lifestyle choices and financial decisions. The risk is becoming too comfortable or not challenging each other to grow aesthetically or morally.'
  },
  'Venus-Venus|opposition': {
    feel: 'Opposite aesthetics and values that either complement or conflict.',
    detail: 'You\'re drawn to different things and have different ideas about beauty, spending, and pleasure. This can create interesting balance or ongoing compromise about lifestyle and aesthetic choices.'
  },
  'Venus-Venus|trine': {
    feel: 'Easy appreciation of each other\'s tastes and values.',
    detail: 'You naturally support each other\'s aesthetic interests and life pleasures. Shared activities feel effortless, and you enjoy similar environments. This creates genuine lifestyle compatibility without demanding sameness.'
  },
  'Venus-Venus|square': {
    feel: 'Different preferences that require compromise and negotiation.',
    detail: 'Your aesthetics and values don\'t naturally align, which means constant decisions about shared spaces and lifestyle. This aspect pushes partners to communicate about values and find middle ground.'
  },
  'Venus-Venus|sextile': {
    feel: 'You like enough of the same things to share a life, and enough different things to keep surprising each other.',
    detail: 'Decorating a home together, choosing a restaurant, or planning a vacation does not become a negotiation. You share enough taste to make daily decisions easy, but your different aesthetic instincts introduce each other to pleasures you would not have found alone. Money conversations are relatively painless because your values overlap where it matters most.'
  },

  // Mars-Mars
  'Mars-Mars|conjunction': {
    feel: 'Matched ambition and energy; you drive each other forward.',
    detail: 'Together you\'re a powerhouse of action and ambition. The challenge is that you may compete rather than cooperate, or wear each other out with constant intensity. Channeling combined energy into shared goals creates magic.'
  },
  'Mars-Mars|opposition': {
    feel: 'Opposing drives that create either productive tension or conflict.',
    detail: 'You have different ideas about how to pursue goals and what\'s worth fighting for. This can create inspiring challenges or exhausting conflict depending on mutual respect. Balance comes from honoring both styles of action.'
  },
  'Mars-Mars|trine': {
    feel: 'Compatible energy and drive; you motivate each other naturally.',
    detail: 'You work well together and inspire each other to take action. Energy flows smoothly without constant competition or need to prove yourself. This aspect creates genuine collaborative power.'
  },
  'Mars-Mars|square': {
    feel: 'Clashing drives and competitive energy that demands conscious management.',
    detail: 'You each want to lead and may undermine each other\'s projects. This aspect works best when energy is channeled into shared goals rather than competing agendas. The friction can motivate or frustrate depending on context.'
  },
  'Mars-Mars|sextile': {
    feel: 'You motivate each other without competing — your drives run parallel rather than head-to-head.',
    detail: 'You are good workout partners, good project collaborators, and good at dividing labor without resentment. One person\'s initiative inspires the other rather than threatening them. You tend to get more done together than you planned because your different styles of effort complement each other. When one person flags, the other\'s energy picks up the slack naturally.'
  },

  // Moon-Moon
  'Moon-Moon|conjunction': {
    feel: 'Deep emotional sameness; you feel the same feelings at the same time.',
    detail: 'This creates profound emotional security and understanding. You intuitively know how each other feels and what each other needs. The potential shadow is that you can reinforce each other\'s emotional patterns without growing beyond them.'
  },
  'Moon-Moon|opposition': {
    feel: 'Opposing emotional natures that create tension or beautiful balance.',
    detail: 'You process emotions differently and may misunderstand each other\'s reactions. One person\'s comfort is the other\'s source of anxiety. This aspect requires genuine empathy and understanding of different emotional languages.'
  },
  'Moon-Moon|trine': {
    feel: 'Easy emotional understanding and natural emotional support.',
    detail: 'You intuitively understand each other\'s emotional needs and naturally provide what\'s needed. Emotional compatibility feels easy and secure. This is one of the best aspects for genuine emotional partnership.'
  },
  'Moon-Moon|square': {
    feel: 'Emotional friction that challenges both partners to grow emotionally.',
    detail: 'You have different emotional needs and responses, which can feel invalidating to both. This aspect pushes partners to truly listen and honor different emotional languages. Growth comes through accepting differences.'
  },
  'Moon-Moon|sextile': {
    feel: 'You feel emotionally safe together without the relationship becoming a cocoon.',
    detail: 'You process feelings differently enough to offer each other fresh perspective but similarly enough to avoid chronic misunderstanding. Bad days are handled well — one person\'s distress does not automatically destabilize the other. You cook for each other, check in without hovering, and create a domestic atmosphere that both people genuinely want to come home to.'
  },

  // Sun-Venus
  'Sun-Venus|conjunction': {
    feel: 'Natural romantic attraction and admiration; the Venus person adores the Sun person.',
    detail: 'The Venus person finds the Sun person inherently attractive and charming. The Sun person feels appreciated and loved. This creates natural romantic feelings and genuine affection. The aspect supports both initial attraction and lasting appreciation.'
  },
  'Sun-Venus|opposition': {
    feel: 'Magnetic attraction tinged with a sense that the Venus person wants to change the Sun person.',
    detail: 'The Venus person is strongly attracted but may have an agenda about how the Sun person should be. The Sun person feels admired but also critiqued. The aspect requires that the Venus person truly accept the Sun person as they are.'
  },
  'Sun-Venus|trine': {
    feel: 'Effortless admiration and affection; the Venus person naturally loves the Sun person.',
    detail: 'The Venus person appreciates the Sun person\'s essential nature without wanting to change anything. The Sun person feels genuinely loved and valued. This creates lasting affection and appreciation.'
  },
  'Sun-Venus|square': {
    feel: 'Attraction mixed with a sense that values or ways of being don\'t quite align.',
    detail: 'The Venus person is attracted to the Sun person but struggles with accepting their essential nature. The Sun person senses the criticism beneath the attraction. This aspect requires work to separate genuine affection from judgment.'
  },
  'Sun-Venus|sextile': {
    feel: 'You find each other attractive in a way that does not require effort or explanation.',
    detail: 'The Venus person genuinely likes who the Sun person is — not a projected fantasy, but the actual person. The Sun person feels seen and valued in a way that does not come with conditions attached. You compliment each other naturally, notice when the other looks good, and maintain a low-level current of appreciation that sustains the relationship through unremarkable days.'
  },

  // Sun-Mars
  'Sun-Mars|conjunction': {
    feel: 'Powerful sexual attraction and driven mutual pursuit.',
    detail: 'This is one of the most potent synastry aspects for chemistry and passion. The Mars person is intensely drawn to pursue the Sun person, and the Sun person feels powerfully desired. The energy is overwhelming and intoxicating.'
  },
  'Sun-Mars|opposition': {
    feel: 'Magnetic but volatile attraction; desire meets the pull to resist.',
    detail: 'The intense attraction can become adversarial, with the Mars person pursuing and the Sun person either submitting or resisting. The dynamic contains both passion and potential power struggle. Sexual tension runs extremely high.'
  },
  'Sun-Mars|trine': {
    feel: 'Harmonious sexual attraction without aggressive pursuit.',
    detail: 'The Mars person is drawn to the Sun person, but the pursuit feels welcome rather than threatening. The Sun person is genuinely happy to be desired. Together the energy is hot but controllable, passionate but not chaotic.'
  },
  'Sun-Mars|square': {
    feel: 'Sexual tension mixed with frustration and misalignment of desire.',
    detail: 'The Mars person may pursue too aggressively for the Sun person\'s comfort, or the Sun person may feel the pursuit is not what they want. This aspect requires clear communication about desire and boundaries.'
  },
  'Sun-Mars|sextile': {
    feel: 'The attraction between you is playful and energizing rather than consuming.',
    detail: 'The Mars person finds the Sun person genuinely exciting without feeling compelled to possess them, and the Sun person enjoys being pursued without feeling hunted. You spar lightly, tease each other, and maintain a physical spark through active engagement — working out together, planning adventures, challenging each other to try new things. The chemistry stays alive because you keep doing things, not just feeling things.'
  },
  // Moon-Venus
  'Moon-Venus|conjunction': {
    feel: 'Tenderness flows without effort; being near this person feels like emotional nourishment.',
    detail: 'The Moon person feels genuinely cherished by the Venus person, while Venus feels emotionally safe enough to open fully. Venus softens the Moon\'s anxieties and the Moon gives Venus the emotional reciprocity it craves. This works best when both people can receive as well as give — if one partner over-functions as caretaker, the sweetness curdles into quiet resentment.'
  },
  'Moon-Venus|opposition': {
    feel: 'Strong pull between comfort and desire; you want closeness but keep negotiating how it looks.',
    detail: 'The Moon person\'s emotional needs and the Venus person\'s love style sit at opposite ends, creating magnetic attraction and recurring friction about how affection gets expressed. One wants cozy domesticity while the other wants romance or social pleasure. The tension is productive when both stretch toward the other\'s language of care. It stalls when either insists their way of loving is the only valid one.'
  },
  'Moon-Venus|trine': {
    feel: 'Effortless warmth; affection and emotional safety arise naturally between you.',
    detail: 'The Moon and Venus operate in the same elemental register, so emotional needs and expressions of love align without negotiation. The Venus person instinctively knows how to please the Moon person, and the Moon person makes Venus feel emotionally held. The risk is complacency — this aspect is so comfortable that both partners may coast and neglect growth. It is a gift, but gifts still need tending.'
  },
  'Moon-Venus|square': {
    feel: 'Affection is real but keeps bumping into emotional sore spots.',
    detail: 'Venus reaches out with love in a style that inadvertently triggers the Moon person\'s insecurities, and the Moon\'s emotional reactions can make Venus feel rejected or unappreciated. The square forces both people to learn that caring about someone does not automatically mean you know how to care for them. Growth comes from asking what the other actually needs instead of projecting. Without that effort, small hurts accumulate.'
  },
  'Moon-Venus|sextile': {
    feel: 'A gentle, friendly affection that deepens when both people invest in it.',
    detail: 'The Venus person instinctively knows the small gesture that will lift the Moon person\'s mood — the right text, the right touch, the right thing to bring home. The Moon person gives Venus something that flattery and social charm cannot provide: a genuine emotional connection that makes Venus feel known rather than merely admired. This bond grows strongest through shared activities and conscious gestures of kindness rather than grand declarations.'
  },

  // Moon-Mars
  'Moon-Mars|conjunction': {
    feel: 'Emotional intensity hits immediately; feelings and desires fuse into something urgent.',
    detail: 'The Mars person activates the Moon person\'s deepest emotional responses — protectiveness, desire, sometimes defensiveness. The Moon person stirs Mars\'s instinct to act, pursue, or defend. Passion runs high but so does reactivity. This conjunction works when both people have the maturity to distinguish between excitement and agitation, and when Mars learns that the Moon\'s vulnerability is not a problem to solve but a reality to honor.'
  },
  'Moon-Mars|opposition': {
    feel: 'Electric emotional-sexual tension; you provoke and attract each other in equal measure.',
    detail: 'The Moon person feels emotionally exposed by Mars\'s directness, while Mars feels frustrated or fascinated by the Moon\'s emotional complexity. Fights can escalate fast because Mars pushes and the Moon retreats or floods. The opposition creates powerful physical chemistry and equally powerful arguments. It works when Mars tempers its bluntness and the Moon stops expecting Mars to read between the lines.'
  },
  'Moon-Mars|trine': {
    feel: 'Emotional courage flows easily; you feel energized and protected around each other.',
    detail: 'Mars\'s drive and the Moon\'s emotional instincts operate in natural harmony. The Mars person helps the Moon person act on feelings rather than stew in them, and the Moon gives Mars emotional grounding that prevents burnout. Physical affection comes naturally without aggression. This is one of the better aspects for a relationship that needs both tenderness and vitality — domesticity does not kill the spark here.'
  },
  'Moon-Mars|square': {
    feel: 'Emotional friction generates heat — sometimes passion, sometimes conflict, often both at once.',
    detail: 'Mars inadvertently steps on the Moon\'s emotional triggers, and the Moon\'s reactions feel irrational or manipulative to Mars. Arguments tend to follow a pattern: Mars attacks, Moon withdraws or weeps, Mars feels guilty or doubles down. The square demands that both people learn emotional regulation. When they do, the friction becomes productive intensity. When they don\'t, it becomes a cycle of wounding and apologizing.'
  },
  'Moon-Mars|sextile': {
    feel: 'A lively emotional-physical rapport that keeps the connection from going flat.',
    detail: 'Mars motivates the Moon person to take emotional risks they would otherwise avoid, and the Moon helps Mars channel raw drive into something warmer than pure ambition. You are the couple that builds things together — renovating the kitchen, training for a race, tackling a shared project that requires both tenderness and effort. The chemistry between you stays alive through action; sitting still together is pleasant, but doing things together is where you both come alive.'
  },

  // Moon-Saturn
  'Moon-Saturn|conjunction': {
    feel: 'Emotional gravity; this relationship feels serious and fated from the start.',
    detail: 'Saturn sits directly on the Moon\'s emotional core, which can feel like safety or suppression depending on how Saturn wields its authority. The Moon person often feels emotionally judged or held to a standard, while Saturn feels burdened with responsibility for the Moon\'s wellbeing. At its best, this builds a relationship of extraordinary loyalty and emotional resilience. At its worst, the Moon person\'s feelings are treated as inconvenient, and resentment crystallizes slowly.'
  },
  'Moon-Saturn|opposition': {
    feel: 'One person carries the feelings while the other carries the rules; the imbalance is palpable.',
    detail: 'The Moon person feels emotionally unsupported or criticized by Saturn\'s distance, while Saturn feels overwhelmed or destabilized by the Moon\'s emotional needs. This opposition often recreates parent-child dynamics in adult relationships. Maturity from both sides transforms it — Saturn learns that emotional availability is not weakness, and the Moon learns that structure is not rejection. Without that growth, one person always feels cold and the other always feels needy.'
  },
  'Moon-Saturn|trine': {
    feel: 'Emotional steadiness and mutual trust built on quiet dependability.',
    detail: 'Saturn supports the Moon\'s emotional life without crushing it, providing structure that feels protective rather than restrictive. The Moon softens Saturn\'s rigidity without threatening its need for order. This aspect is excellent for long-term partnerships because it favors loyalty, practical care, and emotional resilience through difficulty. It is not glamorous, but it is the kind of bond people build actual lives on.'
  },
  'Moon-Saturn|square': {
    feel: 'Emotional needs clash with expectations of duty; guilt and coldness circulate between you.',
    detail: 'The Moon person feels perpetually inadequate or emotionally stifled around Saturn, who may not even realize the effect of their criticism or withdrawal. Saturn feels that the Moon person is too sensitive or too dependent. This square tests whether both people can separate genuine accountability from emotional withholding. Growth is possible but requires Saturn to soften genuinely, not performatively, and the Moon to build internal security rather than seeking constant reassurance.',
    counsel: 'Saturn must learn to say "I care about you" in words, not just actions. Moon must resist interpreting Saturn\'s reserve as rejection. Set a weekly emotional check-in where Saturn practices vulnerability and Moon practices self-soothing. This aspect rewards patience measured in years, not weeks.'
  },
  'Moon-Saturn|sextile': {
    feel: 'A grounding connection; emotional maturity develops naturally through the relationship.',
    detail: 'Saturn helps the Moon person turn vague emotional unease into something actionable — not by dismissing the feeling, but by asking "what do you need right now?" and then helping make it happen. The Moon keeps Saturn human, reminding them that efficiency is not the point of a relationship. You handle bills, logistics, and household decisions with minimal drama. Neither person keeps score, and both feel that the relationship has made them more capable and more emotionally honest.'
  },

  // Venus-Saturn
  'Venus-Saturn|conjunction': {
    feel: 'Love feels heavy and real; affection comes with a sense of obligation or permanence.',
    detail: 'Saturn fuses with Venus, making the relationship feel consequential from the beginning. The Venus person may feel that their love is being tested or that they must earn Saturn\'s approval. Saturn takes the relationship seriously but can express devotion through duty rather than warmth. This works beautifully when Saturn relaxes its grip enough to let Venus enjoy the connection. It becomes painful when love feels like a contract with penalties for noncompliance.'
  },
  'Venus-Saturn|opposition': {
    feel: 'Attraction and restriction pull in opposite directions; wanting closeness but fearing vulnerability.',
    detail: 'Venus reaches for pleasure, beauty, and ease while Saturn demands proof, patience, and restraint. The Venus person feels rejected or undervalued; Saturn feels that Venus is frivolous or insufficiently committed. This opposition often plays out as hot-and-cold cycles. Resolution requires Saturn to show love without conditions attached and Venus to demonstrate that pleasure and loyalty are not mutually exclusive.'
  },
  'Venus-Saturn|trine': {
    feel: 'Love deepens through shared commitment; affection and responsibility feel like the same thing.',
    detail: 'Venus and Saturn in trine create a relationship where devotion has staying power. The Venus person appreciates Saturn\'s reliability as a form of love, and Saturn feels that Venus makes the effort worthwhile. Financial and aesthetic decisions tend to align. This is one of the strongest aspects for marriage or long-term partnership because both people value the same blend of warmth and structure.'
  },
  'Venus-Saturn|square': {
    feel: 'Love feels tested; affection is present but blocked by fear, duty, or disapproval.',
    detail: 'The Venus person feels they can never quite please Saturn or that their expressions of love are met with criticism. Saturn feels that Venus does not take the relationship seriously enough or prioritizes pleasure over responsibility. Money and values are frequent battlegrounds. The square demands that both partners examine whether their standards for love are realistic or whether they are using impossibly high bars as defense mechanisms.'
  },
  'Venus-Saturn|sextile': {
    feel: 'A practical, steady affection that builds slowly and lasts.',
    detail: 'You two handle money well together. Neither makes the other feel guilty about spending or saving. There is a practical tenderness here — love expressed through showing up reliably, splitting responsibilities fairly, and building something real together rather than performing romance. The relationship often starts as friendship or grows through shared work, and both people tend to feel that being together has made their actual, daily life measurably better.'
  },

  // Mars-Saturn
  'Mars-Saturn|conjunction': {
    feel: 'Willpower meets resistance; the relationship demands discipline and can feel like a pressure cooker.',
    detail: 'Mars wants to act and Saturn wants to control the action. The Mars person may feel blocked, slowed down, or constantly corrected by Saturn, while Saturn feels that Mars is reckless or impatient. When both people are mature, this conjunction produces extraordinary joint accomplishment — the energy is focused like a laser. When they are not, frustration and resentment build until Mars explodes or Saturn shuts everything down.'
  },
  'Mars-Saturn|opposition': {
    feel: 'One pushes, the other resists; the power struggle is exhausting unless channeled deliberately.',
    detail: 'Mars and Saturn face off across the chart, creating a tug-of-war between action and caution. The Mars person feels perpetually blocked; Saturn feels perpetually threatened by Mars\'s intensity. In business partnerships this opposition can work if roles are clearly defined. In intimate relationships it requires both people to respect what the other brings — Mars provides momentum, Saturn provides durability — without trying to dominate the other\'s domain.'
  },
  'Mars-Saturn|trine': {
    feel: 'Disciplined energy; you accomplish more together than either of you could alone.',
    detail: 'Mars\'s drive flows naturally into Saturn\'s structure, creating a partnership that excels at sustained effort. The Mars person feels that Saturn helps them focus, and Saturn feels that Mars gives them the courage to act on their plans. Physical endurance and practical ambition are shared strengths. This aspect is exceptional for building something tangible — a business, a home, a shared goal — because neither person quits easily.'
  },
  'Mars-Saturn|square': {
    feel: 'Constant friction between go and stop; anger and control become recurring themes.',
    detail: 'Mars feels chronically frustrated by Saturn\'s limitations, and Saturn feels threatened by Mars\'s aggression or impulsiveness. Timing is always off — when one wants to move, the other wants to wait. This square can produce significant conflict around authority, sex, and shared goals. It demands that both people develop patience with fundamentally different rhythms. Without conscious effort, it creates a dynamic where one person dominates and the other seethes.',
    counsel: 'Build in structured outlets for Mars\'s energy — physical activity, separate projects, time apart. Saturn should resist the urge to say "no" reflexively and instead say "when" or "how." Take turns leading decisions. Neither person should always be the one who waits.'
  },
  'Mars-Saturn|sextile': {
    feel: 'Productive tension; you challenge each other toward greater discipline and effectiveness.',
    detail: 'Mars learns to plan before charging ahead, and Saturn learns to actually start instead of endlessly preparing. You are excellent collaborators on anything that requires sustained effort — building a business, training for an event, managing a household renovation. Both people tend to feel that the other makes them more competent. It is not the most exciting dynamic in the relationship, but it is one of the most useful, and you will look back on what you accomplished together with real satisfaction.'
  },

  // Sun-Saturn
  'Sun-Saturn|conjunction': {
    feel: 'The relationship feels defining; one person\'s identity is shaped — or shadowed — by the other\'s authority.',
    detail: 'Saturn sits on the Sun person\'s core self, which can feel like being given a backbone or having one imposed. The Sun person may feel tested, matured, or diminished depending on how Saturn exercises its weight. Saturn often takes on a mentor or authority role, which works until the Sun person needs to outgrow it. This aspect builds resilient partnerships when Saturn respects the Sun\'s autonomy and the Sun respects Saturn\'s wisdom without surrendering selfhood.'
  },
  'Sun-Saturn|opposition': {
    feel: 'Identity and authority face off; one person feels judged while the other feels unappreciated.',
    detail: 'The Sun person experiences Saturn as critical, withholding, or overly controlling, while Saturn sees the Sun person as self-centered or insufficiently responsible. Father-figure dynamics often surface regardless of gender. The opposition is workable when both people acknowledge the projection — Saturn sees its own unlived vitality in the Sun, and the Sun sees its own fear of inadequacy in Saturn. Without that awareness, the relationship becomes a courtroom.'
  },
  'Sun-Saturn|trine': {
    feel: 'Mutual respect grounded in shared seriousness; you make each other more capable.',
    detail: 'Saturn supports the Sun\'s identity and goals with practical backing, and the Sun gives Saturn a sense of purpose and warmth. This trine is one of the most reliable indicators of long-term partnership viability because both people feel that the other helps them become more real. Ambition, responsibility, and personal integrity align. It ages well — the relationship gains authority and depth over time rather than losing steam.'
  },
  'Sun-Saturn|square': {
    feel: 'Identity feels constrained; one person\'s self-expression keeps running into the other\'s limits.',
    detail: 'The Sun person feels that Saturn criticizes or suppresses who they are, and Saturn feels that the Sun person is irresponsible or self-indulgent. This square creates a dynamic where approval must be earned and is rarely given freely. Growth requires Saturn to examine whether its standards are genuine wisdom or control disguised as concern, and the Sun person to consider whether its resistance to structure is freedom or avoidance of accountability.'
  },
  'Sun-Saturn|sextile': {
    feel: 'A stabilizing influence; both people feel more grounded and purposeful in the relationship.',
    detail: 'Saturn helps the Sun person follow through on what they say they want to do, and the Sun gives Saturn a reason to care about something beyond duty. You are good at setting shared goals and actually reaching them. The relationship has a functional backbone that other couples envy — you handle logistics, finances, and long-term planning without the drama that derails less grounded partnerships.'
  },

  // Sun-Jupiter
  'Sun-Jupiter|conjunction': {
    feel: 'Expansive optimism and mutual admiration; being together makes everything feel more possible.',
    detail: 'Jupiter amplifies the Sun person\'s identity, making them feel larger, more confident, and more generous. The Sun gives Jupiter a focal point for its expansive energy. Together they tend toward big plans, big spending, and big faith in each other. The risk is inflation — promising more than either can deliver, enabling excess, or substituting enthusiasm for substance. This works best when both people channel the buoyancy into something real.'
  },
  'Sun-Jupiter|opposition': {
    feel: 'Mutual inspiration that can tip into overreach; you push each other to grow but sometimes too far.',
    detail: 'The Sun person feels that Jupiter is either the most generous or the most excessive influence in their life, depending on the day. Jupiter sees the Sun as either a worthy vessel for its vision or a limiting focal point. The opposition creates philosophical and cultural tension — beliefs, values, and life direction become points of negotiation. It works when both people can expand without losing center. It falters when growth becomes competitive.'
  },
  'Sun-Jupiter|trine': {
    feel: 'Natural good fortune together; optimism and mutual support flow without effort.',
    detail: 'Jupiter and the Sun in trine create a partnership that feels lucky. The Sun person\'s confidence is reinforced by Jupiter\'s generosity, and Jupiter feels that the Sun person makes its ideals tangible. Shared adventures, education, and philosophical alignment come easily. The only danger is taking the ease for granted or becoming complacent because things come so readily. This aspect is a genuine gift — use it for something meaningful, not just comfort.'
  },
  'Sun-Jupiter|square': {
    feel: 'Restless expansion; you inspire each other but also push each other into overcommitment.',
    detail: 'Jupiter inflates the Sun person\'s ambitions past the point of realism, and the Sun provokes Jupiter into promises it cannot keep. Disagreements about beliefs, risk tolerance, or lifestyle are common. The square generates enormous energy that must be directed or it becomes wasteful. Both people need to learn the difference between growth and excess. When they do, this aspect fuels remarkable shared achievements. When they don\'t, it fuels remarkable shared debts.'
  },
  'Sun-Jupiter|sextile': {
    feel: 'You bring out each other\'s confidence and make each other braver.',
    detail: 'Jupiter believes in the Sun person in a way that is specific and encouraging rather than inflated, and the Sun gives Jupiter\'s expansive ideas a focused outlet. You learn together well — taking a class, reading the same book, exploring a new city. Both people tend to feel that the relationship has made them slightly more generous, slightly more curious, and slightly more willing to try things they would have talked themselves out of alone.'
  },

  // Moon-Jupiter
  'Moon-Jupiter|conjunction': {
    feel: 'Emotional abundance; feelings are big, generosity is instinctive, and comfort comes easily.',
    detail: 'Jupiter expands the Moon\'s emotional world, making the Moon person feel safe enough to be fully themselves. The Moon gives Jupiter emotional depth that prevents its optimism from becoming shallow. Together they create an atmosphere of warmth and hospitality. The danger is emotional overindulgence — avoiding hard conversations in favor of keeping things pleasant, or using generosity to sidestep genuine intimacy. Honesty must accompany the warmth.'
  },
  'Moon-Jupiter|opposition': {
    feel: 'Emotional generosity pulls against emotional honesty; the mood swings between expansive and excessive.',
    detail: 'The Moon person feels that Jupiter is sometimes wonderfully supportive and sometimes dismissive of real emotional concerns through forced positivity. Jupiter feels that the Moon\'s emotional needs are a drag on its enthusiasm. The opposition requires both people to honor emotional reality without drowning in it. Jupiter must learn that not every difficult feeling needs a silver lining, and the Moon must allow Jupiter\'s optimism to coexist with its sensitivity.'
  },
  'Moon-Jupiter|trine': {
    feel: 'Natural emotional generosity and a shared sense that life is fundamentally good.',
    detail: 'The Moon and Jupiter operate in easy harmony, creating a relationship where emotional support and philosophical alignment reinforce each other. The Moon person feels uplifted without being invalidated, and Jupiter feels emotionally grounded without being weighed down. Family life, domestic comfort, and shared values tend to align. This is one of the most pleasant synastry aspects to live with day to day — it provides resilience through genuine mutual care.'
  },
  'Moon-Jupiter|square': {
    feel: 'Emotional excess; feelings and expectations inflate past what the relationship can realistically deliver.',
    detail: 'Jupiter overpromises to the Moon person, and the Moon\'s emotional needs can feel bottomless to Jupiter. Expectations are consistently mismatched — one person wants more emotional depth, the other wants more freedom or adventure. The square generates emotional restlessness that must be addressed honestly. Both people need to scale their expectations to reality without cynicism. Unchecked, this aspect produces a cycle of emotional inflation and disappointment.'
  },
  'Moon-Jupiter|sextile': {
    feel: 'You lift each other\'s spirits in practical, consistent ways.',
    detail: 'Jupiter helps the Moon person zoom out when they are spiraling — not by dismissing the feeling, but by gently reminding them of the bigger picture. The Moon gives Jupiter something that performative generosity cannot buy: a genuine emotional connection that keeps Jupiter honest. You are good at modest adventures together — the weekend trip, the new recipe, the neighborhood walk that turns into a real conversation. Steady kindness is your love language as a couple.'
  },

  // Mars-Jupiter
  'Mars-Jupiter|conjunction': {
    feel: 'Shared boldness and physical vitality; together you feel unstoppable.',
    detail: 'Jupiter amplifies Mars\'s drive, creating a partnership defined by action, ambition, and appetite for experience. The Mars person feels emboldened and the Jupiter person feels energized. Adventures, competitive activities, and shared goals come naturally. The risk is recklessness — neither person is inclined to pump the brakes, so impulsive decisions about money, risk, or confrontation can escalate fast. A shared sense of ethics keeps this conjunction constructive.'
  },
  'Mars-Jupiter|opposition': {
    feel: 'Competing drives toward action and meaning; one charges ahead while the other questions the direction.',
    detail: 'Mars wants to act now and Jupiter wants to act meaningfully, which creates tension about pacing and purpose. The Mars person finds Jupiter preachy or unfocused; Jupiter finds Mars crude or short-sighted. The opposition is powerful for partnerships where both people have clearly defined roles — Mars executes, Jupiter strategizes. Without that clarity, they argue about whether to do the thing or think about the thing until the opportunity passes.'
  },
  'Mars-Jupiter|trine': {
    feel: 'Energetic harmony; shared enthusiasm and physical compatibility flow naturally.',
    detail: 'Mars and Jupiter in trine create a partnership with abundant energy and shared direction. The Mars person\'s initiative is supported by Jupiter\'s vision, and Jupiter\'s ideals are given force by Mars\'s willingness to act. Physical chemistry is lively and generous. This aspect is excellent for couples who travel, compete, or build together — shared activity is the glue. It favors an active, outward-facing relationship where both people push each other to do more and be braver.'
  },
  'Mars-Jupiter|square': {
    feel: 'Restless ambition and overreach; you amplify each other\'s impulses for better and worse.',
    detail: 'Mars\'s aggression is inflated by Jupiter\'s excess, creating a dynamic where conflicts escalate quickly and risks are taken without adequate forethought. Both people feel that the other eggs them on and then fails to follow through. Arguments about philosophy, ethics, or the right course of action are common. This square produces enormous energy that needs a constructive outlet. Physical activity, shared projects, or competitive pursuits channel it well. Idle, it turns destructive.'
  },
  'Mars-Jupiter|sextile': {
    feel: 'You make each other braver without making each other reckless.',
    detail: 'Mars feels that Jupiter genuinely backs their ambitions rather than just nodding politely, and Jupiter feels that Mars actually does the things Jupiter only talks about. You are good exercise partners, travel companions, and co-conspirators on projects that require both energy and vision. The relationship stays vital because you keep doing things together rather than settling into routine — and the things you do tend to work out better than either of you expected.'
  },

  // Sun-Neptune
  'Sun-Neptune|conjunction': {
    feel: 'The other person seems magical, transcendent, or impossible to fully know.',
    detail: 'Neptune dissolves the Sun person\'s boundaries, which can feel like spiritual merging or identity erosion depending on the health of both people. The Sun person may feel idealized beyond recognition by Neptune, while Neptune may lose themselves in the Sun person\'s identity. This conjunction is potent for creative and spiritual partnerships. It is dangerous when one person needs the other to remain a fantasy rather than becoming a real person with flaws.'
  },
  'Sun-Neptune|opposition': {
    feel: 'Fascination and confusion alternate; you see something transcendent in each other that may or may not be real.',
    detail: 'The Sun person experiences Neptune as either deeply inspiring or fundamentally dishonest, sometimes both at once. Neptune sees the Sun person as either a beacon of clarity or painfully mundane. The opposition demands radical honesty — both people must be willing to see each other as they actually are, not as they wish each other to be. Deception thrives in this aspect, whether mutual, one-sided, or self-directed. Truth is the only antidote.'
  },
  'Sun-Neptune|trine': {
    feel: 'A natural spiritual and creative rapport; you understand each other beyond words.',
    detail: 'Neptune supports the Sun person\'s identity with imagination, empathy, and a sense of the transcendent. The Sun grounds Neptune\'s visions without dismissing them. Shared creative or spiritual practices strengthen this bond immeasurably. The trine makes the connection feel effortless, but both people must still verify that their perceptions of each other are grounded in reality. Even harmonious Neptune aspects can sustain beautiful illusions for years.'
  },
  'Sun-Neptune|square': {
    feel: 'Chronic misunderstanding; one person feels unseen while the other feels deceived.',
    detail: 'Neptune clouds the Sun person\'s self-perception within the relationship, creating confusion about roles, promises, and intentions. The Sun person may feel that Neptune is evasive or dishonest; Neptune may feel that the Sun person is insensitive to subtlety. This square is where idealization turns to disillusionment most sharply. Both people must commit to painful clarity over comfortable vagueness. Addictive or codependent patterns are common if this aspect goes unexamined.'
  },
  'Sun-Neptune|sextile': {
    feel: 'You bring out each other\'s imagination and compassion without losing touch with reality.',
    detail: 'The Sun person feels that Neptune adds a quality of beauty and meaning to ordinary life — the evening feels more atmospheric, the conversation more layered, the music more moving. Neptune feels that the Sun person genuinely values their sensitivity rather than treating it as impractical. You collaborate well on creative projects, share spiritual curiosity without requiring identical beliefs, and treat each other with a compassion that stays grounded enough to be useful rather than merely sentimental.'
  },

  // Sun-Pluto
  'Sun-Pluto|conjunction': {
    feel: 'Immediate intensity; this person sees through you and you cannot look away.',
    detail: 'Pluto fuses with the Sun person\'s identity, creating a bond defined by depth, power, and transformation. The Sun person feels exposed and fundamentally changed by the relationship; Pluto feels compelled to possess or transform the Sun. At its best this conjunction catalyzes genuine psychological growth. At its worst it creates a dynamic of obsession, control, and identity annihilation. The determining factor is whether both people can tolerate vulnerability without weaponizing it.'
  },
  'Sun-Pluto|opposition': {
    feel: 'A power struggle wrapped in fascination; you are drawn to and threatened by each other equally.',
    detail: 'The Sun person and Pluto person stand at opposite poles of a power axis, each holding something the other needs and fears. Projections of power, shadow, and desire run in both directions. The opposition can produce transformative partnerships if both people are willing to own their own darkness rather than projecting it onto the other. Without that willingness, it degenerates into manipulation, control battles, and cycles of crisis and reconciliation.'
  },
  'Sun-Pluto|trine': {
    feel: 'Depth comes naturally; you empower each other without the destructive extremes.',
    detail: 'Pluto supports the Sun person\'s self-expression with intensity and psychological insight, and the Sun gives Pluto a constructive focal point for its transformative energy. Trust builds through shared experiences of vulnerability. This trine is excellent for partnerships that need to weather genuine difficulty — both people have access to reserves of resilience. The ease of the trine means the depth does not destabilize the relationship the way harder Pluto aspects can.'
  },
  'Sun-Pluto|square': {
    feel: 'Compulsive intensity; the relationship forces confrontation with power, control, and buried truth.',
    detail: 'Pluto pressures the Sun person\'s identity at the point of greatest resistance, triggering ego battles and forced transformation. The Sun person feels controlled or undermined; Pluto feels that the Sun person refuses to go deep enough. Power dynamics dominate unless both people commit to radical self-honesty. This square can be profoundly growth-producing, but the growth comes through crisis, not comfort. Both must choose transformation over domination.'
  },
  'Sun-Pluto|sextile': {
    feel: 'A steady undercurrent of depth and mutual empowerment.',
    detail: 'The Sun person feels that Pluto sees them more clearly than most people do — not their surface, but the real architecture of who they are — and this perception is empowering rather than invasive. Pluto feels that the Sun person is genuinely worth their intensity and investment. You tend to have conversations that go deeper than either of you planned, and quiet acts of mutual support accumulate into a bond that is more resilient than it appears on the surface.'
  },

  // Moon-Neptune
  'Moon-Neptune|conjunction': {
    feel: 'Psychic-level emotional sensitivity; you absorb each other\'s feelings without trying.',
    detail: 'Neptune dissolves the Moon\'s emotional boundaries, creating a bond that can feel telepathic. The Moon person feels profoundly understood at a soul level, while Neptune feels emotionally merged. Shared dreams, artistic sensibility, and spiritual intuition are amplified. The danger is that neither person can tell whose feelings are whose. Codependency, escapism, and emotional confusion thrive here unless both people maintain separate inner lives and honest communication about what they actually feel versus what they imagine.'
  },
  'Moon-Neptune|opposition': {
    feel: 'Deep emotional longing and confusion; you feel everything for each other but trust little of it.',
    detail: 'The Moon person\'s emotional needs are reflected back by Neptune in a distorted mirror — the feelings are real, but the perceptions are unreliable. Neptune may unconsciously deceive or disappoint the Moon person by being whatever they seem to want. The Moon may project emotional fantasies onto Neptune that no human can fulfill. This opposition requires both people to prioritize honest emotional communication over mystical connection. What feels spiritual may simply be unexamined.'
  },
  'Moon-Neptune|trine': {
    feel: 'Intuitive emotional connection; empathy and spiritual sensitivity flow between you effortlessly.',
    detail: 'The Moon and Neptune operate in natural harmony, creating a relationship rich in emotional attunement, compassion, and shared imagination. The Moon person feels that Neptune understands their inner world without explanation, and Neptune feels emotionally safe enough to drop its defenses. Creative and spiritual activities deepen the bond. The trine is gentle enough to avoid Neptune\'s worst tendencies, but both people should still periodically reality-check their perceptions of each other.'
  },
  'Moon-Neptune|square': {
    feel: 'Emotional fog; genuine care coexists with chronic misunderstanding and unspoken disappointment.',
    detail: 'Neptune undermines the Moon person\'s emotional security through vagueness, broken promises, or well-intentioned dishonesty. The Moon person feels that they can never get a straight emotional answer from Neptune, while Neptune feels emotionally overwhelmed or unfairly accused. Addiction, martyrdom, and victim-savior dynamics are common expressions. The square demands that both people learn to be emotionally honest even when the truth is less beautiful than the fantasy.'
  },
  'Moon-Neptune|sextile': {
    feel: 'You sense each other\'s moods before a word is spoken.',
    detail: 'The Moon person feels that Neptune adds a quality of magic to their emotional life — dreams become more vivid, music hits differently, quiet moments together carry an unusual richness. Neptune feels emotionally held by the Moon in a way that does not require them to explain their inner world. You comfort each other through presence more than words, and shared creative or contemplative activities strengthen the bond without either person having to articulate exactly why.'
  },

  // Moon-Pluto
  'Moon-Pluto|conjunction': {
    feel: 'Emotional intensity that borders on overwhelming; feelings are volcanic and impossible to ignore.',
    detail: 'Pluto sits directly on the Moon\'s emotional core, dredging up the deepest feelings, fears, and attachment patterns. The Moon person feels emotionally consumed — seen to the bone and sometimes controlled. Pluto feels compelled to possess the Moon person\'s emotional world entirely. This conjunction creates bonds of extraordinary depth and equally extraordinary difficulty. It demands complete emotional honesty and a willingness to face the darkest parts of oneself. Half-measures do not survive here.'
  },
  'Moon-Pluto|opposition': {
    feel: 'Emotional power struggle; vulnerability and control alternate in a relentless cycle.',
    detail: 'The Moon person\'s emotional openness triggers Pluto\'s need to control, and Pluto\'s intensity triggers the Moon\'s deepest survival instincts. Jealousy, possessiveness, and emotional manipulation are the shadow expressions. The opposition polarizes the partnership into one who feels and one who controls. Resolution requires both people to sit with emotional discomfort without trying to dominate it. Couples therapy is not a sign of failure with this aspect — it is basic maintenance.'
  },
  'Moon-Pluto|trine': {
    feel: 'Deep emotional trust; you can share your darkest truths and feel held rather than judged.',
    detail: 'Pluto supports the Moon\'s emotional world with intensity that strengthens rather than destabilizes. The Moon person feels safe enough to explore their own psychological depths, and Pluto feels emotionally nourished by the Moon\'s willingness to go deep. Shared experiences of loss, crisis, or transformation bond this pair profoundly. This trine creates emotional resilience that carries the relationship through difficulties that would end less deeply rooted partnerships.'
  },
  'Moon-Pluto|square': {
    feel: 'Emotional compulsion; the bond is addictive, transformative, and frequently painful.',
    detail: 'Pluto pressures the Moon at its most vulnerable point, triggering emotional crises that force both people to confront patterns they would rather avoid. The Moon person feels emotionally manipulated or obsessively attached; Pluto feels that the Moon\'s emotional reactions are threats that must be managed. This square produces the most intense emotional dynamics in synastry. It can catalyze profound psychological healing if both people do their own inner work. Without that, it produces trauma bonds.',
    counsel: 'Individual therapy is not optional with this aspect — it is infrastructure. Both people must maintain their own emotional ground. When intensity spikes, agree to a cooling-off period before discussing. Never use the other person\'s vulnerabilities as leverage. The healing path is parallel, not merged.'
  },
  'Moon-Pluto|sextile': {
    feel: 'Emotional depth that enriches without overwhelming; you help each other process difficult feelings.',
    detail: 'The Moon person feels that Pluto helps them see patterns in their own emotional life that they could not have identified alone — recurring reactions, family legacies, the real reason behind the surface upset. Pluto feels that the Moon person makes it safe to be vulnerable without being consumed by intensity. Your late-night conversations about family, psychology, and what you actually feel tend to leave both people feeling lighter, not heavier.'
  },

  // Venus-Neptune
  'Venus-Neptune|conjunction': {
    feel: 'Romantic enchantment; love feels like a dream, a poem, or a work of art.',
    detail: 'Neptune dissolves Venus\'s boundaries, creating a love that feels transcendent and otherworldly. The Venus person feels that they have found their soul\'s romantic ideal; Neptune feels worshipped and inspired. Artistic and spiritual connection is profound. The danger is that the relationship exists more in fantasy than in reality — when the dream fades, disillusionment can be devastating. Both people must build a relationship that survives the loss of its own mythology.'
  },
  'Venus-Neptune|opposition': {
    feel: 'Romantic longing and confusion; you are in love with an image of each other that keeps shifting.',
    detail: 'Venus reaches for a love that Neptune keeps making beautiful and ungraspable. The Venus person feels alternately enchanted and betrayed; Neptune feels alternately adored and unseen. Financial deception or confusion is common alongside the romantic fog. This opposition requires both people to choose a real relationship over a beautiful illusion. The love can survive disillusionment, but only if both partners value truth as much as they value the fantasy.'
  },
  'Venus-Neptune|trine': {
    feel: 'Effortless romantic and creative harmony; love is tender, imaginative, and quietly transcendent.',
    detail: 'Neptune supports Venus with beauty, compassion, and spiritual depth, creating a love that feels genuinely inspired. The Venus person feels that Neptune adds poetry to their life, and Neptune feels that Venus appreciates their sensitivity. Shared artistic, musical, or spiritual pursuits are the highest expression. The trine is gentle enough that the Neptunian fog rarely becomes toxic, but periodic reality checks keep the relationship from drifting into comfortable delusion.'
  },
  'Venus-Neptune|square': {
    feel: 'Love is beautiful and unreliable; promises dissolve and expectations are chronically unmet.',
    detail: 'Neptune undermines Venus\'s values and relationship expectations through idealization followed by disappointment. The Venus person feels deceived or abandoned; Neptune feels that Venus is materialistic or fails to appreciate the spiritual dimension. Affairs, addiction, and financial confusion are the shadow side. This square requires brutal romantic honesty — not cruelty, but clarity about what each person can actually offer versus what they wish they could offer.'
  },
  'Venus-Neptune|sextile': {
    feel: 'A soft romantic and creative connection that adds beauty without distorting reality.',
    detail: 'Venus feels that Neptune adds a layer of magic to ordinary romance — candlelight actually means something, a love letter is not corny, a shared sunset genuinely moves you both. Neptune feels that Venus appreciates their vision rather than dismissing it as impractical. You enjoy the same music, are moved by the same films, and share gentle romantic gestures that other couples might find sentimental but that feel perfectly natural between you.'
  },

  // Venus-Pluto
  'Venus-Pluto|conjunction': {
    feel: 'Obsessive, consuming attraction; love and desire merge into something that feels fated and dangerous.',
    detail: 'Pluto transforms Venus\'s experience of love into something raw and total. The Venus person feels magnetically drawn to Pluto in a way that bypasses rational choice; Pluto feels compelled to possess Venus entirely. Sexual intensity is extreme. Jealousy, power games, and emotional manipulation are the shadow side. This conjunction produces the kind of love people rearrange their lives for — whether that rearrangement is liberation or destruction depends entirely on the psychological maturity of both parties.'
  },
  'Venus-Pluto|opposition': {
    feel: 'Magnetic attraction and power struggle in equal measure; desire and control are indistinguishable.',
    detail: 'Venus and Pluto face each other across an axis of desire and power, each holding what the other craves and fears. The Venus person feels both irresistibly drawn to and threatened by Pluto\'s intensity; Pluto feels that Venus holds the power to accept or reject them absolutely. Financial and sexual control issues are common. The opposition can become a genuinely transformative partnership if both people commit to equality, or a genuinely destructive one if either pursues domination.'
  },
  'Venus-Pluto|trine': {
    feel: 'Deep, passionate love with an undercurrent of intensity that strengthens rather than destabilizes.',
    detail: 'Pluto supports Venus with transformative depth, creating a love that is emotionally rich, sexually alive, and psychologically honest. The Venus person feels that Pluto sees and desires the real them, not a surface version. Pluto feels that Venus makes vulnerability worthwhile. This trine is one of the strongest indicators of a relationship with lasting sexual and emotional depth. It weathers difficulty well because both people have access to the relationship\'s reserves of genuine intimacy.'
  },
  'Venus-Pluto|square': {
    feel: 'Obsessive attraction that reveals and aggravates every insecurity around love, worth, and control.',
    detail: 'Pluto pressures Venus at the point of deepest romantic vulnerability, triggering jealousy, possessiveness, and compulsive attachment. The Venus person feels that their worth is constantly being tested; Pluto feels that Venus is never fully committed. Power plays around sex, money, and loyalty dominate. This square forces both people to confront their deepest fears about love. The transformation is real but comes at a price — both must be willing to be broken open rather than breaking each other.'
  },
  'Venus-Pluto|sextile': {
    feel: 'Quiet intensity; love has depth and psychological honesty without the compulsive extremes.',
    detail: 'Venus feels that Pluto adds a richness to the romantic life that they have not found elsewhere — conversations that go deeper than expected, physical intimacy that communicates something words cannot, a feeling that this relationship matters in a way that is hard to articulate. Pluto feels that Venus is worth the risk of opening up. Trust builds gradually through honest exchange and genuine vulnerability, and both people tend to feel that what they have together is substantial and not easily replaced.'
  },

  // Sun-Uranus
  'Sun-Uranus|conjunction': {
    feel: 'Electric recognition; this person jolts your sense of self awake in ways you never expected.',
    detail: 'Uranus lands directly on the Sun person\'s identity, creating a relationship that feels exciting, destabilizing, and utterly unlike anything else. The Sun person is shaken out of routine self-expression, while Uranus feels genuinely seen for their eccentricity. The bond thrives on freedom and novelty. It struggles when either person tries to pin the other down or when the Sun person needs consistency that Uranus simply cannot provide.'
  },
  'Sun-Uranus|opposition': {
    feel: 'Fascination with someone who lives by completely different rules than you do.',
    detail: 'The Sun person finds Uranus thrilling and unnerving in equal measure. Uranus sees the Sun person as either a stabilizing anchor or a constraint on their freedom, depending on the day. The opposition creates a push-pull between togetherness and independence that never fully resolves. It works when both people grant genuine autonomy without interpreting space as rejection. It fails when either demands the other become more predictable or more spontaneous than they naturally are.'
  },
  'Sun-Uranus|trine': {
    feel: 'Natural ease with each other\'s individuality; you encourage freedom rather than fearing it.',
    detail: 'Uranus supports the Sun person\'s self-expression with stimulating ideas and genuine respect for independence. The Sun person gives Uranus a warm center that doesn\'t threaten their autonomy. Together you create space where both people can be fully themselves without apology. The trine makes unconventionality feel natural rather than threatening, and the relationship stays fresh because neither person tries to domesticate the other.'
  },
  'Sun-Uranus|square': {
    feel: 'Disruptive tension between who you are and what the other person needs you to become.',
    detail: 'Uranus destabilizes the Sun person\'s sense of self through unpredictable behavior, sudden changes of plan, or refusal to conform to expectations. The Sun person feels jerked around; Uranus feels suffocated by the Sun person\'s need for consistency. Breakups and reconciliations are common. This square demands that both people develop tolerance for genuine difference without sacrificing their core needs. Compromise here means expanding your definition of normal, not abandoning your identity.'
  },
  'Sun-Uranus|sextile': {
    feel: 'You keep each other interesting without destabilizing each other.',
    detail: 'The Sun person finds Uranus refreshing — someone who thinks differently enough to be stimulating without being exhausting. Uranus appreciates that the Sun person is genuinely open to new ideas and does not try to normalize them. You share unconventional interests, try experiments together, and give each other room to grow in directions that neither expected at the beginning. The relationship stays alive because both people keep evolving, and neither tries to freeze the other in place.'
  },

  // Sun-Chiron
  'Sun-Chiron|conjunction': {
    feel: 'This person touches your deepest wound simply by being who they are.',
    detail: 'Chiron sits on the Sun person\'s identity, which means the relationship inevitably activates the Sun person\'s core insecurity about who they are and whether they are enough. The Chiron person may unconsciously embody the Sun person\'s wound, or may serve as a healer who helps the Sun person accept their most vulnerable self. The bond is tender and painful in equal measure. It works when both people approach the wounding with compassion rather than blame.'
  },
  'Sun-Chiron|opposition': {
    feel: 'You mirror each other\'s deepest pain around identity and belonging.',
    detail: 'The Sun person and Chiron person stand on opposite sides of a wound that both carry in different forms. The Sun person feels exposed and judged; the Chiron person feels that their own pain is ignored while they attend to the Sun person\'s. The opposition creates a dynamic where healing is possible but only if both people take turns being vulnerable and being the one who holds space. One-sided emotional labor kills this aspect.'
  },
  'Sun-Chiron|trine': {
    feel: 'A natural capacity to heal each other\'s self-doubt through acceptance and gentle encouragement.',
    detail: 'Chiron supports the Sun person\'s identity with compassionate understanding of their vulnerabilities. The Sun person helps Chiron feel that their wound has purpose and that their sensitivity is a gift. Healing happens organically through the relationship without forcing confrontation. This trine creates a bond where both people feel safer being imperfect together than performing perfection apart.'
  },
  'Sun-Chiron|square': {
    feel: 'The relationship keeps pressing on a bruise you thought had healed.',
    detail: 'Chiron aggravates the Sun person\'s core wound through friction that feels personal even when it isn\'t intentional. The Sun person may feel diminished or inadequate around the Chiron person; Chiron may feel that the Sun person dismisses their sensitivity. The square forces both people to confront self-worth issues they would rather avoid. Growth requires acknowledging the pain without making the other person responsible for fixing it.'
  },
  'Sun-Chiron|sextile': {
    feel: 'You understand each other\'s vulnerabilities without needing them explained.',
    detail: 'The Sun person feels that the Chiron person gets their struggles on a level that most people miss, and Chiron feels valued for their depth rather than pitied for their pain. Healing happens in this relationship through accumulation rather than breakthrough — a conversation here, a moment of acceptance there, a pattern that slowly shifts because someone finally witnessed it without flinching. Neither person has to perform wholeness around the other.'
  },

  // Moon-Uranus
  'Moon-Uranus|conjunction': {
    feel: 'Emotionally electrifying; your inner world gets rewired by this person\'s presence.',
    detail: 'Uranus lands on the Moon person\'s emotional core, creating excitement and instability in equal measure. The Moon person feels emotionally awakened but also unsettled, never quite sure what to expect. Uranus feels that the Moon person provides emotional depth they didn\'t know they needed. The bond is never boring but it can be exhausting. It works when the Moon person develops enough internal security to enjoy the ride, and when Uranus learns that emotional consistency is not the same as emotional captivity.'
  },
  'Moon-Uranus|opposition': {
    feel: 'Emotional needs and the need for freedom pull in opposite directions, creating chronic tension.',
    detail: 'The Moon person craves emotional closeness and security; Uranus craves space and autonomy. Each person\'s deepest need directly threatens the other\'s. The Moon person feels abandoned by Uranus\'s emotional detachment, while Uranus feels suffocated by the Moon person\'s need for reassurance. This opposition requires both people to stretch beyond their comfort zones. Uranus must learn that showing up emotionally is not surrender, and the Moon must accept that space is not abandonment.'
  },
  'Moon-Uranus|trine': {
    feel: 'Emotional freedom and excitement flow naturally; you feel liberated rather than destabilized.',
    detail: 'Uranus refreshes the Moon person\'s emotional life without threatening their security. The Moon person feels excited and emotionally alive around Uranus, and Uranus feels that the Moon person accepts their unconventionality without trying to change it. The trine supports a relationship where emotional honesty includes the freedom to be unpredictable. Both people grow emotionally because the bond encourages authenticity over conformity.'
  },
  'Moon-Uranus|square': {
    feel: 'Emotional disruption that feels thrilling and destabilizing in turns you cannot predict.',
    detail: 'Uranus jolts the Moon person\'s emotional world at unpredictable intervals, creating a pattern of excitement followed by anxiety. The Moon person never quite feels settled; Uranus feels that the Moon person\'s emotional reactions are attempts to control them. Sudden separations or emotional withdrawals are common. The square demands that both people build tolerance for emotional unpredictability without normalizing chaos. Stability and excitement must coexist, not alternate.'
  },
  'Moon-Uranus|sextile': {
    feel: 'Emotionally refreshing — you keep each other from getting stuck in ruts.',
    detail: 'The Moon person finds Uranus emotionally surprising in ways that feel exciting rather than threatening — an unexpected date night idea, an unconventional perspective on a problem, a willingness to try a completely different approach to something that is not working. Uranus appreciates that the Moon person responds to their eccentricity with genuine warmth rather than anxiety. Together you break routines before they calcify, and the emotional atmosphere stays curious rather than stale.'
  },

  // Moon-Chiron
  'Moon-Chiron|conjunction': {
    feel: 'Emotional vulnerability is immediate and unavoidable; this person reaches your oldest wounds.',
    detail: 'Chiron sits directly on the Moon person\'s emotional core, activating their deepest hurts around nurturing, safety, and belonging. The Moon person may feel profoundly understood or profoundly reinjured, often both simultaneously. The Chiron person carries their own wound around emotional care and may struggle to provide what the Moon person needs. Healing is possible when both people honor the pain without trying to fix it, and when neither person uses vulnerability as a weapon.'
  },
  'Moon-Chiron|opposition': {
    feel: 'Each person\'s emotional wounds trigger the other\'s, creating a painful but potentially healing mirror.',
    detail: 'The Moon person\'s emotional needs activate the Chiron person\'s wound, and Chiron\'s pain activates the Moon person\'s deepest insecurities about being enough. The opposition creates a dynamic where both people alternate between healer and wounded. It works when both people can hold space for pain without drowning in it. It fails when one person becomes the permanent patient and the other the permanent caretaker.'
  },
  'Moon-Chiron|trine': {
    feel: 'Emotional healing happens naturally through the tenderness you share.',
    detail: 'Chiron supports the Moon person\'s emotional life with intuitive understanding of their vulnerabilities. The Moon person provides Chiron with the emotional safety needed to process old wounds. Healing happens through quiet acts of care rather than dramatic confrontation. This trine creates a relationship where both people feel emotionally safer over time, not because pain disappears but because it is witnessed and held with compassion.'
  },
  'Moon-Chiron|square': {
    feel: 'Emotional sore spots get pressed repeatedly; tenderness and pain coexist uncomfortably.',
    detail: 'Chiron inadvertently triggers the Moon person\'s deepest emotional wounds through patterns that neither person fully understands at first. The Moon person feels emotionally raw and may withdraw; the Chiron person feels guilty or frustrated by their inability to help. The square forces both people to examine childhood emotional patterns and family wounds that play out in the relationship. Growth requires patience and a willingness to sit with discomfort without assigning blame.'
  },
  'Moon-Chiron|sextile': {
    feel: 'A gentle emotional understanding that makes space for vulnerability without forcing it.',
    detail: 'The Moon person senses the Chiron person\'s tender spots without having to be told, and handles them with a care that feels instinctive rather than clinical. Chiron feels emotionally safe enough to lower their guard in this relationship — not all at once, but gradually, one honest conversation at a time. You talk about family patterns, childhood memories, and old hurts in a way that leaves both people feeling lighter rather than drained.'
  },

  // Moon-Mercury
  'Moon-Mercury|conjunction': {
    feel: 'Thoughts and feelings merge; you understand each other\'s inner world through conversation.',
    detail: 'Mercury lands on the Moon person\'s emotional core, creating a connection where talking about feelings comes naturally. The Moon person feels heard and understood by Mercury\'s attentiveness, while Mercury feels emotionally engaged by the Moon person\'s depth. Communication is the primary love language here. The bond thrives when both people prioritize honest dialogue and struggles when either goes silent or dismissive.'
  },
  'Moon-Mercury|opposition': {
    feel: 'The way you think and the way your partner feels seem to operate on different frequencies.',
    detail: 'Mercury\'s rational approach to communication can feel dismissive to the Moon person\'s emotional reality, while the Moon person\'s feelings can seem illogical to Mercury. The opposition creates misunderstandings where one person thinks they are being clear while the other feels unheard. Resolution comes when Mercury learns to validate feelings before analyzing them, and the Moon person learns to articulate emotions in terms Mercury can engage with.'
  },
  'Moon-Mercury|trine': {
    feel: 'Easy emotional communication; you naturally find the right words for what the other feels.',
    detail: 'Mercury and the Moon operate in natural harmony, making conversation about feelings effortless and productive. The Moon person feels that Mercury gives language to emotions they struggle to articulate, and Mercury feels emotionally enriched by the Moon person\'s depth. This trine supports a relationship where emotional processing happens through talking, and where both people feel genuinely understood in their inner worlds.'
  },
  'Moon-Mercury|square': {
    feel: 'Emotional communication misfires; what you say and what your partner hears diverge painfully.',
    detail: 'Mercury\'s communication style rubs against the Moon person\'s emotional triggers, creating a pattern where conversations about feelings escalate rather than resolve. The Moon person feels that Mercury is cold, dismissive, or overly analytical; Mercury feels that the Moon person is irrational or refuses to engage logically. The square demands that both people develop new communication skills. Mercury must learn to lead with empathy, and the Moon must learn to name feelings specifically rather than expecting them to be intuited.'
  },
  'Moon-Mercury|sextile': {
    feel: 'You talk through feelings with a gentle ease that most couples have to work much harder to achieve.',
    detail: 'Mercury helps the Moon person find words for feelings that would otherwise remain vague and overwhelming, and the Moon gives Mercury\'s communication an emotional sincerity that prevents it from becoming merely clever. You are good at daily check-ins, at debriefing the day over dinner, at saying "tell me what happened" and actually listening. Emotional intelligence in this relationship is a shared practice that improves over time rather than a fixed trait either person brings.'
  },

  // Mercury-Venus
  'Mercury-Venus|conjunction': {
    feel: 'Conversation itself becomes a form of affection; you charm each other with words.',
    detail: 'Mercury and Venus merge intellectual and aesthetic sensibilities, creating a connection where talking is a pleasure in itself. The Mercury person finds Venus\'s values and tastes genuinely interesting, and Venus feels intellectually appreciated by Mercury\'s curiosity. Flirtation comes naturally, and you share an easy rapport around art, culture, and ideas about beauty. The bond is light and enjoyable, though it needs deeper aspects to sustain through difficulty.'
  },
  'Mercury-Venus|opposition': {
    feel: 'Intellectual attraction tinged with disagreement about values and taste.',
    detail: 'Mercury and Venus approach beauty, pleasure, and values from opposite perspectives, creating stimulating debate or frustrating incompatibility depending on the couple. The Mercury person finds Venus\'s preferences fascinating but sometimes baffling; Venus feels that Mercury overanalyzes what should simply be enjoyed. The opposition works when both people treat differences in taste as opportunities for expansion rather than threats to compatibility.'
  },
  'Mercury-Venus|trine': {
    feel: 'Graceful conversation and natural aesthetic harmony; you enjoy the same things and talk about them well.',
    detail: 'Mercury and Venus flow together effortlessly, making shared cultural experiences, creative collaboration, and everyday conversation genuinely pleasurable. The Mercury person articulates what Venus feels about beauty and love, and Venus softens Mercury\'s communication with warmth and charm. This trine supports a relationship rich in shared pleasures, good conversation, and mutual appreciation of each other\'s minds and tastes.'
  },
  'Mercury-Venus|square': {
    feel: 'What you find beautiful and how your partner thinks about it don\'t quite align.',
    detail: 'Mercury\'s communication style clashes with Venus\'s values or aesthetic sensibilities, creating friction around topics like spending, taste, and how affection should be expressed verbally. The Mercury person may feel that Venus is superficial or indulgent; Venus may feel that Mercury is critical or unromantic. The square requires both people to appreciate that intelligence and beauty speak different languages and that neither is more valid than the other.'
  },
  'Mercury-Venus|sextile': {
    feel: 'You enjoy the same pleasures and talk about them well together.',
    detail: 'Mercury finds Venus\'s taste genuinely interesting rather than baffling, and Venus enjoys the way Mercury talks about things — with a precision and wit that makes everyday observations feel fresh. You are good at gallery visits, restaurant discoveries, and lazy afternoons in bookstores together. The relationship stays culturally alive because both people bring different but compatible perspectives to shared pleasures, and talking about what you enjoy is itself enjoyable.'
  },

  // Mercury-Mars
  'Mercury-Mars|conjunction': {
    feel: 'Words carry force; conversation between you is passionate, direct, and sometimes combative.',
    detail: 'Mercury and Mars merge thought and action, creating a dynamic where ideas are expressed with unusual intensity. The Mercury person feels energized and challenged by Mars\'s directness, while Mars feels that Mercury gives their impulses intelligent direction. Debate is a form of bonding. The risk is that arguments become personal and words are used as weapons. This conjunction works when both people enjoy intellectual combat and know when to stop before real damage is done.'
  },
  'Mercury-Mars|opposition': {
    feel: 'Mental sparring that either sharpens you both or leaves one of you feeling attacked.',
    detail: 'Mercury and Mars face off across an axis of thought versus action, creating arguments where one person wants to talk it through and the other wants to do something about it. The Mercury person feels that Mars is aggressive or impatient with nuance; Mars feels that Mercury talks when action is needed. The opposition is productive when both people respect the other\'s approach. It becomes destructive when debate turns into verbal warfare with a winner and a loser.'
  },
  'Mercury-Mars|trine': {
    feel: 'Stimulating intellectual rapport; you sharpen each other\'s thinking and enjoy spirited discussion.',
    detail: 'Mercury\'s ideas flow naturally into Mars\'s drive, creating a partnership where thoughts lead to action and action informs new thinking. Conversation is lively without being combative. The Mercury person feels that Mars gives their ideas momentum, and Mars feels that Mercury provides strategic clarity. This trine is excellent for couples who work together, plan together, or share competitive intellectual interests.'
  },
  'Mercury-Mars|square': {
    feel: 'Constant mental friction; arguments start easily and escalate before either of you means them to.',
    detail: 'Mercury\'s communication style triggers Mars\'s combativeness, and Mars\'s directness triggers Mercury\'s defensiveness. Discussions about even minor topics can become heated quickly. The Mercury person feels bulldozed; Mars feels nitpicked. The square requires both people to develop rules of engagement for disagreements. Learning to argue without attacking character or raising voices transforms this aspect from a liability into a source of genuine intellectual growth.'
  },
  'Mercury-Mars|sextile': {
    feel: 'You enjoy arguing with each other — in the good way.',
    detail: 'Mercury finds Mars\'s directness energizing rather than threatening, and Mars respects Mercury\'s ability to think clearly under pressure. You play board games competitively, debate current events without it turning personal, and plan projects together with an efficiency that comes from combining strategic thinking with the willingness to act. Both people feel sharper and more mentally alive in each other\'s company.'
  },

  // Mercury-Jupiter
  'Mercury-Jupiter|conjunction': {
    feel: 'Conversations expand into big ideas; you think larger together than either of you does alone.',
    detail: 'Jupiter amplifies Mercury\'s mind, creating a partnership where intellectual exploration feels limitless. The Mercury person feels that Jupiter gives their ideas scope and meaning, while Jupiter feels that Mercury gives their vision articulate form. Shared learning, travel, and philosophical discussion are natural expressions. The risk is all talk and no follow-through, or inflating ideas past the point of practical application. Grounding the vision in action keeps this conjunction productive.'
  },
  'Mercury-Jupiter|opposition': {
    feel: 'Different intellectual scales; one thinks in details while the other thinks in grand themes.',
    detail: 'Mercury focuses on specifics and Jupiter focuses on meaning, creating a tension between precision and vision. The Mercury person feels that Jupiter is vague or overreaching; Jupiter feels that Mercury misses the forest for the trees. The opposition works beautifully when both people respect what the other brings. Mercury provides the facts; Jupiter provides the framework. Without that mutual respect, every conversation becomes a debate about scope.'
  },
  'Mercury-Jupiter|trine': {
    feel: 'Natural intellectual harmony; big ideas and clear thinking reinforce each other effortlessly.',
    detail: 'Mercury and Jupiter flow together to create a partnership rich in shared learning, philosophical alignment, and expansive conversation. The Mercury person feels that Jupiter makes their mind bolder, and Jupiter feels that Mercury makes their vision more precise. Teaching each other, traveling together, and exploring new subjects are the best expressions of this trine. It sustains long-term intellectual companionship that keeps both people growing.'
  },
  'Mercury-Jupiter|square': {
    feel: 'Intellectual restlessness; you push each other\'s thinking but often past the point of usefulness.',
    detail: 'Jupiter inflates Mercury\'s ideas into impractical territory, and Mercury deflates Jupiter\'s vision with excessive criticism or detail. Disagreements about beliefs, education, or the right way to think about problems are recurring themes. The square generates intellectual energy that must be channeled into projects, study, or shared goals to avoid becoming mere friction. Both people benefit from learning when to think big and when to think precisely.'
  },
  'Mercury-Jupiter|sextile': {
    feel: 'Conversations between you have a way of going somewhere genuinely interesting.',
    detail: 'Mercury feels that Jupiter stretches their thinking without making them feel small, and Jupiter appreciates that Mercury can take a grand idea and test it against concrete reality without deflating it. You learn well together — sharing books, taking a class, comparing notes after a documentary. The intellectual life of the relationship stays healthy because both people are genuinely curious and neither insists on being the smart one.'
  },

  // Mercury-Saturn
  'Mercury-Saturn|conjunction': {
    feel: 'Communication takes on weight and seriousness; every word feels consequential.',
    detail: 'Saturn sits on Mercury\'s mind, adding discipline, depth, and sometimes heaviness to how the couple communicates. The Mercury person may feel that their ideas are constantly being tested or corrected by Saturn, while Saturn feels that Mercury needs more rigor. At its best this conjunction produces extraordinarily thoughtful communication and shared intellectual projects of real substance. At its worst, Mercury feels silenced and Saturn feels intellectually superior.'
  },
  'Mercury-Saturn|opposition': {
    feel: 'One person speaks freely while the other edits; the dynamic feels like teacher and student.',
    detail: 'Mercury and Saturn face off across a communication axis where one person\'s openness meets the other\'s restraint. The Mercury person feels judged or intellectually inadequate; Saturn feels that Mercury is careless with words or ideas. The opposition recreates authority dynamics around knowledge and expression. It works when Saturn shares its wisdom without condescension and Mercury respects Saturn\'s depth without feeling diminished by it.'
  },
  'Mercury-Saturn|trine': {
    feel: 'Mature, productive communication and shared respect for careful thinking.',
    detail: 'Saturn supports Mercury\'s mind with structure and seriousness that enhances rather than suppresses. The Mercury person feels that Saturn helps them think more clearly and express ideas with greater precision. Saturn feels that Mercury provides intellectual companionship worthy of genuine investment. This trine is excellent for partnerships that involve shared work, planning, or any endeavor requiring sustained mental effort.'
  },
  'Mercury-Saturn|square': {
    feel: 'Communication feels restricted; one person\'s ideas are perpetually met with skepticism or criticism.',
    detail: 'Saturn blocks or criticizes Mercury\'s expression, creating a pattern where the Mercury person feels intellectually stifled or afraid to speak freely. Saturn feels that Mercury is undisciplined or superficial. Conversations become guarded, and important things go unsaid to avoid criticism. The square demands that Saturn examine whether its corrections are genuine wisdom or control, and that Mercury develop enough confidence to speak even when judged.'
  },
  'Mercury-Saturn|sextile': {
    feel: 'You help each other think more carefully and communicate more clearly.',
    detail: 'Mercury gains depth and precision from Saturn — the ideas become more rigorous, the arguments tighter, the plans more realistic. Saturn gains flexibility and lightness from Mercury — the rules become less rigid, the perspective broader, the willingness to reconsider stronger. Communication between you improves year over year as each person absorbs the other\'s strengths. You plan well together, and the plans tend to work.'
  },

  // Mercury-Pluto
  'Mercury-Pluto|conjunction': {
    feel: 'Conversations go deep immediately; surface talk is impossible between you.',
    detail: 'Pluto transforms Mercury\'s mind, creating a connection where both people are drawn to uncover hidden truths, psychological patterns, and unspoken realities. The Mercury person feels that Pluto sees through their words to their real meaning, while Pluto feels that Mercury can articulate what they keep buried. The bond thrives on honesty and shared investigation. It becomes toxic when Pluto uses psychological insight as leverage or when Mercury feels mentally dominated.'
  },
  'Mercury-Pluto|opposition': {
    feel: 'An intellectual power struggle where both people probe for the truth the other is hiding.',
    detail: 'Mercury and Pluto face each other across an axis of disclosure and concealment. The Mercury person feels interrogated by Pluto\'s intensity; Pluto feels that Mercury deflects with logic or humor to avoid going deep. Conversations about trust, secrets, and the real motivations behind behavior dominate. The opposition works when both people use their investigative gifts to understand rather than control each other. It fails when knowledge becomes a weapon.'
  },
  'Mercury-Pluto|trine': {
    feel: 'Natural depth in conversation; you trust each other with your most private thoughts.',
    detail: 'Pluto supports Mercury\'s mind with penetrating insight that enhances rather than threatens. The Mercury person feels that Pluto helps them understand things they couldn\'t access alone, and Pluto feels that Mercury provides safe, articulate space for their intensity. Shared research, psychological exploration, and conversations about taboo or hidden subjects strengthen the bond. This trine creates intellectual intimacy of unusual depth and staying power.'
  },
  'Mercury-Pluto|square': {
    feel: 'Mental intensity that borders on obsession; conversations become interrogations without warning.',
    detail: 'Pluto pressures Mercury\'s mind at points of vulnerability, creating conversations that feel invasive or psychologically threatening. The Mercury person may feel that Pluto twists their words or reads malicious intent where none exists. Pluto feels that Mercury is evasive or dishonest. The square forces both people to examine their own tendencies toward mental manipulation. When both develop genuine transparency, the depth of understanding becomes the relationship\'s greatest asset.'
  },
  'Mercury-Pluto|sextile': {
    feel: 'Conversations between you have a way of going deeper than either of you planned.',
    detail: 'Mercury feels that Pluto adds a layer of psychological richness to their thinking — observations become insights, gossip becomes analysis, and idle curiosity becomes genuine investigation. Pluto feels that Mercury gives them a safe outlet for thoughts that would overwhelm most people. As trust builds, both people share more of their inner world. You bond over mysteries, psychology, true crime, research rabbit holes, and late-night conversations about what people really mean beneath what they say.'
  },

  // Venus-Jupiter
  'Venus-Jupiter|conjunction': {
    feel: 'Love feels abundant and generous; together you create an atmosphere of joy and indulgence.',
    detail: 'Jupiter amplifies Venus\'s capacity for pleasure, affection, and aesthetic enjoyment, creating a relationship that feels like a celebration. The Venus person feels adored and spoiled; Jupiter feels that Venus makes life worth enjoying. Generosity flows naturally in both directions. The risk is excess in all its forms: overspending, overcommitting, or avoiding difficult conversations because things feel too good to disrupt. Reality eventually intrudes, and the couple that can handle it thrives.'
  },
  'Venus-Jupiter|opposition': {
    feel: 'Grand romantic gestures and inflated expectations; the love is real but the promises may exceed capacity.',
    detail: 'Venus and Jupiter face each other across an axis of desire and expansion, creating a dynamic where both people promise more than they can deliver. The Venus person feels alternately cherished and disappointed; Jupiter feels that Venus never appreciates the big picture. Disagreements about money, lifestyle, and how much is enough are common. The opposition works when both people calibrate generosity to reality. It fails when love becomes a competition of who gives more.'
  },
  'Venus-Jupiter|trine': {
    feel: 'Effortless enjoyment together; shared pleasures and values align beautifully.',
    detail: 'Venus and Jupiter in trine create one of the most pleasant aspects to live with. Shared taste, generosity, and optimism flow naturally. The Venus person feels that Jupiter expands their capacity for joy, and Jupiter feels that Venus adds beauty and grace to their vision. Social life, travel, and cultural experiences together are especially rewarding. The ease of this trine is genuine, though it benefits from being directed toward something meaningful rather than purely comfortable.'
  },
  'Venus-Jupiter|square': {
    feel: 'Too much of a good thing; love and generosity inflate past what the relationship can sustain.',
    detail: 'Jupiter overinflates Venus\'s desires, creating expectations that no real relationship can consistently meet. The Venus person wants more romance, more beauty, more pleasure than Jupiter can provide, while Jupiter promises more than it can deliver. Financial excess and lifestyle disagreements are common. The square requires both people to find genuine contentment within realistic bounds. Unchecked, it produces a cycle of indulgence and disappointment.'
  },
  'Venus-Jupiter|sextile': {
    feel: 'Being together feels genuinely good on a daily basis.',
    detail: 'Venus feels that Jupiter makes life larger and more interesting without making it chaotic, and Jupiter feels that Venus makes it warmer and more beautiful without making it shallow. You are good at shared meals, cultural outings, and small acts of generosity that accumulate into a relationship both people genuinely enjoy. Neither person has to perform happiness around the other — the pleasure is real, consistent, and grounded in specific shared experiences rather than vague good vibes.'
  },

  // Venus-Uranus
  'Venus-Uranus|conjunction': {
    feel: 'Instant, electric attraction that defies your usual type and breaks your usual patterns.',
    detail: 'Uranus electrifies Venus\'s experience of love and attraction, creating a bond that feels thrilling, unconventional, and unpredictable. The Venus person is drawn to something in Uranus that they cannot fully explain or control. Uranus feels that Venus appreciates their uniqueness without trying to normalize it. The relationship often starts suddenly and intensely. The challenge is sustaining the connection when the initial electricity settles into daily life. Freedom within commitment is the key.'
  },
  'Venus-Uranus|opposition': {
    feel: 'Attraction and instability alternate; you want closeness but the connection keeps shifting.',
    detail: 'Venus craves consistency in love while Uranus insists on freedom, creating a push-pull dynamic where closeness triggers withdrawal and distance triggers pursuit. The Venus person feels that Uranus is emotionally unreliable; Uranus feels that Venus is possessive or conventional. The opposition demands that both people redefine what commitment means. It can work beautifully in relationships with unconventional structures, but it fails when either person pretends to want something they don\'t.'
  },
  'Venus-Uranus|trine': {
    feel: 'Love feels free and exciting without the instability; you appreciate each other\'s uniqueness naturally.',
    detail: 'Uranus supports Venus\'s capacity for love with stimulation and genuine respect for individuality. The Venus person feels that Uranus keeps the relationship fresh and prevents romantic stagnation. Uranus feels that Venus appreciates their eccentricity as attractive rather than threatening. This trine favors relationships with an unconventional element that both people genuinely enjoy, whether that involves unusual living arrangements, creative collaboration, or simply refusing to be boring.'
  },
  'Venus-Uranus|square': {
    feel: 'Disruptive attraction; the relationship oscillates between exciting and destabilizing.',
    detail: 'Uranus destabilizes Venus\'s sense of romantic security through unpredictable behavior, sudden changes in availability, or attraction to other people. The Venus person feels that they can never fully relax into the love; Uranus feels that Venus\'s need for stability is suffocating. Breakups and reconciliations are common. The square demands radical honesty about what both people actually need from love and whether those needs are compatible. Pretending otherwise extends the pain.'
  },
  'Venus-Uranus|sextile': {
    feel: 'The romance between you keeps evolving instead of settling into a script.',
    detail: 'Venus finds Uranus refreshingly different — the date ideas are unexpected, the gifts are surprising, and the way Uranus approaches love defies the cliches. Uranus appreciates that Venus is genuinely open to trying new things rather than demanding the conventional romance playbook. You stay interesting to each other by maintaining individual interests, experimenting together, and allowing the relationship itself to change shape as both people grow.'
  },

  // Mars-Uranus
  'Mars-Uranus|conjunction': {
    feel: 'Explosive, unpredictable energy; together you are a force of sudden, decisive action.',
    detail: 'Uranus electrifies Mars\'s drive, creating a partnership defined by impulsive action, excitement, and volatility. The Mars person feels supercharged and unpredictable around Uranus; Uranus feels that Mars gives their revolutionary impulses physical force. Together you take risks neither would take alone. The danger is recklessness, sudden anger, and accidents caused by acting before thinking. This conjunction needs a constructive outlet or the energy turns destructive through sheer excess.'
  },
  'Mars-Uranus|opposition': {
    feel: 'One person acts while the other disrupts; the timing between you is chronically off.',
    detail: 'Mars and Uranus face each other across an axis of action and rebellion, creating a dynamic where one person\'s initiative is undermined by the other\'s unpredictability. The Mars person feels that Uranus sabotages their plans; Uranus feels that Mars is too forceful or conventional. The opposition generates enormous restless energy that can power remarkable shared achievements when directed or produce spectacular conflicts when undirected. Clear agreements about shared goals channel this aspect productively.'
  },
  'Mars-Uranus|trine': {
    feel: 'Exhilarating shared energy; you take bold action together and inspire each other\'s courage.',
    detail: 'Mars and Uranus flow together to create a partnership that excels at taking decisive, unconventional action. The Mars person feels that Uranus provides brilliant, unexpected strategies, and Uranus feels that Mars provides the courage to execute them. Physical activities, adventures, and shared projects that require both boldness and innovation bring out the best in this trine. The energy is exciting without being destabilizing.'
  },
  'Mars-Uranus|square': {
    feel: 'Volatile energy that erupts without warning; arguments and accidents are both common.',
    detail: 'Uranus destabilizes Mars\'s drive through sudden disruptions, provocative behavior, or refusal to cooperate with plans. The Mars person feels chronically frustrated; Uranus feels that Mars is controlling or aggressive. Conflicts escalate rapidly and unpredictably. The square demands that both people develop awareness of their triggers and agree to cooling-off protocols before the energy spirals. Physical outlets for the tension are not optional; they are essential safety valves.'
  },
  'Mars-Uranus|sextile': {
    feel: 'You bring out each other\'s appetite for adventure and unconventional action.',
    detail: 'Mars feels that Uranus makes their actions more creative and less predictable, and Uranus appreciates that Mars is willing to actually do the bold thing rather than just theorize about it. You try new sports, take spontaneous trips, and tackle problems with an improvisational energy that makes the relationship feel alive. Neither person gets bored easily around the other, and the shared experiments tend to produce stories you tell for years.'
  },

  // Mars-Neptune
  'Mars-Neptune|conjunction': {
    feel: 'Desire and fantasy merge; passion is dreamlike, consuming, and not entirely grounded in reality.',
    detail: 'Neptune dissolves Mars\'s directness, creating a dynamic where action is inspired by imagination, compassion, or illusion. The Mars person feels that their drive becomes diffused or spiritualized around Neptune; Neptune feels that Mars gives their fantasies physical form. Sexual chemistry is highly imaginative and potentially transcendent. The danger is that Mars cannot act clearly when Neptune clouds the motivation, leading to passive-aggression, deception, or misdirected energy. Honesty about intentions is the essential discipline.'
  },
  'Mars-Neptune|opposition': {
    feel: 'One person pursues while the other dissolves; desire and evasion are locked in a frustrating dance.',
    detail: 'Mars drives forward while Neptune retreats into ambiguity, creating a dynamic where direct action is met with confusion or avoidance. The Mars person feels that Neptune is dishonest, elusive, or passive; Neptune feels that Mars is too aggressive and insensitive to subtlety. Sexual dynamics may involve fantasy projection or unspoken disappointment. The opposition demands that both people be explicit about what they want. Mars must accept that not everything can be forced, and Neptune must stop hiding behind vagueness when directness is needed.'
  },
  'Mars-Neptune|trine': {
    feel: 'Passion is inspired and gentle; desire flows through imagination, creativity, and compassion.',
    detail: 'Mars and Neptune operate in natural harmony, allowing passion and sensitivity to coexist without friction. The Mars person feels that Neptune adds beauty and meaning to their drive, and Neptune feels that Mars provides the courage to manifest their visions. Sexual connection has a tender, almost spiritual quality. Creative collaboration is especially powerful. This trine supports a partnership where both people feel that desire serves something larger than appetite.'
  },
  'Mars-Neptune|square': {
    feel: 'Desire is confused by fantasy; what you want and what you actually pursue keep diverging.',
    detail: 'Neptune undermines Mars\'s ability to act clearly, creating chronic confusion about what both people actually want from each other and from the relationship. The Mars person feels misled or energetically drained; Neptune feels that Mars is crude or misunderstands their intentions. Passive-aggression, martyr dynamics, and sexual misunderstanding are common expressions. The square requires radical honesty about desire and motivation. What feels like spiritual surrender may actually be avoidance, and what feels like directness may actually be insensitivity.'
  },
  'Mars-Neptune|sextile': {
    feel: 'You bring out each other\'s idealism without losing your grip on the practical.',
    detail: 'Mars feels that Neptune gives their drive a compassionate direction — ambition stops being purely self-serving and starts meaning something. Neptune feels that Mars actually does the thing they have been dreaming about, turning vision into reality. You work well together on creative projects, charitable efforts, and anything that combines physical effort with a sense of purpose. The inspiration between you is genuine, and it stays grounded enough to produce results.'
  },

  // Mars-Pluto
  'Mars-Pluto|conjunction': {
    feel: 'Raw, primal intensity; the combination of willpower is either unstoppable or mutually annihilating.',
    detail: 'Mars and Pluto fuse their drives, creating a partnership defined by extreme ambition, sexual intensity, and power. The Mars person feels supercharged but also controlled; Pluto feels both empowered and threatened by Mars\'s directness. Together they can move mountains or destroy each other trying. Physical and sexual energy is off the charts. This conjunction demands absolute honesty about power dynamics. If either person uses force — physical, emotional, or psychological — the damage is severe and lasting.'
  },
  'Mars-Pluto|opposition': {
    feel: 'A confrontation of raw wills; dominance and submission are constant undercurrents.',
    detail: 'Mars and Pluto face off in a power dynamic that affects every dimension of the relationship — sex, money, decisions, and daily life. The Mars person feels that Pluto manipulates from the shadows; Pluto feels that Mars is blunt and unstrategic. The opposition demands that both people examine their relationship to power honestly. Competition and control battles are inevitable without conscious effort. When both people can own their aggression without projecting, this aspect produces a partnership of extraordinary shared force.'
  },
  'Mars-Pluto|trine': {
    feel: 'Effortless shared power; you amplify each other\'s strength and ambition without the destructive edge.',
    detail: 'Mars\'s drive flows naturally into Pluto\'s depth, creating a partnership with unusual reserves of energy, resilience, and strategic capability. The Mars person feels empowered rather than controlled by Pluto, and Pluto feels that Mars is a worthy ally rather than a threat. Sexual compatibility is intense and sustaining. This trine is exceptional for partnerships that face real adversity — both people bring courage and staying power that compounds rather than cancels.'
  },
  'Mars-Pluto|square': {
    feel: 'Explosive power dynamics; the intensity is addictive and the conflicts can become dangerous.',
    detail: 'Mars and Pluto in square create the most volatile power dynamic in synastry. Both people feel compelled to dominate, and neither backs down easily. Sexual intensity is extreme but can blur into aggression. Control battles escalate rapidly and can become physically or psychologically unsafe if boundaries are not maintained. This square demands more self-awareness than most people have at the start of a relationship. Professional support is not optional — it is necessary. The transformation potential is real, but so is the destruction potential.'
  },
  'Mars-Pluto|sextile': {
    feel: 'You strengthen each other\'s capacity to act with purpose and intensity.',
    detail: 'Mars feels that Pluto helps them focus — the scattered energy narrows into a laser when Pluto is involved, and the things that get done actually matter. Pluto feels that Mars gives them the courage to act on convictions they might otherwise keep hidden. You train together, strategize together, and face difficult situations as a unit with a combined force that surprises people who know you individually. The shared intensity stays productive because neither person has to dominate the other to feel powerful.'
  },

  // Mercury-Neptune
  'Mercury-Neptune|conjunction': {
    feel: 'Minds dissolve into each other; words become unnecessary.',
    detail: 'Mercury\'s rational mind merges with Neptune\'s boundless imagination, creating an almost telepathic quality to communication. The Mercury person finds their thinking expanded into poetic and intuitive territory, while Neptune feels finally understood without having to explain the inexplicable. The danger is mutual deception or confused communication where both people hear what they want to hear rather than what was actually said. Clarity requires deliberate effort here.'
  },
  'Mercury-Neptune|opposition': {
    feel: 'One speaks in facts, the other in dreams; translation is constant.',
    detail: 'Mercury\'s need for clear information confronts Neptune\'s preference for ambiguity and nuance. The Mercury person may feel that Neptune is evasive or dishonest, while Neptune feels that Mercury\'s literalism misses the deeper truth. This opposition can produce beautiful creative collaboration if both people accept that reality has more than one language. Without that acceptance, misunderstandings and feelings of being deceived become chronic.'
  },
  'Mercury-Neptune|trine': {
    feel: 'Imaginative conversations that wander into shared wonder.',
    detail: 'Mercury\'s intellect flows naturally into Neptune\'s visionary waters, creating a partnership rich in creative exchange, spiritual conversation, and intuitive understanding. The Mercury person finds their thinking enriched by Neptune\'s imagination without losing clarity, and Neptune feels that Mercury gives their visions articulate form. This trine is exceptional for artistic collaboration, shared spiritual practice, or any endeavor where logic and intuition must work together.'
  },
  'Mercury-Neptune|square': {
    feel: 'Beautiful confusion; what was said and what was heard rarely match.',
    detail: 'Mercury and Neptune in square create persistent miscommunication that both people find baffling. The Mercury person feels they spoke clearly, but Neptune heard something entirely different. Neptune feels their meaning is obvious, but Mercury cannot grasp it. Deception is possible but more often the issue is genuinely different modes of processing information. Important agreements should always be written down and confirmed. This square requires patience and a willingness to say "let me make sure I understand you correctly" often.'
  },
  'Mercury-Neptune|sextile': {
    feel: 'Conversations between you have a poetic quality that neither person achieves alone.',
    detail: 'Mercury finds that Neptune adds depth and nuance to their thinking — observations become metaphors, analysis softens into empathy, and ordinary language reaches toward something more beautiful. Neptune appreciates that Mercury can articulate the subtle feelings they usually cannot put into words. You bond over music, film, poetry, and shared creative projects. The imaginative richness of your dialogue is genuine and stays grounded enough to enrich your actual lives rather than floating away into fantasy.'
  },

  // Mercury-Uranus
  'Mercury-Uranus|conjunction': {
    feel: 'Electric minds sparking off each other at lightning speed.',
    detail: 'Mercury and Uranus fuse into a connection defined by intellectual excitement and rapid-fire exchange. The Mercury person feels their thinking accelerated and liberated by Uranus, while Uranus finds Mercury quick enough to keep up. Conversations leap from topic to topic, and both people feel genuinely stimulated. The risk is mental restlessness and an inability to slow down for emotional processing. Not everything needs to be brilliant — sometimes it just needs to be felt.'
  },
  'Mercury-Uranus|opposition': {
    feel: 'Radical disagreements that crack open new ways of thinking.',
    detail: 'Mercury\'s established thought patterns are disrupted by Uranus\'s contrarian perspective, and Uranus feels that Mercury\'s conventional logic misses the revolutionary truth. This opposition creates exhilarating debate but can also produce stubborn intellectual standoffs where neither person will concede. At its best, each person genuinely changes how the other thinks. At its worst, both people feel the other is being deliberately provocative or obtuse.'
  },
  'Mercury-Uranus|trine': {
    feel: 'Shared brilliance; ideas flow freely and surprise delights rather than destabilizes.',
    detail: 'Mercury\'s mind harmonizes naturally with Uranus\'s inventiveness, creating a partnership where original thinking is the norm. Conversations are stimulating without being combative, and both people feel intellectually free. The Mercury person\'s ideas are enhanced by Uranus\'s unconventional angle, and Uranus appreciates Mercury\'s ability to develop their flashes of insight into something communicable. This trine is exceptional for any partnership involving innovation, technology, or reform.'
  },
  'Mercury-Uranus|square': {
    feel: 'Mental disruption; one person\'s insight is the other\'s chaos.',
    detail: 'Uranus continually upends Mercury\'s thinking in ways that feel exciting at first but become destabilizing. The Mercury person may feel they can never finish a thought before Uranus introduces something that invalidates it. Uranus feels that Mercury is too attached to conventional reasoning. This square produces genuine intellectual growth but the process is uncomfortable. Both people need to learn that being right matters less than being understood.'
  },
  'Mercury-Uranus|sextile': {
    feel: 'You make each other cleverer — conversations spark ideas neither of you would have alone.',
    detail: 'Mercury feels that Uranus cracks open their thinking in unexpected directions, and Uranus appreciates that Mercury is quick enough to keep up and articulate enough to develop the flash of insight into something usable. You are good at brainstorming together, solving problems from unusual angles, and sharing the kind of intellectual excitement that makes both people feel genuinely smarter for having spent the afternoon talking. The stimulation stays enjoyable because neither person feels the need to one-up the other.'
  },

  // Mercury-Chiron
  'Mercury-Chiron|conjunction': {
    feel: 'Words that touch the wound; conversations that heal or reopen old pain.',
    detail: 'Mercury lands directly on Chiron\'s deepest vulnerability, which means communication between these two people carries unusual weight. The Mercury person may inadvertently say things that trigger Chiron\'s core wound around self-expression, intelligence, or being heard. Equally, Chiron teaches Mercury something profound about the limits of intellect and the power of compassionate speech. This conjunction can produce deeply healing dialogue once both people understand the sensitivity involved.'
  },
  'Mercury-Chiron|opposition': {
    feel: 'The mind confronts what it cannot fix; words expose vulnerability.',
    detail: 'Mercury\'s rational approach faces Chiron\'s wound from across the chart, creating a dynamic where one person\'s attempts to communicate or solve problems inadvertently highlight the other\'s deepest insecurity. The Mercury person may feel that Chiron is too sensitive, while Chiron feels that Mercury intellectualizes pain rather than witnessing it. Growth comes when Mercury learns that some things cannot be explained away, and Chiron learns that articulating pain can itself be medicine.'
  },
  'Mercury-Chiron|trine': {
    feel: 'Healing through understanding; words become medicine.',
    detail: 'Mercury\'s communication flows naturally toward Chiron\'s wound in a way that soothes rather than aggravates. The Mercury person intuitively knows how to speak to the Chiron person\'s vulnerability, and Chiron helps Mercury access deeper wisdom beyond mere cleverness. This trine often appears in partnerships where one or both people work in healing, teaching, or counseling. Conversations have a naturally therapeutic quality.'
  },
  'Mercury-Chiron|square': {
    feel: 'Accidental cruelty through careless words; the tongue finds the bruise.',
    detail: 'Mercury\'s communication style clashes with Chiron\'s wound in a way that creates recurring hurt. The Mercury person says things that land on Chiron\'s most sensitive spot, often without realizing it. Chiron may withdraw from communication or become defensive in ways Mercury finds confusing. This square requires the Mercury person to develop real sensitivity about word choice, and the Chiron person to communicate their boundaries rather than expecting the other to intuit them.'
  },
  'Mercury-Chiron|sextile': {
    feel: 'You discuss difficult things with unusual care and precision.',
    detail: 'Mercury finds that Chiron deepens their understanding of pain in a way that makes their communication more compassionate and less glib. Chiron feels that Mercury gives them words for experiences they have carried silently — naming the hurt, the pattern, the thing nobody else could articulate. You talk about hard subjects with a care that does not feel forced. The conversations that matter most in this relationship are the ones where both people find language for what usually resists being spoken.'
  },

  // Venus-Chiron
  'Venus-Chiron|conjunction': {
    feel: 'Love lands on the wound; devotion and vulnerability are inseparable.',
    detail: 'Venus arrives at the exact point of Chiron\'s deepest hurt around love, worthiness, and belonging. The Venus person\'s affection simultaneously heals and reopens Chiron\'s wound — being loved by Venus is both the medicine and the reminder of every time love was not enough. Chiron teaches Venus that real love requires witnessing pain without trying to fix it. This conjunction creates profound intimacy but demands that both people are willing to be genuinely vulnerable.'
  },
  'Venus-Chiron|opposition': {
    feel: 'What one offers as love, the other receives as a reminder of lack.',
    detail: 'Venus\'s expression of affection confronts Chiron\'s wound from across the chart, creating a painful dynamic where love triggers rather than heals. The Venus person may feel that nothing they offer is enough, while Chiron feels that Venus\'s love highlights everything they believe they don\'t deserve. This opposition requires both people to examine their assumptions about worthiness. When navigated with maturity, it produces a love that has genuinely reckoned with imperfection.'
  },
  'Venus-Chiron|trine': {
    feel: 'Love as balm; affection flows naturally toward the place that needs it most.',
    detail: 'Venus\'s warmth reaches Chiron\'s wound without effort, creating a partnership where the Chiron person feels genuinely valued and the Venus person feels that their love matters deeply. This trine often indicates a relationship where both people feel that being together has healed something in them. The Venus person may not even realize how significant their simple presence is to the Chiron person\'s sense of self-worth.'
  },
  'Venus-Chiron|square': {
    feel: 'Love that hurts; affection and rejection become tangled.',
    detail: 'Venus\'s way of expressing love clashes with Chiron\'s wound, creating a pattern where affection is offered in a form that the Chiron person cannot receive, or is received as a reminder of inadequacy. The Venus person may feel rejected despite their best efforts, while Chiron feels that Venus doesn\'t understand their real needs. This square demands that both people learn new languages of love rather than insisting on their native one.'
  },
  'Venus-Chiron|sextile': {
    feel: 'Tender awareness of each other\'s soft spots; love given with care.',
    detail: 'Venus knows exactly how to touch the Chiron person\'s sore spot without pressing on it -- a compliment that lands on the right insecurity, a gesture of affection timed to the moment Chiron most needs it. In return, Chiron teaches Venus something about love that flattery and charm cannot reach: that the most meaningful tenderness is the kind offered to someone who is not performing their best self. Over time, Venus becomes a gentler lover and Chiron becomes someone who can actually receive kindness without flinching.'
  },

  // Mars-Chiron
  'Mars-Chiron|conjunction': {
    feel: 'Action meets the open wound; assertion and vulnerability collide.',
    detail: 'Mars\'s direct energy lands on Chiron\'s most sensitive point, creating a dynamic where the Mars person\'s natural assertiveness triggers Chiron\'s wound around agency, anger, or the right to take up space. The Mars person may feel that Chiron is overly fragile, while Chiron feels that Mars is careless with their force. When handled with awareness, Mars can help Chiron reclaim their own power, and Chiron can teach Mars that real strength includes restraint.'
  },
  'Mars-Chiron|opposition': {
    feel: 'One person\'s strength exposes the other\'s deepest weakness.',
    detail: 'Mars and Chiron face off across the chart, creating a polarized dynamic around power and vulnerability. The Mars person\'s assertiveness may feel aggressive to Chiron, triggering old experiences of being overpowered or dismissed. Chiron\'s vulnerability may feel like weakness to Mars, who doesn\'t understand why action isn\'t the solution. Growth requires Mars to develop patience with pain that cannot simply be overcome by willpower, and Chiron to recognize that Mars\'s directness is not the same as the original wound.'
  },
  'Mars-Chiron|trine': {
    feel: 'Strength in service of healing; courage flows toward what hurts.',
    detail: 'Mars\'s energy harmonizes with Chiron\'s wound in a way that empowers rather than overwhelms. The Mars person naturally helps the Chiron person take action on things they\'ve been afraid to confront, and Chiron gives Mars a sense of purpose beyond mere ambition. This trine often appears in partnerships where both people become braver together, tackling challenges that neither could face alone. Physical activity, shared goals, and constructive conflict resolution come naturally.'
  },
  'Mars-Chiron|square': {
    feel: 'The fighter and the wound clash; aggression triggers old pain.',
    detail: 'Mars\'s way of taking action clashes with Chiron\'s vulnerability, creating conflicts that escalate beyond what the situation warrants because they are activating much older material. The Mars person may feel that Chiron shuts them down or makes them the villain, while Chiron feels that Mars bulldozes through their pain. This square requires both people to slow down during conflict and ask whether the intensity matches the actual disagreement, or whether something older has been activated.'
  },
  'Mars-Chiron|sextile': {
    feel: 'Gentle courage; you help each other face what\'s difficult.',
    detail: 'The Mars person knows when to push the Chiron person toward something scary and when to back off -- their timing with encouragement is unusually good, because they can feel the difference between hesitation that needs a nudge and a wound that needs space. Chiron, meanwhile, gives Mars something rare: an understanding that real courage is not the absence of fear but the willingness to act while fully aware of what could go wrong. Together they tackle difficult conversations and hard decisions that neither would face as readily alone.'
  },

  // Jupiter-Saturn
  'Jupiter-Saturn|conjunction': {
    feel: 'Expansion meets restriction; vision and discipline forge something lasting.',
    detail: 'Jupiter\'s optimism and Saturn\'s caution meet at the same point, creating a partnership that balances ambition with realism. The Jupiter person provides vision and faith, while Saturn supplies structure and follow-through. When this works well, both people build something neither could achieve alone. When it doesn\'t, Jupiter feels constantly restrained and Saturn feels that Jupiter is reckless and unreliable. The conjunction demands mutual respect for fundamentally different approaches to risk.'
  },
  'Jupiter-Saturn|opposition': {
    feel: 'The optimist and the realist face off; faith versus evidence.',
    detail: 'Jupiter and Saturn oppose each other, creating a tug of war between expansion and contraction. The Jupiter person wants to grow, spend, take risks, and believe, while the Saturn person wants to conserve, plan, and prepare for the worst. This opposition can produce excellent balance in practical matters if both people value what the other brings. Without that respect, Jupiter feels imprisoned and Saturn feels endangered by Jupiter\'s optimism.'
  },
  'Jupiter-Saturn|trine': {
    feel: 'Measured growth; ambition that knows its own timing.',
    detail: 'Jupiter\'s expansive vision flows naturally into Saturn\'s capacity for patient execution, creating a partnership with unusual ability to plan well and follow through. The Jupiter person\'s ideas find structure and form through Saturn\'s discipline, and Saturn\'s careful approach is energized by Jupiter\'s faith. This trine is exceptional for business partnerships, long-term planning, and any endeavor requiring both vision and endurance.'
  },
  'Jupiter-Saturn|square': {
    feel: 'Growth and limitation at war; too much caution or too much risk.',
    detail: 'Jupiter\'s desire to expand clashes with Saturn\'s need for control and security, creating ongoing tension about pace, risk, and priorities. The Jupiter person feels that Saturn blocks every opportunity, while Saturn feels that Jupiter is irresponsible and naive. This square forces both people to refine their approach — Jupiter must learn that not every opportunity is worth pursuing, and Saturn must learn that some risks are necessary for growth. Financial disagreements are common.'
  },
  'Jupiter-Saturn|sextile': {
    feel: 'Productive balance between faith and prudence.',
    detail: 'Jupiter comes up with the plan for the business, the trip, the five-year goal, and Saturn immediately knows which parts will actually work and which need rethinking -- and Jupiter does not experience this as criticism but as genuine help. Saturn, who tends to plan endlessly without starting, finds that Jupiter\'s confidence is contagious enough to get them moving. You are the couple that actually follows through on the things you talk about over dinner, and the results tend to be both ambitious and solid.'
  },

  // Jupiter-Uranus
  'Jupiter-Uranus|conjunction': {
    feel: 'Lightning strikes gold; sudden expansion and radical possibility.',
    detail: 'Jupiter and Uranus combine their energies at the same degree, creating a partnership defined by unexpected opportunities, shared excitement about the future, and a mutual disdain for convention. Together these two people feel that anything is possible, and their combined energy can produce genuinely innovative results. The risk is instability — both planets resist routine, and the partnership may lack the patience for sustained effort.'
  },
  'Jupiter-Uranus|opposition': {
    feel: 'Competing visions of freedom; radical growth pulls in opposite directions.',
    detail: 'Jupiter\'s expansive philosophy opposes Uranus\'s revolutionary impulse, creating a dynamic where both people want change but disagree about its direction. The Jupiter person seeks growth through established channels — education, travel, spiritual practice — while Uranus wants to demolish the existing structure entirely. This opposition can produce extraordinary creative tension or an exhausting cycle of mutual disruption.'
  },
  'Jupiter-Uranus|trine': {
    feel: 'Shared genius; innovation flows naturally toward opportunity.',
    detail: 'Jupiter\'s vision harmonizes with Uranus\'s originality, creating a partnership with genuine capacity for breakthrough thinking and fortunate timing. Both people feel liberated by the other\'s presence, and ideas that seem wild to everyone else feel perfectly natural between them. This trine is exceptional for partnerships involving technology, reform, or any field where conventional thinking is a liability.'
  },
  'Jupiter-Uranus|square': {
    feel: 'Restless brilliance; too many ideas and not enough follow-through.',
    detail: 'Jupiter\'s desire for expansion clashes with Uranus\'s need for radical change, creating a partnership that generates enormous excitement but struggles with consistency. Every week brings a new plan, a new revelation, a new direction. Both people feed each other\'s restlessness, and neither is naturally inclined to slow down and consolidate. This square requires conscious effort to choose one path and walk it long enough to see results.'
  },
  'Jupiter-Uranus|sextile': {
    feel: 'Friendly innovation; you bring out each other\'s best ideas.',
    detail: 'Jupiter says "what if we tried this completely different approach" and Uranus, instead of rolling their eyes, immediately sees three ways to make it work -- and then improves on it. Conversations between you generate ideas at a rate that surprises both of you, and the ideas are good, not just exciting. You sign up for strange classes together, discover obscure interests in common, and tend to be the couple that friends come to when they need a creative solution to an unusual problem.'
  },

  // Jupiter-Neptune
  'Jupiter-Neptune|conjunction': {
    feel: 'Boundless shared faith; the dream expands beyond all limits.',
    detail: 'Jupiter and Neptune merge at the same degree, creating a partnership of extraordinary shared idealism, spiritual connection, and creative vision. Together these two people can imagine and believe in possibilities that others would dismiss as fantasy. The danger is equally extraordinary — mutual enabling, shared delusion, and a complete absence of practical grounding. This conjunction needs at least one strong Saturn contact elsewhere in the synastry to prevent both people from drifting into beautiful unreality.'
  },
  'Jupiter-Neptune|opposition': {
    feel: 'One person\'s faith is the other\'s fantasy; belief and illusion trade places.',
    detail: 'Jupiter\'s philosophical convictions confront Neptune\'s spiritual impressions from across the chart. The Jupiter person may see themselves as the voice of reason while viewing Neptune as deluded, or may feel that Neptune undermines their beliefs with vague mysticism. Neptune may feel that Jupiter is spiritually arrogant or that their faith lacks genuine surrender. This opposition demands humility from both people — truth is larger than either person\'s version of it.'
  },
  'Jupiter-Neptune|trine': {
    feel: 'Shared vision that uplifts both souls; faith and imagination in harmony.',
    detail: 'Jupiter\'s wisdom flows naturally into Neptune\'s spiritual depth, creating a partnership rich in shared meaning, creative inspiration, and genuine compassion. Both people feel that the other understands something essential about the nature of existence. This trine is exceptional for partnerships involving art, music, spiritual practice, or service to others. It provides a sense of shared purpose that transcends the mundane without losing touch with practical reality.'
  },
  'Jupiter-Neptune|square': {
    feel: 'Inflated dreams; mutual idealism without a reality check.',
    detail: 'Jupiter\'s optimism clashes with Neptune\'s boundlessness in a way that amplifies illusion rather than vision. Both people may encourage each other\'s least realistic tendencies — excessive spending, substance issues, spiritual bypassing, or simply believing things will work out without doing the necessary work. This square requires at least one person to serve as an anchor to reality. Financial and practical decisions should never be made in the glow of shared enthusiasm without sleeping on them first.'
  },
  'Jupiter-Neptune|sextile': {
    feel: 'Gentle shared idealism; faith and imagination support each other.',
    detail: 'You bring out each other\'s spiritual and creative depth in ways that stay tethered to something real. Jupiter helps Neptune articulate their visions clearly enough to act on them, and Neptune gives Jupiter\'s optimism a quality of genuine wonder rather than mere cheerfulness. You are the couple that volunteers together, prays or meditates together, or collaborates on a creative project that surprises you both with how meaningful it becomes. Shared faith between you is quiet and sincere rather than performative.'
  },

  // Jupiter-Pluto
  'Jupiter-Pluto|conjunction': {
    feel: 'Massive shared ambition; together you seek power on a grand scale.',
    detail: 'Jupiter and Pluto combine their forces at the same degree, creating a partnership with extraordinary drive for influence, wealth, and transformation. Both people feel that the other amplifies their capacity to achieve and acquire. The partnership can accomplish genuinely impressive things — but the desire for power must be tempered by ethical consideration. Without moral grounding, this conjunction can produce ruthless ambition that destroys as much as it builds.'
  },
  'Jupiter-Pluto|opposition': {
    feel: 'Competing claims to truth and power; philosophical intensity.',
    detail: 'Jupiter\'s beliefs confront Pluto\'s will to power from across the chart, creating a dynamic where each person feels the other is trying to dominate the narrative. The Jupiter person may use philosophy or morality to justify control, while Pluto uses psychological intensity to undermine Jupiter\'s convictions. This opposition can produce genuinely transformative dialogue about power, truth, and ethics — or an exhausting battle for ideological supremacy.'
  },
  'Jupiter-Pluto|trine': {
    feel: 'Empowered growth; transformation serves expansion and vice versa.',
    detail: 'Jupiter\'s vision flows naturally into Pluto\'s transformative depth, creating a partnership with unusual capacity for reinvention and achievement. The Jupiter person feels that Pluto gives their ambitions strategic depth, and Pluto feels that Jupiter provides moral purpose for their intensity. Together they can navigate complex situations with both wisdom and power. This trine is exceptional for business partnerships, shared research, or any endeavor requiring both vision and tenacity.'
  },
  'Jupiter-Pluto|square': {
    feel: 'Excess meets obsession; the hunger for more becomes consuming.',
    detail: 'Jupiter\'s expansiveness clashes with Pluto\'s compulsive intensity, creating a partnership that tends toward extremes. Both people may push each other toward greater ambition, acquisition, or control than either would pursue alone. Financial overreach, power struggles disguised as philosophical disagreements, and an inability to accept limitation are common. This square requires both people to ask regularly whether their shared goals serve genuine growth or merely appetite.'
  },
  'Jupiter-Pluto|sextile': {
    feel: 'Strategic vision; you strengthen each other\'s capacity for meaningful achievement.',
    detail: 'Jupiter\'s big-picture thinking meets Pluto\'s instinct for where the real leverage is, and together you make moves that are both bold and strategically precise. Pluto stops Jupiter from scattering their effort across too many projects, and Jupiter keeps Pluto from becoming so fixated on one obsession that they miss the larger opportunity. You tend to achieve more together than your individual track records would predict, because the combination of breadth and depth is genuinely rare.'
  },

  // Jupiter-Chiron
  'Jupiter-Chiron|conjunction': {
    feel: 'The wound becomes the teaching; meaning grows from suffering.',
    detail: 'Jupiter meets Chiron at the same degree, creating a partnership where one person\'s philosophical wisdom directly addresses the other\'s core wound. The Jupiter person may serve as teacher, guide, or source of meaning for the Chiron person, helping them find purpose in their pain. Chiron in turn deepens Jupiter\'s understanding beyond mere optimism into genuine wisdom earned through suffering. This conjunction often indicates a mentor-student quality to the relationship, even in romantic contexts.'
  },
  'Jupiter-Chiron|opposition': {
    feel: 'Excessive optimism confronts irreducible pain.',
    detail: 'Jupiter\'s faith opposes Chiron\'s wound, creating a dynamic where the Jupiter person may try to fix or philosophize away Chiron\'s suffering, and Chiron may feel that Jupiter\'s positivity is dismissive of real pain. The Jupiter person means well but their "everything happens for a reason" approach can feel like a minimization. Chiron may feel that Jupiter doesn\'t truly understand suffering. Growth comes when Jupiter learns that some pain must be witnessed rather than explained, and Chiron accepts that meaning is possible without the wound being resolved.'
  },
  'Jupiter-Chiron|trine': {
    feel: 'Grace in the wound; faith and vulnerability strengthen each other.',
    detail: 'Jupiter\'s wisdom flows naturally toward Chiron\'s tender place, creating a partnership where both people feel that their connection has a healing purpose. The Jupiter person provides hope and perspective without dismissing Chiron\'s pain, and Chiron gives Jupiter\'s philosophy the depth that only lived experience provides. This trine often indicates a relationship that both people describe as genuinely healing — not because the wound disappears, but because it becomes integrated into a larger story of meaning.'
  },
  'Jupiter-Chiron|square': {
    feel: 'Good intentions that miss the wound; help that doesn\'t help.',
    detail: 'Jupiter\'s expansive approach clashes with Chiron\'s vulnerability, creating situations where attempts to encourage or uplift land painfully wrong. The Jupiter person may offer advice, opportunities, or philosophical frameworks that Chiron experiences as tone-deaf or patronizing. Chiron may feel that Jupiter lacks the humility to truly sit with suffering. This square asks Jupiter to stop trying to fix and start learning to witness, and asks Chiron to receive good intentions even when the delivery is imperfect.'
  },
  'Jupiter-Chiron|sextile': {
    feel: 'Quiet encouragement toward wholeness; growth through gentle understanding.',
    detail: 'Jupiter has a way of reminding the Chiron person that their wound is not the whole story -- not by dismissing the pain, but by genuinely seeing the rest of who they are and reflecting it back. Chiron, in turn, gives Jupiter\'s philosophy some weight: the kind of wisdom that only comes from having been broken and rebuilt. You talk about hard things with a lightness that is not avoidance but genuine perspective, and both people leave those conversations feeling more whole than when they started.'
  },

  // Saturn-Uranus
  'Saturn-Uranus|conjunction': {
    feel: 'Order and chaos fused at a single point; structured rebellion.',
    detail: 'Saturn\'s need for structure meets Uranus\'s demand for freedom at the same degree, creating a partnership that embodies the tension between tradition and revolution. One person may represent the established order while the other pushes for radical change, or both may oscillate between these roles. When this conjunction works, it produces innovative structures and disciplined reform. When it doesn\'t, both people feel trapped in a cycle of control and rebellion that neither can resolve.'
  },
  'Saturn-Uranus|opposition': {
    feel: 'Freedom versus security; the rebel confronts the builder.',
    detail: 'Saturn and Uranus face off across the chart, creating a fundamental tension between stability and change. The Saturn person needs commitment, routine, and clear expectations; the Uranus person needs space, novelty, and the freedom to reinvent. This opposition often produces a relationship where one person is always trying to lock things down while the other is trying to break free. Resolution requires both people to stop identifying exclusively with one pole and acknowledge their own need for both structure and freedom.'
  },
  'Saturn-Uranus|trine': {
    feel: 'Progressive stability; change happens within a structure that holds.',
    detail: 'Saturn\'s discipline harmonizes with Uranus\'s innovation, creating a partnership that can implement change without losing what already works. The Saturn person provides the patience and framework that Uranus\'s ideas need to become real, and Uranus prevents Saturn from becoming rigid and fearful of the future. This trine is exceptional for partnerships navigating periods of change — career transitions, relocation, or any situation requiring both courage and careful planning.'
  },
  'Saturn-Uranus|square': {
    feel: 'Chronic tension between predictability and disruption; control triggers rebellion.',
    detail: 'Saturn\'s desire for order clashes with Uranus\'s need for freedom in a way that makes both people feel fundamentally misunderstood. The Saturn person sees Uranus as irresponsible and destabilizing; Uranus sees Saturn as controlling and afraid of change. Every attempt at compromise feels like capitulation. This square demands that both people develop genuine flexibility — Saturn must release some control, and Uranus must accept some structure — or the relationship becomes an exhausting oscillation between restriction and revolt.'
  },
  'Saturn-Uranus|sextile': {
    feel: 'Constructive innovation; discipline and originality cooperate.',
    detail: 'Saturn builds the framework and Uranus knows exactly which wall to knock out to let the light in -- and Saturn, instead of panicking, sees that the renovation actually improved the structure. You are good at updating how you do things as a couple: renegotiating routines that have gone stale, trying a new approach to an old problem, changing the system when the system stops working. The relationship stays current because Uranus keeps it evolving, and it stays functional because Saturn keeps it organized.'
  },

  // Saturn-Neptune
  'Saturn-Neptune|conjunction': {
    feel: 'Dreams given form, or imagination imprisoned; it depends on the day.',
    detail: 'Saturn\'s reality principle meets Neptune\'s boundless imagination at the same degree, creating a partnership that oscillates between practical idealism and mutual disillusionment. The Saturn person can help Neptune manifest their vision, giving structure to what would otherwise remain fantasy. But Saturn can also crush Neptune\'s spirit with excessive criticism of their dreams. Neptune can soften Saturn\'s rigidity or undermine their confidence. This conjunction demands that both people respect what the other brings without trying to convert them.'
  },
  'Saturn-Neptune|opposition': {
    feel: 'The pragmatist faces the mystic; neither trusts the other\'s reality.',
    detail: 'Saturn\'s concrete worldview opposes Neptune\'s fluid spirituality, creating a fundamental disagreement about what is real and what matters. The Saturn person may dismiss Neptune\'s intuitions, dreams, and spiritual experiences as impractical nonsense. Neptune may see Saturn as spiritually dead, trapped in a material prison. This opposition can produce extraordinary creative work if both people use the tension productively — Saturn gives Neptune\'s visions form, Neptune gives Saturn\'s structures meaning.'
  },
  'Saturn-Neptune|trine': {
    feel: 'Grounded imagination; dreams built on solid foundations.',
    detail: 'Saturn\'s discipline flows naturally into Neptune\'s visionary capacity, creating a partnership with unusual ability to manifest creative and spiritual ideals in practical form. The Saturn person provides the commitment and structure that Neptune\'s dreams require, and Neptune provides the inspiration and meaning that Saturn\'s discipline needs to feel worthwhile. This trine is exceptional for creative careers, spiritual communities, and any partnership where the ideal must become real.'
  },
  'Saturn-Neptune|square': {
    feel: 'Disillusionment and doubt; one person\'s reality dissolves the other\'s certainty.',
    detail: 'Saturn\'s need for concrete evidence clashes with Neptune\'s need for faith and possibility, creating chronic tension about what is real and what to trust. The Saturn person may feel that Neptune is deceptive or deluded; Neptune may feel that Saturn drains the magic from everything they believe in. Practical promises that dissolve, vague commitments that frustrate, and a persistent sense that the other person inhabits a different reality are common. This square requires radical honesty and clearly defined expectations.'
  },
  'Saturn-Neptune|sextile': {
    feel: 'Practical compassion; structure in service of a higher purpose.',
    detail: 'Neptune dreams up the thing that matters -- the charity, the creative project, the way the home should feel -- and Saturn figures out how to actually make it happen without letting it evaporate into good intentions. Saturn, who can become dry and functional without realizing it, finds that Neptune restores a sense of meaning to the routines and responsibilities that would otherwise feel like drudgery. You build a life together that is both practical and beautiful, which is harder than it sounds and rarer than it should be.'
  },

  // Saturn-Pluto
  'Saturn-Pluto|conjunction': {
    feel: 'Relentless shared intensity; you build empires or endure ordeals together.',
    detail: 'Saturn and Pluto combine their formidable energies at the same degree, creating a partnership defined by extreme ambition, endurance, and shared confrontation with difficult realities. Both people feel that the relationship demands more from them than any other — more discipline, more honesty, more willingness to face uncomfortable truths. This conjunction can produce extraordinary achievement born from shared hardship, or it can become an oppressive dynamic where both people feel trapped by the weight of their mutual expectations.'
  },
  'Saturn-Pluto|opposition': {
    feel: 'An immovable force meets an unstoppable will; power tested to its limits.',
    detail: 'Saturn\'s authority confronts Pluto\'s transformative power from across the chart, creating a relationship where control is the central issue. The Saturn person relies on rules, structure, and established authority; the Pluto person operates through psychological depth, strategic intensity, and sheer force of will. Neither yields easily, and conflicts can become brutal tests of endurance. This opposition requires both people to examine their relationship to power honestly and accept that domination is not partnership.'
  },
  'Saturn-Pluto|trine': {
    feel: 'Shared resilience; together you endure what would break others.',
    detail: 'Saturn\'s patience harmonizes with Pluto\'s depth, creating a partnership with extraordinary staying power and the ability to navigate extreme circumstances. Both people feel that the other can be relied upon when things are genuinely difficult. The Saturn person\'s steadiness gives Pluto\'s intensity constructive form, and Pluto\'s depth gives Saturn\'s discipline genuine purpose. This trine is exceptional for partnerships that face real adversity — financial, medical, or circumstantial — and emerge stronger.'
  },
  'Saturn-Pluto|square': {
    feel: 'Grinding power struggle; control and resistance reach their breaking point.',
    detail: 'Saturn\'s desire for authority clashes with Pluto\'s compulsive need for control, creating a relationship marked by entrenched power dynamics. Both people feel simultaneously constrained and threatened by the other\'s strength. The Saturn person uses rules and expectations to maintain control; the Pluto person uses psychological manipulation or sheer intensity. This square often surfaces in relationships that feel impossible to leave but painful to stay in. Breaking the pattern requires professional support and genuine willingness from both people to release the need for dominance.'
  },
  'Saturn-Pluto|sextile': {
    feel: 'Disciplined depth; shared strength deployed with purpose.',
    detail: 'When something is genuinely wrong -- a financial crisis, a family emergency, a situation that would send most couples into panic -- you two become more effective, not less. Saturn handles the logistics while Pluto handles the truth nobody else will say out loud, and between you the problem gets named, planned for, and dealt with. Outside of crisis, this same dynamic shows up as a shared refusal to pretend things are fine when they are not, combined with the discipline to actually fix what is broken rather than just acknowledging it.'
  },

  // Saturn-Chiron
  'Saturn-Chiron|conjunction': {
    feel: 'The wound crystallized; old pain becomes a permanent teacher.',
    detail: 'Saturn meets Chiron at the same degree, creating a partnership where one person\'s sense of duty, authority, or structure directly contacts the other\'s core wound. The Saturn person may inadvertently embody the authority figure who originally caused Chiron\'s wound, triggering deep patterns of inadequacy or fear. Equally, Chiron can help Saturn understand that their rigid need for control stems from their own unhealed pain. This conjunction is heavy but profoundly maturing — both people grow through reckoning with how pain and responsibility intertwine.'
  },
  'Saturn-Chiron|opposition': {
    feel: 'Duty and vulnerability face off; structure cannot contain the wound.',
    detail: 'Saturn\'s expectations confront Chiron\'s wound from across the chart, creating a dynamic where one person\'s need for responsibility and order triggers the other\'s deepest sense of inadequacy. The Saturn person may demand more than Chiron can give, not understanding why simple expectations feel crushing. Chiron may feel that Saturn is cold, rigid, or punishing. Growth requires Saturn to soften their standards with compassion, and Chiron to distinguish between present-day expectations and the voice of their original wound.'
  },
  'Saturn-Chiron|trine': {
    feel: 'Patient healing; time and commitment mend what was broken.',
    detail: 'Saturn\'s steadiness flows naturally toward Chiron\'s wound, creating a partnership where healing happens through reliability, commitment, and the slow accumulation of trust. The Saturn person provides the stable container that Chiron\'s wound needs to heal — showing up consistently, holding boundaries with kindness, demonstrating through action that not all structure is punishment. Chiron helps Saturn access tenderness beneath their reserve. This trine often indicates a relationship that heals through ordinary faithfulness rather than dramatic breakthroughs.'
  },
  'Saturn-Chiron|square': {
    feel: 'Authority reopens old wounds; expectations feel like punishment.',
    detail: 'Saturn\'s need for structure clashes with Chiron\'s vulnerability in a way that creates recurring pain around authority, competence, and worth. The Saturn person\'s natural tendency to critique and correct lands on Chiron\'s most sensitive spot, making every suggestion feel like confirmation of their deepest inadequacy. Chiron\'s reactivity frustrates Saturn, who cannot understand why reasonable expectations produce such disproportionate pain. This square demands extraordinary patience and willingness from both people to examine the difference between present reality and past wounds.'
  },
  'Saturn-Chiron|sextile': {
    feel: 'Gentle structure around the tender place; responsible caring.',
    detail: 'Saturn shows up for the Chiron person in the most useful way possible: not with speeches about what they should do, but with quiet, steady acts of support -- driving them to the appointment, handling the errand they cannot face, sitting with them during the hard night without trying to fix it. Chiron, in return, softens something in Saturn that was becoming rigid, teaching them that being strong for someone is not the same as being closed off from your own tenderness. The bond between you is built on a kind of care that is more reliable than romantic and more sustaining than dramatic.'
  },

  // Sun-NorthNode
  'Sun-NorthNode|conjunction': {
    feel: 'A fated encounter; the Sun person feels like a beacon on the Node person\'s destined path.',
    detail: 'The Sun person embodies qualities the North Node person is meant to develop in this lifetime. There is an immediate sense of recognition and purpose, as though the Sun person arrived to illuminate the direction the Node person needs to grow toward. The bond carries a feeling of destiny that is difficult to ignore.'
  },
  'Sun-NorthNode|opposition': {
    feel: 'A pull toward the familiar past rather than the unknown future; comfort that can stall growth.',
    detail: 'The Sun person activates the South Node, representing qualities the Node person has already mastered and may cling to. The relationship feels deeply comfortable but can keep both people anchored in old patterns. Growth requires the Sun person to encourage forward movement rather than settling into what feels safe.'
  },
  'Sun-NorthNode|trine': {
    feel: 'Natural support for each other\'s life direction; the relationship feels like it was meant to happen.',
    detail: 'The Sun person\'s identity harmonizes with the Node person\'s evolutionary direction, creating a partnership where growth feels effortless. Both people sense that being together moves them toward something important. The Sun person naturally encourages the Node person\'s development without forcing it.'
  },
  'Sun-NorthNode|square': {
    feel: 'The relationship challenges both people\'s sense of purpose and direction.',
    detail: 'The Sun person\'s way of being creates friction with the Node person\'s intended growth path. This tension forces both people to reconsider what they thought they wanted from life. The square is demanding but deeply catalytic -- it refuses to let either person coast.'
  },
  'Sun-NorthNode|sextile': {
    feel: 'A gentle sense of shared purpose; being together feels quietly right.',
    detail: 'The Sun person does something specific that the Node person needs for their growth: models a quality, opens a door, or simply demonstrates by example what it looks like to inhabit the identity the Node person is building toward. It is not dramatic or fated-feeling -- more like having a friend who happens to be good at the exact thing you are trying to learn, and whose presence makes you better at it without either of you making a big deal about it.'
  },

  // Moon-NorthNode
  'Moon-NorthNode|conjunction': {
    feel: 'Emotionally fated; the Moon person\'s care feels like exactly what the Node person needs to evolve.',
    detail: 'The Moon person provides emotional nourishment that directly supports the North Node person\'s growth. There is a deep sense that this emotional bond exists for a reason beyond comfort. The Moon person may feel instinctively drawn to nurture the Node person\'s becoming, even when it requires emotional risk.'
  },
  'Moon-NorthNode|opposition': {
    feel: 'Emotional habits from the past hold both people in familiar territory.',
    detail: 'The Moon person\'s emotional patterns resonate with the Node person\'s South Node, creating a bond that feels like coming home but may prevent forward movement. The comfort is genuine but can become a refuge from necessary growth. Both people must consciously choose evolution over emotional safety.'
  },
  'Moon-NorthNode|trine': {
    feel: 'Emotional support flows naturally toward growth; the heart and the path align.',
    detail: 'The Moon person\'s emotional instincts harmonize with the Node person\'s life direction, creating a partnership where feeling safe and growing forward happen simultaneously. Nurturing in this relationship does not come at the expense of evolution. Both people feel emotionally at ease while still moving toward something larger.'
  },
  'Moon-NorthNode|square': {
    feel: 'Emotional needs clash with the direction of growth; security and evolution pull in different directions.',
    detail: 'The Moon person\'s instinct to comfort and protect creates tension with the Node person\'s need to develop in unfamiliar directions. The Node person may feel smothered or pulled backward by the Moon person\'s care. Working through this square means learning that genuine emotional support sometimes means encouraging risk rather than preventing discomfort.'
  },
  'Moon-NorthNode|sextile': {
    feel: 'Quiet emotional encouragement toward each other\'s future; caring without clinging.',
    detail: 'The Moon person has a knack for knowing when the Node person needs encouragement and when they need to be left alone to figure it out -- and the care never comes with strings attached or an implicit demand to stay where they are. In practice, this looks like the Moon person cooking dinner on the night the Node person comes home drained from stretching into unfamiliar territory, or asking the right question at the right moment without needing to hear a particular answer.'
  },

  // Mercury-NorthNode
  'Mercury-NorthNode|conjunction': {
    feel: 'Conversations that feel destined; the Mercury person\'s words open doors the Node person didn\'t know existed.',
    detail: 'The Mercury person\'s thinking and communication style directly catalyzes the Node person\'s growth. Ideas exchanged between these two carry unusual weight, as though certain conversations were meant to happen. The Mercury person may serve as a messenger or teacher who articulates what the Node person needs to hear.'
  },
  'Mercury-NorthNode|opposition': {
    feel: 'Mental patterns from the past dominate the conversation; familiar thinking prevents new understanding.',
    detail: 'The Mercury person\'s communication activates the Node person\'s South Node intellect, reinforcing old ways of thinking rather than opening new ones. The dialogue feels natural but may keep both people circling ideas they have already exhausted. Growth requires the Mercury person to challenge the Node person\'s assumptions rather than confirming them.'
  },
  'Mercury-NorthNode|trine': {
    feel: 'Ideas flow in the direction of growth; thinking together expands both people\'s horizons.',
    detail: 'The Mercury person\'s mind harmonizes with the Node person\'s evolutionary path, creating conversations that naturally move toward insight and development. Both people feel intellectually stimulated in a way that also feels purposeful. Communication between them has a quality of unfolding something important.'
  },
  'Mercury-NorthNode|square': {
    feel: 'Communication creates friction with the life path; words that challenge direction.',
    detail: 'The Mercury person\'s thinking clashes with the Node person\'s growth trajectory, creating intellectual tension that forces both people to reexamine their assumptions. The square can feel like arguing about the future, but the friction sharpens both people\'s clarity about what they actually believe and where they are headed.'
  },
  'Mercury-NorthNode|sextile': {
    feel: 'Helpful exchanges that gently support each other\'s direction.',
    detail: 'The Mercury person says the thing that reframes the Node person\'s situation -- not a grand revelation, but a passing observation over coffee that rearranges the puzzle. They recommend the right book, forward the right article, or phrase the question the Node person did not know they needed to ask. The conversations between you have a way of producing clarity that neither person expected when they sat down.'
  },

  // Venus-NorthNode
  'Venus-NorthNode|conjunction': {
    feel: 'Love that feels fated; the Venus person embodies what the Node person is growing toward in relationship.',
    detail: 'The Venus person\'s values, aesthetics, and way of loving align precisely with the North Node person\'s evolutionary direction. There is a powerful sense that this love exists for a purpose beyond personal satisfaction. The Venus person may feel that loving the Node person changes them in unexpected ways, and the Node person feels that this love pulls them toward their highest potential.'
  },
  'Venus-NorthNode|opposition': {
    feel: 'Love that feels familiar but may anchor both people in comfortable patterns.',
    detail: 'The Venus person\'s affection resonates with the Node person\'s past rather than their future, creating a relationship that feels deeply comfortable but may not challenge either person to grow. The love is real, but both people must be intentional about not using the relationship as a retreat from necessary evolution.'
  },
  'Venus-NorthNode|trine': {
    feel: 'Affection and growth flow together naturally; love supports the life path.',
    detail: 'The Venus person\'s way of loving harmonizes with the Node person\'s direction, creating a partnership where intimacy and personal development reinforce each other. Both people feel that being together enhances their individual journeys. The relationship has an easy, generous quality that makes growth feel like a shared pleasure.'
  },
  'Venus-NorthNode|square': {
    feel: 'Desire and direction pull against each other; what you want versus where you need to go.',
    detail: 'The Venus person\'s values create tension with the Node person\'s growth path, forcing both people to examine whether their relationship serves their evolution or distracts from it. This square demands that love become a conscious choice aligned with purpose rather than a comfortable default.'
  },
  'Venus-NorthNode|sextile': {
    feel: 'Gentle affection that encourages growth; love as quiet catalyst.',
    detail: 'The Venus person makes the Node person\'s growth feel like something worth wanting rather than something they should be doing out of obligation. A shared meal, a well-chosen gift, an afternoon spent in a beautiful place together -- these small pleasures function as rest stops on the Node person\'s developmental journey, reminding them that evolution does not have to be grim. The Venus person loves the version of the Node person that is becoming, and that love makes the becoming easier.'
  },

  // Mars-NorthNode
  'Mars-NorthNode|conjunction': {
    feel: 'A driving force toward destiny; the Mars person ignites the Node person\'s courage to act on their path.',
    detail: 'The Mars person\'s energy and initiative land directly on the Node person\'s point of growth, creating a dynamic where action feels fated. The Mars person pushes the Node person to take risks they might otherwise avoid. The intensity of this conjunction can feel like being propelled forward by a force neither person fully controls.'
  },
  'Mars-NorthNode|opposition': {
    feel: 'Action directed toward the past; the Mars person\'s drive reinforces old patterns.',
    detail: 'The Mars person\'s energy activates the Node person\'s South Node, encouraging familiar behaviors rather than new growth. The drive between them is real, but it may channel into activities that keep both people stuck. Redirecting Mars\'s force toward the Node person\'s future rather than their past is the central challenge.'
  },
  'Mars-NorthNode|trine': {
    feel: 'Energy and purpose align; together you act on what matters.',
    detail: 'The Mars person\'s initiative flows naturally toward the Node person\'s evolutionary direction, creating a partnership where taking action feels purposeful and aligned. Both people feel more motivated together than apart. The Mars person\'s courage supports the Node person\'s growth without overwhelming it.'
  },
  'Mars-NorthNode|square': {
    feel: 'Competing drives create friction with destiny; ambition clashes with direction.',
    detail: 'The Mars person\'s assertiveness creates tension with the Node person\'s growth path, forcing both people to examine whether their actions serve their evolution or obstruct it. The square is uncomfortable but clarifying, demanding that energy be directed with intention rather than spent on impulse.'
  },
  'Mars-NorthNode|sextile': {
    feel: 'Steady motivation toward shared growth; the push is gentle but persistent.',
    detail: 'The Mars person gives the Node person a well-timed shove when they are stalling at the edge of something they need to do but keep finding reasons not to. It is not aggressive -- more like the friend who says "just send the email" or "sign up already" and somehow their confidence is contagious enough to get you moving. Together you take concrete steps toward things that would remain abstract intentions if either of you were alone.'
  },

  // Jupiter-NorthNode
  'Jupiter-NorthNode|conjunction': {
    feel: 'Expansive destiny; the Jupiter person amplifies the Node person\'s sense of purpose and direction.',
    detail: 'Jupiter lands on the North Node like a blessing on the path, enlarging the Node person\'s vision of what is possible for their life. The Jupiter person brings faith, optimism, and opportunity that directly support the Node person\'s evolution. There is a sense that meeting this person opened doors that were meant to be opened.'
  },
  'Jupiter-NorthNode|opposition': {
    feel: 'Generosity that may enable complacency; abundance directed toward the familiar rather than the new.',
    detail: 'The Jupiter person\'s expansiveness activates the Node person\'s South Node, creating comfort and excess around patterns that no longer serve growth. The relationship may feel abundant but stagnant. Both people must resist the temptation to settle for what is easy when what is needed is what is difficult.'
  },
  'Jupiter-NorthNode|trine': {
    feel: 'Faith and direction flow together; the relationship feels like a gift from providence.',
    detail: 'Jupiter\'s optimism harmonizes with the Node person\'s evolutionary path, creating a partnership where growth feels expansive and natural. Both people sense that their connection serves something larger than themselves. Opportunities arise through the relationship that would not have appeared otherwise.'
  },
  'Jupiter-NorthNode|square': {
    feel: 'Overconfidence meets the crossroads; big promises clash with the actual path.',
    detail: 'Jupiter\'s expansiveness creates tension with the Node person\'s growth direction, inflating expectations or encouraging detours from the real work. The square demands that both people distinguish between genuine faith and wishful thinking. Growth requires tempering optimism with honest assessment of where the path actually leads.'
  },
  'Jupiter-NorthNode|sextile': {
    feel: 'Helpful opportunities that gently steer both people toward their purpose.',
    detail: 'The Jupiter person keeps stumbling across exactly the opportunity, introduction, or piece of information that the Node person needs next -- and sharing it feels natural rather than calculated. Over time, the Node person notices that their world has expanded significantly since this person entered it: new interests, new contacts, new confidence. Jupiter benefits too, because supporting someone else\'s growth gives their natural generosity a worthy outlet.'
  },

  // Saturn-NorthNode
  'Saturn-NorthNode|conjunction': {
    feel: 'A serious, karmic bond; the Saturn person embodies the discipline the Node person\'s path demands.',
    detail: 'Saturn on the North Node is one of the most distinctly karmic contacts in synastry. The Saturn person represents the hard lessons, structure, and commitment that the Node person must embrace in order to grow. The relationship may feel heavy or obligatory, but it carries genuine purpose. What Saturn asks is difficult, but it is exactly what the Node person needs.'
  },
  'Saturn-NorthNode|opposition': {
    feel: 'The weight of the past; Saturn\'s authority reinforces patterns the Node person is meant to outgrow.',
    detail: 'Saturn activates the South Node, creating a dynamic where responsibility, tradition, and obligation anchor the Node person in familiar territory. The Saturn person may represent an authority figure or a set of rules that the Node person has already internalized. Growth requires recognizing where duty has become a cage.'
  },
  'Saturn-NorthNode|trine': {
    feel: 'Steady, reliable support for growth; the relationship ages well.',
    detail: 'Saturn\'s discipline flows naturally toward the Node person\'s direction, providing structure and stability that support long-term evolution. The Saturn person helps the Node person build something lasting along their path. This trine often appears in partnerships where both people take the long view and are willing to invest in something that matures slowly.'
  },
  'Saturn-NorthNode|square': {
    feel: 'Restriction and destiny at cross purposes; the rules don\'t fit the road.',
    detail: 'Saturn\'s need for control creates friction with the Node person\'s growth path, producing a dynamic where structure feels like obstruction. The Node person may feel that the Saturn person is holding them back or imposing outdated standards. The square forces both people to examine which structures serve growth and which have become prisons.'
  },
  'Saturn-NorthNode|sextile': {
    feel: 'Practical guidance on the path; constructive discipline without heaviness.',
    detail: 'The Saturn person is the one who asks "so what is the actual plan?" in a way that does not kill the dream but forces it into something workable. They hold the Node person accountable without being punishing about it -- a raised eyebrow when the deadline slips, a quiet "you said you were going to do that" that lands as reminder rather than criticism. The Node person accomplishes more in this relationship because Saturn transforms vague aspiration into a schedule.'
  },

  // Uranus-NorthNode
  'Uranus-NorthNode|conjunction': {
    feel: 'A sudden awakening to destiny; the Uranus person disrupts everything the Node person thought they knew about their path.',
    detail: 'Uranus electrifies the North Node, creating a relationship that arrives like lightning and permanently alters the Node person\'s trajectory. The Uranus person catalyzes radical change in the Node person\'s direction, often through unexpected events or revelations. The bond feels exciting and destabilizing in equal measure.'
  },
  'Uranus-NorthNode|opposition': {
    feel: 'Rebellion against the past that may miss the point; disruption without direction.',
    detail: 'Uranus activates the South Node, creating sudden upheaval around patterns the Node person has already outgrown. The disruption may feel liberating at first but can become chaotic if it lacks intentional direction. The challenge is to channel Uranus\'s revolutionary energy toward the North Node\'s future rather than simply dismantling the past.'
  },
  'Uranus-NorthNode|trine': {
    feel: 'Innovation flows naturally toward growth; the unexpected serves the path.',
    detail: 'Uranus\'s unconventional energy harmonizes with the Node person\'s direction, creating a partnership where surprise and growth work together. Both people feel that the relationship encourages individuality and authentic self-expression. The Uranus person helps the Node person see possibilities they could not have imagined alone.'
  },
  'Uranus-NorthNode|square': {
    feel: 'Sudden changes clash with the intended direction; freedom and fate collide.',
    detail: 'Uranus\'s need for independence and disruption creates tension with the Node person\'s growth path. The relationship may involve unexpected events that force both people to reconsider their direction. The square demands that both people learn to work with change rather than being overwhelmed by it.'
  },
  'Uranus-NorthNode|sextile': {
    feel: 'Gentle innovation that opens new possibilities on the path.',
    detail: 'The Uranus person casually suggests the thing the Node person would never have considered -- the career pivot, the unconventional approach, the completely different way of looking at the problem -- and instead of feeling destabilizing, it clicks into place like it was obvious all along. The Node person\'s growth accelerates because Uranus keeps introducing options that the Node person\'s conditioning would have filtered out. The relationship has an experimental quality that keeps both people from calcifying.'
  },

  // Neptune-NorthNode
  'Neptune-NorthNode|conjunction': {
    feel: 'A dreamlike sense of shared destiny; the Neptune person dissolves barriers on the Node person\'s path.',
    detail: 'Neptune on the North Node creates a profoundly spiritual connection where the Node person feels that the Neptune person understands their deepest aspirations. The bond carries a sense of transcendence and shared vision that can be genuinely inspiring or dangerously delusional. Discernment is essential -- the dream must be tested against reality.'
  },
  'Neptune-NorthNode|opposition': {
    feel: 'Illusion anchored in the past; spiritual comfort that prevents forward movement.',
    detail: 'Neptune activates the South Node, creating a dynamic where fantasy, idealization, or escapism keeps the Node person attached to old patterns. The relationship may feel transcendent, but the transcendence serves avoidance rather than evolution. Both people must distinguish between genuine spiritual connection and mutual escapism.'
  },
  'Neptune-NorthNode|trine': {
    feel: 'Spiritual inspiration flows toward growth; imagination serves the path.',
    detail: 'Neptune\'s vision harmonizes with the Node person\'s direction, creating a partnership infused with creativity, compassion, and spiritual depth. Both people feel that the relationship connects them to something larger than themselves. The Neptune person\'s intuition naturally supports the Node person\'s evolution without distorting it.'
  },
  'Neptune-NorthNode|square': {
    feel: 'Confusion clouds the path; dreams and direction work at cross purposes.',
    detail: 'Neptune\'s tendency toward idealization and dissolution creates friction with the Node person\'s growth trajectory. The relationship may involve deception, disillusionment, or a persistent inability to see each other clearly. The square demands radical honesty and the willingness to love what is real rather than what is imagined.'
  },
  'Neptune-NorthNode|sextile': {
    feel: 'Gentle inspiration and shared sensitivity that supports the path.',
    detail: 'Neptune helps the Node person see their path as something beautiful and worth believing in, not just a set of developmental tasks to complete. The right song playing at the right moment, a shared meditation, a conversation that drifts into territory neither person planned to visit -- these are the moments where the Node person\'s sense of direction deepens from intellectual understanding into felt conviction. Neptune does not push; they inspire, and the inspiration is genuine.'
  },

  // Pluto-NorthNode
  'Pluto-NorthNode|conjunction': {
    feel: 'A transformative encounter with destiny; nothing remains the same after this bond forms.',
    detail: 'Pluto on the North Node creates one of the most intense and fated connections in synastry. The Pluto person catalyzes deep transformation in the Node person\'s life direction, often through experiences that feel like death and rebirth. The bond is obsessive, transformative, and impossible to dismiss. The Node person\'s entire trajectory shifts through this encounter.'
  },
  'Pluto-NorthNode|opposition': {
    feel: 'Power dynamics rooted in the past; control and fate pull in opposite directions.',
    detail: 'Pluto activates the South Node, creating a dynamic where intense psychological patterns from the past dominate the relationship. There may be a strong karmic sense of having known each other before, but the familiarity serves repetition rather than evolution. Breaking free requires both people to release control and trust the forward direction.'
  },
  'Pluto-NorthNode|trine': {
    feel: 'Deep transformation flows naturally toward growth; power serves the path.',
    detail: 'Pluto\'s transformative intensity harmonizes with the Node person\'s direction, creating a partnership where profound change feels purposeful rather than destructive. Both people sense that the relationship is doing important psychological work. The Pluto person\'s depth supports the Node person\'s evolution without overwhelming it.'
  },
  'Pluto-NorthNode|square': {
    feel: 'Power struggles obstruct the life path; transformation demanded at a pace that feels impossible.',
    detail: 'Pluto\'s intensity creates friction with the Node person\'s growth direction, producing crises that force both people to confront what they are most afraid to change. The square is excruciating but potentially the most transformative aspect in the chart. Growth requires surrendering the need to control the outcome.'
  },
  'Pluto-NorthNode|sextile': {
    feel: 'Subtle but persistent transformation that serves the path.',
    detail: 'The Pluto person has a way of asking the question that dismantles the Node person\'s excuse -- not cruelly, but with a precision that makes avoidance impossible. "Why are you really not doing that?" lands differently when Pluto says it, because they genuinely want the answer and will sit with whatever comes up. The Node person sheds old skin faster in this relationship because Pluto makes self-honesty feel like a relief rather than an attack.'
  },

  // Chiron-NorthNode
  'Chiron-NorthNode|conjunction': {
    feel: 'The wound and the path converge; healing becomes inseparable from destiny.',
    detail: 'Chiron on the North Node creates a bond where the Chiron person\'s core wound directly activates the Node person\'s growth direction. The Node person may feel that this relationship forces them to confront pain they would rather avoid, but that confrontation is precisely what their evolution requires. Healing and purpose become the same thing.'
  },
  'Chiron-NorthNode|opposition': {
    feel: 'Old wounds anchor the path in the past; pain becomes a reason not to grow.',
    detail: 'Chiron activates the South Node, creating a dynamic where both people\'s wounds reinforce familiar patterns rather than catalyzing change. The relationship may feel like a shared refuge from the world\'s harshness, but the refuge can become a hiding place. Growth requires using the wound as motivation rather than excuse.'
  },
  'Chiron-NorthNode|trine': {
    feel: 'Healing flows naturally toward growth; vulnerability opens the path forward.',
    detail: 'Chiron\'s wound harmonizes with the Node person\'s direction, creating a partnership where being honest about pain actually supports evolution. Both people sense that their shared vulnerability serves a larger purpose. The Chiron person helps the Node person understand that the path forward runs through tenderness, not around it.'
  },
  'Chiron-NorthNode|square': {
    feel: 'Pain obstructs the path; wounds and direction clash painfully.',
    detail: 'Chiron\'s vulnerability creates friction with the Node person\'s growth trajectory, producing a dynamic where healing feels at odds with moving forward. The Node person may feel that the Chiron person\'s needs hold them back, while Chiron feels that the Node person\'s drive ignores their suffering. The square demands that both people integrate healing into the journey rather than treating it as an obstacle.'
  },
  'Chiron-NorthNode|sextile': {
    feel: 'Gentle healing that supports the life direction; tenderness as quiet guide.',
    detail: 'The Chiron person understands, from personal experience, the specific kind of fear that comes with growing into unfamiliar territory -- and their empathy for the Node person\'s struggle is not theoretical but earned through their own scars. In practice, this means the Node person can admit to being scared or confused without losing the Chiron person\'s respect. The permission to be imperfect while still moving forward is one of the most practically useful gifts one person can offer another.'
  },

  // NorthNode-NorthNode
  'NorthNode-NorthNode|conjunction': {
    feel: 'Walking the same road; two people destined to grow in the same direction.',
    detail: 'When both people\'s North Nodes share the same sign and degree, they are working toward the same evolutionary lessons in this lifetime. The partnership feels deeply purposeful, as though you were meant to help each other reach the same destination. The bond carries a generational quality, linking both people to a shared karmic current.'
  },
  'NorthNode-NorthNode|opposition': {
    feel: 'Opposite destinies that create a powerful axis of mutual growth.',
    detail: 'One person\'s North Node sits on the other\'s South Node, creating a relationship where each person embodies what the other is growing toward or away from. This is one of the strongest karmic indicators in synastry. Both people serve as mirrors and teachers, reflecting the other\'s past and future simultaneously.'
  },
  'NorthNode-NorthNode|trine': {
    feel: 'Compatible life directions that support each other\'s growth naturally.',
    detail: 'Both people\'s evolutionary paths flow in harmonious directions, creating a partnership where individual growth and shared purpose reinforce each other. There is an easy sense that being together serves both people\'s destinies. The relationship encourages forward movement without demanding identical destinations.'
  },
  'NorthNode-NorthNode|square': {
    feel: 'Growth paths that cross at difficult angles; your destinies challenge each other.',
    detail: 'Both people\'s intended directions create friction when they intersect, forcing each person to reconsider whether their path accounts for the other\'s. The square demands that both people expand their vision of growth to include the tension. What feels like an obstruction is actually an invitation to a more comprehensive understanding of purpose.'
  },
  'NorthNode-NorthNode|sextile': {
    feel: 'Gently compatible destinies; your paths run parallel and occasionally intersect helpfully.',
    detail: 'Your destinies run in compatible directions without requiring you to walk the exact same road, which means you can support each other\'s growth without competing for the same territory. One person\'s breakthrough in their area of development tends to encourage the other to push forward in theirs. You are the kind of couple or friends who look up after a few years together and realize you have both changed significantly, and in directions that still fit.'
  },

  // Chiron-Chiron
  'Chiron-Chiron|conjunction': {
    feel: 'Shared wound; you carry the same hurt and recognize it instantly in each other.',
    detail: 'When both people\'s Chirons share the same placement, they have endured similar core injuries and understand each other\'s pain without explanation. This creates profound empathy but also the risk of reopening wounds rather than healing them. The relationship works when both people have done enough individual healing to be present for each other without drowning in shared suffering.'
  },
  'Chiron-Chiron|opposition': {
    feel: 'Complementary wounds that mirror each other from opposite sides.',
    detail: 'Each person\'s wound illuminates the other\'s from a different angle, creating a dynamic where both people feel simultaneously understood and challenged. The opposition demands that each person look at their pain from a perspective they have been avoiding. Healing happens through the willingness to see yourself through someone else\'s suffering.'
  },
  'Chiron-Chiron|trine': {
    feel: 'Wounds that resonate harmoniously; shared pain becomes shared wisdom.',
    detail: 'Both people\'s core injuries flow together naturally, creating a partnership where vulnerability is met with intuitive understanding rather than judgment. The trine allows healing to happen through ordinary acts of care and recognition. Both people feel that their pain has purpose when witnessed by someone who genuinely understands.'
  },
  'Chiron-Chiron|square': {
    feel: 'Wounds that aggravate each other; your pain triggers theirs and theirs triggers yours.',
    detail: 'Each person\'s core injury clashes with the other\'s in a way that creates recurring hurt. The square forces both people to confront not only their own wound but the ways their suffering affects others. Growth requires the painful acknowledgment that being wounded does not exempt you from wounding someone else.'
  },
  'Chiron-Chiron|sextile': {
    feel: 'Gentle mutual understanding of each other\'s deepest vulnerability.',
    detail: 'Your wounds are different enough that neither person drowns in the other\'s pain, but similar enough that real understanding passes between you without much explanation. You can say "I had a bad day" and the other person hears what that actually means -- the specific flavor of difficulty, the old pattern it activated -- without needing a debriefing. This quiet comprehension makes the relationship a place where both people can rest from the performance of being fine.'
  },

  // Chiron-Uranus
  'Chiron-Uranus|conjunction': {
    feel: 'The wound is electrified; sudden insight meets deep pain.',
    detail: 'Uranus lands on Chiron\'s most sensitive point, creating flashes of awareness that are as destabilizing as they are liberating. The Uranus person disrupts the Chiron person\'s habitual relationship with their wound, which can feel like healing at the speed of lightning or like having a bandage ripped off. The conjunction demands that the Chiron person release old narratives about their pain and embrace a radically new understanding.'
  },
  'Chiron-Uranus|opposition': {
    feel: 'Freedom and pain pull in opposite directions; the wound resists liberation.',
    detail: 'Uranus\'s drive for freedom confronts Chiron\'s wound from across the chart, creating a dynamic where independence and vulnerability are at odds. The Uranus person may feel that the Chiron person\'s pain is a constraint on their freedom, while Chiron feels abandoned by Uranus\'s detachment. The opposition requires both people to understand that genuine freedom includes the freedom to be vulnerable.'
  },
  'Chiron-Uranus|trine': {
    feel: 'Innovation heals the wound; unconventional solutions for deep pain.',
    detail: 'Uranus\'s inventiveness flows naturally toward Chiron\'s hurt, offering fresh perspectives and unexpected approaches to old suffering. The Uranus person helps the Chiron person see their wound from an entirely new angle, and Chiron gives Uranus\'s brilliance emotional depth and purpose. Healing happens through insight rather than endurance.'
  },
  'Chiron-Uranus|square': {
    feel: 'Disruption aggravates the wound; sudden changes reopen old hurt.',
    detail: 'Uranus\'s unpredictability clashes with Chiron\'s vulnerability, creating a dynamic where the Chiron person feels destabilized by the Uranus person\'s need for change and independence. The square forces both people to examine whether Uranus\'s disruption serves genuine liberation or simply avoids the patient work of healing.'
  },
  'Chiron-Uranus|sextile': {
    feel: 'Gentle breakthroughs; small flashes of insight that ease old pain.',
    detail: 'Uranus says something offhand that reframes the Chiron person\'s wound in a way they had never considered -- a different angle on an old story, an unconventional suggestion that turns out to be exactly right. The insights arrive in small, digestible doses rather than overwhelming revelations, and the Chiron person finds their relationship to their own pain gradually shifting without the trauma of a forced breakthrough. Uranus benefits because Chiron gives their intellectual restlessness emotional stakes worth caring about.'
  },

  // Chiron-Neptune
  'Chiron-Neptune|conjunction': {
    feel: 'The wound dissolves into something larger; pain becomes spiritual opening.',
    detail: 'Neptune meets Chiron at the place of deepest hurt, dissolving the boundaries around the wound until it becomes indistinguishable from spiritual experience. The Neptune person may idealize the Chiron person\'s suffering or offer transcendent compassion that genuinely heals. The danger is that Neptune\'s dissolution prevents the wound from being addressed practically. The gift is that some wounds can only be healed by surrender.'
  },
  'Chiron-Neptune|opposition': {
    feel: 'Illusion and pain face each other across the chart; fantasy obscures the real wound.',
    detail: 'Neptune\'s tendency toward idealization confronts Chiron\'s raw vulnerability, creating a dynamic where the real hurt gets lost in projection and wishful thinking. The Neptune person may offer compassion that misses the point, while the Chiron person feels unseen despite being surrounded by apparent empathy. Healing requires cutting through illusion to reach genuine pain.'
  },
  'Chiron-Neptune|trine': {
    feel: 'Compassion flows naturally toward the wound; spiritual understanding eases suffering.',
    detail: 'Neptune\'s intuitive compassion harmonizes with Chiron\'s vulnerability, creating a partnership where pain is met with genuine spiritual presence. The Neptune person instinctively understands what the Chiron person needs without being told, and Chiron helps Neptune ground their compassion in something real and specific. Healing happens through art, music, prayer, or simple acts of grace.'
  },
  'Chiron-Neptune|square': {
    feel: 'Compassion misfires; the attempt to heal through spiritual means creates confusion.',
    detail: 'Neptune\'s dissolving energy clashes with Chiron\'s wound in a way that creates confusion about what actually hurts and what would actually help. The Neptune person may offer escape disguised as healing, while the Chiron person feels more lost rather than more found. The square demands honest discernment about the difference between transcendence and avoidance.'
  },
  'Chiron-Neptune|sextile': {
    feel: 'Subtle spiritual support for the healing process; gentle compassion without confusion.',
    detail: 'Neptune does not try to fix the Chiron person\'s wound -- they sit with it, and somehow that sitting-with is the thing that helps. A shared piece of music, a moment of silence together, a look that says "I know" without any words -- these are the specific gestures through which healing happens in this relationship. Chiron, in return, anchors Neptune\'s compassion in something real: not abstract kindness toward the world in general, but focused tenderness toward one particular person\'s actual hurt.'
  },

  // Chiron-Pluto
  'Chiron-Pluto|conjunction': {
    feel: 'The wound meets absolute power; transformation through the darkest material.',
    detail: 'Pluto arrives at Chiron\'s place of deepest hurt with the full force of its transformative intensity. The Pluto person has the power to either heal or devastate the Chiron person\'s core wound, and the outcome depends entirely on how that power is wielded. This conjunction strips both people of pretense, forcing them to confront the relationship between vulnerability and power. The potential for healing is as extreme as the potential for harm.'
  },
  'Chiron-Pluto|opposition': {
    feel: 'Power and vulnerability confront each other across the chart; the wound meets its match.',
    detail: 'Pluto\'s intensity faces Chiron\'s pain from the opposite side, creating a dynamic where control and vulnerability are in constant dialogue. The Pluto person may use their psychological power to probe the Chiron person\'s wound in ways that feel invasive, while Chiron\'s vulnerability may trigger Pluto\'s deepest fears about their own lack of control. Growth requires both people to respect the boundary between healing and domination.'
  },
  'Chiron-Pluto|trine': {
    feel: 'Deep transformation flows naturally through the wound; power heals what was broken.',
    detail: 'Pluto\'s depth harmonizes with Chiron\'s vulnerability, creating a partnership where profound psychological work happens organically. The Pluto person helps the Chiron person access and transform their wound at its root, and Chiron gives Pluto\'s intensity a worthy purpose. This trine supports relationships where both people emerge fundamentally changed for the better.'
  },
  'Chiron-Pluto|square': {
    feel: 'Power dynamics rip open the wound; transformation happens at a cost.',
    detail: 'Pluto\'s compulsive intensity clashes with Chiron\'s vulnerability, creating a dynamic where the Chiron person\'s wound is repeatedly activated by the Pluto person\'s need for control or depth. The square forces both people to examine the relationship between power and pain in their own histories. Genuine growth requires the Pluto person to restrain their intensity and the Chiron person to assert boundaries without collapsing.'
  },
  'Chiron-Pluto|sextile': {
    feel: 'Quiet depth that supports healing; power applied with care to what is broken.',
    detail: 'Pluto sees the root of the Chiron person\'s wound with a clarity that would be frightening coming from anyone else, but delivers the truth in doses the Chiron person can metabolize. A question here, an observation there -- and over months, the Chiron person realizes they have quietly dismantled a pattern they thought was permanent. Chiron, in turn, is one of the few people who can receive Pluto\'s intensity as care rather than intrusion, which gives Pluto the rare experience of their depth being welcomed rather than feared.'
  },

  // Uranus-Uranus
  'Uranus-Uranus|conjunction': {
    feel: 'Generational kinship; you share the same instinct for rebellion and the same vision of the future.',
    detail: 'When both people\'s Uranus placements align, they belong to the same generational wave of change and carry the same restless impulse toward innovation. This creates an immediate sense of shared values around freedom, individuality, and progress. The bond is less personal than planetary -- you recognize in each other the same revolutionary spirit that defines your generation.'
  },
  'Uranus-Uranus|opposition': {
    feel: 'Generational tension; your visions of freedom and progress directly oppose each other.',
    detail: 'Uranus opposite Uranus occurs at the Uranus opposition transit age, linking people from generations with fundamentally different ideas about change and independence. Each person\'s vision of the future challenges the other\'s assumptions. The opposition demands genuine curiosity about how someone else\'s radicalism differs from your own.'
  },
  'Uranus-Uranus|trine': {
    feel: 'Harmonious generational resonance; different ages, compatible visions of change.',
    detail: 'The trine connects people from different generations whose ideas about freedom and innovation complement rather than conflict. There is an easy sense of mutual respect for each other\'s individuality and an intuitive understanding of each other\'s need for independence. The relationship benefits from the creative tension of different life stages sharing compatible values.'
  },
  'Uranus-Uranus|square': {
    feel: 'Generational friction; your ideas about freedom and change clash at fundamental levels.',
    detail: 'Uranus square Uranus links people from generations whose revolutionary impulses work at cross purposes. What one person considers progress, the other may see as recklessness or irrelevance. The square demands that both people expand their understanding of what freedom and authenticity mean beyond their own generational lens.'
  },
  'Uranus-Uranus|sextile': {
    feel: 'Easy generational compatibility; different perspectives on change that complement each other.',
    detail: 'You come from neighboring generations whose ideas about freedom and progress overlap enough to understand each other and differ enough to be interesting. The older person offers perspective the younger one has not lived yet, and the younger person offers a version of the future the older one finds genuinely exciting rather than threatening. Your conversations about technology, culture, and what matters tend to leave both people feeling that the world is in better hands than they feared.'
  },
};
