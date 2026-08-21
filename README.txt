MHAC DELIVERY V3.3 — STRONG RINGTONE PATCH

PURPOSE
- Strong repeating notification sound for Admin when a NEW order arrives.
- Strong repeating notification sound for Rider when a NEW order is assigned.
- Sound stops automatically after the notification cycle.
- Existing customer GPS, customer login, Admin orders, and Rider login are not changed.

FILES
1. mhac-ringtone-v33.js
2. ADMIN-RING-HOOK.txt
3. RIDER-RING-HOOK.txt

INSTALL
A. Upload mhac-ringtone-v33.js to the same GitHub Pages root used by the app.
B. In ADMIN HTML, add:
   <script src="mhac-ringtone-v33.js"></script>
   after the existing Firebase/admin scripts.
C. In RIDER HTML, add:
   <script src="mhac-ringtone-v33.js"></script>
   after the existing Firebase/rider scripts.
D. Add an ENABLE SOUND button to both apps:
   <button onclick="MHACSound.enable()">🔔 ENABLE SOUND</button>

FIREBASE LISTENER
The existing app already receives orders/assignments. The ringtone must be
called only when a genuinely new order/assignment is detected:
   MHACSound.ring("admin");
or
   MHACSound.ring("rider");

BROWSER LIMIT
The Admin/Rider device must tap ENABLE SOUND once because mobile browsers
block automatic audio before a user gesture. The page also needs to remain
open/active enough for the browser to execute JavaScript. This patch does
not attempt to bypass browser security restrictions.

TEST
1. Open Admin.
2. Tap ENABLE SOUND.
3. Leave Admin open.
4. Place a customer order.
5. Admin should ring strongly.
6. Open Rider and tap ENABLE SOUND.
7. Assign that order to the rider.
8. Rider should ring strongly.
