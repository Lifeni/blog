module.exports = {
  siteMetadata: {
    title: `记录干杯`,
    description: `个人网站「 记录干杯 」，在这里记录一些技术相关的文章、尝试一些新的技术。`,
    author: `Lifeni`,
    siteLanguage: "zh-hans",
    siteUrl: `https://lifeni.life`,
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `记录干杯 - Lifeni`,
        short_name: `记录干杯`,
        description:
          "个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。",
        start_url: `/`,
        background_color: `#feec44`,
        theme_color: `#feec44`,
        display: `minimal-ui`,
        icon: `static/favicon.svg`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notebook`,
        path: `${__dirname}/notebook/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/common/Page.tsx"),
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-unwrap-images`,
          {
            resolve: `gatsby-remark-images-native-lazy-load`,
            options: {
              loading: "lazy",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: "18",
              icon: false,
              elements: [`h1`, `h2`, `h3`],
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-external-links`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Inter:500,700",
            "JetBrains Mono:500,700",
            "Noto Sans SC:500,700&display=swap",
          ],
        },
      },
    },
  ],
}
