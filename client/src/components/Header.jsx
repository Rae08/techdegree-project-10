import React from "react";
import { NavLink } from "react-router-dom";
import { Consumer } from "../Context";

const Header = () => {
  return (
    <Consumer>
      {(context) => (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            {context.authenticatedUser ? (
              <nav>
                <span>
                  Welcome, {context.authenticatedUser.firstName}{" "}
                  {context.authenticatedUser.lastName}!
                </span>
                <NavLink className="signout" to="/">
                  Sign Out
                </NavLink>
              </nav>
            ) : (
              <nav>
                <NavLink className="signup" to="/signup">
                  Sign Up
                </NavLink>
                <NavLink className="signin" to="/signin">
                  Sign In
                </NavLink>
              </nav>
            )}
          </div>
        </div>
      )}
    </Consumer>
  );
};

export default Header;
