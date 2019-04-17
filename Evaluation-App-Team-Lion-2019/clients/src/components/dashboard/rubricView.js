import React, {Component} from 'react';
import axios from "axios";
import './rubricView.css';


function TopRowGradeScale(props)
{
    return props.oneCriteria.descriptions.map(function(currentDescription)
    {
        return <th scope="col" 
                    key={currentDescription.value_number}
                    as="textarea"
                    aria-label="With textarea">
                    {currentDescription.value_name}
                </th>
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
        return <td key={currentDescription.value_number}>{currentDescription.value_description}</td>
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

const SubjectSelector = props => {
    return (
        <div className="form-group">
            <label className="mr-2">Select Subject:</label>
            <select className="form-control width-200" value={props.value} onChange={props.onChange} onClick={props.onChange}>
                <SubjectList subjectList={props.subjectList} />
            </select>
        </div>
    )
}

const SubjectList = props => {
    return props.subjectList.map(s => {
        return <option key={s.subjectId} value={s.subjectId}>{s.subjectName}</option>
    })
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
            scale: '',
            rubric: {
                criteria:[{descriptions : []}]
            },
            gradeMode: false,
            measureId: '',
            subjectId: '',
            averageScore: 1,
            calcAverage: 2,
            subjectList: []
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
        axios.get('/rubric/getViewRubric/'+this.props.match.params.rubric)
            .then(res => {
                this.setState({
                    rubricTitle: res.data.rubric.rubric_title,
                    rubric: res.data.rubric
                })
            })

        if(window.location.pathname.includes('/gradeRubric/'))
        {
            axios.get('/assignments/subjectList/'+this.props.match.params.assignment)
            .then(res => {
                this.setState({
                    subjectList: res.data.subjectList,
                    subjectId: res.data.subjectList[0].subjectId
                })
            })
            axios.get('/assignments/assignmentMeasure/' + this.props.match.params.assignment)
                .then(res => {
                    this.setState({
                        measureId: res.data.measure.measureId
                    })
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

        let subjectScore = {measureId: this.state.measureId,
                            userEmail: localStorage.getItem('email'),
                            subjectId: this.state.subjectId,
                            scores: scores};

        axios.post('/scoreSubmission/rubricScore', subjectScore)
        .then(res => {
            alert("The score has been saved.");
        });
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

    onChangeScale(e){
        this.setState({scale: e.target.value})
    }

    EditRubric(e){
        
    }

    render()
    {
        let saveGradeButton;
        let rubricAverage;
        let editRubricButton;

        if (this.state.gradeMode)
        {
            saveGradeButton = <button type="button" className="btn btn-primary" onClick={this.handleSaveGradeClick}>Save Grade</button>

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
        else
        {
            editRubricButton = <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <a href="#"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.EditRubric}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Edit 
                </a>
              </div>
        }

        let gradeScale = this.state.rubric.criteria[0].descriptions.map(function(currentDescription)
        {
            return <option key={currentDescription.value_number} value={currentDescription.value_number}>{currentDescription.value_name}</option>
        })

        return (
            <div>
                <h1>Rubric</h1>
                <div>
                    <h2 className="mr-4">{this.state.gradeMode ? "Grade" : null} {this.state.rubric.rubric_title}</h2>
                    {this.state.gradeMode ? 
                        <SubjectSelector 
                            subjectList={this.state.subjectList} 
                            onChange={this.onChangeSubjectId}
                            value={this.state.subjectId}
                            className="bg-danger" />
                        : null}
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
                {editRubricButton}
            </div>
        );
    }
}