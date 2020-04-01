'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const store = document.querySelector('#checkbox-store');
    const dark = document.querySelector('#checkbox-dark');
    if (localStorage.getItem('store-mode') === 'true') {
        store.checked = true;
    } else {
        store.checked = false;
    }
    if (localStorage.getItem('dark-mode') === 'true') {
        dark.checked = true;
        html.dataset.mode = 'dark';
    } else {
        dark.checked = false;
        html.dataset.mode = 'light';
    }
})

// 暗色模式
const html = document.querySelector('html');
const dark = document.querySelector('#checkbox-dark');
dark.addEventListener('click', () => {
    if (dark.checked) {
        html.dataset.mode = 'dark';
        if (localStorage.getItem('store-mode')) {
            localStorage.setItem('dark-mode', 'true');
        }
    } else {
        html.dataset.mode = 'light';
        if (localStorage.getItem('store-mode')) {
            localStorage.setItem('dark-mode', 'false');
        }
    }
})

// 储存数据
const store = document.querySelector('#checkbox-store');
store.addEventListener('click', () => {
    if (store.checked) {
        localStorage.setItem('store-mode', 'true');
        if (dark.checked) {
            localStorage.setItem('dark-mode', 'true');
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    } else {
        localStorage.clear();
    }
})
