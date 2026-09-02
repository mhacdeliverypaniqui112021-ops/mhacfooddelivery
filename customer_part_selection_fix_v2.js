
/*
 MHAC CUSTOMER — PART DUPLICATE FIX V2

 Current customer.html has TWO Part selectors:
 1) .partSelectionField / f.chickenParts (old +/− selector)
 2) choiceGroups group named "Part" (radio selector)

 This patch:
 - hides the old upper selector visually;
 - makes the lower "Part" radio selector drive the old internal counters;
 - keeps the existing order/cart data intact;
 - supports quantity changes by applying the selected lower Part to every
   ordered piece;
 - does NOT modify Drinks, Add-ons, Fries, checkout, GPS, or Admin/Rider.
*/
(function(){
  "use strict";

  const HIDE_STYLE_ID = "mhac-hide-duplicate-part-v2";

  function addHideStyle(){
    if(document.getElementById(HIDE_STYLE_ID)) return;
    const s=document.createElement("style");
    s.id=HIDE_STYLE_ID;
    s.textContent = `
      /* Customer: remove duplicate legacy chicken-part selector */
      .partSelectionField{
        display:none!important;
      }
    `;
    document.head.appendChild(s);
  }

  function findPartGroup(){
    const groups=[...document.querySelectorAll(".choiceGroupCustomer")];
    for(const g of groups){
      const h=g.querySelector("h4");
      if(h && String(h.textContent||"").trim().toLowerCase()==="part") return g;
    }
    return null;
  }

  function selectedLowerPart(){
    const g=findPartGroup();
    if(!g) return null;
    const r=g.querySelector('input[type="radio"]:checked');
    if(!r) return null;
    return { group:g, radio:r };
  }

  function hiddenPartButtons(){
    const field=document.querySelector(".partSelectionField");
    if(!field) return [];
    return [...field.querySelectorAll(".partPlus")];
  }

  function hiddenPartMinusButtons(){
    const field=document.querySelector(".partSelectionField");
    if(!field) return [];
    return [...field.querySelectorAll(".partMinus")];
  }

  function hiddenCounts(){
    const field=document.querySelector(".partSelectionField");
    if(!field) return [];
    return [...field.querySelectorAll("[data-part-count]")].map(x=>Number(x.textContent||0));
  }

  function currentQty(){
    return Math.max(1, Number(document.getElementById("foodQty")?.textContent||1));
  }

  function setHiddenPartIndex(index, wantedQty){
    const plus=hiddenPartButtons();
    const minus=hiddenPartMinusButtons();
    const counts=hiddenCounts();
    if(index<0 || index>=plus.length) return;

    // Clear all existing hidden counts.
    counts.forEach((n,i)=>{
      if(!minus[i]) return;
      for(let k=n;k>0;k--) minus[i].click();
    });

    // Apply the lower-radio selection to all ordered pieces.
    for(let k=0;k<wantedQty;k++) plus[index].click();
  }

  let lastIndex = null;

  function syncFromLowerRadio(){
    const picked=selectedLowerPart();
    if(!picked){
      lastIndex=null;
      return;
    }

    const radios=[...picked.group.querySelectorAll('input[type="radio"]')];
    const index=radios.indexOf(picked.radio);
    if(index<0) return;

    setTimeout(()=>{
      setHiddenPartIndex(index,currentQty());
      lastIndex=index;
    },0);
  }

  function syncQuantityToSelectedPart(){
    if(lastIndex===null) return;
    setTimeout(()=>{
      setHiddenPartIndex(lastIndex,currentQty());
    },0);
  }

  function wire(){
    addHideStyle();

    // Lower Part radio selection controls the hidden legacy data.
    document.querySelectorAll(".choiceGroupCustomer input[type=radio]").forEach(r=>{
      if(r.dataset.mhacPartWire==="1") return;
      const group=r.closest(".choiceGroupCustomer");
      const h=group?.querySelector("h4");
      if(!h || String(h.textContent||"").trim().toLowerCase()!=="part") return;
      r.dataset.mhacPartWire="1";
      r.addEventListener("change",syncFromLowerRadio);
    });

    // Quantity +/- buttons are created dynamically by customize().
    document.querySelectorAll("#qplus,#qminus").forEach(b=>{
      if(b.dataset.mhacQtyWire==="1") return;
      b.dataset.mhacQtyWire="1";
      b.addEventListener("click",syncQuantityToSelectedPart);
    });
  }

  const observer=new MutationObserver(()=>{
    addHideStyle();
    wire();
  });

  function start(){
    addHideStyle();
    wire();
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start);
  else start();
})();
