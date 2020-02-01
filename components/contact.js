'use strict';

const fs = require('fs');
const moment = require('moment');

function save(body) {
    const path = './messages/';
    fs.writeFileSync(path + moment().format() + '.json', JSON.stringify(body), (err) => {
        if (err) {
            console.error(err);
        }
    })
}

module.exports = {
    save,
}