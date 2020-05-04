'use strict';

const fs = require('fs');

class List {
    constructor() {
        this.projects = [];
    }

    set project(data) {
        this.projects.push(data);
    }

    get project() {
        return this.projects;
    }
}

const projectList = new List();
async function work() {
    const file = fs.readFileSync('./data/projects.json');
    const projects = JSON.parse(file.toString());
    for (const project of projects) {
        projectList.project = project;
    }
}

module.exports = {
    work: work,
    infos: projectList.project
};