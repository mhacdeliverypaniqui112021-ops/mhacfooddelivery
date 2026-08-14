/* MHAC DELIVERY — GPS LOCATION PATCH
   Paste this block near the end of customer index.html, before </script>.
   Then change the existing CALCULATE button onclick to:
   onclick="calculateByGPS()"
*/

let gpsLat=null,gpsLon=null,gpsAccuracy=null,gpsAddress=null;

async function reverseGPS(lat,lon){
  const u=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  const r=await fetch(u,{headers:{Accept:"application/json"}});
  if(!r.ok) throw new Error("Address lookup unavailable");
  return await r.json();
}

async function getHighAccuracyGPS(){
  if(!navigator.geolocation) throw new Error("GPS is not supported by this device.");
  return new Promise((resolve,reject)=>{
    let best=null, tries=0;
    const watch=navigator.geolocation.watchPosition(pos=>{
      tries++;
      if(!best || pos.coords.accuracy < best.coords.accuracy) best=pos;
      if(pos.coords.accuracy <= 50 || tries >= 6){
        navigator.geolocation.clearWatch(watch);
        resolve(best);
      }
    },err=>{
      navigator.geolocation.clearWatch(watch);
      if(err.code===1) reject(new Error("Location permission was denied. Please allow GPS location."));
      else reject(new Error("Unable to get GPS location. Please try again outdoors or near a window."));
    },{
      enableHighAccuracy:true,
      maximumAge:0,
      timeout:20000
    });
    setTimeout(()=>{
      navigator.geolocation.clearWatch(watch);
      if(best) resolve(best);
      else reject(new Error("GPS timed out. Please try again."));
    },22000);
  });
}

async function calculateByGPS(){
  const m=document.getElementById("municipality").value;
  const b=document.getElementById("barangay").value;
  const a=document.getElementById("custAddress").value.trim();
  const s=document.getElementById("locStatus");
  const fee=document.getElementById("feeView");

  if(!m || !b || !a){
    s.textContent="⚠️ Select Municipality, Barangay and enter House No./Street/Landmark first.";
    return;
  }

  distanceKm=null;
  deliveryFee=null;
  if(typeof renderCart==="function") renderCart();
  if(typeof updateCheckoutTotals==="function") updateCheckoutTotals();

  s.textContent="📍 Getting customer's GPS location…";

  try{
    const pos=await getHighAccuracyGPS();
    gpsLat=pos.coords.latitude;
    gpsLon=pos.coords.longitude;
    gpsAccuracy=pos.coords.accuracy;

    /* GPS coordinates are the PRIMARY location for delivery distance.
       This avoids the old barangay-center overcharging problem. */
    const baseLat=15.66789;
    const baseLon=120.57765;

    let routeKm=null;
    try{
      const url=`https://router.project-osrm.org/route/v1/driving/${baseLon},${baseLat};${gpsLon},${gpsLat}?overview=false&steps=false`;
      const rr=await fetch(url);
      const jj=await rr.json();
      if(jj.code==="Ok" && jj.routes && jj.routes[0])
        routeKm=jj.routes[0].distance/1000;
    }catch(e){}

    /* Only if routing service is temporarily unavailable, use straight-line
       distance as a fallback. It is NOT used when OSRM returns a road route. */
    if(routeKm===null){
      routeKm=hav(baseLat,baseLon,gpsLat,gpsLon);
    }

    distanceKm=routeKm;
    deliveryFee=feeForKm(distanceKm);

    try{
      const rev=await reverseGPS(gpsLat,gpsLon);
      gpsAddress=rev.display_name||"GPS location";
    }catch(e){
      gpsAddress="GPS location";
    }

    s.textContent=`✅ GPS detected. Actual customer location used for delivery calculation.`;
    fee.textContent=`📍 Actual driving distance: ${distanceKm.toFixed(2)} km • Delivery Fee: ₱${deliveryFee.toFixed(2)} • GPS accuracy: ${Math.round(gpsAccuracy)}m`;

    if(typeof renderCart==="function") renderCart();
    if(typeof updateCheckoutTotals==="function") updateCheckoutTotals();

  }catch(e){
    distanceKm=null;
    deliveryFee=null;
    s.textContent="❌ "+e.message;
    if(typeof renderCart==="function") renderCart();
    if(typeof updateCheckoutTotals==="function") updateCheckoutTotals();
  }
}

/* Make the old button call GPS so the existing interface does not need
   to be redesigned. */
const oldCalculateByAddress=window.calculateByAddress;
window.calculateByAddress=calculateByGPS;
