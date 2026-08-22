MHAC DELIVERY ADMIN V4 - FIXED

Replace ONLY admin.html in the existing GitHub repository.

This keeps the V4 Google-only admin login and live Firestore orders/riders.
Changes:
- Better mobile Google sign-in with redirect fallback.
- Clear Firebase/Auth error messages.
- No orderBy index requirement; orders are sorted in the browser.
- Uses serverTimestamp for admin updates.
- Does not alter customer, rider, Firebase config, or rules files.

After upload, wait for GitHub Pages to finish building, then hard-refresh the Admin page.
