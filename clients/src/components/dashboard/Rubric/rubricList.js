import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


function ListDisplay(props)
{
    const list = props.rubrics;
    var listItems = '';
    
    if(list != null){
    listItems = list.map((number, index) =>
        <li key={index}><Link to ={"/viewRubric/"+number.Rubric_Id}>{number.Rubric_Title}</Link></li>
    );
    }
    else{
        
        listItems = <div className="text-danger">You do not have any rubrics</div>
    }

    return (
        <ol>{listItems}</ol>
    )
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
                <ListDisplay rubrics = {this.state.rubrics} />
            </div>
        );
    }
}