
const LS='mhac_v2_stable'; const defaultMenu=MENU_DATA;
let state=JSON.parse(localStorage.getItem(LS)||'null')||{menu:defaultMenu,cart:[],customer:{},orders:[],baseAddress:'Paniqui Municipal Hall, Paniqui, Tarlac, Philippines'};
if(!state.menu)state.menu=defaultMenu;if(!state.orders)state.orders=[];
function save(){localStorage.setItem(LS,JSON.stringify(state))}
function peso(n){return '₱'+Number(n||0).toFixed(2)}
function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function renderOrders(){
 const el=document.getElementById('orders'); if(!el)return;
 el.innerHTML=state.orders.length?state.orders.slice().reverse().map(o=>`<div class="card"><div class="between"><b>${o.id}</b><span class="pill">${o.status}</span></div><p><b>${esc(o.customer.name)}</b> • ${esc(o.customer.phone)}<br>${esc(o.customer.barangay)}, ${esc(o.customer.municipality)}<br>${esc(o.customer.address)}</p><p>${o.items.map(i=>`${i.storeName}: ${i.name} ×${i.qty}${i.choices?.length?' ['+i.choices.join(', ')+']':''}`).join('<br>')}</p><p><b>Total ${peso(o.total)}</b> • DF ${peso(o.deliveryFee)} • ${o.customer.km?o.customer.km.toFixed(1)+' km':''}</p><div class="row"><select id="r-${o.id}"><option value="">Assign rider</option><option value="RIDER-1">RIDER-1</option><option value="RIDER-2">RIDER-2</option></select><button class="red" onclick="assignOrder('${o.id}')">ASSIGN</button><button onclick="setStatus('${o.id}','COMPLETED')">COMPLETE</button></div></div>`).join(''):'<div class="muted">No orders yet.</div>'
}
function assignOrder(id){const o=state.orders.find(x=>x.id===id),v=document.getElementById('r-'+id)?.value;if(!o||!v){alert('Select rider.');return}o.assignedRider=v;o.status='ASSIGNED';save();renderOrders();alert('Order assigned.')}
function setStatus(id,s){const o=state.orders.find(x=>x.id===id);if(o){o.status=s;save();renderOrders()}}
function renderMenu(){
 const el=document.getElementById('editor');el.innerHTML=state.menu.stores.map((s,si)=>`<details open><summary><b>${esc(s.icon||'🍽️')} ${esc(s.name)}</b></summary><div class="editor"><label>Store Name</label><input value="${esc(s.name)}" onchange="editStore(${si},'name',this.value)"><label>Icon</label><input value="${esc(s.icon||'🍽️')}" onchange="editStore(${si},'icon',this.value)">${s.categories.map((c,ci)=>`<details><summary>${esc(c.name)}</summary><input value="${esc(c.name)}" onchange="editCat(${si},${ci},this.value)">${c.items.map((it,ii)=>`<div class="itemrow"><input value="${esc(it.name)}" onchange="editItem(${si},${ci},${ii},'name',this.value)"><input type="number" value="${it.price}" onchange="editItem(${si},${ci},${ii},'price',this.value)"><label class="small"><input type="checkbox" ${it.available?'checked':''} onchange="editItem(${si},${ci},${ii},'available',this.checked)"> Available</label><button onclick="delItem(${si},${ci},${ii})">REMOVE</button><input class="choices-editor" value="${esc((it.choices||[]).join(' | '))}" placeholder="choices separated by |" onchange="editChoices(${si},${ci},${ii},this.value)"></div>`).join('')}<button class="light" onclick="addItem(${si},${ci})">+ FOOD</button></details>`).join('')}<button class="light" onclick="addCat(${si})">+ CATEGORY</button></div></details>`).join('')+`<button class="red" onclick="addStore()">+ ADD STORE</button>`
}
function editStore(si,k,v){state.menu.stores[si][k]=v;save();renderMenu()}
function editCat(si,ci,v){state.menu.stores[si].categories[ci].name=v;save();renderMenu()}
function editItem(si,ci,ii,k,v){state.menu.stores[si].categories[ci].items[ii][k]=k==='price'?Number(v):v;save();renderMenu()}
function editChoices(si,ci,ii,v){state.menu.stores[si].categories[ci].items[ii].choices=v.split('|').map(x=>x.trim()).filter(Boolean);save();renderMenu()}
function addItem(si,ci){state.menu.stores[si].categories[ci].items.push({name:'New Food',price:0,available:true,choices:[]});save();renderMenu()}
function delItem(si,ci,ii){state.menu.stores[si].categories[ci].items.splice(ii,1);save();renderMenu()}
function addCat(si){state.menu.stores[si].categories.push({name:'New Category',items:[]});save();renderMenu()}
function addStore(){state.menu.stores.push({id:'store-'+Date.now(),name:'New Store',icon:'🍽️',categories:[{name:'Menu',items:[]}]});save();renderMenu()}
function exportMenu(){const b=new Blob([JSON.stringify(state.menu,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='mhac-menu.json';a.click()}
function importMenu(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.stores)throw 1;state.menu=d;save();renderMenu();alert('Menu imported.')}catch{alert('Invalid menu JSON.')}};r.readAsText(f)}
function qr(){const url=document.getElementById('menuUrl').value.trim();if(!url)return;document.getElementById('qr').innerHTML=`<img alt="QR" src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(url)}">`}
function exportOrders(){const b=new Blob([JSON.stringify(state.orders,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='mhac-orders.json';a.click()}
window.assignOrder=assignOrder;window.setStatus=setStatus;window.editStore=editStore;window.editCat=editCat;window.editItem=editItem;window.editChoices=editChoices;window.addItem=addItem;window.delItem=delItem;window.addCat=addCat;window.addStore=addStore;window.exportMenu=exportMenu;window.importMenu=importMenu;window.qr=qr;window.exportOrders=exportOrders;
document.addEventListener('DOMContentLoaded',()=>{renderOrders();renderMenu();document.getElementById('baseAddress').value=state.baseAddress||'';document.getElementById('baseAddress').onchange=e=>{state.baseAddress=e.target.value;save()}})
