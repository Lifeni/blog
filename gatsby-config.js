module.exports = {
  siteMetadata: {
    title: `记录干杯`,
    description: `个人网站「 记录干杯 」，在这里记录一些技术相关的文章、尝试一些新的技术。`,
    author: `Lifeni`,
    siteLanguage: "zh-hans",
    siteUrl: `https://lifeni.life`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `记录干杯 - Lifeni`,
        short_name: `记录干杯`,
        start_url: `/`,
        background_color: `#feec44`,
        theme_color: `#feec44`,
        display: `minimal-ui`,
        icon: `static/favicon.png`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-native-lazy-load`,
            options: {
              loading: "lazy",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `84`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
              elements: [`h2`, `h3`],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            // options: {
            //   classPrefix: "language-",
            //   // inlineCodeMarker: null,
            //   showLineNumbers: true,
            //   noInlineHighlight: false,
            // },
          },
          `gatsby-remark-images`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Inter:300,400,600",
            "JetBrains Mono:400,700",
            "Noto Sans SC:300,400,700&display=swap",
          ],
        },
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-less`,
  ],
}
