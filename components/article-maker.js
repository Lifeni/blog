'use strict';

const fs = require('fs');
const moment = require('moment');

const markdownParser = require('./markdown-parser');

async function work() {
    await markdownParser.work();
    const articles = markdownParser.articles;
    const indexs = markdownParser.indexs;
    for (let i = 0; i < articles.length; i++) {
        await createArticle(articles[i], indexs[i]);
    }
}

async function createArticle(article, index) {
    let template =
        fs.readFileSync('./template/article.template.html')
            .toString();

    // 图片懒加载
    article = article.replace(/src/g, 'data-src');

    // 添加文章元数据
    const infoData =
        `<div class="area info" id="area-info">
            <span class="text">
                创建于
                ${moment(index.get('created')).year()} 年
                ${moment(index.get('created')).month() + 1} 月
                ${moment(index.get('created')).date()} 日
            </span>
            <span class="text">
                修改于
                ${moment(index.get('modified')).year()} 年
                ${moment(index.get('modified')).month() + 1} 月
                ${moment(index.get('modified')).date()} 日
            </span>
            <span class="text">
                ${index.get('license')}
            </span>
         </div>`

    // 生成文章页
    template = template
        .replace(/{{文章描述}}/, index.get('description'))
        .replace(/{{文章标题}}/, index.get('title'))
        .replace(/{{文章关键词}}/, index.get('keyword').toLowerCase())
        .replace(/{{文章信息}}/, infoData)
        .replace(/{{文章内容}}/, article);

    // 如果目录不存在则创建
    try {
        fs.mkdirSync(
            `./public/article/${index.get('name')}`,
            { recursive: true }
        );
    } catch (e) {
        console.log(e);
    }

    fs.writeFileSync(
        `./public/article/${index.get('name')}/index.html`,
        template
    );
}


module.exports = {
    work: work
};