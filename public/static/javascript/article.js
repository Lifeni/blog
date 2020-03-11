'use strict';

const more = document.querySelector('#more');
more.addEventListener('click', () => {
    alert('功能未完成。')
})


const h1 = document.querySelector('h1');
const info = document.querySelector('#info');
const article = document.querySelector('article');
article.insertBefore(h1, info);