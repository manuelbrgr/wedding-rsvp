import * as React from "react";
import Link from "gatsby-link";
import Layout from "../../components/Layout";

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Hi people</h1>
              <p>This is an example</p>
              <ul>
                <li>
                  <Link to="/contact">Basic contact form</Link>
                </li>
                <li>
                  <Link to="/contact/file-upload/">Form with file upload</Link>
                </li>
              </ul>

              <h2>Troubleshooting</h2>
              <h3>Forms stop working after upgrading to Gatsby v2</h3>
              <p>
                This can be caused by the offline-plugin.{" "}
                <a href="https://github.com/gatsbyjs/gatsby/issues/7997#issuecomment-419749232">
                  Workaround
                </a>{" "}
                is to use <code>?no-cache=1</code> in the POST url to prevent
                the service worker from handling form submissions
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
