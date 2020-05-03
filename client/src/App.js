import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNav from './components/MainNav';
import Courses from './components/Courses';

class App extends React.Component {
  
  render() {
    return(
      <div className="root">
        <BrowserRouter>
        <MainNav />
        <Courses />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
