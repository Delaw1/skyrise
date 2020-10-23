import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'

export class DeveloperList extends Component {

    handleClick = (developer) => {
        this.props.getDeveloper(developer)
        history.push('/developer-data')
    }

    componentDidMount() {
        this.props.getDevelopers()
    }
    render() {
        return (
            <AdminContainer>
                <div id="container">
                    <div className="container-fluid">
                        <div className="w-100 ">
                            <h2 className="page-h">
                                DEVELOPERS LIST
      </h2>
                            <table className="prj-list">
                                <thead>
                                    <tr>
                                        <th scope="col" className="pl-40">Developer</th>
                                        <th scope="col">Contact name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col" className="text-right">City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.developers.status === serviceConstant.GET_DEVELOPERS_SUCCESS ?
                                        this.props.developers.data.map((developer, i) =>
                                            <tr kry={i} onClick={() => this.handleClick(developer)}>
                                                <td data-label="Developer">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckBox21" />
                                                        <label className="custom-control-label pt-1 text-dark sm" htmlFor="customCheckBox21">
                                                            {developer.name}
                                                        </label>
                                                    </div>
                                                </td>
                                                <td data-label="Contact name">{developer.contact_firstname}</td>
                                                <td data-label="Phone">{developer.contact_phone}</td>
                                                <td data-label="Email">{developer.contact_email}</td>
                                                <td data-label="Address">{developer.address}</td>
                                                <td data-label="City" className="text-right">{developer.city}</td>
                                            </tr>
                                        )
                                        : 'loading...'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </AdminContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addProject: state.addProject,
        developers: state.developers
    }
}

export default connect(mapStateToProps, {
    getDevelopers: apiCallAction.getDevelopers,
    getDeveloper: apiCallAction.getDeveloper,
})(DeveloperList)
