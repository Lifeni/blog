'use strict';

const header = document.querySelector('header');
const main = document.querySelector('main');
const h1 = document.querySelector('h1');
const info = document.querySelector('#info');
const toc = document.querySelector('.toc')
const nav = document.querySelector('nav');
const article = document.querySelector('article');

article.insertBefore(h1, info);
nav.appendChild(toc);

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

// 右上角菜单
const setting = document.querySelector('#setting');
const content = document.querySelector('#content');
const win = document.querySelector('#window');

setting.addEventListener('click', () => {
    setting.classList.toggle('setting-show');
    win.classList.toggle('window-show');
    content.classList.remove('content-show');
    nav.classList.remove('nav-show');
})

content.addEventListener('click', () => {
    content.classList.toggle('content-show');
    nav.classList.toggle('nav-show');
    setting.classList.remove('setting-show');
    win.classList.remove('window-show');
})

// 点击窗口外关闭窗口
window.addEventListener('click', (e) => {
    if (e.x === 0 && e.y === 0) {
        // 键盘 Enter 屏蔽
        return;
    }
    if (win.classList.contains('window-show')) {
        const settingSize = setting.getBoundingClientRect();
        const winSize = win.getBoundingClientRect();
        if ((e.x < winSize.left || e.x > winSize.right
            || e.y < winSize.top || e.y > winSize.bottom)
            && (e.x < settingSize.left || e.x > settingSize.right
                || e.y < settingSize.top || e.y > settingSize.bottom)) {
            setting.classList.remove('setting-show');
            win.classList.remove('window-show');
        }
    }
    if (nav.classList.contains('nav-show')) {
        const contentSize = content.getBoundingClientRect();
        const navSize = nav.getBoundingClientRect();
        if ((e.x < navSize.left || e.x > navSize.right
            || e.y < navSize.top || e.y > navSize.bottom)
            && (e.x < contentSize.left || e.x > contentSize.right
                || e.y < contentSize.top || e.y > contentSize.bottom)) {
            content.classList.remove('content-show');
            nav.classList.remove('nav-show');
        }
    }
})

// ESC 关闭窗口
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        if (e.target.tagName === 'LABEL') {
            e.target.click();
        }
    }

    if (e.code === 'Escape' && (win.classList.contains('window-show') || nav.classList.contains('nav-show'))) {
        setting.classList.remove('setting-show');
        content.classList.remove('content-show');
        win.classList.remove('window-show');
        nav.classList.remove('nav-show');
    }
})
