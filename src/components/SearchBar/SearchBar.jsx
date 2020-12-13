import React from 'react';
import { connect } from 'react-redux';
import classes from './SearchBar.module.css';
import Aux from '../../containers/Auxiliary/Auxiliary';

const searchBar = (props) => (
  <Aux>
    <input
      className={classes.SearchBar}
      placeholder="Search.."
      onChange={props.onSearchChange}
    />
  </Aux>
);

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch({ type: 'CHANGE_QUERY', value: event.target.value }),
});

export default connect(null, mapDispatchToProps)(searchBar);
