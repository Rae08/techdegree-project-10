import React from "react";
import { Link } from "react-router-dom";

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      courses: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            courses: result.courses,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, courses } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="bounds">
          {courses.map((course) => (
            <div className="grid-33" key={course.id}>
              <Link
                className="course--module course--link"
                to={`/courses/${course.id}`}
              >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          ))}
          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Courses;
