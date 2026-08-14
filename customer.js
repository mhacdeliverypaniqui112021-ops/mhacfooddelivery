
const LS='mhac_v2_stable';
const defaultMenu=MENU_DATA;
let state=JSON.parse(localStorage.getItem(LS)||'null')||{menu:defaultMenu,cart:[],customer:{},orders:[],baseAddress:'Paniqui Municipal Hall, Paniqui, Tarlac, Philippines'};
if(!state.menu||!state.menu.stores)state.menu=defaultMenu;
function save(){localStorage.setItem(LS,JSON.stringify(state))}
function peso(n){return '₱'+Number(n||0).toFixed(2)}
function storesUsed(){return [...new Set(state.cart.map(x=>x.storeId))]}
function toast(msg,ok=false){const d=document.createElement('div');d.className='notice '+(ok?'ok':'');d.textContent=msg;document.body.prepend(d);setTimeout(()=>d.remove(),2600)}
function renderStores(){
 const el=document.getElementById('stores'); if(!el)return;
 el.innerHTML=state.menu.stores.map(s=>`<div class="card store" onclick="openStore('${s.id}')">${s.icon||'🍽️'}&nbsp; ${s.name}</div>`).join('');
}
function openStore(id){
 const s=state.menu.stores.find(x=>x.id===id); if(!s)return;
 document.getElementById('menu').innerHTML=`<div class="card"><div class="between"><h2>${s.icon||'🍽️'} ${s.name}</h2><button class="light" onclick="closeMenu()">Close</button></div>${s.categories.map(c=>`<div class="menu-section"><h3>${c.name}</h3>${c.items.map((it,i)=>itemHtml(s,c,it,i)).join('')}</div>`).join('')}</div>`;
 document.getElementById('menu').scrollIntoView({behavior:'smooth'});
}
function closeMenu(){document.getElementById('menu').innerHTML=''}
function itemHtml(s,c,it,i){
 if(!it.available)return `<div class="card food unavailable"><div><div class="food-title">${it.name}</div><div class="muted">UNAVAILABLE</div></div></div>`;
 const choices=(it.choices||[]).map((x,j)=>`<label class="choice"><input type="checkbox" name="ch-${s.id}-${c.name}-${i}" value="${x}"> ${x}</label>`).join('');
 return `<div class="card food"><div style="flex:1"><div class="food-title">${it.name}</div><div class="price">${peso(it.price)}</div>${choices?`<div class="choices">${choices}</div>`:''}</div><button class="red" onclick="addItem('${s.id}',${JSON.stringify(c.name)},${i},this)">ADD</button></div>`;
}
function addItem(storeId,catName,index,btn){
 const s=state.menu.stores.find(x=>x.id===storeId), c=s.categories.find(x=>x.name===catName), it=c.items[index];
 const used=storesUsed();
 if(!used.includes(storeId)&&used.length>=2){toast('Maximum 2 stores per order only. Third store is not allowed.');return}
 const box=btn.parentElement, choices=[...box.querySelectorAll('input[type=checkbox]:checked')].map(x=>x.value);
 state.cart.push({id:Date.now()+Math.random(),storeId,storeName:s.name,name:it.name,basePrice:Number(it.price),qty:1,choices});
 save();renderCart();toast(it.name+' added to cart',true)
}
function renderCart(){
 const el=document.getElementById('cart'); if(!el)return;
 if(!state.cart.length){el.innerHTML='<div class="muted">No items yet.</div>';return}
 const by={};state.cart.forEach(x=>(by[x.storeName]??=[]).push(x));
 el.innerHTML=Object.entries(by).map(([store,items])=>`<div class="cart-store"><h3>${store}</h3>${items.map(x=>`<div class="cart-item"><div class="between"><div><b>${x.name}</b><div class="small">${x.choices?.length?x.choices.join(', '):''}</div><div class="price">${peso(x.basePrice)}</div></div><div class="qty"><button class="light" onclick="changeQty('${x.id}',-1)">−</button><b>${x.qty}</b><button class="light" onclick="changeQty('${x.id}',1)">+</button><button onclick="removeItem('${x.id}')">×</button></div></div></div>`).join('')}</div>`).join('');
 updateSummary()
}
function changeQty(id,n){const x=state.cart.find(a=>String(a.id)===String(id));if(!x)return;x.qty=Math.max(0,x.qty+n);if(!x.qty)state.cart=state.cart.filter(a=>String(a.id)!==String(id));save();renderCart()}
function removeItem(id){state.cart=state.cart.filter(a=>String(a.id)!==String(id));save();renderCart()}
function foodTotal(){return state.cart.reduce((a,x)=>a+x.basePrice*x.qty,0)}
function serviceFee(){return foodTotal()*.10}
async function calculateFee(){
 const muni=document.getElementById('municipality').value, brgy=document.getElementById('barangay').value;
 const address=document.getElementById('address').value.trim();
 if(!muni||!brgy||!address){toast('Piliin muna ang municipality, barangay at ilagay ang address.');return}
 if(!navigator.geolocation){toast('Hindi supported ang location sa browser.');return}
 toast('Kinukuha ang location at road distance...');
 navigator.geolocation.getCurrentPosition(async pos=>{
   const lat=pos.coords.latitude,lon=pos.coords.longitude;
   state.customer={name:val('name'),phone:val('phone'),municipality:muni,barangay:brgy,address,lat,lon};
   save();
   try{
     const cfg=encodeURIComponent(state.baseAddress);
     const geo=await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+cfg,{headers:{'Accept-Language':'en'}});
     const gj=await geo.json(); if(!gj[0])throw new Error('base');
     const baseLat=gj[0].lat,baseLon=gj[0].lon;
     const route=await fetch(`https://router.project-osrm.org/route/v1/driving/${baseLon},${baseLat};${lon},${lat}?overview=false`);
     const rj=await route.json(); if(rj.code!=='Ok')throw new Error('route');
     const km=Math.max(1,Math.ceil((rj.routes[0].distance/1000)*10)/10);
     const billable=Math.max(1,Math.ceil(km));
     const fee=40+Math.max(0,billable-1)*10;
     state.customer.km=km;state.customer.deliveryFee=fee;save();renderSummary();
     toast(`Road distance ${km.toFixed(1)} km • Delivery Fee ${peso(fee)}`,true);
   }catch(e){toast('Hindi makuha ang road route ngayon. Subukan ulit.');}
 },()=>toast('Kailangan ng location permission para makalkula ang delivery fee.'),{enableHighAccuracy:true,timeout:15000,maximumAge:0});
}
function val(id){return document.getElementById(id)?.value||''}
function updateBarangays(){const m=val('municipality');const list=BRGY[m]||[];document.getElementById('barangay').innerHTML='<option value="">Select Barangay</option>'+list.map(x=>`<option>${x}</option>`).join('')}
function renderSummary(){
 const f=foodTotal(), sf=serviceFee(), df=Number(state.customer.deliveryFee||0), add=storesUsed().length>1?5:0, total=f+sf+df+add;
 document.getElementById('summary').innerHTML=`<div class="between"><b>Food Order</b><b>${peso(f)}</b></div><div class="between"><span>10% Service Fee</span><span>${peso(sf)}</span></div><div class="between"><span>Delivery Fee ${state.customer.km?`(${state.customer.km.toFixed(1)} km road)`:''}</span><span>${df?peso(df):'Not calculated'}</span></div><div class="between"><span>Additional Store Fee</span><span>${add?peso(add):peso(0)}</span></div><hr><div class="between total"><span>TOTAL</span><span>${peso(total)}</span></div>`;
}
function updateSummary(){renderSummary()}
function placeOrder(){
 if(!state.cart.length){toast('Walang laman ang cart.');return}
 const c=state.customer; if(!c.name||!c.phone||!c.municipality||!c.barangay||!c.address||!c.deliveryFee){toast('Kumpletuhin ang customer info at Calculate Delivery Fee muna.');return}
 const order={id:'MHAC-'+Date.now(),createdAt:new Date().toISOString(),status:'NEW',assignedRider:'',customer:c,items:state.cart.map(x=>({...x})),foodTotal:foodTotal(),serviceFee:serviceFee(),deliveryFee:c.deliveryFee,additionalStoreFee:storesUsed().length>1?5:0,total:foodTotal()+serviceFee()+c.deliveryFee+(storesUsed().length>1?5:0)};
 state.orders.push(order);state.cart=[];save();renderCart();renderSummary();document.getElementById('orderMsg').innerHTML=`<div class="notice ok"><b>ORDER SENT!</b><br>${order.id}<br>Your order has been saved for Admin.</div>`;document.getElementById('orderMsg').scrollIntoView({behavior:'smooth'});toast('Order sent automatically.',true)
}
window.openStore=openStore;window.closeMenu=closeMenu;window.addItem=addItem;window.changeQty=changeQty;window.removeItem=removeItem;window.calculateFee=calculateFee;window.placeOrder=placeOrder;window.updateBarangays=updateBarangays;
document.addEventListener('DOMContentLoaded',()=>{renderStores();renderCart();renderSummary();document.getElementById('municipality')?.addEventListener('change',updateBarangays)})
