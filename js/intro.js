/* ==========================================================================
   FemmeHaus — landing intro
   The "f" and the "h" of the monogram write themselves on, drifting in from
   opposite sides so their strokes weave into each other, form the logo, then
   the finished mark flies to its home in the top-left of the nav.

   Data (js/intro-data.js) is the real logo's pixels, ordered along each stroke,
   so the letters are revealed pen-style and land pixel-exact.
   Plays on every page load (skipped for prefers-reduced-motion).
   Skips for prefers-reduced-motion, and on click / tap / any key.
   ========================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  if (!root.classList.contains("intro-active")) return;

  var D = window.FH_INTRO, overlay = document.getElementById("intro");
  var logo = document.getElementById("intro-logo");
  var navImg = document.querySelector(".nav .brand img");
  if (!D || !overlay || !logo || !navImg || !document.createElement("canvas").getContext) { return finish(true); }

  try { window.history.scrollRestoration = "manual"; } catch (e) {}
  window.scrollTo(0, 0);

  /* ---------- timeline (ms) ---------- */
  var T = {
    bloom:   [0, 750],      // circle blooms in
    f:       [350, 2650],   // "f" draws (stem rises, hairline wraps round)
    h:       [950, 2950],   // "h" draws, crossing the f's path
    settle:  [2950, 3400],  // tiny breath once complete
    fly:     [3550, 4650],  // logo flies to the nav
    bgFade:  [3700, 4650]
  };
  var TOTAL = T.fly[1];

  /* ---------- decode pen-order data ---------- */
  function decode(p) {
    var bin = atob(p.b64), u8 = new Uint8Array(bin.length), i;
    for (i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    var n = p.n, buf = u8.buffer;
    return { n: n, max: p.max,
      xs: new Uint16Array(buf, 0, n), ys: new Uint16Array(buf, n * 2, n),
      ds: new Uint16Array(buf, n * 4, n), cs: new Uint8Array(buf, n * 6, n) };
  }
  function makePiece(id, p, from) {
    var cv = document.getElementById(id); cv.width = cv.height = D.n;
    var ctx = cv.getContext("2d"), img = ctx.createImageData(D.n, D.n);
    return { el: cv, ctx: ctx, img: img, d: decode(p), ptr: 0, from: from, dirty: false };
  }
  var pieces = [
    // where each letter starts (fractions of the logo's width), and how it is turned
    makePiece("cv-f", D.pieces.f, { x: -0.11, y: 0.075, r: -11, s: 1.07 }),
    makePiece("cv-h", D.pieces.h, { x: 0.13, y: -0.10, r: 13, s: 0.92 })
  ];
  var ink = D.ink;

  /* ---------- easing ---------- */
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function prog(t, r) { return clamp((t - r[0]) / (r[1] - r[0])); }
  function inOutCubic(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function inOutSine(x) { return -(Math.cos(Math.PI * x) - 1) / 2; }
  function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function outQuint(x) { return 1 - Math.pow(1 - x, 5); }
  function lerp(a, b, k) { return a + (b - a) * k; }

  function drawTo(pc, threshold) {
    var d = pc.d, px = pc.img.data, w = D.n;
    while (pc.ptr < d.n && d.ds[pc.ptr] <= threshold) {
      var o = (d.ys[pc.ptr] * w + d.xs[pc.ptr]) * 4;
      px[o] = ink[0]; px[o + 1] = ink[1]; px[o + 2] = ink[2]; px[o + 3] = d.cs[pc.ptr];
      pc.ptr++; pc.dirty = true;
    }
    if (pc.dirty) { pc.ctx.putImageData(pc.img, 0, 0); pc.dirty = false; }
  }

  /* ---------- geometry for the flight to the nav ---------- */
  var box, tx, ty, ts;
  function measure() {
    // The intro logo is always centred in the viewport, so its rest position needs no
    // measuring (and survives a mid-animation resize); only the nav logo is measured.
    var b = navImg.getBoundingClientRect(), de = document.documentElement;
    box = { cx: de.clientWidth / 2, cy: de.clientHeight / 2, size: logo.offsetWidth };
    tx = (b.left + b.width / 2) - box.cx;
    ty = (b.top + b.height / 2) - box.cy;
    ts = b.width / box.size;
  }
  measure();
  window.addEventListener("resize", measure);

  /* ---------- run ---------- */
  var t0 = null, raf = 0, flying = false, done = false;
  function render(t) {

    // circle bloom + settle pulse
    var bloom = outCubic(prog(t, T.bloom));
    var settle = prog(t, T.settle), pulse = Math.sin(settle * Math.PI) * 0.028;
    var base = lerp(0.72, 1, bloom) + pulse;
    logo.style.opacity = clamp(bloom * 1.6);

    // letters: drawn along their strokes, drifting home while they draw
    var pf = prog(t, T.f), ph = prog(t, T.h), i, pc, p, k, e;
    for (i = 0; i < pieces.length; i++) {
      pc = pieces[i]; p = i === 0 ? pf : ph; k = i === 0 ? inOutSine(p) : inOutSine(p);
      drawTo(pc, k * (pc.d.max + 1));
      e = 1 - inOutCubic(p);                                    // 1 → 0 as the letter arrives
      pc.el.style.transform = "translate(" + (pc.from.x * e * 100) + "%," + (pc.from.y * e * 100) + "%) rotate(" + (pc.from.r * e) + "deg) scale(" + lerp(1, pc.from.s, e) + ")";
    }

    // flight to the nav corner
    var fp = inOutCubic(prog(t, T.fly)), tr;
    if (t >= T.fly[0]) {
      flying = true;
      tr = "translate(" + (tx * fp) + "px," + (ty * fp) + "px) scale(" + lerp(base, ts, fp) + ")";
      logo.style.boxShadow = "0 30px 80px rgba(0,0,0," + (0.5 * (1 - fp)) + ")";
    } else {
      tr = "scale(" + base + ")";
    }
    logo.style.transform = tr;
    overlay.firstElementChild.style.opacity = 1 - inOutSine(prog(t, T.bgFade));   // .intro__bg
  }

  function frame(now) {
    if (done) return;
    if (t0 === null) t0 = now;
    var t = now - t0;
    render(t);
    if (t >= TOTAL) return finish(false);
    raf = requestAnimationFrame(frame);
  }

  function finish(instant) {
    if (done) return; done = true;
    cancelAnimationFrame(raf);
    root.classList.remove("intro-active");
    root.classList.add("intro-done");
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    window.removeEventListener("keydown", skip);
  }

  // skip: jump the clock to the start of the flight, so it still glides home
  function skip() {
    if (done || t0 === null) return;
    var now = performance.now();
    if (now - t0 < T.fly[0]) {
      for (var i = 0; i < pieces.length; i++) { drawTo(pieces[i], 1e9); pieces[i].el.style.transform = "none"; }
      t0 = now - T.fly[0];
    }
  }
  overlay.addEventListener("click", skip);
  window.addEventListener("keydown", skip);

  // dev: ?intro&introAt=2200 renders one still frame of the timeline (no playback) for tuning
  var still = /[?&]introAt=(\d+)/.exec(location.search);
  if (still) { render(+still[1]); window.addEventListener("resize", function () { render(+still[1]); }); return; }

  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { raf = requestAnimationFrame(frame); }); }
  else raf = requestAnimationFrame(frame);
  if (!still) setTimeout(function () { finish(true); }, 9000);   // failsafe: never trap the page
})();
