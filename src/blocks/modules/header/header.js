import ScrollOut from "scroll-out";
import Splitting from "Splitting";

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
//smooth scroll
const anchors = document.querySelectorAll(".header__link");
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
//Hidden header
let header = document.querySelector(".header");
let scrollPrev = 0;
window.addEventListener("scroll", function () {
  let scrolled = window.pageYOffset;
  let canvas = document.querySelector("canvas");
  if (scrolled > 100 && scrolled > scrollPrev) {
    header.classList.add("out");
    header.style.backgroundColor = "#01012b";
  } else {
    header.classList.remove("out");
  }
  scrollPrev = scrolled;

  if (scrolled > Math.round(window.innerHeight)) {
    canvas.style.opacity = "0.5";
  } else {
    canvas.style.opacity = "1";
  }
});

window.onload = function () {
  Splitting();
  ScrollOut({
    targets: ".word",
    once: true,
  });

  document.querySelector(".body").classList.remove("scroll-block");
  document.querySelector("body").style.display = "flex";

  setTimeout(() => {
    document.querySelectorAll("h1 .word").forEach((i) => {
      i.setAttribute("data-scroll", "in");
    });
  }, 2400);
};
