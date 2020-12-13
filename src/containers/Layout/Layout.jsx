import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import SearchBar from '../../components/SearchBar/SearchBar';
import Projects from '../../components/Projects/Projects';
import classes from './Layout.module.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.getProjectsFromApi = debounce(this.getProjectsFromApi.bind(this), 300);
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (prevProps.query !== query) {
      if (query.length > 1) {
        this.getProjectsFromApi(query);
      }
    }
  }

  getProjectsFromApi = (query) => {
    const { onProjectsUpdate } = this.props;
    axios.get(`https://api.github.com/search/repositories?q=${query}`)
      .then((response) => {
        onProjectsUpdate(response.data.items);
      });
  }

  render() {
    const { query, projects, isFetching } = this.props;
    let renderedProjects = 'Loading...';

    if (query.length < 2) {
      renderedProjects = 'Type in the search bar above to search for repositories';
    } else if (!isFetching) {
      const filteredProjects = projects.filter((project) => (
        project.name.toLowerCase().includes(query.toLowerCase())
      ));
      renderedProjects = <Projects projects={filteredProjects} />;
    }

    return (
      <main>
        <h1>Search On Github</h1>
        <SearchBar />
        <h3>Project List</h3>
        <div className={classes.Titles}>
          <p>Project Name</p>
          <span>Stargazers Count</span>
          <span>Watchers Count</span>
        </div>
        {renderedProjects}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  query: state.searchTerm,
  projects: state.projects,
  isFetching: state.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  onProjectsUpdate: (projectsList) => dispatch({ type: 'UPDATE_PROJ', projects: projectsList }),
});

Layout.propTypes = {
  query: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.project).isRequired,
  isFetching: PropTypes.bool.isRequired,
  onProjectsUpdate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
