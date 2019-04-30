import React, {Component} from 'react';
import axios from "axios";
import '../../../stylesheets/rubricView.css';
import { ClipLoader } from 'react-spinners';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'


const width150 = {
    width: '150px'
}

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
                <th scope="row" className="p-3">
                    {currentCriteria.criteria_title === "" ? "Undefined Critieria" : currentCriteria.criteria_title}
                </th>
                <CriteriaDescription criteriaDescriptions={currentCriteria.descriptions} />
                {props.gradeMode?  
                    <td className="p-3">
                        <CriteriaGradeInput 
                            currentCriteria={currentCriteria} 
                            calculateAverageScore={props.calculateAverageScore} 
                            gradeScale={props.gradeScale} />
                    </td> : null}
                {props.weighted ? <td className="p-3">{currentCriteria.weight + "%"}</td> : null}
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
        <select className="form-control" id={props.currentCriteria.criteria_title} onChange={props.calculateAverageScore}>
            <option disabled value> -- select an option -- </option>
            {props.gradeScale}
        </select>
    )
}

const SubjectSelector = props => {
    return (
        <div className="form-group">
            <label className="mr-2">Select Subject:</label>
            <select className="form-control" style={width150} value={props.value} onChange={props.onChange} onClick={props.onChange}>
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

function calculateUnweightedAverage(scores)
{
    let totalScore = 0;
    let numberOfCriteria = 0;
    scores.forEach(s => {
            totalScore = totalScore + parseInt(s.score);
            numberOfCriteria++;
    });
    return Math.round((totalScore / numberOfCriteria) * 100000) / 100000;
}

function calculateWeightedAverage(scores)
{
    let totalScore = 0;
    scores.forEach(s => {
        totalScore = totalScore + (s.score * (s.weight / 100))
    });
    
    return Math.round(totalScore * 100000) / 100000;
}

function mapAverageScoreToValueName(criteria, averageScore)
{
    console.log(averageScore);
    let description = criteria.descriptions.find(d => d.value_number === Math.floor(averageScore));
    return description.value_name
}

function setScores(subjectList, subjectId, criteria)
{
    let subjectIndex = subjectList.findIndex(s => s.subjectId === subjectId);
        if (subjectList[subjectIndex].scores[0].score !== null)
        {
            subjectList[subjectIndex].scores.forEach(s => {
                console.log(s.criteriaTitle);
                document.getElementById(s.criteriaTitle).value = s.score;
            })
        }
        else
        {
            criteria.forEach(c => {
                if (document.getElementById(c.criteria_title))
                {
                    document.getElementById(c.criteria_title).value = 1;
                }
            })
        }
}

export default class ViewRubric extends Component
{
    constructor(props)
    {
        super(props);
        this.onChangeSubjectId = this.onChangeSubjectId.bind(this);
        this.handleSaveGradeClick = this.handleSaveGradeClick.bind(this);
        this.calculateAverageScore = this.calculateAverageScore.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            rubricTitle: '',
            Rubric_Id: '',
            scale: '',
            rubric: {
                criteria:[{descriptions : [{value_number: 1, value_name: 0}]}]
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
        axios.get('/api/rubric/getViewRubric/'+this.props.match.params.rubric)
            .then(res => {
                this.setState({
                    rubricTitle: res.data.rubric.rubric_title,
                    Rubric_Id: res.data.rubric.Rubric_Id,
                    rubric: res.data.rubric
                })
            })

        if(window.location.pathname.includes('/gradeRubric/'))
        {
            axios.get('/api/assignments/subjectList/'+this.props.match.params.assignment)
            .then(res => {
                this.setState({
                    subjectList: res.data.subjectList,
                    subjectId: res.data.subjectList[0].subjectId
                })
                setScores(res.data.subjectList, res.data.subjectList[0].subjectId, this.state.rubric.criteria);
                this.calculateAverageScore();
            })
            axios.get('/api/assignments/assignmentMeasure/' + this.props.match.params.assignment)
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
            return {
                criteriaTitle: currentCriteria.criteria_title,
                value: document.getElementById(currentCriteria.criteria_title).value
            };
        })

        let subjectScore = {measureId: this.state.measureId,
                            userEmail: localStorage.getItem('email'),
                            subjectId: this.state.subjectId,
                            scores: scores,
                            Assignment_ID: this.props.match.params.assignment};

        axios.post('/api/scoreSubmission/rubricScore', subjectScore)
        .then(res => {
            alert("The score has been saved.");
            window.location.reload();
        });
    }

    calculateAverageScore()
    {
        let scores = this.state.rubric.criteria.map(c => {
            return {
                criteriaTitle: c.criteria_title,
                weight: c.weight,
                score: document.getElementById(c.criteria_title).value
            }
        })

        if(this.state.rubric.weighted)
        {
            this.setState({
                averageScore: calculateWeightedAverage(scores)
            })
        }
        else
        {
            this.setState({
                averageScore: calculateUnweightedAverage(scores)
            })
        }
    }

    handleInput(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeSubjectId(e)
    {
        this.setState({
            subjectId: e.target.value
        });

        setScores(this.state.subjectList, e.target.value, this.state.rubric.criteria);
        this.calculateAverageScore();
    }

    onChangeScale(e){
        this.setState({scale: e.target.value})
    }

    EditRubric(e){
        
        window.location.replace('/createRubric/'+e.target.id);
    }

    render()
    {
        let saveGradeButton;
        let rubricAverage;
        let editRubricButton;

        if (this.state.gradeMode)
        {
            saveGradeButton = <button type="button" className="btn btn-primary" onClick={this.handleSaveGradeClick}>Save Grade</button>

            rubricAverage = <div className="mb-2">
                <label className="pr-1">Decimal Places in Average</label>
                <select defaultValue="2" className="form-control" style={width150} name="calcAverage" 
                    onChange={this.handleInput} onClick={this.handleInput}>
                    <option value="0">No Decimal</option>
                    <option value="1">One Decimal</option>
                    <option value="2">Two Decimals</option>
                    <option value="3">Three Decimals</option>
                </select>
                <span>The average score is: 
                    {" " + this.state.averageScore.toFixed(this.state.calcAverage) + "  or '" + 
                        mapAverageScoreToValueName(this.state.rubric.criteria[0], this.state.averageScore) + "'"}
                </span>
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
                    marginTop: "1rem",
                    paddingTop: "15px",
                    textAlign: "center",
                    align: "center"
                }}
                id ={this.state.Rubric_Id}
                onClick={this.EditRubric}

                className="btn btn-large waves-effect waves-light hoverable blue accent-3 editButton"
                >

               <i className="fas fa-edit"></i> Edit 
                </a>
            </div>
        }

        let gradeScale = this.state.rubric.criteria[0].descriptions.map(function(currentDescription)
        {
            return <option key={currentDescription.value_number} value={currentDescription.value_number}>{currentDescription.value_name}</option>
        })

        return (
            <div>
                {/* <h1>Rubric</h1> */}
                <div>
                    <h2 className="mr-4" id="unique">{this.state.gradeMode ? "Grade " : "Viewing "}Rubric: {this.state.rubric.rubric_title}</h2>
                    {this.state.gradeMode ? 
                        <SubjectSelector 
                            subjectList={this.state.subjectList} 
                            onChange={this.onChangeSubjectId}
                            value={this.state.subjectId}
                            className="bg-danger" />
                        : null}
                </div>
                {/* className="table table-bordered" */}
                <Table striped bordered hover responsive="sm" responsive="md" responsive="lg" responsive="xl" id="viewTable">
                    <thead>
                        <tr id ="criteria"> 
                            <th scope="col" className="outcome-width" >Criteria</th>
                            <TopRowGradeScale oneCriteria={this.state.rubric.criteria[0]} />
                            {this.state.gradeMode ? <th scope="col" width="150px">Score</th> : null}
                            {this.state.rubric.weighted ? <th scope="col">Weight</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        <CriteriaRow 
                            gradeMode={this.state.gradeMode} 
                            criteria={this.state.rubric.criteria} 
                            weighted={this.state.rubric.weighted}
                            gradeScale={gradeScale}
                            calculateAverageScore={this.calculateAverageScore}
                        />
                    </tbody>
                    
                </Table>
                {rubricAverage}
                {saveGradeButton}
                {editRubricButton}
            </div>
        );
    }
}