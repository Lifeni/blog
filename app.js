'use strict';

const fs = require('fs');
const highlight = require('highlight.js');
const markdown = require('markdown-it')({
    // 代码高亮
    highlight(str, lang) {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(lang, str, true).value;
            } catch (e) {
                console.log(e);
            }
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
    constructor() { this.articles = []; }
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
            `<div class="card article" data-keyword="${index.get('keyword').toLowerCase()}" data-date="${index.get('modified').toLowerCase()}">
                <a href="/article/${index.get('name')}/">
                    <span class="group info">
                        <span class="point color" data-keyword="${index.get('keyword').toLowerCase()}"></span>
                        <span class="text keyword">${index.get('keyword')}</span>
                        <span class="text date">${moment(index.get('modified')).month() + 1} 月 ${moment(index.get('modified')).date()} 日</span>
                    </span>
                    <span class="text title">${index.get('title')}</span>
                    <span class="text description">${index.get('description')}</span>
                    <div class="bar article" title="查看标题为《${index.get('title')}》的文章"></div>
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
            `<label class="label tag color" title="筛选标签为 ${name} 的文章" tabindex="0">
                <input type="radio" class="radio tag" data-keyword="${name.toLowerCase()}" id="radio-${name.toLowerCase()}" name="tag" value="${name} ${count}">
                <span class="point color" data-keyword="${name.toLowerCase()}"></span>
                <span class="text">${name} ${count}</span>
             </label>`;
    }

    dataTag +=
        `<label class="label tag hide reset" id="label-reset" title="清除标签" tabindex="0">
            <input type="radio" class="radio tag" data-keyword="reset" id="radio-reset" name="tag" value="清除标签">
            清除标签
         </label>`;

    // 插入时间线
    let dataMonth = '';
    for (let [month, count] of months) {
        dataMonth +=
            `<label class="label month" title="筛选修改时间在 ${moment(month).year()} 年 ${moment(month).month() + 1} 月 的文章" tabindex="0">
                <input type="checkbox" id="${month}" class="checkbox month">
                <span class="text count">${count}</span>${moment(month).year()} 年 ${moment(month).month() + 1} 月
             </label>`;
    }

    // 生成首页
    template = template.replace(/{{文章列表}}/, dataList);
    template = template.replace(/{{标签列表}}/, dataTag);
    template = template.replace(/{{时间线}}/, dataMonth);
    fs.writeFileSync('./public/index.html', template);
}

function creatArticle(info, data, template) {

    // 图片懒加载
    data = data.replace(/src/g, 'data-src');

    // 添加文章元数据
    const infoData = `<div class="text info" id="text-info">
            <span>创建于 ${moment(info.get('created')).year()} 年 ${moment(info.get('created')).month() + 1} 月 ${moment(info.get('created')).date()} 日</span>
            <span>修改于 ${moment(info.get('modified')).year()} 年 ${moment(info.get('modified')).month() + 1} 月 ${moment(info.get('modified')).date()} 日</span>
            <span>${info.get('license')}</span>
        </div>`

    // 生成文章页
    template = template.replace(/{{文章描述}}/, info.get('description'));
    template = template.replace(/{{文章标题}}/, info.get('title'));
    template = template.replace(/{{文章关键词}}/, info.get('keyword').toLowerCase());
    template = template.replace(/{{文章信息}}/, infoData);
    template = template.replace(/{{文章内容}}/, data);

    // 如果目录不存在则创建
    try {
        fs.mkdirSync(`./public/article/${info.get('name')}`, { recursive: true });
    } catch (e) {
        console.log(e);
    }

    fs.writeFileSync(`./public/article/${info.get('name')}/index.html`, template);
}
