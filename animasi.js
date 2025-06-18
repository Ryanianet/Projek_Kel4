document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar ul");
  if (!nav) return;

  const underline = document.createElement("div");
  underline.className = "underline";
  nav.appendChild(underline);

  const items = document.querySelectorAll(".navbar a");
  const active = document.querySelector(".navbar a.active");

  const moveUnderline = el => {
    const rect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
  };

  if (active) moveUnderline(active);

  items.forEach(item => {
    item.addEventListener("mouseenter", () => moveUnderline(item));
    item.addEventListener("mouseleave", () => active && moveUnderline(active));
  });
});
