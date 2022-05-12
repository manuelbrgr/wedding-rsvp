import React, { useState } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";

function Navbar(props) {
  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState("");

  function toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        active ? setNavBarActiveClass("is-active") : setNavBarActiveClass("");
      }
    );
  }

  const { language, languages } = useI18next();

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            role="menuitem"
            tabIndex={0}
            onKeyPress={() => toggleHamburger()}
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to={`/`}>
              Home
            </Link>
            <Link className="navbar-item" to={`/location`} language={language}>
              Location
            </Link>
            <Link className="navbar-item" to="/activities">
              Things To Do
            </Link>
            <Link className="navbar-item" to="/blog">
              Updates
            </Link>
            <Link className="navbar-item" to="/rsvp">
              RSVP
            </Link>
            <Link className="navbar-item" to="/faq">
              FAQ
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            {languages.map((lng) => (
              <Link className="navbar-item" to="/" language={lng}>
                {lng.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
