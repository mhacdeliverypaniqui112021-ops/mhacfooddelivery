/* MHAC DELIVERY V3.3 - STRONG RINGTONE PATCH
   Works with the existing Admin/Rider app after the app calls:
   MHACSound.enable()
   MHACSound.ring("admin") / MHACSound.ring("rider")

   Browser rule: the device/browser must be unlocked once by tapping
   ENABLE SOUND. Audio cannot be guaranteed when the page is completely closed.
*/
(function () {
  let audioCtx = null;
  let enabled = false;
  let timer = null;

  function getCtx() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) throw new Error("Web Audio is not supported.");
    if (!audioCtx) audioCtx = new Ctx();
    return audioCtx;
  }

  async function enable() {
    const ctx = getCtx();
    if (ctx.state === "suspended") await ctx.resume();
    enabled = true;
    // short confirmation tone
    beep(ctx, 880, 0.16, 0.10);
    setTimeout(() => beep(ctx, 1175, 0.18, 0.10), 180);
    return true;
  }

  function beep(ctx, freq, duration, volume) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  function ring(app) {
    if (!enabled) return false;
    stop();
    const ctx = getCtx();
    let count = 0;

    function cycle() {
      if (count >= 12) return; // strong notification, then stops
      beep(ctx, app === "rider" ? 980 : 880, 0.20, 0.18);
      setTimeout(() => beep(ctx, app === "rider" ? 740 : 660, 0.20, 0.18), 230);
      count++;
      timer = setTimeout(cycle, 850);
    }
    cycle();
    return true;
  }

  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  window.MHACSound = {
    enable,
    ring,
    stop,
    isEnabled: () => enabled
  };
})();
