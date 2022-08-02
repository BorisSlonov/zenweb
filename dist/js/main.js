/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/footer/footer.js ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/***/ (() => {

//burger
window.addEventListener("DOMContentLoaded", function () {
  var menu = document.querySelector(".header__list"),
      menuItem = document.querySelectorAll(".header__link"),
      hamburger = document.querySelector(".header__burger"),
      overflowHidden = document.querySelector("body");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("burger_active");
    menu.classList.toggle("menu_active");
    overflowHidden.classList.toggle("overflow-hidden-y");
  });
  menuItem.forEach(function (item) {
    item.addEventListener("click", function () {
      hamburger.classList.toggle("burger_active");
      menu.classList.toggle("menu_active");
      overflowHidden.classList.toggle("overflow-hidden-y");
    });
  });
}); //Hidden header

var header = document.querySelector(".header");
var scrollPrev = 0;
window.addEventListener("scroll", function () {
  var scrolled = window.pageYOffset;

  if (scrolled > 100 && scrolled > scrollPrev) {
    header.classList.add("out");
  } else {
    header.classList.remove("out");
  }

  scrollPrev = scrolled;
});

/***/ }),

/***/ "./src/blocks/modules/page1/page1.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/page1/page1.js ***!
  \*******************************************/
/***/ (() => {

var mousePos = {
  x: .5,
  y: .5
};
document.addEventListener('mousemove', function (event) {
  mousePos = {
    x: event.clientX / window.innerWidth,
    y: event.clientY / window.innerHeight
  };
});
var phase = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var boxSize = 0.2;
var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
var materialGreen = new THREE.MeshBasicMaterial({
  transparent: true,
  color: 0xff0000,
  opacity: 0.4,
  side: THREE.DoubleSide
});
var pitchSegments = 60;
var elevationSegments = pitchSegments / 2;
var particles = pitchSegments * elevationSegments;
var side = Math.pow(particles, 1 / 3);
var radius = 16;
var parentContainer = new THREE.Object3D();
scene.add(parentContainer);

function posInBox(place) {
  return (place / side - 0.5) * radius * 1.2;
} //Plant the seeds, grow some trees in a grid!


for (var p = 0; p < pitchSegments; p++) {
  var pitch = Math.PI * 2 * p / pitchSegments;

  for (var e = 0; e < elevationSegments; e++) {
    var elevation = Math.PI * (e / elevationSegments - 0.5);
    var particle = new THREE.Mesh(geometry, materialGreen);
    parentContainer.add(particle);
    var dest = new THREE.Vector3();
    dest.z = Math.sin(pitch) * Math.cos(elevation) * radius; //z pos in sphere

    dest.x = Math.cos(pitch) * Math.cos(elevation) * radius; //x pos in sphere

    dest.y = Math.sin(elevation) * radius; //y pos in sphere

    particle.position.x = posInBox(parentContainer.children.length % side);
    particle.position.y = posInBox(Math.floor(parentContainer.children.length / side) % side);
    particle.position.z = posInBox(Math.floor(parentContainer.children.length / Math.pow(side, 2)) % side);
    console.log(side, parentContainer.children.length, particle.position.x, particle.position.y, particle.position.z);
    particle.userData = {
      dests: [dest, particle.position.clone()],
      speed: new THREE.Vector3()
    };
  }
}

function render() {
  phase += 0.002;

  for (var i = 0, l = parentContainer.children.length; i < l; i++) {
    var particle = parentContainer.children[i];
    var dest = particle.userData.dests[Math.floor(phase) % particle.userData.dests.length].clone();
    var diff = dest.sub(particle.position);
    particle.userData.speed.divideScalar(1.02); // Some drag on the speed

    particle.userData.speed.add(diff.divideScalar(400)); // Modify speed by a fraction of the distance to the dest    

    particle.position.add(particle.userData.speed);
    particle.lookAt(dest);
  }

  parentContainer.rotation.y = phase * 3;
  parentContainer.rotation.x = (mousePos.y - 0.5) * Math.PI;
  parentContainer.rotation.z = (mousePos.x - 0.5) * Math.PI;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

/***/ }),

/***/ "./src/js/import/components.js":
/*!*************************************!*\
  !*** ./src/js/import/components.js ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_page1_page1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/page1/page1 */ "./src/blocks/modules/page1/page1.js");
/* harmony import */ var _modules_page1_page1__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_page1_page1__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_2__);




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/components */ "./src/js/import/components.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_components__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=main.js.map