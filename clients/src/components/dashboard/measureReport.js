import React, { Component } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";
import { O_RDONLY } from "constants";
import Table from "react-bootstrap/Table";
import { Alert, Button, Fade } from "reactstrap";

function CriteriaTitles(props) {
  return props.criteria.map(c => {
    return (
      <th className="p-2" key={c.criteriaTitle} scope="col">
        {c.criteriaTitle + " score"}
      </th>
    );
  });
}

function Row(props) {
  return props.subjectList.map(s => {
    return (
      <Evaluation
        key={s.subjectId}
        weighted={props.weighted}
        scale={props.scale}
        subject={s}
      />
    );
  });
}

function Evaluation(props) {
  let totalScore = 0;
  let totalEvaluations = props.subject.evaluators.length;

  let averageTotalScore;

  return props.subject.evaluators.map(e => {
    let score = getAverage(e.scores, props.weighted);
    totalScore += score;
    averageTotalScore = totalScore / totalEvaluations;
    return (
      <tr key={e.evaluatorEmail}>
        {e.evaluatorEmail === props.subject.evaluators[0].evaluatorEmail ? (
          <th className="p-2" scope="row" rowSpan={totalEvaluations}>
            {props.subject.subjectName}
          </th>
        ) : null}

        <td className="p-2">{e.evaluatorName}</td>
        <Scores scores={e.scores} />

        {props.scale[0].valueName ? (
          <td className="p-2">
            {score + " - " + mapAverageScoreToValueName(props.scale, score)}
          </td>
        ) : null}

        {e.evaluatorEmail ===
          props.subject.evaluators[props.subject.evaluators.length - 1]
            .evaluatorEmail && props.scale[0].valueName ? (
          <td className="p-2">
            {averageTotalScore +
              " - " +
              mapAverageScoreToValueName(props.scale, averageTotalScore)}
          </td>
        ) : null}
      </tr>
    );
  });
}

function getAverage(scores, weighted) {
  let score;
  if (weighted) {
    score = calculateWeightedAverage(scores);
  } else {
    score = calculateUnweightedAverage(scores);
  }

  return score;
}

function calculateUnweightedAverage(scores) {
  let totalScore = 0;
  let numberOfCriteria = 0;
  scores.forEach(s => {
    totalScore = totalScore + parseInt(s.score);
    numberOfCriteria++;
  });
  return Math.round((totalScore / numberOfCriteria) * 100000) / 100000;
}

function calculateWeightedAverage(scores) {
  let totalScore = 0;
  scores.forEach(s => {
    totalScore = totalScore + s.score * (s.weight / 100);
  });

  return Math.round(totalScore * 100000) / 100000;
}

function mapAverageScoreToValueName(scale, averageScore) {
  console.log(scale);
  let score = averageScore;
  if (score < 1) {
    score = 1;
  }

  let description = scale.find(s => s.valueNumber === Math.floor(score));
  return description.valueName;
}

function Scores(props) {
  return props.scores.map(s => {
    return (
      <td className="p-2" key={s.criteriaTitle}>
        {s.valueName ? s.score + " " + s.valueName : s.score * 100}
      </td>
    );
  });
}

function CriteriaAverages(props) {
  return props.criteria.map(c => {
    let totalScore = 0;
    let totalSubjects = 0;

    props.subjectList.forEach(s => {
      s.evaluators.forEach(e => {
        console.log("Subject:" + s.subjectName);
        console.log("Evaluator: ")
        console.log(e);
        console.log("Criteria title: "  + c.criteriaTitle);
        console.log(e.scores.find(s => s.criteriaTitle === c.criteriaTitle));
        totalScore += e.scores.find(s => s.criteriaTitle === c.criteriaTitle).score;
        totalSubjects++;
      });
    });

    let averageScore = totalScore / totalSubjects;

    return (
      <td className="p-2" key={c.criteriaTitle}>
        {averageScore.toFixed(2) +
          " - " +
          mapAverageScoreToValueName(props.scale, averageScore)}
      </td>
    );
  });
}

export default class CreateAssignment extends Component {
  constructor(props) {
    super(props);
    this.calculateOverallAverage = this.calculateOverallAverage.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      measure: null,
      evaluationsMetTarget: 0,
      totalEvaluations: 0,
      overallAverage: 0,
      fadeIn: false
    };
  }

  componentDidMount() {
    Axios.get(
      "/api/measureReport/measureReport/" + this.props.match.params.measureId
    ).then(res => {
      console.log(res.data.measure);
      this.setState({
        measure: res.data.measure
      });
      this.calculateOverallAverage();
    });
  }

  calculateOverallAverage() {
    let classTotalScore = 0;
    let totalEvaluations = 0;
    let metTarget = 0;

    this.state.measure.subjectList.forEach(s => {
      s.evaluators.forEach(e => {
        let score;

        if (this.state.measure.scale[0].valueName) {
          score = getAverage(e.scores, this.state.measure.weighted);
        } else {
          score = e.scores[0].score;
        }

        if (score >= this.state.measure.targetScore) {
          metTarget++;
        }
        classTotalScore += score;
        totalEvaluations++;
      });
    });

    let classAverage = classTotalScore / totalEvaluations;

    this.setState({
      evaluationsMetTarget: metTarget,
      totalEvaluations: totalEvaluations,
      overallAverage: classAverage
    });
  }

  toggle() {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }

  render() {
    if (this.state.measure === null) {
      return <Loader type="Oval" color="black" height="100" width="100" />;
    } else if (this.state.measure.subjectList.length === 0) {
      return (
        <p>
          There is no evaluation data for measure '
          {this.state.measure.measureName}'
        </p>
      );
    } else {
      var target = this.state.measure.percentToReachTarget * 100;
      var achieved =
        (this.state.evaluationsMetTarget / this.state.totalEvaluations).toFixed(
          2
        ) * 100;
      let colorToBe;
      if (achieved > target) {
        colorToBe = "bg-success success";
      } else if (achieved < target) {
        colorToBe = "bg-danger danger";
      } else {
        colorToBe = "bg-warning warning";
      }
      return (
        <>
          <h2>{this.state.measure.measureName}</h2>
          {this.state.measure.measureDescription !== "null" ? (
            <details>
              <summary>Additional description:</summary>
              <p>{this.state.measure.measureDescription}</p>
            </details>
          ) : null}
          <Table
            bordered
            striped
            hover
            responsive="sm"
            responsive="md"
            //   responsive="lg"
            //   responsive="xl"
            id="viewSummary"
          >
            <thead>
              <tr id="criteria">
                <th className="p-2" scope="col">
                  Subject Name
                </th>
                <th className="p-2" scope="col">
                  Evaluator
                </th>
                <CriteriaTitles
                  criteria={
                    this.state.measure.subjectList[0].evaluators[0].scores
                  }
                />
                {this.state.measure.scale[0].valueName ? (
                  <>
                    <th className="p-2" scope="col">
                      Overall Score
                    </th>
                    <th className="p-2" scope="col">
                      Average Score
                    </th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              <Row
                subjectList={this.state.measure.subjectList}
                weighted={this.state.measure.weighted}
                scale={this.state.measure.scale}
              />
              <tr>
                <th className="p-2" scope="row" colSpan="2">
                  Group Averages
                </th>
                {this.state.measure.scale[0].valueName ? (
                  <CriteriaAverages
                    criteria={
                      this.state.measure.subjectList[0].evaluators[0].scores
                    }
                    subjectList={this.state.measure.subjectList}
                    scale={this.state.measure.scale}
                  />
                ) : null}
                <td className="p-2" colSpan="2">
                  {this.state.measure.scale[0].valueName
                    ? this.state.overallAverage.toFixed(2) +
                      " - " +
                      mapAverageScoreToValueName(
                        this.state.measure.scale,
                        this.state.overallAverage
                      )
                    : (this.state.overallAverage * 100).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
          <div>
            {/* <p className="h3">Summary</p> */}
            <Button color="primary" id="button5" onClick={this.toggle}>
              <i class="fas fa-eye"> View Summary</i>
            </Button>
            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
              <p>
              <div class={colorToBe}>
                       {"Status: " +
                    (this.state.evaluationsMetTarget /
                      this.state.totalEvaluations >=
                    this.state.measure.percentToReachTarget
                      ? "Passing"
                      : "Failing")}
                </div>
              </p>
              <p>
                {this.state.evaluationsMetTarget +
                  " evaluations of " +
                  this.state.totalEvaluations +
                  " met " +
                  "the target score of " +
                  (this.state.measure.scale[0].valueName
                    ? "'" +
                      mapAverageScoreToValueName(
                        this.state.measure.scale,
                        this.state.measure.targetScore
                      ) +
                      "'"
                    : this.state.measure.targetScore * 100)}
              </p>
              <p>
                {"Percent passing: " +
                  (
                    this.state.evaluationsMetTarget /
                    this.state.totalEvaluations
                  ).toFixed(2) *
                    100 +
                  "%"}
              </p>
              <p>
                {"Target pass rate: " +
                  this.state.measure.percentToReachTarget * 100 +
                  "%"}
              </p>
            </Fade>
          </div>
        </>
      );
    }
  }
}
