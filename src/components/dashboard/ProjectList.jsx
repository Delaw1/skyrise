import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import Tab from './Tab'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import ProjectTable from './ProjectTable'
import DetachedTable from './DetachedTable'
import debounce from 'lodash.debounce';
import '../../assest/css/easy-responsive-tabs.css'

export class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()

        this.state = {
            body: {},
            active: 0,
            isLoading: false,
            isActive: 'attached',
            error: ''
        }

        window.onscroll = debounce(() => {
            const { loadList, state: { isLoading } } = this

            if (isLoading) return

            if (
                window.innerHeight === document.documentElement.offsetHeight
            ) {
                // loadList()
            }
            // console.log(window.innerHeight)
            // console.log(document.documentElement.scrollTop)
            // console.log(document.documentElement.offsetHeight)
        }, 100)
    }

    loadList = () => {

        this.setState({ isLoading: true }, () => {
            this.props.getProjects()
            this.setState({ isLoading: false })
        })
    }

    handleTab = (name) => {
        this.setState({
            isActive: name,
            error: this.state[name].length === 0 ? 'No '+name+' project' : ''
        })
    }

    handleAttached = (e) => {
        const name = e.target.value
        if (name === 'attached') {
            const body = this.state.attached
            this.setState({
                body,
                error: body.length === 0 ? 'No '+name+' project' : ''
            })
        } else {
            const body = this.state.attached.filter((project) => project[name] && project)
            this.setState({
                body,
                error: body.length === 0 ? 'No '+name+' project' : ''
            })
            window.scrollTo(0, 0)
        }
    }

    handleDelete = (id) => {
        this.props.delProject(id)
    }

    async componentDidMount() {

        await this.props.getProjects()
        // this.myRef.current.scrollTo(0, 0)
        let attached = "Loading..."
        let detached = "Loading..."
        if (this.props.projects.status === serviceConstant.GET_PROJECTS_SUCCESS) {
            attached = this.props.projects.data.filter((project) => project.type_id == 1)
            detached = this.props.projects.data.filter((project) => project.type_id == 2)
            this.setState({
                attached,
                detached,
                body: attached,
                error: attached.length === 0 ? 'No attached project' : ''
            })
        }
    }
    componentDidUpdate = () => {
        ReactDOM.findDOMNode(this).scrollIntoView()
        // window.scrollTo(0, 0)
    }

    render() {
        return (
            <AdminContainer>
                <Fragment>
                    <div class="clearfix"></div>
                    <div id="container">
                        <div className="container-fluid">
                        <div class="alert alert-warning" style={{ display: this.state.error !== '' ? 'block' : 'none' }}>
              <strong>Warning!</strong> You should <a href="javascript:void(0)" class="alert-link">read this message</a>.
            </div>
            <div class="alert alert-warning" style={{ display: this.state.error !== '' ? 'block' : 'none' }}>
                {this.state.error}.
            </div>
                            <div class="w-100 pt-1">
                                <h2 class="page-h">
                                    PROJECT LIST
                                </h2>
                            </div>
                            <div ref={this.myRef} ></div>
                            <div class="mt-5">
                                <div class="tabs">
                                    <div class="tab-button-outer">
                                        <ul id="tab-button">
                                            <li className={this.state.isActive === 'attached' ? 'is-active' : ''} onClick={() => this.handleTab('attached')}><a href="#tab01">Attached</a></li>
                                            <li className={this.state.isActive === 'detached' ? 'is-active' : ''} onClick={() => this.handleTab('detached')}><a href="#tab02">Detached</a></li>

                                        </ul>
                                    </div>

                                    <div id="" className="tab-contents" style={{ display: this.state.isActive === 'attached' ? "block" : "none" }}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="custom-selects ex-sp">
                                                    <select onChange={this.handleAttached}>
                                                        <option value="attached">All attached.</option>
                                                        <option value="condos">Condos</option>
                                                        <option value="townhouse">Townhouse</option>
                                                        <option value="commercial">Commercial</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <ProjectTable body={this.state.body} handleDelete={(id) => this.handleDelete(id)} />
                                    </div>

                                    <div id="" className="tab-contents" style={{ display: this.state.isActive === 'detached' ? "block" : "none" }}>
                                        <DetachedTable body={this.state.detached} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </Fragment>

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
