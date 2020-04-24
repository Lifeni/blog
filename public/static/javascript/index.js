'use strict';

// 判断是否支持 WebP
const isSupportWebp = function () {
    return document.createElement('canvas').toDataURL('image/webp', .5).includes('data:image/webp');
}

// 浏览器是否支持判断系统主题
const isSupportTheme = function () {
    return window.matchMedia('(prefers-color-scheme: light)').matches
        || window.matchMedia('(prefers-color-scheme: dark)').matches;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('body').classList.remove('nothing');
    }, 100);

    const store = document.querySelector('#checkbox-store');
    const system = document.querySelector('#checkbox-system');
    const dark = document.querySelector('#checkbox-dark');

    // 读取本地数据
    if (localStorage.getItem('store-mode') === 'true') {
        store.checked = true;

        // 读取跟随系统主题
        if (localStorage.getItem('system-mode') === 'true') {
            system.checked = true;
        } else {
            system.checked = false;
        }

        // 读取暗色模式
        if (localStorage.getItem('dark-mode') === 'true') {
            dark.checked = true;
            html.dataset.mode = 'dark';
        } else {
            dark.checked = false;
            html.dataset.mode = 'light';
        }
    } else {
        store.checked = false;
    }

    // 修改 WebP 到 JPG
    if (!isSupportWebp()) {
        let images = document.querySelectorAll('img');
        images.forEach((e) => {
            if (e.src) {
                e.src = e.src + '?x-oss-process=image/format,jpg';
            }

            if (e.dataset.src) {
                e.dataset.src = e.dataset.src + '?x-oss-process=image/format,jpg';
            }
        })

        const character = document.querySelector('#character');
        if (character) {
            character.style.backgroundImage = 'url("https://lifeni.oss-cn-beijing.aliyuncs.com/website/image/%E6%97%A5%E5%B8%B8%EF%BC%9A%E5%9D%82%E6%9C%AC.png")'
        }
    }

    // 判断浏览器是否支持判断系统主题
    if (isSupportTheme()) {
        // 默认开启跟随系统主题
        if (!localStorage.getItem('store-mode')) {
            system.checked = true;
        }
    } else {
        system.checked = false;
        if (localStorage.getItem('store-mode')) {
            localStorage.setItem('system-mode', 'false');
        }
    }

    // 根据系统主题切换暗色模式
    if (isSupportTheme() && system.checked) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {

            // 如果系统是暗色，网页是亮色
            if (html.dataset.mode !== 'dark') {
                dark.click();
            }
        } else {

            // 如果系统是亮色，网页是暗色
            if (html.dataset.mode === 'dark') {
                dark.click();
            }
        }
    }
})

// 暗色模式
const html = document.querySelector('html');
const dark = document.querySelector('#checkbox-dark');
dark.addEventListener('click', (e) => {

    // 手动点击时，改变了默认主题时，需要取消跟随系统主题
    if (isSupportTheme() && system.checked && e.x !== 0) {
        system.click();
    }

    // 更改网页主题
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

// 跟随系统主题
const system = document.querySelector('#checkbox-system');
system.addEventListener('click', () => {

    // 如果支持跟随系统主题，就判断切换并切换主题
    if (isSupportTheme()) {
        if (system.checked) {
            if (localStorage.getItem('store-mode')) {
                localStorage.setItem('system-mode', 'true');
            }

            // 判断系统主题并切换
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                if (html.dataset.mode !== 'dark') {
                    dark.click();
                }
            } else {
                if (html.dataset.mode === 'dark') {
                    dark.click();
                }
            }
        } else {
            if (localStorage.getItem('store-mode')) {
                localStorage.setItem('system-mode', 'false');
            }
        }
    } else {
        alert('浏览器不支持');
        system.checked = false;
        if (localStorage.getItem('store-mode')) {
            localStorage.setItem('system-mode', 'false');
        }
    }

})

// 储存数据
const store = document.querySelector('#checkbox-store');
store.addEventListener('click', () => {
    if (store.checked) {
        localStorage.setItem('store-mode', 'true');

        // 记录跟随系统主题切换
        if (system.checked) {
            localStorage.setItem('system-mode', 'true');
        } else {
            localStorage.setItem('system-mode', 'false');
        }

        // 记录暗色模式
        if (dark.checked) {
            localStorage.setItem('dark-mode', 'true');
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    } else {
        localStorage.clear();
    }
})

// 右上角菜单
const setting = document.querySelector('#button-setting');
const windowSetting = document.querySelector('#window-setting');
setting.addEventListener('click', () => {
    setting.classList.toggle('show');
    windowSetting.classList.toggle('show');
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
})

// ESC 关闭窗口
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        if (e.target.tagName === 'LABEL') {
            e.target.click();
        }
    }

    if (e.code === 'Escape' && windowSetting.classList.contains('show')) {
        setting.classList.remove('show');
        windowSetting.classList.remove('show');
    }
})

// 纪念日
const dateList = [
    [4, 4, 2020],
    [5, 12],
    [12, 13],
]
const now = new Date();
dateList.forEach(([month, day, year = now.getFullYear()]) => {
    if (
        now.getFullYear() === year
        && now.getMonth() === month - 1
        && now.getDate() === day
    ) {
        html.style.filter = 'grayscale(100%)';
    }
})
