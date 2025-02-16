import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description, image, url }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description;
  const metaUrl = url || site.siteMetadata.siteUrl;
  const metaImage = image || site.siteMetadata.image; // Use passed image or default
  const metaImageUrl = `${site.siteMetadata.siteUrl}${metaImage}`; // Complete URL for Open Graph

  return (
    <Helmet>
      {/* General Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaUrl} />
      <meta
        property="og:image"
        itemprop="image"
        content="https://res.cloudinary.com/dto1ctatc/image/upload/v1739735861/dulce-tentacion/meta-image_wd4l7m.png"
      />

      {/* WhatsApp uses Open Graph, so these should work */}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/dto1ctatc/image/upload/v1739735861/dulce-tentacion/meta-image_wd4l7m.png"
      />
    </Helmet>
  );
};

export default SEO;
