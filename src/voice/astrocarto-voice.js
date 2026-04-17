// ── astrocarto-voice.js ──
// Extracted from index.html — Phase 0 mechanical extraction.
// ASTROCARTO_VOICE constant and related helper functions.

const ASTROCARTO_VOICE = {
  Sun: {
    mc: {
      title: 'Sun Culminating',
      short: 'Prominence, achievement, visibility, and leadership in your career and public life.',
      detail: 'The Sun at the Midheaven of your astrocartography map marks the culmination point, where your essential identity and creative power reach their zenith. Here you experience recognition, success, and the ability to manifest your will in the world. This line favors professional achievement, public standing, and leadership roles. Traditionally, those living on or frequently visiting this line report increased confidence, clarity of purpose, and the ease of stepping into positions of authority and influence.'
    },
    ic: {
      title: 'Sun at the Root',
      short: 'Grounding, family legacy, inner strength, and personal foundation building.',
      detail: 'The IC (Imum Coeli) marks the foundation and root of your astrocartography map. The Sun here strengthens your inner core, family connections, and sense of personal grounding. This line emphasizes private achievement, home-based success, and the establishment of a secure personal foundation. People living on this line often develop a strong sense of purpose rooted in family legacy, real estate investment, or creating a sanctuary that reflects their essential self.'
    },
    asc: {
      title: 'Sun Rising',
      short: 'Personal magnetism, first impressions, vitality, and natural confidence.',
      detail: 'The Sun rising on the Ascendant creates a powerful line of personal magnetism and vital expression. Your appearance, demeanor, and immediate presence radiate confidence and warmth. This line is famous for increasing physical vitality, attractiveness, and the ability to make strong first impressions. Many report feeling more like themselves, more energized, and more naturally charismatic when on their Sun Ascendant line.'
    },
    dsc: {
      title: 'Sun Setting',
      short: 'Partnership, relationship enhancement, and shared creative projects.',
      detail: 'The Sun on the Descendant activates relationship dynamics and partnership potential. This line is traditionally associated with marriage, business partnerships, and collaborative ventures that benefit from mutual creativity and warmth. Here you tend to attract partners who honor your essential nature, and you naturally shine in one-on-one relationships. The line emphasizes compromise, though, so pure self-expression may need tempering for the sake of the partnership.'
    }
  },

  Moon: {
    mc: {
      title: 'Moon Culminating',
      short: 'Emotional public engagement, nurturing leadership, and intuitive career guidance.',
      detail: 'The Moon at the MC brings emotional intelligence to professional life and public standing. Your career may involve nurturing, counseling, hospitality, real estate, or public service. You excel in roles where emotional attunement and intuition guide decisions. This line often produces excellent teachers, therapists, and leaders who lead with empathy rather than authority. Your public reputation rests on emotional reliability and the sense that you truly care.'
    },
    ic: {
      title: 'Moon at the Root',
      short: 'Deep emotional security, family sanctuary, and ancestral connection.',
      detail: 'The Moon at the IC activates the deepest emotional needs and family ties. This is a line of profound security, where you connect with ancestral roots and the emotional foundation of your being. Here, home becomes a true sanctuary, family relationships deepen, and you feel safe to explore your emotional depths. Many report healing from past wounds and finding comfort in place when on this line. It supports gardening, cooking, and establishing a nurturing home environment.'
    },
    asc: {
      title: 'Moon Rising',
      short: 'Emotional openness, receptivity, and compassionate personal magnetism.',
      detail: 'The Moon on the Ascendant softens your presence and increases emotional accessibility. You appear more vulnerable, caring, and psychically sensitive. This line draws others to you because of your emotional attunement and genuine interest in their inner worlds. It\'s excellent for personal work, creative expression, and relationships where emotional honesty matters. Note that you may also absorb others\' emotions more readily, so boundaries are beneficial.'
    },
    dsc: {
      title: 'Moon Setting',
      short: 'Emotional partnership, intimate connection, and co-created nurturing.',
      detail: 'The Moon on the Descendant deepens emotional bonds in partnerships. This line strengthens your ability to nurture and be nurtured in relationships, creating interdependence and emotional safety with partners. Marriages and long-term partnerships often flourish here due to the enhanced emotional resonance between partners. The focus shifts toward what you share and build together, rather than individual achievement.'
    }
  },

  Mercury: {
    mc: {
      title: 'Mercury Culminating',
      short: 'Communication mastery, intellectual recognition, and teaching excellence.',
      detail: 'Mercury at the MC elevates your professional communication and intellectual standing. You excel in writing, speaking, teaching, and information-based careers. Your ideas gain traction in the public sphere, and you naturally attract opportunities to share your knowledge. This line supports journalism, academia, sales, and any work requiring clear articulation. Colleagues recognize your intelligence and wit, making advancement through merit likely.'
    },
    ic: {
      title: 'Mercury at the Root',
      short: 'Local communication, community connection, and intellectual grounding.',
      detail: 'Mercury at the IC brings mental clarity and strengthens local community ties. Your mind feels sharper at home, and you naturally become a local information hub or community connector. This line supports writing projects, intellectual hobbies, and local business ventures. Your home environment becomes rich with books, conversation, and mental stimulation. Many report improved memory and clearer thinking when settled on this line.'
    },
    asc: {
      title: 'Mercury Rising',
      short: 'Quick wit, mental agility, and expressive personal presence.',
      detail: 'Mercury on the Ascendant sharpens your intellect and makes you appear bright and articulate. Your quick wit and curiosity make you engaging company, and others enjoy your conversation. This line supports study, learning new skills, and short-distance travel. You naturally attract intellectual partnerships and collaborations. The potential downside: others may perceive you as scattered or overly intellectual rather than emotionally grounded.'
    },
    dsc: {
      title: 'Mercury Setting',
      short: 'Intellectual partnership, communicative rapport, and mutual growth.',
      detail: 'Mercury on the Descendant creates mental rapport and communicative ease in partnerships. You and your partner understand each other\'s thinking and can discuss issues openly. This line is excellent for professional partnerships, co-authored work, and relationships based on shared interests and conversation. However, the intellectual focus may sometimes overshadow emotional intimacy, so balance is important.'
    }
  },

  Venus: {
    mc: {
      title: 'Venus Culminating',
      short: 'Professional charm, financial success, and valued public presence.',
      detail: 'Venus at the MC brings charm, diplomacy, and financial success to your career. You excel in beauty-related fields (fashion, design, cosmetics), arts, counseling, or any work involving aesthetics and relationships. Your public reputation is warm and appealing, and others naturally want to work with you. This line often supports financial gain through your personal appeal and talents. Success comes through grace rather than force.'
    },
    ic: {
      title: 'Venus at the Root',
      short: 'Domestic beauty, sensory pleasure, and comfortable home life.',
      detail: 'Venus at the IC brings comfort, beauty, and pleasure to your private life and home environment. Your home becomes a place of genuine beauty and hospitality, where you enjoy cooking, gardening, and making your space aesthetically pleasing. This line supports real estate success and investment. Relationships with family members tend to be warmer and more harmonious. Life feels more sensually enjoyable and less stressful.'
    },
    asc: {
      title: 'Venus Rising',
      short: 'Personal attractiveness, warmth, and natural charm.',
      detail: 'Venus on the Ascendant increases your personal attractiveness, not just physically but in demeanor and presence. You appear warm, approachable, and aesthetically pleasing to others. This line enhances romance, social popularity, and the natural desire of others to be around you. However, some may project their ideals onto you, so maintain clear boundaries about your actual values and preferences.'
    },
    dsc: {
      title: 'Venus Setting',
      short: 'Romantic attraction, partnership harmony, and relationship ease.',
      detail: 'Venus on the Descendant is traditionally one of the most favorable lines for marriage and romantic partnership. Here you attract partners easily, relationships flow with less friction, and you naturally prioritize the partnership\'s happiness. Financial partnerships and joint ventures also tend to succeed. The potential shadow: you may compromise too much of yourself for the sake of harmony.'
    }
  },

  Mars: {
    mc: {
      title: 'Mars Culminating',
      short: 'Professional ambition, competitive success, and visible power.',
      detail: 'Mars at the MC drives professional ambition and visible achievement. You excel in competitive fields, leadership roles, and work requiring courage and assertion. Your career gains momentum through directness and willingness to act decisively. Colleagues recognize your drive and power, though some may find you intimidating. This line supports military, athletics, surgery, engineering, and other fields requiring precision and force. Success comes through assertion and victory.'
    },
    ic: {
      title: 'Mars at the Root',
      short: 'Physical vitality, personal courage, and grounded action.',
      detail: 'Mars at the IC strengthens your physical body, courage, and willingness to act at the foundation level. You have energy for building, renovating, and establishing your home as a strong base. This line supports physical training, martial arts, and work involving physical strength. Your inner reserves of determination deepen, and you feel less afraid to face internal or external challenges. Sex drive often increases, and relationships become more passionate.'
    },
    asc: {
      title: 'Mars Rising',
      short: 'Physical vitality, boldness, and direct personal presence.',
      detail: 'Mars on the Ascendant energizes your physical body and projects a bold, confident presence. You appear strong, direct, and unafraid. This line increases physical attractiveness in a powerful (rather than soft) way and tends to draw those who appreciate strength and assertiveness. Athletic ability and physical courage shine. Note: others may perceive you as aggressive or too direct, so awareness of how you come across is valuable.'
    },
    dsc: {
      title: 'Mars Setting',
      short: 'Passionate partnership, sexual attraction, and dynamic engagement.',
      detail: 'Mars on the Descendant brings passion and intensity to partnerships and sexual relationships. Here you attract partners with strength and charisma, and the relationship crackles with energy and desire. Passion flows easily, though so does conflict if not managed carefully. This line supports partnerships based on shared goals and mutual admiration. The caution: intense passion can become destructive, so conscious communication is important.'
    }
  },

  Jupiter: {
    mc: {
      title: 'Jupiter Culminating',
      short: 'Expansion, success, good fortune, and leadership opportunity.',
      detail: 'Jupiter at the MC is traditionally one of the most fortunate placements in astrocartography. Your career expands naturally, opportunities come easily, and you enjoy public recognition and esteem. This line supports law, higher education, philosophy, international business, and any field involving wisdom and expansion. Financial success often follows naturally. Others perceive you as fortunate, wise, and worthy of trust. Success comes through generosity and broad vision.'
    },
    ic: {
      title: 'Jupiter at the Root',
      short: 'Family expansion, abundance at home, and philosophical grounding.',
      detail: 'Jupiter at the IC brings expansion, abundance, and philosophical contentment to your private life and home. Your family grows (children, extended family), and your home becomes a gathering place of warmth and generosity. Real estate investments often succeed. This line supports a sense of spiritual belonging and comfort in your foundation. Life feels blessed, and you naturally attract good fortune in domestic matters.'
    },
    asc: {
      title: 'Jupiter Rising',
      short: 'Optimism, generosity, and naturally lucky personal presence.',
      detail: 'Jupiter on the Ascendant broadcasts optimism and good fortune. You appear lucky, generous, and naturally blessed to others. This line attracts people who want to help you and support your goals. Your confidence and faith in the future make you a natural leader and inspiration. The shadow: others may expect constant largesse, and you might overextend yourself in generosity.'
    },
    dsc: {
      title: 'Jupiter Setting',
      short: 'Partnership expansion, mutual growth, and shared luck.',
      detail: 'Jupiter on the Descendant brings expansion and good fortune to partnerships. Relationships bloom here, whether romantic or business. Both partners tend to grow and benefit from the union. This line supports marriage, business partnerships, and any ventures requiring mutual expansion. The relationship feels blessed and easy. The caution: excessive indulgence (financial or otherwise) can occur if both partners are careless.'
    }
  },

  Saturn: {
    mc: {
      title: 'Saturn Culminating',
      short: 'Professional mastery, serious achievement, and earned authority.',
      detail: 'Saturn at the MC demands professional responsibility and offers long-term success through discipline. Your career builds slowly but solidly, and your reputation rests on competence and reliability. This line supports government, law, engineering, architecture, and fields requiring deep expertise and ethical commitment. Others perceive you as serious and trustworthy. Success comes through consistent effort, not luck. Your highest achievements arrive after sustained work.'
    },
    ic: {
      title: 'Saturn at the Root',
      short: 'Stability, family responsibility, and ancestral lessons.',
      detail: 'Saturn at the IC anchors you to your foundations with profound stability. This line often involves reconnecting with family duty or learning lessons from ancestors. Your home and private life become more structured and secure, though sometimes restrictive. Real estate often appreciates steadily. Relationships with parents may deepen, along with the weight of family responsibility. Ultimately, this line provides unshakeable grounding.'
    },
    asc: {
      title: 'Saturn Rising',
      short: 'Serious demeanor, quiet dignity, and earned respect.',
      detail: 'Saturn on the Ascendant makes you appear serious, mature, and dignified beyond your years. Others take you seriously, though you may seem distant or stern. This line supports authority positions and work requiring careful judgment. Your personal magnetism is quiet and based on demonstrated competence rather than charm. Relationships tend to be with older, serious partners or those respecting your boundaries. Over time, this line can feel isolating unless you consciously soften.'
    },
    dsc: {
      title: 'Saturn Setting',
      short: 'Committed partnership, mature love, and karmic bonds.',
      detail: 'Saturn on the Descendant brings seriousness and commitment to partnerships. Relationships here are lasting, mature, and often karmic—you meet partners to learn mutual lessons. This line supports marriage, though the early stages may feel restrictive or duty-bound. Over time, the relationship deepens into genuine partnership and mutual respect. Financial contracts and business partnerships are reliable here. Love grows slowly and lasts.'
    }
  },

  Uranus: {
    mc: {
      title: 'Uranus Culminating',
      short: 'Revolutionary change, innovation, and unexpected professional transformation.',
      detail: 'Uranus at the MC brings sudden change, innovation, and the breaking of traditional boundaries in your career. Your professional path is unusual and may involve technology, science, activism, or any field promoting progress and change. This line brings sudden opportunity but also upheaval, so adaptability is essential. Your public reputation is as someone unconventional and forward-thinking. Success comes through embracing change and thinking ahead of the curve.'
    },
    ic: {
      title: 'Uranus at the Root',
      short: 'Domestic innovation, family freedom, and unconventional foundations.',
      detail: 'Uranus at the IC disrupts traditional home and family patterns, for better or worse. You may establish an unconventional living situation or break family patterns that no longer serve. This line supports technology-based home ventures and unique real estate situations. Family dynamics shift unexpectedly, and you likely seek freedom from restrictive family patterns. Innovation and experimentation in your domestic life flourish here.'
    },
    asc: {
      title: 'Uranus Rising',
      short: 'Unique presence, unconventional magnetism, and magnetic eccentricity.',
      detail: 'Uranus on the Ascendant makes you appear unique, avant-garde, and magnetically unusual. Others find you intriguing and remember you clearly. This line supports creative and technical work and attracts those who value individuality. Your personal magnetism is based on being different, not fitting in. Relationships tend to be unusual or non-traditional. The shadow: conventional society may judge you as too far outside the norm.'
    },
    dsc: {
      title: 'Uranus Setting',
      short: 'Unconventional partnership, freedom-based relationship, and mutual independence.',
      detail: 'Uranus on the Descendant brings unconventional partnership and an emphasis on mutual freedom. You attract partners who are unique, independent-minded, or technology-focused. The relationship itself may be unconventional (open, long-distance, or non-traditional arrangement). Both partners value independence highly. Commitment is based on freedom rather than obligation. The challenge: maintaining genuine intimacy while honoring autonomy.'
    }
  },

  Neptune: {
    mc: {
      title: 'Neptune Culminating',
      short: 'Spiritual career, artistic recognition, and inspired public service.',
      detail: 'Neptune at the MC brings spiritual, artistic, or compassionate dimensions to your career. You may work in art, music, healing, spirituality, or any field requiring imagination and idealism. Your public image is ethereal and inspiring, though sometimes vague. This line supports dream-work and visionary projects but can also bring confusion about career direction if you don\'t ground your ideals. Success comes through following your spiritual or creative calling.'
    },
    ic: {
      title: 'Neptune at the Root',
      short: 'Spiritual home, artistic sanctuary, and transcendent grounding.',
      detail: 'Neptune at the IC makes your home a spiritual or artistic sanctuary. You may be drawn to sacred or beautiful locations with strong spiritual atmosphere. This line supports meditation, creative retreats, and spiritual community living. Family relationships may feel mystical or confusing, with some secrets or illusions. Grounding practices are important to prevent escapism. At its best, this line connects you deeply to universal love.'
    },
    asc: {
      title: 'Neptune Rising',
      short: 'Ethereal presence, compassionate allure, and spiritual magnetism.',
      detail: 'Neptune on the Ascendant gives you an ethereal, dreamy, and spiritually magnetic presence. You appear mysterious, artistic, and compassionate to others, who often project their ideals onto you. This line supports spiritual teachers, artists, and healers. Your challenge is maintaining clear boundaries and personal identity, as others may blur the line between you and them. Self-care and clear grounding are essential.'
    },
    dsc: {
      title: 'Neptune Setting',
      short: 'Mystical partnership, idealized love, and spiritual communion.',
      detail: 'Neptune on the Descendant brings a spiritual, mystical quality to partnerships. You attract partners with artistic or spiritual depth, and the relationship feels transcendent or idealized. This line supports spiritual partnerships, artistic collaborations, and deeply intuitive bonds. The caution: confusion, illusion, and enabling are risks if you lose yourself in the relationship. Maintaining clear communication and boundaries protects both partners.'
    }
  },

  Pluto: {
    mc: {
      title: 'Pluto Culminating',
      short: 'Transformative power, deep authority, and profound professional change.',
      detail: 'Pluto at the MC brings transformative power and deep authority to your career. You may work in psychology, investigation, finance, or any field involving transformation and power dynamics. Your professional influence is quiet but profound, and you naturally command respect. This line supports healing professions and work involving shadow material. Success comes through understanding deep power dynamics and using them ethically. Your career will undergo major transformations.'
    },
    ic: {
      title: 'Pluto at the Root',
      short: 'Psychological depth, family transformation, and ancestral healing.',
      detail: 'Pluto at the IC brings deep psychological work and potential family transformation. This line often involves confronting family secrets, ancestral patterns, and psychological wounds. Real estate may involve purchasing property requiring deep renovation. Your home becomes a place of deep personal work and healing. Relationships with family members intensify and transform. At its best, this line supports profound healing and psychological depth.'
    },
    asc: {
      title: 'Pluto Rising',
      short: 'Intense presence, magnetic power, and psychological magnetism.',
      detail: 'Pluto on the Ascendant gives you a powerful, intense, and magnetically mysterious presence. People instinctively sense your psychological depth and power, even if you don\'t speak much. This line attracts those interested in psychology, power dynamics, and transformation. You naturally command attention and respect. The shadow: people may fear you or project their shadow onto you. Awareness of your impact on others is crucial.'
    },
    dsc: {
      title: 'Pluto Setting',
      short: 'Intense partnership, soul-level bonding, and transformative love.',
      detail: 'Pluto on the Descendant creates intense, soul-level partnerships with deep power dynamics. These relationships transform both partners fundamentally, often through periods of deep challenge and renewal. Sexual and psychological intimacy runs deep. Possessiveness and control issues can surface, so conscious awareness of power dynamics is essential. At its best, this line creates partnerships that facilitate profound personal evolution for both partners.'
    }
  },

  Chiron: {
    mc: {
      title: 'Chiron Culminating',
      short: 'Healing career, mentoring wisdom, and transformative teaching.',
      detail: 'Chiron at the MC brings healing and mentoring to your professional life. You may work as a therapist, healer, teacher, or mentor, using your own wounds as the source of your teaching. Your career emphasizes bridging gaps and helping others overcome what you\'ve overcome. Public recognition comes through your compassionate wisdom. This line supports work that transforms others\' wounds into strength. Your greatest professional gifts arise from your greatest challenges.'
    },
    ic: {
      title: 'Chiron at the Root',
      short: 'Family healing, ancestral wounds, and personal integration.',
      detail: 'Chiron at the IC brings ancestral and family wound healing to your foundation. You may resolve old family patterns or help family members heal. This line supports deep personal therapy work and home-based healing practices. Your sense of belonging in your family or homeland deepens as old wounds integrate. Domestic life becomes a place of genuine healing and wholeness.'
    },
    asc: {
      title: 'Chiron Rising',
      short: 'Healer\'s presence, wounded wisdom, and compassionate magnetism.',
      detail: 'Chiron on the Ascendant makes you appear as a healer or mentor figure to others. Your presence naturally invites people to share their wounds and seek your wisdom. This line draws those who need healing and mentoring. Your personal magnetism comes from your acceptance of your own wounds and your willingness to help others integrate theirs. Balance self-care with helping others.'
    },
    dsc: {
      title: 'Chiron Setting',
      short: 'Healing partnership, mutual mentoring, and integrated love.',
      detail: 'Chiron on the Descendant brings mutual healing and mentoring to partnerships. Both partners help each other transform their deepest wounds into wisdom. This line supports partnerships based on shared growth and mutual understanding of each other\'s sensitive areas. Sexual and emotional intimacy develops through vulnerability and acceptance. The relationship becomes a container for genuine healing and integration.'
    }
  },

  NorthNode: {
    mc: {
      title: 'North Node Culminating',
      short: 'Karmic career purpose, destined recognition, and soul-directed achievement.',
      detail: 'The North Node at the MC points to your karmic career purpose. Your professional achievements align with your soul\'s evolutionary direction. This line supports work that feels deeply meaningful and purposeful, even if challenging. Recognition comes as you align with your true calling. This is not an easy line—it requires that you grow and step into your highest potential. Your career becomes a vehicle for soul evolution.'
    },
    ic: {
      title: 'North Node at the Root',
      short: 'Karmic home foundation, soul-directed grounding, and destined belonging.',
      detail: 'The North Node at the IC points to your soul\'s needs for grounding and belonging. This line involves establishing roots that align with your evolutionary path. Your home and family become part of your soul\'s curriculum. You may be drawn to places or family situations that facilitate growth, even if challenging. Finding true home becomes a spiritual quest and achievement.'
    },
    asc: {
      title: 'North Node Rising',
      short: 'Karmic personal purpose, destined magnetism, and soul-directed identity.',
      detail: 'The North Node on the Ascendant points to your karmic personal purpose and destined identity. You naturally attract situations and people that push you toward your highest potential. Your personal magnetism draws those who support your growth. This line is not always comfortable, as it challenges you to become your best self. Authenticity and courage become your superpowers.'
    },
    dsc: {
      title: 'North Node Setting',
      short: 'Karmic partnership, soul-directed relationships, and destined bonding.',
      detail: 'The North Node on the Descendant points to karmic partnership and soul-directed relationships. You attract partners who facilitate your evolution, often through challenge as much as ease. The relationship serves your growth, even when difficult. This line supports partnerships with spiritual or karmic purpose. Love becomes a path of conscious evolution for both partners.'
    }
  }
};

function getCrossingInterpretation(pA,pB,angA,angB){
  var benefics=['Venus','Jupiter','Sun','Moon'];
  var malefics=['Mars','Saturn','Pluto','Uranus'];
  var angTheme={asc:'personal identity',dsc:'relationships',mc:'career and public life',ic:'home and inner world'};
  var isBenA=benefics.indexOf(pA)>=0,isBenB=benefics.indexOf(pB)>=0;
  var themeA=angTheme[angA]||angA,themeB=angTheme[angB]||angB;
  if(isBenA&&isBenB)return 'A powerfully fortunate crossing: '+pA+' energy flowing through your '+themeA+' meets '+pB+' influence on your '+themeB+'. This location amplifies luck, ease, and natural gifts in both areas simultaneously.';
  if(!isBenA&&!isBenB)return 'An intense crossing: '+pA+' energy channeled through your '+themeA+' collides with '+pB+' force on your '+themeB+'. This location demands conscious effort but offers deep transformation if you engage honestly with both energies.';
  return 'A dynamic crossing: '+pA+' energy through your '+themeA+' intersects '+pB+' influence on your '+themeB+'. This location blends challenge and opportunity, pushing growth in both domains through creative tension.';
}

function getChartSpecificAstroCartoVoice(planet,angleType,natalPositions){
  var base=ASTROCARTO_VOICE[planet]?ASTROCARTO_VOICE[planet][angleType]:null;
  if(!base||!natalPositions)return base;
  var pLon=natalPositions[planet];
  if(pLon===undefined||pLon===null)return base;
  var signs=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  var signIdx=Math.floor(((pLon%360)+360)%360/30);
  var sign=signs[signIdx];
  var dignities={Sun:{dom:'Leo',exalt:'Aries',det:'Aquarius',fall:'Libra'},Moon:{dom:'Cancer',exalt:'Taurus',det:'Capricorn',fall:'Scorpio'},Venus:{dom:'Taurus',exalt:'Pisces',det:'Scorpio',fall:'Virgo'},Mars:{dom:'Aries',exalt:'Capricorn',det:'Libra',fall:'Cancer'},Jupiter:{dom:'Sagittarius',exalt:'Cancer',det:'Gemini',fall:'Capricorn'},Saturn:{dom:'Capricorn',exalt:'Libra',det:'Cancer',fall:'Aries'},Mercury:{dom:'Gemini',exalt:'Virgo',det:'Sagittarius',fall:'Pisces'}};
  var dig=dignities[planet];
  var dignityNote='';
  if(dig){
    if(sign===dig.dom)dignityNote='Your natal '+planet+' is in its home sign '+sign+', making this line exceptionally powerful and natural for you.';
    else if(sign===dig.exalt)dignityNote='Your natal '+planet+' is exalted in '+sign+', amplifying the best qualities of this line with extra grace and ease.';
    else if(sign===dig.det)dignityNote='Your natal '+planet+' is in detriment in '+sign+', which means this line may require more conscious effort to harness, but offers unique growth.';
    else if(sign===dig.fall)dignityNote='Your natal '+planet+' is in fall in '+sign+', suggesting this line presents challenges that become your greatest teachers.';
    else dignityNote='Your natal '+planet+' is in '+sign+', giving this line a distinctly '+sign+' flavor in how it manifests for you.';
  }else{
    dignityNote='Your natal '+planet+' is in '+sign+', coloring this line with '+sign+' qualities unique to your chart.';
  }
  var houseNum=natalPositions.Ascendant!==undefined?Math.floor(((pLon-natalPositions.Ascendant+360)%360)/30)+1:null;
  var houseNote='';
  if(houseNum){
    var suf=houseNum===1?'st':houseNum===2?'nd':houseNum===3?'rd':'th';
    houseNote=' In your natal chart, '+planet+' lives in the '+houseNum+suf+' house, so this line also activates those life themes.';
  }
  return{title:base.title,short:base.short,detail:base.detail+' '+dignityNote+houseNote};
}

function getPlanetSpecificAdvice(planet,angleType){
  var advice={
    Sun:{mc:'Great for: leadership roles, career breakthroughs, public recognition, executive positions, or launching a personal brand.',ic:'Great for: finding your true home, connecting with family heritage, building a legacy property, or deepening self-understanding.',asc:'Great for: reinventing your image, solo ventures, health optimization, athletic pursuits, or stepping into the spotlight.',dsc:'Great for: meeting a life partner, creative collaborations, business partnerships with complementary strengths, or diplomatic work.'},
    Moon:{mc:'Great for: careers in nurturing fields (therapy, teaching, hospitality), public emotional engagement, or community leadership.',ic:'Great for: creating a sanctuary home, healing childhood patterns, gardening, cooking, or deepening family bonds.',asc:'Great for: emotional healing retreats, developing intuition, creative writing, photography, or counseling training.',dsc:'Great for: deepening emotional intimacy, finding a nurturing partner, co-parenting, or building trust-based partnerships.'},
    Venus:{mc:'Great for: careers in beauty, art, design, or finance. Networking events, brand partnerships, or luxury business ventures.',ic:'Great for: home beautification, real estate investment, hosting gatherings, culinary exploration, or creating domestic harmony.',asc:'Great for: first dates, personal styling, beauty treatments, art classes, or social events where charm matters.',dsc:'Great for: romantic getaways, marriage proposals, couples retreats, art collecting with a partner, or financial partnerships.'},
    Mars:{mc:'Great for: competitive career moves, athletic competitions, military or emergency services, surgery, or assertive negotiations.',ic:'Great for: home renovation, physical training regimens, martial arts practice, building personal courage, or confronting family issues.',asc:'Great for: physical challenges, adventure travel, starting a fitness journey, assertiveness training, or solo competitive events.',dsc:'Great for: passionate relationships, business partnerships requiring drive, competitive team ventures, or couples fitness goals.'},
    Jupiter:{mc:'Great for: career expansion, international business, higher education, publishing, legal matters, or philanthropic leadership.',ic:'Great for: expanding your home, hosting international guests, philosophical study, family celebrations, or real estate growth.',asc:'Great for: study abroad, spiritual retreats, personal growth workshops, adventure travel, or expanding your worldview.',dsc:'Great for: cross-cultural partnerships, joint business expansion, generous gift-giving, or finding a partner who broadens your horizons.'},
    Saturn:{mc:'Great for: long-term career building, government work, earning certifications, establishing authority, or restructuring your professional path.',ic:'Great for: establishing permanent roots, family responsibility, estate planning, structural home improvements, or ancestral research.',asc:'Great for: discipline-building, long-term health commitments, professional certifications, or projects requiring patience and endurance.',dsc:'Great for: committed long-term partnerships, business contracts, mentorship relationships, or building lasting institutional bonds.'},
    Mercury:{mc:'Great for: writing, publishing, teaching, public speaking, journalism, tech careers, or communication-based ventures.',ic:'Great for: home-based writing projects, local community engagement, learning new skills, or organizing your personal space.',asc:'Great for: networking, study, learning languages, starting a blog or podcast, or any venture requiring quick thinking.',dsc:'Great for: intellectual partnerships, co-writing, debate teams, couples counseling, or communication-heavy collaborations.'},
    Uranus:{mc:'Great for: tech startups, innovation roles, activism, breaking into unconventional careers, or sudden professional pivots.',ic:'Great for: smart home technology, unconventional living arrangements, breaking family patterns, or digital nomad setups.',asc:'Great for: radical self-reinvention, technology adoption, joining activist movements, or embracing your unique identity.',dsc:'Great for: unconventional relationships, tech partnerships, freedom-based arrangements, or collaborating with innovators.'},
    Neptune:{mc:'Great for: artistic careers, spiritual teaching, healing professions, filmmaking, music, or compassionate public service.',ic:'Great for: meditation retreats, creating a spiritual home, waterfront living, artistic sanctuary building, or dream work.',asc:'Great for: spiritual development, artistic expression, photography, dance, acting, or developing psychic sensitivity.',dsc:'Great for: soul-level partnerships, artistic collaborations, spiritual practice with a partner, or compassionate joint ventures.'},
    Pluto:{mc:'Great for: psychology careers, investigation, financial management, power restructuring, or deep institutional reform.',ic:'Great for: deep psychological work, ancestral healing, property renovation from the ground up, or confronting family shadows.',asc:'Great for: personal transformation, intense self-work, depth psychology, or stepping into personal power.',dsc:'Great for: transformative partnerships, therapeutic relationships, joint financial ventures, or deep trust-building.'},
    Chiron:{mc:'Great for: healing professions, mentoring, teaching from experience, holistic health careers, or advocacy work.',ic:'Great for: family healing, creating a healing home environment, processing childhood wounds, or ancestral reconciliation.',asc:'Great for: healing retreats, personal wound integration, training as a healer or counselor, or vulnerability-based leadership.',dsc:'Great for: healing partnerships, mutual mentoring, therapeutic relationships, or working with wounded healers.'},
    NorthNode:{mc:'Great for: aligning career with soul purpose, taking destined professional leaps, or finding your true calling.',ic:'Great for: finding your soul-home, karmic family healing, establishing roots aligned with your destiny.',asc:'Great for: stepping into your destined identity, courage-building, or authentic self-expression aligned with your path.',dsc:'Great for: destined partnerships, karmic relationship lessons, or meeting soul-aligned collaborators.'}
  };
  var pa=advice[planet];
  if(!pa)return 'Great for: exploring how this planet\'s energy manifests in this location for you.';
  return pa[angleType]||'Great for: exploring how this planet\'s energy manifests in this location for you.';
}
