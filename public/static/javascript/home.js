'use strict';

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
    resetRadio.checked = 'true';
    articleFilter('none');
})

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

// 跳转侧栏
const html = document.querySelector('html');
const nav = document.querySelector('nav');
const aside = document.querySelector('aside');
const toSidebar = document.querySelector('#expand');
toSidebar.addEventListener('click', () => {
    if (html.offsetWidth > 720) {
        nav.classList.toggle('fold');
        aside.classList.toggle('fold');
    } else {
        window.scrollTo(0, document.body.scrollHeight);
    }
})

// 导航栏和工具栏的吸附效果
const tool = document.querySelector('#tool');
window.addEventListener('scroll', (e) => {
    if (html.offsetWidth > 720) {
        if (html.scrollTop > 72) {
            tool.classList.add('tool-show');
        } else {
            tool.classList.remove('tool-show');
        }
        const main = document.querySelector('main');
        const max = main.getBoundingClientRect().height - tool.offsetTop - 132;
        // 右下角工具栏
        let delta = html.scrollTop - tool.offsetTop - 216 + html.clientHeight;
        if (delta < 0) {
            delta = 0;
        } else if (delta > max) {
            delta = max;
        }
        tool.style.paddingTop = `${delta}px`;
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
        for (let card of cards) {
            card.classList.remove('hide');
        }
    } else if (method === 'tag') {
        // 标签
        reset.classList.remove('hide');
        for (let card of cards) {
            card.classList.add('hide');
            if (card.dataset.keyword === value) {
                card.classList.remove('hide');
            }
        }
    } else if (method === 'search') {
        // 搜索
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
        for (let card of cards) {
            const text = card.innerText.toLowerCase();
            card.classList.add('hide');
            for (let date of value) {
                if (text.includes(date.toLowerCase())) {
                    card.classList.remove('hide');
                }
            }
        }
    }
}
