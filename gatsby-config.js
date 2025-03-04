require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Dulce Tentación",
    description: "Catalogo online",
    author: "André Espinoza",
    image: `/meta-image.png`,
    siteUrl: "https://dulce-tentacion-mp.netlify.app",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dulce Tentación Marcos Paz`,
        short_name: `Dulce Tentación`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#e8547e`,
        display: `standalone`,
        icon: `src/images/logo512.png`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    `gatsby-plugin-perf-budgets`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,

    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Flavour",
        imagePath: "imgUrl",
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Product",
        imagePath: "imgUrl",
      },
    },

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`],
        },
      },
    },
  ],
};
