import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'

export class DeveloperData extends Component {
    render() {
        const { developer } = this.props
        return (
            <AdminContainer developer={'active'}>
                <div id="container">
                    <div className="container-fluid">
                        <div className="w-100">
                            <h2 className="page-h">
                                DEVELOPER DATA
                            </h2>
                            <div className="row">
                                <div className="col-md-7 form-div admin-info">
                                    <div className="row">
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-name">Developer's company name</label>
                                                <input type="text" id="c-name" className="form-control" name placeholder="name" value={developer.data.name} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Website">Developer website</label>
                                                <input type="text" id="c-Website" className="form-control" name placeholder="Website" value={developer.data.website} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Address">Address</label>
                                                <input type="text" id="c-Address" className="form-control" name placeholder="Address" value={developer.data.address} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <label htmlFor className="pl-md-4">Contact</label>
                                            <div className="row">
                                                <div className="col-md-6  pad-r-5">
                                                    <div className="input-area pl-md-4">
                                                        <input type="text" id="c-name" className="form-control" name placeholder="name" value={developer.data.contact_firstname} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 pad-l-5">
                                                    <div className="input-area">
                                                        <input type="text" id="c-name" className="form-control" name placeholder="name" value={developer.data.contact_lastname} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-City">City</label>
                                                <input type="text" id="c-City" className="form-control" name placeholder="City" value={developer.data.city} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Phone">Phone</label>
                                                <input type="tel" id="c-Phone" className="form-control" name placeholder="Phone" value={developer.data.contact_phone} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Province">Province</label>
                                                <input type="text" id="c-Province" className="form-control" name placeholder="Province" value={developer.data.province} />
                                            </div>
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-Province">Country</label>
                                                <input type="text" id="c-Province" className="form-control" name placeholder="Country" value={developer.data.country} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Email">Email</label>
                                                <input type="email" id="c-Email" className="form-control" name placeholder="Email" value={developer.data.contact_email} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="Code">Postal code</label>
                                                <input type="text" id="Code" className="form-control" name placeholder="Code" value={developer.data.postal_code} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6" />
                                </div>
                            </div>
                        </div>
                        <table className="prj-list mt-5">
                            <thead>
                                <tr>
                                    <th width="15%" scope="col" className="pl-40">Project name</th>
                                    <th width="10%" scope="col">Commercial</th>
                                    <th width="10%" scope="col">Condos</th>
                                    <th width="10%" scope="col">Townhouse</th>
                                    <th width="10%" scope="col">House</th>
                                    <th width="20%" scope="col">Address</th>
                                    <th width="10%" scope="col">City</th>
                                    <th width="15%" scope="col" className="text-right">Developer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {developer.data.project.map((child, i) =>
                                    <tr>
                                        <td data-label="Project name">
                                            <div className="custom-control custom-checkbox">
                                                {child.featured ?
                                                    <input type="checkbox" className="custom-control-input" id="customCheckBox29" checked />
                                                    :
                                                    <input type="checkbox" className="custom-control-input" id="customCheckBox29" />
                                                }

                                                <label className="custom-control-label pt-1 text-dark sm" htmlFor="customCheckBox29">
                                                    {child.name}
                                                </label>
                                            </div>
                                        </td>
                                        <td data-label="Commercial">{child.commercial ? child.commercial : '-'}</td>
                                        <td data-label="Condos">{child.condos ? child.condos : '-'}</td>
                                        <td data-label="Townhouse">{child.townhouse ? child.townhouse : '-'}</td>
                                        <td data-label="House">H1</td>
                                        <td data-label="Address">{child.address}</td>
                                        <td data-label="City">{child.city}</td>
                                        <td data-label="Developer" className="text-right">Belford Property</td>
                                    </tr>
                                )}


                            </tbody>
                        </table> 
                    </div>
                    <div className="clearfix" />
                </div>
                <div class="f-spc"></div>
            </AdminContainer>
        )
    }
}

export default connect((state) => {
    return {
        developer: state.developer
    }
})(DeveloperData)
