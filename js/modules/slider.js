export default function slider() {
    const dotsContainer = document.querySelector('.dots-container');
    const movingDot = document.createElement('div'); // создаем элемент для перемещения активной точки
    movingDot.id = 'active-dot';
    dotsContainer.appendChild(movingDot); // добавляем активную точку в контейнер с точками

    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.about__block');
    let currentIndex = 0; // текущий индекс слайда
    const totalSlides = slides.length; // общее количество слайдов
    const totalDots = dots.length; // количество индикаторов

    // Обрабатываем клик по индикаторам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Перемещаем слайдер на нужную позицию
            currentIndex = index; // устанавливаем текущий индекс на основе индикатора
            updateSliderPosition(); // обновляем позицию слайдера

            // Перемещаем активную точку
            moveActiveDot(currentIndex);
        });
    });

    // Функция для обновления позиции слайдера
    function updateSliderPosition() {
        // Сбрасываем все классы с слайдов
        slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));

        // Определяем индексы предыдущего и следующего слайда
        const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1; // если текущий слайд первый, предыдущий - последний
        const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1; // если текущий слайд последний, следующий - первый

        // Устанавливаем классы активного, предыдущего и следующего слайдов
        slides[currentIndex].classList.add('active');
        slides[prevIndex].classList.add('prev');
        slides[nextIndex].classList.add('next');
    }

    // Функция для перемещения активной точки индикатора
    function moveActiveDot(currentSlideIndex) {
        // Рассчитываем индекс активной точки на основе текущего индекса слайда
        const activeDotIndex = currentSlideIndex % totalDots;

        // Перемещаем активную точку к соответствующему индикатору
        const activeDotPosition = dots[activeDotIndex].offsetLeft; // позиция нужного индикатора
        movingDot.style.transform = `translateX(${activeDotPosition}px)`; // перемещаем активную точку

        // Обновляем стили индикаторов
        dots.forEach(dot => dot.classList.remove('active')); // сбрасываем активный класс у всех индикаторов
        dots[activeDotIndex].classList.add('active'); // добавляем активный класс текущему индикатору
    }

    // Функция для перехода к предыдущему слайду
    function gotoPrev() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1; // уменьшаем индекс, если возможно, иначе переходим к последнему слайду
        updateSliderPosition();
        moveActiveDot(currentIndex);
    }

    // Функция для перехода к следующему слайду
    function gotoNext() {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0; // увеличиваем индекс, если возможно, иначе переходим к первому слайду
        updateSliderPosition();
        moveActiveDot(currentIndex);
    }

    // Добавляем обработчики для кнопок "Назад" и "Вперед"
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => index == 0 ? gotoPrev() : gotoNext()); // если индекс кнопки 0, переходим назад, иначе вперед
    });

    // Обработчик нажатия клавиш
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            gotoPrev(); // Переход к предыдущему слайду
        } else if (event.key === 'ArrowRight') {
            gotoNext(); // Переход к следующему слайду
        }
    });

    // track.addEventListener('touchstart', touchStart);
    // track.addEventListener('touchmove', touchMove);
    // track.addEventListener('touchend', touchEnd);

    // function touchStart(event) {
    //     startX = event.touches[0].clientX;
    //     isDragging = true;
    //     prevTranslate = currentTranslate;
    // }

    // function touchMove(event) {
    //     if (!isDragging) return;
    //     const currentX = event.touches[0].clientX;
    //     const diff = currentX - startX;
    //     currentTranslate = prevTranslate + diff;
    //     track.style.transform = `translateX(${currentTranslate}px)`;
    // }

    // function touchEnd() {
    //     isDragging = false;
    //     const moveThreshold = 50;
    //     const movedBy = currentTranslate - prevTranslate;

    //     if (movedBy < -moveThreshold) {
    //         nextArrow();
    //     } else if (movedBy > moveThreshold) {
    //         prevArrow();
    //     } else {
    //         track.style.transform = `translateX(${prevTranslate}px)`;
    //     }
    // }
}