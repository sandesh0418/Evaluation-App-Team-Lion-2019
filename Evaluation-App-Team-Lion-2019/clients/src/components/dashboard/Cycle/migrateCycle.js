

import React, { Component } from 'react';
import { CyclesInProgress, GetPreviousCycle } from '../../../actions/cycle';
import { connect }  from 'react-redux';
import PropTypes from "prop-types";
import { ClipLoader } from 'react-spinners'
import axios from "axios";
import { Link } from 'react-router-dom';


function DisplayRubric(props){
  var rubricList = '';
      if(props.rubrics){
          rubricList = props.rubrics.map((singleRubric, index) => (
            <li key={index}><Link to = {"/migrateCycles/"+singleRubric.Rubric_Id}>{singleRubric.Rubric_Title}</Link></li>
          ))
      }

      else{
        rubricList = <li>There are no rubrics in this cycle</li>
      }

      return (<ul>{rubricList}</ul>);
}
 class migrateCycle extends Component {

  constructor(props){
    super(props);

    this.state= {
        rubric: [],
        measure: [],
        outcome: [],
        click : false
    }
  }

  componentDidMount(){
    this.props.GetPreviousCycle();
    
  }

  onClick(e){
    
    axios.get('/rubric/getList/'+`${e.target.id}`)
          .then(res => {
            this.setState({
              rubric: res.data.rubrics
            })
          })
        
         this.setState({click: true})
    

  }


  render() {

    let {cycles} = this.props;
    var previous;
    
    if(cycles.previousCycle != null){

      previous = cycles.previousCycle.map((previous, index)=> (
        <div key={index}>
        <button 
                className="btn btn-secondary"
                id={previous.Cycle_Id}    
                onClick={this.onClick.bind(this)}
        > {previous.Cycle_Name}</button><br/><br/></div>
      ))

    }

    else{
      previous = <div className='sweet-loading'>
      <ClipLoader
       
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        
      />
    </div>;
    }


    return (
      <div>
        <h1>Rubrics from past cycles</h1>
        {previous}
        
        {this.state.click ? <DisplayRubric rubrics = {this.state.rubrics} /> : " "}
      </div>
    )
  }
}

migrateCycle.propTypes={
  
  GetPreviousCycle: PropTypes.func.isRequired,
  cycles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  cycles : state.cycles
})

export default connect(mapStateToProps, {GetPreviousCycle})(migrateCycle);
