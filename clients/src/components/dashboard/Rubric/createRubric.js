import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRubric, updateRubric, updateTitle } from "../../../actions/rubric";
import { FormControl, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../../../stylesheets/rubricView.css";

import "../../../stylesheets/rubric.css";
import Loader from "react-loader-spinner";

class createRubric extends Component {
  constructor(props) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      saveRubric: [],
      weight: true,
      rubricTitle: "",
      title: true
    };
  }
  componentDidMount() {
    this.props.getRubric(this.props.match.params.rubricId);
  }

  onSubmit(e) {
    e.preventDefault();

    if (
      this.props.rubric.rubric[2].weight === true &&
      this.state.title === true
    ) {
      window.location.replace("/rubricList");
    } else {
      if (this.props.rubric.rubric[2].weight === false) {
        this.setState({ weight: false });
      }
      if (!this.state.title) {
        this.setState({
          title: false
        });
      }
    }
  }

  titleChange(e) {
    const obj = {
      Rubric_Id: this.props.match.params.rubricId,
      Rubric_Title: e.target.value
    };
    this.setState({
      rubricTitle: e.target.value
    });

    if (!e.target.value) {
      this.setState({
        title: false
      });
    } else {
      this.setState({
        title: true
      });
    }
    this.props.updateTitle(obj);

    this.props.getRubric(this.props.match.params.rubricId);
  }

  onChange(e) {
    const obj = {
      Row: e.target.id,
      Rubric_Id: this.props.match.params.rubricId,
      value: e.target.value
    };

    if (e.target.id.includes("weight")) {
      this.setState({ weight: this.state.weight + parseFloat(e.target.value) });
    }

    this.props.updateRubric(obj);

    this.props.getRubric(this.props.match.params.rubricId);
  }

  render() {
    var weight = false;
    var display;
    var row;
    var weight = 0;
    var load;
  

    let { rubric } = this.props.rubric;

    if (rubric != null) {
      this.state.rubricTitle = rubric[0][0].Rubric_Title;
      

      display = rubric[0].map((singleValue, index) => (
        <th
          key={index}
          className="borderedCell"
          style={{ padding: "0", textAlign: "center" }}
        >
          <FormControl
            as="textarea"
            aria-label="With textarea"
            
            onChange={this.onChange.bind(this)}
            defaultValue={singleValue.Value_Name}
            id={"scale" + " " + singleValue.Value_Number}
            className="measureTitle centerAlign cells"
            style={{ width: "100%" }}
          />
          Value: {singleValue.Value_Number}
        </th>
      ));

      if (rubric[1][0][0].weight === undefined) {
        row = rubric[1].map((single, index) => (
          <tr
            key={index}
            className="borderedCell"
            style={{ padding: "0", textAlign: "center" }}
          >
            <td key={index} style={{ padding: "0px !important" }}>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                
                onChange={this.onChange.bind(this)}
                defaultValue={single[0].Criteria_Title}
                id={"criteria" + " " + single[0].Row_Id}
                className="measureTitle centerAlign cells"
                style={{ width: "100%" }}
              />
            </td>

            {single.map((value, i) => (
              <td key={i} style={{ padding: "0px !important" }}>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                 
                  onChange={this.onChange.bind(this)}
                  defaultValue={value.Data}
                  id={"data" + " " + value.Row_Id + " " + value.index}
                  className="measureTitle centerAlign cells"
                  style={{ width: "100%" }}
                />
              </td>
            ))}
          </tr>
        ));
      } else {
        weight = 1;
        row = rubric[1].map((single, index) => (
          // className="borderedCell" style = {{padding: "0", textAlign: "center"}}
          <tr key={index}>
            <td key={index} style={{ padding: "0px !important" }}>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                
                onChange={this.onChange.bind(this)}
                defaultValue={single[0].Criteria_Title}
                id={"criteria" + " " + single[0].Row_Id}
                className="measureTitle centerAlign cells"
                style={{ width: "100%" }}
              />
            </td>

            {single.map((value, i) => (
              <td key={i} style={{ padding: "0px !important" }}>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  
                  onChange={this.onChange.bind(this)}
                  defaultValue={value.Data}
                  id={"data" + " " + value.Row_Id + " " + value.index}
                  className="measureTitle centerAlign cells"
                  style={{ width: "100%" }}
                />
              </td>
            ))}

            {
              <td key={index + 1} style={{ padding: "0px !important" }}>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  
                  onChange={this.onChange.bind(this)}
                  defaultValue={single[0].weight}
                  id={"weight" + " " + single[0].Row_Id}
                  className="measureTitle centerAlign cells"
                  style={{ width: "100%" }}
                />
              </td>
            }
          </tr>
        ));
      }
    } else {
      load = (
        
            <Loader type="Oval" color="black" height="100" width="100" />
        
      );
    }

    return (
      <Form onSubmit={this.onSubmit}>
        {this.state.title ? null : (
          <p className="alert alert-danger text-center">
            <i
              style={{ paddingRight: "10px", fontSize: "20px" }}
              className="fas fa-exclamation-triangle"
            />
            Rubric title cannot be empty
          </p>
        )}
       
        <input
          type="text"
          defaultValue={this.state.rubricTitle}
         
          onChange={this.titleChange.bind(this)}
          style={{
            width: "25%",
            margin: "30px 37.5%",
            border: "2px solid #dee2e6",
            textAlign: "center",
            border: "2px solid black"
          }}
        />
        {this.state.weight ? null : (
          <p className="alert alert-danger text-center">
            <i
              style={{ paddingRight: "10px", fontSize: "20px" }}
              className="fas fa-exclamation-triangle"
            />
            Rubric has not been saved!!! Total weight is not 100% !!
          </p>
        )}
        {load}
        <Table
          bordered
          striped
          hover
          responsive="sm"
          responsive="md"
          //   responsive="lg"
          //   responsive="xl"
          id="createRubric"
        >
          
          <thead>
            <tr>
              {/* className="centered borderedCell" */}
              <th>Criteria</th>
              {display}
              {/* className="centered borderedCell" */}
              {weight ? <th>Weight</th> : null}
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </Table>

        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
            padding: "5px"
          }}
          type="submit"
          className="btn btn-large btn-success waves-effect waves-light hoverable"
        >
          <i className="far fa-save"></i> Save
        </button>
      </Form>
    );
  }
}

createRubric.propTypes = {
  getRubric: PropTypes.func.isRequired,
  updateRubric: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  rubric: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  rubric: state.rubric
});

export default connect(
  mapStateToProps,
  { getRubric, updateTitle, updateRubric }
)(createRubric);
