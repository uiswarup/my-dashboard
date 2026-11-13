var at = document.documentElement.getAttribute("data-layout");
if ((at = "vertical")) {
  // ==============================================================
  // Auto select left navbar
  // ==============================================================

  document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var isSidebar = document.getElementsByClassName("side-mini-panel");
    if (isSidebar.length > 0) {
      var url = window.location + "";
      var path = url.replace(
        window.location.protocol + "//" + window.location.host + "/",
        ""
      );

      //****************************
      // This is for
      //****************************

      function findMatchingElement() {
        var currentUrl = window.location.href.split("?")[0].split("#")[0];
        var currentPage = currentUrl.substring(currentUrl.lastIndexOf("/") + 1).toLowerCase();
        if (!currentPage || currentPage === "" || currentPage === "index.html" || currentPage === "dashboard.html") {
          currentPage = "index.html";
        }

        var anchors = document.querySelectorAll(".sidebarmenu .sidebar-link");

        // 1. Exact match by file name in href attribute
        for (var i = 0; i < anchors.length; i++) {
          var href = (anchors[i].getAttribute("href") || "").split("?")[0].split("#")[0].toLowerCase();
          if (href === currentPage || (currentPage === "index.html" && href === "dashboard.html")) {
            return anchors[i];
          }
        }

        // 2. Exact match by full URL
        for (var i = 0; i < anchors.length; i++) {
          var cleanHref = anchors[i].href.split("?")[0].split("#")[0].toLowerCase();
          if (cleanHref === currentUrl.toLowerCase()) {
            return anchors[i];
          }
        }

        return null;
      }

      var elements = findMatchingElement();

      if (elements) {
        // Strictly remove active from all sidebar links first so only 1 link is active!
        document.querySelectorAll(".sidebarmenu .sidebar-link").forEach(function (l) {
          l.classList.remove("active");
        });
        elements.classList.add("active");
      }

      //****************************
      // This is for all submenu link clicking & active state toggling
      //****************************
      document.querySelectorAll(".sidebarmenu .sidebar-link").forEach(function (link) {
        link.addEventListener("click", function (e) {
          const isActive = this.classList.contains("active");

          if (!isActive) {
            // Remove active from all sidebar links across all submenus
            document.querySelectorAll(".sidebarmenu .sidebar-link").forEach(function (navLink) {
              navLink.classList.remove("active");
            });

            // If it has a collapsible child submenu, expand it
            const submenu = this.nextElementSibling;
            if (submenu && submenu.tagName === "UL") {
              submenu.classList.add("in");
            }

            this.classList.add("active");
          } else {
            if (this.classList.contains("has-arrow")) {
              this.classList.remove("active");
              const submenu = this.nextElementSibling;
              if (submenu) {
                submenu.classList.remove("in");
              }
            }
          }
        });
      });

      document
        .querySelectorAll("#sidebarnav > li > a.has-arrow")
        .forEach(function (link) {
          link.addEventListener("click", function (e) {
            e.preventDefault();
          });
        });

      //****************************
      // This is for show menu
      //****************************

      var closestNav = elements?.closest("nav[class^=sidebar-nav]");
      var menuid = (closestNav && closestNav.id) || "menu-right-mini-1";
      var menu = menuid[menuid.length - 1];

      var navTarget = document.getElementById("menu-right-mini-" + menu);
      if (navTarget) navTarget.classList.add("d-block");
      var miniTarget = document.getElementById("mini-" + menu);
      if (miniTarget) miniTarget.classList.add("selected");

      //****************************
      // This is for mini sidebar
      //****************************
      document
        .querySelectorAll("ul#sidebarnav ul li a.active")
        .forEach(function (link) {
          link.closest("ul").classList.add("in");
          link.closest("ul").parentElement.classList.add("selected");
        });
      document
        .querySelectorAll(".mini-nav .mini-nav-item")
        .forEach(function (item) {
          item.addEventListener("click", function () {
            // Instantly clear any active tooltips on click
            document.querySelectorAll(".tooltip").forEach(function (tp) {
              tp.remove();
            });

            var id = this.id;
            document
              .querySelectorAll(".mini-nav .mini-nav-item")
              .forEach(function (navItem) {
                navItem.classList.remove("selected");
              });
            this.classList.add("selected");
            document
              .querySelectorAll(".sidebarmenu nav")
              .forEach(function (nav) {
                nav.classList.remove("d-block");
              });
            var targetNav = document.getElementById("menu-right-" + id);
            if (targetNav) {
              targetNav.classList.add("d-block");
            }
            document.body.setAttribute("data-sidebartype", "full");
          });
        });
    }
  });
}

if ((at = "horizontal")) {
  function findMatchingElement() {
    var currentUrl = window.location.href;
    var anchors = document.querySelectorAll("#sidebarnavh ul#sidebarnav a");
    for (var i = 0; i < anchors.length; i++) {
      if (anchors[i].href === currentUrl) {
        return anchors[i];
      }
    }

    return null; // Return null if no matching element is found
  }
  var elements = findMatchingElement();

  if (elements) {
    elements.classList.add("active");
  }
  document
    .querySelectorAll("#sidebarnavh ul#sidebarnav a.active")
    .forEach(function (link) {
      link.closest("a").parentElement.classList.add("selected");
      link.closest("ul").parentElement.classList.add("selected");
    });
}

// Legacy template get-url handler removed to prevent href collision
