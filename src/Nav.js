import React from "react";
import logo from "./assets/images/camera_logo.png";
import Signup from "./Signup";
import Login from "./Login";

import "./Nav.css";

function Nav() {
  return (
  <div>
    <div className="nav__header">
      <img className="nav__headerImage" src={logo} alt="pictogram logo" />
      <h3>pictogram</h3>
    </div>
    <div className="user__buttons">
      <Signup />
      <Login />
      </div>
    </div>
  );
}

export default Nav;
