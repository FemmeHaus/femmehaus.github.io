(function () {
  "use strict";
  var doc = document, C = window.FH_CONFIG || {}, D = window.FH_DATA || { events: [], moments: [], media: [] };
  doc.documentElement.classList.add("js");

  /* ---------- nav ---------- */
  var nav = doc.getElementById("nav");
  if (nav) {
    var toggle = nav.querySelector(".nav__toggle");
    var onScroll = function () { nav.classList.toggle("is-solid", window.scrollY > 40); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      doc.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); doc.body.style.overflow = ""; });
    });
  }

  /* ---------- reveal on scroll (runs last, after JS-rendered sections exist) ---------- */
  function initReveal() {
    var revealEls = doc.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });
      revealEls.forEach(function (el, i) { el.style.setProperty("--d", (i % 4) * 0.08 + "s"); io.observe(el); });
    } else revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- marquee: duplicate track for a seamless loop ---------- */
  doc.querySelectorAll(".marquee__track").forEach(function (t) { t.innerHTML += t.innerHTML; });

  /* ---------- lightbox (uses the full-size image when data-full is set) ---------- */
  var lb;
  function openLightbox(src, cap) {
    if (!lb) {
      lb = doc.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
      lb.innerHTML = '<button aria-label="Close">×</button><img alt=""><p></p>';
      doc.body.appendChild(lb);
      lb.addEventListener("click", function (e) { if (e.target !== lb.querySelector("img")) closeLb(); });
      doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
    }
    lb.querySelector("img").src = src; lb.querySelector("img").alt = cap || "";
    lb.querySelector("p").textContent = cap || "";
    lb.classList.add("is-open"); lb.querySelector("button").focus();
  }
  function closeLb() { if (lb) lb.classList.remove("is-open"); }
  doc.addEventListener("click", function (e) {
    var t = e.target.closest("[data-zoom]");
    if (t) { var img = t.querySelector("img"); if (img) openLightbox(img.getAttribute("data-full") || img.getAttribute("src"), img.getAttribute("data-cap") || img.alt); }
  });

  /* ---------- helpers ---------- */
  function fmtDate(iso) {
    if (!iso) return "";
    return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  }
  function todayISO() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function img(p, lazy) {
    var m = /\/p\/(.+)-s\.jpg$/.exec(p.s), d = m && window.FH_DIMS && window.FH_DIMS[m[1]];
    return '<img ' + (lazy === false ? "" : 'loading="lazy" ') + (d ? 'width="' + d[0] + '" height="' + d[1] + '" ' : "") + 'src="' + p.s + '" data-full="' + p.f + '" alt="' + p.alt + '">';
  }

  var today = todayISO();
  var upcoming = D.events.filter(function (e) { return e.date && e.date >= today; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var past = D.events.filter(function (e) { return e.date && e.date < today; })
    .sort(function (a, b) { return a.date < b.date ? 1 : -1; })                 // newest first…
    .concat(D.events.filter(function (e) { return !e.date; }));                 // …then undated, in data order

  function visual(e) {
    if (e.flyer) return '<a class="event__flyer" data-zoom><img loading="lazy" src="' + e.flyer + '" alt="' + e.plain + ' flyer"></a>';
    return e.poster ? posterHtml(e) : "";
  }

  /* ---------- events: calendar, cards and per-event sections ---------- */
  function fmtShort(iso) {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  function metaHtml(e) {
    var bits = [];
    if (e.date) bits.push(fmtDate(e.date));
    if (e.time) bits.push(e.time);
    if (e.venue) bits.push(e.venue);
    if (e.attendance) bits.push(e.attendance.toLocaleString() + " guests");
    return bits.length ? '<div class="event__meta">' + bits.map(function (b) { return "<span>" + b + "</span>"; }).join("") + "</div>" : "";
  }
  function posterHtml(e) {
    return '<div class="poster" role="img" aria-label="' + e.plain + '"><img src="assets/img/logo.png" alt=""><span>' + e.poster.kicker + '</span><b>' + e.poster.title + '</b></div>';
  }
  function coverHtml(e) {
    if (e.photos.length) return img(e.photos[0]);
    if (e.flyer) return '<img loading="lazy" src="' + e.flyer + '" alt="' + e.plain + ' flyer">';
    return e.poster ? posterHtml(e) : "";
  }
  function countLabel(n) { return n + (n === 1 ? " photo" : " photos"); }

  /* upcoming events calendar */
  var up = doc.getElementById("upcoming");
  if (up) {
    if (!upcoming.length) {
      up.innerHTML = '<div class="empty"><span class="label">The calendar</span><h3>The next moment is <em>being planned</em></h3>' +
        '<p>Get on the list and you’ll hear first — dates, RSVPs and early access land there before anywhere else.</p>' +
        '<a class="btn btn--solid" href="#join">Get on the list</a></div>';
    } else {
      up.innerHTML = upcoming.map(function (e) {
        return '<article class="event" data-reveal>' + visual(e) + '<div>' +
          '<span class="pill pill--fill">Upcoming</span><h3 style="margin-top:16px">' + e.title + '</h3>' + metaHtml(e) +
          '<p class="lede">' + e.blurb + '</p>' +
          '<a class="btn btn--solid" href="' + (e.rsvp || "#join") + '">RSVP</a></div></article>';
      }).join("");
    }
  }

  /* compact event cards (Community page) → each links to its section on the Events page */
  var ec = doc.getElementById("event-cards");
  if (ec) {
    ec.innerHTML = past.map(function (e) {
      var n = e.photos.length;
      return '<a class="ecard" href="events.html#' + e.id + '" data-reveal>' +
        '<div class="ecard__img">' + coverHtml(e) + (n ? '<span class="pill">' + countLabel(n) + '</span>' : "") + '</div>' +
        '<span class="ecard__meta">' + (e.date ? fmtShort(e.date) : e.presenter) + '</span>' +
        '<h3>' + e.title + '</h3><p>' + e.blurb + '</p><span class="link">See the night</span></a>';
    }).join("");
  }

  /* one section per event: blurb + facts on the left, every photo from that night on the right */
  var es = doc.getElementById("event-sections");
  if (es) {
    var all = upcoming.concat(past);
    var chipBar = doc.getElementById("event-chips");
    if (chipBar) chipBar.innerHTML = all.map(function (e) { return '<a class="chip" href="#' + e.id + '">' + e.plain + '</a>'; }).join("");
    es.innerHTML = all.map(function (e, i) {
      var n = e.photos.length, isUp = e.date && e.date >= today;
      var photos = n
        ? '<div class="evt__photos' + (n === 1 ? " evt__photos--one" : "") + '">' + e.photos.map(function (p) {
            return '<figure data-zoom data-reveal>' + img(p).replace("<img ", '<img data-cap="' + e.plain.replace(/"/g, "&quot;") + '" ') + '</figure>';
          }).join("") + '</div>'
        : '<div class="empty"><span class="label">Photos</span><h3>On their <em>way</em></h3><p>We’re still sorting through this one. Get on the list and we’ll show you first.</p><a class="btn" href="community.html#join">Get on the list</a></div>';
      return '<section class="sec evt ' + (i % 2 === 0 ? "sec--deep" : "sec--cream") + '" id="' + e.id + '"><div class="wrap evt__grid">' +
        '<div class="evt__side" data-reveal>' +
          '<div class="evt__num">' + String(i + 1).padStart(2, "0") + '</div>' +
          '<span class="label">' + e.presenter + '</span>' +
          '<h2>' + e.title + '</h2>' + (isUp ? '<span class="pill pill--fill">Upcoming</span>' : "") + metaHtml(e) +
          '<p class="lede">' + e.blurb + '</p>' +
          (n ? '<span class="evt__count">' + countLabel(n) + '</span>' : "") +
          visual(e) +
        '</div>' +
        '<div>' + photos + '</div></div></section>';
    }).join("");
    // sections are rendered by script, so honour a #hash from a card link once they exist
    if (location.hash) { var target = doc.getElementById(location.hash.slice(1)); if (target) target.scrollIntoView(); }
  }

  /* ---------- moments gallery ---------- */
  var mo = doc.getElementById("moments");
  if (mo) {
    var list = mo.getAttribute("data-limit") ? D.moments.slice(0, +mo.getAttribute("data-limit")) : D.moments;
    mo.innerHTML = list.map(function (m) {
      return '<figure data-zoom data-reveal>' + img(m, false).replace("<img ", '<img data-cap="' + m.cap + '" ') + '<figcaption>' + m.cap + '</figcaption></figure>';
    }).join("");
  }

  /* ---------- faces strip, activation strip, reels ---------- */
  var pt = doc.getElementById("portraits");
  if (pt) pt.innerHTML = D.portraits.map(function (p) { return '<div class="arch arch--b" data-zoom data-reveal>' + img(p) + '</div>'; }).join("");

  var ac = doc.getElementById("activation-strip");
  if (ac) ac.innerHTML = D.activation.map(function (m) {
    return '<figure data-zoom data-reveal>' + img(m).replace("<img ", '<img data-cap="' + m.cap + '" ') + '<figcaption>' + m.cap + '</figcaption></figure>';
  }).join("");

  var rl = doc.getElementById("reels");
  if (rl) rl.innerHTML = D.reels.map(function (r) {
    return '<figure class="reel" data-reveal><video src="' + r.src + '" poster="' + r.poster + '" preload="none" playsinline muted loop></video>' +
      '<button class="reel__play" aria-label="Play clip: ' + r.cap + '">▶</button><figcaption>' + r.cap + '</figcaption></figure>';
  }).join("");
  doc.addEventListener("click", function (e) {
    var b = e.target.closest(".reel__play, .reel video"); if (!b) return;
    var fig = b.closest(".reel"), v = fig.querySelector("video");
    if (v.paused) {
      doc.querySelectorAll(".reel video").forEach(function (o) { if (o !== v) { o.pause(); o.closest(".reel").classList.remove("is-playing"); } });
      v.muted = false; v.play(); fig.classList.add("is-playing");
    } else { v.pause(); fig.classList.remove("is-playing"); }
  });

  /* ---------- media hub cards + filter ---------- */
  var mh = doc.getElementById("media-cards");
  if (mh) {
    var lim = +mh.getAttribute("data-limit") || D.media.length;
    mh.innerHTML = D.media.slice(0, lim).map(function (m) {
      return '<article class="card" data-cat="' + m.cat + '" data-zoom data-reveal><figure><span class="pill">' + m.tag + '</span>' + img(m.img).replace("<img ", '<img data-cap="' + m.title.replace(/"/g, "&quot;") + '" ') + '</figure>' +
        '<h3>' + m.title + '</h3><p>' + m.note + '</p></article>';
    }).join("");
    doc.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        doc.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-on"); c.setAttribute("aria-pressed", "false"); });
        chip.classList.add("is-on"); chip.setAttribute("aria-pressed", "true");
        var f = chip.getAttribute("data-filter");
        mh.querySelectorAll(".card").forEach(function (c) { c.classList.toggle("is-hidden", f !== "all" && c.getAttribute("data-cat") !== f); });
      });
    });
  }

  /* ---------- forms ---------- */
  var SEGMENT = { community: "community", sponsor: "brand", activations: "brand", mediakit: "brand", academy: "academy", contact: "general" };
  doc.querySelectorAll("form[data-form]").forEach(function (form) {
    var kind = form.getAttribute("data-form"), msg = form.querySelector(".form-msg");
    form.setAttribute("novalidate", "");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      msg.classList.remove("is-err");
      if (form.querySelector(".hp input").value) return;          // honeypot
      var bad = null;
      form.querySelectorAll("[required]").forEach(function (f) { if (!bad && !f.checkValidity()) bad = f; });
      if (bad) { msg.classList.add("is-err"); msg.textContent = "Please check the highlighted field: " + (bad.getAttribute("data-name") || bad.name) + "."; bad.focus(); return; }

      var data = {}, fd = new FormData(form);
      fd.forEach(function (v, k) { if (k === "website") return; data[k] = data[k] ? [].concat(data[k], v) : v; });
      data.segment = SEGMENT[kind]; data.form = kind; data.page = location.pathname.split("/").pop(); data.submitted = new Date().toISOString();

      var btn = form.querySelector("button[type=submit]"); btn.disabled = true;
      var url = (C.endpoints || {})[kind];
      var done = function () {
        form.classList.add("is-done");
        msg.classList.remove("is-err");
        msg.textContent = form.getAttribute("data-success") || "You’re on the list ✦";
        if (kind === "mediakit" && C.mediaKitUrl) msg.innerHTML += '<br><a class="link" href="' + C.mediaKitUrl + '" download>Download the media kit</a>';
      };
      if (!url) { console.info("[FemmeHaus] form submitted (no endpoint configured yet):", data); done(); return; }
      fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () { btn.disabled = false; msg.classList.add("is-err"); msg.textContent = "Something went wrong — please try again, or email " + C.email + "."; });
    });
  });

  initReveal();
})();
