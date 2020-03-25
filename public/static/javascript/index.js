'use strict';

// 右上角菜单
const more = document.querySelector('#more');
const win = document.querySelector('#window');
more.addEventListener('click', () => {
    more.classList.toggle('more-show');
    win.classList.toggle('window-show');
})

// 点击窗口外关闭窗口
window.addEventListener('click', (e) => {
    if (e.x === 0 && e.y === 0) {
        // 键盘 Enter 屏蔽
        return;
    }
    if (win.classList.contains('window-show')) {
        const moreSize = more.getBoundingClientRect();
        const winSize = win.getBoundingClientRect();
        if ((e.x < winSize.left || e.x > winSize.right
            || e.y < winSize.top || e.y > winSize.bottom)
            && (e.x < moreSize.left || e.x > moreSize.right
                || e.y < moreSize.top || e.y > moreSize.bottom)) {
            more.classList.remove('more-show');
            win.classList.remove('window-show');
        }
    }
})

// ESC 关闭窗口
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && win.classList.contains('window-show')) {
        more.classList.remove('more-show');
        win.classList.remove('window-show');
    }
})

// 暗色模式
const html = document.querySelector('html');
const dark = document.querySelector('#dark');
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
const store = document.querySelector('#store');
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

document.addEventListener('DOMContentLoaded', () => {
    const store = document.querySelector('.store-checkbox');
    const dark = document.querySelector('.dark-checkbox');
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
