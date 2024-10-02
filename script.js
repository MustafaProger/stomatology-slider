const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.about__block');
const totalSlides = slides.length;
const slideWidth = parseInt(window.getComputedStyle(slides[0]).width) + 60;
let currentIndex = 0;

track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;


function updateActiveBlock() {
    slides.forEach(slide => slide.classList.remove('active'));

    slides[currentIndex].classList.add('active')
}

updateActiveBlock();


function updateSliderPosition() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    updateActiveBlock();
}

nextBtn.addEventListener('click', () => {
    if (currentIndex >= totalSlides - 1) return; 
    currentIndex++;
    updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
});

track.addEventListener('transitionend', () => {
    if (slides[currentIndex].classList.contains('last-clone')) {
        track.style.transition = 'none';
        currentIndex = 1;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    if (slides[currentIndex].classList.contains('first-clone')) {
        track.style.transition = 'none';
        currentIndex = totalSlides - 2;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
});