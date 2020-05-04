import React from "react";
import { Link } from "react-router-dom";

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      courseId: this.props.match.params.id,
      course: [],
      courseMaterials: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.state.courseId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            course: result.course,
            courseMaterials: result.course[0].materialsNeeded,
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
    const { error, isLoaded, courseMaterials } = this.state;
    const course = this.state.course[0];
    let materialsNeeded = [];

    if (courseMaterials) {
      materialsNeeded = courseMaterials.toString().split("\n");
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to={`/courses/${course.id}/update`}>
                    Update Course
                  </Link>
                  <Link className="button" to="/">
                    Delete Course
                  </Link>
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
                <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
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
      );
    }
  }
}

export default CourseDetail;
