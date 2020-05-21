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

  componentDidMount() {
    this.getCourse();
  }

  getCourse = async () => {
    const url = `http://localhost:5000/api/courses/${this.state.courseId}`;

    let res = await axios.get(url);
    this.setState({
      courseUser: res.data.course[0].User,
      courseMaterials: res.data.course[0].materialsNeeded,
      title: res.data.course[0].title,
      description: res.data.course[0].description,
      estimatedTime: res.data.course[0].estimatedTime,
      materialsNeeded: res.data.course[0].materialsNeeded,
    });
  };

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
                    context.password,
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
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  handleSubmit = (
    e,
    authenticatedUser,
    title,
    description,
    estimatedTime,
    materialsNeeded,
    password,
    courseId
  ) => {
    e.preventDefault();

    if (authenticatedUser) {
      const emailAddress = authenticatedUser.username;
      const userId = authenticatedUser.id;
      const url = `http://localhost:5000/api/courses/${courseId}`;

      console.log("Works!");
      axios
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
    }
  };
}

export default UpdateCourse;
