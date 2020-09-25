import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'

export class DeveloperData extends Component {
    render() {
        const { developer } = this.props
        return (
            <AdminContainer developer={'active'}>
                <div>
                    <div className="container-fluid">
                        <div className="w-100 pt-1">
                            <h2 className="page-heading mt-4">
                                DEVELOPER DATA
                            </h2>
                            <div className="row">
                                <div className="col-md-7 form-div admin-info">
                                    <div className="row">
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="c-name">Developer name</label>
                                                <input type="text" id="c-name" className="form-control" name placeholder="name" value={developer.data.name} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Website">Developer Website</label>
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
                                                <input type="text" id="c-City" className="form-control" name placeholder="City" value={developer.data.city}/>
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
                                        </div>
                                        <div className="col-md-6 pl-md-5">
                                            <div className="input-area pl-md-4">
                                                <label htmlFor="c-Email">Email</label>
                                                <input type="email" id="c-Email" className="form-control" name placeholder="Email" value={developer.data.contact_email} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-md-5">
                                            <div className="input-area pr-md-2">
                                                <label htmlFor="Code">Postal Code</label>
                                                <input type="text" id="Code" className="form-control" name placeholder="Code" value={developer.data.postal_code} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6" />
                                </div>
                            </div>
                        </div>
                        <table className="dv-data mt-5">
                            <thead>
                                <tr>
                                    <th scope="col" className="pl-40 w-25">PROJECT NAME</th>
                                    <th scope="col">CONDOS</th>
                                    <th scope="col">TOWNHOUSE</th>
                                    <th scope="col">COMMERCIAL</th>
                                    <th scope="col" className="w-25">ADDRESS</th>
                                    <th scope="col">CITY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {developer.data.project.map((child, i) => 
                                <tr>
                                    {child.featured ? 
                                    
                                    <td data-label="PROJECT NAME">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheckBox2" defaultChecked="checked" />
                                        <label className="custom-control-label pt-1" htmlFor="customCheckBox2">
                                            {child.name}
                                        </label>
                                    </div>
                                </td>
                                : 
                                <td data-label="PROJECT NAME" className="pl-40">
                                    {child.name}
                                </td>
                                }
                                
                                <td data-label="CONDOS">{child.condos ? child.condos : '-'}</td>
                                <td data-label="TOWNHOUSE">{child.townhouse ? child.townhouse : '-'}</td>
                                <td data-label="COMMERCIAL">{child.commercial ? child.commercial : '-'}</td>
                                <td data-label="ADDRESS">{child.address}</td>
                                <td data-label="CITY">{child.city}</td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="clearfix" />
                </div>
            </AdminContainer>
        )
    }
}

export default connect((state) => {
    return {
        developer: state.developer
    }
})(DeveloperData)
