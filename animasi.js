document.addEventListener("DOMContentLoaded", () => {
  // === Underline Navigation Effect ===
  const nav = document.querySelector(".navbar ul");
  if (nav) {
    const underline = document.createElement("div");
    underline.classList.add("underline");
    nav.appendChild(underline);

    const menuItems = document.querySelectorAll(".navbar a");
    const activeItem = document.querySelector(".navbar a.active");

    function moveUnderline(el) {
      const rect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      underline.style.width = rect.width + "px";
      underline.style.left = (rect.left - navRect.left) + "px";
    }

    if (activeItem) {
      moveUnderline(activeItem);
    }

    menuItems.forEach(item => {
      item.addEventListener("mouseenter", () => {
        moveUnderline(item);
      });
      item.addEventListener("mouseleave", () => {
        if (activeItem) moveUnderline(activeItem);
      });
    });
  }});