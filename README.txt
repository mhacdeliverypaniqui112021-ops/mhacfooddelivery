MHAC DELIVERY V4 - RIDER + ADMIN FIX

Upload:
- Replace rider.html with the fixed rider.html.
- Replace admin.html with the fixed admin.html.
Do NOT delete customer app, Firebase files, or other repository files.

Rider changes:
- Google login has mobile redirect fallback.
- First-time Google rider automatically creates riders/{uid} with approved:false.
- Rider remains pending until MHAC Admin approves.
- Existing approved riders continue to receive assigned orders.

Admin changes:
- Rider list shows pending riders.
- Pending riders get an APPROVE RIDER button.
- Approval writes approved:true to the rider profile.
- Existing live orders and rider assignment remain.

If rider profile creation reports Firestore permission-denied, the Firestore Rules must allow an authenticated user to create/read only their own riders/{uid} document. The exact rule should be reviewed before changing production rules.
