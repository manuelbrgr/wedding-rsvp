import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Countdown from "../components/Countdown";
import Zoom from "react-medium-image-zoom";
import { HTMLContent } from "../components/Content";
import Layout from "../components/Layout";
import Features from "../components/Features";
import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  imageUs,
  title,
  content,
  contentComponent,
  date,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={date} />
      <section className="section section--gradient">
        <div className="container is-widescreen">
          <Countdown className="has-text-centered mb-5" />
          <div className="columns">
            <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
              <div className="content">
                <div className="content has-text-centered">
                  <h2 className="title is-size-3 has-text-weight-semibold has-text-centered">
                    {mainpitch.title}
                  </h2>
                  <div className="tile">
                    <p className="subtitle">{mainpitch.description}</p>
                  </div>
                </div>
                <div className="column is-8 mb-5" style={{ margin: "auto" }}>
                  <Zoom zoomMargin={40}>
                    <GatsbyImage
                      image={imageUs.childImageSharp.gatsbyImageData}
                      alt={"Tenuta Larnianone"}
                    />
                  </Zoom>
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
                      {heading}
                    </h3>
                    <p
                      style={{
                        position: "relative",
                        left: "40px",
                        top: "-20px",
                        marginBottom: "-20px",
                      }}
                      className="is-size-0-h font-northwell color-info"
                    >
                      {subheading}
                    </p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
              </div>
            </div>
          </div>
          <div className="columns">
            <div
              className="column is-10 is-offset-1 has-text-centered"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  langKey: PropTypes.string,
  image: PropTypes.object,
  imageUs: PropTypes.object,
  title: PropTypes.string,
  contentComponent: PropTypes.func,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  date: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        imageUs={frontmatter.imageUs}
        content={frontmatter.html}
        contentComponent={HTMLContent}
        title={frontmatter.title}
        date={frontmatter.date}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate($langKey: String!) {
    markdownRemark(
      fields: { langKey: { eq: $langKey } }
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      html
      fields {
        langKey
      }
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
        imageUs {
          childImageSharp {
            gatsbyImageData(quality: 80, layout: CONSTRAINED)
          }
        }
        date
        heading
        subheading
        mainpitch {
          title
          description
        }
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(quality: 80, layout: CONSTRAINED)
              }
            }
            headline
            subheading
            text
          }
          heading
        }
        description
      }
    }
  }
`;
