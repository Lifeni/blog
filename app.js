'use strict';

const express = require('express');
const parser = require('body-parser');
const multer = require('multer');
const schedule = require('node-schedule');

const article = require('./components/article');
const contact = require('./components/contact');
const consolex = require('./components/console');

const app = express();

let jsonParser = parser.json();

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
    // 获取文章索引
    let a = {
        update: article.update(),
        all: article.all()
    }
    res.json(a);
    res.end();
});

app.get('/api/article/:name', (req, res) => {
    // 获取指定文章
    res.send(article.content(req.params.name));
    res.end();
});

app.post('/api/contact', multer().none(), (req, res) => {
    // 联系我
    contact.save(req.body);
    res.end();
});

app.get('/api/console/token', (req, res) => {
    // 获取令牌
    res.json(consolex.token())
    res.end();
});

app.post('/api/console/password', jsonParser, (req, res) => {
    // 验证密码
    res.json(consolex.password(req.body.token, req.body.password))
    res.end();
});

app.get('/api/console/restart', (req, res) => {
    // 查看消息
    if (consolex.check(req.query.token)) {
        article.parse();
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
    res.end();
});

app.get('/api/console/message', (req, res) => {
    // 查看消息
    res.json(consolex.message(req.query.token))
    res.end();
});

app.get('/api/console/article', (req, res) => {
    // 查看文章索引
    res.json(consolex.article(req.query.token))
    res.end();
});

app.post('/api/console/file', multer().any(), (req, res) => {
    // 文章操作
    if (consolex.check(req.query.token)) {
        res.json(consolex.file(req.files));
        article.parse();
    } else {
        res.json({ error: 1 });
    }
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