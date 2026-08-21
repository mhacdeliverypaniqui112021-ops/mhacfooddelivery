MHAC DELIVERY V3.4 RIDER REPLACEMENT
======================================

Replace ONLY the existing:
rider/index.html

Do not delete Customer, Admin, or Firebase rules.

This rider page adds:
- Google/Gmail sign-in for new riders
- Pending approval through riderApplications/{uid}
- Admin-approved rider access through riders/{uid}
- Existing email/password legacy login retained
- Stronger/longer assignment ringtone
- Existing assigned-order Firebase flow
- Existing nickname lookup
- Existing business-hours lock
- Existing order status updates and navigation

After upload, hard-refresh the Rider App and test:
Google Gmail -> PENDING APPROVAL -> Admin approves -> Rider reload/login -> assigned order.
