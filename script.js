/* ============================================================
   Offload — landing page interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close the menu when a link is tapped
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Scroll reveal animations ---- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Lead form handling (Formspree AJAX, keeps visitor on the page) ---- */
  var isValidEmail = function (val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  document.querySelectorAll(".lead-form").forEach(function (form) {
    var note = form.querySelector(".form-status");

    var setNote = function (msg, type) {
      if (!note) return;
      note.textContent = msg;
      note.className = "form-status" + (type ? " " + type : "");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate: name + a valid email are required, message is optional.
      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var firstInvalid = null;

      [name, email].forEach(function (field) {
        if (!field) return;
        var bad = !field.value.trim() || (field === email && !isValidEmail(email.value.trim()));
        field.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setNote("Please add your name and a valid email.", "error");
        firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setNote("", "");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            setNote("Got it. You'll hear back within one business day.", "success");
          } else {
            return response.json().then(function (data) {
              var msg = (data && data.errors) ? data.errors.map(function (er) { return er.message; }).join(", ")
                                              : "Something went wrong. Please email ahmad@hireoffload.com.";
              setNote(msg, "error");
            });
          }
        })
        .catch(function () {
          setNote("Network error. Please email ahmad@hireoffload.com or call (919) 205-8628.", "error");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        });
    });
  });
})();
