const CACHE_NAME = "mhac-share-target-v1-3";
self.addEventListener("install", event => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "POST" || url.pathname !== "/customer.html") return;
  event.respondWith((async () => {
    try {
      const fd = await req.formData();
      const parts = [fd.get("title"), fd.get("text"), fd.get("url")].filter(v => v != null && String(v).trim());
      const text = parts.join("\n").trim();
      const encoded = btoa(unescape(encodeURIComponent(text)));
      return Response.redirect(url.origin + "/customer.html?mhac_shared=" + encodeURIComponent(encoded), 303);
    } catch (e) {
      return Response.redirect(url.origin + "/customer.html", 303);
    }
  })());
});
