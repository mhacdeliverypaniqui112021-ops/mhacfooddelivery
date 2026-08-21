MHAC DELIVERY V3.2
===================

Built from the working V3.1 GPS-only core.

INCLUDED
--------
customer/index.html
admin/index.html
rider/index.html
firestore.rules
README.txt

V3.2 FEATURES
--------------
1. Customer GPS-only checkout:
   - Customer Name + Contact Number
   - Allow GPS
   - Calculate actual driving distance
   - Existing fee formula: first KM ₱40, succeeding KM +₱10
   - 10% service fee
   - Maximum 2 stores
   - Second store +₱5

2. Admin Menu Manager:
   - Add/remove stores
   - Edit store name/icon
   - Edit categories
   - Add/remove foods
   - Edit food prices
   - Available / Unavailable toggle
   - Add/remove drinks and add-ons
   - Changes are stored in Firestore settings/menu and customer reads the live menu

3. Admin order ringtone:
   - Tap ENABLE SOUND once while Admin app is open
   - New orders beep
   - Rider assignment beep

4. Rider ringtone:
   - Tap ENABLE SOUND once while Rider app is open
   - New assigned orders beep
   - Rider nickname is displayed instead of Gmail in the Admin assignment dropdown

5. Rider profile:
   Firestore collection: riders
   Document ID = Firebase Authentication UID
   Fields:
     nickname
     email

IMPORTANT FIREBASE SETUP
-------------------------
A. Firebase Authentication:
   - Email/Password must be enabled for Admin and Rider.
   - Anonymous Authentication must be enabled for the Customer App.
B. Firestore:
   - Use the included firestore.rules as a starting point.
   - These rules are intentionally simple for testing. Before public production use, tighten admin/rider write permissions.
C. Rider UID currently used:
   qDZyQxBwWsQi32jSo0EpFwct0z93

D. Menu document:
   settings/menu

UPLOAD
------
Upload each app's index.html to its corresponding GitHub Pages location.
Do not overwrite the working V3.1 backup.

AUDIO NOTE
----------
Browser ringtone works while the app page is open and after the user has tapped ENABLE SOUND. A normal browser page cannot guarantee sound when the app is completely closed/backgrounded. For true background push notifications, Firebase Cloud Messaging/service-worker setup is needed.

LOCKING
-------
Keep the existing V3.1 LOCKED ZIP as the rollback copy. Test V3.2 first before replacing the live working build.
