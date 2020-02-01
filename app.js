'use strict';

const express = require('express');
const multer = require('multer');
const schedule = require('node-schedule');

const article = require('./components/article');
const contact = require('./components/contact');

const app = express();

app.listen(2333, '127.0.0.1', () => {
    article.parse();
    console.log('服务运行于 2333 端口');
});

app.all('*', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Metheds': 'GET, POST',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
    })
    next();
})

app.get('/api/article', (req, res) => {
    res.json(article.list());
    res.end();
});

app.get('/api/article/:name', (req, res) => {
    res.send(article.content(req.params.name));
    res.end();
});

app.post('/api/contact', multer().none(), (req, res) => {
    contact.save(req.body);
    res.end();
});

// 每天早上 2：00 执行解析
schedule.scheduleJob('0 0 2 * * *', () => {
    article.parse();
    let date = new Date();
    console.log('Markdown 解析于 ' + date.toLocaleString('zh-CN', {
        hour12: false
    }));
})