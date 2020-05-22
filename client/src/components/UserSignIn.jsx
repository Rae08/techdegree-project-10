import React from "react";
import { Consumer } from "../Context";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class UserSignIn extends React.Component {
  state = {
    emailAddress: "",
    password: "",
  };

  render() {
    const { emailAddress, password } = this.state;

    return (
      <Consumer>
        {(context) => (
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign In</h1>
              <div>
                <Route
                  render={({ history }) => (
                    <form
                      onSubmit={(e) => {
                        context.actions.signIn(e, history);
                      }}
                    >
                      <div>
                        <input
                          id="emailAddress"
                          name="emailAddress"
                          type="text"
                          className=""
                          placeholder="Email Address"
                          value={emailAddress}
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
                          value={password}
                          onChange={this.change}
                        />
                      </div>
                      <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">
                          Sign In
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
                Don't have a user account? <Link to="/signup">Click here </Link>
                to sign up!
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

export default UserSignIn;
