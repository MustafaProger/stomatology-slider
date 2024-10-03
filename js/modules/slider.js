export default function slider(prev, next, slideWrapper, slide) {

    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);
    const track = document.querySelector(slideWrapper);
    const slides = document.querySelectorAll(slide);
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 10;
    
    let currentIndex = 2;
    let isAnimating = false; // Флаг для блокировки нажатий


    function updateSliderPosition() {
        moveSlide();
        updateActiveBlock();
    }

    updateSliderPosition()
    
    document.addEventListener('keydown', (e) => {
        if (!isAnimating) { // Проверяем, идет ли анимация
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
                currentIndex = (currentIndex === totalSlides - 2) ? 2 : 4;
                updateSliderPosition();
                track.style.transition = 'none';
                slides[currentIndex].style.transition = 'none';
                styleForSideSlider()
            }, 450);
    
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                slides.forEach(slide => slide.style.transition = 'all 0.5s ease-in-out');
            }, 500);
        }
    }

    // function rotateForSideSlides() {
    //     slides.forEach((slide, index) => {
    //         nextBtn.addEventListener('click', styleForSideSlider);
    //         prevBtn.addEventListener('click', styleForSideSlider);
    //         document.addEventListener('keydown', styleForSideSlider);
    //     })
    // }

    // rotateForSideSlides()


    // function styleForSideSlider() {
    //     slides.forEach(slide => {
    //         slide.classList.remove('right');
    //         slide.classList.remove('left');
    //     })

    //     slides[currentIndex + 1].classList.add('right');
    //     slides[currentIndex - 1].classList.add('left');
    // }


    // function clickRightSlide() {
    //     document.querySelector('.right').addEventListener('click', () => {
    //         console.log(document.querySelector('.right'));
    //         handleArrowClick('next');
    //         resetSlidesIfNeeded();
    //         styleForSideSlider();
    //     })
    // }

}
