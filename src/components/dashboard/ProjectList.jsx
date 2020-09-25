import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import Tab from './Tab'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import ProjectTable from './ProjectTable'
import debounce from 'lodash.debounce';

export class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()

        this.state = {
            body: '',
            active: 0,
            isLoading: false
        }

        window.onscroll = debounce(() => {
            const {loadList, state: {isLoading} } = this

            if(isLoading) return 

            if(
                window.innerHeight  === document.documentElement.offsetHeight
            ) {
                // loadList()
            }
            console.log(window.innerHeight)
            console.log(document.documentElement.scrollTop)
            console.log(document.documentElement.offsetHeight)
        }, 100)
    }

    loadList = () => {
        
        this.setState({isLoading: true}, () => {
            this.props.getProjects()
            this.setState({isLoading: false})
        })
    }

    handleDelete = (id) => {
        this.props.delProject(id)
    }
    
    componentDidMount() {

        this.props.getProjects()
        // this.myRef.current.scrollTo(0, 0)
        // this.setState({
        //     body: this.props.attached.data
        // })
        // console.log(this.state.body)
    }
    componentDidUpdate = () => {
        ReactDOM.findDOMNode(this).scrollIntoView()
        // window.scrollTo(0, 0)
    }

    render() {
        let attached = "Loading..."
        let condos = "Loading..."
        let town = "Loading..."
        let comm = "Loading..."
        let detached = "Loading..."
        if (this.props.projects.status === serviceConstant.GET_PROJECTS_SUCCESS) {
            attached = this.props.projects.data.filter((project) => project.type_id == 1 ? project : null)

            condos = attached.filter((project) => project.condos && project)
            town = attached.filter((project) => project.townhouse && project)
            comm = attached.filter((project) => project.commercial && project)
            detached = this.props.projects.data.filter((project) => project.type_id == 2 ? project : null)

        }
        return (
            <AdminContainer>
                
            </AdminContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addProject: state.addProject,
        projects: state.projects
    }
}

export default connect(mapStateToProps, {
    getProjects: apiCallAction.getProjects,
    delProject: apiCallAction.delProject
})(ProjectList)
