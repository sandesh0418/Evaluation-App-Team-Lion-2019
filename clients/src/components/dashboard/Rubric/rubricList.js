import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table';


function ListDisplay(props)
{
    const list = props.rubrics;
    var listItems = '';
    
    if(list != null){
    return list.map(function(number, index){
       return ( 
         <tr key={index}>
            <td >{number.Rubric_Title}</td>
            <td ><Link to ={"/viewRubric/"+number.Rubric_Id}><i class="far fa-eye"> View</i></Link></td>
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
        
        return(
            <div>
                <h1>Rubric List</h1>
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