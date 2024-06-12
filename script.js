document.addEventListener('DOMContentLoaded', function() {
    const scrollDown = document.querySelector('.scroll-down');
    scrollDown.addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('main').offsetTop,
            behavior: 'smooth'
        });
    });
});
