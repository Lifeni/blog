'use strict';

const schedule = require('node-schedule');
const article = require('./components/article');

article.parse();

// 每天早上 2：00 执行解析
schedule.scheduleJob('0 0 2 * * *', () => {
    article.parse();
})