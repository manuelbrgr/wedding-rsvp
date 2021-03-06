import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";
import Accordion from "react-bootstrap/Accordion";

// eslint-disable-next-line
export const FaqPageTemplate = ({
  title,
  subheading,
  description,
  questions,
  image,
  contentComponent,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container is-widescreen">
          <div className="columns">
            <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
              <div className="content">
                <div className="content has-text-centered">
                  <h2 className="title is-size-3 has-text-weight-semibold has-text-centered">
                    {title}
                  </h2>
                  <div className="tile">
                    <p className="subtitle">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-10-tablet is-offset-1-tablet is-6-desktop is-offset-3-desktop">
              <Accordion>
                {questions.map((item, i) => (
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

FaqPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  subheading: PropTypes.string,
  description: PropTypes.string,
  questions: PropTypes.array,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const FaqPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <FaqPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        subheading={post.frontmatter.subheading}
        description={post.frontmatter.description}
        questions={post.frontmatter.questions}
        content={post.html}
      />
    </Layout>
  );
};

FaqPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FaqPage;

export const faqPageQuery = graphql`
  query FaqPage($id: String!) {
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
        description
        questions {
          question
          answer
        }
      }
    }
  }
`;
