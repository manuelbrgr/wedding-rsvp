import React, { useState } from "react";
import { Link } from "gatsby";
import languages from "../data/languages";
import { getLangKey, getPathAfterLang } from "../utils/getLangKey";
import { useTranslation } from "react-i18next";

function Navbar(props) {
  const { t, i18n } = useTranslation();

  const langKey = getLangKey();
  const pathAfterLang = getPathAfterLang();
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
              Home
            </Link>
            <Link className="navbar-item" to={`/${langKey}/location`}>
              {t("navigation.location")}
            </Link>
            <Link className="navbar-item" to={`/${langKey}/activities`}>
              Things To Do
            </Link>
            <Link className="navbar-item" to={`/${langKey}/rsvp`}>
              RSVP
            </Link>
            <Link className="navbar-item" to={`/${langKey}/faq`}>
              FAQ
            </Link>
            <Link className="navbar-item" to={`/${langKey}/contact`}>
              Contact
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            {languages.langs.map((lng, i) => (
              <Link
                key={i}
                className="navbar-item"
                to={`/${lng}/${pathAfterLang}`}
                onClick={() => i18n.changeLanguage(lng)}
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

export default Navbar;
