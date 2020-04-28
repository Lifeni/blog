'use strict';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        toolResize();
        boardSlide();
        articleFilter('none');
        loadMore();
    }, 0);
})

let htmlWidth = document.querySelector('html').offsetWidth;
window.addEventListener('resize', () => {
    htmlWidth = document.querySelector('html').offsetWidth;
    toolResize();
    boardSlide();
})

function boardSlide() {
    const showcase = document.querySelector('#showcase');
    const allBoard = showcase.querySelectorAll('.board');
    const firstBoard = allBoard[0];
    const lastBoard = allBoard[allBoard.length - 1];
    if (htmlWidth > 640) {
        // 项目部分的左右滑动按钮
        const goLeft = document.querySelector('#go-left');
        const goRight = document.querySelector('#go-right');

        goLeft.addEventListener('click', () => {
            const length = showcase.getBoundingClientRect().width;
            showcase.scrollLeft -= length;
        })

        goRight.addEventListener('click', () => {
            const length = showcase.getBoundingClientRect().width;
            showcase.scrollLeft += length;
        })

        showcase.addEventListener('scroll', () => {
            const leftLength = parseInt(firstBoard.getBoundingClientRect().left) - parseInt(showcase.getBoundingClientRect().left);
            const rightLength = parseInt(showcase.getBoundingClientRect().right) - parseInt(lastBoard.getBoundingClientRect().right);

            if (leftLength === 0 && rightLength === 12) {
                goLeft.classList.add('hide');
                goRight.classList.add('hide');
            } else if (Math.abs(rightLength) <= 1) {
                goLeft.classList.remove('hide');
                goRight.classList.add('hide');
            } else if (leftLength === 0) {
                goLeft.classList.add('hide');
                goRight.classList.remove('hide');
            } else {
                goLeft.classList.remove('hide');
                goRight.classList.remove('hide');
            }
        })
    } else {
        const tips = document.querySelector('#touch-tips');
        showcase.addEventListener('scroll', () => {
            tips.classList.add('hide');
        })
    }
}

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

// 筛选文章
function articleFilter(method, value) {
    const cardArticle = document.querySelectorAll('.card.article');
    const cardEmpty = document.querySelector('#card-empty');
    const cardTool = document.querySelector('#card-tool');

    labelReset.classList.add('hide');
    cardEmpty.classList.add('hide');
    cardTool.classList.add('hide');
    loadButton.classList.add('hide');

    if (method === 'none') {    // 无条件
        document.querySelectorAll('.radio.tag').forEach((e) => {
            e.checked = false;
        })

        document.querySelectorAll('.checkbox.month').forEach((e) => {
            e.checked = false;
        })

        cardTool.classList.remove('hide');
        loadButton.classList.remove('hide');

        // for (let card of cardArticle) {
        //     card.classList.remove('hide');
        // }
        loadCount -= 4;
        loadMore();
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

let loadCount = 0;
function loadMore() {
    loadCount += 4;
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
    })
}

const loadButton = document.querySelector('#load-more');
loadButton.addEventListener('click', () => {
    loadMore();
    cardTool.style.bottom = '12px';
})