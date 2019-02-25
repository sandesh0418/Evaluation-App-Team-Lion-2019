import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav-bar/navEvaluator';

//dummy data
var criteriaOne = {
    description: "Subject Knowledge",
    scores: [
        "student does not have grasp of info; cannot answer questions.",
            "uncomfortable with info; able to answer very few questions.",
            "comfortable with info; can answer simple questions.",
            "shows full knowledge; answers questions easily but does not elaborate",
            "knowledge is more than required; answers questions with details and elaboration"
    ]
}

var criteriaTwo = {
    description: "Organization",
    scores: [
        "audience cannot understand  presentation; no logical sequence of information",
        "audience has difficulty following; info jumps around",
        "logical sequence with a few minor jumps",
        "logical sequence",
        "logical sequence;  ideas clearly linked"
    ]
}

var criteriaThree = {
    description: "Use of Communication Aids",
    scores: [
        "numerous spelling and/or  grammar errors; no  communication  aids or detracting aids",
        "several spelling and/or grammar errors; aids highlight unimportant info",
        "few spelling or grammar errors; aids lack originality or adequate development",
        "two or fewer spelling or grammar errors; aids support and relate to text and presentation",
        "no spelling or grammatical errors; aids explain and enhance text and presentation"
    ]
}

var Rubric = {
    title: "Oral Presentation",
    scale: ["1 Limited", "2 Developing", "3 Capable", "4 Strong", "5 Excellent"],
    criteria: [criteriaOne, criteriaTwo, criteriaThree]
}

function generateGradeScale()
{
    return (
        Rubric.scale.map(function(currentScore, i)
        {
            return <option key={i} value={currentScore}>{currentScore}</option>
        })
    );
}

var gradeScale = generateGradeScale();

function displayCriteriaDescriptions(criteria)
{
    return criteria.scores.map(function(currentScore, i)
    {
        return <td key={i}>{currentScore}</td>
    });
}

function displayCriteriaGrade(currentCriteria)
{
        return (
            <select className="form-control" id={currentCriteria.description}>
                <option disabled selected value> -- select an option -- </option>
                {gradeScale}
            </select>
        )
}

export default class RubricList extends Component 
{

    constructor(props)
    {
        super(props);
        this.state = {
            gradeMode: true
        }
    }

    displayScale()
    {
        return Rubric.scale.map(function(currentScore, i)
        {
            return <th scope="col" key={i}>{currentScore}</th>
        });
    }

    displayCriteria()
    {
        let gradeMode = this.state.gradeMode;

        return Rubric.criteria.map(function(currentCriteria, i)
        {
            return (
                <tr>
                    <th scope="row" key={i}>{currentCriteria.description}</th>
                    {displayCriteriaDescriptions(currentCriteria)}
                    {gradeMode ? displayCriteriaGrade(currentCriteria): ""}
                </tr>
            );
        });
    }

    displayGradeColumn()
    {
        if(this.state.gradeMode)
        {
            return <th scope="col">Score</th>
        }
    }

    handleSaveGradeClick()
    {
        Rubric.criteria.map(function(currentCriteria)
        {
            return document.getElementById(currentCriteria.description).value;
        })
    }

    render()
    {
        let saveGradeButton;
        if (this.state.gradeMode)
        {
            saveGradeButton = <button type="button" className="btn btn-primary" onClick={this.handleSaveGradeClick}>Save Grade</button>
        }

        return (
            <div>
                <Nav />
                <h1>Rubric</h1>
                <h2>{Rubric.title}</h2>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Criteria</th>
                            {this.displayScale()}
                            {this.displayGradeColumn()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayCriteria()}
                    </tbody>
                </table>
                {saveGradeButton}
            </div>
        );
    }
}