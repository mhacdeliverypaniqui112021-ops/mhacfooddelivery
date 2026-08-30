# MHAC DELIVERY V4.1.74 — APK READY PROJECT

Three Android app modules are included:
- customer — MHAC DELIVERY Customer
- rider — MHAC DELIVERY Rider
- admin — MHAC DELIVERY Admin

The web files are packaged into each app's Android WebView without redesigning the tested UI.
Build with Android Studio/Gradle:
- :customer:assembleDebug
- :rider:assembleDebug
- :admin:assembleDebug

NOTE: Firebase web authentication behavior inside WebView can require additional OAuth configuration/testing. This project preserves the current web app and does not change the Firebase project.
