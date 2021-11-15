module.exports = {
  siteMetadata: {
    title: "记录干杯",
    description:
      "个人网站「 记录干杯 」，在这里记录一些技术相关的文章、尝试一些新的技术。",
    author: "Lifeni",
    siteLanguage: "zh-hans",
    siteUrl: "https://lifeni.life",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "记录干杯 - Lifeni",
        short_name: "记录干杯",
        description:
          "个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。",
        start_url: "/",
        background_color: "#feec44",
        theme_color: "#feec44",
        display: "minimal-ui",
        icon: "static/favicon.svg",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/markdown/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/notebook/articles/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              className: "link-anchor",
              isIconAfterHeader: true,
              elements: ["h2", "h3"],
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            },
          },
          "gatsby-remark-unwrap-images",
        ],
      },
    },
  ],
}
