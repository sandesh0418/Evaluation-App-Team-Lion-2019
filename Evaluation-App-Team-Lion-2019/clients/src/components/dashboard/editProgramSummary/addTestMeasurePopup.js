import React, {Component} from 'react';
import './popup.css';

/**
 * Props:
 * -closePopup: a function to close the popup.
 * -submit: a function to save the changes to the measure.
 * -handleInputChange: a function to take inputs by name and update their state.
 * -description: the description that will be in the new measure
 * -targetScore: the target score of the new measure
 * -percentToReachTarget: the percent to reach to the target score
 */

export default class AddTestMeasurePopup extends Component
{
    render() {
        return (
          <div className='popup' >
            <div className='popup_inner p-4' style={{overflow: "auto", height: "100%"}}>
              <h1>Define Test Measure </h1>
              <form onSubmit={this.props.submit} className="mb-3">
              <div className="form-group">
                <label>Enter rubric name: </label>
                <input
                  className="form-control"
                  type="text"
                  name="measureName"
                  value={this.props.measureName}
                  onChange={this.props.handleInputChange}
                  required
                />
              </div>
              <label>Description of new measure:</label>
              <p>
                {"At least " + this.props.percentToReachTarget + "% of subjects score a " + 
                this.props.targetScore + "% or higher on " + this.props.testName + "."}
              </p>
              <p className="ml-3">{this.props.description}</p>
                <div className="form-group">
                  <label>Enter Test Name: </label>
                  <input 
                    type="text"
                    className="form-control"
                    name="toolName"
                    value={this.props.testName}
                    onChange={this.props.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>(Optional) Additional Information: </label>
                  <textarea 
                    className="form-control" 
                    rows="7"
                    name="description"
                    placeholder="(Optional) Add additional information."
                    value={this.props.description}
                    onChange={this.props.handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Enter target score: </label>
                  <input 
                    type="number" 
                    className="form-control bg-sm"
                    name="targetScore"
                    value={this.props.targetScore} 
                    onChange={this.props.handleInputChange}
                    min="0" />
                </div>
                <div className="form-group">
                  <label>Enter percent to achieve score: </label>
                  <input 
                    type="number" 
                    className="form-control"
                    name="percentToReachTarget"
                    value={this.props.percentToReachTarget}
                    onChange={this.props.handleInputChange} 
                    min="0" 
                    max="100" />
                </div>
              <input
                type="submit"
                className="btn btn-primary mr-4" 
                name="testMeasure"
              />
              </form>
              <button 
                className="btn btn-danger mr-4" 
                onClick={this.props.closePopup}>
                Cancel
              </button>
            </div>
          </div>
        );
      }
}