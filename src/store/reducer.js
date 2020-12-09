
const initState = {
    searchTerm: '',
    projects: [],
    fetching: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_QUERY':
            // console.log(state)
            return {
                ...state,
                searchTerm: action.value,
                fetching: true
            }
        
        case 'UPDATE_PROJ':
            return {
                ...state,
                projects: action.projects,
                fetching: false
            }

        default:
            return state;
    }
}

export default reducer;