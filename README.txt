MHAC DELIVERY V1.8 — CART FIRST + SEND ORDER

Customer:
- YOUR CART remains visible before customer information.
- Actual delivery fee/distance remains in YOUR CART after the customer calculates from the delivery address.
- Customer presses SEND ORDER.
- No OK confirmation dialog.
- Button changes to SENDING ORDER… then ORDER SENT.
- Order is stored in the Admin Orders queue.

Admin:
- Incoming Orders section.
- Shows customer, address, store, food, choices, quantity, distance, delivery fee, service fee and total.
- Existing menu manager / availability / QR features retained.

IMPORTANT:
This GitHub Pages prototype uses browser localStorage. That means an order is only shared with the Admin page when both are using the same browser/device storage. For real customer-phone -> admin-phone live orders, the next upgrade must connect Firebase/shared database.
