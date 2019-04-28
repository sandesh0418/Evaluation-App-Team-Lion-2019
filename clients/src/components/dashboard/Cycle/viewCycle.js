import React, { Component } from "react";
import {
  GetPreviousCycle,
  CyclesInProgress,
  EndCycle
} from "../../../actions/cycle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import '../../../stylesheets/cycle.css';

class ViewCycle extends Component {
  componentDidMount() {
    this.props.GetPreviousCycle();
    this.props.CyclesInProgress();
  }

  endCycle(e) {
    const obj = {
      Cycle_Id: e.target.id
    };
    localStorage.removeItem("Cycle_Id");
    this.props.EndCycle(obj);
    window.location.reload("/cycles");
  }

  useCycle(e) {
    localStorage.setItem("Cycle_Id", e.target.id);
    window.location.reload("/cycles");
  }

  render() {
    let { cycles } = this.props;

    var progress = "";
    var previous = "";
    if (cycles.previousCycle != null) {
      previous = cycles.previousCycle.map((singleCycle, index) => (
        <div key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{singleCycle.Cycle_Name}</h5>
              <p className="card-text">
                <span style={{ fontWeight: "bold" }}>Start Date:</span>{" "}
                {singleCycle.Start_Date} &nbsp;{" "}
                <span style={{ fontWeight: "bold" }}>End Date: </span>
                {singleCycle.End_Date}
              </p>

              <Link
                to={"/viewPastCycle/" + singleCycle.Cycle_Id}
                style={{ float: "center" }}
                className="btn btn-primary"
              >
                View Cycle
              </Link>
            </div>
          </div>
        </div>
      ));
    } else {
      previous = (
        <div className="sweet-loading">
          <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} />
        </div>
      );
    }
    if (cycles.inProgressCycles != null) {
      progress = cycles.inProgressCycles.map((singleCycle, index) => (
        <div key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{singleCycle.Cycle_Name}</h5>
              <p className="card-text">
                <span style={{ fontWeight: "bold" }}>Start Date:</span>{" "}
                {singleCycle.Start_Date}{" "}
              </p>
              {localStorage.getItem("Cycle_Id") === singleCycle.Cycle_Id ? (
                " "
              ) : (
                <a
                  href="#"
                  style={{ float: "left" }}
                  className="btn btn-primary"
                  id={singleCycle.Cycle_Id}
                  onClick={this.useCycle.bind(this)}
                >
                  Enter Cycle
                </a>
              )}
              <a
                href="#"
                className="enterACycle"
                style={{ float: "right" }}
                className="btn btn-primary"
                id={singleCycle.Cycle_Id}
                onClick={this.endCycle.bind(this)}
              >
                End Cycle
              </a>
            </div>
          </div>
        </div>
      ));
    } else {
      previous = (
        <div className="sweet-loading">
          <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} />
        </div>
      );
    }
    return (
      <div className="container">
        <div class="jumbotro">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="card">
                <div className="card-body">
                  <h2
                    className="card-title text-success"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      textShadow: "none",
                      fontSize: "30px"
                    }}
                  >
                    Cycles In Progress
                  </h2>

                  {progress}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="card">
                <div className="card-body">
                  <h2
                    className="card-title text-success"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      textShadow: "none",
                      fontSize: "30px"
                    }}
                  >
                    Previous cycles
                  </h2>

                  {previous}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewCycle.propTypes = {
  GetPreviousCycle: PropTypes.func.isRequired,
  CyclesInProgress: PropTypes.func.isRequired,
  EndCycle: PropTypes.func.isRequired,
  cycles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cycles: state.cycles
});

export default connect(
  mapStateToProps,
  { GetPreviousCycle, CyclesInProgress, EndCycle }
)(ViewCycle);
