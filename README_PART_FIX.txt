MHAC DELIVERY — CUSTOMER PART SELECTION FIX

Purpose:
- Remove the duplicate upper CHICKEN PART SELECTION (+/- counter).
- Keep the lower Choice Group named Part as the only customer-facing part selector.
- The lower Part choices continue to be captured through choiceGroups and sent with the order.
- The existing Admin/Rider files are not changed by this patch.

Install:
1. Upload customer_part_selection_fix.js beside customer.html.
2. Add this immediately before </body> in customer.html:
   <script src="customer_part_selection_fix.js"></script>
3. Commit/publish.
4. Refresh the Customer App.
