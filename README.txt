MHAC DELIVERY ADMIN V4 — COMPLETE FIX

UPLOAD:
Replace ONLY the existing admin.html with the admin.html in this ZIP.

DO NOT DELETE OR REPLACE:
- customer.html
- rider.html
- Firebase files
- Firestore Rules
- other repository files

FIX:
- Orders with status COMPLETED remain stored in Firestore.
- COMPLETED orders are hidden from Incoming Orders.
- Live count shows ACTIVE orders only.
- Clicking COMPLETE changes status to COMPLETED.
- The live Firestore listener automatically refreshes the Admin list.
- If completing fails, the button returns to COMPLETE and shows the Firebase error.

All other Admin V4 login, rider approval, rider assignment, and menu-manager logic is preserved from the supplied code.
