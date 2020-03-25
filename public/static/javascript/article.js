'use strict';

const h1 = document.querySelector('h1');
const info = document.querySelector('#info');
const article = document.querySelector('article');
article.insertBefore(h1, info);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    })
})

const images = article.querySelectorAll('img');
images.forEach((image) => {
    observer.observe(image);
    image.addEventListener('load', function loaded() {
        image.dataset.loaded = 'ok';
        image.removeEventListener('load', loaded);
    })
})