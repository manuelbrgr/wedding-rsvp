import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";
import Cards from "../components/Cards";
import { Accordion } from "react-bootstrap";
import Heading from "../components/Heading";

// eslint-disable-next-line
export const AccomodationPageTemplate = ({
  title,
  subheading,
  description,
  information,
  content,
  image,
  contentComponent,
  listTitle,
  listSubtitle,
  accommodations,
  questions,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="content">
                <div className="content has-text-centered">
                  <h2 className="title has-text-weight-semibold has-text-centered">
                    {title}
                  </h2>
                  <div className="tile">
                    <p className="subtitle">{description}</p>
                  </div>
                </div>

                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Heading
                      aboveText={listTitle}
                      belowText={listSubtitle}
                      colorClass="color-warning"
                    />
                  </div>
                </div>
                <Cards gridItems={accommodations} />
              </div>
            </div>
          </div>

          <div className="column has-text-centered is-8 is-offset-2 mb-5">
            <div className="tile">
              <p className="subtitle">{information}</p>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Accordion>
                {questions?.map((item, i) => (
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    ></Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

AccomodationPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  subheading: PropTypes.string,
  description: PropTypes.string,
  information: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  listTitle: PropTypes.string,
  listSubtitle: PropTypes.string,
  accommodations: PropTypes.object,
  questions: PropTypes.object,
};

const AccomodationPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AccomodationPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        information={post.frontmatter.information}
        image={post.frontmatter.image}
        subheading={post.frontmatter.subheading}
        content={post.html}
        listTitle={post.frontmatter.listTitle}
        listSubtitle={post.frontmatter.listSubtitle}
        accommodations={post.frontmatter.accommodations}
        questions={post.frontmatter.questions}
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
        description
        information
        image {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
        listTitle
        listSubtitle
        accommodations {
          img {
            childImageSharp {
              gatsbyImageData(quality: 80, layout: CONSTRAINED)
            }
          }
          name
          description
          url
        }
        questions {
          question
          answer
        }
      }
    }
  }
`;
