import React, {Component} from 'react';
import AdminNavBar from './nav-bar.component';
import EvalNavBar from './navEvaluator';

const user = sessionStorage.getItem('userRole');

export default class PickNavBar extends Component
{
    render()
    {
        return(
            <div>
                {user==="Administrator" ? <AdminNavBar /> : null}
                {user==="Evaluator" ? <EvalNavBar /> : null}
            </div>
        )
    }
}