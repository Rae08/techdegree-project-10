import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from './components/Courses';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp'
import CreateCourse from './components/CreateCourse';

class App extends React.Component {
  
  render() {
    return(
      <div className="root">
        <BrowserRouter>
        <Header />
        <CreateCourse />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
