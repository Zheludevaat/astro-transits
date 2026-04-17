// src/engine/motion.js — extracted from index.html
// Planetary motion and retrograde/stationary detection

function planetMotion(planet,jd){
  const T1=jdToT(jd-.5),T2=jdToT(jd+.5);
  let l1,l2;
  if(planet==='Sun'){l1=sunLongitude(T1);l2=sunLongitude(T2);}
  else if(planet==='Moon'){l1=moonLongitude(T1);l2=moonLongitude(T2);}
  else if(planet==='NorthNode'){l1=trueNodeLongitude(T1);l2=trueNodeLongitude(T2);}
  else{l1=geocentricLon(planet,T1);l2=geocentricLon(planet,T2);}
  let d=l2-l1;if(d>180)d-=360;if(d<-180)d+=360;return d;
}
function motionStatus(planet,jd){
  const m=planetMotion(planet,jd),am=Math.abs(m);
  const th={Mercury:.15,Venus:.08,Mars:.03,Jupiter:.01,Saturn:.005,Uranus:.003,Neptune:.002,Pluto:.002,Chiron:.005};
  return am<(th[planet]||.01)?{retrograde:m<0,stationary:true,motion:m}:{retrograde:m<0,stationary:false,motion:m};
}
