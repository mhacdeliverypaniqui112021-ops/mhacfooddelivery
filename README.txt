MHAC RIDER APP — FIREBASE VERSION

Rider UID:
qDZyQxBwWsQi32jSo0EpFwct0z93

This replaces the old hardcoded/localStorage rider connection.

The Rider App:
- logs in through Firebase Authentication (Email/Password)
- listens live to Firestore collection: orders
- only shows orders whose assignedRiderUid equals the rider UID
- opens Google Maps navigation using customer GPS when available
- otherwise uses the saved customer address
- lets the rider update PICKED UP / ON THE WAY / COMPLETED

IMPORTANT:
The current Admin code shown earlier still saves orders to browser localStorage.
That cannot send orders to another phone. The next build must update Admin so
orders are written to Firestore and assignedRiderUid is set when Admin assigns
the rider.

Required Firestore order field:
assignedRiderUid: "qDZyQxBwWsQi32jSo0EpFwct0z93"
