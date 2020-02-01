# Lifeni 个人网站

这是一个关于“记录”的个人网站。

大概在 [https://lifeni.top/#/](https://lifeni.top/#/)。

## 过去

曾经是有一个这样的仓库，由于使用不规范，仓库越来越大，为以后考虑，新开一个仓库。

原仓库备份在了 Gitee 上：[archive-lifeni.top: 个人网站，仅用于学习交流用途。](https://gitee.com/Lifeni/archive-lifeni.top)

## 技术

前端没有使用第三方的库或者框架，代码均为自己编写。

后端使用 Node.js，负责解析 Markdown 数据和接收前端的表单数据。

项目主要文件及目录说明如下：

| 文件名或目录名        | 说明                                          |
| --------------------- | --------------------------------------------- |
| components/           | node 的组件，用于处理不同任务                 |
| components/article.js | 解析 markdown 文件夹中的 md 文件，发送给前端  |
| components/contact.js | 接收前端表单信息，并存入 messages 文件夹      |
| database/             | [需自建] 解析后的文章元数据会以 json 格式存入 |
| markdown/             | [需自建] 存放文章，需要在开头添加元数据       |
| messages/             | [需自建] 接收的消息以 json 格式存入           |
| public/               | 存放前端文件                                  |
| app.js                | node 的程序入口                               |

## 协议相关

本项目以 MIT License 开放源代码。

网站内所有知识性内容，如无特殊说明，均以 CC-BY-SA-4.0 进行共享。