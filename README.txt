MHAC DELIVERY V1.6 FIXED
This is a clean rebuild because the previous V1.5 had a runtime error.

Customer:
- Store -> Category -> Food -> choices
- Quantity +/- in cart
- Cart grouped by store
- Checkout / Place Order restored
- Municipality -> Barangay -> typed address
- Delivery fee is calculated from MHAC base to the delivery ADDRESS.
- GPS is optional, not the primary calculation.
- 1st km ₱40, succeeding km +₱10.

Admin:
- Add/remove stores
- Add foods
- Add prices
- Add choices/add-ons
- Mark food AVAILABLE / UNAVAILABLE with one click
- Generate a custom MHAC menu QR containing menu data (not photos)
- Download QR PNG
- Import MHAC menu data

IMPORTANT:
For your food photos: send them to ChatGPT together with the store/category. I can read the menu photo, extract food names/prices/choices, and prepare the MHAC menu data. The QR should encode the menu data, not the photo itself; a QR normally stores a link/data payload rather than the image file itself.
Upload ALL four files to the ROOT of a clean GitHub Pages repository.
