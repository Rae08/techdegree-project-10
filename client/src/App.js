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
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {
  
  render() {
    return(
      <div className="root">
        <Provider>
        <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path="/courses/create" component={CreateCourse} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" render={routeProps => (
                <CourseDetail
                  {...routeProps}
                />
              )} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
        </Switch>
        </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App;
