/* MHAC DELIVERY V3.3 — Firebase shared order bridge
   Keeps the existing customer/GPS/localStorage system intact.
   Requires Firebase Web SDK compat scripts OR an existing Firebase config script.
*/
(function(){
  "use strict";
  const PROJECT_ID = "mhac-delivery-53099";
  let appReady = null;

  function cfg(){
    return window.MHAC_FIREBASE_CONFIG ||
           window.firebaseConfig ||
           window.mhacFirebaseConfig ||
           null;
  }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement("script");
      s.src=src; s.async=true;
      s.onload=resolve; s.onerror=()=>reject(new Error("Failed to load "+src));
      document.head.appendChild(s);
    });
  }

  async function ensureFirebase(){
    if(appReady) return appReady;
    appReady=(async()=>{
      if(!window.firebase) {
        await loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js");
      } else if(!firebase.firestore) {
        await loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js");
      }
      if(!firebase.apps.length){
        const c=cfg();
        if(!c) throw new Error("MHAC Firebase config not found. Upload mhac-firebase-config.js and load it before this file.");
        firebase.initializeApp(c);
      }
      const app=firebase.app();
      if(app.options.projectId && app.options.projectId!==PROJECT_ID){
        console.warn("MHAC V3.3: Firebase project is "+app.options.projectId+", expected "+PROJECT_ID);
      }
      return app;
    })();
    return appReady;
  }

  async function currentUser(){
    await ensureFirebase();
    return new Promise(resolve=>{
      const u=firebase.auth().currentUser;
      if(u) return resolve(u);
      const off=firebase.auth().onAuthStateChanged(x=>{off();resolve(x||null)});
      setTimeout(()=>{try{off()}catch(e){};resolve(firebase.auth().currentUser||null)},4000);
    });
  }

  async function createOrder(order){
    await ensureFirebase();
    const user=await currentUser();
    const enriched=JSON.parse(JSON.stringify(order||{}));
    enriched.customer = enriched.customer || {};
    if(user){
      enriched.customer.uid=user.uid;
      enriched.customer.email=user.email||"";
      enriched.customer.displayName=user.displayName||"";
    }
    enriched.source="CUSTOMER";
    enriched.status=enriched.status||"NEW";
    enriched.assignedRider=enriched.assignedRider||"";
    enriched.updatedAt=new Date().toISOString();
    enriched.createdAt=enriched.createdAt||new Date().toISOString();
    const ref=firebase.firestore().collection("orders").doc(enriched.id || ("MHAC-"+Date.now()));
    await ref.set(enriched,{merge:true});
    return ref;
  }

  async function watchOrders(callback){
    await ensureFirebase();
    return firebase.firestore().collection("orders")
      .orderBy("createdAt","desc")
      .onSnapshot(snap=>{
        callback(snap.docs.map(d=>({id:d.id,...d.data()})));
      },err=>{
        console.error("MHAC V3.3 order listener:",err);
        if(callback) callback([],err);
      });
  }

  window.MHACShared = window.MHACShared || {};
  window.MHACShared.ensureFirebase=ensureFirebase;
  window.MHACShared.createOrder=createOrder;
  window.MHACShared.watchOrders=watchOrders;
  window.MHACShared.currentUser=currentUser;
  window.MHACShared.projectId=PROJECT_ID;
})();
