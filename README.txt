MHAC DELIVERY V3.4

APPS
- Customer: /customer/
- Admin: /admin/
- Rider: /rider/
- Root / redirects to /customer/ so GitHub Pages opens the customer app by default.

V3.4 CHANGES
- Stronger, longer Admin new-order ringtone and Rider assignment ringtone. Tap ENABLE SOUND once on each device/browser.
- New rider flow: Google/Gmail sign-in -> PENDING -> Admin APPROVE/REJECT -> approved rider can receive assignments.
- Admin can set the rider nickname during approval.
- Existing email/password rider accounts remain supported if they already have an approved rider profile.
- Customer GPS, delivery fee, Google customer login, ordering hours, menu manager, and existing Firebase order flow are preserved.

FIREBASE
Project: mhac-delivery-53099
Admin: mhacdeliverypaniqui112021@gmail.com
Firestore rules include riderApplications/{uid}. Publish firestore.rules before testing new rider approval.

IMPORTANT
Browser audio requires a user tap to enable sound. Web pages cannot guarantee ringtone when the browser/app is completely closed or the device is muted.
