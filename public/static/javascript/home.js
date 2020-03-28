'use strict';

document.addEventListener('DOMContentLoaded', () => {
    calcDate();
    setTimeout(() => {
        toolResize();
        articleFilter('none');
    }, 0);
})

function calcDate() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const weekday = time.getDay();

    const array = ['天', '一', '二', '三', '四', '五', '六'];

    const startDate = new Date(`${year}/01/01 00:00:00`);
    const nowDate = new Date(`${year}/${month}/${day} 00:00:00`)
    const endDate = new Date(`${year + 1}/01/01 00:00:00`)
    const percent = ((nowDate - startDate) / (endDate - startDate)) * 100;

    const textNow = document.querySelector('#date-now');
    const textPercent = document.querySelector('#year-percent');
    textNow.innerText = `今天是 ${month} 月 ${day} 日，星期${array[weekday]}`;
    textPercent.innerText = `${year} 过了 ${percent.toFixed(1)}%`;
}

window.addEventListener('resize', () => {
    toolResize();
})

// 监听搜索框
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (e) => {
    if (!e.target.value.startsWith(' ')) {
        articleFilter('search', e.target.value.replace(/\s/g, '+'));
    }
})

// 监听标签点击
const tagRadio = document.querySelectorAll('.tag-radio');
for (let radio of tagRadio) {
    radio.addEventListener('click', () => {
        articleFilter('tag', radio.id);
    })
}

// 监听月份点击
const monthLabel = document.querySelectorAll('.month');
const monthCheckbox = document.querySelectorAll('.month-checkbox');
for (let label of monthLabel) {
    label.addEventListener('click', () => {
        let monthArray = [];
        // checkbox 从点击到 checked 状态需要一点时间
        setTimeout(() => {
            for (let checkbox of monthCheckbox) {
                if (checkbox.checked) {
                    monthArray.push(checkbox.id);
                }
            }
            if (monthArray.length === 0) {
                articleFilter('none');
            } else {
                articleFilter('date', monthArray);
            }
        }, 100);
    })
}

// 监听标签清空
const resetLabel = document.querySelector('#reset');
const resetRadio = document.querySelector('#reset-radio');
resetLabel.addEventListener('click', () => {
    resetRadio.checked = true;
    articleFilter('none');
})

// 工具栏的吸附效果
const tool = document.querySelector('#tool');
window.addEventListener('scroll', () => {
    const html = document.querySelector('html');
    if (html.offsetWidth > 640) {
        const aside = document.querySelector('aside');
        const footer = document.querySelector('footer');
        if (aside.getBoundingClientRect().bottom + 132 < html.clientHeight) {
            const foo = footer.getBoundingClientRect().top - html.clientHeight - 12;
            if (foo < 0) {
                tool.style.bottom = `${-foo}px`;
            } else {
                tool.style.bottom = '12px';
            }
        } else {
            tool.style.bottom = `${html.clientHeight - aside.getBoundingClientRect().bottom - 120}px`;
        }
    }
})

function toolResize() {
    const aside = document.querySelector('aside');
    tool.style.left = `${aside.getBoundingClientRect().left}px`;
}

// 跳转顶部
const toTop = document.querySelector('#top');
toTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
})

// 跳转底部
const toBottom = document.querySelector('#bottom');
toBottom.addEventListener('click', () => {
    window.scrollTo(0, document.body.scrollHeight);
})

// 右上角菜单
const setting = document.querySelector('#setting');
const win = document.querySelector('#window');
setting.addEventListener('click', () => {
    setting.classList.toggle('setting-show');
    win.classList.toggle('window-show');
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
})

// ESC 关闭窗口
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        if (e.target.tagName === 'LABEL') {
            e.target.click();
        }
    }

    if (e.code === 'Escape' && win.classList.contains('window-show')) {
        setting.classList.remove('setting-show');
        win.classList.remove('window-show');
    }
})


// 筛选文章
function articleFilter(method, value) {
    const cards = document.querySelectorAll('.card');
    const reset = document.querySelector('#reset');
    const empty = document.querySelector('#empty');
    reset.classList.add('hide');
    empty.classList.add('hide');
    if (method === 'none') {
        // 无条件
        document.querySelectorAll('.tag-radio').forEach((e) => {
            e.checked = false;
        })
        document.querySelectorAll('.month-checkbox').forEach((e) => {
            e.checked = false;
        })
        for (let card of cards) {
            card.classList.remove('hide');
        }
    } else if (method === 'tag') {
        // 标签
        document.querySelectorAll('.month-checkbox').forEach((e) => {
            e.checked = false;
        })
        reset.classList.remove('hide');
        for (let card of cards) {
            card.classList.add('hide');
            if (card.dataset.keyword === value) {
                card.classList.remove('hide');
            }
        }
    } else if (method === 'search') {
        // 搜索
        document.querySelectorAll('.tag-radio').forEach((e) => {
            e.checked = false;
        })
        document.querySelectorAll('.month-checkbox').forEach((e) => {
            e.checked = false;
        })
        value = decodeURI(value).replace(/\+/g, ' ');
        let count = 0;
        for (let card of cards) {
            const text = card.innerText.toLowerCase();
            count++;
            card.classList.add('hide');
            if (text.includes(value.toLowerCase())) {
                count--;
                card.classList.remove('hide');
            }
        }
        if (count === cards.length) {
            empty.classList.remove('hide');
        }
    } else if (method === 'date') {
        // 月份
        document.querySelectorAll('.tag-radio').forEach((e) => {
            e.checked = false;
        })
        for (let card of cards) {
            card.classList.add('hide');
            for (let date of value) {
                if (card.dataset.date.includes(date.toLowerCase())) {
                    card.classList.remove('hide');
                }
            }
        }
    }
}
