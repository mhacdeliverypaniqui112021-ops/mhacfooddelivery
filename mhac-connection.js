(function(){
const V="https://www.gstatic.com/firebasejs/10.14.1/";
function load(src){return new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=()=>no(Error("Firebase SDK load failed"));document.head.appendChild(s)})}
let ready=null;
async function ensureReady(){
 if(ready)return ready;
 ready=(async()=>{
  if(!window.firebase){await load(V+"firebase-app-compat.js");await load(V+"firebase-auth-compat.js");await load(V+"firebase-database-compat.js")}
  const c=window.MHAC_FIREBASE_CONFIG;
  if(!c||String(c.apiKey||"").startsWith("PASTE_"))throw Error("Firebase config is not filled in.");
  if(!firebase.apps.length)firebase.initializeApp(c);
  if(!firebase.auth().currentUser)await firebase.auth().signInAnonymously();
  return {db:firebase.database(),auth:firebase.auth()};
 })();
 return ready;
}
function path(){return window.MHAC_CONNECTION?.ordersPath||"mhac/orders"}
function copy(x){return JSON.parse(JSON.stringify(x??null))}
async function createOrder(order){const {db}=await ensureReady();const o=copy(order);o.id=o.id||("MHAC-"+Date.now());o.createdAt=o.createdAt||new Date().toISOString();o.status=o.status||"NEW";o.assignedRider=o.assignedRider||"";await db.ref(path()+"/"+o.id).set(o);return o}
async function updateOrder(id,patch){const {db}=await ensureReady();if(!id)throw Error("Missing order id.");await db.ref(path()+"/"+id).update(copy(patch)||{})}
async function getOrder(id){const {db}=await ensureReady();const s=await db.ref(path()+"/"+id).once("value");return s.exists()?s.val():null}
function watchOrders(cb){
 let stopped=false,ref=null;
 ensureReady().then(({db})=>{if(stopped)return;ref=db.ref(path());ref.on("value",s=>{const d=s.val()||{};const a=Object.values(d).filter(x=>x&&x.id).sort((x,y)=>String(y.createdAt).localeCompare(String(x.createdAt)));cb(a,null)})}).catch(e=>cb([],e));
 return ()=>{stopped=true;if(ref)ref.off()};
}
async function testConnection(){const {db,auth}=await ensureReady();const p={ok:true,at:new Date().toISOString(),uid:auth.currentUser?.uid||null};await db.ref(path()+"/_connection_test").set(p);return p}
window.MHACShared=Object.freeze({ensureReady,createOrder,updateOrder,getOrder,watchOrders,testConnection});
})();
