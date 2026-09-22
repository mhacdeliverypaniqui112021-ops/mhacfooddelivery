# MHAC DELIVERY Customer Share Target V2

This is a native Android Share Target bridge for the existing live Customer website.

Flow:
Google Maps → Share → MHAC DELIVERY → opens the live Customer website
`https://mhacdelivery.devs.surf/customer.html`

The APK receives `ACTION_SEND` text/plain, resolves Google Maps short links when possible,
extracts latitude/longitude from the resolved Maps URL, and passes the shared data to the
live Customer website using `mhac_share_*` query parameters.

The APK does not replace the Customer website UI or Firebase/business logic.
