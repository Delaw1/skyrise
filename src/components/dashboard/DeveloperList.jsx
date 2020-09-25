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
                <div>
                    <div className="container-fluid">
                        <div className="w-100 ">
                            <h2 className="page-heading mt-4">
                                DEVELOPER LIST
      </h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">DEVELOPER</th>
                                        <th scope="col">CONTACT</th>
                                        <th scope="col">PHONE</th>
                                        <th scope="col">EMAIL</th>
                                        <th scope="col">ADDRESS</th>
                                        <th scope="col">CITY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.developers.status === serviceConstant.GET_DEVELOPERS_SUCCESS ?
                                        this.props.developers.data.map((developer, i) =>
                                            <tr kry={i} onClick={() => this.handleClick(developer)}>
                                                <td data-label="DEVELOPER">

                                                    {developer.name}
            </td>
                                    <td data-label="CONTACT">{developer.contact_firstname}</td>
                                    <td data-label="PHONE">{developer.contact_phone}</td>
                                                <td data-label="EMAIL">{developer.contact_email}</td>
                                                <td data-label="ADDRESS ">{developer.address}</td>
                                                <td data-label="CITY">{developer.city}</td>
                                            </tr>
                                        )
                                        : 'loading...'}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="clearfix" />
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
