import slider from "./modules/slider";

window.addEventListener('DOMContentLoaded', () => {
    slider({
        trackSelector: '.about__blocks',
        slideselector: '.about__block',
        buttonselector: '.button',
        dotsContainerelector: '.dots-container',
        dotselector: '.dot',
    });
})