'use strict';

const moment = require('moment');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database/messages.json');
const db = low(adapter);

db.defaults({
    message: [],
    count: 0
}).write();

function save(body) {
    db.get('message').push({
        date: moment().format(),
        email: body.email,
        message: body.message
    }).write()

    db.update('count', n => n + 1).write()
}

module.exports = { save }