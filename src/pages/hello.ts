const hello = `
  你好，我对 Web 开发比较感兴趣，
  喜欢一些好看的设计，
  我的个人网站在 https://lifeni.life，
  欢迎来看看。
  `

export async function GET() {
  return new Response(hello)
}
