MHAC DELIVERY V3.3 — CUSTOMER LOGIN + BUSINESS HOURS

APPS INCLUDED
1. customer/index.html — Google/Gmail customer login, live menu, GPS delivery fee, ordering hours.
2. admin/index.html — Admin login, live orders, menu manager, rider nickname manager, ringtone, business hours.
3. rider/index.html — Rider Firebase login, nickname, assigned orders, ringtone, business-hours lock.
4. firestore.rules — security rules for customer/admin/rider access.

DEFAULT BUSINESS HOURS
09:00 AM to 08:00 PM (Philippine time/device local time). Admin can change this before closing.

CUSTOMER SECURITY
Customer must use Google sign-in before ordering. The order stores the authenticated Google UID and email.

RINGTONES
Admin and Rider must tap ENABLE SOUND once on the device/browser. Browser audio cannot be guaranteed when the webpage is completely closed.

IMPORTANT
This version intentionally locks customer ordering at closing time. Admin/Rider screens also lock at closing as requested. If riders are still delivering after closing, change the closing time later than the expected last delivery so an active delivery is not interrupted.

FIREBASE
Project: mhac-delivery-53099
Admin email used in security rules: mhacdeliverypaniqui112021@gmail.com
