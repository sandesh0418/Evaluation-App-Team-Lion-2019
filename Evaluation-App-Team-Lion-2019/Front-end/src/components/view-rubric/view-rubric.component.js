import React, {Component} from 'react';
import AdminNavBar from "../nav-bar/nav-bar.component";
import EvalNavBar from "../nav-bar/navEvaluator";
import Axios from 'axios';

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
    //scale: [1,2,3,4,5],
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

const gradeScale = generateGradeScale();

function CriteriaGradeInput(props)
{
    return (
        <select className="form-control" id={props.currentCriteria.description}>
            <option defaultValue value> -- select an option -- </option>
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


function TopRowGradeScale(props)
{
    return Rubric.scale.map(function(currentScore, i)
        {
            return <th scope="col" key={i}>{currentScore}</th>
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
                {props.gradeMode ? <span><CriteriaGradeInput currentCriteria={currentCriteria} /></span> : null}
            </tr>
            );
    });
}

function AverageScore(props)
{
    return props.averageScores.map(function(currentScore, i)
    {
        return <td key={i}>{currentScore}</td>
    });
}

export default class ViewRubric extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            gradeMode: false,
            score1:0,
            score2:0,
            score3:0,
            averageScores:[]

        }
            var averageScores = [];
            Axios.get('http://localhost:8000/viewRubric')
            .then(res =>{
                //console.log("cool beans");
                console.log(res.data.length);
                var averageScores= [res.data.length];
                var total = res.data.length;
                averageScores[0]=0;
                averageScores[1]=0;
                averageScores[2]=0;
                for (var i =0; i<res.data.length; i++){
                    averageScores[0] += res.data[i].score1;
                    //console.log(averageScores[0]);
                    averageScores[1] += res.data[i].score2;
                    averageScores[2] += res.data[i].score3;
                }
                //console.log(averageScores);
                console.log(averageScores[0]);
                console.log(total);
                averageScores[0] /= total;
                console.log(averageScores[0]);
                averageScores[1] /= total;
                averageScores[2] /= total;

            }
            )
        
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
            console.log("grade rubric");
        }

        if (window.location.pathname==='/viewRubric') {
            this.setState({
                gradeMode:false
            })
            console.log("view rubric");
           /* var averageScores = [];
            Axios.get('http://localhost:8000/viewRubric')
            .then(res =>{
                //console.log("cool beans");
                console.log(res.data.length);
                var averageScores= [res.data.length];
                var total = res.data.length;
                averageScores[0]=0;
                averageScores[1]=0;
                averageScores[2]=0;
                for (var i =0; i<res.data.length; i++){
                    averageScores[0] += res.data[i].score1;
                    //console.log(averageScores[0]);
                    averageScores[1] += res.data[i].score2;
                    averageScores[2] += res.data[i].score3;
                }
                //console.log(averageScores);
                console.log(averageScores[0]);
                console.log(total);
                averageScores[0] /= total;
                console.log(averageScores[0]);
                averageScores[1] /= total;
                averageScores[2] /= total;

            }
            )*/
            
         }
    }

    handleSaveGradeClick()
    {
    
        let scores = Rubric.criteria.map(function(currentCriteria)
        {
        
          //  console.log(document.getElementById(currentCriteria.description).value);
           
            
           // return {description: currentCriteria.description,
                    //value: document.getElementById(currentCriteria.description).value};

            return document.getElementById(currentCriteria.description).value;
            
        })
        

        const obj={
            score1: parseInt(scores[0]),
            score2: parseInt(scores[1]),
            score3: parseInt(scores[2])
        }
       // console.log(obj);
        Axios.post('http://localhost:8000/gradeRubric', obj)
            .then(res=> {console.log(res);
            })

           //

            //this.props.history.push('/');
        /*let subject = "dummy_subjectID";

        let subjectScore = {subjectID: subject,
                            scores: scores};
                            //console.log(scores);
            */
        window.location.assign('/gradeRubric');
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
                {sessionStorage.getItem("userType")==="Administrator" ? <AdminNavBar /> : null}
                {sessionStorage.getItem("userType")==="Evaluator" ? <EvalNavBar /> : null}
                <h1>Rubric</h1>
                <h2>{this.state.gradeMode ? "Grade" : null} {Rubric.title}</h2>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Criteria</th>
                            <TopRowGradeScale />
                            {this.state.gradeMode ? <th scope="col" width="150px">Score</th> : <th scope="col" width="150px">Average Score</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <CriteriaRow gradeMode={this.state.gradeMode} />
                    </tbody>
                </table>
                {saveGradeButton}
            </div>
        );
    }
}