MHAC DELIVERY — CONNECTION BUILD V1

This build adds the shared Customer -> Admin -> Rider connection while
leaving the locked GPS/delivery-fee core unchanged.

Flow:
CUSTOMER SEND ORDER
  -> Firebase mhac/orders
  -> ADMIN sees order live
  -> ADMIN assigns RIDER01
  -> RIDER01 sees it live
  -> Rider navigates to customer
  -> Rider updates PICKED UP / ON THE WAY / DELIVERED

Current locked rules preserved:
1 KM = PHP 40
Succeeding KM + PHP 10
10% service fee
Maximum 2 stores
2nd store + PHP 5

FIRST SETUP:
1. Fill mhac-firebase-config.js with your Firebase Web App config.
2. Firebase Authentication: enable Anonymous.
3. Firebase Realtime Database: create it.
4. For initial testing, use firebase-database-rules.json.
5. Open connection-test.html and press TEST CONNECTION.

CUSTOMER:
Use CUSTOMER_PATCH.txt. Do not replace the locked customer app blindly.

ADMIN:
Upload admin-connection.js beside the existing admin files and add:
<script src="mhac-firebase-config.js"></script>
<script src="mhac-connection.js"></script>
<script src="admin-connection.js"></script>

RIDER:
The included rider.html is already connection-ready.
Login:
Rider ID: RIDER01
Password: mhacrider

NAVIGATION:
The rider's NAVIGATE TO CUSTOMER button opens Google Maps driving directions.
It uses GPS coordinates from the customer order when available.

SECURITY:
The included database rule is for initial testing only. It allows authenticated
anonymous clients to read/write the order area. Before production, proper
role-based admin/rider authentication and tighter Firebase rules should be added.

Never upload a Firebase service-account JSON or admin database secret.
