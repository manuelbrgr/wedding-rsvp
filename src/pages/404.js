import * as React from "react";
import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout>
    <section className="section section--gradient">
      <div className="container is-widescreen">
        <div className="columns" style={{ height: "800px" }}>
          <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
            <h1 className="is-size-1">404</h1>
            <h1 className="is-size-2">NOT FOUND</h1>
            <p>This page does not exist.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
