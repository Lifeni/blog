export const pages = [
  {
    name: '文章',
    href: '/',
    icons: ['ri:book-fill', 'ri:book-open-fill'],
    id: 'articles',
  },
  {
    name: '专题',
    href: '/stories',
    icons: ['ri:chat-3-fill', 'ri:chat-thread-fill'],
    id: 'stories',
  },
  {
    name: '存档',
    href: '/archives',
    icons: ['ri:folder-3-fill', 'ri:folder-open-fill'],
    id: 'archives',
  },
  {
    name: '时刻',
    href: '/moments',
    icons: ['ri:camera-fill', 'ri:film-fill'],
    id: 'moments',
  },
]

export const shortcuts = [
  {
    name: '开往',
    icon: 'ri:triangle-fill',
    href: 'https://www.travellings.cn/go.html',
  },
  {
    name: 'GitHub',
    icon: 'ri:profile-fill',
    href: 'https://github.com/Lifeni',
  },
  {
    name: '邮箱',
    icon: 'ri:mail-fill',
    href: 'mailto:liangfengning@foxmail.com',
  },
  {
    name: 'Hello',
    icon: 'ri:terminal-box-fill',
    href: 'https://lifeni.life/hello',
  },
]

export const apps = [
  {
    name: '应用',
    items: [
      { name: '记录干杯', href: '/', avatar: '/favicon.svg' },
      { name: '代码可行', href: '/dev', avatar: '/dev/favicon.svg' },
      { name: '时间之外', href: '/lab', avatar: '/lab/favicon.svg' },
      { name: '越过长城', href: '/server', avatar: '/server/favicon.svg' },
      {
        name: '随意链接',
        href: 'https://iokl.link',
        avatar: '/apps/iokl.link.svg',
      },
      {
        name: '数据有限',
        href: 'https://file.lifeni.life',
        avatar: '/apps/file.lifeni.life.svg',
      },
    ],
    avatar: 'ri:gamepad-line',
  },
  {
    name: '朋友',
    items: [
      {
        name: 'Nanako',
        href: 'https://web.archive.org/web/20240226171341/https://tanakarino.cn/',
        avatar: '/friends/Nanako.webp',
      },
      {
        name: 'bluebonnet27',
        href: 'https://bluebonnet27.github.io/',
        avatar: '/friends/bluebonnet27.webp',
      },
      {
        name: 'GluttonK',
        href: 'https://blog.csdn.net/GluttonK/',
        avatar: '/friends/GluttonK.webp',
      },
      {
        name: 'Wumbuk',
        href: 'https://blog.csdn.net/qq_48081868/',
        avatar: '/friends/Wumbuk.webp',
      },
      {
        name: 'YueChen',
        href: 'https://web.archive.org/web/20240905161039/https://www.yuechen.xyz/',
        avatar: '/friends/YueChen.webp',
      },
      {
        name: 'ss967',
        href: 'https://web.archive.org/web/20231001045610/https://ssblog.top/',
        avatar: '/friends/ss967.webp',
      },
      {
        name: 'Bakapiano',
        href: 'https://bakapiano.github.io/',
        avatar: '/friends/Bakapiano.webp',
      },
    ],
    avatar: 'ri:user-smile-line',
  },
  {
    name: '网站',
    items: [
      {
        name: '网上邻居',
        href: 'https://life.lifeni.life',
        avatar: '/apps/life.lifeni.life.svg',
      },
      {
        name: '那年夏天',
        href: 'https://the-algorithm.dist.run/',
        avatar: '/apps/the-algorithm.dist.run.svg',
      },
    ],
    avatar: 'ri:global-line',
  },
]

export const links = [
  [
    {
      name: '由「又拍云」提供 CDN 加速与云储存服务',
      href: 'https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral',
    },
  ],
  [
    { name: '鲁ICP备19006085号', href: 'https://beian.miit.gov.cn' },
    {
      name: '鲁公网安备37132102371392号',
      href: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37132102371392',
    },
  ],
]

export const redirects = {
  '/article/algorithm-sudoku': '/archives/algorithm-sudoku',
  '/article/before-coding': '/archives/before-coding',
  '/article/change-the-world': '/archives/change-the-world',
  '/article/cloud-server': '/archives/cloud-server',
  '/article/cmd-scp': '/archives/cmd-scp',
  '/article/code-snippets': '/archives/code-snippets',
  '/article/cookies-issue': '/archives/cookies-issue',
  '/article/deploy-with-github-actions': '/archives/deploy-with-github-actions',
  '/article/es-features': '/archives/es-features',
  '/article/github-actions-example': '/archives/github-actions-example',
  '/article/hello-boinc': '/archives/hello-boinc',
  '/article/install-arch-linux': '/archives/install-arch-linux',
  '/article/install-rime': '/archives/install-rime',
  '/article/java-restful-server': '/archives/java-restful-server',
  '/article/js-deep-clone': '/archives/js-deep-clone',
  '/article/js-object-intl': '/archives/js-object-intl',
  '/article/js-size-position': '/archives/js-size-position',
  '/article/learn-javascript': '/archives/learn-javascript',
  '/article/missing-semester': '/archives/missing-semester',
  '/article/node-proxy': '/archives/node-proxy',
  '/article/ssh-to-docker': '/archives/ssh-to-docker',
  '/article/steve-jobs': '/archives/steve-jobs',
  '/article/this-website': '/archives/this-website',
  '/article/translate-callback-hell': '/archives/translate-callback-hell',
  '/article/use-docker': '/archives/use-docker',
  '/article/use-git-flow': '/archives/use-git-flow',
  '/article/use-git': '/archives/use-git',
  '/article/windows-config': '/archives/windows-config',
}
