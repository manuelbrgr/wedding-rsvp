import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const LocationPageTemplate = ({
  title,
  subheading,
  image,
  content,
  contentComponent,
  address,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <div className="is-size-4">
                  <h3 className="is-size-5">{address.name}</h3>
                  <a
                    href="https://tenutalarnianone.com/villas/colombaio/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h4 className="is-size-1 font-northwell">
                      {address.villa}
                    </h4>{" "}
                  </a>
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                  <p>{address.country}</p>
                  <a
                    className="is-size-6"
                    href="https://goo.gl/maps/Svvok29DSFe7vwT47"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>{address.link}</p>
                  </a>
                </div>
                {/* <PageContent className="content" content={content} /> */}
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  address: PropTypes.object,
};

const LocationPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <LocationPageTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
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
        address {
          name
          villa
          street
          city
          country
          link
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
