import React from "react";
import logo from "./assets/images/camera_logo.png";
import { Link } from 'react-router-dom';

import "./Nav.css";

function Nav() {
  
  return (
    <Link to="/" className="nav__header">
      <img className="nav__headerImage" src={logo} alt="pictogram logo" />
      <h3>pictogram</h3>
    </Link>
  );
}

export default Nav;