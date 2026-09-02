/* MHAC CUSTOMER — FINAL PART SELECTION FIX
   Hides the duplicate upper Chicken Part Selection and makes the visible
   "Part" radio group the real selector, while preserving existing cart data.
*/
(function(){
  'use strict';
  var lastPartIndex=null;
  var observerStarted=false;

  function hideDuplicate(){
    document.querySelectorAll('.partSelectionField').forEach(function(el){
      el.style.setProperty('display','none','important');
    });
  }
  function partGroup(){
    return Array.from(document.querySelectorAll('.choiceGroupCustomer')).find(function(g){
      var h=g.querySelector('h4');
      return h && String(h.textContent||'').trim().toLowerCase()==='part';
    });
  }
  function radios(){
    var g=partGroup();
    return g ? Array.from(g.querySelectorAll('input[type="radio"]')) : [];
  }
  function hiddenButtons(cls){
    return Array.from(document.querySelectorAll('.partSelectionField '+cls));
  }
  function counts(){
    return Array.from(document.querySelectorAll('.partSelectionField [data-part-count]')).map(function(el){return Number(el.textContent||0)});
  }
  function qty(){
    return Math.max(1,Number(document.getElementById('foodQty')?.textContent||1));
  }
  function setPart(index,n){
    var plus=hiddenButtons('.partPlus'), minus=hiddenButtons('.partMinus'), old=counts();
    if(index<0 || index>=plus.length)return;
    old.forEach(function(v,i){if(minus[i])for(var k=v;k>0;k--)minus[i].click();});
    for(var j=0;j<n;j++)plus[index]?.click();
  }
  function sync(){
    var rs=radios(), checked=rs.findIndex(function(r){return r.checked;});
    if(checked<0)return;
    lastPartIndex=checked;
    setPart(checked,qty());
  }
  function wire(){
    hideDuplicate();
    radios().forEach(function(r){
      if(r.dataset.mhacFinalPart==='1')return;
      r.dataset.mhacFinalPart='1';
      r.addEventListener('change',sync);
    });
    ['qplus','qminus'].forEach(function(id){
      var b=document.getElementById(id);
      if(!b || b.dataset.mhacFinalQty==='1')return;
      b.dataset.mhacFinalQty='1';
      b.addEventListener('click',function(){
        if(lastPartIndex!==null)setTimeout(function(){setPart(lastPartIndex,qty())},0);
      });
    });
  }
  function start(){
    wire();
    if(observerStarted)return;
    observerStarted=true;
    new MutationObserver(function(){wire()}).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
