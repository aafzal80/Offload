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

  /* ---- Contact form handling ---- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (form) {
    var setNote = function (msg, type) {
      if (!note) return;
      note.textContent = msg;
      note.className = "form-status" + (type ? " " + type : "");
    };

    var isValidEmail = function (val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    };

    form.addEventListener("submit", function (e) {
      // Basic client-side validation
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var firstInvalid = null;

      [name, email, message].forEach(function (field) {
        var bad = !field.value.trim() || (field === email && !isValidEmail(email.value.trim()));
        field.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        e.preventDefault();
        setNote("Please fill in your name, a valid email, and a short message.", "error");
        firstInvalid.focus();
        return;
      }

      // If the form still points at the placeholder, don't submit — guide the owner.
      if (form.getAttribute("action").indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        setNote("Form not connected yet — see README.md to link Formspree (2 minutes).", "error");
        return;
      }

      // Submit to Formspree via fetch so the visitor stays on the page.
      e.preventDefault();
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
            setNote("Thanks — your request is in. We'll reply within one business day.", "success");
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
  }
})();
