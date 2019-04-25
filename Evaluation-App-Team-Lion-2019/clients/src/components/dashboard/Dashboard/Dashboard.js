import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CyclesInProgress } from '../../../actions/cycle';


class Dashboard extends Component {

  componentDidMount(){

  }
  

  render() {
    const { user } = this.props.auth;
    
    return (
      <div>
        <p>Future Dashboard Here.</p>
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
