import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";
import Cards from "../components/Cards";
import { Accordion } from "react-bootstrap";

// eslint-disable-next-line
export const ActivitiesPageTemplate = ({
  title,
  subheading,
  description,
  information,
  content,
  image,
  contentComponent,
  listTitle,
  listSubtitle,
  activities,
  questions,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
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
                      <h3
                        style={{
                          textTransform: "uppercase",
                          position: "relative",
                          top: "30px",
                          right: "10%",
                        }}
                        className="has-text-weight-semibold is-size-4"
                      >
                        {listTitle}
                      </h3>
                      <p
                        style={{
                          position: "relative",
                          left: "5%",
                        }}
                        className="is-size-0-h font-northwell color-info"
                      >
                        {listSubtitle}
                      </p>
                    </div>
                  </div>
                  <Cards gridItems={activities} />
                </div>
              </div>
            </div>

            <div className="column has-text-centered is-10 is-offset-1">
              <div className="tile">
                <p className="subtitle">{information}</p>
              </div>
            </div>

            <div className="columns">
              <div className="column is-10 is-offset-1">
                <Accordion>
                  {questions.map((item, i) => (
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
        </div>
      </section>
    </div>
  );
};

ActivitiesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  subheading: PropTypes.string,
  description: PropTypes.string,
  information: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  listTitle: PropTypes.string,
  listSubtitle: PropTypes.string,
  activities: PropTypes.object,
  questions: PropTypes.object,
};

const ActivitiesPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ActivitiesPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        information={post.frontmatter.information}
        image={post.frontmatter.image}
        subheading={post.frontmatter.subheading}
        content={post.html}
        listTitle={post.frontmatter.listTitle}
        listSubtitle={post.frontmatter.listSubtitle}
        activities={post.frontmatter.activities}
        questions={post.frontmatter.questions}
      />
    </Layout>
  );
};

ActivitiesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ActivitiesPage;

export const ActivitiesPageQuery = graphql`
  query ActivitiesPage($id: String!) {
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
        activities {
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
