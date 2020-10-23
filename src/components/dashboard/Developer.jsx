import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'
import Alert from './Alert';
import axios from 'axios'
import { BASEURL } from '../../services/url'

export class Developer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            contact_email: '',
            address_suggestion: []
        }
    }

    handleChange = (e) => {
        if (e.target.name === 'address') {
            console.log(e.target.name.length)
            if (e.target.value.length > 3) {
                axios.get(BASEURL + '/address/' + e.target.value).then(resp => {
                    // console.log(resp.data.predictions)
                    this.setState({
                        address_suggestion: resp.data.predictions
                    })
                })
            }
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleValidation = () => {
        const { name, contact_email } = this.state
        let check = false
        if (name === '' || contact_email === "") {
            check = true
        }
        return check
    }

    handleSubmit = () => {
        if (this.handleValidation()) {
            // console.log('yes')
            this.setState({
                error: "All fields are required"
            })
            window.scroll(0, 0)
        } else {
            // console.log('no')
            this.props.dispatch(apiCallAction.createDevelper(this.state))
        }


    }

    componentDidUpdate() {
        if (this.props.addDeveloper.status == serviceConstant.CREATE_DEVELOPER_SUCCESS) {
            // alert('Developer successfully added')
            this.props.dispatch({ type: serviceConstant.CREATE_PROJECT_CLEAR })
            history.push('/developer-list')
        }
    }

    render() {
        const { error } = this.state
        return (
            <AdminContainer developer={'active'}>
                <div id="container">
                    <div className="container-fluid">
                        <div className="w-100">

                            <h2 className="page-h">
                                ADD DEVELOPER
                            </h2>
                            {error ? <Alert addclass="alert-warning" msg={error} /> : ""}

                            <div className="row">
                                <div className="col-md-7 form-div admin-info">
                                    <div className="row">
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-name">Developer's company name</label>
                                                <input type="text" id="c-name" className="form-control" name="name" onChange={this.handleChange} placeholder="name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Website">Developer website</label>
                                                <input type="text" id="c-Website" className="form-control" name="website" placeholder="Website" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Address">Address</label>
                                                <input type="text" list="address" id="c-Address" className="form-control" name="address" onChange={this.handleChange} placeholder="Address" />
                                                <datalist id="address">
                                                    {this.state.address_suggestion.map((add, i) => <option key={i} value={add.description} />)}
                                                </datalist>
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
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Province">Country</label>
                                                <input type="text" id="c-Province" className="form-control" name="country" placeholder="Country" onChange={this.handleChange} />
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
                                                <label htmlFor="Code">Postal code</label>
                                                <input type="text" id="Code" className="form-control" name="postal_code" placeholder="Code" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div class="col-md-6 pr-md-5"></div>
                                        <div class="col-md-6 pr-md-5">
                                            <div class="mt-3  pr-md-2">
                                                <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.addDeveloper.status === serviceConstant.CREATE_DEVELOPER_PENDING ? "Loading..." : "Add Developer"} onClick={this.handleSubmit} name />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="clearfix" />
                </div>
                <div className="f-spc"></div>
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
