export default function slider(prev, next, slideWrapper, slide) {

    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);
    const track = document.querySelector(slideWrapper);
    const slides = document.querySelectorAll(slide);
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 10;

    let currentIndex = 2;
    let isAnimating = false;

    // Функция обновления слайдера и точки
    function updateSliderPosition() {
        moveSlide();
        updateActiveBlock();
        handleRightClick(); // Обновляем обработчик на новом элементе `.right`
    }

    updateSliderPosition();
    
    // Обработка клавиш
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

    // Обработка кнопок
    nextBtn.addEventListener('click', () => handleArrowClick('next'));
    prevBtn.addEventListener('click', () => handleArrowClick('prev'));

    function handleArrowClick(direction) {
        if (direction === 'next') {
            nextArrow();
        } else if (direction === 'prev') {
            prevArrow();
        }
    }

    // Перемещение слайда
    function moveSlide() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Обновление активного блока
    function updateActiveBlock() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentIndex].classList.add('active');
    }

    // Блокировка кнопок
    function disableButtons() {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    }

    function enableButtons() {
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    }

    // Обработка кнопки вперед
    function nextArrow() {
        if (currentIndex >= totalSlides - 1 || isAnimating) return;
        disableButtons();
        isAnimating = true;

        currentIndex++;
        updateSliderPosition();
        resetSlidesIfNeeded();
        styleForSideSlider();

        setTimeout(() => {
            enableButtons();
            isAnimating = false;
        }, 500);
    }

    // Обработка кнопки назад
    function prevArrow() {
        if (currentIndex <= 0 || isAnimating) return;
        disableButtons();
        isAnimating = true;

        currentIndex--;
        updateSliderPosition();
        resetSlidesIfNeeded();
        styleForSideSlider();

        setTimeout(() => {
            enableButtons();
            isAnimating = false;
        }, 500);
    }

    // Сброс слайдов при необходимости
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

    // Применение стилей к соседним слайдам
    function styleForSideSlider() {
        slides.forEach(slide => {
            slide.classList.remove('right', 'left');
        });

        if (slides[currentIndex + 1]) slides[currentIndex + 1].classList.add('right');
        if (slides[currentIndex - 1]) slides[currentIndex - 1].classList.add('left');
    }

    // Обновление обработчика для элемента `.right`
    function handleRightClick() {
        const right = document.querySelector('.right');
        if (right) {
            right.removeEventListener('click', handleRightClick); // Удаляем старый обработчик перед обновлением

            right.addEventListener('click', () => {
                if (currentIndex >= totalSlides - 1 || isAnimating) return;

                disableButtons();
                isAnimating = true;

                currentIndex++;
                updateSliderPosition();
                resetSlidesIfNeeded();
                styleForSideSlider();

                setTimeout(() => {
                    enableButtons();
                    isAnimating = false;
                }, 500);
            });
        }
    }

    styleForSideSlider(); // Задать начальные стили для соседних слайдов
}