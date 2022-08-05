const checkAccordion = document.querySelector(".accordion");

if (checkAccordion) {
  const btns = document.querySelectorAll(".accordion__title");
  const accActive = document.querySelectorAll(".accordion__title");
  const accTxt = document.querySelectorAll(".accordion__txt");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!this.classList.contains("acc-active")) {
        // btns.forEach((btn) => {
        //   btn.classList.remove("acc-active");
        // });
        this.classList.add("acc-active");
      } else {
        this.classList.remove("acc-active");
      }
    });
  });
}

// let btns = document.querySelectorAll(".accordion__title");
// btns.forEach(function (btn) {
//   btn.addEventListener("click", function () {
//     if (!this.classList.contains("acc-active")) {
//       this.classList.add("acc-active");
//       openHeight;
//     } else {
//       this.classList.remove("acc-active");
//       closeHeight;
//     }
//   });
// });
