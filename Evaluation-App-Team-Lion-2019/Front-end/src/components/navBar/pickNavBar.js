import React, {Component} from 'react';

import AdminNavBar from './navAdmin';
import EvalNavBar from './navEvaluator';
import LoginNav from './loginNav.js';

const user = sessionStorage.getItem('userRole');

export default class PickNavBar extends Component
{
    render()
    {
        return(
            <div>
                {user==="Administrator" ? <AdminNavBar /> : null}
                {user==="Evaluator" ? <EvalNavBar /> : null}
                {user===undefined ? <LoginNav /> : null}
            </div>
        )
    }
}