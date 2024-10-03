/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider(prev, next, slideWrapper, slide) {
  const prevBtn = document.querySelector(prev);
  const nextBtn = document.querySelector(next);
  const track = document.querySelector(slideWrapper);
  const slides = document.querySelectorAll(slide);
  const totalSlides = slides.length;
  const slideWidth = slides[0].offsetWidth + 10;
  let currentIndex = 2;
  let isAnimating = false; // Флаг для блокировки нажатий

  moveSlide();
  updateActiveBlock();
  function updateSliderPosition() {
    moveSlide();
    updateActiveBlock();
  }
  document.addEventListener('keydown', e => {
    if (!isAnimating) {
      // Проверяем, идет ли анимация
      clickOnArrow(e.key);
    }
  });
  function clickOnArrow(key) {
    if (key === 'ArrowRight') {
      nextArrow();
    } else if (key === 'ArrowLeft') {
      prevArrow();
    }
  }
  function handleArrowClick(direction) {
    if (direction === 'next') {
      nextArrow();
    } else if (direction === 'prev') {
      prevArrow();
    }
  }
  nextBtn.addEventListener('click', () => handleArrowClick('next'));
  prevBtn.addEventListener('click', () => handleArrowClick('prev'));
  function moveSlide() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  function updateActiveBlock() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
  }
  function disableButtons() {
    nextBtn.disabled = true;
    prevBtn.disabled = true;
  }
  function enableButtons() {
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }
  function nextArrow() {
    if (currentIndex >= totalSlides - 1 || isAnimating) return;
    disableButtons(); // Отключаем кнопки
    isAnimating = true; // Блокируем нажатия клавиш

    currentIndex++;
    updateSliderPosition();
    resetSlidesIfNeeded();
    setTimeout(() => {
      enableButtons(); // Включаем кнопки
      isAnimating = false; // Снова разрешаем нажатия клавиш
    }, 500); // Время завершения анимации
  }
  function prevArrow() {
    if (currentIndex <= 0 || isAnimating) return;
    disableButtons(); // Отключаем кнопки
    isAnimating = true; // Блокируем нажатия клавиш

    currentIndex--;
    updateSliderPosition();
    resetSlidesIfNeeded();
    setTimeout(() => {
      enableButtons(); // Включаем кнопки
      isAnimating = false; // Снова разрешаем нажатия клавиш
    }, 500); // Время завершения анимации
  }
  function resetSlidesIfNeeded() {
    if (currentIndex === totalSlides - 2 || currentIndex === 1) {
      setTimeout(() => {
        currentIndex = currentIndex === totalSlides - 2 ? 2 : 4;
        updateSliderPosition();
        track.style.transition = 'none';
        slides[currentIndex].style.transition = 'none';
        console.log('setTimeout 500');
      }, 450);
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        slides.forEach(slide => slide.style.transition = 'all 0.5s ease-in-out');
        console.log('setTimeout 610');
      }, 500);
    }
  }
}

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_0__["default"])('.prev', '.next', '.slider-track', '.about__block');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map