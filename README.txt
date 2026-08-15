MHAC DELIVERY — CABAYAOASAN GPS FIX

IMPORTANT:
This is a targeted patch. Keep your current working index.html as backup.
Do NOT replace index.html with this patch.

INSTALL:
1. Upload mhac-cabayaoasan-fix.js to the same folder as index.html.
2. In the CURRENT index.html, add this immediately before </body>:
   <script src="mhac-cabayaoasan-fix.js"></script>
3. Commit changes and reload the site.
4. Test PANIQUI → Cabayaoasan → address "brgy hall".
5. Allow GPS permission when requested.

WHAT CHANGES:
- Cabayaoasan no longer uses the wrong geocoder result that produced the
  7.62 km / ₱110 result.
- GPS is used as the Cabayaoasan delivery endpoint when permission is granted.
- If GPS is unavailable/denied, the verified Cabayaoasan reference point
  (15.6646, 120.5545) is used.
- The existing route() and feeForKm() functions are reused.
- Delivery rate remains exactly:
  ₱40 first kilometer + ₱10 each succeeding kilometer.
- Other municipalities/barangays remain on the existing calculator.
- Adds the English price reminder under DELIVERY RATE.
