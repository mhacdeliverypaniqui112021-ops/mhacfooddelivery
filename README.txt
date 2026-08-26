MHAC DELIVERY — HOME SCREEN ICON PATCH

This package contains:
- mhac-icon-192.png
- mhac-icon-512.png
- manifest-customer.webmanifest
- manifest-rider.webmanifest
- manifest-admin.webmanifest

IMPORTANT:
The existing customer.html, rider.html and admin.html should each link to
their matching manifest in the <head>:

Customer:
<link rel="manifest" href="manifest-customer.webmanifest">

Rider:
<link rel="manifest" href="manifest-rider.webmanifest">

Admin:
<link rel="manifest" href="manifest-admin.webmanifest">

Also add in each <head>:
<link rel="icon" type="image/png" sizes="192x192" href="mhac-icon-192.png">
<meta name="theme-color" content="#e21d25">

After uploading, remove the old Home Screen shortcuts and install/create
the shortcuts again so Chrome refreshes the app icons.
