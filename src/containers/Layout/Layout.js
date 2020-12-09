import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Projects from '../../components/Projects/Projects';

import classes from './Layout.module.css';

import axios from 'axios';

class Layout extends Component {

    state = {
        searchTerm: '',
        projects: [],
        fetching: false
    }

    getProjects() {
        axios.get('https://api.github.com/search/repositories?q=' + this.state.searchTerm)
            .then( response => {
                console.log(response);
                this.setState({
                    fetching: false,
                    projects: response.data.items
                })
            })
    }

    searchHandler = (event) => {
        this.setState({searchTerm: event.target.value, fetching: true}, () => {
            if ((this.state.searchTerm) && (this.state.searchTerm.length > 1)){
                if (this.state.searchTerm.length % 2 === 0) {
                    this.getProjects();
                }
            }
        })
    }

    render() {
        let projects = 'Loading...'

        if (this.state.searchTerm.length < 2){
            projects = 'Type in the search bar above to search for repositories'
        }
        else if (!this.state.fetching){
            let filteredProjects = this.state.projects.filter(project => project.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            projects = <Projects projects={filteredProjects} />
        }

        return (
            <main>
                <h1>Search On Github</h1>
                <SearchBar changed={this.searchHandler} />
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

export default Layout;