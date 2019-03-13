import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

//dummy data
var rubrics = ["Rubric 1", "Rubric 2", "Rubric 3"];


function ListDisplay(props)
{
    return props.rubrics.map(function(rubric){
        return <div key={rubric.Rubric_Title}><Link to={"/gradeRubric/" + rubric.Rubric_Title}>{rubric.Rubric_Title}</Link></div>;
    });
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