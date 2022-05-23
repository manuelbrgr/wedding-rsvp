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

              <Heading
                aboveText={listTitle}
                belowText={listSubtitle}
                colorClass="color-secondary"
              />
              <Cards gridItems={activities} />
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
        }
        questions {
          question
          answer
        }
      }
    }
  }
`;
