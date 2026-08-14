
const LS='mhac_v2_stable';const RIDER='RIDER-1';
let state=JSON.parse(localStorage.getItem(LS)||'null')||{orders:[]};
function peso(n){return '₱'+Number(n||0).toFixed(2)}
function render(){const el=document.getElementById('assigned');const arr=(state.orders||[]).filter(o=>o.assignedRider===RIDER&&o.status!=='COMPLETED');el.innerHTML=arr.length?arr.map(o=>`<div class="card"><div class="between"><b>${o.id}</b><span class="pill">${o.status}</span></div><h3>${o.customer.name}</h3><p>📞 ${o.customer.phone}<br>📍 ${o.customer.address}, ${o.customer.barangay}, ${o.customer.municipality}</p><hr><p>${o.items.map(i=>`<b>${i.storeName}</b><br>${i.name} ×${i.qty}${i.choices?.length?' • '+i.choices.join(', '):''}`).join('<br>')}</p><p><b>Collect: ${peso(o.total)}</b><br>Delivery Fee: ${peso(o.deliveryFee)}</p><button class="red" onclick="done('${o.id}')">MARK DELIVERED</button></div>`).join(''):'<div class="muted">No assigned orders.</div>'}
function done(id){const o=state.orders.find(x=>x.id===id);if(o){o.status='COMPLETED';localStorage.setItem(LS,JSON.stringify(state));render()}}
window.done=done;document.addEventListener('DOMContentLoaded',render)
