# 个人网站

这是一个关于“记录”的个人网站。

大概在 [https://lifeni.life](https://lifeni.life)。

## 过去

曾经是有一个这样的仓库，由于使用不规范，仓库越来越大，为以后考虑，新开一个仓库。

原仓库备份在了 Gitee 上：[archive-lifeni.top: 个人网站，仅用于学习交流用途。](https://gitee.com/Lifeni/archive-lifeni.top)

## 技术

通过解析 Markdown 文件生成静态网页。

项目主要文件及目录说明如下：

| 文件名或目录名            | 说明                                      |
| ------------------------- | ----------------------------------------- |
| components/               | 静态网页生成程序的分工组件                |
| -- /article-maker.js      | 根据解析数据生成文章页                    |
| -- /home-maker.js         | 根据解析数据生成首页                      |
| -- /json-parser.js        | 解析包含项目数据的 JSON 文件              |
| -- /markdown-parser.js    | 解析包含文章内容的 MD 文件                |
| data/                     | 存放项目数据，根据数据生成网页            |
| markdown/                 | [手动创建] 存放文章，需要在开头添加元数据 |
| public/                   | 存放前端文件                              |
| -- /article/              | [自动创建] 文章页面                       |
| -- /static/               | 存放 JS CSS 等文件                        |
| -- /index.html            | [自动创建] 包含文章列表的首页             |
| template/                 | 首页和文章页的模板文件                    |
| -- /article.template.html | 文章页模板文件                            |
| -- /home.template.html    | 首页模板文件                              |
| app.js                    | 程序入口文件                              |

## 数据使用说明

本网页使用到了浏览器的储存功能：Local Storage。

### 查看

1. 按 `F12` 或鼠标右键调出 DevTools

2. Chrome: 找到 Application / Storage / Local Storage / https://lifeni.life/

   Firefox: 找到 储存 / 本地储存 / https://lifeni.life/

   Microsoft Edge Chromium: 应用程序 / 储存 / 本地储存 / https://lifeni.life/

3. 右侧或下侧应该出现相应的 Key / Value

应该出现的 Key / Value 如下：

| Key           | Value                 | 解释                                     |
| ------------- | --------------------- | ---------------------------------------- |
| theme         | `auto` `light` `dark` | 记录当前主题设置中所选项                 |
| current-theme | `light` `dark`        | 记录当前主题，用于切换页面时快速切换主题 |

### 清除数据

1. 按 `F12` 或鼠标右键调出 DevTools

2. Chrome: 找到 Application / Storage / Local Storage / https://lifeni.life/

   Firefox: 找到 储存 / 本地储存 / https://lifeni.life/

   Microsoft Edge Chromium: 应用程序 / 储存 / 本地储存 / https://lifeni.life/

3. 按上方 🚫 按钮即可清除数据

如果你不想网页在浏览器中储存数据，你可以使用 无痕模式 / 隐私模式 / InPrivate 浏览 等功能，网页的正常功能（如浏览页面）不会受到影响。

### 其他要说的

本网页未使用 Cookies，也不会主动收集访问者的信息。

网站默认使用 HTTPS，如果你发现了一些问题，可以通过 [邮件（mailto）](mailto:liangfengning@foxmail.com) 联系我，非常感谢。

## 协议相关

本项目以 MIT License 开放源代码。

网站内所有知识性内容，如无特殊说明，均遵循 CC-BY-SA-4.0。