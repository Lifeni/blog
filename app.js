'use strict';

const log4js = require('log4js');
log4js.configure({
    appenders: {
        console: { type: 'stdout' },
        node: { type: 'file', filename: './log/node.log' }
    },
    categories: { default: { appenders: ['console', 'node'], level: 'info' } }
});
const logger = log4js.getLogger('app');
const schedule = require('node-schedule');
const article = require('./components/article');

logger.info('Node 服务启动');
article.parse();

// 每天早上 2：00 执行解析
schedule.scheduleJob('0 0 2 * * *', () => {
    article.parse();
})