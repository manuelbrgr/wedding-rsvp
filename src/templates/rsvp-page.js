import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FormContainer from "../components/rsvp-form/FormContainer";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const RsvpPageTemplate = ({
  title,
  subheading,
  content,
  contentComponent,
  formProps,
  image,
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
                <FormContainer formProps={formProps} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

RsvpPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  formProps: PropTypes.object.isRequired,
};

const RsvpPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RsvpPageTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        formProps={post.frontmatter.formProps}
        content={post.html}
      />
    </Layout>
  );
};

RsvpPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RsvpPage;

export const rsvpPageQuery = graphql`
  query RsvpPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subheading
        formProps {
          firstName
        }
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
