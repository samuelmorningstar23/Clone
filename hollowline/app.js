/* HOLLOWLINE — homepage interactions */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- meteor shower in the top bar ---------------- */
  (function meteorSky() {
    var canvas = document.querySelector("[data-sky]");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var stars = [], meteors = [];

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // static faint starfield, density by width
      stars = [];
      var n = Math.round(W / 22);
      for (var i = 0; i < n; i++) {
        stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + 0.2, a: Math.random() * 0.5 + 0.2, t: Math.random() * Math.PI * 2 });
      }
    }

    function spawn() {
      // a meteor: streak travelling down-right, born just above/left of the bar
      var speed = 3.4 + Math.random() * 3.2;
      var ang = (18 + Math.random() * 12) * Math.PI / 180; // shallow diagonal
      meteors.push({
        x: Math.random() * W * 0.9 - W * 0.1,
        y: -H * (0.2 + Math.random() * 0.5),
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed * 3.0,
        len: 60 + Math.random() * 90,
        life: 0,
        max: 60 + Math.random() * 40,
        w: Math.random() * 1 + 0.6
      });
    }

    var last = 0, acc = 0;
    function frame(ts) {
      var dt = ts - last; last = ts; acc += dt;
      ctx.clearRect(0, 0, W, H);

      // twinkling stars
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.t += 0.03;
        var tw = s.a * (0.6 + 0.4 * Math.sin(s.t));
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + tw.toFixed(3) + ")";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // spawn meteors on a cadence
      if (acc > 620 && meteors.length < 6) { acc = 0; spawn(); if (Math.random() > 0.6) spawn(); }

      // draw + update meteors
      for (var j = meteors.length - 1; j >= 0; j--) {
        var m = meteors[j];
        m.life++;
        m.x += m.vx; m.y += m.vy;
        var fade = 1 - m.life / m.max;
        if (fade <= 0 || m.y > H + 40) { meteors.splice(j, 1); continue; }
        var tailX = m.x - m.vx / Math.hypot(m.vx, m.vy) * m.len;
        var tailY = m.y - m.vy / Math.hypot(m.vx, m.vy) * m.len;
        var grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, "rgba(255,255,255," + (0.9 * fade).toFixed(3) + ")");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.w;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        // bright head
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + fade.toFixed(3) + ")";
        ctx.arc(m.x, m.y, m.w * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    var raf;
    resize();
    window.addEventListener("resize", resize);
    if (!reduce) raf = requestAnimationFrame(frame);
    else {
      // static: draw stars once
      for (var i = 0; i < stars.length; i++) { var s = stars[i]; ctx.beginPath(); ctx.fillStyle = "rgba(255,255,255," + s.a + ")"; ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); }
    }
  })();

  /* ---------------- announcement rotator ---------------- */
  var items = [].slice.call(document.querySelectorAll(".ann__item"));
  if (items.length > 1) {
    var i = 0;
    setInterval(function () {
      items[i].classList.remove("on");
      i = (i + 1) % items.length;
      items[i].classList.add("on");
    }, 3200);
  }

  /* ---------------- mobile drawer ---------------- */
  var drawer = document.querySelector("[data-drawer]");
  function open() { if (drawer) { drawer.hidden = false; document.body.style.overflow = "hidden"; } }
  function close() { if (drawer) { drawer.hidden = true; document.body.style.overflow = ""; } }
  document.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", open); });
  document.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", close); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  /* ---------------- smooth scroll ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  /* ---------------- cart + search stubs ---------------- */
  var count = 0;
  document.querySelector("[data-cart]").addEventListener("click", function () {
    window.alert(count ? count + " item(s) in your bag." : "Your bag is empty.");
  });
  document.querySelector("[data-search]").addEventListener("click", function () {
    var q = window.prompt("Search HOLLOWLINE");
    if (q) window.alert('No results yet for "' + q + '" — the store opens with the debut drop.');
  });

  /* ---------------- newsletter ---------------- */
  var form = document.querySelector("[data-news]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector("input").value.trim();
      var msg = document.querySelector("[data-news-msg]");
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = "You're on the list — welcome to Hollowline."; form.reset(); }
      else { msg.textContent = "Please enter a valid email address."; }
    });
  }

  /* ---------------- card videos: iOS autoplay + pause off-screen ---------------- */
  var vids = document.querySelectorAll("video.card__img");
  vids.forEach(function (v) {
    v.muted = true; // required for autoplay on iOS even with the attribute
    var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    tryPlay();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) tryPlay(); else v.pause();
        });
      }, { threshold: 0.1 }).observe(v);
    }
  });

  /* ---------------- reveal on scroll ---------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add("in"); }); }
})();
