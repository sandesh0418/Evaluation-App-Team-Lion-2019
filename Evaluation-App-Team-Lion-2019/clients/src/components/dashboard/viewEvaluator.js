import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function ListEvaluators(props)
    {
        const list = props.evaluatorList;
        const listItems = list.map((number)=>
        <li>{number.firstName+number.lastName}</li>);
        return (<option>{listItems}</option>);
    }


export default class ViewEvaluator extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            evaluatorList :[]
        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:5000/evaluators/evaluatorList")
        .then(res => {
            this.setState({
                evaluatorList:res.data.evaluatorList
                
            })
        })
    }

    render()
    {
        console.log(this.state.evaluatorList);
        return(
            <div>
                <h1>Evaluators</h1>
                
                <form>
                <p>Select Evaluator: </p>
                <select>
                    <option value = "a">skjdlfj</option>
                    <option value = "b">lksjdlf</option>
                </select>
                <input type ="submit"/>
                </form>

            </div>
        );
    }
}