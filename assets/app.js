/* Almost Gods — homepage replica interactions */
(function () {
  "use strict";

  /* ---- Announcement rotator ---- */
  var items = Array.prototype.slice.call(
    document.querySelectorAll(".announcement__item")
  );
  if (items.length > 1) {
    var idx = 0;
    setInterval(function () {
      items[idx].classList.remove("is-active");
      idx = (idx + 1) % items.length;
      items[idx].classList.add("is-active");
    }, 3200);
  }

  /* ---- Mobile drawer ---- */
  var drawer = document.querySelector("[data-drawer]");
  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.hidden = true;
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-drawer-open]").forEach(function (b) {
    b.addEventListener("click", openDrawer);
  });
  document.querySelectorAll("[data-drawer-close]").forEach(function (b) {
    b.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---- Search stub ---- */
  document.querySelectorAll("[data-search-open]").forEach(function (b) {
    b.addEventListener("click", function () {
      var q = window.prompt("Search Almost Gods");
      if (q) window.location.href = "/search?q=" + encodeURIComponent(q);
    });
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- Shrink header on scroll ---- */
  var header = document.querySelector("[data-header]");
  var last = 0;
  window.addEventListener(
    "scroll",
    function () {
      var y = window.pageYOffset;
      if (header) header.classList.toggle("is-scrolled", y > 10);
      last = y;
    },
    { passive: true }
  );
})();
