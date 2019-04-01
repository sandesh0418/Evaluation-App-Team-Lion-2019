import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCriteria, getTopRow, getData, setTopRow, setCriteria, setData} from '../../actions/rubric';
import { Table, FormControl } from 'react-bootstrap';

class createRubric extends Component{

    constructor(props) {
        super();

        this.state = {
            value: props.value
        };
    }
    componentDidMount(){
        this.props.getCriteria();
        this.props.getData();
        this.props.getTopRow();
        this.timer = null;
      }

 
    onSubmit(e){
        e.preventDefault();
    }

   onChangeTopRow(e){
       if(e.target.value != null){
        this.props.setTopRow(e.target.name, e.target.value);
       }
      
   }
      
   onChangeData(e){
    if(e.target.value != null){
        this.props.setData(e.target.name, e.target.value);
    }
    }

   onChangeCriteria(e){

    if(e.target.value != null){
        this.props.setCriteria(e.target.name, e.target.value);
    }
    }
   
    
   
      
    render(){
        var weight = false;
        var display = "";
        var row = "";
        
        let { topRow, criteria, data} = this.props.rubric;

       

       if(topRow){
        
        display= topRow.map(singleValue => (
                <th key ={singleValue.Row_Id} className="borderedCell" style = {{padding: "0"}}>
                    <FormControl 
                                as = "textarea"
                                aria-label="With textarea"
                                name={singleValue.Row_Id}
                                onChange = {this.onChangeTopRow.bind(this)}
                                value={singleValue.name}
                                style={{width: "100%"}}
                                className="measureTitle centerAlign cells"/></th>
                                ))

      

       }

       else{
          
        console.log("Loading");  

        
        
               

       
           
       }
       if(criteria && data){
          var column;
          var i = 0;
          console.log(criteria);
        if(criteria[0][0].weight >= 0){
            weight = true;
            
            row = criteria.map((singleValue, count) => (
                <tr key ={count} className="borderedCell" style = {{padding: "0"}}>
                    <FormControl 
                                as = "textarea"
                                aria-label="With textarea"
                                name={singleValue[0].Row_Id}
                                onChange = {this.onChangeCriteria.bind(this)}
                                value={singleValue[0].criteria}
                                style={{width: "100%"}}
                                className="measureTitle centerAlign cells"/>
                                
               
           {data[count].map((value, index) => (

               
                <td key ={index} className="borderedCell" style = {{padding: "0"}}>
                    <FormControl 
                                as = "textarea"
                                aria-label="With textarea"
                                name={value.Row_Id}
                                onChange = {this.onChangeData.bind(this)}
                                value={value.description}
                                style={{width: "100%"}}
                                className="measureTitle centerAlign cells"/></td>
                                ))}

       

            {
                <FormControl 
                as = "textarea"
                aria-label="With textarea"
                name={singleValue[0].Row_Id}
                onChange = {this.onChangeCriteria.bind(this)}
                value={singleValue.weight}
                style={{width: "100%"}}
                className="measureTitle centerAlign cells"/>
            }

           

                    </tr>
                    
            ));
        }
        else{
            weight = false

            row = criteria.map((singleValue, count) => (
                <tr key ={count} className="borderedCell" style = {{padding: "0"}}>
                    <FormControl 
                                as = "textarea"
                                aria-label="With textarea"
                                name={singleValue[0].Row_Id}
                                onChange = {this.onChangeCriteria.bind(this)}
                                value={singleValue[0].criteria}
                                style={{width: "100%"}}
                                className="measureTitle centerAlign cells"/>
                                
               
           {data[count].map((value, index) => (

               
                <td key ={index} className="borderedCell" style = {{padding: "0"}}>
                    <FormControl 
                                as = "textarea"
                                aria-label="With textarea"
                                name={value.Row_Id}
                                onChange = {this.onChangeData.bind(this)}
                                value={value.description}
                                style={{width: "100%"}}
                                className="measureTitle centerAlign cells"/></td>
                                ))}
                   </tr>
                    
            ));
        }
    }
       
        
       
        return(
           
           
           
            <Table bordered striped>
            <thead>
                <tr>
                    <th className="centered borderedCell">Criteria</th>
            {display}
            { weight ? <th className="centered borderedCell">Weight</th> : "" }
           
            </tr>
            </thead>
            <tbody>
                
                { row }
                
            </tbody>
            </Table>
            
        );
    }
}

createRubric.propTypes = {
    getCriteria: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    getTopRow: PropTypes.func.isRequired,
    rubric: PropTypes.object.isRequired,
    setTopRow: PropTypes.func.isRequired,
    setCriteria: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
        auth: state.auth,
        rubric: state.rubric
})

export default connect (mapStateToProps, { getCriteria, getData, getTopRow, setTopRow, setCriteria,setData})(createRubric);