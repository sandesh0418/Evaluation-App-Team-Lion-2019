import React, {Component} from 'react';
import './popup.css';

/**
 * Props:
 * -closePopup: a function to close the popup.
 * -rubrics: the list of rubrics to show in select form.
 * -submit: a function to save the changes to the measure.
 * -handleInputChange: a function to take inputs by name and update their state.
 * -rubric: the current selected rubric.
 * -description: the description that will be in the new measure
 * -targetScore: the target score of the new measure
 * -percentToReachTarget: the percent to reach to the target score
 */

const Rubrics = props => {
  return props.rubrics.map(r => {
    return <option key={r.Rubric_Title} value={r.Rubric_Title}>{r.Rubric_Title}</option>
  })
}

const SelectTargetScore = props => {
  return props.rubric.scale.map(s => {
    return <option key={s.Value_Number} value={s.Value_Number}>{s.Value_Name}</option>
  })
}

export default class AddRubricMeasurePopup extends Component
{

    constructor(props)
    {
      super(props);
      this.mapTitleToRubric = this.mapTitleToRubric.bind(this);
    }

    mapTitleToRubric()
    {
      let index = this.props.rubrics.findIndex(r => r.Rubric_Title === this.props.rubric);
      console.log(this.props.rubrics[index].scale[0]);
      return this.props.rubrics[index];
    }

    render() {
        return (
          <div className='popup' >
            <div className='popup_inner p-4' style={{overflow: "auto", height: "100%"}}>
              <h1>Define Rubric Measure</h1>
              <label>Description of new measure: </label>
              <p>
                {"At least " + this.props.percentToReachTarget + "% of subjects score a '" + 
                this.mapTitleToRubric().scale[this.props.targetScore - 1].Value_Name + "' or higher on " + 
                this.props.rubric + "."}
              </p>
              <p className="ml-3">{this.props.description}</p>
              <form>
                <div className="form-group">
                  <label>Select rubric: </label>
                  <select 
                    className="form-control"
                    value={this.props.rubric} 
                    name="toolName"
                    onChange={this.props.handleInputChange}
                    onClick={this.props.handleInputChange}>
                    <Rubrics rubrics={this.props.rubrics} />
                  </select>
                </div>
                <div className="form-group">
                  <label>Enter Measure Description: </label>
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
                  <label>Select target score: </label>
                  <select 
                    className="form-control bg-sm"
                    name="targetScore"
                    value={this.props.targetScore} 
                    onChange={this.props.handleInputChange}
                    onClick={this.props.handleInputChange}>
                    <SelectTargetScore rubric={this.mapTitleToRubric()} />
                  </select>
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
              </form>
              <button
                className="btn btn-primary mr-4" 
                name="rubricMeasure"
                onClick={this.props.submit}>
                Submit
              </button>
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