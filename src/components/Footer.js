import * as React from "react";
import { Link } from "gatsby";

import facebook from "../img/social/facebook.svg";
import { getLangKey } from "../utils/getLangKey";
import { useLocation } from "@reach/router";
import { useTranslation } from "gatsby-plugin-react-i18next";

function Footer(props) {
  const location = useLocation();

  const langKey = getLangKey(location);

  const { t } = useTranslation();

  return (
    <footer className="footer has-background-black has-text-white-ter">
      <div className="content has-text-centered has-background-black has-text-white-ter">
        <div className="container has-background-black has-text-white-ter">
          <div className="columns">
            <div className="column is-4" style={{ marginTop: "-1.2em" }}>
              <section className="menu">
                <ul className="menu-list is-flex-mobile m-0">
                  <li>
                    <Link to={`/${langKey}/imprint`} className="navbar-item">
                      {t("navigation.imprint")}
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
            <div className="column is-4" style={{ marginTop: "-1.2em" }}>
              <section></section>
            </div>
            <div
              className="column is-4 social has-text-right-tablet"
              style={{ marginTop: "-0.5em" }}
            >
              <a
                title="facebook"
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/groups/1435542876905661"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  style={{ width: "1em", height: "1em" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
