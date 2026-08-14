MHAC DELIVERY MASTER V2.3 — LOCKED DELIVERY ADDRESS BUILD

BASE: MHAC DELIVERY MASTER V2.0/V2.2

LOCKED WORKING FEATURES:
- Existing customer interface and menu/cart flow preserved.
- Maximum 2 stores per order.
- 2nd store fee +P5.
- 10% service fee.
- Delivery: first 1 km = P40; every succeeding started km = +P10.
- Municipalities: Paniqui, Moncada, Ramos, Gerona, Pura, Anao, Nampicuan.
- Barangay dropdown per municipality.

ADDRESS LOCATION FIX V2.3:
- Exact address lookup tries Nominatim and Photon.
- If a street/house number is not mapped, the selected barangay is used as fallback.
- If barangay lookup is unavailable, the municipality center is used as final fallback so checkout does not get stuck on “Address not found”.
- Old delivery fee is cleared whenever the customer recalculates.
- GPS/current-device location is not used.

IMPORTANT:
This build is the LOCKED BASE for the next Admin/Customer/Rider work. Do not replace index.html with older versions.
