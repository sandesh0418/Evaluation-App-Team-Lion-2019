import React, { Component } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Axios from "axios";
import {
  addCoordinator,
  viewCoordinator,
  getDepartment
} from "../../../actions/addCoordinator";
import classnames from "classnames";

// function DisplayDepartment(props) {
//   return props.getDepartment.map((singleValue, index) => {
//     return (
//       <option>
//         key={singleValue.department_Id} value={singleValue.department_Name}
//       </option>
//     );
//   });
// }

class Admin extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      department: "",
      errors: {},
      departmentList: "",
      selectedDepartment: ""
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
      email: this.state.email,
      department: this.state.department
    };

    this.props.addCoordinator(obj);
  }

  render() {
    let { coordinators } = this.props;
    var display = " ";

    if (coordinators.getDept != null) {
      display = coordinators.getDept.map((singleValue, index) => (
        <option>{singleValue.department_Name}</option>
      ));
    }
    const { errors } = this.state;
    return (
      <div>
        <span>
          <h2>Add Coordinator</h2>
        </span>
        <Form style={{ border: "1px solid grey" }} onSubmit={this.onSubmit}>
          <div style={{ padding: "20px" }}>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email
                })}
                required
              />

              <label htmlFor="email">Coordinator's Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <select
                className="form-control"
                value={this.state.department}
                name="department"
                onChange={this.onChange}
                onClick={this.onChange}
              >
                <option value="default">Select Department: </option>
                {display}
              {/* <displayDepartment departmentList={coordinators.getDept } /> */}
              </select>
            </div>
            
                {/* {display}
                <div>
                <DisplayDepartment/>
                </div> */}

            <div>
              <a
                href="/admin"
                className="btn btn-success mb-4"
                id={this.state.email}
                type="submit"
                onClick={this.onSubmit}
              >
                Add coordinator
              </a>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

Admin.propTypes = {
  addCoordinator: PropTypes.func.isRequired,
  viewCoordinator: PropTypes.func.isRequired,
  getDepartment: PropTypes.func.isRequired,
  coordinators: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coordinators: state.coordinators,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addCoordinator, viewCoordinator, getDepartment }
)(Admin);
