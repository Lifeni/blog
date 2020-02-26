'use strict'

let root = document.querySelector('#console');

// 临时储存令牌和密码
let key = {
    token: '',
    password: '',
};

document.addEventListener('DOMContentLoaded', () => {
    getTime();
    getToken();
})

// 获取当前时间
function getTime() {
    Message((new Date()).toLocaleString('zh-CN', {
        hour12: false
    }));
    Separator();
}

// 从服务器获取令牌
// 令牌用于身份验证，同时只能存在一块有效令牌
function getToken() {
    Message('--> 正在与服务器连接');
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            Message('<-> 已建立连接');
            let data = JSON.parse(request.responseText);
            key.token = data.token;
            Message(`<-- 取得令牌 [${data.token}]`);
            Separator();
            enterPassword();
        }
    }
    request.open('GET', 'https://lifeni.life/api/console/token');
    request.send();
}

// 输入密码的监听
function enterPassword() {
    let p = document.createElement('p');
    p.innerText = '输入密码：';
    root.appendChild(p);
    let input = document.querySelector('#input');
    input.value = '';
    input.addEventListener('input', function inputPassword(e) {
        let code = '';
        for (let i = 0; i < e.target.value.length; i++) {
            code += '/';
        }
        p.innerText = `输入密码：${code}`;
        if (e.target.value.length === 6) {
            key.password = e.target.value;
            verifyPassword();
            input.removeEventListener('input', inputPassword);
            input.value = '';
            p.innerText = '输入密码：';
        }
    })
    Separator();
}

// 验证密码
function verifyPassword() {
    Message('--> 正在验证密码');
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            let input = document.querySelector('#input');
            if (data.result === true) {
                Message('<○> 验证成功');
                Separator();
                getAction();
            } else if (data.result === false) {
                Message('<×> 验证失败，令牌失效');
                Separator();
            }
        }
    }
    request.open('POST', 'https://lifeni.life/api/console/password');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(key));
}

// 执行具体操作
function getAction() {
    // 命令输入区域
    let p = document.createElement('p');
    p.innerText = '>>> ';
    root.appendChild(p);
    Separator();
    // 响应显示区域
    let div = document.createElement('div');
    root.appendChild(div);
    // 输入框，隐藏的，通过监听输入事件判断命令
    let input = document.querySelector('#input');
    input.value = '';
    input.addEventListener('input', function inputAction(e) {
        p.innerText = `>>> ${e.target.value}`;
        if (e.target.value === 'exit') {
            // 退出控制台，刷新页面重新获取令牌可以使原来的令牌失效
            Message('终止控制台，即将刷新页面');
            Separator();
            setTimeout(() => {
                location.reload();
            }, 1000);
            input.removeEventListener('input', inputAction);
        } else if (e.target.value === 'article') {
            // 获取文章索引
            div.innerHTML = '';
            Output('--> 正在获取文章信息', div);
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let data = JSON.parse(request.responseText);
                    if (data.length === 0) {
                        Output('<-> 无消息', div);
                        Separator(div);
                    } else if (data.error === 1) {
                        Output('<×> 令牌失效', div);
                    } else {
                        Output(`<-- 获取到 ${data.length} 条信息`, div);
                        Separator(div);
                        let count = 0;
                        data.forEach((e) => {
                            Output(`${++count} | ${e.modified} | ${e.title}`, div);
                        });
                    }
                    // 清空输入框和命令显示区域
                    input.value = '';
                    p.innerText += ' <<<';
                }
            }
            request.open('GET', `https://lifeni.life/api/console/article?token=${key.token}`);
            request.send();
        } else if (e.target.value === 'message') {
            // 获取消息
            div.innerHTML = '';
            Output('--> 正在获取消息', div);
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let data = JSON.parse(request.responseText);
                    if (data.length === 0) {
                        Output('<-> 无消息', div);
                    } else if (data.error === 1) {
                        Output('<×> 令牌失效', div);
                    } else {
                        Output(`<-- 获取到 ${data.length} 条信息`, div);
                        Separator(div);
                        data.forEach((e) => {
                            Output(`${(new Date(e.date)).toLocaleString('zh-CN', { hour12: false })}`, div);
                            Output(`${e.email}`, div);
                            Output(`${e.message}`, div);
                            Separator(div);
                        });
                    }
                    input.value = '';
                    p.innerText += ' <<<';
                }
            }
            request.open('GET', `https://lifeni.life/api/console/message?token=${key.token}`);
            request.send();
        } else if (e.target.value === 'restart') {
            // 重启文章解析系统
            div.innerHTML = '';
            Output('--> 正在重启服务', div);
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    let data = JSON.parse(request.responseText);
                    if (data.result === true) {
                        Output('<○> 执行成功', div);
                    } else if (data.result === false) {
                        Output('<×> 令牌失效，执行失败', div);
                    }
                    input.value = '';
                    p.innerText += ' <<<';
                }
            }
            request.open('GET', `https://lifeni.life/api/console/restart?token=${key.token}`);
            request.send();
        } else if (e.target.value === 'upload') {
            // 命令上传文件操作
            input.value = '';
            p.innerText = '>>> 上传文件 <<<';
            div.innerHTML = '';
            Output('--> 正在上传文件', div);
            let files = document.querySelector('form');
            let upload = document.querySelector('#upload');
            // 选择文件完成时，即对话框关闭后
            upload.addEventListener('change', function uploadAction() {
                let form = new FormData(files);
                let request = new XMLHttpRequest();
                request.onreadystatechange = () => {
                    if (request.readyState === 4 && request.status === 200) {
                        let data = JSON.parse(request.responseText);
                        if (data.length === 0) {
                            Output('<-> 无消息', div);
                        } else if (data.error === 1) {
                            Output('<×> 令牌失效', div);
                        } else {
                            Output(`<-- 获取到 ${data.length} 条信息`, div);
                            Separator(div);
                            let count = 0;
                            data.forEach((e) => {
                                Output(`${++count} | 完成 | ${e}`, div);
                            });
                        }
                        upload.removeEventListener('change', uploadAction);
                    }
                }
                request.open('POST', `https://lifeni.life/api/console/file?token=${key.token}`);
                request.send(form);
            });
            upload.click();
        }
    })
    // 拖动上传文件时
    let upload = document.querySelector('#upload');
    input.addEventListener('drop', function dropAction(e) {
        // 阻止默认操作
        e.preventDefault();
        e.stopPropagation();
        input.value = '';
        p.innerText = '>>> 上传文件 <<<';
        div.innerHTML = '';
        // 获得文件列表
        let files = e.dataTransfer.files;
        // 新建表单自己添加信息
        let form = new FormData();
        for (let i in files) {
            form.append('file-' + i, files[i]);
        }
        Output('--> 正在上传文件', div);
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                let data = JSON.parse(request.responseText);
                if (data.length === 0) {
                    Output('<-> 无消息', div);
                } else if (data.error === 1) {
                    Output('<×> 令牌失效', div);
                    input.removeEventListener('drop', dropAction);
                } else {
                    Output(`<-- 获取到 ${data.length} 条信息`, div);
                    Separator(div);
                    let count = 0;
                    data.forEach((e) => {
                        Output(`${++count} | 完成 | ${e}`, div);
                    });
                }
            }
        }
        request.open('POST', `https://lifeni.life/api/console/file?token=${key.token}`);
        request.send(form);
    })
    Separator();
}

// 添加一个消息行
function Message(text) {
    let p = document.createElement('p');
    p.innerText = text;
    root.appendChild(p);
}

// 在输出区域添加一个消息行
function Output(text, div) {
    let p = document.createElement('p');
    p.innerText = text;
    div.appendChild(p);
}

// 添加分割线
function Separator(div) {
    let hr = document.createElement('hr');
    if (div === undefined) {
        root.appendChild(hr);
    } else {
        div.appendChild(hr);
    }
}