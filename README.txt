MHAC DELIVERY — LOCKED STABLE V2.5
================================

This package keeps the existing customer interface and core order flow locked.

ONLY CHANGES IN THIS VERSION
1. Added a clear English food-price reminder under DELIVERY RATE.
2. Added common Cabayaoasan landmarks:
   - Barangay Hall / Multi-Purpose Hall
   - 7-Eleven Cabayaoasan
   - RUSI
   - Iglesia ni Cristo – Cabayaoasan
   - I&T Cabayaoasan
   - Cabayaoasan Elementary School
   - Mormons / LDS
   - Lam Asia Subdivision
   - Malempec
   - Other / Specific Landmark
3. Cabayaoasan landmark searches use a specific landmark query first, instead of allowing a generic
   "711" or similar text to accidentally resolve to the wrong place.
4. If a named landmark cannot be verified, the system does NOT invent a location or fee; it asks
   the customer to choose another landmark or enter a more specific address.
5. Delivery rate remains unchanged:
   1 KM = PHP 40
   Succeeding KM = +PHP 10
6. Existing 10% service fee, maximum 2 stores, and PHP 5 second-store fee remain unchanged.

UPLOAD
-------
Use the index.html in the root of this ZIP for GitHub Pages.
GitHub Pages requires index.html at the top level of the publishing source.

DO NOT replace or edit the core calculation/interface code unless specifically planned.
