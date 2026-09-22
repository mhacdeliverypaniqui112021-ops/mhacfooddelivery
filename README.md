# MHAC CUSTOMER SHARE BRIDGE V3

Purpose: make **MHAC DELIVERY** appear as a Google Maps/Android Share Sheet target and pass the recipient's shared Maps location to the live Customer page.

Locked scope:
- Admin is NOT modified.
- Rider is NOT modified.
- Customer GPS/Manual Location UI is NOT modified by this bridge source.
- This bridge only receives a shared Maps target and forwards coordinates/label/URL to `customer.html`.

Share flow:
Google Maps -> Share -> MHAC DELIVERY -> customer.html -> recipient lat/lon -> distance/delivery-fee calculation.

Changes from V2:
- Explicit activity label `MHAC DELIVERY`.
- Added MHAC DELIVERY share icon.
- Accepts `text/plain`, `text/*`, and `text/uri-list` SEND shares.
- VersionCode 2 / ShareTarget-V3-MHAC.
- Existing coordinate extraction and customer URL handoff preserved.
