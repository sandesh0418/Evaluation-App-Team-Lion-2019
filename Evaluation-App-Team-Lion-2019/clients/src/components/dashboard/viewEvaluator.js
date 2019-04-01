import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

export default class ViewEvaluator extends Component
{

    render()
    {
        return(
            <div>
                <Alert color="success">
                    <h1> Test</h1>
                </Alert> 

            </div>
        );
    }
}

Alert.propTypes = {
    className: PropTypes.string,
    closeClassName: PropTypes.string,
    color: PropTypes.string, // default: 'success'
    isOpen: PropTypes.bool,  // default: true
    toggle: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    //fade: PropTypes.bool, // default: true
    // Controls the transition of the alert fading in and out
    // See Fade for more details
    //transition: PropTypes.shape(Fade.propTypes),
  }