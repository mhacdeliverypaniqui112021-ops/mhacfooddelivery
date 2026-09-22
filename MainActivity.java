package com.mhacdelivery.customer;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;

import java.nio.charset.StandardCharsets;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends Activity {
    private static final String CUSTOMER_URL = "https://mhacdelivery.devs.surf/customer.html";
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupWebView();
        handleShareIntent(getIntent());
    }

    private void setupWebView() {
        webView = new WebView(this);
        webView.setBackgroundColor(Color.WHITE);
        setContentView(webView);

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setSupportZoom(false);
        s.setLoadsImagesAutomatically(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.loadUrl(CUSTOMER_URL);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleShareIntent(intent);
    }

    private void handleShareIntent(Intent intent) {
        if (intent == null || !Intent.ACTION_SEND.equals(intent.getAction())) return;

        String text = intent.getStringExtra(Intent.EXTRA_TEXT);
        String title = intent.getStringExtra(Intent.EXTRA_TITLE);
        if (text == null) text = "";
        if (title == null) title = "";

        final String sharedText = text.trim();
        final String sharedTitle = title.trim();
        if (sharedText.isEmpty() && sharedTitle.isEmpty()) return;

        // Google Maps commonly shares a short maps.app.goo.gl URL. Resolve that
        // redirect in the APK so the live Customer website receives the exact
        // Maps URL plus any coordinates we can extract from it.
        new Thread(() -> {
            String raw = sharedText;
            String mapsUrl = findUrl(raw);
            if (mapsUrl == null && raw.startsWith("http")) mapsUrl = raw;

            String resolved = mapsUrl;
            if (mapsUrl != null && mapsUrl.contains("maps.app.goo.gl")) {
                String r = resolveUrl(mapsUrl);
                if (r != null) resolved = r;
            }

            double[] coords = extractCoords(resolved);
            if (coords == null) coords = extractCoords(raw);

            String label = sharedTitle;
            if (label.isEmpty()) label = extractLabel(raw, mapsUrl);

            String finalMapsUrl = resolved != null ? resolved : (mapsUrl != null ? mapsUrl : raw);
            openLiveCustomer(label, finalMapsUrl, coords);
        }).start();
    }

    private void openLiveCustomer(String label, String mapsUrl, double[] coords) {
        StringBuilder target = new StringBuilder(CUSTOMER_URL);
        target.append("?mhac_share=1");
        if (coords != null) {
            target.append("&mhac_share_lat=").append(coords[0]);
            target.append("&mhac_share_lon=").append(coords[1]);
        }
        if (label != null && !label.trim().isEmpty()) {
            target.append("&mhac_share_label=").append(Uri.encode(label.trim()));
        }
        if (mapsUrl != null && !mapsUrl.trim().isEmpty()) {
            target.append("&mhac_share_url=").append(Uri.encode(mapsUrl.trim()));
        }

        final String url = target.toString();
        new Handler(Looper.getMainLooper()).post(() -> {
            if (webView != null) webView.loadUrl(url);
        });
    }

    private static String findUrl(String text) {
        Matcher m = Pattern.compile("https?://\\S+", Pattern.CASE_INSENSITIVE).matcher(text == null ? "" : text);
        return m.find() ? m.group().replaceAll("[),.;]+$", "") : null;
    }

    private static String extractLabel(String raw, String url) {
        if (raw == null) return "Google Maps selected location";
        String s = raw;
        if (url != null) s = s.replace(url, "");
        s = s.replaceAll("https?://\\S+", "").trim();
        return s.isEmpty() ? "Google Maps selected location" : s.split("\\n")[0].trim();
    }

    private static String resolveUrl(String shortUrl) {
        HttpURLConnection c = null;
        try {
            c = (HttpURLConnection) new URL(shortUrl).openConnection();
            c.setInstanceFollowRedirects(true);
            c.setConnectTimeout(8000);
            c.setReadTimeout(10000);
            c.setRequestProperty("User-Agent", "Mozilla/5.0 MHAC-DELIVERY");
            c.setRequestMethod("GET");
            c.connect();
            c.getResponseCode();
            String finalUrl = c.getURL().toString();
            return finalUrl;
        } catch (Exception ignored) {
            return shortUrl;
        } finally {
            if (c != null) c.disconnect();
        }
    }

    private static double[] extractCoords(String text) {
        if (text == null) return null;
        String[] patterns = new String[]{
            "[?&](?:query|destination|center|ll)=(-?\\d{1,3}(?:\\.\\d+)?)[,%20]+(-?\\d{1,3}(?:\\.\\d+)?)",
            "@(-?\\d{1,3}(?:\\.\\d+)?),(-?\\d{1,3}(?:\\.\\d+)?)",
            "!3d(-?\\d{1,3}(?:\\.\\d+)?)!4d(-?\\d{1,3}(?:\\.\\d+)?)",
            "\\b(-?\\d{1,3}\\.\\d{4,}),\\s*(-?\\d{1,3}\\.\\d{4,})\\b"
        };
        for (String p : patterns) {
            Matcher m = Pattern.compile(p, Pattern.CASE_INSENSITIVE).matcher(text);
            if (!m.find()) continue;
            try {
                double lat = Double.parseDouble(m.group(1));
                double lon = Double.parseDouble(m.group(2));
                if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                    return new double[]{lat, lon};
                }
            } catch (Exception ignored) { }
        }
        return null;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
