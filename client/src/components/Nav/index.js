import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
// import logo from './ut-logo.png'

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1 ">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/Test">
              Test
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <>
      <header className="flex-row px-1 container">
        <h1 className="logo">
          <Link to="/">
            <img src="./ut-logo.png" className="logo" alt="logo" />
            {/* <span role="img" aria-label="clinking mugs">🍻</span> */}
          </Link>
        </h1>

        <nav>
          {showNavigation()}
        </nav>
      </header>
    </>
  );
}

export default Nav;
