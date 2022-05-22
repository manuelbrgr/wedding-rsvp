import * as React from "react";
import PropTypes from "prop-types";

const Heading = ({ aboveText, belowText }) => (
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
        {aboveText}
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
        {belowText}
      </p>
    </div>
  </div>
);

Heading.propTypes = {
  aboveText: PropTypes.string,
  belowText: PropTypes.string,
};

export default Heading;
