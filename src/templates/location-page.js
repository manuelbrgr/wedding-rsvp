import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Accordion from "react-bootstrap/Accordion";
import Heading from "../components/Heading";

// eslint-disable-next-line
export const LocationPageTemplate = ({
  title,
  subheading,
  images,
  mainpitch,
  content,
  contentComponent,
  address,
  questions,
  handwrittenTitle,
  handwrittenSubtitle,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(images.home) || images.home;

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container is-widescreen">
          <div className="columns mb-0">
            <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
              <div className="content has-text-centered">
                <Heading
                  aboveText={handwrittenTitle}
                  belowText={handwrittenSubtitle}
                  colorClass="color-success"
                />
                <p className="subtitle  mb-5">{mainpitch.descriptionTuscany}</p>
              </div>
              <div className="column is-8 mb-5" style={{ margin: "auto" }}>
                <Zoom zoomMargin={40}>
                  <GatsbyImage
                    image={images.imageVilla.childImageSharp.gatsbyImageData}
                    alt={"Tenuta Larnianone"}
                  />
                </Zoom>
              </div>
              <div className="content has-text-centered mb-5">
                <p className="subtitle">{mainpitch.descriptionTenuta}</p>
              </div>
              <div className="column is-12">
                <div className="columns mt-5 mb-5">
                  <div className="column is-4 has-text-centered-mobile">
                    <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                      {title}
                    </h2>
                    <div className="is-size-4">
                      <h3 className="is-size-5">{address.name}</h3>
                      <h4 className="is-size-1 font-northwell push-in color-info">
                        {address.villa}
                      </h4>
                      <p>{address.street}</p>
                      <p>{address.city}</p>
                      <p>{address.country}</p>
                      <a
                        className="is-size-6"
                        href="https://goo.gl/maps/Svvok29DSFe7vwT47"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>{address.linkToGoogle}</p>
                      </a>
                      <a
                        className="is-size-6"
                        href="https://tenutalarnianone.com/villas/colombaio/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>{address.linkToTenuta}</p>
                      </a>
                    </div>
                  </div>
                  <div className="column is-8">
                    <Zoom zoomMargin={40}>
                      <GatsbyImage
                        image={
                          images.imageTenuta.childImageSharp.gatsbyImageData
                        }
                        alt={"Tenuta Larnianone"}
                      />
                    </Zoom>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mb-5">
            <div className="column is-10-tablet is-offset-1-tablet is-6-desktop is-offset-3-desktop">
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
          <div className="columns">
            <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
              <PageContent
                className="content has-text-centered"
                content={content}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

LocationPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.object,
  subheading: PropTypes.string,
  content: PropTypes.string,
  mainpitch: PropTypes.object,
  contentComponent: PropTypes.func,
  address: PropTypes.object,
  questions: PropTypes.object,
};

const LocationPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <LocationPageTemplate
        images={post.frontmatter.images}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        handwrittenTitle={post.frontmatter.handwrittenTitle}
        handwrittenSubtitle={post.frontmatter.handwrittenSubtitle}
        mainpitch={post.frontmatter.mainpitch}
        content={post.html}
        address={post.frontmatter.address}
        questions={post.frontmatter.questions}
      />
    </Layout>
  );
};

LocationPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LocationPage;

export const locationPageQuery = graphql`
  query LocationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subheading
        handwrittenTitle
        handwrittenSubtitle
        images {
          home {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                layout: FULL_WIDTH
                placeholder: BLURRED
              )
            }
          }
          imageTenuta {
            childImageSharp {
              gatsbyImageData(quality: 80, layout: CONSTRAINED)
            }
          }
          imageVilla {
            childImageSharp {
              gatsbyImageData(quality: 80, layout: CONSTRAINED)
            }
          }
        }
        mainpitch {
          descriptionTuscany
          descriptionTenuta
        }
        address {
          name
          villa
          street
          city
          country
          linkToGoogle
          linkToTenuta
        }
        questions {
          question
          answer
        }
      }
    }
  }
`;
