require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `记录干杯`,
    description: `个人网站「 记录干杯 」，在这里记录一些技术相关的文章、尝试一些新的技术。`,
    author: `Lifeni`,
    siteLanguage: "zh-cn",
    siteUrl: `https://lifeni.life`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `记录干杯 - Lifeni`,
        short_name: `记录干杯`,
        start_url: `/`,
        background_color: `#feec44`,
        theme_color: `#feec44`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `76`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
              elements: [`h2`, `h3`],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              loading: "lazy",
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-native-lazy-load`,
            options: {
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-177358412-1",
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Inter:300,400,600", "Fira Mono:400,500,700&display=swap"],
        },
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
  ],
}
