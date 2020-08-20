import React from "react"
import Header from "../components/Header"
import SEO from "../components/SEO"
import Sidebar from "../components/Sidebar"

const PrivacyPage = () => (
  <>
    <SEO title="隐私数据" />
    <Header />
    <main>
      <Sidebar footer />
      <article>
        <p className="subtitle">Privacy</p>
        <h1>隐私数据</h1>
        <p>更新时间：2020 年 8 月 19 日。</p>
        <h2>数据收集说明</h2>
        <p>
          在你访问这个网站的时候，我会收集一些匿名数据用于统计，下面表格中有详细信息。
        </p>
        <p>
          在默认情况下，只要访问这个网站，就会发送匿名数据到我的 API
          服务器，如果你确实想阻止信息的发送，可以禁止「 https://api.lifeni.life
          」 的连接，这会影响「 喜欢 」和「 留言 」等功能的使用。
        </p>
        <p>
          网站还使用了 Cookies 来进行简单的短时身份识别，识别所用的 ID
          为随机生成。Cookies 的有效期为 2 个小时，通过 HTTPS
          进行传输，无法在前端进行查看和修改。
        </p>
        <h2>网站收集的数据</h2>
        <p>
          你可以在浏览器的控制台中查看发送的数据和保存的
          Cookies，也可以参照下面的表格中的说明：
        </p>
        <table>
          <thead>
            <tr>
              <td>数据名称</td>
              <td>来源</td>
              <td>说明</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>uuid</td>
              <td>通过 uuidv4 生成</td>
              <td>随机生成一个唯一 ID，存放在 Cookies 中</td>
            </tr>
            <tr>
              <td>name</td>
              <td>自己想的</td>
              <td>访问域名的代号</td>
            </tr>
            <tr>
              <td>from</td>
              <td>
                JS <code>window.location.href</code>
              </td>
              <td>当前网页的链接地址</td>
            </tr>
            <tr>
              <td>agent</td>
              <td>
                JS <code>navigator.userAgent</code>
              </td>
              <td>设备和浏览器信息，不含个人数据</td>
            </tr>
            <tr>
              <td>language</td>
              <td>
                JS <code>navigator.language</code>
              </td>
              <td>浏览器的语言</td>
            </tr>
          </tbody>
        </table>
        <h2>写在最后</h2>
        <p>
          我承诺，不会把收集到的数据公开或者分享给第三方，所有数据仅用于网站的访问分析，并且会定期进行删除。我也会尽力保证数据的安全、不会被泄露。
        </p>
      </article>
    </main>
  </>
)

export default PrivacyPage
