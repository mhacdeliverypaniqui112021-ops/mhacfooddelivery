MHAC DELIVERY — CABAYAOASAN TARGETED TEST PATCH
================================================

This is a LIMITED patch for:
PANIQUI > CABAYAOASAN

It does NOT change:
- interface
- menu
- stores
- choices
- cart
- checkout
- 2-store limit
- service fee
- delivery fee formula
- other barangays

IMPORTANT:
This patch supplies a Cabayaoasan reference only. It intentionally does not
replace the existing GPS/routing function because the current working source
file was not supplied in this turn. Replacing the whole calculator blindly
could break the barangays that are already testing correctly.

Test target:
- PANIQUI
- CABAYAOASAN

Delivery formula remains:
₱40 first km + ₱10 each succeeding km.

For a true road-distance correction, the current index.html should be patched
directly once it is available, using the customer's GPS coordinates as the
endpoint and a configured road-routing service.
