import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const AccomodationPageTemplate = ({
  title,
  subheading,
  content,
  image,
  contentComponent,
  formProps,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;

  return (
    <>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

AccomodationPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  formProps: PropTypes.object.isRequired,
};

const AccomodationPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AccomodationPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        subheading={post.frontmatter.subheading}
        formProps={post.frontmatter.formProps}
        content={post.html}
      />
    </Layout>
  );
};

AccomodationPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccomodationPage;

export const accomodationPageQuery = graphql`
  query AccomodationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
        formProps {
          firstName
        }
      }
    }
  }
`;
