import React, {Component} from 'react';
import axios from "axios";

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
    measureId: 1,
    scale: [ [1, "1 - Limited"], [2, "2 - Developing"], [3, "3 - Capable"], [4, "4 - Strong"], [5, "5 - Excellent"]],
    criteria: [criteriaOne, criteriaTwo, criteriaThree]
}

function TopRowGradeScale(props)
{
    return Rubric.scale.map(function(currentScore, i)
        {
            return <th scope="col" key={i}>{currentScore[1]}</th>
        });
}

function CriteriaRow(props)
{
    return Rubric.criteria.map(function(currentCriteria, i)
    {
        return (
            <tr key={i}>
                <th scope="row">{currentCriteria.description}</th>
                <CriteriaDescription criteria={currentCriteria} />
                {props.gradeMode?  <td><CriteriaGradeInput currentCriteria={currentCriteria} /></td> : null}
            </tr>
            );
    });
}

const gradeScale = generateGradeScale();

function CriteriaGradeInput(props)
{
    return (
        <select className="form-control" id={props.currentCriteria.description}>
            <option disabled value> -- select an option -- </option>
            {gradeScale}
        </select>
    )
}

function CriteriaDescription(props)
{
    return props.criteria.scores.map(function(currentScore, i)
    {
        return <td key={i}>{currentScore}</td>
    });
}

function generateGradeScale()
{
    return (
        Rubric.scale.map(function(currentScore, i)
        {
            return <option key={i} value={currentScore[0]}>{currentScore[1]}</option>
        })
    );
}

export default class ViewRubric extends Component
{

    constructor(props)
    {
        super(props);
        this.onChangeSubjectId = this.onChangeSubjectId.bind(this);
        this.handleSaveGradeClick = this.handleSaveGradeClick.bind(this);
        this.handleAverageScoreClick = this.handleAverageScoreClick.bind(this);
        this.state = {
            gradeMode: false,
            subjectID: '',
            averageScore: 1,
            calcAverage: 2,
        }
    }

    componentDidMount()
    {
        this.setView();
    }

    setView()
    {
        if (window.location.pathname==='/gradeRubric')
        {
            this.setState({
                gradeMode: true
            })
        }
    }

    handleSaveGradeClick()
    {
        let scores = Rubric.criteria.map(function(currentCriteria)
        {
            return {description: currentCriteria.description,
                    value: document.getElementById(currentCriteria.description).value};
        })

        let subjectScore = {measureId: 1,
                            userCWID: sessionStorage.getItem('userCWID'),
                            subjectId: this.state.subjectId,
                            scores: scores};

        axios.post('http://localhost:8000/subjectScore', subjectScore)
        .then(res =>{
            console.log(res.data);
        });
        alert("The score has been saved.");
    }

    handleAverageScoreClick(e)
    {
        this.setState({
            calcAverage: e.target.value 
        })
        let totalScore = 0;
        let numberOfCriteria = 0;
        Rubric.criteria.forEach(function(currentCriteria)
        {
                totalScore = totalScore + parseInt(document.getElementById(currentCriteria.description).value);
                numberOfCriteria++;
        });
        console.log(totalScore);
        let average = (totalScore / numberOfCriteria).toFixed(e.target.value);

        this.setState({
            averageScore: average
        })
    }

    onChangeSubjectId(e)
    {
        this.setState({
            subjectId: e.target.value
        });
    }

    render()
    {
        let saveGradeButton;
        let SubjectIdTextbox;
        let rubricAverage;

        if (this.state.gradeMode)
        {
            saveGradeButton = <button type="button" className="btn btn-primary" onClick={this.handleSaveGradeClick}>Save Grade</button>
            SubjectIdTextbox = <>
                                <label className="mr-2">Subject ID:</label>
                                <input type="text" 
                                        placeholder="subject Id as integer" 
                                        value={this.state.value}
                                        onChange={this.onChangeSubjectId}/>
                               </>
            rubricAverage = <div>
                <label className="pr-1">Calculate Average</label>
                <select type="button" className="btn btn-secondary btn-sm" onClick={this.handleAverageScoreClick}>
                    <option value="0">No Decimal</option>
                    <option value="1">One Decimal</option>
                    <option value="2">Two Decimals</option>
                    <option value="3">Three Decimals</option>
                </select>
                <span className="pl-1">The average score is: {this.state.averageScore}</span>
            </div>
        }

        return (
            <div>
                <h1>Rubric</h1>
                <div>
                    <span className="mr-4">{this.state.gradeMode ? "Grade" : null} {Rubric.title}</span>
                    {SubjectIdTextbox}
                </div>
                
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Criteria</th>
                            <TopRowGradeScale />
                            {this.state.gradeMode ? <th scope="col" width="150px">Score</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        <CriteriaRow gradeMode={this.state.gradeMode} />
                    </tbody>
                </table>
                {rubricAverage}
                {saveGradeButton}
            </div>
        );
    }
}