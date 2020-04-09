'use strict';

document.addEventListener('DOMContentLoaded', () => {
    sectionResize();
    setTimeout(() => {
        toolResize();
        articleFilter('none');
    }, 0);
})

window.addEventListener('resize', () => {
    sectionResize();
    toolResize();
})

// 监听搜索框
const inputSearch = document.querySelector('#input-search');
inputSearch.addEventListener('input', (e) => {
    if (!e.target.value.startsWith(' ')) {
        articleFilter('search', e.target.value.replace(/\s/g, '+'));
    }
})

// 监听标签点击
const radioTag = document.querySelectorAll('.radio.tag');
for (let tag of radioTag) {
    tag.addEventListener('click', (e) => {
        articleFilter('tag', e.target.dataset.keyword);
    })
}

// 监听月份点击
const labelMonth = document.querySelectorAll('.label.month');
const checkboxMonth = document.querySelectorAll('.checkbox.month');
for (let month of labelMonth) {
    month.addEventListener('click', () => {
        let monthArray = [];

        // checkbox 从点击到 checked 状态需要一点时间
        setTimeout(() => {
            for (let checkbox of checkboxMonth) {
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
const labelReset = document.querySelector('#label-reset');
const radioReset = document.querySelector('#radio-reset');
labelReset.addEventListener('click', () => {
    radioReset.checked = true;
    articleFilter('none');
})

// 工具栏的吸附效果
const cardTool = document.querySelector('#card-tool');
window.addEventListener('scroll', () => {
    const html = document.querySelector('html');
    if (html.offsetWidth > 640) {
        const aside = document.querySelector('aside');
        const footer = document.querySelector('footer');

        if (aside.getBoundingClientRect().bottom + 132 < html.clientHeight) {
            const foo = footer.getBoundingClientRect().top - html.clientHeight;

            if (foo < 0) {
                cardTool.style.bottom = `${-foo + 12}px`;
            } else {
                cardTool.style.bottom = '12px';
            }
        } else {
            cardTool.style.bottom = `${html.clientHeight - aside.getBoundingClientRect().bottom - 120}px`;
        }
    }
})

function toolResize() {
    const aside = document.querySelector('aside');
    cardTool.style.left = `${aside.getBoundingClientRect().left}px`;
}

function sectionResize() {
    const section = document.querySelector('section');
    let top = section.getBoundingClientRect().left - 168;
    if (top < 12 ) {
        top = 12;
    }
    section.style.marginTop = `${top}px`;
}

// 跳转顶部
const toTop = document.querySelector('#button-top');
toTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
})

// 跳转底部
const toBottom = document.querySelector('#button-bottom');
toBottom.addEventListener('click', () => {
    window.scrollTo(0, document.body.scrollHeight);
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


// 筛选文章
function articleFilter(method, value) {
    const cardArticle = document.querySelectorAll('.card.article');
    const cardEmpty = document.querySelector('#card-empty');
    const cardTool = document.querySelector('#card-tool');

    labelReset.classList.add('hide');
    cardEmpty.classList.add('hide');
    cardTool.classList.add('hide');


    if (method === 'none') {    // 无条件
        document.querySelectorAll('.radio.tag').forEach((e) => {
            e.checked = false;
        })

        document.querySelectorAll('.checkbox.month').forEach((e) => {
            e.checked = false;
        })

        cardTool.classList.remove('hide');

        for (let card of cardArticle) {
            card.classList.remove('hide');
        }
    } else if (method === 'tag') {      // 标签
        document.querySelectorAll('.checkbox.month').forEach((e) => {
            e.checked = false;
        })

        labelReset.classList.remove('hide');

        for (let card of cardArticle) {
            card.classList.add('hide');
            if (card.dataset.keyword === value) {
                card.classList.remove('hide');
            }
        }
    } else if (method === 'search') {   // 搜索
        if (value === '') {
            articleFilter('none');
            return;
        }

        document.querySelectorAll('.radio.tag').forEach((e) => {
            e.checked = false;
        })

        document.querySelectorAll('.checkbox.month').forEach((e) => {
            e.checked = false;
        })

        value = decodeURI(value).replace(/\+/g, ' ');

        let count = 0;
        for (let card of cardArticle) {
            const text = card.innerText.toLowerCase();
            count++;
            card.classList.add('hide');

            if (text.includes(value.toLowerCase())) {
                count--;
                card.classList.remove('hide');
            }
        }

        if (count === cardArticle.length) {
            cardEmpty.classList.remove('hide');
        }
    } else if (method === 'date') {     // 月份
        document.querySelectorAll('.radio.tag').forEach((e) => {
            e.checked = false;
        })

        for (let card of cardArticle) {
            card.classList.add('hide');
            for (let date of value) {
                if (card.dataset.date.includes(date.toLowerCase())) {
                    card.classList.remove('hide');
                }
            }
        }
    }
}
