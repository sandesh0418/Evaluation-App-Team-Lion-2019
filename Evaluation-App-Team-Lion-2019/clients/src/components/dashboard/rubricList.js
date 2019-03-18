import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


function ListDisplay(props)
{
    const list = props.rubrics;
    const listItems = list.map((number)=>
    <li><Link to ={"/viewRubric/"+number.Rubric_Title}>{number.Rubric_Title}</Link></li>
    );
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
        axios.get('http://localhost:5000/rubric/getList')
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
                <ListDisplay rubrics={this.state.rubrics} />
            </div>
        );
    }
}