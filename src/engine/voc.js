// ============================================================================
// voc.js — Void of Course Moon detection
// Extracted from index.html (Phase 0 — pure mechanical extraction)
// ============================================================================

function isVoidOfCourse(moonLon,jd){
  // Moon takes ~2.5 days per sign; max time to next sign boundary is ~60h.
  // Extend lookahead to 150h (6.25 days) to safely cover any VOC -> ingress gap.
  const ms=Math.floor(moonLon/30),aspA=[0,60,90,120,180];
  const tps=['Sun','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  let ingressHour=null,ingressSign=null;
  for(let h=.5;h<=150;h+=1){
    const fJd=jd+h/24,fT=jdToT(fJd),fMl=moonLongitude(fT);
    if(ingressHour===null && Math.floor(fMl/30)!==ms){
      ingressHour=h; ingressSign=SIGNS[Math.floor(fMl/30)];
    }
    // Check for perfecting aspect before ingress
    for(const p of tps){const pL=p==='Sun'?sunLongitude(fT):geocentricLon(p,fT);
      for(const aa of aspA){let d=norm(fMl-pL),o=Math.abs(d-aa);if(o>180)o=360-o;
        if(aa===0){let ad=Math.abs(d);if(ad>180)ad=360-ad;if(ad<1)return{voc:false};}
        else if(o<1)return{voc:false};}}
    if(ingressHour!==null && h>=ingressHour) break;
  }
  if(ingressHour!==null)return{voc:true,endsIn:ingressHour,nextSign:ingressSign};
  return{voc:true,endsIn:150,nextSign:'?'};
}
