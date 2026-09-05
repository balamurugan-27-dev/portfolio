(function () {
    "use strict";

    var form = document.getElementById("quote-form");
    if (!form) { return; }

    var successPanel = document.getElementById("quote-success");
    var resetBtn = document.getElementById("quote-reset");

    function fieldWrap(el) {
        return el.closest(".field") || el.closest(".service-type-field");
    } 

    function setError(id, hasError) {
        var errorEl = form.querySelector('[data-error-for="' + id + '"]');
        if (!errorEl) { return; }
        var wrap = errorEl.closest(".field") || errorEl.closest(".service-type-field");
        if (wrap) { wrap.classList.toggle("has-error", hasError); }
    }

    function validate() {
        var valid = true;

        ["q-name", "q-email", "q-message"].forEach(function (id) {
            var el = document.getElementById(id);
            var ok = el.value.trim() !== "" && el.checkValidity();
            setError(id, !ok);
            if (!ok) { valid = false; }
        });

        var typeChosen = !!form.querySelector('input[name="project-type"]:checked');
        setError("project-type", !typeChosen);
        if (!typeChosen) { valid = false; }

        return valid;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validate()) {
            var firstError = form.querySelector(".has-error input, .has-error textarea, .has-error .service-type-group");
            if (firstError) {
                var target = firstError.matches("input, textarea") ? firstError : firstError.querySelector("input");
                if (target) { target.focus(); }
            }
            return;
        }

        var name = document.getElementById("q-name").value.trim();
        var email = document.getElementById("q-email").value.trim();
        var phone = document.getElementById("q-phone").value.trim();
        var type = form.querySelector('input[name="project-type"]:checked').value;
        var budget = document.getElementById("q-budget").value;
        var timeline = document.getElementById("q-timeline").value;
        var message = document.getElementById("q-message").value.trim();

        var bodyLines = [
            "Name: " + name,
            "Email: " + email,
            phone ? "Phone: " + phone : null,
            "Project type: " + type,
            budget ? "Budget: " + budget : null,
            timeline ? "Timeline: " + timeline : null,
            "",
            "Project details:",
            message
        ].filter(function (line) { return line !== null; });

        var subject = "Project enquiry — " + type + " (" + name + ")";
        var mailto = "mailto:fueworks@gmail.com"
            + "?subject=" + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(bodyLines.join("\n"));

        window.location.href = mailto;

        form.hidden = true;
        successPanel.hidden = false;
        successPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            form.reset();
            form.querySelectorAll(".has-error").forEach(function (el) {
                el.classList.remove("has-error");
            });
            successPanel.hidden = true;
            form.hidden = false;
            form.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
})();
