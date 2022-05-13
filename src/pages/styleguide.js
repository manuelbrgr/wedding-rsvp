import React from "react";
import Layout from "../components/layout";

const Stylguide = () => (
  <Layout>
    <div>
      <h1 className="heading heading--large">Heading Large</h1>
      <h2 className="heading heading--medium">Heading Medium</h2>
      <h3 className="heading heading--small">Heading Small</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla.
      </p>
    </div>

    <h2 className="heading heading--small">Card</h2>

    <div>
      <div className="card">
        <div className="card__image u-fill--primary"></div>
        <div className="card__description">
          <code>$color-primary</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--primary--light"></div>
        <div className="card__description">
          <code>$color-primary--light</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--primary--lighter"></div>
        <div className="card__description">
          <code>$color-primary--lighter</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--primary--dark"></div>
        <div className="card__description">
          <code>$color-primary--dark</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--secondary"></div>
        <div className="card__description">
          <code>$color-secondary</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--gray"></div>
        <div className="card__description">
          <code>$color-gray</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--black"></div>
        <div className="card__description">
          <code>$color-black</code>
        </div>
      </div>

      <div className="card">
        <div className="card__image u-fill--white"></div>
        <div className="card__description">
          <code>$color-white</code>
        </div>
      </div>
    </div>
  </Layout>
);

export default Stylguide;
