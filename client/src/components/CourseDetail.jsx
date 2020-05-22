import React from "react";
import { Route, Link } from "react-router-dom";
import { Consumer } from "../Context";
import axios from "axios";
import ReactMarkdown from "react-markdown";

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      courseId: this.props.match.params.id,
      course: [],
      courseUser: {},
    };
  }

  componentDidMount() {
    this.getCourse();
  }

  getCourse = async () => {
    const url = `http://localhost:5000/api/courses/${this.state.courseId}`;

    await axios
      .get(url)
      .then((res) => {
        this.setState({
          course: res.data.course[0],
          courseUser: res.data.course[0].User,
        });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.props.history.push("/notfound");
        }

        if (error.response.status === 500) {
          this.props.history.push("/error");
        }
      });
  };

  render() {
    const course = this.state.course;
    const courseUser = this.state.courseUser;

    return (
      <Consumer>
        {(context) => (
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {context.authenticatedUser ? (
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
                            to=""
                            className="button"
                            onClick={(e) => {
                              context.actions.delete(e, course.id, history);
                            }}
                          >
                            Delete Course
                          </Link>
                        )}
                      />

                      <Link className="button button-secondary" to="/">
                        Return to List
                      </Link>
                    </span>
                  ) : (
                    <Link className="button button-secondary" to="/">
                      Return to List
                    </Link>
                  )}
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
                  <ReactMarkdown>{course.description}</ReactMarkdown>
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
                        <ReactMarkdown>
                          {this.state.course.materialsNeeded}
                        </ReactMarkdown>
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
