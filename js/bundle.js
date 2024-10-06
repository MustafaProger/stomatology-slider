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
function slider({
  trackSelector,
  slideselector,
  buttonselector,
  dotsContainerelector,
  dotselector
}) {
  const track = document.querySelector(trackSelector);
  const slides = document.querySelectorAll(slideselector);
  const buttons = document.querySelectorAll(buttonselector);
  const dotsContainer = document.querySelector(dotsContainerelector);
  const dots = document.querySelectorAll(dotselector);
  let currentIndex = 0; // текущий индекс слайда

  const totalSlides = slides.length; // общее количество слайдов
  const totalDots = dots.length; // количество индикаторов

  const movingDot = document.createElement('div'); // создаем элемент для перемещения активной точки
  movingDot.id = 'active-dot';
  dotsContainer.appendChild(movingDot); // добавляем активную точку в контейнер с точками

  let startX = 0; // начальная позиция касания
  let isDragging = false; // состояние перетаскивания

  // Обрабатываем клик по индикаторам
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index; // устанавливаем текущий индекс на основе индикатора
      updateSliderPosition(); // обновляем позицию слайдера
      moveActiveDot(currentIndex); // перемещаем активную точку
    });
  });

  // Функция для обновления позиции слайдера
  function updateSliderPosition() {
    // Сбрасываем все классы с слайдов
    slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));

    // Определяем индексы предыдущего и следующего слайда
    const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;

    // Устанавливаем классы активного, предыдущего и следующего слайдов
    slides[currentIndex].classList.add('active');
    slides[prevIndex].classList.add('prev');
    slides[nextIndex].classList.add('next');
  }

  // Функция для перемещения активной точки индикатора
  function moveActiveDot(currentSlideIndex) {
    const activeDotIndex = currentSlideIndex % totalDots;
    const activeDotPosition = dots[activeDotIndex].offsetLeft; // позиция нужного индикатора
    movingDot.style.transform = `translateX(${activeDotPosition}px)`; // перемещаем активную точку

    // Обновляем стили индикаторов
    dots.forEach(dot => dot.classList.remove('active')); // сбрасываем активный класс у всех индикаторов
    dots[activeDotIndex].classList.add('active'); // добавляем активный класс текущему индикатору
  }

  // Функция для перехода к следующему слайду
  function gotoNext() {
    currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0; // увеличиваем индекс, иначе переходим к первому слайду
    updateSliderPosition();
    moveActiveDot(currentIndex);
  }

  // Функция для перехода к предыдущему слайду
  function gotoPrev() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1; // уменьшаем индекс, иначе переходим к последнему слайду
    updateSliderPosition();
    moveActiveDot(currentIndex);
  }

  // Добавляем обработчики для кнопок "Назад" и "Вперед"
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      index === 0 ? gotoPrev() : gotoNext(); // если индекс кнопки 0, переходим назад, иначе вперед
    });
  });

  // Обработчик нажатия клавиш
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      gotoPrev(); // Переход к предыдущему слайду
    } else if (event.key === 'ArrowRight') {
      gotoNext(); // Переход к следующему слайду
    }
  });

  // Обработчики для сенсорного ввода

  track.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX; // Сохраняем начальную позицию касания
    isDragging = true; // Устанавливаем флаг перетаскивания
  });
  track.addEventListener('touchmove', event => {
    if (!isDragging) return; // Если не перетаскиваем, выходим

    const currentX = event.touches[0].clientX; // Текущая позиция касания
    const diff = startX - currentX; // Разница между начальной и текущей позицией

    // Если движение больше 50 пикселей, переключаем слайды
    if (diff > 50) {
      gotoNext(); // Переключаем на следующий слайд
      isDragging = false; // Сбрасываем флаг перетаскивания
    } else if (diff < -50) {
      gotoPrev(); // Переключаем на предыдущий слайд
      isDragging = false; // Сбрасываем флаг перетаскивания
    }
  });
  track.addEventListener('touchend', () => {
    isDragging = false; // Сбрасываем флаг перетаскивания при завершении касания
  });

  // Инициализируем слайдер
  updateSliderPosition();
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
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_0__["default"])({
    trackSelector: '.about__blocks',
    slideselector: '.about__block',
    buttonselector: '.button',
    dotsContainerelector: '.dots-container',
    dotselector: '.dot'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map