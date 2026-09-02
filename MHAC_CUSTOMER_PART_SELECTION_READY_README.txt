MHAC CUSTOMER — FINAL PART SELECTION FIX

This patch does only this:
1. Hides the duplicate upper "CHICKEN PART SELECTION" box.
2. Keeps the lower "Part" radio choices visible.
3. Makes the lower Part radio control the existing chickenParts data.
4. Keeps quantity/cart/order validation working.
5. Does not modify Drinks, Fries, Add-ons, GPS, Checkout, Firebase, or Admin/Rider.

IMPORTANT:
This is a patch script, not a replacement customer.html. To activate it, add this line before </body> in customer.html:
<script src="MHAC_CUSTOMER_PART_SELECTION_READY_PATCH.js"></script>

If you want a full replacement customer.html ZIP, upload the actual customer.html file as an attachment; pasted HTML text cannot be safely reconstructed as a file without risking missing content.
