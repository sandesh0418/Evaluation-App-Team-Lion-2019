import React, { Component } from "react";
import { addDepartment, getDepartment } from "../../../actions/addCoordinator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Axios from "axios";
import { ClipLoader } from "react-spinners";
import { Form } from "react-bootstrap";
import classnames from "classnames";

class ViewDepartments extends Component {
  constructor(props) {
    super(props);
    this.removeDepartment = this.removeDepartment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      errors: {},
      department: ""
    };
  }

  componentDidMount() {
    this.props.getDepartment();
  }

  onChange(e) {
    this.setState({ [e.target.id]: [e.target.value] });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.errors) {
      this.setState({ errors: nextProps.errors.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      department: this.state.department
    };
    console.log(obj);
    this.props.addDepartment(obj);
    window.location.replace("/departments");
  }

  removeDepartment(e) {
    console.log(e.target.id);
    Axios.post("/Coordinator/removeDepartment", {
      department: e.target.id
    }).then(res => {});
  }

  render() {
    let { coordinators } = this.props;
    var display = " ";
    var load = "";

    if (coordinators.getDept != null) {
      display = coordinators.getDept.map((singleValue, index) => (
        <div class="col-sm-8" style={{ margin: "auto" }} key={index}>
          <div class="card">
            <div class="card-body">
              <h5>Department: {singleValue.department_Name}</h5>
              <a
                href="/departments"
                className="btn btn-danger"
                style={{ height: "100%" }}
                id={singleValue.department_Name}
                onClick={this.removeDepartment}
              >
                Remove this Department
              </a>
            </div>
          </div>
        </div>
      ));
    } else {
      load = (
        <div className="sweet-loading">
          <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} />
        </div>
      );
    }
    return (
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h2 style={{ textAlign: "center" }}>Add Department</h2>

            <Form style={{ border: "1px solid grey" }} onSubmit={this.onSubmit}>
              <div style={{ padding: "20px" }}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.department}
                    // error={errors.department}
                    id="department"
                    type="department"
                    // className={classnames("", {
                    //   invalid: errors.department
                    // })}
                    required
                  />

                  <label htmlFor="email">Department Name</label>
                  <span className="red-text" />
                </div>

                <div>
                  <a
                    href="/departments"
                    className="btn btn-success mb-4"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Add Department
                  </a>
                </div>
              </div>
            </Form>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h2 style={{ textAlign: "center" }}>List of Departments</h2>

            {display}
          </div>
        </div>
      </div>
    );
  }
}

ViewDepartments.propTypes = {
  addDepartment: PropTypes.func.isRequired,
  getDepartment: PropTypes.func.isRequired,
  coordinators: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  coordinators: state.coordinators,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addDepartment, getDepartment }
)(ViewDepartments);
