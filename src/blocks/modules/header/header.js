//burger
window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".header__list"),
    menuItem = document.querySelectorAll(".header__link"),
    hamburger = document.querySelector(".header__burger"),
    overflowHidden = document.querySelector("body");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("burger_active");
    menu.classList.toggle("menu_active");
    overflowHidden.classList.toggle("overflow-hidden-y");
  });

  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("burger_active");
      menu.classList.toggle("menu_active");
      overflowHidden.classList.toggle("overflow-hidden-y");
    });
  });
});
//Hidden header
let header = document.querySelector(".header");
let scrollPrev = 0;
window.addEventListener("scroll", function () {
  let scrolled = window.pageYOffset;
  let canvas = document.querySelector("canvas");
  if (scrolled > 100 && scrolled > scrollPrev) {
    header.classList.add("out");
    header.style.backgroundColor = "#01012b";
    this.setTimeout(() => {
      canvas.style.transform = "scale(1.7)";
      canvas.style.transition = "12s";
    }),
      12000;
  } else {
    header.classList.remove("out");
    canvas.style.transform = "scale(2)";
    canvas.style.transition = "12s";
    this.setTimeout(() => {
      canvas.style.transform = "scale(2)";
      canvas.style.transition = "12s";
    }),
      12000;
  }
  scrollPrev = scrolled;
});
