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

// 储存和获取文章数据
class List {
    constructor() {
        this.articles = [];
        this.indexs = [];
    }

    set article(data) {
        this.articles.push(data);
    }

    get article() {
        return this.articles;
    }

    set index(data) {
        this.indexs.push(data)
    }

    get index() {
        return this.indexs;
    }

    sort() {
        this.articles.sort(
            (a, b) => (a.get('modified') < b.get('modified'))
        )
    }
}

// 文章数据实例
const articleList = new List();
async function work() {
    // 解析 markdown 文件
    const files = fs.readdirSync('./markdown/');
    for (const fileName of files) {
        // 处理元数据
        markdown.use(require('markdown-it-front-matter'), (fm) => {
            let map = new Map();
            let lines = fm.split('\n');
            for (const line of lines) {
                map.set(line.split(': ')[0], line.split(': ')[1]);
            }
            articleList.index = map;
        });

        const file = `${fs.readFileSync(`./markdown/${fileName}`).toString()}[[toc]]`;
        articleList.article = markdown.render(file)
            .replace(/`/g, '')      // 转义锚点 id 中的符号
            .replace(/%60/g, '')
            .replace(/\*/g, '')
            .replace(/%22/g, '');
    }
}

module.exports = {
    work: work,
    articles: articleList.article,
    indexs: articleList.index
};