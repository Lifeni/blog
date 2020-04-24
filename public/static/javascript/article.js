'use strict';

const aside = document.querySelector('aside');
const toc = document.querySelector('.toc')
const article = document.querySelector('article');

// 更改组件位置
document.addEventListener('DOMContentLoaded', () => {
    aside.appendChild(toc);
})

// 图片懒加载
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


const index = document.querySelector('#button-index');
index.addEventListener('click', () => {
    aside.classList.toggle('show');
    index.classList.toggle('show');
})
