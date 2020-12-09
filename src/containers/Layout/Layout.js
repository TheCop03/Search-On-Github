import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from '../../components/SearchBar/SearchBar';
import Projects from '../../components/Projects/Projects';

import classes from './Layout.module.css';

import axios from 'axios';

class Layout extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            if (this.props.query.length > 1) {
                    axios.get('https://api.github.com/search/repositories?q=' + this.props.query)
                        .then( response => {
                            this.props.onProjectsUpdate(response.data.items)
                        })
            }
        }
    }

    render() {
        let projects = 'Loading...'

        if (this.props.query.length < 2){
            projects = 'Type in the search bar above to search for repositories'
        }
        else if (!this.props.isFetching){
            let filteredProjects = this.props.projects.filter(project => project.name.toLowerCase().includes(this.props.query.toLowerCase()))
            projects = <Projects projects={filteredProjects} />
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
                {projects}
            </main>
        )
    }
};

const mapStateToProps = state => {
    return {
        query: state.searchTerm,
        projects: state.projects,
        isFetching: state.fetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProjectsUpdate: (projectsList) => dispatch({type: 'UPDATE_PROJ', projects: projectsList})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);