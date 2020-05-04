'use strict';

const homeMaker = require('./components/home-maker');
const articleMaker = require('./components/article-maker');

async function queue() {
    console.time('Work');
    await homeMaker.work();
    await articleMaker.work();
    console.timeEnd('Work');
}

queue();

