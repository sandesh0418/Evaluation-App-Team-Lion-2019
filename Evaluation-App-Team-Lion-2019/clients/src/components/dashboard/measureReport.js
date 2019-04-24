import React, {Component} from 'react';
import Axios from 'axios';

function CriteriaTitles(props)
{
    return props.criteria.map(c => {
        return <th key={c.criteriaTitle} scope="col">{c.criteriaTitle + " score"}</th>
    })
}

function Row(props)
{
    return props.subjectList.map(s => {
        return <Evaluation weighted={props.weighted} scale={props.scale} subject={s} />
    })
}

function Evaluation(props)
{
    return props.subject.evaluators.map(e => {
        return (
            <tr>
                <th scope="row">{props.subject.subjectName}</th>
                <td>{e.evaluatorName}</td>
                <Scores scores={e.scores} />
                {props.scale[0].valueName ? 
                    <td>{getAverage(e.scores, props.scale, props.weighted)}</td>
                : null }
           </tr>
        )
    })
}

function getAverage(scores, scale, weighted)
{
    let score;
    if(weighted)
    {
        score = calculateWeightedAverage(scores);
    }
    else
    {
        score = calculateUnweightedAverage(scores);
    }

    return score + " - " + mapAverageScoreToValueName(scale, Math.round(score));
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

function mapAverageScoreToValueName(scale, averageScore)
{
    let description = scale.find(s => s.valueNumber === Math.floor(averageScore));
    return description.valueName;
}

function Scores(props)
{
    return props.scores.map(s => {
        return (
            <>
                <td>{s.valueName ? s.valueName : (s.score * 100)}</td>
            </>
        )
    })
}

export default class CreateAssignment extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            measure: null
        }
    }

    componentDidMount()
    {
        Axios.get('/measureReport/measureReport/' + this.props.match.params.measureId)
            .then(res => {
                console.log(res.data);
                this.setState({
                    measure: res.data.measure
                })
            })
    }

    render()
    {
        if (this.state.measure === null)
        {
            return <p>loading...</p>
        }
        else if (this.state.measure.subjectList.length === 0)
        {
            return <p>There is no evaluation data for this measure.</p>
        }
        else
        {
            return (
                <>
                    <h1>{this.state.measure.measureName}</h1>
                    {this.state.measure.measureDescription !== "null" ? 
                        <details>
                            <summary>Additional description:</summary>
                            <p>{this.state.measure.measureDescription}</p>
                        </details>
                    : null}
                    <table className="table table-bordered">
                        <thead>
                            <tr id="criteria"> 
                                <th scope="col">Subject Name</th>
                                <th scope="col">Evaluator</th>
                                <CriteriaTitles criteria={this.state.measure.subjectList[0].evaluators[0].scores} />
                                {this.state.measure.scale[0].valueName ?
                                    <>
                                        <th scope="col">Overall Score</th>
                                        <th scope="col">Average Score</th>
                                    </>
                                : null }
                            </tr>
                        </thead>
                        <tbody>
                            <Row 
                                subjectList={this.state.measure.subjectList} 
                                weighted={this.state.measure.weighted}
                                scale={this.state.measure.scale}/>
                        </tbody>
                    </table>
                </>
            )
        }
    }
}