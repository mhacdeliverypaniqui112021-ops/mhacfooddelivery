MHAC DELIVERY MASTER V2.1 — ACCURATE DELIVERY UPDATE

This package starts from the confirmed MASTER V2.0 and only updates delivery calculation.

CHANGES:
- Preserves the V2.0 customer interface.
- Delivery fee is blank until customer calculates.
- Uses Municipality + exact Barangay + customer address for geocoding.
- Uses driving-route distance from Paniqui Public Plaza as MHAC origin.
- Nampicuan is correctly treated as Nueva Ecija; the other six areas are Tarlac.
- Delivery fee: first 1 km = PHP 40; each succeeding started km = +PHP 10.
- No customer GPS button.
- If address cannot be found, no delivery fee is accepted.
- Exact barangay lists in V2.0 are retained; they are based on PSA/PSGC.

IMPORTANT:
This uses public OpenStreetMap Nominatim and OSRM routing services from the browser. Public services can occasionally rate-limit requests. For production, we should move geocoding/routing to a backend/Firebase function.

UPLOAD:
Upload all files from this ZIP to the root of the GitHub Pages repository, replacing the current V2.0 files.


V2.2 ADDRESS FIX
- Improved Philippine address/barangay geocoding with multiple query formats.
- Clears previous delivery result before every calculation.
- Uses exact address when mapped; otherwise uses selected barangay location as an estimate instead of showing a false error with an old fee.
- Keeps existing V2.1 interface and delivery formula unchanged.
