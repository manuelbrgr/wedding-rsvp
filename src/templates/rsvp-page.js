import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FormContainer from "../components/rsvp-form/FormContainer";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";
import Heading from "../components/Heading";

// eslint-disable-next-line
export const RsvpPageTemplate = ({
  title,
  subheading,
  content,
  description,
  rsvpTitle,
  rsvpSubheading,
  contentComponent,
  image,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;

  return (
    <>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container is-widescreen">
          <div className="columns">
            <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
              <h2 className="title is-size-3 has-text-weight-bold has-text-centered is-bold-light">
                {title}
              </h2>
              <div className="content has-text-centered mb-5">
                <p className="subtitle">{description}</p>
              </div>
              <Heading
                aboveText={rsvpTitle}
                belowText={rsvpSubheading}
                colorClass="color-primary"
              />
              <div className="column p-0 is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
                <FormContainer />
              </div>
            </div>
          </div>
          <PageContent />
        </div>
      </section>
    </>
  );
};

RsvpPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  content: PropTypes.string,
  subheadin: PropTypes.string,
  description: PropTypes.string,
  rsvpTitle: PropTypes.string,
  rsvpSubheading: PropTypes.string,
  contentComponent: PropTypes.func,
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
        description={post.frontmatter.description}
        rsvpTitle={post.frontmatter.rsvpTitle}
        rsvpSubheading={post.frontmatter.rsvpSubheading}
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
        description
        rsvpTitle
        rsvpSubheading
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
