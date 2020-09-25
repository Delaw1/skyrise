import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'

export class Developer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        this.props.dispatch(apiCallAction.createDevelper(this.state))
    }

    componentDidUpdate() {
        if (this.props.addDeveloper.status == serviceConstant.CREATE_DEVELOPER_SUCCESS) {
          alert('Developer successfully added')
          this.props.dispatch({ type: serviceConstant.CREATE_PROJECT_CLEAR })
          history.push('/developer-list')
        }
      }

    render() {
        return (
            <AdminContainer developer={'active'}>
                <div>
                    <div className="container-fluid">
                        <div className="w-100 pt-1">
                            <h2 className="page-heading mt-4">
                                ADD DEVELOPER
            </h2>
                            <div className="row">
                                <div className="col-md-7 form-div admin-info">
                                    <div className="row">
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-name">Developer name</label>
                                                <input type="text" id="c-name" className="form-control" name="name" onChange={this.handleChange} placeholder="name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Website">Developer Website</label>
                                                <input type="text" id="c-Website" className="form-control" name="website" placeholder="Website" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Address">Address</label>
                                                <input type="text" id="c-Address" className="form-control" name="address" onChange={this.handleChange} placeholder="Address" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <label htmlFor className="pl-md-4">Contact</label>
                                            <div className="row">
                                                <div className="col-md-6  pad-r-5">
                                                    <div className="input-area pl-md-4">
                                                        <input type="text" id="c-name" className="form-control" name="contact_firstname" placeholder="firstname" onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 pad-l-5">
                                                    <div className="input-area">
                                                        <input type="text" id="c-name" className="form-control" name="contact_lastname" onChange={this.handleChange} placeholder="lastname" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-City">City</label>
                                                <input type="text" id="c-City" className="form-control" name="city" placeholder="City" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Phone">Phone</label>
                                                <input type="tel" id="c-Phone" className="form-control" name="contact_phone" placeholder="Phone" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Province">Province</label>
                                                <input type="text" id="c-Province" className="form-control" name="province" placeholder="Province" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Email">Email</label>
                                                <input type="email" id="c-Email" className="form-control" name="contact_email" placeholder="Email" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="Code">Postal Code</label>
                                                <input type="text" id="Code" className="form-control" name="postal_code" placeholder="Code" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6" />
                                </div>
                            </div>
                            <div className="col-4 offset-4">
                                <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.addDeveloper.status === serviceConstant.CREATE_DEVELOPER_PENDING ? "Loading..." : "Add Developer"} onClick={this.handleSubmit} name />
                            </div>
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
      addDeveloper: state.addDeveloper
    }
  }

export default connect(mapStateToProps, null)(Developer)
