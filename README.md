# 个人网站

这是一个关于“记录”的个人网站。

大概在 [https://lifeni.life](https://lifeni.life)。

## 过去

曾经是有一个这样的仓库，由于使用不规范，仓库越来越大，为以后考虑，新开一个仓库。

原仓库备份在了 Gitee 上：[archive-lifeni.top: 个人网站，仅用于学习交流用途。](https://gitee.com/Lifeni/archive-lifeni.top)

## 技术

前端为静态网页，后端负责解析 markdown 文件并生成相应的 html 文件。 

项目主要文件及目录说明如下：

| 文件名或目录名            | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| components/               | node 的组件，用于处理不同任务                                |
| -- /article.js            | 解析 markdown 文件夹中的 md 文件，把数据插入 template 文件夹中的模板以生成 html 文件并存入 public 文件夹 |
| log/                      | [手动创建] 日志记录                                          |
| markdown/                 | [手动创建] 存放文章，需要在开头添加元数据                    |
| public/                   | 存放前端文件                                                 |
| -- /article/              | [自动创建] 文章页面                                          |
| -- /static/               | 存放 JS CSS 等文件                                           |
| -- /index.html            | [自动创建] 包含文章列表的首页                                |
| template/                 | 首页和文章页的模板文件                                       |
| -- /article.template.html | 文章页模板文件，由 components/article.js 处理                |
| -- /home.template.html    | 首页模板文件，由 components/article.js 处理                  |
| app.js                    | node 的程序入口                                              |

## 协议相关

本项目以 MIT License 开放源代码。

网站内所有知识性内容，如无特殊说明，均遵循 CC-BY-SA-4.0。