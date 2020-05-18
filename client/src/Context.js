import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: null,
    password: null
  }

  render() {
    return(
      <Context.Provider
      value={{
        authenticatedUser: this.state.authenticatedUser,
        password: this.state.password,
        signIn: this.signIn
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

} 
export const Consumer = Context.Consumer;