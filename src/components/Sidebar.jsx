import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../css/sidebar.css";

export default function Sidebar({ header, subHeader, navs, user }) {
  const location = useLocation().pathname;

  const [activeLink, setActiveLink] = useState();
  const [visible, setVisible] = useState("");

  const setActive = (e) => {
    e.preventDefault();
  };

  const toggleVisibility = (name) => {
    setActiveLink(name);

    if (!visible) return setVisible(name);

    if (visible) {
      if (visible === activeLink && name === activeLink) {
        return setVisible("");
      } else {
        return setVisible(name);
      }
    }
  };

  return (
    <div className="col-12 col-md-3 col-xl-2" id="nav">
      <div className="row">
        <div className="col-md-12 col-8">
          <div className="text-sm-left text-md-center logo">{header}</div>
          <p className="text-muted text-md-center">{subHeader}</p>
        </div>
        <div className="col-md-12 col-4 text-right">
          <button
            className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#nav-links"
            aria-controls="nav-links"
            aria-expanded="false"
            aria-label="Toggle docs navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="30"
              height="30"
              focusable="false"
            >
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M4 7h22M4 15h22M4 23h22"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <nav className="collapse nav-links" id="nav-links">
        <ul className="left-options">
          {navs.map((nav, i) => {
            if (!nav.inner) {
              if (nav.admin && !user.isAdmin) {
                return null;
              } else
                return (
                  <li
                    key={i}
                    className={"left-option  " + (nav.url === location ? "active " : "")}
                    id={nav.name}
                    onClick={(e) => setActive(e, nav.name)}
                  >
                    <Link to={nav.url}>{nav.name}</Link>
                  </li>
                );
            } else {
              if (nav.admin && !user.isAdmin) {
                return null;
              } else
                return (
                  <li className="left-option" id={nav.name} key={i}>
                    <label
                      onClick={() => toggleVisibility(nav.name)}
                      className="dropdown-toggle"
                    >
                      {nav.name}
                    </label>
                    <div className="clearSpace">
                      <ul
                        className={
                          "inner-options " + (nav.name === visible ? "" : "hidden")
                        }
                      >
                        {nav.innerNavs.map((innerNav, i) =>
                          innerNav.admin === undefined ? (
                            <li
                              key={i}
                              className={
                                "inner-option " +
                                (innerNav.url === location ? "active " : "")
                              }
                              onClick={(e) => setActive(e, innerNav.name)}
                            >
                              <Link to={innerNav.url}>{innerNav.name}</Link>
                            </li>
                          ) : innerNav.admin && user.isAdmin === true ? (
                            <li
                              key={i}
                              className={
                                "inner-option " +
                                (innerNav.url === location ? "active " : "")
                              }
                              onClick={(e) => setActive(e, innerNav.name)}
                            >
                              <Link to={innerNav.url}>{innerNav.name}</Link>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </li>
                );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}
