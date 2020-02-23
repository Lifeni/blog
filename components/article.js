'use strict';

const fs = require('fs');
const highlight = require('highlight.js');
const markdown = require('markdown-it')({
    // 代码高亮
    highlight: function (str, lang) {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(lang, str, true).value;
            } catch (__) { }
        }
        return '';
    }
});

const moment = require('moment');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database/articles.json');
const db = low(adapter);

db.defaults({
    date: 'NULL',
    article: [],
    count: 0
}).write();

// 储存数据的变量
let articles = new Array();
let articlesIndex = new Array();

// 对 Markdown 文件进行解析
function parse() {
    // 初始化
    articles = new Array();
    articlesIndex = new Array();
    const path = './markdown/';
    db.set('date', '').set('article', []).set('count', 0).write();
    // 读取 md 文件
    fs.readdir(path, (err, files) => {
        if (err) {
            console.error(err);
        }

        files.forEach((file) => {
            fs.readFile(path + file, (err, data) => {
                if (err) {
                    console.error(err);
                }

                let lines = new Array();
                let content = new String();
                let article = new Object();
                let articleIndex = new Object();
                let flag = 0;

                // 把数据按行分割
                lines = data.toString().split("\n");
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith("---")) {
                        // 识别元数据开始和结束标志
                        flag++;
                        if (flag === 2) {
                            articlesIndex.push(articleIndex);
                            // 将数据写入文件
                            db.set('date', moment().format()).write();
                            db.get('article').push(articleIndex).write();
                            db.update('count', n => n + 1).write();
                        }
                    } else if (flag < 2) {
                        // 解析元数据
                        let temp = new Array();
                        temp = lines[i].split(": ");
                        article[temp[0]] = temp[1];
                        articleIndex[temp[0]] = temp[1];
                    } else if (i === lines.length - 1) {
                        // 数据读到最后一行
                        // 将数据保存在变量中
                        content += lines[i] + "\n";
                        article['content'] = markdown.render(content);
                        articles.push(article);
                    } else {
                        // 读取文章内容
                        content += lines[i] + "\n";
                    }
                }
            })
        })
    })
}


let cache = {
    update: null,
    all: null
}

// 返回文章列表
function update() {
    if (cache.update === null) {
        articlesIndex.sort((a, b) => {
            if (a['modified'] !== b['modified']) {
                return a['modified'] < b['modified'];
            } else {
                return a['created'] < b['created'];
            }
        })
        cache.update = articlesIndex[0];
    }
    return cache.update;
}

function all() {
    if (cache.all === null) {
        articlesIndex.sort((a, b) => {
            if (a['created'] !== b['created']) {
                return a['created'] < b['created'];
            } else {
                return a['modified'] < b['modified'];
            }
        })
        cache.all = articlesIndex;
    }
    return cache.all;
}

// 返回指定文章内容
function content(name) {
    let data;
    articles.forEach((article) => {
        if (article['name'] === name) {
            data = article['content'];
        }
    })
    return data;
}

module.exports = {
    parse,
    update,
    all,
    content,
}