import React, {Component} from 'react';
import axios from "axios";
//heash


function TopRowGradeScale(props)
{
    return props.oneCriteria.descriptions.map(function(currentDescription)
    {
        return <th scope="col" key={currentDescription.value_title}>{currentDescription.value_name}</th>
    });
}

function CriteriaRow(props)
{
    return props.criteria.map(function(currentCriteria, i)
    {
        return (
            <tr key={i}>
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
        <select className="form-control" id={props.currentCriteria.criteria_title} >
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
            rubricTitle: '',
            rubric: {
                criteria:[{descriptions : []}]
            },
            gradeMode: false,
            subjectID: '',
            averageScore: 1,
            calcAverage: 2,
        }
    }

    componentDidMount()
    {
        this.setView();
        this.getData();
    }

    setView()
    {
        if (window.location.pathname.includes('/gradeRubric/'))
        {
            this.setState({
                gradeMode: true
            })
        }
    }

    getData()
    {
        axios.get('http://localhost:5000/rubric/getRubric/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    rubricTitle: res.data.rubric.rubric_title,
                    rubric: res.data.rubric
                })
            })
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
        console.log(subjectScore);

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
                    <h2 className="mr-4">{this.state.gradeMode ? "Grade" : null} {this.state.rubric.rubric_title}</h2>
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