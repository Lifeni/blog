'use strict';

document.addEventListener('DOMContentLoaded', () => {
    hashListener();
})

window.addEventListener('hashchange', () => {
    hashListener();
});

function hashListener() {
    const hash = document.location.hash.split('/');
    const [root, path, name] = hash;
    if (path === undefined || path === '') {
        articleFilter('none');
    } else if (path === 'tag') {
        if (name === undefined || name === '') {
            document.location.hash = '/';
        } else {
            articleFilter('tag', name);
        }
    } else if (path === 'search') {
        if (name === undefined || name === '') {
            document.location.hash = '/';
        } else {
            articleFilter('search', name);
        }
    } else {
        document.location.hash = '/';
    }
}

function articleFilter(method, value) {
    const cards = document.querySelectorAll('.card');
    const clear = document.querySelector('#clear');
    const empty = document.querySelector('#empty');
    clear.classList.add('hide');
    empty.classList.add('hide');
    if (method === 'none') {
        for (let card of cards) {
            card.classList.remove('hide');
        }
    } else if (method === 'tag') {
        clear.classList.remove('hide');
        for (let card of cards) {
            card.classList.add('hide');
            if (card.getAttribute('keyword') === value) {
                card.classList.remove('hide');
            }
        }
    } else if (method === 'search') {
        value.replace(/\+/g, ' ');
        let count = 0;
        for (let card of cards) {
            const text = card.innerText.toLowerCase();
            count++;
            card.classList.add('hide');
            if (text.includes(decodeURI(value).toLowerCase())) {
                count--;
                card.classList.remove('hide');
            }
        }
        if (count === cards.length) {
            empty.classList.remove('hide');
        }
    }
}

const search = document.querySelector('#search');
search.addEventListener('input', (e) => {
    if (!e.target.value.startsWith(' ')) {
        document.location.hash = '/search/' + e.target.value.replace(/\s/g, '+');
    }
})

const down = document.querySelector('#down');
down.addEventListener('click', () => {
    window.scrollTo(0, document.body.scrollHeight);
})

const more = document.querySelector('#more');
more.addEventListener('click', () => {
    alert('功能未完成。')
})