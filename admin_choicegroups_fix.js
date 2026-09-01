/*
 MHAC DELIVERY — Choice Groups Fix
 Safe runtime patch for the current admin.html from:
 https://github.com/mhacdeliverypaniqui112021-ops/mhacfooddelivery

 FIXES:
 1) Deleted Drinks / Add-ons / Fries / Parts choices do not come back through
    legacy fields after saving.
 2) Fries is synchronized to its Choice Group.
 3) Choice-group Copy/Paste gets a persistent local clipboard.
 4) Paste creates independent option objects.
 5) Does not alter other Admin UI/order/rider/business logic.

 INSTALL:
 Add this script immediately before </body> in admin.html:
   <script src="admin_choicegroups_fix.js"></script>
 Then upload BOTH files to GitHub.

 NOTE:
 The current GitHub admin.html already contains Copy/Paste buttons, but its
 save path does not persist the legacy Fries field. This patch closes that
 persistence gap and also makes the clipboard more reliable on Android.
*/

(function(){
  "use strict";

  const CLIP_KEY = "mhac_food_editor_choice_group_clipboard_v2";

  function cloneOptions(arr){
    return (Array.isArray(arr) ? arr : []).map(x => ({
      name: String(x?.name ?? ""),
      price: Number(x?.price ?? 0)
    })).filter(x => x.name);
  }

  function loadClip(){
    try{
      const x = JSON.parse(localStorage.getItem(CLIP_KEY) || "null");
      if(x && Array.isArray(x.options)) return {
        name: String(x.name || "Choices"),
        role: String(x.role || ""),
        options: cloneOptions(x.options)
      };
    }catch(_){}
    return null;
  }

  function saveClip(x){
    try{ localStorage.setItem(CLIP_KEY, JSON.stringify(x)); }catch(_){}
  }

  // Keep the existing global clipboard in sync when available.
  const initial = loadClip();
  if(initial && window.foodClipboard){
    window.foodClipboard.choiceGroup = initial;
  }

  // Capture SAVE FOOD before the existing click handler runs.
  // This makes legacy fields mirror the actual Choice Groups on screen.
  document.addEventListener("click", function(e){
    const btn = e.target.closest(".saveDirectFood");
    if(!btn) return;

    const editor = btn.closest(".oneFoodBox");
    if(!editor) return;

    const groups = [...editor.querySelectorAll(".foodEditGroups .foodEditAccordion")];

    const readGroup = role => {
      const box = groups.find(g => (g.dataset.role || "") === role);
      if(!box) return [];
      return [...box.querySelectorAll(".foodEditOptionRow")]
        .map(r => ({
          name: r.querySelector(".groupOptionName")?.value.trim() || "",
          price: Number(r.querySelector(".groupOptionPrice")?.value || 0)
        }))
        .filter(x => x.name);
    };

    // The current source has the selected food as draft.stores[selectedStore]
    // and uses renderDirectFoodEditor(ci,fi,...). Resolve it safely.
    try{
      if(window.draft && Number.isInteger(window.selectedStore)){
        const foodName = editor.querySelector(".foodNameEdit")?.value.trim();
        const store = window.draft.stores?.[window.selectedStore];
        if(store && foodName){
          let target = null;
          for(const cat of (store.categories || [])){
            target = (cat.items || []).find(it => String(it.name||"").trim() === foodName);
            if(target) break;
          }
          if(target){
            target.choices = readGroup("drinks");
            target.addOns = readGroup("addOns");
            target.fries = readGroup("fries");
            target.chickenParts = readGroup("chickenParts").map(x => ({name:x.name}));
          }
        }
      }
    }catch(err){ console.warn("MHAC choice-group pre-save sync:", err); }
  }, true);

  // Robust Copy/Paste behavior for dynamically-created group buttons.
  document.addEventListener("click", function(e){
    const copy = e.target.closest(".copyChoices");
    const paste = e.target.closest(".pasteChoices");

    if(copy){
      const box = copy.closest(".foodEditAccordion");
      if(!box) return;

      const payload = {
        name: box.querySelector(".foodEditGroupTitle")?.value.trim() || "Choices",
        role: box.dataset.role || "",
        options: [...box.querySelectorAll(".foodEditOptionRow")]
          .map(r => ({
            name: r.querySelector(".groupOptionName")?.value.trim() || "",
            price: Number(r.querySelector(".groupOptionPrice")?.value || 0)
          }))
          .filter(x => x.name)
      };

      saveClip(payload);
      if(window.foodClipboard) window.foodClipboard.choiceGroup = payload;

      // Also try the phone's normal clipboard, but never depend on it.
      try{
        navigator.clipboard?.writeText(JSON.stringify(payload));
      }catch(_){}

      // Existing toast function, if present.
      try{
        if(typeof window.toast === "function")
          window.toast("📋 " + payload.name + " copied.");
      }catch(_){}
      return;
    }

    if(paste){
      const box = paste.closest(".foodEditAccordion");
      if(!box) return;

      const payload =
        (window.foodClipboard && window.foodClipboard.choiceGroup) ||
        loadClip();

      if(!payload?.options?.length){
        try{ if(typeof window.toast === "function") window.toast("Nothing copied yet."); }catch(_){}
        return;
      }

      const opts = box.querySelector(".foodEditOptions");
      if(!opts) return;

      opts.innerHTML = "";

      payload.options.forEach(o => {
        const r = document.createElement("div");
        r.className = "foodEditOptionRow";

        const isPart = (box.dataset.role || "") === "chickenParts";
        if(isPart){
          r.innerHTML =
            '<input class="groupOptionName" placeholder="Part name">' +
            '<button type="button" class="danger">✕</button>';
        }else{
          r.innerHTML =
            '<input class="groupOptionName" placeholder="Choice name">' +
            '<input class="groupOptionPrice" type="number" min="0" step="0.01" placeholder="Price">' +
            '<button type="button" class="danger">✕</button>';
          r.querySelector(".groupOptionPrice").value = Number(o.price || 0);
        }

        r.querySelector(".groupOptionName").value = String(o.name || "");
        r.querySelector("button").onclick = () => r.remove();
        opts.appendChild(r);
      });

      try{ if(typeof window.toast === "function") window.toast("📥 Choices pasted."); }catch(_){}
    }
  }, false);

  // Make the existing buttons slightly more obvious on small screens.
  const style = document.createElement("style");
  style.textContent = `
    .choiceTools{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;margin:8px 0!important}
    .choiceTools .copyChoices,.choiceTools .pasteChoices{
      min-height:52px!important;font-size:16px!important;font-weight:900!important;
      touch-action:manipulation!important;cursor:pointer!important;
    }
  `;
  document.head.appendChild(style);
})();
