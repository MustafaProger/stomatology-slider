export default function slider(prev, next, slideWrapper, slide) {
    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);
    const track = document.querySelector(slideWrapper);
    const slides = document.querySelectorAll(slide);
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 10;
    const carousel_dots = document.querySelector('.carousel-dots__content');
    const blocksHaveDot = document.querySelectorAll('.about__block-dot');

    let currentIndex = 2;
    let isAnimating = false; // Флаг для блокировки нажатий
    let currentRight = null; // Глобальная переменная для текущего элемента с классом 'right'
    let currentLeft = null;  // Глобальная переменная для текущего элемента с классом 'left'

    function updateSliderPosition() {
        moveSlide();
        updateActiveBlock();
        setTimeout(handleRightClick, 500);
    }

    updateSliderPosition();

    document.addEventListener('keydown', (e) => {
        if (!isAnimating) {
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
        styleForSideSlider();

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
        styleForSideSlider();

        setTimeout(() => {
            enableButtons(); // Включаем кнопки
            isAnimating = false; // Снова разрешаем нажатия клавиш
        }, 500); // Время завершения анимации
    }

    function resetSlidesIfNeeded() {
        if (currentIndex === totalSlides - 2 || currentIndex === 1) {
            setTimeout(() => {
                currentIndex = (currentIndex === totalSlides - 2) ? 2 : 4;
                updateSliderPosition();
                track.style.transition = 'none';
                slides[currentIndex].style.transition = 'none';
                styleForSideSlider();
            }, 450);

            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                slides.forEach(slide => slide.style.transition = 'all 0.5s ease-in-out');
            }, 500);
        }
    }

    function styleForSideSlider() {
        slides.forEach(slide => {
            slide.classList.remove('right');
            slide.classList.remove('left');
        });

        // Проверяем границы, чтобы не выйти за пределы массива
        if (currentIndex + 1 < totalSlides) {
            slides[currentIndex + 1].classList.add('right');
        }
        if (currentIndex - 1 >= 0) {
            slides[currentIndex - 1].classList.add('left');
        }
    }

    function handleRightClick() {
        if (currentRight) {
            currentRight.removeEventListener('click', rightClickHandler);
        }

        currentRight = document.querySelector('.right');
        
        if (currentRight) {
            currentRight.addEventListener('click', rightClickHandler);
        }
    }

    function rightClickHandler() {
        if (currentIndex >= totalSlides - 1 || isAnimating) return;

        disableButtons(); // Отключаем кнопки
        isAnimating = true; // Блокируем нажатия клавиш

        currentIndex++;
        updateSliderPosition();
        resetSlidesIfNeeded();
        styleForSideSlider();

        setTimeout(() => {
            enableButtons(); // Включаем кнопки
            isAnimating = false; // Снова разрешаем нажатия клавиш
        }, 500); // Время завершения анимации
    }
}