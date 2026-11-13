document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =================================
  // Hide preloader (Safe & Smooth Transition)
  // =================================
  var preloader = document.querySelector(".preloader");
  if (preloader) {
    setTimeout(function () {
      preloader.style.transition = "opacity 0.4s ease, visibility 0.4s ease";
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 400);
    }, 700);
  }

  // =================================
  // Singleton Tooltip System (Hover Only, Strictly One Tooltip At A Time)
  // =================================
  try {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    // Instantly hide and clear any tooltip except the currently active element
    function dismissAllTooltips(exceptEl) {
      tooltipTriggerList.forEach(function (el) {
        if (el !== exceptEl) {
          const inst = bootstrap.Tooltip.getInstance(el);
          if (inst) {
            inst.hide();
          }
        }
      });

      // Strict DOM safeguard: hide and remove any other .tooltip elements immediately
      const keepId = exceptEl ? exceptEl.getAttribute("aria-describedby") : null;
      document.querySelectorAll(".tooltip").forEach(function (tip) {
        if (!keepId || tip.getAttribute("id") !== keepId) {
          tip.classList.remove("show");
          tip.style.display = "none";
        }
      });
    }

    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      const tooltipInstance = new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
        container: "body",
        animation: true,
        delay: { show: 120, hide: 0 },
      });

      // When hover enters, immediately dismiss any other tooltip
      tooltipTriggerEl.addEventListener("mouseenter", function () {
        dismissAllTooltips(this);
        if (tooltipInstance.tip) {
          tooltipInstance.tip.style.display = "";
        }
      });

      // When mouse leaves, hide this tooltip immediately
      tooltipTriggerEl.addEventListener("mouseleave", function () {
        tooltipInstance.hide();
        dismissAllTooltips(null);
      });

      // Force instant hide on click
      tooltipTriggerEl.addEventListener("click", function () {
        tooltipInstance.hide();
        dismissAllTooltips(null);
      });

      // Force hide on blur / loss of focus
      tooltipTriggerEl.addEventListener("blur", function () {
        tooltipInstance.hide();
        dismissAllTooltips(null);
      });
    });

    // Enforce singleton when Bootstrap triggers show
    document.addEventListener("show.bs.tooltip", function (e) {
      dismissAllTooltips(e.target);
      const activeInst = bootstrap.Tooltip.getInstance(e.target);
      if (activeInst && activeInst.tip) {
        activeInst.tip.style.display = "";
      }
    });

    // Cleanup when tooltip hidden
    document.addEventListener("hidden.bs.tooltip", function () {
      document.querySelectorAll(".tooltip:not(.show)").forEach(function (tip) {
        if (tip.style.display === "none" && tip.parentNode) {
          tip.remove();
        }
      });
    });

    // When mouse leaves the entire sidebar navigation panel, purge all tooltips
    const miniPanel = document.querySelector(".side-mini-panel");
    if (miniPanel) {
      miniPanel.addEventListener("mouseleave", function () {
        dismissAllTooltips(null);
      });
    }

    // Dismiss any active tooltip when user clicks anywhere on page
    document.addEventListener("click", function () {
      dismissAllTooltips(null);
    });

    // Auto-dismiss on window scroll
    window.addEventListener("scroll", function () {
      dismissAllTooltips(null);
    }, { passive: true });
  } catch (err) {
    console.warn("Tooltip init notice:", err);
  }

  // =================================
  // Popover
  // =================================
  try {
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    popoverTriggerList.forEach(function (popoverTriggerEl) {
      new bootstrap.Popover(popoverTriggerEl);
    });
  } catch (err) {
    console.warn("Popover init notice:", err);
  }

  // =================================
  // Increment & Decrement
  // =================================
  var quantityButtons = document.querySelectorAll(".minus, .add");
  if (quantityButtons) {
    quantityButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var qtyInput = this.closest("div").querySelector(".qty");
        var currentVal = parseInt(qtyInput.value);
        var isAdd = this.classList.contains("add");

        if (!isNaN(currentVal)) {
          qtyInput.value = isAdd
            ? ++currentVal
            : currentVal > 0
              ? --currentVal
              : currentVal;
        }
      });
    });
  }
});
