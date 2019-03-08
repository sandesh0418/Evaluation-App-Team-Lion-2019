import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavBar from '../layout/navAdmin';

class Dashboard extends Component {
  

  render() {
    const { user } = this.props.auth;
    console.log(user)
    return (
      <div>
        <NavBar />
      
     
      </div>
    );
  }
}

Dashboard.propTypes = {
 
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
