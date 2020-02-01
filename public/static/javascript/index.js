'use strict';

// 网页加载后判断当前状态
document.addEventListener('DOMContentLoaded', () => {
    hashListener()
})

// 监听 hash 变化
window.addEventListener('hashchange', () => {
    hashListener();
})

// 对 hash 变化做出响应
function hashListener() {
    let hash = document.location.hash.split('/');
    let root = hash[0];
    let path = hash[1];
    let name = hash[2];

    if (root === undefined || root === '') {
        document.location.hash = '/';
    } else if (root === '#') {
        if (path === undefined || path === '') {
            getList();
            pageChanger('#home-content')
        } else if (path === 'article') {
            if (name === undefined || name === '') {
                document.location.hash = '/';
            } else {
                getArticle(name);
                pageChanger('#article-content');
            }

        } else if (path === 'contact') {
            pageChanger('#contact-content');
        } else {
            document.location.hash = '/';
        }
    }
}

// 更改内容页
function pageChanger(name) {
    let all = document.querySelectorAll('.content');
    all.forEach((element) => {
        element.classList.remove('show');
    })
    let target = document.querySelector(name);
    target.classList.add('show');
}

// 获取文章列表
function getList() {
    let requset = new XMLHttpRequest();
    requset.onreadystatechange = () => {
        if (requset.readyState === 4 && requset.status === 200) {
            let data = JSON.parse(requset.responseText);
            let content = document.querySelector('#home-content');
            content.innerHTML = '';
            for (let i in data) {
                // 使用模板复制列表项目
                let template = document.querySelector('#home-template');
                let clone = document.importNode(template.content, true);
                clone.querySelector('.item').setAttribute('id', data[i].name);
                clone.querySelector('.title').innerText = data[i].title;
                clone.querySelector('.title').setAttribute('href', '/#/article/' + data[i].name);
                clone.querySelector('.description').innerText = data[i].description;
                clone.querySelector('.date').innerText = data[i].modified;
                content.appendChild(clone);
            }
        }
    }
    requset.open('GET', 'https://lifeni.top/api/article');
    requset.send();
}

// 获取指定文章内容
function getArticle(name) {
    let article = document.querySelector('#article-content').querySelector('article');
    article.innerHTML = '';
    document.body.scrollTop = 0;
    let requset = new XMLHttpRequest();
    requset.onreadystatechange = () => {
        if (requset.readyState === 4 && requset.status === 200) {
            let data = requset.responseText;
            if (data === '') {
                article.innerHTML = '<h1>找不到该文章。</h1>'
            } else {
                article.innerHTML = data;
            }
        }
    }
    requset.open('GET', 'https://lifeni.top/api/article/' + name);
    requset.send();
}

// 发送消息
let contact = document.querySelector('#form-contact');
contact.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(contact);
    let requset = new XMLHttpRequest();
    requset.onreadystatechange = () => {
        if (requset.readyState === 4 && requset.status === 200) {
            let submit = document.querySelector('#contact-submit');
            submit.value = '💖 消息已发送';
            submit.disabled = 'true';
        }
    }
    requset.open('POST', 'https://lifeni.top/api/contact');
    requset.send(data);
})

let dark = document.querySelector('#dark-mode');
dark.addEventListener('click', () => {
    let html = document.querySelector('html');
    if (html.getAttribute('dark-mode') === 'false') {
        html.setAttribute('dark-mode', 'true');
        dark.innerText = '🌝 变亮';
    } else {
        html.setAttribute('dark-mode', 'false');
        dark.innerText = '🌚 变暗';
    }
})

let like = document.querySelector('#like-it');
let likeCount = 0;
like.addEventListener('click', () => {
    likeCount++;
    if (likeCount === 1) {
        let span = document.createElement('span');
        span.className = 'danmaku';
        span.innerText = '虽然我收不到，但还是感谢你的好评。';
        span.style.top = '70vh';
        document.body.appendChild(span);
        let width = document.body.clientWidth;
        let left = width + 10;
        span.style.left = left + 'px';
        let loop = setInterval(() => {
            left -= 20;
            span.style.left = left + 'px';
            if (left < -1 * span.clientWidth) {
                clearInterval(loop);
            }
        }, 200);
    } else if (likeCount === 2) {
        let span = document.createElement('span');
        span.className = 'danmaku';
        span.innerText = '收不到的原因？当然是懒得写啦。';
        span.style.top = '80vh';
        document.body.appendChild(span);
        let width = document.body.clientWidth;
        let left = width + 10;
        span.style.left = left + 'px';
        let loop = setInterval(() => {
            left -= 20;
            span.style.left = left + 'px';
            if (left < -1 * span.clientWidth) {
                clearInterval(loop);
            }
        }, 200);
    }
})