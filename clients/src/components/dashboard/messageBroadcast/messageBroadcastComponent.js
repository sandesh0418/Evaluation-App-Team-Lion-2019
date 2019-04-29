import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CreateMessage from './createMessage.js';
import DisplayMessages from './displayMessages.js';

export default class MessageBroadcastComponent extends Component 
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <>
                <h2>Create Message</h2>
                <CreateMessage />
                <DisplayMessages />
            </>
        )
    }
}