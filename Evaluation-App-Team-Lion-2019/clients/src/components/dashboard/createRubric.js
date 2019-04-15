import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRubric, updateRubric} from '../../actions/rubric';
import { Table, FormControl } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import '../../stylesheets/rubric.css';

class createRubric extends Component{

    constructor(props) {
        super();
        this.state = {
            saveRubric: []
        }

        
    }
    componentDidMount(){
       
        
        this.props.getRubric(localStorage.getItem("title"), localStorage.getItem("dept_Id"));
        
      }
    
     

 
    onSubmit(e){
        e.preventDefault();
    }

    


    onChange(e){
        const obj = {
            Row: e.target.id,
            Rubric_Id: e.target.name,
            value: e.target.value
        }
        
        this.props.updateRubric(obj);
       
        this.props.getRubric(localStorage.getItem("title"), localStorage.getItem("dept_Id"));
        


    }
   
   
    
   
      
    render(){
        var weight = false;
        var display = "";
        var row = "";
        var weight = 0;
        var load = '';
        
        let { rubric } = this.props.rubric;
        

       if(rubric){
           
        
            
                display = rubric[0].map((singleValue, index) => (
                    <th key ={index} className="borderedCell" style = {{padding: "0", textAlign: "center"}} >
                    <FormControl 
                                as = "textarea"
                                aria-label ="With textarea"
                                name = {singleValue.Rubric_Id}
                                onChange={this.onChange.bind(this)}
                                defaultValue={singleValue.Value_Name}
                                id={"scale"+ " " +singleValue.Value_Number}
                                className="measureTitle centerAlign cells"
                                style = {{width : "100%"}}/>
                            Value- {singleValue.Value_Number}
                    </th>
                ))
            
            


      console.log(rubric[1][0][0].weight)
        if(rubric[1][0][0].weight === undefined){
        row = rubric[1].map((single, index) => (
            
            <tr key ={index} className="borderedCell" style = {{padding: "0", textAlign: "center"}} >
                <td key = {index}>
                        <FormControl 
                                as = "textarea"
                                aria-label ="With textarea"
                                name = {single[0].Rubric_Id}
                                onChange={this.onChange.bind(this)}
                                defaultValue={single[0].Criteria_Title}
                                id={"criteria"+" "+single[0].Row_Id}
                                className="measureTitle centerAlign cells"
                                style = {{width : "100%"}}/>
                               
                        
                    </td>

                    {
                        single.map((value, i ) =>(
                            <td key ={i}>
                            <FormControl 
                                        as = "textarea"
                                        aria-label ="With textarea"
                                        name = {single[0].Rubric_Id}
                                        onChange={this.onChange.bind(this)}
                                        defaultValue={value.Data}
                                        id={"data"+" "+value.Row_Id+" "+value.index}
                                        className="measureTitle centerAlign cells"
                                        style = {{width : "100%"}}/>
                                
                            </td>
                        ))
                    }
                
                
            </tr>
            
        ))
       }
    
        else{
            weight = 1;
            row = rubric[1].map((single, index) => (
            
                <tr key ={index} className="borderedCell" style = {{padding: "0", textAlign: "center"}} >
                    <td key = {index}>
                            <FormControl 
                                    as = "textarea"
                                    aria-label ="With textarea"
                                    name = {single[0].Rubric_Id}
                                    onChange={this.onChange.bind(this)}
                                    defaultValue={single[0].Criteria_Title}
                                    id={"criteria"+" "+single[0].Row_Id}
                                    className="measureTitle centerAlign cells"
                                    style = {{width : "100%"}}/>
                                   
                            
                        </td>
    
                        {
                            single.map((value, i ) =>(
                                <td key ={i}>
                                <FormControl 
                                            as = "textarea"
                                            aria-label ="With textarea"
                                            name = {single[0].Rubric_Id}
                                            onChange={this.onChange.bind(this)}
                                            defaultValue={value.Data}
                                            id={"data"+" "+value.Row_Id+" "+value.index}
                                            className="measureTitle centerAlign cells"
                                            style = {{width : "100%"}}/>
                                    
                                </td>
                            ))
                        }

                        {<td key = {single[0].Row_Id}>
                            <FormControl 
                                    as = "textarea"
                                    aria-label ="With textarea"
                                    name = {single[0].Rubric_Id}
                                    onChange={this.onChange.bind(this)}
                                    defaultValue={single[0].weight}
                                    id={"weight"+" "+single[0].Row_Id}
                                    className="measureTitle centerAlign cells"
                                    style = {{width : "100%"}}/>
                                   
                            
                        </td>
                        }                       
                    
                </tr>
                
            ))
        }
    }
       else{
          
        load = <div className='sweet-loading'>
        <ClipLoader
         
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          
        />
      </div>;

        
        
               

       
           
       }
      
       
        
       
        return(
           
           
           <>
            
            <Table bordered striped>
            <thead>
                <tr>
                    <th className="centered borderedCell">Criteria</th>
                    {load}
            {display}
            { weight ? <th className="centered borderedCell">Weight</th> : "" }
           
            </tr>
            </thead>
            <tbody>
                
                { row }
                
            </tbody>
            </Table>
            </>
        );
    }
}

createRubric.propTypes = {
    getRubric: PropTypes.func.isRequired,
    updateRubric: PropTypes.func.isRequired,
    rubric: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
        auth: state.auth,
        rubric: state.rubric
})

export default connect (mapStateToProps, { getRubric, updateRubric })(createRubric);