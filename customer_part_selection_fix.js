/* MHAC DELIVERY CUSTOMER — Part Selection Fix
   Removes the duplicate upper chicken-part selector and keeps the lower
   Choice Group (Part) selector as the only customer-facing selector.
   Add this file after customer.html's existing scripts, before </body>.
*/
(function(){
  'use strict';
  function install(){
    if(typeof window.customize !== 'function' || !window.data) return false;
    if(window.__mhacPartFixInstalled) return true;
    const originalCustomize = window.customize;
    window.customize = function(si,ci,fi){
      try{
        const stores = window.data.stores || [];
        const published = stores.filter(s => s.published !== false);
        const store = published[si];
        const food = store && store.categories && store.categories[ci] && store.categories[ci].items && store.categories[ci].items[fi];
        if(food && Array.isArray(food.chickenParts) && food.chickenParts.length){
          // Clone only this food so the original Admin/menu data is untouched.
          const clonedFood = Object.assign({}, food, {chickenParts: []});
          store.categories[ci].items[fi] = clonedFood;
          try { originalCustomize(si,ci,fi); }
          finally { store.categories[ci].items[fi] = food; }
          return;
        }
      }catch(err){ console.warn('MHAC Part Selection Fix:', err); }
      return originalCustomize(si,ci,fi);
    };
    // Extra guard: if any old upper selector is rendered by cached code, hide it.
    const style=document.createElement('style');
    style.id='MHAC_PART_SELECTION_DUPLICATE_FIX';
    style.textContent='.partSelectionField{display:none!important}';
    document.head.appendChild(style);
    window.__mhacPartFixInstalled=true;
    return true;
  }
  if(!install()){
    let n=0; const t=setInterval(()=>{ if(install() || ++n>100) clearInterval(t); },100);
  }
})();
