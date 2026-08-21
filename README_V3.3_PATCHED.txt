MHAC DELIVERY V3.3 PATCHED / VERIFIED FROM USER-UPLOADED APPS

IMPORTANT:
The uploaded Customer App is ALREADY directly connected to Firebase Firestore.
Its placeOrder() uses addDoc(collection(db,"orders"), o), so a separate
mhac-connection.js patch is NOT required for this exact build.

The uploaded Admin App already listens live to Firestore orders and assigns
riders using rider UID + nickname.
The uploaded Rider App already listens live to orders assigned to its UID.

Business hours default has been corrected to:
OPEN 09:00
CLOSE 19:00

Upload structure for a single GitHub Pages repository:
customer/index.html
admin/index.html
rider/index.html
firestore.rules

If using separate repositories, upload each app's index.html as the root
index.html for that repository.

Do not mix these files with older V3.2/V3.3 files.
