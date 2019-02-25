import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import AdminNavBar from "../nav-bar/nav-bar.component";
import EvalNavBar from "../nav-bar/navEvaluator";

//dummy data
var rubrics = ["Rubric 1", "Rubric 2", "Rubric 3"];


function ListDisplay(props)
{
    return props.rubrics.map(function(rubric, i){
        return <div><Link to="/rubric" key={i}>{rubric}</Link></div>;
    });
}

export default class RubricList extends Component 
{
    render()
    {
        return(
            <div>
                {sessionStorage.getItem("userType")==="Administrator" ? <AdminNavBar /> : null}
                {sessionStorage.getItem("userType")==="Evaluator" ? <EvalNavBar /> : null}
                <h1>Rubric List</h1>
                <ListDisplay rubrics={rubrics} />
            </div>
        );
    }
}