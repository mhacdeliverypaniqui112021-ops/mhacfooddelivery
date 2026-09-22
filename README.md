# MHAC CUSTOMER SHARE BRIDGE V4

Purpose: make **MHAC DELIVERY** a dedicated Android Share Sheet target for Google Maps recipient-location sharing.

Flow:
Google Maps exact recipient pin -> Share -> MHAC DELIVERY -> receive Maps text/URL -> resolve/extract coordinates -> open the existing MHAC Customer page with `mhac_share_lat`, `mhac_share_lon`, `mhac_share_label`, and `mhac_share_url` query parameters.

Locked scope:
- Admin untouched.
- Rider untouched.
- Customer GPS/Manual UI untouched.
- Existing order/choice/backend behavior untouched.

Version: ShareTarget-V4 / versionCode 4.

Test:
1. Uninstall the previous Share Bridge package first (or install V4 as an upgrade if Android accepts the signature).
2. Open Google Maps and select an exact recipient location.
3. Tap Share.
4. Look for **MHAC DELIVERY**.
5. Tap it and confirm the Customer page receives the shared location.


## V5 fix
- Main Customer WebView intercepts `intent://`, `geo:`, `google.navigation:` and `comgooglemaps:` URLs so Android handles external map intents instead of showing `ERR_UNKNOWN_URL_SCHEME`.
- Share receiver remains dedicated and preserves the Google Maps shared-location handoff.
- Added a generic `*/*` SEND intent filter as a Samsung/Google Sharesheet fallback.
- Version code/name bumped to 5 / ShareTarget-V5.
- Admin/Rider and Customer website source are not modified by this project.
