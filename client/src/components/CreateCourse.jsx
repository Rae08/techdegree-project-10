import React from "react";
import { Consumer } from "../Context";
import axios from "axios";
import { Link } from "react-router-dom";

class CreateCourse extends React.Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: null,
  };

  // displays the create course form
  render() {
    return (
      <Consumer>
        {(context) => (
          <div className="bounds course--detail">
            <h1>Create Course</h1>
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
                    this.state.materialsNeeded
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
                        placeholder="Course title..."
                        value={this.state.title}
                        onChange={this.change}
                      />
                    </div>
                    {context.authenticatedUser ? (
                      <p>
                        By {context.authenticatedUser.firstName}{" "}
                        {context.authenticatedUser.lastName}
                      </p>
                    ) : (
                      <p>By</p>
                    )}
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
                    Create Course
                  </button>
                  <Link className="button button-secondary" to="/">
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

  //  change handler to pass the current value of input field into state
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // after submit POST request
  handleSubmit = (
    e,
    authenticatedUser,
    title,
    description,
    estimatedTime,
    materialsNeeded
  ) => {
    e.preventDefault();

    // user must be logged in to create a course
    if (authenticatedUser) {
      const emailAddress = authenticatedUser.username;
      const password = authenticatedUser.password;
      const userId = authenticatedUser.id;

      // the the title and description are not blank, clears any previous errors
      if (title && description) {
        this.setState({ errors: null });
      }

      // POST request to /courses
      axios
        .post(
          "http://localhost:5000/api/courses",
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
          if (error.response.status === 500) {
            this.props.history.push("/error");
          } else {
            this.setState({ errors: error.response.data.errorMessages });
          }
        });
    }
  };
}

export default CreateCourse;
