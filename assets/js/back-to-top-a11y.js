// Accessibility for the vanilla-back-to-top button, which renders as an unlabeled <div>.
(function () {
  var button = document.getElementById("back-to-top");
  if (!button) return;

  var label = "Scroll back to top";
  button.setAttribute("role", "button");
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);

  var icon = button.querySelector("svg");
  if (icon) {
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
  }

  // Activate with Enter or Space, like a native button.
  button.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }
  });

  // Only reachable by keyboard / screen readers while it is visible on screen.
  function syncVisibility() {
    var hidden = button.classList.contains("hidden");
    button.setAttribute("tabindex", hidden ? "-1" : "0");
    button.setAttribute("aria-hidden", hidden ? "true" : "false");
  }
  syncVisibility();
  new MutationObserver(syncVisibility).observe(button, { attributes: true, attributeFilter: ["class"] });
})();
