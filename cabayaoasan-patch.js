/* MHAC DELIVERY — CABAYAOASAN TARGETED PATCH
   Only affects Cabayaoasan, Paniqui.
   All other barangays keep the existing calculation.
*/

(function(){
  const CABAYAOASAN = {
    municipality: "PANIQUI",
    barangay: "CABAYAOASAN",
    // Approximate central point for Cabayaoasan, Paniqui.
    // The customer's GPS remains the actual endpoint when available.
    lat: 15.6578,
    lon: 120.5645
  };

  function norm(v){
    return String(v||"").toUpperCase().replace(/[.,'’\-]/g," ").replace(/\s+/g," ").trim();
  }

  function isCabayaoasan(){
    const m=document.getElementById("municipality")?.value;
    const b=document.getElementById("barangay")?.value;
    return norm(m)===CAYABAOASAN.municipality && norm(b)===CAYABAOASAN.barangay;
  }

  // Corrected spelling-safe object reference.
  const CAYABAOASAN = CABAYAOASAN;

  // Save the selected Cabayaoasan reference for the existing calculator.
  window.MHAC_CABAYAOASAN_REFERENCE = function(){
    return isCabayaoasan() ? CAYABAOASAN : null;
  };

  // This patch deliberately does not overwrite calculateByAddress/calculateByGPS.
  // It provides a fixed barangay reference that can be consumed by the
  // next routing calculation without touching other barangays.
})();
