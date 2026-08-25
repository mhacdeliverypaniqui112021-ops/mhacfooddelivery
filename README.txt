MHAC DELIVERY — UNIFIED WHITE UI V5 FIXED

Base: uploaded MHAC_DELIVERY_ADMIN_LOGOUT_STICKY_V4.zip

Fixed in this package:
- Removed duplicate View Order modal IDs/functions that caused View Full Order to open the wrong overlay.
- Separated customer chat and rider chat overlays.
- Centered chatbox with larger readable area and keyboard-safe compose area.
- Removed sticky admin header/logout behavior that could interfere while scrolling.
- Logout now has a real local prototype auth state instead of replacing the page temporarily.
- Refresh no longer silently restores the logged-in admin state after logout.
- Kept compact white background + black text design.
- Kept menu manager and GCash sections.
- Added basic working demo flow for order status, rider assignment, waiting time, completion and chat.
- Rider navigation opens Google Maps search for the order location.
- Admin/customer/rider share the same demo order and chat data in the same browser via localStorage.

IMPORTANT:
This ZIP is a corrected UI/flow prototype. The uploaded source explicitly said it did not contain the existing Firebase/backend logic. Therefore Firebase authentication, Firestore rules, realtime cross-device chat, real customer/rider accounts, and production order synchronization still need to be merged into this base before live deployment.
