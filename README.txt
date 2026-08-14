MHAC DELIVERY — GPS PATCH
========================

This patch is designed for the exact customer source supplied in chat.

What it changes:
- Browser high-accuracy GPS is the primary customer location.
- GPS coordinates are used for driving-route distance.
- OSRM driving distance is used first.
- Straight-line distance is only a temporary fallback if routing is unavailable.
- Existing delivery formula remains untouched: ₱40 first km, +₱10 succeeding km.
- Existing cart, stores, menu, choices, service fee, 2-store limit and checkout remain untouched.
- Reverse GPS address is stored in gpsAddress for later use.

How to apply:
1. Keep your current index.html as backup.
2. Open the current customer index.html.
3. Replace the button:
   onclick="calculateByAddress()"
   with:
   onclick="calculateByGPS()"
4. Paste gps-fix.js near the end of the existing <script> section.
5. Save and upload only the modified index.html to GitHub Pages.
6. Test on a phone and allow location permission.

Important:
- The GitHub Pages site must be HTTPS for browser GPS.
- GPS accuracy depends on the customer's phone and surroundings.
- Do not delete the current working version until GPS has been tested.
