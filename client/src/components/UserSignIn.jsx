import React from "react";
import { Consumer, Provider } from "../Context";
import { Link, Redirect } from "react-router-dom";

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
                <form onSubmit={context.actions.signIn}>
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
                    <button
                      className="button button-secondary"
                      onClick={this.cancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <p>
                Don't have a user account? <Link to="/signup">Click here</Link>
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

  cancel = () => {
    this.props.history.push("/");
  };
}

export default UserSignIn;
