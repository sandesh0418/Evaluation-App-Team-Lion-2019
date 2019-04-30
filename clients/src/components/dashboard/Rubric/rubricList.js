import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Loader from 'react-loader-spinner';


function ListDisplay(props)
{
    const list = props.rubrics;
    var listItems = '';
    
    if(list != null){
    return list.map(function(number, index){
       return ( 
         <tr key={index}>
            <td >{number.Rubric_Title}</td>
            <td ><Link to ={"/viewRubric/"+number.Rubric_Id}><i className="far fa-eye"> View</i></Link></td>
            </tr>
       );
    }
    );
    }
    else{
        
        return (<div className="text-danger">You do not have any rubrics</div>);
    }

    // return (
    //     {listItems}
    // )
}


export default class RubricList extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            rubrics: []
        }
    }

    componentDidMount()
    {
       
        axios.get('/api/rubric/getList/'+`${localStorage.getItem("Cycle_Id")}`)
            .then(res => {
                this.setState({
                    rubrics: res.data.rubrics
                })
            })
    }

   

    render()
    {   
        console.log(this.state.rubrics);
        if(this.state.rubrics === null)
        {
            return <Loader 
                type="Oval"
                color="black"
                height="100"	
                width="100"
            />
        }
        else if (this.state.rubrics.length == 0)
        {
            return <p>There are no rubrics with this cycle. <a href="/Rubric">Click here</a> to create a Rubric or <a href="/cycles">click here</a> to change cycle. </p>
        }
        else
        {   
        return(
            <div>
                <h2>Rubric List</h2>
                <Table striped bordered hover responsive="sm" responsive="md" responsive="lg" responsive="xl" id="viewTable">
                    <thead>
                        <tr id ="criteria"> 
                            <th>Rubric Title</th>
                            <th>Link to Rubric</th>
                        </tr>
                    </thead>
                    <tbody>
                { <ListDisplay rubrics = {this.state.rubrics} /> }
                </tbody>
                </Table>
            </div>
        );
    }
}
}