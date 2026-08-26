(function () {
  const BAD_TEXT = [
    "V4.1.57",
    "V4.1.49",
    "TIME LIMIT TEST MODE",
    "MASTER UNIFIED WHITE UI",
    "LIVE RIDER SYNC",
    "ADMIN MASTER",
    "CUSTOMER MASTER",
    "RIDER MASTER"
  ];

  function isBad(el) {
    if (!el || el === document.body || el === document.documentElement) return false;
    const id = String(el.id || "").toLowerCase();
    const cls = String(el.className || "").toLowerCase();
    if (id === "badge" || id.includes("buildbadge") || id.includes("versionbadge")) return true;
    if (cls.includes("badge") && cls.includes("build")) return true;
    const txt = String(el.textContent || "").trim().toUpperCase();
    return BAD_TEXT.some(x => txt.includes(x));
  }

  function clean() {
    try {
      document.querySelectorAll("body *").forEach(el => {
        if (isBad(el)) {
          const parent = el.parentElement;
          if (parent && parent.children.length <= 3 && String(el.textContent || "").length < 180) {
            el.remove();
          } else if (el.id === "badge") {
            el.remove();
          }
        }
      });
      document.querySelectorAll("[style*='position:sticky'],[style*='position: fixed']").forEach(el => {
        const t = String(el.textContent || "").toUpperCase();
        if (BAD_TEXT.some(x => t.includes(x))) el.remove();
      });
    } catch (_) {}
  }

  clean();
  new MutationObserver(clean).observe(document.documentElement, {subtree:true, childList:true});
})();
