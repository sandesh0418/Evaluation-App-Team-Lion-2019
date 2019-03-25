import React, {Component} from 'react';
import './popup.css';

/**
 * Props:
 * -closePopup: a function to close the popup.
 */

export default class AddRubricMeasurePopup extends Component
{
    render() {
        return (
          <div className='popup'>
            <div className='popup_inner'>
              <h1>{this.props.text}</h1>
            <button onClick={this.props.closePopup}>close me</button>
            </div>
          </div>
        );
      }
}