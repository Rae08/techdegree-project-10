import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from './components/Courses';
import Header from './components/Header';

class App extends React.Component {
  
  render() {
    return(
      <div className="root">
        <BrowserRouter>
        <Header />
        <Courses />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
