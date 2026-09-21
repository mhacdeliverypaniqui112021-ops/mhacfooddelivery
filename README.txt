MHAC CUSTOMER V4.1.105 - GOOGLE MAPS MANUAL LOCATION

TEST COPY ONLY. Existing GPS/location fee path is preserved.

IMPORTANT: Set your Google Maps JavaScript API key in customer.html:
const MHAC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY";

Enable Maps JavaScript API + Places API (New), and configure billing/restrictions in Google Cloud. Do not paste a secret key into chat.

Manual flow: type location -> select Google Maps result -> selected latitude/longitude are assigned to the same gpsLat/gpsLon variables -> existing Calculate Delivery Fee button -> existing OSRM distance and fee calculation -> same order GPS structure.

GPS button and all existing cart/order/Firebase functionality are otherwise untouched.
