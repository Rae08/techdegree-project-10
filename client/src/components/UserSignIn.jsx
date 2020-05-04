import React from "react";

class UserSignIn extends React.Component {
  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value=""
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value=""
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button class="button" type="submit">
                  Sign In
                </button>
                <button
                  className="button button-secondary"
                  onclick="event.preventDefault(); location.href='index.html';"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>
            Don't have a user account? <a href="sign-up.html">Click here</a> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}

export default UserSignIn;