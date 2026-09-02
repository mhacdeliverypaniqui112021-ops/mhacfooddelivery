MHAC CUSTOMER PART DUPLICATE FIX V2
======================================

Based on the current GitHub customer.html.

Problem:
The current Customer App renders both:
- the old CHICKEN PART SELECTION (+/- counter)
- the newer Choice Group named Part (radio buttons)

Fix:
- The old upper selector is hidden.
- The lower Part radio selector is the only visible selector.
- The selected lower Part is synchronized to the existing internal chickenParts
  data so the existing cart/order structure still works.
- If quantity is increased, the selected Part is applied to all pieces.
- Other choice groups and checkout/GPS logic are untouched.

INSTALL
-------
Put customer_part_selection_fix_v2.js in the same folder as customer.html.

Then add immediately before </body>:

<script src="customer_part_selection_fix_v2.js"></script>

Upload both files to GitHub.

TEST
----
1. Open a chicken food.
2. The upper CHICKEN PART SELECTION must be completely gone.
3. Only the lower Part radio choices remain.
4. Select Thigh (or another Part).
5. Add to cart.
6. Cart should still show the selected Part.
7. Test quantity >1 and confirm the selected Part applies to the ordered pieces.

IMPORTANT
---------
Do not remove the existing chickenParts code yet. The patch hides its UI and
uses it internally so existing order/cart compatibility is preserved.
