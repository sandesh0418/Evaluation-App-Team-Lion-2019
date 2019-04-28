import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import uuid from "uuid/v1";
import "../../../stylesheets/viewCuriculum.css";

function CurriculumList(props) {
  return props.curriculum.map(c => {
    return (
      <div className="row">
        <div className="col-3" class="testColums">
          {props.editMode ? (
            <input
              type="text"
              id={c.courseId}
              maxLength="4"
              value={c.departmentCode}
              name="departmentCode"
              onChange={props.editCourse}
              required
            />
          ) : (
            c.departmentCode
          )}
        </div>
        <div className="col-3" class="testColums">
          {props.editMode ? (
            <input
              type="number"
              id={c.courseId}
              min="0"
              max="9999"
              value={c.courseCode}
              name="courseCode"
              onChange={props.editCourse}
              required
            />
          ) : (
            c.courseCode
          )}
        </div>
        <div className="col-3" class="testColums">
          {props.editMode ? (
            <input
              type="text"
              id={c.courseId}
              min="0"
              max="9999"
              value={c.name}
              name="name"
              onChange={props.editCourse}
            />
          ) : (
            c.name
          )}
        </div>
        <div className="col-3" class="testColums">
          {props.editMode ? (
            <input
              type="number"
              id={c.courseId}
              min="0"
              max="99"
              value={c.creditHours}
              name="creditHours"
              onChange={props.editCourse}
            />
          ) : (
            c.creditHours
          )}
        </div>
        {props.editMode ? (
          <button
            type="button"
            id={c.courseId}
            name="delete"
            className="btn btn-danger btn-sm button3"
            onClick={props.editCourse}
          >
            Delete Course
          </button>
        ) : null}
      </div>
    );
  });
}

export default class ViewSummary extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      curriculum: null,
      editMode: false,
      deletedIds: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/curriculum/getCurriculum/" + localStorage.getItem("Cycle_Id"))
      .then(res => {
        console.log(res.data);
        this.setState({
          curriculum: res.data.curriculum
        });
      });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addCourse() {
    let tempCurriculum = this.state.curriculum;
    let newId = uuid();
    tempCurriculum.push({
      deparmentCode: "",
      courseCode: "",
      creditHours: 0,
      name: "",
      courseId: newId
    });

    this.setState({
      curriculum: tempCurriculum
    });
  }

  editCourse(e) {
    let tempCurriculum = this.state.curriculum;
    let courseIndex = tempCurriculum.findIndex(c => c.courseId === e.target.id);

    if (e.target.name === "departmentCode") {
      tempCurriculum[courseIndex].departmentCode = e.target.value;
    } else if (e.target.name === "courseCode") {
      tempCurriculum[courseIndex].courseCode = e.target.value;
    } else if (e.target.name === "creditHours") {
      tempCurriculum[courseIndex].creditHours = e.target.value;
    } else if (e.target.name === "name") {
      tempCurriculum[courseIndex].name = e.target.value;
    } else if (e.target.name === "delete") {
      tempCurriculum.splice(courseIndex, 1);

      let tempDeletedIds = this.state.deletedIds;
      tempDeletedIds.push(e.target.id);

      this.setState({
        deletedIds: tempDeletedIds
      });
    }

    this.setState({
      curriculum: tempCurriculum
    });
  }

  cancel(e) {
    window.location.reload();
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.curriculum.length > 0) {
      let editCurriculum = {
        curriculum: this.state.curriculum,
        cycleId: localStorage.getItem("Cycle_Id")
      };

      axios.post("/api/curriculum/editCurriculum", editCurriculum).then(res => {
        alert(res.data.message);
        window.location.reload();
      });
    }

    if (this.state.deletedIds.length > 0) {
      axios
        .post("/api/curriculum/deleteCourses", this.state.deletedIds)
        .then(res => {});
    }
  }

  render() {
    if (this.state.curriculum === null) {
      return <Loader type="Oval" color="black" height="100" width="100" />;
    } else {
      return (
        <div className="container">
          <div className="col">
            <div className="row">
              <h2 id="cyclecuriculum">Cycle Curriculum</h2>
            </div>
            <form onSubmit={this.onSubmit}>
              {this.state.curriculum.length > 0 ? (
                <>
                  <div className="row">
                    <div className="col-3" class="testColums">
                      Department Code
                    </div>
                    <div className="col-3" class="testColums">
                      Course Code
                    </div>
                    <div className="col-3" class="testColums">
                      Course Name
                    </div>
                    <div className="col-3" class="testColums">
                      Credit Hours
                    </div>
                  </div>
                  <CurriculumList
                    curriculum={this.state.curriculum}
                    editCourse={this.editCourse}
                    editMode={this.state.editMode}
                  />
                </>
              ) : (
                <p>There is no curriculum associated with this cycle.</p>
              )}

              {this.state.editMode ? (
                <>
                  <div className="mb-3" id="button1">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.addCourse}
                    >
                      Add Course
                    </button>
                  </div>
                  <div id="button2">
                    <input
                      className="btn btn-success mr-3"
                      type="submit"
                      value="Save Changes"
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.cancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div id="button4">
                  <button
                    className="btn btn-primary button3"
                    name="editMode"
                    value="true"
                    type="button"
                    onClick={this.handleInput}
                    style={{ margin: "0 auto !important" }}
                  >
                    Edit Curriculum
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      );
    }
  }
}
