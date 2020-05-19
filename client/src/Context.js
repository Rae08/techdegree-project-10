import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();


export class Provider extends Component {
  state = {
    authenticatedUser: null,
    password: null,
  }

  render() {

    return(
      <Context.Provider
      value={{
        authenticatedUser: this.state.authenticatedUser,
        password: this.state.password,
        actions: {
          signIn: this.signIn,
          delete: this.delete
        }
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }

  signIn = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    
    const emailAddress = e.target[0].value;
    const password = e.target[1].value;

    
    axios.get('http://localhost:5000/api/users', {  auth: {
      username: emailAddress,
      password: password
    }})
    .then(res => {this.setState({authenticatedUser: res.data, password: password})})
  }

  delete = (e, id, history) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/courses/${id}`;
    console.log(this.state.authenticatedUser);

    if (this.state.authenticatedUser) {
      const emailAddress = this.state.authenticatedUser.username;
      const password = this.state.password;
      axios.delete(url, {
        auth: {
          username: emailAddress,
          password: password,
        },
      });

      history.push('/');

    } else {
      console.log("Login required");
    }

  };

} 
export const Consumer = Context.Consumer;