'use strict';

const fs = require('fs');
const highlight = require('highlight.js');
const log4js = require('log4js');
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
});
const moment = require('moment');

class Index {
    constructor() { this.articles = new Array(); }
    add(data) { this.articles.push(data); }
    getAll() { return this.articles; }
    getLast() { return this.articles[this.articles.length - 1]; }
    sort() { this.articles.sort((a, b) => (a.get('modified') < b.get('modified'))) }
    clear() { this.articles = []; }
}

let list = new Index();

function parse() {
    list.clear();
    let files = fs.readdirSync('./markdown/');
    let template = fs.readFileSync('./template/article.template.html').toString();
    for (const fileName of files) {
        markdown.use(require('markdown-it-front-matter'), (fm) => {
            let map = new Map();
            let lines = fm.split('\n');
            for (const line of lines) {
                map.set(line.split(': ')[0], line.split(': ')[1]);
            }
            list.add(map);
        });
        let file = fs.readFileSync(`./markdown/${fileName}`).toString();
        let data = markdown.render(file);
        creatArticle(list.getLast(), data, template);
    }
    list.sort();
    creatHome();
}


function creatHome() {
    let template = fs.readFileSync('./template/home.template.html').toString();
    let data = '';
    let tags = new Map();
    for (const index of list.getAll()) {
        data +=
            `<div class="card" keyword="${index.get('keyword').toLowerCase()}">
                <a href="/article/${index.get('name')}">
                    <span class="info">${index.get('keyword')} | ${index.get('modified')}</span>
                    <span class="title">${index.get('title')}</span>
                    <span class="description">${index.get('description')}</span>
                    <div class="bar"></div>
                </a>
            </div>`;

        let tag = index.get('keyword');
        if (tags.has(tag)) {
            let count = tags.get(tag)
            tags.set(tag, ++count);
        } else {
            tags.set(tag, 1);
        }
    }
    let data2 = '';
    tags = Array.from(tags).sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] > b[0];
        } else {
            return a[1] < b[1];
        }
    });
    for (let [name, count] of tags) {
        data2 += `<a href="/#/tag/${name.toLowerCase()}" class="tag" keyword="${name.toLowerCase()}">${name} ${count}</a>`
    }
    data2 += `<a href="/#/" class="tag hide" id="clear" keyword="clear">清除标签</a>`
    template = template.replace(/{{INSERT-0}}/, moment().format());
    template = template.replace(/{{INSERT-1}}/, data);
    template = template.replace(/{{INSERT-2}}/, data2)
    fs.writeFileSync('./public/index.html', template);
}

function creatArticle(info, data, template) {
    try {
        fs.mkdirSync(`./public/article/${info.get('name')}`, { recursive: true });
    } catch (e) {
        console.log('目录已存在');
    }

    data =
        `<span class="bread">
            <a href="/">Home</a> / <a href="/#/tag/${info.get('keyword').toLowerCase()}">${info.get('keyword')}</a> / ${info.get('name')}
        </span>
        <div class="info" id="info">
            <span>创建于 ${info.get('created')}</span>
            <span>修改于 ${info.get('modified')}</span>
            <span>署名-相同方式共享 4.0 国际</span>
            <hr>
        </div>` + data;
    template = template.replace(/{{INSERT-0}}/, info.get('description'));
    template = template.replace(/{{INSERT-1}}/, info.get('title'));
    template = template.replace(/{{INSERT-2}}/, info.get('keyword').toLowerCase());
    template = template.replace(/{{INSERT-3}}/, data);
    fs.writeFileSync(`./public/article/${info.get('name')}/index.html`, template);
}


module.exports = { parse }