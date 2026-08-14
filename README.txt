# MHAC DELIVERY — Stable V2 baseline + safe upgrades

Files:
- index.html = Customer App
- admin.html = Admin App
- rider.html = Rider App
- style.css = shared interface
- customer.js / admin.js / rider.js
- data/menu.js = editable menu seed
- data/barangays.js = service-area barangays
- data/barangays.json = source data copy

Service areas:
PANIQUI, MONCADA, RAMOS, GERONA, PURA, ANAO, NAMPICUAN

Delivery:
- First 1 km = PHP 40
- Every succeeding km = +PHP 10
- 10% service fee
- Maximum 2 stores
- 2nd store = +PHP 5

Important:
1. This package keeps the customer/admin/rider separation and the working 2-store/cart/checkout flow.
2. Orders are stored in browser localStorage for testing. For real multi-phone live sync, Firebase/Firestore must be connected in the next step.
3. Delivery calculation uses customer browser geolocation and OSRM road routing from the configured base address. Set the exact dispatch/base address in Admin.
4. When you send food/store photos, they should be processed into menu data (food names, prices, categories, choices) and added to data/menu.js or imported as JSON. Photos do not need to be stored in the menu.
5. QR generation in Admin creates a QR for the published menu/app URL. The photo-to-menu extraction itself is handled before packaging so it does not alter the app code.
