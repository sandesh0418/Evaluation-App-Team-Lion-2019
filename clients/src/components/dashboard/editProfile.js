import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser, logoutUser } from "../../actions/authActions";
import classnames from "classnames";

class EditProfile extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      currentpassword: '',
      password: '',
      message: false,
      password2: '',
      errors: {}
    };
  }


  componentWillReceiveProps(nextProps) {
   
    
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors.errors
      });
    }
    else{
      this.props.logoutUser();
    }
   
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const obj ={
      currentpassword: this.state.currentpassword,
      password: this.state.password,
      password2:this.state.password2,
      email: localStorage.email
    }

   

    this.props.updateUser(obj);
  };

  render() {
    const { errors } = this.state;
    

    var m;

    if(this.state.message === true){
      m = <div className="alert alert-success" role="alert">
      Your password has been updated
    </div>
    }

    return (
      <div className="container" id="regcontent">
      {m}
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Change your password </b>below! 
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              
             
              

              <div className="input-field col s12">
                <input
                  
                  defaultValue={localStorage.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                  readOnly = "readOnly"
                />


                
                <label htmlFor="email">Your Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.currentpassword}
                  error={errors.currentpassword}
                  id="currentpassword"
                  type="password"
                  className={classnames("", {
                    invalid: errors.currentpassword
                  })}
                />
                <label htmlFor="currentpassword">Enter your current password</label>
                <span className="red-text">{errors.currentpassword}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Enter a new password</label>
                <span className="red-text">{errors.password}</span>
              </div>

              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Retype your Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser, logoutUser }
)(withRouter(EditProfile));
