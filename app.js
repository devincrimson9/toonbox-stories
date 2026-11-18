/* Builds the page from config.js. You shouldn't need to edit this file. */
(function () {
  var S = window.SITE || {};
  var V = window.VIDEOS || [];
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var setAll = function (sel, val) { if (val) $$(sel).forEach(function (el) { el.textContent = val; }); };

  // --- Text from settings ---
  setAll("[data-name]", S.businessName);
  setAll("[data-personal-price]", S.personalPrice);
  setAll("[data-brand-price]", S.brandPrice);
  setAll("[data-personal-length]", S.personalLength);
  setAll("[data-brand-length]", S.brandLength);
  setAll("[data-delivery]", S.deliveryDays);
  if (S.businessName) document.title = S.businessName + " — your story as a 3D cartoon";
  $("#year").textContent = new Date().getFullYear();

  if (S.tiktokHandle === "yourhandle") S.tiktokHandle = ""; // placeholder: hide broken link
  var tiktokUrl = S.tiktokHandle ? "https://www.tiktok.com/@" + S.tiktokHandle : "";
  var igUrl = S.instagramHandle ? "https://www.instagram.com/" + S.instagramHandle : "";

  // --- Hero video (first in the list) ---
  var hero = $("#heroVideo");
  if (V[0]) {
    hero.src = "videos/" + V[0].file;
    if (V[0].cover) hero.poster = "videos/" + V[0].cover;
  }
  var heroBtn = $("#heroSound");
  heroBtn.addEventListener("click", function () {
    hero.muted = !hero.muted;
    if (!hero.muted) hero.play();
    heroBtn.textContent = hero.muted ? "🔇 Tap for sound" : "🔊 Sound on";
    heroBtn.setAttribute("aria-label", hero.muted ? "Turn sound on" : "Turn sound off");
  });

  // --- Gallery ---
  var gallery = $("#gallery");
  var vids = [];
  V.forEach(function (v) {
    var fig = document.createElement("figure");
    fig.className = "clip";
    fig.innerHTML =
      '<div class="clip-frame" role="button" tabindex="0" aria-label="Play ' + esc(v.title) + ' with sound">' +
        '<video muted loop playsinline preload="none"' + (v.cover ? ' poster="videos/' + esc(v.cover) + '"' : "") +
        ' src="videos/' + esc(v.file) + '"></video>' +
        '<span class="clip-sound">🔇</span>' +
      "</div>" +
      "<figcaption>" + (v.tag ? "<span>" + esc(v.tag) + "</span>" : "") + esc(v.title || "") + "</figcaption>";
    var frame = fig.querySelector(".clip-frame");
    var video = fig.querySelector("video");
    var badge = fig.querySelector(".clip-sound");
    var toggle = function () {
      var turnOn = video.muted;
      vids.forEach(function (o) { o.v.muted = true; o.b.textContent = "🔇"; });
      hero.muted = true; heroBtn.textContent = "🔇 Tap for sound";
      video.muted = !turnOn;
      badge.textContent = turnOn ? "🔊" : "🔇";
      if (turnOn) { video.currentTime = 0; video.play(); }
    };
    frame.addEventListener("click", toggle);
    frame.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    vids.push({ v: video, b: badge });
    gallery.appendChild(fig);
  });
  // "More coming" tile
  var soon = document.createElement("figure");
  soon.className = "clip clip-soon";
  soon.innerHTML = '<div class="clip-frame"><p>Your story could be next ✨</p></div><figcaption>&nbsp;</figcaption>';
  gallery.appendChild(soon);

  // Autoplay (muted) only while visible — saves data on phones
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var vid = en.target;
        if (en.isIntersecting) { vid.play().catch(function () {}); } else { vid.pause(); }
      });
    }, { threshold: 0.5 });
    vids.forEach(function (o) { io.observe(o.v); });
    io.observe(hero);
  }

  // --- Order form ---
  var box = $("#orderBox");
  var chosenPackage = "";
  function tallyEmbed(url) {
    // Accepts https://tally.so/r/ID or https://tally.so/embed/ID
    var m = url.match(/tally\.so\/(?:r|embed)\/([A-Za-z0-9]+)/);
    if (!m) return url;
    var q = "alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
    if (chosenPackage) q += "&package=" + encodeURIComponent(chosenPackage);
    return "https://tally.so/embed/" + m[1] + "?" + q;
  }
  function renderForm() {
    if (S.formUrl) {
      box.innerHTML = '<iframe title="Order form" loading="lazy" src="' + esc(tallyEmbed(S.formUrl)) + '"></iframe>';
      if (!window.Tally && /tally\.so/.test(S.formUrl)) {
        var sc = document.createElement("script");
        sc.src = "https://tally.so/widgets/embed.js"; sc.async = true;
        sc.onload = function () { window.Tally && window.Tally.loadEmbeds(); };
        document.body.appendChild(sc);
      } else if (window.Tally) { window.Tally.loadEmbeds(); }
    } else {
      var dm = tiktokUrl
        ? '<a class="btn" href="' + esc(tiktokUrl) + '" target="_blank" rel="noopener">Message us on TikTok</a>'
        : "";
      box.innerHTML =
        '<div class="order-fallback">' +
          (isLocal() ? '<p class="setup-note">Setup note (only you see this on your computer): add your Tally form link in <b>config.js → formUrl</b> and the form appears here.</p>' : "") +
          "<h3>Send us your story</h3>" +
          "<p>Message us with:</p>" +
          "<ol><li>Your name and how to reach you</li><li>Personal story or brand ad</li><li>What happened — the story in a few lines</li><li>Photos or descriptions of the people</li><li>Your deadline</li></ol>" +
          dm +
        "</div>";
    }
  }
  renderForm();
  $$("[data-package]").forEach(function (a) {
    a.addEventListener("click", function () {
      chosenPackage = a.getAttribute("data-package");
      if (S.formUrl) renderForm();
    });
  });

  // --- Payment ---
  if (S.paymentUrl) {
    $("#payLink").href = S.paymentUrl;
    $("#payBox").hidden = false;
  }

  // --- Contact ---
  var links = [];
  if (tiktokUrl) links.push(["🎵", "TikTok @" + S.tiktokHandle, tiktokUrl]);
  if (igUrl) links.push(["📸", "Instagram @" + S.instagramHandle, igUrl]);
  if (S.email) links.push(["✉️", S.email, "mailto:" + S.email]);
  $("#contactLinks").innerHTML = links.map(function (l) {
    return '<a href="' + esc(l[2]) + '"' + (l[2].indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" +
      '<span aria-hidden="true">' + l[0] + "</span>" + esc(l[1]) + "</a>";
  }).join("");

  // --- Sticky button: hide when the order form or footer is on screen ---
  var sticky = $("#stickyCta");
  if ("IntersectionObserver" in window) {
    var hideFor = new Set();
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.isIntersecting ? hideFor.add(en.target) : hideFor.delete(en.target); });
      sticky.classList.toggle("hide", hideFor.size > 0);
    }, { threshold: 0.05 });
    so.observe($("#order"));
    so.observe($(".hero-ctas"));
  }

  function isLocal() { return location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
})();
/* Hide the contact section when no contact is set yet */
(function () { var c = document.getElementById("contactLinks"); if (c && !c.children.length) document.getElementById("contact").hidden = true; })();
