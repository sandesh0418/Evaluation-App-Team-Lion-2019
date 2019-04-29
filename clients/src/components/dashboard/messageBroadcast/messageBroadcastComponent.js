import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CreateMessage from './createMessage.js';
import DisplayMessages from './displaySentMessages.js';

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
                <h1>Create Message</h1>
                <CreateMessage />
                <h1>Sent Messages</h1>
                <DisplayMessages />
            </>
        )
    }
}