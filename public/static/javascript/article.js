'use strict';

const header = document.querySelector('header');
const main = document.querySelector('main');
const h1 = document.querySelector('h1');
const info = document.querySelector('#text-info');
const toc = document.querySelector('.toc')
const windowSetting = document.querySelector('#window-setting');
const windowIndex = document.querySelector('#window-index');
const article = document.querySelector('article');

// 更改组件位置
article.insertBefore(h1, info);
windowIndex.appendChild(toc);

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

// 右上角菜单
const setting = document.querySelector('#button-setting');
const index = document.querySelector('#button-index');

setting.addEventListener('click', () => {
    setting.classList.toggle('show');
    windowSetting.classList.toggle('show');
    index.classList.remove('show');
    windowIndex.classList.remove('show');
})

index.addEventListener('click', () => {
    index.classList.toggle('show');
    windowIndex.classList.toggle('show');
    setting.classList.remove('show');
    windowSetting.classList.remove('show');
})

// 点击窗口外关闭窗口
window.addEventListener('click', (e) => {

    // 键盘 Enter 屏蔽
    if (e.x === 0 && e.y === 0) {
        return;
    }

    if (windowSetting.classList.contains('show')) {
        const settingSize = setting.getBoundingClientRect();
        const winSize = windowSetting.getBoundingClientRect();
        if ((e.x < winSize.left || e.x > winSize.right
            || e.y < winSize.top || e.y > winSize.bottom)
            && (e.x < settingSize.left || e.x > settingSize.right
                || e.y < settingSize.top || e.y > settingSize.bottom)) {
            setting.classList.remove('show');
            windowSetting.classList.remove('show');
        }
    }

    if (windowIndex.classList.contains('show')) {
        const indexSize = index.getBoundingClientRect();
        const windowIndexSize = windowIndex.getBoundingClientRect();
        if ((e.x < windowIndexSize.left || e.x > windowIndexSize.right
            || e.y < windowIndexSize.top || e.y > windowIndexSize.bottom)
            && (e.x < indexSize.left || e.x > indexSize.right
                || e.y < indexSize.top || e.y > indexSize.bottom)) {
            index.classList.remove('show');
            windowIndex.classList.remove('show');
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

    if (e.code === 'Escape' && (windowSetting.classList.contains('show') || windowIndex.classList.contains('show'))) {
        setting.classList.remove('show');
        index.classList.remove('show');
        windowSetting.classList.remove('show');
        windowIndex.classList.remove('show');
    }
})
