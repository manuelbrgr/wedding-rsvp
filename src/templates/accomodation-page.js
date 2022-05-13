import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const AccomodationPageTemplate = ({
  title,
  content,
  contentComponent,
  formProps,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AccomodationPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  formProps: PropTypes.object.isRequired,
};

const AccomodationPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AccomodationPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        formProps={post.frontmatter.formProps}
        content={post.html}
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
        formProps {
          firstName
        }
      }
    }
  }
`;
