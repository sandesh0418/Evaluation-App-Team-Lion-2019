import React, {Component} from 'react';
import './popup.css';

/**
 * Props:
 * -closePopup: a function to close the popup.
 * -rubrics: the list of rubrics to show in select form.
 * -submit: a function to save the changes to the measure.
 * -handleRubricChange: a function to change the rubric
 * -handleDescriptionChange: to change the description
 * -handleTargetScoreChange: to change desired score.
 * -handlePercentToReachTargetChange: to change percent to reach target.
 */

const Rubrics = props => {
  return props.rubrics.map(r => {
    return <option key={r.Rubric_Title} value={r.Rubric_Title}>{r.Rubric_Title}</option>
  })
}

export default class AddRubricMeasurePopup extends Component
{

    constructor(props)
    {
      super(props);
      this.handleRubricChange = this.handleRubricChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleTargetScoreChange = this.handleDesiredScoreChange.bind(this);
      this.handlePercentToReachTargetChange = this.handleDesiredAchievementChange.bind(this);
      this.state = {
        rubric: '',
        description: "Enter measure description.  This will displayed in Program Assessment Summary.",
        targetScore: 0,
        percentToReachTarget: 0
      }
    }

    handleRubricChange(e)
    {
        this.setState({
          rubric: e.target.value
        })
    }

    handleDescriptionChange(e)
    {
        this.setState({
          description: e.target.value
        })
    }

    handleDesiredScoreChange(e)
    {
      this.setState({
        desiredScore: e.target.value
      })
    }

    handleDesiredAchievementChange(e)
    {
      this.setState({
        desiredAcievement: e.target.value
      })
    }

    render() {
        return (
          <div className='popup'>
            <div className='popup_inner p-4'>
              <h1>Define Rubric Measure</h1>
              <form>
                <div className="form-group">
                  <label>Select rubric: </label>
                  <select 
                    className="form-control"
                    value={this.state.rubric} 
                    onChange={this.handleRubricChange}>
                    <Rubrics rubrics={this.props.rubrics} />
                  </select>
                </div>
                <div className="form-group">
                  <label>Enter Measure Description: </label>
                  <textarea 
                    className="form-control" 
                    rows="7"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Enter desired score: </label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={this.state.targetScore} 
                    onChange={this.handleDesiredScoreChange}
                    min="0" />
                </div>
                <div className="form-group">
                  <label>Enter percent to achieve score: </label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={this.state.percentToReachTarget}
                    onChange={this.handleDesiredAchievementChange} 
                    min="0" 
                    max="100" />
                </div>
              </form>
              <button
                className="btn btn-primary mr-4" 
                onClick={this.props.submit}
                eventKey={this.state}>
                {console.log(this.state)}
                Submit
              </button>
              <button 
                className="btn btn-danger" 
                onClick={this.props.closePopup}>
                Cancel
              </button>
            </div>
          </div>
        );
      }
}