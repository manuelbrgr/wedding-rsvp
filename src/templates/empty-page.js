import React from "react";
import { Spinner } from "react-bootstrap";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const EmptyPageTemplate = () => {
  return <div></div>;
};

const EmptyPage = () => {
  return (
    <Layout>
      <EmptyPageTemplate></EmptyPageTemplate>
    </Layout>
  );
};

export default EmptyPage;
