MHAC DELIVERY — CHOICE GROUPS FIX
================================

This ZIP contains:
- admin_choicegroups_fix.js

Purpose:
- Stop deleted Drinks/Add-ons/Fries/Parts choices from returning through old
  legacy fields.
- Persist Fries correctly.
- Make Choice Group Copy/Paste reliable on Android.
- Keep copied choices independent from the original group.

INSTALL
-------
1. Open your current admin.html in GitHub.
2. Find the final </body> tag.
3. Before </body>, add:

<script src="admin_choicegroups_fix.js"></script>

4. Upload admin_choicegroups_fix.js to the same folder as admin.html.
5. Commit the changes.
6. Refresh Admin with a hard refresh / clear cached page if needed.

IMPORTANT
---------
Do not replace the current admin.html with an older version.
This patch is intended for the current GitHub version you gave me.

After installation:
- Delete unwanted choices.
- SAVE FOOD.
- Close/reopen the food.
- Refresh the Admin page.
The deleted group choices should remain deleted.

Copy/Paste:
- COPY stores the whole current Choice Group locally.
- PASTE creates fresh independent rows.
