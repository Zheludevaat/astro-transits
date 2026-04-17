// ══════════════════════════════════════════════════════════════
// hellenistic/profections.js — Annual and monthly profections
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

function computeProfections(date){
  const birth=new Date(Date.UTC(BIRTH.year,BIRTH.month-1,BIRTH.day));
  const d=typeof date==='number'?jdToDate(date):date; // accept JD or Date
  const ms=d.getTime()-birth.getTime();
  const ageYears=Math.floor(ms/(365.25*24*3600000));
  const ascSignIdx=Math.floor(norm(NATAL.Ascendant)/30); // Pisces=11

  // Annual profection
  const yearIdx=(ascSignIdx+(ageYears%12))%12;
  const yearSign=SIGNS[yearIdx];
  const yearLord=TRAD_RULERS[yearSign];

  // Monthly profection (each calendar month from birthday advances one sign)
  const lastBday=new Date(d.getFullYear(),BIRTH.month-1,BIRTH.day);
  if(d<lastBday)lastBday.setFullYear(lastBday.getFullYear()-1);
  let monthsSince=0;
  const tmp=new Date(lastBday);
  while(true){const nxt=new Date(tmp);nxt.setMonth(nxt.getMonth()+1);if(nxt>d)break;tmp.setMonth(tmp.getMonth()+1);monthsSince++;}
  const monthIdx=(yearIdx+(monthsSince%12))%12;
  const monthSign=SIGNS[monthIdx];
  const monthLord=TRAD_RULERS[monthSign];

  return{ageYears,yearIdx,yearSign,yearLord,monthIdx,monthSign,monthLord};
}
