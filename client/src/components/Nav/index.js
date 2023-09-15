import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./index.css";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/test">
              <h6>Test</h6>
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              <h6>Logout</h6>
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row nav">
          <li>
            <Link to="/signup">
              <h6>Signup</h6>
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              <h6>Login</h6>
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/test">
              <h6>Test</h6>
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/group">
              <h6>Group</h6>
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 container items-center">
      <div className="col-5 items-center">
        <h6>Ullr's Tavern</h6>
        </div>
      <div className="col-12 logo">
        <Link to="/">
        <img src="./ut-logo.png" className="logo" alt="logo" />
        </Link>
      </div>
        <div className="col-5">
        {showNavigation()}
        </div>
    </header >
  );
}

export default Nav;
