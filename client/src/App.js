import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from './components/Courses';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp'
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import { Provider } from './Context';

class App extends React.Component {
  
  render() {
    return(
      <div className="root">
        <Provider>
        <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" render={routeProps => (
                <CourseDetail
                  {...routeProps}
                />
              )} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route component={NotFound} />
        </Switch>
        </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App;
