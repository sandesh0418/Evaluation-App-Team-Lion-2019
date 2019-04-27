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
import '../../../stylesheets/admin.css';



class Admin extends Component {
  constructor(props) {
    super(props);
   this.onChange=this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      open: false,
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
      department: this.state.selectedDepartment
    };

   

    this.props.addCoordinator(obj);
  }

  render() {
    const { open } = this.state;
    let { coordinators } = this.props;
    var display = " ";

    if (coordinators.getDept != null) {
      display = coordinators.getDept.map((singleValue, index) => (
        

        <option key={index} 
                value={singleValue.department_Id}>{singleValue.department_Name}</option>
        
      ));
      
      
    }
    const { errors } = this.state;
    return (
      <div>
        
        <div id="main">
        <span>
          <h2>Add Coordinator</h2>
        </span>
        <Form onSubmit={this.onSubmit}>
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
             
                <select style={{display: "flex", border: "2px solid #ccc"}} 
                    onChange={this.onChange} 
                    value={this.state.selectedDepartment} 
                    id="selectedDepartment" 
                    error={errors.department}  
                    className={classnames("", {
                      invalid: errors.department
                    })}>
                    <option>-- Select a department --</option>
                    
                {display}
              
              </select>
              <span className="red-text">{errors.department}</span>
            </div>
            
               

            <div>
              <a id="button"
                href="/admin"
                className="btn btn-secondary mb-4"
                
                type="submit"
                onClick={this.onSubmit}
              >
                Add coordinator
              </a>
            </div>
          </div>
        </Form>
        </div>
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
