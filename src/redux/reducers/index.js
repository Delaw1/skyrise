import { combineReducers } from 'redux'
import { createProjectCall, getProjects, createDeveloperCall, getDevelopers, getDeveloper, getGS} from './apicall.reducer'

const rootReducer = combineReducers({
    addProject: createProjectCall,
    projects: getProjects,
    addDeveloper: createDeveloperCall,
    developers: getDevelopers,
    developer: getDeveloper,
    gs: getGS
})

export default rootReducer