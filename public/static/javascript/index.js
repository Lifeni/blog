'use strict';

// 判断是否支持 WebP
const isSupportWebp =
    document.createElement('canvas')
        .toDataURL('image/webp', .5)
        .includes('data:image/webp');

const html = document.querySelector('html');
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
    // 修改 WebP 到 JPG
    if (!isSupportWebp) {
        const images = document.querySelectorAll('img');
        images.forEach((e) => {
            if (e.src) {
                e.src = e.src + '?x-oss-process=image/format,jpg';
            }

            // 图片懒加载的情况
            if (e.dataset.src) {
                e.dataset.src = e.dataset.src + '?x-oss-process=image/format,jpg';
            }
        })
    }
})

const autoTheme = document.querySelector('#theme-auto');
const lightTheme = document.querySelector('#theme-light');
const darkTheme = document.querySelector('#theme-dark');

window.addEventListener('pageshow', () => {
    const theme = localStorage.getItem('theme');
    const current = localStorage.getItem('current-theme');
    if (current) {
        html.dataset.theme = current;
        body.classList.add('theme-dark');

        setTimeout(() => {
            body.classList.remove('theme-dark');
        }, 200);

        if (theme) {
            if (theme === 'light') {
                lightTheme.checked = true;
            } else if (theme === 'dark') {
                darkTheme.checked = true;
            } else if (theme === 'auto') {
                autoTheme.checked = true;
            }
        }
    } else {
        localStorage.setItem('theme', 'auto');
        autoTheme.checked = true;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // 如果系统是暗色，网页是亮色
            html.dataset.theme = 'dark';
            localStorage.setItem('current-theme', 'dark');
        } else {
            // 如果系统是亮色，网页是暗色
            html.dataset.theme = 'light';
            localStorage.setItem('current-theme', 'light');
        }
    }
})

autoTheme.addEventListener('click', themeSwitcher);
lightTheme.addEventListener('click', themeSwitcher);
darkTheme.addEventListener('click', themeSwitcher);

function themeSwitcher(e) {
    localStorage.setItem('theme', e.target.value);
    if (e.target.value === 'auto') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // 如果系统是暗色，网页是亮色
            html.dataset.theme = 'dark';
            localStorage.setItem('current-theme', 'dark');
        } else {
            // 如果系统是亮色，网页是暗色
            html.dataset.theme = 'light';
            localStorage.setItem('current-theme', 'light');
        }
    } else {
        html.dataset.theme = e.target.value;
        localStorage.setItem('current-theme', e.target.value);
    }
}

// 右上角菜单
const setting = document.querySelector('#button-setting');
const settingWindow = document.querySelector('#window-setting');
setting.addEventListener('click', () => {
    setting.classList.toggle('show');
    settingWindow.classList.toggle('show');
})

// 点击窗口外关闭窗口
window.addEventListener('click', (e) => {
    // 键盘 Enter 屏蔽
    if (e.x === 0 && e.y === 0) {
        return;
    }

    if (settingWindow.classList.contains('show')) {
        const settingSize = setting.getBoundingClientRect();
        const winSize = settingWindow.getBoundingClientRect();
        if ((
            e.x < winSize.left
            || e.x > winSize.right
            || e.y < winSize.top
            || e.y > winSize.bottom
        ) && (
                e.x < settingSize.left
                || e.x > settingSize.right
                || e.y < settingSize.top
                || e.y > settingSize.bottom
            )) {
            setting.classList.remove('show');
            settingWindow.classList.remove('show');
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

    if (e.code === 'Escape' && settingWindow.classList.contains('show')) {
        setting.classList.remove('show');
        settingWindow.classList.remove('show');
    }
})

// 纪念日
const now = new Date();
const dateList = [
    [4, 4, 2020],
    [5, 12],
    [12, 13],
];

dateList.forEach(([month, day, year = now.getFullYear()]) => {
    if (
        now.getFullYear() === year
        && now.getMonth() === month - 1
        && now.getDate() === day
    ) {
        html.style.filter = 'grayscale(100%)';
    }
})
