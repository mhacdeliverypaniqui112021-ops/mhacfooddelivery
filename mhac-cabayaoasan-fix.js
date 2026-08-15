/*
 MHAC DELIVERY — CABAYAOASAN TARGETED GPS FIX
 Only Cabayaoasan/Paniqui is changed. Other tested barangays keep the
 existing calculator and the existing delivery-rate formula.
*/
(function () {
  const CABAYAOASAN = { lat: 15.6646, lon: 120.5545 };
  const ORIGINAL_CALCULATE = window.calculateByAddress;

  function status(t) {
    const e = document.getElementById("locStatus");
    if (e) e.textContent = t;
  }

  function applyFee(km) {
    window.distanceKm = km;
    window.deliveryFee = feeForKm(km);
    const f = document.getElementById("feeView");
    if (f) f.textContent =
      "📍 Driving distance: " + km.toFixed(2) +
      " km • Delivery Fee: ₱" + window.deliveryFee.toFixed(2);
    if (typeof renderCart === "function") renderCart();
    if (typeof updateCheckoutTotals === "function") updateCheckoutTotals();
  }

  async function cabayaoasanGPS() {
    status("📍 Getting your GPS location…");

    if (!navigator.geolocation) {
      const km = await route(CABAYAOASAN.lat, CABAYAOASAN.lon);
      applyFee(km);
      status("⚠️ GPS is unavailable. Cabayaoasan reference location used.");
      return;
    }

    await new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        async p => {
          try {
            const lat = Number(p.coords.latitude);
            const lon = Number(p.coords.longitude);
            if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error();
            const km = await route(lat, lon);
            applyFee(km);
            status("✅ GPS location detected. Actual road distance calculated.");
          } catch (e) {
            const km = await route(CABAYAOASAN.lat, CABAYAOASAN.lon);
            applyFee(km);
            status("⚠️ GPS route unavailable. Cabayaoasan reference location used.");
          }
          resolve();
        },
        async () => {
          try {
            const km = await route(CABAYAOASAN.lat, CABAYAOASAN.lon);
            applyFee(km);
            status("⚠️ GPS permission denied. Cabayaoasan reference location used.");
          } catch (e) {
            status("❌ Could not calculate Cabayaoasan route. Please try again.");
          }
          resolve();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }

  window.calculateByAddress = async function () {
    const m = document.getElementById("municipality").value;
    const b = document.getElementById("barangay").value;

    if (m === "PANIQUI" && b === "Cabayaoasan") {
      await cabayaoasanGPS();
      return;
    }

    // Preserve the already-tested calculator for every other barangay.
    return ORIGINAL_CALCULATE();
  };

  const row = document.querySelector(".gpsrow");
  if (row && !document.getElementById("mhacGpsBtn")) {
    const btn = document.createElement("button");
    btn.id = "mhacGpsBtn";
    btn.type = "button";
    btn.textContent = "📍 USE MY GPS LOCATION";
    btn.onclick = async () => {
      const m = document.getElementById("municipality").value;
      const b = document.getElementById("barangay").value;
      if (m !== "PANIQUI" || b !== "Cabayaoasan") {
        alert("GPS quick location is currently enabled for Cabayaoasan only.");
        return;
      }
      await cabayaoasanGPS();
    };
    row.appendChild(btn);
  }

  const rate = document.querySelector(".rate");
  if (rate && !document.getElementById("mhacPriceReminder")) {
    const p = document.createElement("p");
    p.id = "mhacPriceReminder";
    p.style.cssText = "margin-top:8px;font-size:12px;line-height:1.35";
    p.innerHTML =
      "⚠️ <b>PRICE REMINDER:</b> Food prices may change without prior notice. " +
      "If the displayed food price is outdated, the final price will be manually computed " +
      "based on the current store price.";
    rate.appendChild(p);
  }
})();
