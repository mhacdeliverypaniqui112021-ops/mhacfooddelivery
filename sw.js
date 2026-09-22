const CACHE_NAME = "mhac-share-target-v1-2";
self.addEventListener("install", event => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "POST" || url.pathname !== "/customer.html") return;
  event.respondWith((async () => {
    try {
      const ct = (req.headers.get("content-type") || "").toLowerCase();
      let text = "";
      if (ct.includes("text/plain")) {
        text = await req.text();
      } else if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
        const fd = await req.formData();
        text = [fd.get("title"), fd.get("text"), fd.get("url")].filter(Boolean).join("\n");
      } else {
        text = await req.text();
      }
      const encoded = btoa(unescape(encodeURIComponent(String(text || ""))));
      return Response.redirect(url.origin + "/customer.html?mhac_shared=" + encodeURIComponent(encoded), 303);
    } catch (e) {
      return Response.redirect(url.origin + "/customer.html", 303);
    }
  })());
});
