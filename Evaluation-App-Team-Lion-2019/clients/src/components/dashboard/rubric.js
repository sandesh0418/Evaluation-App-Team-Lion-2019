import React, {Component} from 'react';
import axios from "axios";


//dummy data

var crit1desc1 = {
    value_title: 1,
    value_name: '1 - Limited',
    value_description: 'student does not have grasp of info; cannot answer questions.'
}

var crit1desc2 = {
    value_title: 2,
    value_name: '2 - Developing',
    value_description: 'uncomfortable with info; able to answer very few questions.'
}

var crit1desc3 = {
    value_title: 3,
    value_name: '3 - Capable',
    value_description: 'comfortable with info; can answer simple questions.'
}

var crit1desc4 = {
    value_title: 4,
    value_name: '4 - Strong',
    value_description: 'shows full knowledge; answers questions easily but does not elaborate'
}

var crit1desc5 = {
    value_title: 5,
    value_name: '5 - Excellent',
    value_description: 'knowledge is more than required; answers questions with details and elaboration'
}

var criteriaOne = {
    criteria_title: "Subject Knowledge",
    descriptions: [ crit1desc1, crit1desc2, crit1desc3, crit1desc4, crit1desc5 ]
}

var crit2desc1 = {
    value_title: 1,
    value_name: '1 - Limited',
    value_description: 'audience cannot understand  presentation; no logical sequence of information'
}

var crit2desc2 = {
    value_title: 2,
    value_name: '2 - Developing',
    value_description: 'audience has difficulty following; info jumps around'
}

var crit2desc3 = {
    value_title: 3,
    value_name: '3 - Capable',
    value_description: 'logical sequence with a few minor jumps'
}

var crit2desc4 = {
    value_title: 4,
    value_name: '4 - Strong',
    value_description: 'logical sequence'
}

var crit2desc5 = {
    value_title: 5,
    value_name: '5 - Excellent',
    value_description: 'logical sequence;  ideas clearly linked'
}

var criteriaTwo = {
    criteria_title: "Organization",
    descriptions: [ crit2desc1, crit2desc2, crit2desc3, crit2desc4, crit2desc5 ]
}

var crit3desc1 = {
    value_title: 1,
    value_name: '1 - Limited',
    value_description: 'numerous spelling and/or  grammar errors; no  communication  aids or detracting aids'
}

var crit3desc2 = {
    value_title: 2,
    value_name: '2 - Developing',
    value_description: 'several spelling and/or grammar errors; aids highlight unimportant info'
}

var crit3desc3 = {
    value_title: 3,
    value_name: '3 - Capable',
    value_description: 'few spelling or grammar errors; aids lack originality or adequate development'
}

var crit3desc4 = {
    value_title: 4,
    value_name: '4 - Strong',
    value_description: 'two or fewer spelling or grammar errors; aids support and relate to text and presentation'
}

var crit3desc5 = {
    value_title: 5,
    value_name: '5 - Excellent',
    value_description: 'no spelling or grammatical errors; aids explain and enhance text and presentation'
}

var criteriaThree = {
    criteria_title: "Use of Communication Aids",
    descriptions: [ crit3desc1, crit3desc2, crit3desc3, crit3desc4, crit3desc5 ]
}

var dummyRubric = {
    title: "Oral Presentation",
    measureId: 1,
    scale: [ [1, "1 - Limited"], [2, "2 - Developing"], [3, "3 - Capable"], [4, "4 - Strong"], [5, "5 - Excellent"]],
    criteria: [criteriaOne, criteriaTwo, criteriaThree]
}
//end dummy data

function TopRowGradeScale(props)
{
    return props.oneCriteria.descriptions.map(function(currentDescription)
    {
        return <th scope="col" key={currentDescription.value_title}>{currentDescription.value_name}</th>
    });
}

function CriteriaRow(props)
{
    return props.criteria.map(function(currentCriteria)
    {
        return (
            <tr key={currentCriteria.criteria_title}>
                <th scope="row">{currentCriteria.criteria_title}</th>
                <CriteriaDescription criteriaDescriptions={currentCriteria.descriptions} />
                {props.gradeMode?  <td><CriteriaGradeInput currentCriteria={currentCriteria} gradeScale={props.gradeScale} /></td> : null}
            </tr>
            );
    });
}

function CriteriaDescription(props)
{
    return props.criteriaDescriptions.map(function(currentDescription)
    {
        return <td key={currentDescription.value_title}>{currentDescription.value_description}</td>
    });
}

function CriteriaGradeInput(props)
{
    return (
        <select className="form-control" id={props.currentCriteria.criteria_title}>
            <option disabled value> -- select an option -- </option>
            {props.gradeScale}
        </select>
    )
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
            rubric: dummyRubric,
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
        let scores = this.state.rubric.criteria.map(function(currentCriteria)
        {
            return {criteriaTitle: currentCriteria.criteria_title,
                    value: document.getElementById(currentCriteria.criteria_title).value};
        })

        let subjectScore = {measureId: this.state.rubric.measureId,
                            userEmail: localStorage.getItem('email'),
                            subjectId: this.state.subjectId,
                            scores: scores};

        axios.post('http://localhost:5000/scoreSubmission/rubricScore', subjectScore)
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
        this.state.rubric.criteria.forEach(function(currentCriteria)
        {
                totalScore = totalScore + parseInt(document.getElementById(currentCriteria.criteria_title).value);
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

        let gradeScale = this.state.rubric.criteria[0].descriptions.map(function(currentDescription)
        {
            return <option key={currentDescription.value_title} value={currentDescription.value_title}>{currentDescription.value_name}</option>
        })

        return (

            <div>
                <h1>Rubric</h1>
                <div>
                    <span className="mr-4">{this.state.gradeMode ? "Grade" : null} {this.state.rubric.title}</span>
                    {SubjectIdTextbox}
                </div>
                
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Criteria</th>
                            <TopRowGradeScale oneCriteria={this.state.rubric.criteria[0]} />
                            {this.state.gradeMode ? <th scope="col" width="150px">Score</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        <CriteriaRow gradeMode={this.state.gradeMode} criteria={this.state.rubric.criteria} gradeScale={gradeScale} />
                    </tbody>
                </table>
                {rubricAverage}
                {saveGradeButton}
            </div>
        );
    }
}