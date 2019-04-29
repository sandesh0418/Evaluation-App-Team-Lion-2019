import React, {Component} from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import Loader from 'react-loader-spinner';

export default class DisplayMessages extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            messages: null
        }
    }

    render()
    {
        if (this.state.messages === null)
        {
            return <Loader 
                type="Oval"
                color="black"
                height="100"	
                width="100"
            />
        }
    }
}