import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    errors: null,
  };

  render() {
    return (
      <Context.Provider
        value={{
          authenticatedUser: this.state.authenticatedUser,
          errors: this.state.errors,
          actions: {
            signIn: this.signIn,
            delete: this.delete,
            signOut: this.signOut,
            signUp: this.signUp
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

  // POST request to /users
  // Calls the SignIn method after creating the user and re-directs to the root page
  signUp = async (e, history, firstName, lastName, emailAddress, password) => {
    e.persist();
    e.preventDefault();
    const signIn = false;

   await axios
      .post("http://localhost:5000/api/users", {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password,
      })
      .then(this.setState({errors: null}))
      .catch((error) => {
        if (error.response.data.errorMessages) {
          this.setState({ errors: error.response.data.errorMessages });
        }

        if (error.response.status === 500) {
          this.props.history.push("/error");
        }
      });

      // if there are no errors, sign in the user redirects to root
      if (this.state.errors === null) {
        this.signIn(e, history, emailAddress, password, signIn)
        history.push("/")
      }

  };


// signs in the user and redirects them either to root or previous page
// sets cookies
  signIn = async (e, history, emailAddress, password, signIn) => {
    e.preventDefault();

    await axios
      .get("http://localhost:5000/api/users", {
        auth: {
          username: emailAddress,
          password: password,
        },
      })
      .then((res) => {
        this.setState({
          authenticatedUser: {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: emailAddress,
            password: password,
            id: res.data.id,
          },
        });
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.props.history.push("/error");
        }
      });

    Cookies.set(
      "authenticatedUser",
      JSON.stringify(this.state.authenticatedUser),
      { expires: 1 }
    );
    
   if (signIn === true) {
    history.goBack();
   } else {
     history.push("/")
   }
    
    
  };

  // signs out the user and clears cookies
  signOut = () => {
    this.setState({ authenticatedUser: null});

    Cookies.remove("authenticatedUser");
  };

  

}


export const Consumer = Context.Consumer;
