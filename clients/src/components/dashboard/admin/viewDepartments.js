import React, { Component } from "react";
import { addDepartment, getDepartment } from "../../../actions/addCoordinator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Axios from "axios";
import Loader from "react-loader-spinner";
import { Form } from "react-bootstrap";
import classnames from "classnames";
import "../../../stylesheets/department.css";

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
    
    this.props.addDepartment(obj);
    
  }

  removeDepartment(e) {
 
    Axios.post("/api/Coordinator/removeDepartment", {
      department: e.target.id
    }).then(res => {});
  }

  render() {
    let { coordinators } = this.props;
    var display = " ";
    

    if (coordinators.getDept != null) {
      display = coordinators.getDept.map((singleValue, index) => (
        <div
        className="col-sm-8"
          style={{ margin: "auto", padding: "20px" }}
          key={index}
        >
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
          <hr />
        </div>
      ));
    } else {
      display = <Loader type="Oval" color="black" height="100" width="100" />;
    }
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" id="kush">
            <h2 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Add Department
            </h2>
            <Form onSubmit={this.onSubmit}>
              <div className="input-field col s12" id="middle">
                <input
                  onChange={this.onChange}
                  value={this.state.department}
                  id="department"
                  type="text"
                  error={errors.email}
                  className={classnames("", {
                    invalid: errors.department
                  })}
                  required
                />
                <label htmlFor="department">Department's Name</label>
                <span className="red-text">{errors.department}</span>
        

                <div>
                  <a
                    id="button"
                    id="dept_name"
                    href="/departments"
                    className="btn btn-secondary mb-4"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Add Department
                  </a>
                  </div>
                  </div>
            </Form>
            </div>
          

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="card">
              <div className="card-body">
                <h2 style={{ textAlign: "center" }}>List of Departments</h2>

                {display}
              </div>
            </div>
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
