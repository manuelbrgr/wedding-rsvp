import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// eslint-disable-next-line
export const LocationPageTemplate = ({
  title,
  subheading,
  images,
  mainpitch,
  content,
  contentComponent,
  address,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(images.home) || images.home;

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content has-text-centered">
                <p className="subtitle has-text-weight-semibold">
                  {mainpitch.descriptionTuscany}
                </p>
              </div>
              <div className="column is-8" style={{ margin: "auto" }}>
                <Zoom zoomMargin={40}>
                  <GatsbyImage
                    image={images.imageVilla.childImageSharp.gatsbyImageData}
                    alt={"Tenuta Larnianone"}
                  />
                </Zoom>
              </div>
              <div className="content has-text-centered">
                <p className="subtitle has-text-weight-semibold">
                  {mainpitch.descriptionTenuta}
                </p>
              </div>
              <div className="columns">
                <div className="column is-4">
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    {title}
                  </h2>
                  <div className="is-size-4">
                    <h3 className="is-size-5">{address.name}</h3>
                    <h4 className="is-size-1 font-northwell push-in">
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
                      image={images.imageTenuta.childImageSharp.gatsbyImageData}
                      alt={"Tenuta Larnianone"}
                    />
                  </Zoom>
                </div>
              </div>
              <div className="content has-text-centered">
                <p className="subtitle has-text-weight-semibold">
                  {mainpitch.descriptionTenuta}
                </p>
              </div>
              <div className="columns">
                <div className="column is-12">
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        What's the best to get there from Germany?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Check out</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        What's the best to get there from Poland?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Check out</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        What's the best to get there from Austria?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Check out</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
              <div className="columns">
                <div className="column is-12">
                  <PageContent className="content" content={content} />
                </div>
              </div>
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
        mainpitch={post.frontmatter.mainpitch}
        content={post.html}
        address={post.frontmatter.address}
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
      }
    }
  }
`;
