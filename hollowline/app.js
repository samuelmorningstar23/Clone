/* HOLLOWLINE — homepage interactions */
(function () {
  "use strict";

  /* announcement rotator */
  var items = [].slice.call(document.querySelectorAll(".ann__item"));
  if (items.length > 1) {
    var i = 0;
    setInterval(function () {
      items[i].classList.remove("on");
      i = (i + 1) % items.length;
      items[i].classList.add("on");
    }, 3200);
  }

  /* mobile drawer */
  var drawer = document.querySelector("[data-drawer]");
  function open() { if (drawer) { drawer.hidden = false; document.body.style.overflow = "hidden"; } }
  function close() { if (drawer) { drawer.hidden = true; document.body.style.overflow = ""; } }
  document.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", open); });
  document.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", close); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  /* smooth scroll for in-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  /* cart (demo) */
  var count = 0;
  var badge = document.querySelector(".cart-count");
  document.querySelector("[data-cart]").addEventListener("click", function () {
    window.alert(count ? count + " item(s) in your bag." : "Your bag is empty.");
  });
  document.querySelector("[data-search]").addEventListener("click", function () {
    var q = window.prompt("Search HOLLOWLINE");
    if (q) window.alert('No results yet for "' + q + '" — the store opens with the debut drop.');
  });

  /* newsletter */
  var form = document.querySelector("[data-news]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector("input").value.trim();
      var msg = document.querySelector("[data-news-msg]");
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        msg.textContent = "You're on the list — welcome to Hollowline.";
        form.reset();
      } else {
        msg.textContent = "Please enter a valid email address.";
      }
    });
  }

  /* reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* sticky header shadow */
  var hdr = document.querySelector("[data-hdr]");
  window.addEventListener("scroll", function () {
    if (hdr) hdr.classList.toggle("scrolled", window.pageYOffset > 10);
  }, { passive: true });
})();
