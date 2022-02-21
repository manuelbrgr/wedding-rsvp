import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const BlogPageTemplate = ({ title, image, subheading }) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section">
        <div className="container">
          <div className="content">
            <BlogRoll />
          </div>
        </div>
      </section>
    </div>
  );
};

BlogPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string,
};

const BlogPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
      />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPage;

export const blogPageQuery = graphql`
  query BlogPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-page" } }) {
      html
      frontmatter {
        title
        subheading
        image {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`;
