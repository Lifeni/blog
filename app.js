'use strict';

const fs = require('fs');
const highlight = require('highlight.js');
const markdown = require('markdown-it')({
    // 代码高亮
    highlight(str, lang) {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(lang, str, true).value;
            } catch (__) { }
        }
        return '';
    }
}).use(require('markdown-it-abbr'))
    .use(require('markdown-it-anchor'))
    .use(require("markdown-it-table-of-contents"), {
        'includeLevel': [2, 3],
        'containerClass': 'toc'
    });
const moment = require('moment');

// 储存和获取文章数据
class Data {
    constructor() { this.articles = new Array(); }
    add(data) { this.articles.push(data); }
    getAll() { return this.articles; }
    getLast() { return this.articles[this.articles.length - 1]; }
    sort() { this.articles.sort((a, b) => (a.get('modified') < b.get('modified'))) }
}

// 文章数据实例
let dataArticle = new Data();

// 解析 markdown 文件
const files = fs.readdirSync('./markdown/');
const template = fs.readFileSync('./template/article.template.html').toString();
for (const fileName of files) {
    // 处理元数据
    markdown.use(require('markdown-it-front-matter'), (fm) => {
        let map = new Map();
        let lines = fm.split('\n');
        for (const line of lines) {
            map.set(line.split(': ')[0], line.split(': ')[1]);
        }
        dataArticle.add(map);
    });
    const file = fs.readFileSync(`./markdown/${fileName}`).toString() + '\n[[toc]]';
    const data = markdown.render(file)
        .replace(/`/g, '').replace(/%60/g, '')
        .replace(/\*/g, '').replace(/%22/g, '');

    // 创建文章网页
    creatArticle(dataArticle.getLast(), data, template);
}
// 按修改时间倒序
dataArticle.sort();
// 创建首页
creatHome();


// 根据模板创建首页
function creatHome() {
    let template = fs.readFileSync('./template/home.template.html').toString();
    let dataList = '';
    let tags = new Map();
    let months = new Map();
    for (const index of dataArticle.getAll()) {
        // 添加文章卡片
        dataList +=
            `<div class="card" data-keyword="${index.get('keyword').toLowerCase()}" data-date="${index.get('modified').toLowerCase()}">
                <a href="/article/${index.get('name')}/">
                    <span class="info">
                        <span class="keyword">${index.get('keyword')}</span>
                        <span class="date">${moment(index.get('modified')).month() + 1} 月 ${moment(index.get('modified')).date()} 日</span>
                    </span>
                    <span class="title">${index.get('title')}</span>
                    <span class="description">${index.get('description')}</span>
                    <div class="bar" title="查看标题为《${index.get('title')}》的文章"></div>
                </a>
            </div>`;
        // 统计文章标签
        const tag = index.get('keyword');
        if (tags.has(tag)) {
            let count = tags.get(tag)
            tags.set(tag, ++count);
        } else {
            tags.set(tag, 1);
        }
        // 统计文章时间
        const month = index.get('modified').slice(0, 7);
        if (months.has(month)) {
            let count = months.get(month);
            months.set(month, ++count);
        } else {
            months.set(month, 1);
        }
    }
    // 标签按数量排序
    let dataTag = '';
    tags = Array.from(tags).sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] > b[0];
        } else {
            return a[1] < b[1];
        }
    });
    // 插入标签
    for (let [name, count] of tags) {
        dataTag +=
            `<input type="radio" class="tag-radio" id="${name.toLowerCase()}" name="tag" data-keyword="${name.toLowerCase()}" value="${name} ${count}">
             <label for="${name.toLowerCase()}" class="tag" data-keyword="${name.toLowerCase()}" title="筛选标签为 ${name} 的文章" tabindex="0">${name} ${count}</label>`;
    }
    dataTag +=
        `<input type="radio" class="tag-radio" id="reset-radio" name="tag" data-keyword="reset" value="清除标签">
         <label for="reset" class="tag hide reset" id="reset" data-keyword="reset" title="清除标签" tabindex="0">清除标签</label>`;
    // 插入时间线
    let dataMonth = '';
    for (let [month, count] of months) {
        dataMonth +=
            `<div>
                <input type="checkbox" id="${month}" class="month-checkbox">
                <label for="${month}" class="month"  title="筛选修改时间在 ${moment(month).year()} 年 ${moment(month).month() + 1} 月 的文章" tabindex="0">
                    <span class="count">${count}</span>${moment(month).year()} 年 ${moment(month).month() + 1} 月
                </label>
             </div>`;
    }
    // 生成首页
    template = template.replace(/{{INSERT-0}}/, moment().format());
    template = template.replace(/{{INSERT-1}}/, dataList);
    template = template.replace(/{{INSERT-2}}/, dataTag);
    template = template.replace(/{{INSERT-3}}/, dataMonth);
    fs.writeFileSync('./public/index.html', template);
}

function creatArticle(info, data, template) {
    // 图片懒加载
    data = data.replace(/src/g, 'data-src');
    // 添加文章元数据
    data =
        `<span class="bread">
            <a href="/">lifeni.life</a> / article / ${info.get('name')}
        </span>
        <div class="info" id="info">
            <span>创建于 ${moment(info.get('created')).year()} 年 ${moment(info.get('created')).month() + 1} 月 ${moment(info.get('created')).date()} 日</span>
            <span>修改于 ${moment(info.get('modified')).year()} 年 ${moment(info.get('modified')).month() + 1} 月 ${moment(info.get('modified')).date()} 日</span>
            <span>署名-相同方式共享 4.0 国际</span>
            <hr>
        </div>` + data;
    // 生成文章页
    template = template.replace(/{{INSERT-0}}/, info.get('description'));
    template = template.replace(/{{INSERT-1}}/, info.get('title'));
    template = template.replace(/{{INSERT-2}}/, info.get('keyword').toLowerCase());
    template = template.replace(/{{INSERT-3}}/, data);
    // 如果目录不存在则创建
    fs.mkdirSync(`./public/article/${info.get('name')}`, { recursive: true });
    fs.writeFileSync(`./public/article/${info.get('name')}/index.html`, template);
}
