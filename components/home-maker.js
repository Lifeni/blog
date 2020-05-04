'use strict';

const fs = require('fs');
const moment = require('moment');

const markdownParser = require('./markdown-parser');
const jsonParser = require('./json-parser');

let template = fs
    .readFileSync('./template/home.template.html')
    .toString();

async function work() {
    await jsonParser.work();
    const infos = jsonParser.infos;
    await createProject(infos);

    await markdownParser.work();
    const indexs = markdownParser.indexs;
    await createArticle(indexs);

    fs.writeFileSync('./public/index.html', template);
}

async function createProject(infos) {
    const html = {
        links: '',
        projects: ''
    }

    for (const info of infos) {
        html.links = '';
        for (const link of info.links) {
            html.links +=
                `<a href="${link.url}"
                    class="link ${link.type}">
                        ${link.text}
                 </a>`
        }

        html.projects +=
            `<div class="board project">
                <div class="info">
                    <span class="text status">
                    ${info.status}
                    </span>
                    <span class="text language">
                        ${info.languages.join(' / ')}
                    </span>
                </div>
                <div class="content">
                    <h2 class="text name">
                        ${info.name}
                    </h2>
                    <span class="text description">
                        ${info.description}
                    </span>
                </div>
                <div class="bar">
                    ${html.links}
                </div>
            </div>`
    }

    template = template
        .replace(/{{项目列表}}/, html.projects);
}

// 根据模板创建首页
async function createArticle(indexs) {
    indexs = indexs.sort(
        (a, b) =>
            (a.get('modified') < b.get('modified'))
    );

    const html = {
        articles: '',
        tags: '',
        months: ''
    }

    let tags = new Map();
    let months = new Map();

    for (const index of indexs) {
        // 添加文章卡片
        html.articles +=
            `<div class="card article"
                  data-keyword="${index.get('keyword').toLowerCase()}"
                  data-date="${index.get('modified').toLowerCase()}">
                <a href="/article/${index.get('name')}/">
                    <span class="group info">
                        <span class="point color"
                              data-keyword="${index.get('keyword').toLowerCase()}">
                        </span>
                        <span class="text keyword">
                            ${index.get('keyword')}
                        </span>
                        <span class="text date">
                            ${moment(index.get('modified')).month() + 1} 月
                            ${moment(index.get('modified')).date()} 日
                        </span>
                    </span>
                    <span class="text title">
                        ${index.get('title')}
                    </span>
                    <span class="text description">
                        ${index.get('description')}
                    </span>
                    <div class="bar article"
                         title="查看标题为《${index.get('title')}》的文章">
                    </div>
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
    tags = Array.from(tags).sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] > b[0];
        } else {
            return a[1] < b[1];
        }
    });

    // 插入标签
    for (const [name, count] of tags) {
        html.tags +=
            `<label class="label tag color"
                    title="筛选标签为 ${name} 的文章"
                    tabindex="0">
                <input type="radio"
                       class="radio tag"
                       data-keyword="${name.toLowerCase()}"
                       id="radio-${name.toLowerCase()}"
                       name="tag"
                       value="${name} ${count}">
                <span class="point color"
                      data-keyword="${name.toLowerCase()}">
                </span>
                <span class="text">
                    ${name} ${count}
                </span>
             </label>`;
    }

    html.tags +=
        `<label class="label tag hide reset"
                id="label-reset"
                title="清除标签"
                tabindex="0">
            <input type="radio"
                   class="radio tag"
                   data-keyword="reset"
                   id="radio-reset"
                   name="tag"
                   value="清除标签">
            清除标签
         </label>`;

    // 插入时间线
    for (const [month, count] of months) {
        html.months +=
            `<label class="label month"
                    title="筛选修改时间在
                        ${moment(month).year()} 年
                        ${moment(month).month() + 1} 月 的文章"
                    tabindex="0">
                <input type="checkbox"
                       id="${month}"
                       class="checkbox month">
                <span class="text count">
                    ${count}
                </span>
                ${moment(month).year()} 年
                ${moment(month).month() + 1} 月
             </label>`;
    }

    // 生成首页
    template = template
        .replace(/{{文章列表}}/, html.articles)
        .replace(/{{标签列表}}/, html.tags)
        .replace(/{{时间线}}/, html.months);
}

module.exports = {
    work: work
};