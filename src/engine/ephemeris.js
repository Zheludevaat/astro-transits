// src/engine/ephemeris.js — extracted from index.html
// Astronomical engine v3 — True Node, improved Chiron

const DEG=Math.PI/180,RAD=180/Math.PI;
const sin=a=>Math.sin(a*DEG),cos=a=>Math.cos(a*DEG),atan2d=(y,x)=>Math.atan2(y,x)*RAD;
const norm=a=>((a%360)+360)%360;

function julianDate(y,m,d,h=0){if(m<=2){y--;m+=12;}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+h/24+B-1524.5;}
function jdToT(jd){return(jd-2451545.0)/36525;}

function sunLongitude(T){
  const L0=norm(280.46646+36000.76983*T+.0003032*T*T);
  const M=norm(357.52911+35999.05029*T-.0001537*T*T);
  const C=(1.914602-.004817*T)*sin(M)+(.019993-.000101*T)*sin(2*M)+.000289*sin(3*M);
  return norm(L0+C);
}

function moonLongitude(T){
  const Lp=norm(218.3164477+481267.88123421*T-.0015786*T*T+T*T*T/538841-T*T*T*T/65194000);
  const D=norm(297.8501921+445267.1114034*T-.0018819*T*T+T*T*T/545868-T*T*T*T/113065000);
  const M=norm(357.5291092+35999.0502909*T-.0001536*T*T+T*T*T/24490000);
  const Mp=norm(134.9633964+477198.8675055*T+.0087414*T*T+T*T*T/69699-T*T*T*T/14712000);
  const F=norm(93.2720950+483202.0175233*T-.0036539*T*T-T*T*T/3526000+T*T*T*T/863310000);
  const A1=norm(119.75+131.849*T),A2=norm(53.09+479264.290*T);
  const E=1-.002516*T-.0000074*T*T,E2=E*E;
  const t=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],
    [0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],
    [2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],
    [0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],
    [4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],
    [2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],
    [2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],
    [2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],
    [0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],
    [2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],[3,0,-1,0,-892],
    [2,1,1,0,-810],[4,-1,-2,0,759],[0,2,-1,0,-713],[2,2,-1,0,-700],
    [2,1,-2,0,691],[2,-1,0,-2,596],[4,0,1,0,549],[0,0,4,0,537],
    [4,-1,0,0,520],[1,0,-2,0,-487],[2,1,0,-2,-399],[0,0,2,-2,-381],
    [1,1,1,0,351],[3,0,-2,0,-340],[4,0,-3,0,330],[2,-1,2,0,327],
    [0,2,1,0,-323],[1,1,-1,0,299],[2,0,3,0,294]];
  let SL=0;
  for(const[d,m,mp,f,c]of t){let v=sin(d*D+m*M+mp*Mp+f*F);
    if(Math.abs(m)===1)v*=E;else if(Math.abs(m)===2)v*=E2;SL+=c*v;}
  SL+=3958*sin(A1)+1962*sin(Lp-F)+318*sin(A2);
  return norm(Lp+SL/1000000);
}

// True Node (mean node + principal perturbation terms)
function trueNodeLongitude(T){
  const Om=norm(125.0446-1934.1363*T+.0021*T*T);
  const D=norm(297.8501921+445267.1114034*T);
  const M=norm(357.5291092+35999.0502909*T);
  const Mp=norm(134.9633964+477198.8675055*T);
  const F=norm(93.2720950+483202.0175233*T);
  let corr=-1.4979*sin(2*(D-F)) -.1500*sin(M) -.1226*sin(2*D)
    +.1176*sin(2*F) -.0801*sin(2*(Mp-F));
  return norm(Om+corr);
}

const ELEMENTS={
  Mercury:{v:[.38709927,.20563593,7.00497902,252.25032350,77.45779628,48.33076593],r:[.00000037,.00001906,-.00594749,149472.67411175,.16047689,-.12534081]},
  Venus:{v:[.72333566,.00677672,3.39467605,181.97909950,131.60246718,76.67984255],r:[.00000390,-.00004107,-.00078890,58517.81538729,.00268329,-.27769418]},
  Earth:{v:[1.00000261,.01671123,-.00001531,100.46457166,102.93768193,0],r:[.00000562,-.00004392,-.01294668,35999.37244981,.32327364,0]},
  Mars:{v:[1.52371034,.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891],r:[.00001847,.00007882,-.00813131,19140.30268499,.44441088,-.29257343]},
  Jupiter:{v:[5.20288700,.04838624,1.30439695,34.39644051,14.72847983,100.47390909],r:[-.00011607,-.00013253,-.00183714,3034.74612775,.21252668,.20469106]},
  Saturn:{v:[9.53667594,.05386179,2.48599187,49.95424423,92.59887831,113.66242448],r:[-.00125060,-.00050991,.00193609,1222.49362201,-.41897216,-.28867794]},
  Uranus:{v:[19.18916464,.04725744,.77263783,313.23810451,170.95427630,74.01692503],r:[-.00196176,-.00004397,-.00242939,428.48202785,.40805281,.04240589]},
  Neptune:{v:[30.06992276,.00859048,1.77004347,-55.12002969,44.96476227,131.78422574],r:[.00026291,.00005105,.00035372,218.45945325,-.32241464,-.00508664]},
  Pluto:{v:[39.48211675,.24882730,17.14001206,238.92903833,224.06891629,110.30393684],r:[-.00031596,.00005170,.00004818,145.20780515,-.04062942,-.01183482]},
  Chiron:{v:[13.648,0.3791,6.926,214.07,188.64,209.21],r:[-.0004,.000023,-.0039,720.40,0.59,-0.13]},
};
const EXTRA={
  Jupiter:[-.00012452,.06064060,-.35635438,38.35125000],
  Saturn:[.00025899,-.13434469,.87320147,38.35125000],
  Uranus:[.00058331,-.97731848,.17689245,7.67025000],
  Neptune:[-.00041348,.68346318,-.10162547,7.67025000],
  Pluto:[-.01262724,0,0,0],
};

function heliocentricLon(planet,T){
  const el=ELEMENTS[planet];
  const a=el.v[0]+el.r[0]*T,e=el.v[1]+el.r[1]*T,I=el.v[2]+el.r[2]*T;
  let L=norm(el.v[3]+el.r[3]*T);
  const lp=el.v[4]+el.r[4]*T,node=el.v[5]+el.r[5]*T;
  if(EXTRA[planet]){const[b,c,s,f]=EXTRA[planet];L+=f!==0?b*T*T+c*cos(f*T)+s*sin(f*T):b*T*T;L=norm(L);}
  let M_=norm(L-lp),E_=M_;
  for(let i=0;i<30;i++){const dE=(M_-(E_-e*RAD*sin(E_)))/(1-e*cos(E_));E_+=dE;if(Math.abs(dE)<1e-10)break;}
  const xp=a*(cos(E_)-e),yp=a*Math.sqrt(1-e*e)*sin(E_);
  const cN=cos(node),sN=sin(node),cI=cos(I),w=lp-node,cW=cos(w),sW=sin(w);
  const x=(cN*cW-sN*sW*cI)*xp+(-cN*sW-sN*cW*cI)*yp;
  const y=(sN*cW+cN*sW*cI)*xp+(-sN*sW+cN*cW*cI)*yp;
  return{lon:norm(atan2d(y,x)),dist:Math.sqrt(x*x+y*y)};
}
function geocentricLon(planet,T){
  const e=heliocentricLon('Earth',T),p=heliocentricLon(planet,T);
  return norm(atan2d(p.dist*sin(p.lon)-e.dist*sin(e.lon),p.dist*cos(p.lon)-e.dist*cos(e.lon)));
}

function moonPhase(T){return norm(moonLongitude(T)-sunLongitude(T));}
function moonPhaseInfo(a){
  const phases=[['New Moon',0],['Waxing Crescent',45],['First Quarter',90],['Waxing Gibbous',135],
    ['Full Moon',180],['Waning Gibbous',225],['Last Quarter',270],['Waning Crescent',315]];
  for(let i=phases.length-1;i>=0;i--)if(a>=phases[i][1]-22.5||i===0)return{name:phases[i>0&&a<22.5?0:i][0]};
  return{name:'New Moon'};
}

// isVoidOfCourse is defined in src/engine/voc.js

const SIGNS=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_ABBR=['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];

function signOf(l){const i=Math.floor(norm(l)/30);const deg=norm(l)%30;
  return{name:SIGNS[i],abbr:SIGN_ABBR[i],index:i,degree:Math.floor(deg),degInSign:deg,minute:Math.floor((deg%1)*60)};}
function fmtShort(l){const s=signOf(l);return`${s.degree}° ${s.abbr}`;}
function fmtLong(l){const s=signOf(l);return`${s.degree}°${String(s.minute).padStart(2,'0')}' ${s.name}`;}

// Birth data
const BIRTH={year:1996,month:7,day:2,hour:4+8/60,lat:40.9256,lon:-73.1409};
// Observer location (where the user is using the app — affects planetary hours, sun times, displayed clock)
const OBSERVER={lat:47.3769,lon:8.5417,tzName:'Europe/Zurich',label:'Zürich'};
// Returns the current UTC offset (in hours) of OBSERVER.tzName for a given Date, accounting for DST.
function tzOffsetHours(date){
  try{
    const dtf=new Intl.DateTimeFormat('en-US',{timeZone:OBSERVER.tzName,timeZoneName:'shortOffset'});
    const parts=dtf.formatToParts(date);
    const tzn=parts.find(p=>p.type==='timeZoneName');
    if(tzn){const m=tzn.value.match(/GMT([+-]\d+)(?::(\d+))?/);
      if(m){return parseInt(m[1],10)+(m[2]?Math.sign(parseInt(m[1],10))*parseInt(m[2],10)/60:0);}}
  }catch(e){}
  return 1; // fallback CET
}

function computeAll(jd){const T=jdToT(jd);return{Sun:sunLongitude(T),Moon:moonLongitude(T),
  Mercury:geocentricLon('Mercury',T),Venus:geocentricLon('Venus',T),Mars:geocentricLon('Mars',T),
  Jupiter:geocentricLon('Jupiter',T),Saturn:geocentricLon('Saturn',T),Uranus:geocentricLon('Uranus',T),
  Neptune:geocentricLon('Neptune',T),Pluto:geocentricLon('Pluto',T),Chiron:geocentricLon('Chiron',T),
  NorthNode:trueNodeLongitude(T)};}

function computeAsc(jd,lat,lon){const T=jdToT(jd);
  const LST=norm(280.46061837+360.98564736629*(jd-2451545)+.000387933*T*T+lon);
  const eps=23.4393-.0130*T;
  return norm(Math.atan2(cos(LST),-(sin(eps)*Math.tan(lat*DEG)+cos(eps)*sin(LST)))*RAD);}
function computeMC(jd,lon){const T=jdToT(jd);
  const LST=norm(280.46061837+360.98564736629*(jd-2451545)+.000387933*T*T+lon);
  const eps=23.4393-.0130*T;let mc=norm(atan2d(Math.tan(LST*DEG),cos(eps)));
  const d=norm(mc-LST);if(d>90&&d<270)mc=norm(mc+180);return mc;}

const NJD=julianDate(BIRTH.year,BIRTH.month,BIRTH.day,BIRTH.hour);
const NATAL=computeAll(NJD);
NATAL.Ascendant=computeAsc(NJD,BIRTH.lat,BIRTH.lon);
NATAL.MC=computeMC(NJD,BIRTH.lon);

// Placidus house cusps (verified against Swiss Ephemeris for birth data)
const HOUSES=[358.8483,40.7474,67.8144,89.3949,110.8756,137.5807,178.8483,220.7474,247.8144,269.3949,290.8756,317.5807];
function houseOf(lon){const l=norm(lon);for(let i=0;i<12;i++){const s=HOUSES[i],e=HOUSES[(i+1)%12];
  if(s<e){if(l>=s&&l<e)return i+1;}else{if(l>=s||l<e)return i+1;}}return 1;}

function jdToDate(jd){const z=Math.floor(jd+.5);const a=z<2299161?z:z+1+Math.floor((z-1867216.25)/36524.25)-Math.floor(Math.floor((z-1867216.25)/36524.25)/4);
  const b=a+1524;const c=Math.floor((b-122.1)/365.25);const d=Math.floor(365.25*c);const e=Math.floor((b-d)/30.6001);
  const day=b-d-Math.floor(30.6001*e);const month=e<14?e-1:e-13;const year=month>2?c-4716:c-4715;
  return new Date(year,month-1,day);}

function getLon(planet,jd){const T=jdToT(jd);if(planet==='Sun')return sunLongitude(T);if(planet==='Moon')return moonLongitude(T);
  if(planet==='NorthNode')return trueNodeLongitude(T);return geocentricLon(planet,T);}
