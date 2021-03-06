import React from "react";
import axios from "axios";
import { Consumer } from "../Context";
import { Link } from "react-router-dom";

class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.id,
      courseUser: {},
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: null,
    };
  }

  // when component loads calls getCourse to load cours data
  componentDidMount() {
    this.getCourse();
  }

  //  GET request for course data
  getCourse = async () => {
    const url = `http://localhost:5000/api/courses/${this.state.courseId}`;

    await axios
      .get(url)
      .then((res) => {
        this.setState({
          courseUser: res.data.course[0].User,
          courseMaterials: res.data.course[0].materialsNeeded,
          title: res.data.course[0].title,
          description: res.data.course[0].description,
          estimatedTime: res.data.course[0].estimatedTime,
          materialsNeeded: res.data.course[0].materialsNeeded,
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

  // displays the course data
  render() {
    return (
      <Consumer>
        {(context) => (
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            {this.state.errors ? (
              <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                    {this.state.errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div>
              <form
                onSubmit={(e) => {
                  this.handleSubmit(
                    e,
                    context.authenticatedUser,
                    this.state.title,
                    this.state.description,
                    this.state.estimatedTime,
                    this.state.materialsNeeded,
                    this.state.courseId
                  );
                }}
              >
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Title..."
                        value={this.state.title}
                        onChange={this.change}
                      />
                    </div>
                    <p>
                      By {this.state.courseUser.firstName}{" "}
                      {this.state.courseUser.lastName}
                    </p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        className=""
                        placeholder="Course description..."
                        value={this.state.description}
                        onChange={this.change}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            className="course--time--input"
                            placeholder="Hours"
                            value={this.state.estimatedTime}
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            className=""
                            placeholder="List materials..."
                            value={this.state.materialsNeeded}
                            onChange={this.change}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">
                    Update Course
                  </button>
                  <Link
                    className="button button-secondary"
                    to={`/courses/${this.state.courseId}`}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </Consumer>
    );
  }

  // change handler updates state with the current value of input fields
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  //  on submit PUT request to update course
  handleSubmit = async (
    e,
    authenticatedUser,
    title,
    description,
    estimatedTime,
    materialsNeeded,
    courseId
  ) => {
    e.preventDefault();

    // if title and description are not blank, clears any previous errors
    if (title && description) {
      this.setState({ errors: null });
    }
    // must be logged in and the course owner to update the course
    if (authenticatedUser) {
      const emailAddress = authenticatedUser.username;
      const userId = authenticatedUser.id;
      const password = authenticatedUser.password;
      const url = `http://localhost:5000/api/courses/${courseId}`;

      if (userId === this.state.courseUser.id) {
        await axios
          .put(
            url,
            {
              title: title,
              description: description,
              estimatedTime: estimatedTime,
              materialsNeeded: materialsNeeded,
              userId: userId,
            },
            {
              auth: {
                username: emailAddress,
                password: password,
              },
            }
          )
          .catch((error) => {
            this.setState({ errors: error.response.data.errorMessages });
          });
      } else {
        this.props.history.push("/forbidden");
      }
    }
  };
}

export default UpdateCourse;
