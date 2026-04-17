// src/engine/aspects.js — extracted from index.html
// Aspect finding, transit importance, natal aspects, dignities, durations

// Aspects
const ASPECTS=[
  {name:'conjunction',angle:0,orb:8,type:'neutral'},
  {name:'semi-sextile',angle:30,orb:2,type:'minor'},
  {name:'sextile',angle:60,orb:5,type:'easy'},
  {name:'square',angle:90,orb:7,type:'hard'},
  {name:'trine',angle:120,orb:7,type:'easy'},
  {name:'quincunx',angle:150,orb:3,type:'minor'},
  {name:'opposition',angle:180,orb:8,type:'hard'}
];

function getOrb(a,tp,np){let o=a.orb;if(['Sun','Moon'].includes(np))o+=1;if(['Saturn','Jupiter','Uranus','Neptune','Pluto'].includes(tp))o+=1;return o;}

function findAspect(tL,nL,tp,np,jd){
  for(const a of ASPECTS){const orb=getOrb(a,tp,np);let d=Math.abs(norm(tL-nL)-a.angle);
    if(d>180)d=360-d;if(d<=orb){
      const T2=jdToT(jd+1);let tL2=getLon(tp,jd+1);
      let d2=Math.abs(norm(tL2-nL)-a.angle);if(d2>180)d2=360-d2;
      const ms=(tp!=='Sun'&&tp!=='Moon'&&tp!=='NorthNode')?motionStatus(tp,jd):null;
      let motion;if(d<0.3)motion='exact';else if(ms&&ms.stationary)motion='stationary';
      else if(d2<d)motion='applying';else motion='separating';
      return{...a,orbActual:Math.round(d*10)/10,motion};
    }}return null;}

function transitImportance(tp,np,a){let s=0;
  const ow={Pluto:50,Neptune:45,Uranus:40,Saturn:35,Jupiter:25,Chiron:18,Mars:12,Venus:8,Mercury:6,Sun:10,Moon:5,NorthNode:15};
  const nw={Sun:10,Moon:9,Ascendant:8,MC:7,NorthNode:6,Mercury:5,Venus:5,Mars:5,Jupiter:4,Saturn:4,Chiron:4,Uranus:3,Neptune:3,Pluto:3};
  s+=(ow[tp]||5)+(nw[np]||3);
  if(a.type==='hard')s+=5;if(a.name==='conjunction')s+=8;if(a.type==='minor')s-=5;
  if(a.motion==='exact')s+=10;if(a.motion==='stationary')s+=8;if(a.motion==='applying')s+=3;
  s-=a.orbActual*2;
  // Sect-aware weighting (nocturnal chart)
  if(tp===SECT.outSectMalefic&&a.type==='hard')s+=6; // Saturn hard aspects more dangerous out of sect
  if(tp===SECT.sectBenefic&&a.type==='easy')s+=3; // Venus easy aspects more helpful in sect
  if(tp===SECT.sectMalefic&&a.type==='hard')s-=2; // Mars hard aspects slightly mitigated in sect
  if(tp===SECT.outSectBenefic&&a.type==='easy')s-=1; // Jupiter easy aspects slightly weaker out of sect
  return s;}

// ─── Natal aspects ───
function natalAspectKey(p1,p2,name){const arr=[p1,p2].sort();return arr[0]+'-'+arr[1]+'|'+name;}

function findNatalAspects(){
  const out=[];
  const pts=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron','NorthNode','Ascendant','MC'];
  for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){
    const p1=pts[i],p2=pts[j];if(NATAL[p1]===undefined||NATAL[p2]===undefined)continue;
    if(p1==='Ascendant'&&p2==='MC')continue;
    for(const a of ASPECTS){
      let baseOrb=a.orb;
      if(['Sun','Moon'].includes(p1)||['Sun','Moon'].includes(p2))baseOrb+=1;
      if(['Ascendant','MC'].includes(p1)||['Ascendant','MC'].includes(p2))baseOrb=Math.min(baseOrb,6);
      let d=Math.abs(norm(NATAL[p1]-NATAL[p2])-a.angle);if(d>180)d=360-d;
      if(d<=baseOrb){out.push({p1,p2,aspect:a.name,type:a.type,orb:Math.round(d*100)/100});break;}
    }
  }}
  // Rank: exactness + involvement of luminaries/angles
  const rank={Sun:10,Moon:10,Ascendant:9,MC:8,Mercury:6,Venus:6,Mars:6,Jupiter:5,Saturn:5,Uranus:4,Neptune:4,Pluto:4,Chiron:3,NorthNode:4};
  out.sort((a,b)=>((rank[b.p1]||3)+(rank[b.p2]||3)-b.orb*2)-((rank[a.p1]||3)+(rank[a.p2]||3)-a.orb*2));
  return out;
}

function findExactDate(tp,np,aspectAngle,jd){
  const isMoon=tp==='Moon';const range=isMoon?15:90;const step=isMoon?.1:1;const nLon=NATAL[np];
  let bestJd=jd,bestOrb=999;
  for(let d=-range;d<=range;d+=step){const testJd=jd+d;const tLon=getLon(tp,testJd);
    let diff=Math.abs(norm(tLon-nLon)-aspectAngle);if(diff>180)diff=360-diff;
    if(diff<bestOrb){bestOrb=diff;bestJd=testJd;}}
  let lo=bestJd-step,hi=bestJd+step;
  for(let iter=0;iter<30;iter++){const m1=lo+(hi-lo)/3,m2=lo+2*(hi-lo)/3;
    let o1=Math.abs(norm(getLon(tp,m1)-nLon)-aspectAngle);
    let o2=Math.abs(norm(getLon(tp,m2)-nLon)-aspectAngle);
    if(o1>180)o1=360-o1;if(o2>180)o2=360-o2;if(o1<o2)hi=m2;else lo=m1;}
  const eJd=(lo+hi)/2;const eDate=jdToDate(eJd);return eDate;}

function fmtExactDate(d){if(!d)return'';const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m[d.getMonth()]+' '+d.getDate();}

function findIngresses(cur,jd){const ing=[];
  for(const p of['Sun','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','Chiron']){
    const cs=Math.floor(cur[p]/30);
    for(let d=1;d<=7;d++){const fT=jdToT(jd+d);
      const fl=p==='Sun'?sunLongitude(fT):geocentricLon(p,fT);
      if(Math.floor(fl/30)!==cs){ing.push({planet:p,sign:SIGNS[Math.floor(fl/30)],signIdx:Math.floor(fl/30),days:d});break;}}}
  return ing;}

// Dignities
const RULERS={Aries:'Mars',Taurus:'Venus',Gemini:'Mercury',Cancer:'Moon',Leo:'Sun',Virgo:'Mercury',
  Libra:'Venus',Scorpio:'Pluto',Sagittarius:'Jupiter',Capricorn:'Saturn',Aquarius:'Uranus',Pisces:'Neptune'};
const DETRIMENT={Aries:'Venus',Taurus:'Pluto',Gemini:'Jupiter',Cancer:'Saturn',Leo:'Uranus',Virgo:'Neptune',
  Libra:'Mars',Scorpio:'Venus',Sagittarius:'Mercury',Capricorn:'Moon',Aquarius:'Sun',Pisces:'Mercury'};
const EXALT={Aries:'Sun',Cancer:'Jupiter',Libra:'Saturn',Capricorn:'Mars',Taurus:'Moon',Virgo:'Mercury',Pisces:'Venus',Scorpio:'Uranus'};
const FALL={Libra:'Sun',Capricorn:'Jupiter',Aries:'Saturn',Cancer:'Mars',Scorpio:'Moon',Pisces:'Mercury',Virgo:'Venus',Taurus:'Uranus'};

function getDignity(p,lon){const s=signOf(lon).name;
  if(RULERS[s]===p)return{label:'Domicile',color:'var(--emerald)',desc:'This planet rules this sign — it operates at full strength here, expressing its nature freely and powerfully.'};
  if(DETRIMENT[s]===p)return{label:'Detriment',color:'var(--crimson)',desc:'This planet is in the sign opposite its home — it must work harder to express itself, often creating tension or over-compensation.'};
  if(EXALT[s]===p)return{label:'Exalted',color:'var(--gold)',desc:'This planet is honored and elevated in this sign — its best qualities are amplified and refined.'};
  if(FALL[s]===p)return{label:'Fall',color:'var(--amber)',desc:'This planet struggles in this sign — its energy is weakened or misdirected, requiring conscious effort to express well.'};
  return null;}

// Transit duration labels
const DUR={Sun:'~1 day',Moon:'~6 hours',Mercury:'1-2 weeks',Venus:'1-3 weeks',Mars:'2-4 weeks',
  Jupiter:'3-4 weeks',Saturn:'3-6 months',Uranus:'1-2 years',Neptune:'2-3 years',Pluto:'2-4 years',
  Chiron:'4-6 months',NorthNode:'2-3 months'};

function nextExactDatesThisWeek(transits){
  const out=[];const now=new Date();const wkEnd=new Date(now);wkEnd.setDate(wkEnd.getDate()+7);
  for(const t of transits){
    if(!t.exactDate)continue;
    if(t.exactDate>=now&&t.exactDate<=wkEnd){
      out.push({date:t.exactDate,tp:t.tp,np:t.np,aspect:t.aspect.name});
    }
  }
  out.sort((a,b)=>a.date-b.date);
  return out.slice(0,4);
}
