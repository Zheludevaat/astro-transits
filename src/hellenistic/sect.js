// ══════════════════════════════════════════════════════════════
// hellenistic/sect.js — Sect constants and traditional rulers
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

// Traditional domicile rulers (Scorpio→Mars, Aquarius→Saturn, Pisces→Jupiter)
const TRAD_RULERS={Aries:'Mars',Taurus:'Venus',Gemini:'Mercury',Cancer:'Moon',Leo:'Sun',Virgo:'Mercury',
  Libra:'Venus',Scorpio:'Mars',Sagittarius:'Jupiter',Capricorn:'Saturn',Aquarius:'Saturn',Pisces:'Jupiter'};

// Nocturnal chart (Sun below horizon at birth)
const SECT={
  isNocturnal:true,
  sectLight:'Moon', outSectLight:'Sun',
  sectBenefic:'Venus', outSectBenefic:'Jupiter',
  sectMalefic:'Mars', outSectMalefic:'Saturn'
};
