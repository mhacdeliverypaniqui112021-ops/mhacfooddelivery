/* MHAC DELIVERY V3.3 — ADMIN FIREBASE ORDER RECEIVER
   Upload this file and include it after mhac-connection.js on the admin page.
   It mirrors Firebase orders into the admin's existing localStorage so the
   existing admin UI can render them without changing its design.
*/
(function(){
  "use strict";
  function start(){
    if(!window.MHACShared || !window.MHACShared.watchOrders){
      setTimeout(start,300); return;
    }
    window.MHACShared.watchOrders((orders,err)=>{
      if(err) return;
      try{
        localStorage.setItem("mhacOrders",JSON.stringify(orders));
        if(typeof window.renderOrders==="function") window.renderOrders();
        const el=document.getElementById("orders");
        if(el && typeof window.renderOrders!=="function"){
          // Minimal fallback if the current admin page has no renderer.
          el.innerHTML=orders.length ? orders.map(o=>{
            const c=o.customer||{}, f=o.fees||{};
            return `<div class="item"><b>🆕 ${o.id||""}</b><br>
              <b>${c.name||""}</b> — ${c.contact||c.phone||""}<br>
              📍 ${c.address||""}, ${c.barangay||""}, ${c.municipality||""}<hr>
              ${(o.items||[]).map(i=>`${i.store||i.storeName||""} — ${i.qty||1} × ${i.name||i.food||""} ${i.choice||""}`).join("<br>")}
              <hr>Food: ₱${Number(f.foodOrder??0).toFixed(2)}
              <br>Service: ₱${Number(f.serviceFee??0).toFixed(2)}
              <br>Delivery: ₱${Number(f.deliveryFee??o.deliveryFee??0).toFixed(2)}
              <br><b>Total: ₱${Number(f.total??o.total??0).toFixed(2)}</b>
              <br>Status: ${o.status||"NEW"}</div>`;
          }).join("") : "No orders yet.";
        }
      }catch(e){console.error("MHAC V3.3 admin render error",e)}
    });
  }
  start();
})();
