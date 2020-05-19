import React from "react";
import { Route, Link } from "react-router-dom";
import { Consumer } from "../Context";
import axios from "axios";

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      courseId: this.props.match.params.id,
      course: [],
      courseMaterials: [],
      courseUser: {},
    };
  }

  componentDidMount() {
    this.getCourse();
  }

  getCourse = async () => {
    const url = `http://localhost:5000/api/courses/${this.state.courseId}`;

    let res = await axios.get(url);
    this.setState({
      course: res.data.course[0],
      courseUser: res.data.course[0].User,
      courseMaterials: res.data.course[0].materialsNeeded,
    });
  };

  render() {
    const course = this.state.course;
    const courseUser = this.state.courseUser;
    let materialsNeeded = [];

    if (this.state.courseMaterials) {
      materialsNeeded = this.state.courseMaterials.toString().split("\n");
    }

    return (
      <Consumer>
        {(context) => (
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    <Link
                      className="button"
                      to={`/courses/${course.id}/update`}
                    >
                      Update Course
                    </Link>
                    <Route
                      render={({ history }) => (
                        <Link
                          className="button"
                          onClick={(e) => {
                            context.actions.delete(e, course.id, history);
                          }}
                        >
                          Delete Course
                        </Link>
                      )}
                    />
                  </span>
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>{`By ${courseUser.firstName} ${courseUser.lastName}`}</p>
                </div>
                <div className="course--description">
                  <p>{course.description}</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        {materialsNeeded.map((material) => (
                          <li>{material}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default CourseDetail;
