import React from "react";
import { Logo } from "./Logo.js";

const Navbar = () => (
  <header id="header-global">
      <Logo/>
    <button type="button" id="overflow-menu-trigger" title="Open Navigation Menu">
      <i className="material-icons">view_list</i>
      <span className="screen-reader-text">Open Navigation Menu</span>
    </button>
    <nav id="navigation">
      <h2 className="screen-reader-text">Site Navigation</h2>
      <ul className="navigation-options">
        <li className="navigation-options-item">
          <a href="https://nyentekmaster.netlify.com/projects" id="nav-studies">Featured Projects</a>
        </li>
        <li className="navigation-options-item">
          <a href="https://nyentekmaster.netlify.com/#contact-section-form" id="nav-contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
