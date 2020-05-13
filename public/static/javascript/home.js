'use strict';

document.addEventListener('DOMContentLoaded', () => {
    loadMore();
    boardSlider();
});

window.addEventListener('pageshow', () => {
    setTimeout(() => {
        toolResizer();
        articleFilter('none');
    }, 0);
});

let htmlWidth = document.querySelector('html').offsetWidth;
window.addEventListener('resize', () => {
    htmlWidth = document.querySelector('html').offsetWidth;
    toolResizer();
});

function boardSlider() {
    const showcase = document.querySelector('#showcase');
    const boards = showcase.querySelectorAll('.board');
    const firstBoard = boards[0];
    const lastBoard = boards[boards.length - 1];
    if (htmlWidth > 640) {
        // 项目部分的左右滑动按钮
        const goLeft = document.querySelector('#go-left');
        const goRight = document.querySelector('#go-right');

        goLeft.addEventListener('click', () => {
            const length = showcase.getBoundingClientRect().width;
            showcase.scrollLeft -= length;
        });

        goRight.addEventListener('click', () => {
            const length = showcase.getBoundingClientRect().width;
            showcase.scrollLeft += length;
        });

        showcase.addEventListener('scroll', () => {
            const leftLength =
                parseInt(firstBoard.getBoundingClientRect().left) -
                parseInt(showcase.getBoundingClientRect().left);
            const rightLength =
                parseInt(showcase.getBoundingClientRect().right) -
                parseInt(lastBoard.getBoundingClientRect().right);

            if (leftLength === 0 && rightLength === 12) {
                // 无溢出
                goLeft.classList.add('hide');
                goRight.classList.add('hide');
            } else if (Math.abs(rightLength) <= 1) {
                // 最右
                goLeft.classList.remove('hide');
                goRight.classList.add('hide');
            } else if (leftLength === 0) {
                // 最左
                goLeft.classList.add('hide');
                goRight.classList.remove('hide');
            } else {
                // 中间
                goLeft.classList.remove('hide');
                goRight.classList.remove('hide');
            }
        });
    } else {
        const tips = document.querySelector('#touch-tips');
        showcase.addEventListener('scroll', () => {
            tips.classList.add('hide');
        });
    }
}

// 监听搜索框
const searchInput = document.querySelector('#input-search');
searchInput.addEventListener('input', (e) => {
    if (!e.target.value.startsWith(' ')) {
        articleFilter('search', e.target.value.replace(/\s/g, '+'));
    }
});

// 监听标签点击
const tagRadio = document.querySelectorAll('.radio.tag');
for (const tag of tagRadio) {
    tag.addEventListener('click', (e) => {
        articleFilter('tag', e.target.dataset.keyword);
    });
}

// 监听月份点击
const monthLabel = document.querySelectorAll('.label.month');
const monthCheckbox = document.querySelectorAll('.checkbox.month');
for (const month of monthLabel) {
    month.addEventListener('click', () => {
        let monthArray = [];

        // checkbox 从点击到 checked 状态需要一点时间
        setTimeout(() => {
            for (const checkbox of monthCheckbox) {
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
    });
}

// 监听标签清空
const resetLabel = document.querySelector('#label-reset');
const resetRadio = document.querySelector('#radio-reset');
resetLabel.addEventListener('click', () => {
    resetRadio.checked = true;
    articleFilter('none');
});

// 工具栏的吸附效果
const toolCard = document.querySelector('#card-tool');
window.addEventListener('scroll', toolResizer);

function toolResizer() {
    const html = document.querySelector('html');
    if (html.offsetWidth > 640) {
        const main = document.querySelector('main');
        const aside = document.querySelector('aside');

        toolCard.style.left = `${aside.getBoundingClientRect().left}px`;

        if (main.getBoundingClientRect().bottom > html.clientHeight) {
            const foo =
                html.clientHeight - aside.getBoundingClientRect().bottom - 132;

            if (foo < 0) {
                toolCard.style.bottom = `${foo + 12}px`;
            } else {
                toolCard.style.bottom = '12px';
            }
        } else {
            toolCard.style.bottom = `${
                html.clientHeight - main.getBoundingClientRect().bottom + 12
            }px`;
        }
    }
}

// 跳转顶部
const toTop = document.querySelector('#go-top');
toTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

// 跳转底部
const toBottom = document.querySelector('#go-bottom');
toBottom.addEventListener('click', () => {
    window.scrollTo(0, document.body.scrollHeight);
});

// 筛选文章
function articleFilter(method, value) {
    const articleCard = document.querySelectorAll('.card.article');
    const emptyCard = document.querySelector('#card-empty');

    resetLabel.classList.add('hide');
    emptyCard.classList.add('hide');
    toolCard.classList.add('hide');
    loadButton.classList.add('hide');

    if (method === 'none') {
        // 无条件
        removeChecked();
        toolCard.classList.remove('hide');
        loadButton.classList.remove('hide');
        loadMore(4);
    } else if (method === 'tag') {
        // 标签
        removeChecked('month');
        resetLabel.classList.remove('hide');
        for (const card of articleCard) {
            card.classList.add('hide');
            if (card.dataset.keyword === value) {
                card.classList.remove('hide');
            }
        }
    } else if (method === 'search') {
        // 搜索
        if (value === '') {
            articleFilter('none');
        } else {
            removeChecked();
            let count = 0;
            for (const card of articleCard) {
                const text = card.innerText.toLowerCase();
                count++;
                card.classList.add('hide');
                if (
                    text.includes(
                        decodeURI(value).replace(/\+/g, ' ').toLowerCase()
                    )
                ) {
                    count--;
                    card.classList.remove('hide');
                }
            }

            if (count === articleCard.length) {
                emptyCard.classList.remove('hide');
            }
        }
    } else if (method === 'date') {
        // 月份
        removeChecked('tag');
        for (const card of articleCard) {
            card.classList.add('hide');
            for (const date of value) {
                if (card.dataset.date.includes(date.toLowerCase())) {
                    card.classList.remove('hide');
                }
            }
        }
    }
}

// 移除之前的筛选
function removeChecked(key) {
    const tags = document.querySelectorAll('.radio.tag');
    const months = document.querySelectorAll('.checkbox.month');
    if (key === 'tag') {
        tags.forEach((e) => (e.checked = false));
    } else if (key === 'month') {
        months.forEach((e) => (e.checked = false));
    } else {
        tags.forEach((e) => (e.checked = false));
        months.forEach((e) => (e.checked = false));
    }
}

// 计算当前应该显示几个文章
let loadCount = 0;
function loadMore(count) {
    loadCount += 4;
    if (count) {
        loadCount = count;
    }

    const articles = document.querySelectorAll('.card.article');
    if (loadCount > articles.length) {
        loadCount = articles.length;
    }

    articles.forEach((e, index) => {
        if (index < loadCount) {
            e.classList.remove('hide');
            if (index === articles.length - 1) {
                loadButton.classList.add('hide');
            }
        } else {
            e.classList.add('hide');
        }
    });
}

// 加载更多文章
const loadButton = document.querySelector('#load-more');
loadButton.addEventListener('click', () => {
    loadMore();
    toolCard.style.bottom = '12px';
});
