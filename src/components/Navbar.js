import React, { useState } from "react";
import { Link } from "gatsby";
import languages from "../data/languages";
import { getLangKey, getPath } from "../utils/getLangKey";
import { withTranslation } from "react-i18next";
import { useLocation } from "@reach/router";

function Navbar(props) {
  const location = useLocation();

  const langKey = getLangKey(location);
  const path = getPath(location);

  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState("");

  function toggleHamburger() {
    // toggle the active boolean in the state
    setActive(!active);
    // set the class in state for the navbar accordingly
    !active ? setNavBarActiveClass("is-active") : setNavBarActiveClass("");
  }

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
            <Link className="navbar-item" to={`/${langKey}`}>
              {props.t("navigation.home")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/location`}>
              {props.t("navigation.location")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/accommodation`}>
              {props.t("navigation.accommodation")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/activities`}>
              {props.t("navigation.activities")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/rsvp`}>
              {props.t("navigation.rsvp")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/faq`}>
              {props.t("navigation.faq")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/contact`}>
              {props.t("navigation.contact")}
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            {languages.langs.map((lng, i) => (
              <Link
                key={i}
                className="navbar-item"
                to={`/${lng}/${path}`}
                onClick={() => props.i18n.changeLanguage(lng)}
              >
                {lng.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withTranslation()(Navbar);
