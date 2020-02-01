'use strict';

const fs = require('fs');
const highlight = require('highlight.js');
const markdown = require('markdown-it')({
    // 代码高亮
    highlight: function (str, lang) {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(lang, str, true).value;
            } catch (__) {}
        }
        return '';
    }
});

// 储存数据的变量
let articles = new Array();
let articlesIndex = new Array();

// 对 Markdown 文件进行解析
function parse() {
    // 初始化
    articles = [];
    articlesIndex = [];
    const path = './markdown/';
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
                        // 将数据写入文件
                        fs.writeFileSync('./database/db.json', JSON.stringify(articlesIndex), (err) => {
                            if (err) {
                                console.error(err);
                            }
                        })
                    } else {
                        // 读取文章内容
                        content += lines[i] + "\n";
                    }
                }
            })
        })
    })
}


// 返回文章列表
function list() {
    articlesIndex.sort((a, b) => {
        if (a['modified'] !== b['modified']) {
            return a['modified'] < b['modified'];
        } else {
            return a['created'] < b['created'];
        }
    })
    return articlesIndex;
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
    list,
    content,
}