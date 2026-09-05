(function () {
    "use strict";

    /* ---------- Mobile navigation ---------- */
    var header = document.getElementById("header");
    var navBtn = document.getElementById("navbtn");
    var nav = document.getElementById("nav");

    if (navBtn && header) {
        navBtn.addEventListener("click", function () {
            var isOpen = header.classList.toggle("nav-open");
            navBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                header.classList.remove("nav-open");
                navBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    /* ---------- Scroll reveal ---------- */
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- Workflow timeline: line draws in as it enters view ---------- */
    var timelinePath = document.getElementById("timeline-path");
    var timeline = document.getElementById("timeline");

    if (timelinePath && timeline && !reduceMotion && "IntersectionObserver" in window) {
        var length = 1000;
        timelinePath.style.strokeDasharray=length;
        timelinePath.style.strokeDashoffset = length;
        timelinePath.style.transition = "stroke-dashoffset 1.4s ease";

        var lineObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        timelinePath.style.strokeDashoffset = 0;
                        lineObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        lineObserver.observe(timeline);
    } else if (timelinePath) {
        timelinePath.style.strokeDashoffset = 0;
    }
})();
