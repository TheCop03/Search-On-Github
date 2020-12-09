import React from 'react';

import classes from './Project.module.css';

const project = (props) => {
    return (
        <div className={classes.Project}>
            <a href={props.url}>{props.name}</a>
            <span>{props.stargazers}</span>
            <span>{props.watchers}</span>
        </div>
    )
}

export default project;