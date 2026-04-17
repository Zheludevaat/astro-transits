// ══════════════════════════════════════════════════════════════
// hellenistic/zr.js — Zodiacal Releasing from Spirit and Fortune
// Extracted from index.html — Phase 0 mechanical extraction
// ══════════════════════════════════════════════════════════════

const ZR_YEARS={
  Aries:15,Taurus:8,Gemini:20,Cancer:25,Leo:19,Virgo:20,
  Libra:8,Scorpio:15,Sagittarius:12,Capricorn:27,Aquarius:27,Pisces:12
};
const ZR_COLORS={
  Aries:'#e0425d',Taurus:'#3dd9a0',Gemini:'#f5b843',Cancer:'#9b6dff',
  Leo:'#ffb142',Virgo:'#5cd6a8',Libra:'#f58ca3',Scorpio:'#c13b5a',
  Sagittarius:'#8a5cf0',Capricorn:'#4a6278',Aquarius:'#4a9eff',Pisces:'#7fc6e8'
};
// Returns sign index (0=Aries) for an L-period index given the starting sign
function zrNext(signIdx){return(signIdx+1)%12;}

// Compute Level 1 and Level 2 periods from startLot to limitDate
// birthDate: Date object; startSignIdx: 0-11; yearsTotal: how many years to project
function computeZR(startSignIdx,birthDate,yearsTotal){
  const periods=[];
  let cursor=0; // years elapsed since birth
  let signIdx=startSignIdx;
  while(cursor<yearsTotal){
    const signName=SIGNS[signIdx];
    const len=ZR_YEARS[signName];
    const p={
      level:1,
      signIdx,
      sign:signName,
      ruler:TRAD_RULERS[signName],
      startYears:cursor,
      endYears:cursor+len,
      startDate:new Date(birthDate.getTime()+cursor*365.2425*86400000),
      endDate:new Date(birthDate.getTime()+(cursor+len)*365.2425*86400000),
      lengthYears:len,
      peak:((signIdx-startSignIdx+12)%12)%3===0 && ((signIdx-startSignIdx+12)%12)!==0,
      subperiods:[]
    };
    // Sub-periods (L2): each L1 is divided proportionally by the same zodiacal rule
    let subSignIdx=signIdx;
    let subCursor=0;
    while(subCursor<len-0.001){
      const subSignName=SIGNS[subSignIdx];
      const subLenRaw=ZR_YEARS[subSignName];
      const subLen=Math.min(subLenRaw,len-subCursor);
      p.subperiods.push({
        level:2,
        signIdx:subSignIdx,
        sign:subSignName,
        ruler:TRAD_RULERS[subSignName],
        startYears:cursor+subCursor,
        endYears:cursor+subCursor+subLen,
        startDate:new Date(birthDate.getTime()+(cursor+subCursor)*365.2425*86400000),
        endDate:new Date(birthDate.getTime()+(cursor+subCursor+subLen)*365.2425*86400000),
        lengthYears:subLen,
        truncated:subLen<subLenRaw,
        peak:((subSignIdx-startSignIdx+12)%12)%3===0 && ((subSignIdx-startSignIdx+12)%12)!==0
      });
      subCursor+=subLen;
      subSignIdx=zrNext(subSignIdx);
    }
    periods.push(p);

    // LB detection: if NEXT sign is the 8th from startSignIdx, jump to 9th
    const nextIdx=zrNext(signIdx);
    if(((nextIdx-startSignIdx+12)%12)===7){
      p.lbFollows=true;
      signIdx=(startSignIdx+8)%12;
    } else {
      signIdx=nextIdx;
    }
    cursor+=len;
  }
  return periods;
}

function findCurrentZRPeriod(periods,nowYears){
  for(const p of periods){
    if(nowYears>=p.startYears&&nowYears<p.endYears){
      const sub=p.subperiods.find(s=>nowYears>=s.startYears&&nowYears<s.endYears);
      return{l1:p,l2:sub};
    }
  }
  return null;
}
