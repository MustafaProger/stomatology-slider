const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.about__block');
const totalSlides = slides.length;
const slideWidth = slides[0].offsetWidth + 10;
let currentIndex = 1;

moveSlide();
updateActiveBlock();

function updateSliderPosition() {
    moveSlide();
    updateActiveBlock();
}

nextBtn.addEventListener('click', () => {
    if (currentIndex >= totalSlides - 1) return; 
    currentIndex++;
    updateSliderPosition();

    if (currentIndex === totalSlides - 2) {
        setTimeout(() => {
            slides[currentIndex - 1].style.transition = 'none'
            currentIndex = 1;
            updateSliderPosition();
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            track.style.transition = 'none';
            slides[currentIndex].style.transition = 'none';
        }, 500);
    } else {
         track.style.transition = 'transform 0.5s ease-in-out'
         slides.forEach(slide => slide.style.transition = 'all 0.5s ease-in-out')
    }

});

prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();

    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = totalSlides - 2;
            updateSliderPosition();
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }, 500);
    }

    track.style.transition = 'transform 0.5s ease-in-out;'
});


function moveSlide() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function updateActiveBlock() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
}