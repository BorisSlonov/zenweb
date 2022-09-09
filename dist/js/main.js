/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/accordion/accordion.js":
/*!***************************************************!*\
  !*** ./src/blocks/modules/accordion/accordion.js ***!
  \***************************************************/
/***/ (() => {

var checkAccordion = document.querySelector(".accordion");

if (checkAccordion) {
  var btns = document.querySelectorAll(".accordion__title");
  var accActive = document.querySelectorAll(".accordion__title");
  var accTxt = document.querySelectorAll(".accordion__txt");
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
} // let btns = document.querySelectorAll(".accordion__title");
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

/***/ }),

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scroll_out__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-out */ "./node_modules/scroll-out/lib/index.js");
/* harmony import */ var scroll_out__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_out__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Splitting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Splitting */ "./node_modules/Splitting/dist/splitting.js");
/* harmony import */ var Splitting__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(Splitting__WEBPACK_IMPORTED_MODULE_1__);

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
  var canvas = document.querySelector("canvas");

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
  location.href = "#";
  Splitting__WEBPACK_IMPORTED_MODULE_1___default()();
  scroll_out__WEBPACK_IMPORTED_MODULE_0___default()({
    targets: ".word",
    once: true
  });
  document.querySelector(".body").classList.remove("scroll-block");
  document.querySelector("body").style.display = "flex";
  setTimeout(function () {
    document.querySelectorAll("h1 .word").forEach(function (i) {
      i.setAttribute("data-scroll", "in");
    });
  }, 2400);
};

/***/ }),

/***/ "./src/blocks/modules/page1/page1.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/page1/page1.js ***!
  \*******************************************/
/***/ (() => {

var mousePos = {
  x: 0.5,
  y: 0.5
}; // document.addEventListener("mousemove", function (event) {
//   // mousePos = {
//   //   x: event.clientX / window.innerWidth,
//   //   y: event.clientY / window.innerHeight,
//   // };
// });

var phase = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 25;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var boxSize = 0.2;
var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
var materialGreen = new THREE.MeshBasicMaterial({
  transparent: true,
  color: 0xff2a6d,
  opacity: 0.35,
  side: THREE.DoubleSide
});
var pitchSegments = 60;
var elevationSegments = pitchSegments / 2;
var particles = pitchSegments * elevationSegments;
var side = Math.pow(particles, 1 / 3);
var radius = 18;
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
    particle.userData = {
      dests: [dest, particle.position.clone()],
      speed: new THREE.Vector3()
    };
  }
}

function render() {
  phase += 0.0001;

  for (var i = 0, l = parentContainer.children.length; i < l; i++) {
    var _particle = parentContainer.children[i];

    var _dest = _particle.userData.dests[Math.floor(phase) % _particle.userData.dests.length].clone();

    var diff = _dest.sub(_particle.position);

    _particle.userData.speed.divideScalar(1.025); // Some drag on the speed


    _particle.userData.speed.add(diff.divideScalar(1300)); // Modify speed by a fraction of the distance to the dest


    _particle.position.add(_particle.userData.speed);

    _particle.lookAt(_dest);
  }

  parentContainer.rotation.y = phase * 3;
  parentContainer.rotation.x = (mousePos.y - 0.5) * Math.PI;
  parentContainer.rotation.z = (mousePos.x - 0.5) * Math.PI;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

/***/ }),

/***/ "./src/blocks/modules/popups/popups.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/popups/popups.js ***!
  \*********************************************/
/***/ (() => {

function modalContent(trigger, item) {
  var btn = document.querySelectorAll(trigger),
      pop = document.querySelector(item),
      close = document.querySelectorAll('.popup-close'),
      closeBack = document.querySelectorAll('.popup'),
      activeClass = 'show',
      hideClass = 'hide';

  function showContent() {
    pop.classList.add(activeClass);
    pop.classList.remove(hideClass);
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('resize'));
  }

  function hideContent() {
    pop.classList.remove(activeClass);
    pop.classList.add(hideClass);
    document.body.style.overflow = '';
  }

  function showHideContent(trigger, func) {
    trigger.forEach(function (item) {
      item.addEventListener('click', function (e) {
        if (e.target && e.target.className === item.className) {
          e.preventDefault();
          func();
        }
      });
    });
  }

  showHideContent(btn, showContent);
  showHideContent(close, hideContent);
  showHideContent(closeBack, hideContent);

  function hideScroll() {
    var div = document.createElement('div');
    document.body.append(div);
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    var result = div.offsetWidth - div.clientWidth;
    return result;
  }
}

modalContent('.popup-btn', '.popup_main-popup');

/***/ }),

/***/ "./src/blocks/modules/tabs/tabs.js":
/*!*****************************************!*\
  !*** ./src/blocks/modules/tabs/tabs.js ***!
  \*****************************************/
/***/ (() => {

var tabs = function tabs(headerSelector, tabSelector, contentSelector, activeClass) {
  var header = document.querySelector(headerSelector),
      tab = document.querySelectorAll(tabSelector),
      content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(function (item) {
      item.style.display = "none";
    });
    tab.forEach(function (item) {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    content[i].style.display = "block";
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  header.addEventListener("click", function (e) {
    var target = e.target;

    if (target && (target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
      tab.forEach(function (item, i) {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

var servicesTabs = document.querySelector(".services-tabs");

if (servicesTabs) {
  tabs(".services-tabs__titles", ".services-tabs__title", ".services-tabs__item", "services-tabs__title_active");
}

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
/* harmony import */ var _modules_page1_page1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/page1/page1 */ "./src/blocks/modules/page1/page1.js");
/* harmony import */ var _modules_page1_page1__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_page1_page1__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/tabs/tabs */ "./src/blocks/modules/tabs/tabs.js");
/* harmony import */ var _modules_tabs_tabs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_popups_popups__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/popups/popups */ "./src/blocks/modules/popups/popups.js");
/* harmony import */ var _modules_popups_popups__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_popups_popups__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_accordion_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! %modules%/accordion/accordion */ "./src/blocks/modules/accordion/accordion.js");
/* harmony import */ var _modules_accordion_accordion__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_accordion_accordion__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_5__);







/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/components */ "./src/js/import/components.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_components__WEBPACK_IMPORTED_MODULE_1__);



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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgulp_scss_starter"] = self["webpackChunkgulp_scss_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/js/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map