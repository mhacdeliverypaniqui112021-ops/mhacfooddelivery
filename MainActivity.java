package com.mhacdelivery.sharebridge;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** Main Customer WebView. External map/intent URLs are handled by Android, not WebView. */
public class MainActivity extends Activity {
    private static final String CUSTOMER_URL = "https://mhacdelivery.devs.surf/customer.html";
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        webView.setBackgroundColor(Color.WHITE);
        setContentView(webView);
        configureWebView(webView);
        webView.loadUrl(CUSTOMER_URL);
    }

    private void configureWebView(WebView wv) {
        WebSettings s = wv.getSettings();
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
        wv.setWebViewClient(new ExternalUrlWebViewClient());
        wv.setWebChromeClient(new WebChromeClient());
    }

    private class ExternalUrlWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return handleExternalUri(request != null ? request.getUrl() : null);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return handleExternalUri(url == null ? null : Uri.parse(url));
        }

        private boolean handleExternalUri(Uri uri) {
            if (uri == null) return false;
            String scheme = uri.getScheme();
            if (scheme == null) return false;
            if ("http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme)) {
                // Normal website navigation stays inside the Customer WebView.
                return false;
            }
            if ("intent".equalsIgnoreCase(scheme)) {
                try {
                    Intent i = Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME);
                    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    if (i.resolveActivity(getPackageManager()) != null) {
                        startActivity(i);
                        return true;
                    }
                    String fallback = i.getStringExtra("browser_fallback_url");
                    if (fallback != null && !fallback.isEmpty()) {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(fallback)));
                        return true;
                    }
                } catch (Exception ignored) { }
                return true;
            }
            if ("geo".equalsIgnoreCase(scheme) || "google.navigation".equalsIgnoreCase(scheme)
                    || "comgooglemaps".equalsIgnoreCase(scheme)) {
                try {
                    Intent i = new Intent(Intent.ACTION_VIEW, uri);
                    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(i);
                } catch (Exception ignored) { }
                return true;
            }
            return false;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
