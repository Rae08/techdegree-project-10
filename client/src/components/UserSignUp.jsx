import React from "react";
import { Link, Route } from "react-router-dom";
import { Consumer } from "../Context";

class UserSignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: null,
  };

  render() {
    return (
      <Consumer>
        {(context) => (
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              {context.errors ? (
                <div>
                  <h2 className="validation--errors--label">
                    Validation errors
                  </h2>
                  <div className="validation-errors">
                    <ul>
                      {context.errors.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div>
                <Route
                  render={({ history }) => (
                    <form
                      onSubmit={(e) => {
                        context.actions.signUp(
                          e,
                          history,
                          this.state.firstName,
                          this.state.lastName,
                          this.state.emailAddress,
                          this.state.password
                        );
                      }}
                    >
                      <div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          className=""
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={this.change}
                        />
                      </div>
                      <div>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className=""
                          placeholder="Last Name"
                          value={this.state.lastName}
                          onChange={this.change}
                        />
                      </div>
                      <div>
                        <input
                          id="emailAddress"
                          name="emailAddress"
                          type="text"
                          className=""
                          placeholder="Email Address"
                          value={this.state.emailAddress}
                          onChange={this.change}
                        />
                      </div>
                      <div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className=""
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.change}
                        />
                      </div>
                      <div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          className=""
                          placeholder="Confirm Password"
                          value={this.state.confirmPassword}
                          onChange={this.change}
                        />
                      </div>
                      <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">
                          Sign Up
                        </button>
                        <Link className="button button-secondary" to="/">
                          Cancel
                        </Link>
                      </div>
                    </form>
                  )}
                ></Route>
              </div>
              <p>
                Already have a user account?{" "}
                <a href="sign-in.html">Click here</a> to sign in!
              </p>
            </div>
          </div>
        )}
      </Consumer>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
}

export default UserSignUp;
