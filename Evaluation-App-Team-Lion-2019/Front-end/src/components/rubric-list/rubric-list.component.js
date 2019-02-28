import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PickNavBar from '../nav-bar/pick-nav-bar';

//dummy data
var rubrics = ["Rubric 1", "Rubric 2", "Rubric 3"];


function ListDisplay(props)
{
    return props.rubrics.map(function(rubric, i){
        return <div key={i}><Link to="/viewRubric">{rubric}</Link></div>;
    });
}

export default class RubricList extends Component 
{
    render()
    {
        return(
            <div>
                <PickNavBar />
                <h1>Rubric List</h1>
                <ListDisplay rubrics={rubrics} />
            </div>
        );
    }
}