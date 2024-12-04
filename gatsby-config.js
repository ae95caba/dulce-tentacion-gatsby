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
    image: `src/images/logo512.png`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-784HFDBC5Z", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true, // Anonymize IP addresses
          allow_ad_personalization_signals: false, // Disable advertising signals
          send_page_view: true, // Send initial pageview
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
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
        nodeType: "Product", // Replace with your actual node type
        imagePath: "imgUrl", // Replace with your actual image path
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
