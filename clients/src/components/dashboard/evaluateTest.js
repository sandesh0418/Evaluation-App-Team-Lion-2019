import React, {Component} from 'react';
import axios from "axios";

const SubjectList = props => {
    return props.subjectList.map((s, index) => {
        return (
            <div className="row no-gutters" key={{index}}>
                <div className="col-2">
                    <span>{s.subjectName + ":"}</span>
                </div>
                <div className="col-1">
                    <input id={s.subjectId} defaultValue={s.scores[0].score * 100} type="number" min="0" max="100" />
                </div>
            </div>
        )
    })
}

function updateScoresInList(file)
{
    let fileReader = new FileReader();
    fileReader.onloadend = e => {
        let lines = fileReader.result.split("\n");
        lines.forEach(l => {
            let tempList = l.split(",");
            if (document.getElementById(tempList[1]))
            {
                console.log(tempList[1] + " " + tempList[2]);
                document.getElementById(tempList[1]).value = tempList[2].trim();
            }
        })
    }
    fileReader.readAsText(file);
}

export default class EvaluateTest extends Component
{
    constructor(props)
    {
        super(props);
        this.fileInput = React.createRef();
        this.changeFile = this.changeFile.bind(this);
        this.submitScores = this.submitScores.bind(this);
        this.state = {
            subjectList: [],
            subjectId: null,
            measure: null,
            showFileAlert: false
        }
    }

    componentDidMount()
    {
        axios.get("/api/assignments/subjectList/"+this.props.match.params.assignment)
            .then(res => {
                
                this.setState({
                    subjectList: res.data.subjectList,
                    subjectId: res.data.subjectList[0]
                })
            })
        axios.get("/api/assignments/assignmentMeasure/" + this.props.match.params.assignment)
            .then(res => {
               this.setState({
                   measure: res.data.measure
               })
            })

            
    }

    changeFile(e)
    {
        if (!(this.fileInput.current.files[0].type === "text/csv"))
        {
            this.setState({
                showFileAlert: true
            })
        }
        else
        {
            this.setState({
                showFileAlert: false
            })
            updateScoresInList(this.fileInput.current.files[0]);
        }
    }

    submitScores(e)
    {
        e.preventDefault();
        let scores = [];
        this.state.subjectList.forEach(s => {
            if(document.getElementById(s.subjectId).value > -1)
            {
                let newScore = {
                    subjectId: s.subjectId,
                    score: document.getElementById(s.subjectId).value
                }
                scores.push(newScore);
            }
        })

        let scoreData = {
            measureId: this.state.measure.measureId,
            userEmail: localStorage.getItem("email"),
            criteriaTitle: "Test",
            scores: scores,
            Assignment_ID: this.props.match.params.assignment
        }

        axios.post('/api/scoreSubmission/testScore', scoreData)
            .then(res => {
                if (res.data.inserted)
                {
                    alert(res.data.message);
                }
                else
                {
                    alert(res.data.message);
                }
            });
    }

    render()
    {
        return (
            <>
                <h1>Enter Scores</h1>
                <p>{this.state.measure ? "for measure: " + this.state.measure.measureName : null}</p>
                <p>Enter scores as a percent of 100. Example: if 85%, then enter 85.</p>
                <form onSubmit={this.submitScores}>
                    <SubjectList subjectList={this.state.subjectList} />
                    <div className="form-group">
                        <label>Select List of Subjects as .csv file: </label>
                        <input type="file" className="form-control-file" ref={this.fileInput} onChange={this.changeFile} />
                        {this.state.showFileAlert ? <p className="text-danger">Invalid File</p>: null}
                    </div>
                    <input className="btn btn-primary" type="submit" />
                </form>
            </>
        );
    }
}