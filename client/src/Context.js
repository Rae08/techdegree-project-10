import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };

  render() {
    return (
      <Context.Provider
        value={{
          authenticatedUser: this.state.authenticatedUser,
          password: this.state.password,
          actions: {
            signIn: this.signIn,
            delete: this.delete,
            signOut: this.signOut,
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

  signIn = async (e, history) => {
    e.preventDefault();
    console.log(history);

    const emailAddress = e.target[0].value;
    const password = e.target[1].value;

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

    history.goBack();
  };

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });

    Cookies.remove("authenticatedUser");
  };

}
export const Consumer = Context.Consumer;
