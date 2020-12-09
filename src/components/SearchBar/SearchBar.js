import React from 'react';

import classes from './SearchBar.module.css';

import Aux from '../../containers/Auxiliary/Auxiliary';

const searchBar = (props) => {
    return (
        <Aux>
            <input className={classes.SearchBar} placeholder='Search..' onChange={props.changed} />
        </Aux>
    )
}

export default searchBar;