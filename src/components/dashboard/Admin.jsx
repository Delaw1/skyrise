import React, { Component } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'

export class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            amenity: {
                name: ''
            }
        }
    }

    handleChange = (e) => {
        const { updateGS } = this.props
        updateGS(e.target.name, e.target.value)
    }

    handleAmenity = (e) => {
        this.setState({
            [e.target.name]: {
                name: e.target.value,
                checked: false
            }
        })
    }

    saveAmenity = () => {
        const { updateGS } = this.props
        if (this.state.amenity.name == '') {
            alert("Field cant be empty")
        } else {
            if(this.props.gs.data.amenities.length !== 0) {
                updateGS('amenities', [this.state.amenity, ...this.props.gs.data.amenities])
            } else {
                updateGS('amenities', [this.state.amenity])
            }
            this.setState({
                amenity: {
                    name: ''
                }
            })
        }
    }

    deleteAmenity = (amenity) => {
        const { updateGS } = this.props
        let amenities = this.props.gs.data.amenities
        amenities = amenities.filter((data, i) => i !== amenity)
        updateGS('amenities', amenities)
    }

    handleSubmit = () => {
        const {saveGS} = this.props
        saveGS(this.props.gs.data)
    }
    componentDidMount() {
        this.props.getGS()
        
    }

    componentDidUpdate() {
        if(this.props.gs.status === serviceConstant.SAVE_GS_SUCCESS) {
            alert('Admin details updated successfully')
            this.props.clearSave()
        }
        
    }
    componentWillReceiveProps() {
        if (this.props.gs.status === serviceConstant.GET_GS_SUCCESS) {
            this.setState({
                data: this.props.gs.data
            })
        }
    }
    render() {
        // {this.props.gs.status === serviceConstant.GET_GS_SUCCESS ? }
        return (
            <AdminContainer admin={'active'}>
                <div>
                    {/* Modal */}
                    <div className="modal fade p-0" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <iframe width="100%" height={500} src="https://www.youtube.com/embed/eIVh30Swokc" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade p-0" id="exampleModa2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabe2" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <iframe width="100%" height={500} src="https://www.youtube.com/embed/eIVh30Swokc" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade p-0" id="exampleModa3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabe3" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <iframe width="100%" height={500} src="https://www.youtube.com/embed/eIVh30Swokc" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade p-0" id="exampleModa4" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabe4" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <iframe width="100%" height={500} src="https://www.youtube.com/embed/eIVh30Swokc" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* from here model */}
                    <div className="container-fluid">
                        <div className="w-100 pt-1">
                            <h2 className="page-heading mt-4">
                                ADMIN INFO
            </h2>


                            <div>
                                <div className="row">
                                    <div className="col-md-5 col-lg-3 form-div admin-info">

                                        <div className="w-100">
                                            <label htmlFor="c-name">Company name</label>
                                            <input type="text" id="c-name" className="form-control" name="company_name" onChange={this.handleChange} placeholder="name" value={this.props.gs.data.company_name} />
                                        </div>
                                        <div className="w-100  mt-3">
                                            <label htmlFor="Address">Address</label>
                                            <input type="text" id="Address" className="form-control" name="address" placeholder="Address" onChange={this.handleChange} value={this.props.gs.data.address} />
                                        </div>
                                        <div className="w-100  mt-3">
                                            <label htmlFor="City">City</label>
                                            <input type="text" id="City" className="form-control" name="city" placeholder="City" onChange={this.handleChange} value={this.props.gs.data.city} />
                                        </div>
                                        <div className="w-100  mt-3">
                                            <label htmlFor="Province">Province</label>
                                            <input type="text" id="Province" className="form-control" name="province" placeholder="Province" onChange={this.handleChange} value={this.props.gs.data.province} />
                                        </div>
                                        <div className="w-100  mt-3">
                                            <label htmlFor="Postal">Postal code</label>
                                            <input type="text" id="Postal" className="form-control" name="postal_code" placeholder="Postal code" onChange={this.handleChange} value={this.props.gs.data.postal_code} />
                                        </div>
                                    </div>
                                    {/* form here */}
                                    <div className="col-md-6 col-lg-3 ">
                                        <div className="row form-div admin-info">
                                            <div className="col-md-12 mt-3 mt-md-0">
                                                <label htmlFor="Contact">Contact</label>
                                            </div>
                                            <div className="col-md-6 pr-md-1 ">
                                                <input type="text" className="form-control" name="contact_firstname" placeholder="FIrst name" onChange={this.handleChange} value={this.props.gs.data.contact_firstname} />
                                            </div>
                                            <div className="col-md-6 pr-md-1 mt-3 mt-md-0">
                                                <input type="text" className="form-control" name="contact_lastname" placeholder="Contact" onChange={this.handleChange} value={this.props.gs.data.contact_lastname} />
                                            </div>
                                            <div className="col-md-12 pr-md-1 mt-3">
                                                <label htmlFor="Phone">Phone</label>
                                                <input type="text" id="Phone" className="form-control" name="contact_phone" placeholder="Phone" onChange={this.handleChange} value={this.props.gs.data.contact_phone} />
                                            </div>
                                            <div className="col-md-12 pr-md-1 mt-3">
                                                <label htmlFor="Email">Email</label>
                                                <input type="text" id="Email" className="form-control" name="contact_email" placeholder="Email" onChange={this.handleChange} value={this.props.gs.data.contact_email} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* form here */}
                                </div>
                                <div className="w-100 mt-md-4">
                                    <h2 className="page-heading ">
                                        AMENITIES
              </h2>
                                </div>
                                <div className="row">
                                    <div className="col-8 col-lg-2 col-md-6 pr-md-1 form-div admin-info">
                                        <input type="text" className="form-control" name="amenity" placeholder="AMENITY" value={this.state.amenity.name} onChange={this.handleAmenity} />
                                    </div>
                                    <div className="col-4 col-lg-1 col-md-3 pl-md-1">
                                        <input type="submit" className="btn btn-block orng-btn mt-0" value="ADD" name="amenities" onClick={this.saveAmenity} />
                                    </div>
                                </div>
                                <span className="down-text d-inline-block mt-4 ">
                                    AMENITIES
            </span>
                                {
                                    this.props.gs.data.amenities.map((amenity, i) =>
                                        <div key={i} className="col-lg-2 pl-0 pr-0">
                                            <p className="page-para mt-3">
                                                {amenity.name}
                                                <a onClick={() => this.deleteAmenity(i)}  className="float-right ">
                                                    <img src={BACKEND_URL + '/images/cross.png'} width={10} height={8} alt="" />
                                                </a>
                                            </p>
                                        </div>
                                    )}



                                <div className="row mt-4">
                                    <div className="col-md-12 mt-1">
                                        <h2 className="page-heading">
                                            VIDEOS
                                       <a href="#" title className="read-more float-right">View all</a>
                                        </h2>
                                    </div>
                                    <div className="col-md-3">
                                        <a href="#" data-toggle="modal" data-target="#exampleModal">
                                            <img src={BACKEND_URL + '/images/v1.jpg'} className="img-fluid " />
                                        </a>
                                        <p className="page-para mt-2">
                                            Semi-Waterfront Luxury Living
                </p>
                                    </div>
                                    <div className="col-md-3">
                                        <a href="#" data-toggle="modal" data-target="#exampleModa2">
                                            <img src={BACKEND_URL + '/images/v2.jpg'} className="img-fluid " />
                                        </a>
                                        <p className="page-para mt-2">
                                            Semi-Waterfront Luxury Living
                </p>
                                    </div>
                                    <div className="col-md-3">
                                        <a href="#" data-toggle="modal" data-target="#exampleModa3">
                                            <img src={BACKEND_URL + '/images/v3.jpg'} className="img-fluid " />
                                        </a>
                                        <p className="page-para mt-2">
                                            Semi-Waterfront Luxury Living
                </p>
                                    </div>
                                    <div className="col-md-3">
                                        <a href="#" data-toggle="modal" data-target="#exampleModa4">
                                            <img src={BACKEND_URL + '/images/v4.jpg'} className="img-fluid " />
                                        </a>
                                        <p className="page-para mt-2">
                                            Semi-Waterfront Luxury Livin
                </p>
                                    </div>
                                </div>

                            </div>
                            <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.gs.status === serviceConstant.SAVE_GS_PENDING ? "Loading..." : "Save"} onClick={this.handleSubmit} />

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
        gs: state.gs
    }
}

export default connect(mapStateToProps, {
    saveGS: apiCallAction.saveGS,
    getGS: apiCallAction.getGS,
    updateGS: apiCallAction.updateGS,
    clearSave: () => {return {type: serviceConstant.SAVE_GS_CLEAR}}
})(Admin)
