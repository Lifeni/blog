'use strict';

const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

let data = {
    token: '',
    password: (JSON.parse(fs.readFileSync('./database/password.json'))).password,
};

function token() {
    let hmac = crypto.createHmac('sha256', (new Date()).toLocaleDateString());
    hmac.update((new Date()).getTime().toString());
    data.token = hmac.digest('hex').slice(0, 10);
    console.log(data.token);
    return { token: data.token };
}


function password(token, password) {
    if (token === data.token && password === data.password) {
        return { result: true };
    } else {
        return { result: false };
    }
}

function check(token) {
    if (token === data.token) {
        return true;
    } else {
        return false;
    }
}

function article(token) {
    if (token === data.token) {
        const adapter = new FileSync('./database/articles.json');
        const db = low(adapter);
        return db.get('article').value();
    } else {
        return { error: 1 }
    }
}

function message(token) {
    if (token === data.token) {
        const adapter = new FileSync('./database/messages.json');
        const db = low(adapter);
        return db.get('message').value();
    } else {
        return { error: 1 }
    }
}

function file(files) {
    for (let i = 0; i < files.length; i++) {
        let stream = fs.createWriteStream(`./markdown/${files[i].originalname}`);
        stream.write(files[i].buffer);
        stream.end();
    }
    return files.map((e) => {
        return e.originalname;
    });
}

module.exports = {
    token,
    password,
    check,
    article,
    message,
    file
}