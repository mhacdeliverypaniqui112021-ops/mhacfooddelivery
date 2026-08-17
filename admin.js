const ORDER_KEY="mhacOrders";

function getOrders(){
  try{return JSON.parse(localStorage.getItem(ORDER_KEY)||"[]")}catch(e){return[]}
}
function saveOrders(os){localStorage.setItem(ORDER_KEY,JSON.stringify(os))}
function money(n){return "₱"+Number(n||0).toFixed(2)}
function esc(v){
  return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
}
function statusClass(s){return String(s||"NEW").toUpperCase().replace(/\s+/g,"-")}
function nextStatus(s){
  const flow=["NEW","ACCEPTED","PREPARING","READY","PICKED UP","DELIVERED"];
  const i=flow.indexOf(s||"NEW");
  return i>=0&&i<flow.length-1?flow[i+1]:null;
}
function statusButton(o,i){
  const s=o.status||"NEW";
  if(s==="CANCELLED"||s==="DELIVERED") return "";
  const n=nextStatus(s);
  return n?`<button class="green" onclick="setStatus(${i},'${n}')">➡️ ${n}</button>`:"";
}
function renderOrder(o,i){
  const c=o.customer||{}, f=o.fees||{};
  const items=(o.items||[]).map(x=>`
    <div class="order-items">
      <b>${esc(x.qty)} × ${esc(x.name)}</b> — ${money((x.price||0)*(x.qty||0))}
      <br><span class="small">${esc(x.store)} • ${esc(x.choice||"")}</span>
    </div>`).join("");

  const gps=(c.latitude!=null&&c.longitude!=null)
    ? `<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.latitude+","+c.longitude)}">📍 OPEN GPS LOCATION</a>
       <div class="small">GPS: ${esc(c.latitude)}, ${esc(c.longitude)}${c.accuracy?` • Accuracy ${esc(c.accuracy)} m`:""}</div>`
    : `<span class="small">GPS coordinates not included in this order.</span>`;

  return `<div class="order ${String(o.status||"NEW")==="NEW"?"new":""}">
    <div class="order-head">
      <div><b>🆕 ${esc(o.id||"MHAC ORDER")}</b><br><span class="small">${esc(o.createdAt||"")}</span></div>
      <span class="badge ${statusClass(o.status||"NEW")}">${esc(o.status||"NEW")}</span>
    </div>

    <div class="grid">
      <div class="section">
        <b>👤 CUSTOMER</b><br>
        ${esc(c.name)}<br>${esc(c.contact)}<br>
        <span class="small">${esc(c.address||"")}</span>
      </div>
      <div class="section">
        <b>📍 LOCATION</b><br>${gps}
      </div>
    </div>

    <div class="section">
      <b>🍔 ORDERED FOODS</b><br>${items||"No items"}
    </div>

    <div class="section">
      <b>💰 BILLING</b><br>
      Food Order: <b>${money(f.foodOrder)}</b><br>
      10% Service Fee: <b>${money(f.serviceFee)}</b><br>
      Delivery Fee: <b>${money(f.deliveryFee)}</b><br>
      Distance: <b>${Number(f.distanceKm||0).toFixed(2)} km</b><br>
      2nd Store Fee: <b>${money(f.secondStoreFee)}</b><br>
      <div class="total">TOTAL: ${money(f.total)}</div>
      Payment: <b>${esc(o.payment||"")}</b>
    </div>

    <div class="toolbar" style="margin-top:9px">
      ${statusButton(o,i)}
      <select id="rider-${i}" style="max-width:230px">
        <option value="">Assign Rider (later)</option>
        <option>RIDER 1</option>
        <option>RIDER 2</option>
        <option>RIDER 3</option>
      </select>
      ${o.status!=="CANCELLED"&&o.status!=="DELIVERED"?`<button class="red" onclick="cancelOrder(${i})">CANCEL ORDER</button>`:""}
    </div>
  </div>`;
}
function refreshOrders(){
  const os=getOrders();
  const newN=os.filter(x=>(x.status||"NEW")==="NEW").length;
  const active=os.filter(x=>!["DELIVERED","CANCELLED"].includes(x.status||"NEW")).length;
  const done=os.filter(x=>(x.status||"")==="DELIVERED").length;
  document.getElementById("newCount").textContent=newN;
  document.getElementById("activeCount").textContent=active;
  document.getElementById("doneCount").textContent=done;
  document.getElementById("allCount").textContent=os.length;
  document.getElementById("orders").innerHTML=os.length
    ? os.slice().reverse().map((o,ri)=>renderOrder(o,os.length-1-ri)).join("")
    : "No orders yet.";
}
function setStatus(i,s){
  const os=getOrders();
  if(!os[i])return;
  os[i].status=s;
  os[i].updatedAt=new Date().toISOString();
  saveOrders(os);refreshOrders();
}
function cancelOrder(i){
  if(!confirm("Cancel this order?"))return;
  setStatus(i,"CANCELLED");
}
function clearOrders(){
  if(confirm("Clear all stored orders from this browser?")){
    localStorage.removeItem(ORDER_KEY);refreshOrders();
  }
}
refreshOrders();
setInterval(refreshOrders,1000);
