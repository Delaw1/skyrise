import { serviceConstant } from '../constants/apicall.constant'

export const createProjectCall = (state = {}, action) => {
    switch(action.type) {
        case serviceConstant.CREATE_PROJECT_PENDING: 
            return {
                status: serviceConstant.CREATE_PROJECT_PENDING
            };
        case serviceConstant.CREATE_PROJECT_SUCCESS:
            return {
                status: serviceConstant.CREATE_PROJECT_SUCCESS,
                data: action.response.data
            };
        case serviceConstant.CREATE_PROJECT_UPLOADING:
            return {
                ...state,
                status: serviceConstant.CREATE_PROJECT_UPLOADING
            };
        case serviceConstant.CREATE_PROJECT_FAILURE:
            return {
                status: serviceConstant.CREATE_PROJECT_FAILURE,
                data: action.error.response.data
            };
        case serviceConstant.CREATE_PROJECT_CLEAR:
            return {
                status: serviceConstant.CREATE_PROJECT_CLEAR
            };
        default: return { ...state }
    }
}

export const createDeveloperCall = (state = {}, action) => {
    switch(action.type) {
        case serviceConstant.CREATE_DEVELOPER_PENDING: 
            return {
                status: serviceConstant.CREATE_DEVELOPER_PENDING
            };
        case serviceConstant.CREATE_DEVELOPER_SUCCESS:
            return {
                status: serviceConstant.CREATE_DEVELOPER_SUCCESS,
                data: action.response.data
            };
        case serviceConstant.CREATE_DEVELOPER_FAILURE:
            return {
                status: serviceConstant.CREATE_DEVELOPER_FAILURE,
                data: action.error.response.data
            };
        case serviceConstant.CREATE_DEVELOPER_CLEAR:
            return {
                status: serviceConstant.CREATE_DEVELOPER_CLEAR
            };
        default: return { ...state }
    }
}

export const getProjects = (state = { dats: []}, action) => {
    switch(action.type) {
        case serviceConstant.GET_PROJECTS_PENDING: 
            return {
                status: serviceConstant.GET_PROJECTS_PENDING,
                ...state
            };
        case serviceConstant.GET_PROJECTS_SUCCESS:
            return {
                status: serviceConstant.GET_PROJECTS_SUCCESS,
                data: action.response.data
            };
        case serviceConstant.GET_PROJECTS_FAILURE:
            return {
                status: serviceConstant.GET_PROJECTS_FAILURE,
                data: action.error.response
            };
        case serviceConstant.DELETE_PROJECT_PENDING:
            return {
                ...state
            };
        case serviceConstant.DELETE_PROJECT_SUCCESS: 
            return {
                status: serviceConstant.GET_PROJECTS_SUCCESS,
                // data: state.data.filter(project => project.id === action.response.data.id)
                data: state.data.filter(project => project.id != action.response.data.id)
            }
        case serviceConstant.GET_PROJECTS_CLEAR:
            return {
                status: serviceConstant.GET_PROJECTS_CLEAR
            };
        default: return { ...state }
    }
}

export const getDevelopers = (state = {status: '', data: []}, action) => {
    switch(action.type) {
        case serviceConstant.GET_DEVELOPERS_PENDING: 
            return {
                ...state,
                status: serviceConstant.GET_DEVELOPERS_PENDING,
                
            };
        case serviceConstant.GET_DEVELOPERS_SUCCESS:
            return {
                status: serviceConstant.GET_DEVELOPERS_SUCCESS,
                data: action.response.data
            };
        case serviceConstant.GET_DEVELOPERS_FAILURE:
            return {
                status: serviceConstant.GET_DEVELOPERS_FAILURE,
                data: action.error
            };
        case serviceConstant.GET_DEVELOPERS_CLEAR:
            return {
                ...state,
                status: serviceConstant.GET_DEVELOPERS_CLEAR,
                
            };
        default: return { ...state }
    }
}

export const getDeveloper = (state = {data:[]}, action) => {
    switch(action.type) {
        case serviceConstant.GET_DEVELOPER_PENDING: 
            return {
                status: serviceConstant.GET_DEVELOPER_PENDING
            };
        case serviceConstant.GET_DEVELOPER_SUCCESS:
            return {
                status: serviceConstant.GET_DEVELOPER_SUCCESS,
                data: action.payload
            };
        case serviceConstant.GET_DEVELOPER_FAILURE:
            return {
                status: serviceConstant.GET_DEVELOPER_FAILURE,
                data: action.error.response
            };
        case serviceConstant.GET_DEVELOPER_CLEAR:
            return {
                status: serviceConstant.GET_DEVELOPER_CLEAR
            };
        default: return { ...state }
    }
}

const initialState = {
    data: {
        amenities: []
    }
}
export const getGS = (state = initialState, action) => {
    switch(action.type) {
        case serviceConstant.GET_GS_PENDING: 
            return {
                ...state,
                status: serviceConstant.GET_GS_PENDING,
            };
        case serviceConstant.GET_GS_SUCCESS:
            return {
                status: serviceConstant.GET_GS_SUCCESS,
                data: action.response.data
            };
        case serviceConstant.GET_GS_UPDATE:
            return {
                status: serviceConstant.GET_GS_SUCCESS,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        case serviceConstant.SAVE_GS_SUCCESS:
            return {
                ...state,
                status: serviceConstant.SAVE_GS_SUCCESS,
            }
        case serviceConstant.SAVE_GS_PENDING:
            return {
                ...state,
                status: serviceConstant.SAVE_GS_PENDING,
            }
        case serviceConstant.SAVE_GS_CLEAR:
        return {
            ...state,
            status: serviceConstant.GET_GS_SUCCESS,
        }
        case serviceConstant.GET_GS_FAILURE:
            return {
                status: serviceConstant.GET_GS_FAILURE,
                data: action.error.response
            };
        case serviceConstant.GET_GS_CLEAR:
            return {
                status: serviceConstant.GET_GS_CLEAR
            };
        default: return { ...state }
    }
}