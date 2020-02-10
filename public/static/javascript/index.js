'use strict';

// 设计思路：
// 监听事件 --> 改变 Hash
// 监听 Hash --> 响应事件

// cache 储存获取的文章列表
let cache = [];
// flag 代表数据已从服务器获取
let flag = 0;

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
    let index = hash[3];

    if (root === undefined || root === '') {
        document.location.hash = '/';
    } else if (root === '#') {
        if (path === undefined || path === '') {
            // 主页
            document.title = 'Lifeni';
            if (flag === 0) {
                getList();
            }
            listChanger();
            pageChanger('#home');
        } else if (path === 'article') {
            // 文章页面
            if (name === undefined || name === '') {
                document.location.hash = '/';
            } else {
                if (flag === 0) {
                    // 当直接打开页面时
                    getList();
                    setTimeout(() => {
                        getArticle(name);
                    }, 100);
                    pageChanger('#article');
                } else {
                    if (index === undefined || index === '') {
                        // 当不存在目录锚点时
                        // 即点击锚点时不会刷新页面
                        getArticle(name);
                        pageChanger('#article');
                    }
                }
            }
        } else if (path === 'tag') {
            // 标签页面
            if (name === undefined || name === '') {
                document.location.hash = '/';
            } else {
                if (flag === 0) {
                    // 当直接打开页面时
                    getList();
                    setTimeout(() => {
                        getResult(name, 'tag');
                    }, 100);
                } else {
                    getResult(name, 'tag');
                }
                listChanger(path);
                pageChanger('#home');
            }
        } else if (path === 'search') {
            // 搜索页面
            if (name === undefined || name === '') {
                document.location.hash = '/';
            } else {
                if (flag === 0) {
                    // 当直接打开页面时
                    getList();
                    setTimeout(() => {
                        getResult(name, 'search');
                    }, 100);
                } else {
                    getResult(name, 'search');
                }
                listChanger(path);
                pageChanger('#home');
            }
        } else {
            // 其他情况跳转到主页
            document.location.hash = '/';
        }
    }
}

// 更改内容页
function pageChanger(name) {
    // 全部隐藏
    let all = document.querySelectorAll('.content');
    all.forEach((element) => {
        element.classList.remove('show');
    })
    // 显示目标
    let target = document.querySelector(name);
    target.classList.add('show');
}

// 更改主页的列表
function listChanger(name) {
    if (name === undefined) {
        // 主页
        document.querySelector('#list-result').classList.add('hide');
        document.querySelector('#list-update').classList.remove('hide');
        document.querySelector('#list-all').classList.remove('hide');
    } else {
        // 标签和搜索页面
        let list = document.querySelector('#list-result');
        list.classList.remove('hide');
        document.querySelector('#list-update').classList.add('hide');
        document.querySelector('#list-all').classList.add('hide');
    }
}

// 获得指定条件下的文章结果
function getResult(name, method) {
    let list = document.querySelector('#list-result');
    let template = document.querySelector('#home-template');
    // 清空前一次查询结果
    list.innerHTML = '';
    // 添加标题
    let node = document.createElement('div');
    node.className = 'list-title';
    node.innerText = decodeURI(name);
    list.appendChild(node);
    // map 去掉重复结果
    let de = new Map();
    // 对每个文章进行处理
    cache.forEach((e) => {
        if (method === 'tag') {
            // 标签页
            if (e.keyword === name) {
                let clone = document.importNode(template.content, true);
                clone.querySelector('.item').id = e.name;
                clone.querySelector('.item').href = '/#/article/' + e.name;
                clone.querySelector('.title').innerText = e.title;
                clone.querySelector('.description').innerText = e.description;
                clone.querySelector('.date').innerText = '创建于 ' + e.created;
                list.appendChild(clone);
            }
        } else if (method === 'search') {
            // 搜索页
            let word = decodeURI(name).split(' ');
            // 对空格分割的关键词进行匹配
            word.forEach((w) => {
                if (w !== '' && de[e.name] === undefined) {
                    // 不重复时
                    if (e.title.toLowerCase().includes(w.toLowerCase()) || e.description.toLowerCase().includes(w.toLowerCase()) || e.keyword.toLowerCase().includes(w.toLowerCase())) {
                        // 匹配标题、描述和关键词
                        de[e.name] = true;
                        let clone = document.importNode(template.content, true);
                        clone.querySelector('.item').id = e.name;
                        clone.querySelector('.item').href = '/#/article/' + e.name;
                        clone.querySelector('.title').innerText = e.title;
                        clone.querySelector('.description').innerText = e.description;
                        clone.querySelector('.date').innerText = '创建于 ' + e.created;
                        list.appendChild(clone);
                    }
                }
            })
        }
    })
}

// 获取文章列表
function getList() {
    let requset = new XMLHttpRequest();
    requset.onreadystatechange = () => {
        if (requset.readyState === 4 && requset.status === 200) {
            let data = JSON.parse(requset.responseText);
            cache = data.all;
            // flag 代表数据已从服务器获取
            flag = 1;
            let update = document.querySelector('#list-update');
            let all = document.querySelector('#list-all');
            let template = document.querySelector('#home-template');
            let clone = document.importNode(template.content, true);
            clone.querySelector('.item').id = data.update.name;
            clone.querySelector('.item').href = '/#/article/' + data.update.name;
            clone.querySelector('.item').setAttribute('tabindex', '2');
            clone.querySelector('.title').innerText = data.update.title;
            clone.querySelector('.description').innerText = data.update.description;
            if (data.update.created === data.update.modified) {
                clone.querySelector('.date').innerText = '创建于 ' + data.update.created;
            } else {
                clone.querySelector('.date').innerText = '更新于 ' + data.update.modified;
            }
            update.appendChild(clone);
            // tag 用于标签去重
            let tag = new Map();
            // 对文章列表遍历
            data.all.forEach((e) => {
                if (tag[e.keyword] === undefined) {
                    // 如果标签没被添加
                    tag[e.keyword] = 1;
                    let node = document.createElement('a');
                    node.innerText = e.keyword;
                    node.title = e.keyword;
                    node.href = '#/tag/' + e.keyword;
                    node.setAttribute('tabindex', '5');
                    node.setAttribute('aria-label', '文章标签');
                    let list = document.querySelector('#tag-list');
                    list.appendChild(node);
                } else {
                    tag[e.keyword]++;
                }
                // 使用模板复制列表项目
                let clone = document.importNode(template.content, true);
                clone.querySelector('.item').id = e.name;
                clone.querySelector('.item').href = '/#/article/' + e.name;
                clone.querySelector('.item').setAttribute('tabindex', '3');
                clone.querySelector('.title').innerText = e.title;
                clone.querySelector('.description').innerText = e.description;
                clone.querySelector('.date').innerText = '创建于 ' + e.created;
                all.appendChild(clone);
            });
            all.querySelector('.list-title').innerText += ' ' + data.all.length + ' 篇文章';
        }
    }
    requset.open('GET', 'https://lifeni.top/api/article');
    requset.send();
}

// 获取指定文章内容
function getArticle(name) {
    document.body.scrollTop = 0;
    let article = document.querySelector('#article').querySelector('article');
    article.innerHTML = '';
    let index = document.querySelector('#index');
    index.classList.remove('expand');
    // 加载慢时给提示
    setTimeout(() => {
        if (article.innerHTML === '') {
            article.innerHTML = '<h1>数据加载中。</h1>';
        }
    }, 100);
    // 添加文章信息
    let info = document.querySelector('#info');
    info.innerText = '';
    cache.forEach((e) => {
        if (e.name === name) {
            info.innerText += '最后编辑日期：' + e.modified;
            info.innerText += ' | ';
            info.innerText += ' 创建日期：' + e.created;
            info.innerText += ' | ';
            info.innerText += ' 共享协议：' + e.license;
        }
    })
    let requset = new XMLHttpRequest();
    requset.onreadystatechange = () => {
        if (requset.readyState === 4 && requset.status === 200) {
            let data = requset.responseText;
            if (data === '') {
                article.innerHTML = '<h1>找不到该文章。</h1>'
            } else {
                article.innerHTML = data;
                document.title = data.split('<h1>')[1].split('</h1>')[0] + ' - Lifeni';
                let heading = article.querySelectorAll('*');
                let list = document.querySelector('#index-list');
                list.innerHTML = '';
                let h2;
                heading.forEach((e) => {
                    // 提取 h2 和 h3，制作目录
                    if (e.nodeName === 'H2') {
                        let link = '/article/' + name + '/' + e.innerText;
                        e.id = link;
                        h2 = e.innerText;
                        let li = document.createElement('li');
                        let a = document.createElement('a');
                        a.href = '#' + link;
                        a.innerText = e.innerText;
                        li.appendChild(a);
                        li.className = 'index-item-1';
                        list.appendChild(li);
                    } else if (e.nodeName === 'H3') {
                        let link = '/article/' + name + '/' + h2 + '/' + e.innerText;
                        e.id = link;
                        let li = document.createElement('li');
                        let a = document.createElement('a');
                        a.href = '#' + link;
                        a.innerText = e.innerText;
                        li.appendChild(a);
                        li.className = 'index-item-2';
                        list.appendChild(li);
                    }

                })
            }
        }
    }
    requset.open('GET', 'https://lifeni.top/api/article/' + name);
    requset.send();
}


// 发送消息
let contact = document.querySelector('#contact');
contact.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(contact);
    let requset = new XMLHttpRequest();
    requset.onreadystatechange = () => {
        if (requset.readyState === 4 && requset.status === 200) {
            let submit = document.querySelector('#contact-submit');
            submit.value = '消息已发送';
            submit.disabled = 'true';
        }
    }
    requset.open('POST', 'https://lifeni.top/api/contact');
    requset.send(data);
})

// 移动端打开侧栏
let op = document.querySelector('#switch-open');
op.addEventListener('click', () => {
    let home = document.querySelector('#home');
    home.classList.add('switch-show');
})

// 移动端关闭侧栏
let ed = document.querySelector('#switch-close');
ed.addEventListener('click', () => {
    let home = document.querySelector('#home');
    home.classList.remove('switch-show');
})

// 搜索框监听
let search = document.querySelector('#search');
search.addEventListener('input', (e) => {
    document.location.hash = '/search/' + e.target.value;
})

// 回到顶部
let toTop = document.querySelector('#top');
toTop.addEventListener('click', () => {
    scrollTo(0, 0);
})

// 展开目录
let openIndex = document.querySelector('#open-index');
openIndex.addEventListener('click', () => {
    let index = document.querySelector('#index');
    index.classList.add('expand');
})

// 关闭目录
let closeIndex = document.querySelector('#close-index');
closeIndex.addEventListener('click', () => {
    let index = document.querySelector('#index');
    index.classList.remove('expand');
})