import * as React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { GatsbyImage } from "gatsby-plugin-image";

const CardItem = ({ item }) => (
  <Card>
    <GatsbyImage
      image={item.img.childImageSharp.gatsbyImageData}
      alt={item.name}
    />
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>{item.description}</Card.Text>
    </Card.Body>
  </Card>
);

const CardsGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map((item, i) => (
      <div key={item.text} className="has-text-centered column is-6">
        {item.url ? (
          <a
            href={item.url}
            title={item.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardItem item={item} />
          </a>
        ) : (
          <CardItem item={item} />
        )}
      </div>
    ))}
  </div>
);

CardsGrid.propTypes = {
  gridItems: PropTypes.object,
};

export default CardsGrid;
