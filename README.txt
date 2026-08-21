MHAC DELIVERY V3.3 FIREBASE ADMIN FIX V2

Purpose: Fix Admin INCOMING ORDERS stuck on Loading while orders already exist in Cloud Firestore.

UPLOAD:
- If your current Admin URL loads from /admin.html, replace root admin.html with this admin.html.
- If your current Admin URL is /admin/, upload admin/index.html to an admin folder.

Do not change customer/index.html or rider/index.html.

This build:
- authenticates with the existing Firebase Admin account
- reads Firestore collection: orders
- performs an initial getDocs read, then starts a live onSnapshot listener
- shows the actual Firebase error instead of infinite Loading
- keeps rider assignment, rider nickname manager, menu manager, business hours and ringtone

Firebase project: mhac-delivery-53099
Firestore collection: orders
