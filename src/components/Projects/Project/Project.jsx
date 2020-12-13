import React from 'react';
import PropTypes from 'prop-types';
import classes from './Project.module.css';

const project = (props) => {
  const {
    url, name, stargazers, watchers,
  } = props;

  return (
    <div className={classes.Project}>
      <a href={url}>{name}</a>
      <span>{stargazers}</span>
      <span>{watchers}</span>
    </div>
  );
};

project.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stargazers: PropTypes.number.isRequired,
  watchers: PropTypes.number.isRequired,
};

export default project;
