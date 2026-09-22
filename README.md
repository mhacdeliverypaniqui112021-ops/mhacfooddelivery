# MHAC DELIVERY Customer Share Bridge V6

Purpose: make **MHAC DELIVERY** a distinct Android Share target for Google Maps recipient-location sharing.

## Important V6 change
The bridge now uses a **unique applicationId**:
`com.mhacdelivery.sharebridge`

This prevents it from being overwritten/confused with the normal MHAC Customer APK package.

## Test
1. Uninstall older Share Bridge V2/V3/V4/V5 if present.
2. Build and install this V6 APK.
3. Open it once.
4. Google Maps -> choose exact recipient location -> Share -> More.
5. Select **MHAC DELIVERY**.
6. The bridge extracts the shared Maps URL/coordinates and opens the existing Customer page with `mhac_share_lat`, `mhac_share_lon`, `mhac_share_label`, and `mhac_share_url`.

## Protected
This bridge does not modify the live Customer website, Admin, Rider, Choice Groups, or order structure.
