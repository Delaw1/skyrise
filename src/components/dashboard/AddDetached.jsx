import React, { Component, Fragment } from 'react'
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import CheckBox from './Checkbox'
import Tab from './Tab'
import Floorplan from './Floorplan'
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'
import axios from 'axios'
import { routes } from '../../services/url'

export class AddDetached extends Component {
  constructor(props) {
    super(props)


    this.state = {
      name: '',
      type_id: 2,
      condo_check: false,
      townhouse_check: false,
      commercial_check: false,
      featured: false,
      developer_id: 0,
      zone: "RS4",
      levels: 1,
      description: '',

      amenities: [
      ],
      floors: [
        {
          name: 'TOWNHOUSE', section: [
            {
              Level: '',
              Plan: '',
              Bed: '',
              Den: '',
              Floor_size: '',
              Balconey_size: '',
              Price: ''
            }
          ]
        },

      ],
      active: 0,
      images: [
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
        { preview: "", raw: "" },
      ],
      videos: [
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
      ],
      sheet: {
        name: 'Upload Feature Sheet (pdf)',
        raw: ''
      }
    }
    this.baseState = this.state
  }

  handleTabHeader = (e) => {
    // console.log(this.state.floors)
    let check = false
    this.state.floors.map(floor => {
      if (floor.name === e.target.innerText) {
        check = true
        return
      }
    })

    if (check === true) {
      alert("Tab name already exist")
    } else {
      const i = e.target.attributes.getNamedItem('tab').value
      let newArray = [...this.state.floors]
      newArray[i]['name'] = e.target.innerText

      this.setState({
        floors: [...newArray],
        active: i
      })
      console.log(newArray)
    }


    // console.log(this.state.floors)
  }

  handleAmenities = id => {
    this.setState({
      amenities: this.state.amenities.map(el => (el.id == id ? { ...el, checked: !el.checked } : el))
    })
  }

  handleInput = (e, name, i) => {
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    newArray[elementsIndex].section[i][e.target.name] = e.target.value
    this.setState({
      floors: newArray
    })
    // console.log(newArray)
  }
  handleFloors = () => {
    let check = false
    this.state.floors.map(floor => {
      if (floor.name === "NEW TAB") {
        check = true
        return
      }
    })
    if (check === true) {
      alert("Rename NEW TAB")
    } else {
      this.setState({
        floors: [...this.state.floors, {
          name: 'NEW TAB', section: [
            {
              Level: '',
              Plan: '',
              Bed: '',
              Den: '',
              Floor_size: '',
              Balconey_size: '',
              Price: ''
            },
          ]
        }]
      })
    }

  }
  handleAdd = (name) => {
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    newArray[elementsIndex].section.unshift({
      Level: '',
      Plan: '',
      Bed: '',
      Den: '',
      Floor_size: '',
      Balconey_size: '',
      Price: ''
    })

    this.setState({
      floors: newArray
    })
    // console.log(newArray)
  }
  handleDelete = (e, name, index) => {
    e.preventDefault()
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    delete newArray[elementsIndex].section[index]
    this.setState({
      floors: newArray
    })
    // console.log(newArray)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = (e) => {
    // console.log(e)
    this.setState({
      [e]: !this.state[e]
    })
  }

  handleSubmit = () => {
    let newArray = [...this.state.floors]
    newArray.map((el, i) => el.section.shift())
    const media = new FormData()
    for (var x = 0; x < this.state.images.length; x++) {
      if (this.state.images[x].raw !== '') {
        media.append('media[]', this.state.images[x].raw)
      }

    }

    for (var x = 0; x < this.state.videos.length; x++) {
      if (this.state.videos[x].raw !== '') {
        media.append('video[]', this.state.videos[x].raw)
      }

    }

    if (this.state.sheet.raw !== "") {
      media.append('sheet', this.state.sheet.raw)
    }
    
    console.log(...media)
    this.props.uploading()
    axios.post(routes.UPLOAD, media).then(resp => {
      console.log(resp)
      const data = {
        ...this.state,
        condos: this.state.condo_check ? this.state.condos : null,
        townhouse: this.state.townhouse_check ? this.state.townhouse : null,
        commercial: this.state.commercial_check ? this.state.commercial : null,
        amenities: this.state.amenities.filter(item => item.checked === true),
        floors: newArray,
        developer_id: this.props.getDevelopers.data[this.state.developer_id].id,
        images: resp.data.success.media_path,
        videos: resp.data.success.name_videos,
        feature_sheet: resp.data.success.sheet
      }
      this.props.createProject(data)
    }).catch(err => {
      console.log(err)
    })
  }
  handleDropdown = (e, name) => {
    this.setState({
      [name]: e.target.innerText
    })
  }

  handleDropdown2 = (e, i) => {
    this.setState({
      [e]: i
    })
  }

  handleImage = (e) => {
    // console.log(this.state.images.findIndex(preview: ""))
    if (e.target.files.length) {
      let newArray = this.state.images
      for(let i=0; i < newArray.length; i++) {
        if(newArray[i].preview == "") {
          newArray[i].preview = URL.createObjectURL(e.target.files[0])
          newArray[i].raw = e.target.files[0]
          break;
        }
      }

      this.setState({
        images: newArray
      });
    }
  }

  componentDidUpdate() {
    if (this.props.addProject.status == serviceConstant.CREATE_PROJECT_SUCCESS) {
      alert('Project successfully added')
      this.props.clear()
      // this.setState(this.baseState)
      history.push('/')
    }
  }

  handleAmenities = id => {
    let uA = this.state.amenities
    uA[id].checked = !uA[id].checked
    this.setState({
      // amenities: this.state.amenities.map(el => (el.id == id ? { ...el, checked: !el.checked } : el))
      amenities: uA
    })
  }

  componentDidMount() {
    const { getGS, developers } = this.props
    getGS()
    developers()
  }

  componentWillReceiveProps() {
    if (this.props.gs.status === serviceConstant.GET_GS_SUCCESS) {
      this.setState({
        amenities: this.props.gs.data.amenities
      })
    }
  }

  render() {
    const {images} = this.state
    return (
      <AdminContainer home={'active'} >
        <div className="container-fluid">
          {/* body section */}
          <div className="w-100">
            {/* slider emd */}
            <h2 className="page-heading" >
              DETACHED PROJECT DATA
          </h2>
            <h4 className="thumb-heading">
              PHOTOS
              <label style={{ marginBottom: 0 }} htmlFor="upload-button" className="read-more float-right">
                Upload Photo
            </label>
              {/* <a href="#" htmlFor="upload-button" className="read-more float-right">
            Upload Photo
            </a> */}
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={this.handleImage}
              />
            </h4>
            <div className="row">
              <div className="col-md-12">
                <ul className="tab-list">
                {images.map((image, i) => {
                    return <li className={i == 5 ? "ml-md-0 mt-3" : "mt-3"}>
                      <img src={image.preview ? image.preview : BACKEND_URL + '/images/up2.jpg'} className="w-100" height="140" alt="" />
                      {image.preview ?
                        <a href title className="corner-cross">
                          <img src={BACKEND_URL + '/images/black-cross.png'} className alt="loading" />
                        </a>
                        : ''}

                    </li>

                  })}
                </ul>
              </div>
              <div className="col-md-12 mt-5 mb-4">
                <h4 className="thumb-heading">
                  Details
                {/* 
            <a href="#" title="" class="read-more float-right">
            Upload Photo
          </a> */}
                </h4>
              </div>
              {/* abcd */}
              <div className="col-md-4 col-lg-3 form-div admin-info">
                <div className="w-100 mb-md-4 pb-md-5">
                  <label htmlFor="c-name">Project name</label>
                  <input type="text" id="p-name" className="form-control" name="name" onChange={this.handleChange} placeholder="name" value={this.state.name} />
                  <div className="custom-control custom-checkbox mt-2">
                    <CheckBox name="Featured project" click={() => this.handleCheck("featured")} check={this.state.featured} labelClass="custom-control-label pt-1 text-dark" />
                  </div>
                </div>
                <div className="w-100  mt-3">
                  <label htmlFor="Address">Address</label>
                  <input type="text" id="Address" className="form-control" name='address' onChange={this.handleChange} placeholder="Address" />
                </div>
                <div className="w-100  mt-3">
                  <label htmlFor="City">City</label>
                  <input type="text" id="City" className="form-control" name='city' onChange={this.handleChange} placeholder="City" />
                </div>
                <div className="w-100  mt-3">
                  <label htmlFor="Province">Province</label>
                  <input type="text" id="Province" className="form-control" name="province" onChange={this.handleChange} placeholder="Province" />
                </div>
                <div className="w-100  mt-3">
                  <label htmlFor="Postal">Price</label>
                  <input type="text" id="Postal" className="form-control" name="price" onChange={this.handleChange} placeholder="Postal code" />
                </div>
                <div className="w-100  mt-3">
                  <label htmlFor="Type">Property Type</label>
                  <input type="text" id="Type" className="form-control disabled" name placeholder="Postal code" defaultValue="Detached House" disabled />
                </div>
              </div>
              {/* first volmn inputs end*/}
              <div className="col-md-4 col-lg-3 ">
                <div className="row form-div mr-md-0 admin-info">
                  <div className="col-md-12 mt-3 mt-md-0">
                    <label htmlFor="Size">Floor Size (SF)</label>
                    <input type="text" className="form-control" id="Size" name="floor_size" onChange={this.handleChange} placeholder="Floor size" />
                  </div>

                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="Level">Levels</label>
                    {/* <input type="text" id="Level" className="form-control" name="levels" onChange={this.handleChange} placeholder="Level" defaultValue="40 Level" /> */}
                    <div className="dropdown w-100">
                      <button type="button" className="btn btn-mls dropdown-toggle" id="loc-btn" data-toggle="dropdown">
                        {this.state.levels}
                      </button>
                      <div className="dropdown-menu" id="loc-menu">
                        <div className="scrollbar" id="style-3">
                          <div className="force-over">
                            {[...Array(80)].map((x, i) =>
                              <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'levels')}>{i + 1}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <img src={BACKEND_URL + '/images/down-arow.png'} alt="" id="myImage1" />
                    </div>
                  </div>
                  {/* drop down */}
                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="ZONING">ZONING</label>
                    {/* <input type="text" id="c-name" className="form-control" name="zone" onChange={this.handleChange} placeholder="name" defaultValue="RS4" /> */}

                    <div className="dropdown w-100">
                      <button type="button" className="btn btn-mls dropdown-toggle" id="loc-btn" data-toggle="dropdown">
                        {this.state.zone}
                      </button>
                      <div className="dropdown-menu" id="loc-menu">
                        <div className="scrollbar" id="style-3">
                          <div className="force-over">
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS4</span>
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS5</span>
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS6</span>
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS7</span>
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS8</span>
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS9</span>
                            <span className="dropdown-item" onClick={(e) => this.handleDropdown(e, 'zone')}> RS10</span>
                          </div>
                        </div>
                      </div>
                      <img src={BACKEND_URL + '/images/down-arow.png'} alt="" id="myImage1" />
                    </div>

                  </div>
                  <div className="col-md-6 pr-md-1 mt-3 mt-md-1">
                    <label htmlFor="Lot">Lot size (SF)</label>
                    <input type="text" className="form-control" name="lot" id="Lot" name placeholder="Lot" />
                  </div>
                  <div className="col-md-6 pr-md-1 mt-3 mt-md-1 ">
                    <label htmlFor="frontage">Lot frontage x depth</label>
                    <input type="text" className="form-control" id="frontage" name="f_d" placeholder="frontage" />
                  </div>
                  <div className="col-md-12 pr-md-1 mt-2 mt-md-1">
                    <label htmlFor="c-name">Developer</label>
                    {/* <input type="text" id="c-name" className="form-control" name="developer" onChange={this.handleChange} placeholder="name" defaultValue="Belford Property" /> */}
                    <div className="dropdown w-100">
                      <button type="button" className="btn btn-mls dropdown-toggle" id="loc-btn" data-toggle="dropdown">
                      {this.props.getDevelopers.status === serviceConstant.GET_DEVELOPERS_SUCCESS ? this.props.getDevelopers.data[this.state.developer_id].name : 'Loading...'}
                      </button>
                      <div className="dropdown-menu" id="loc-menu">
                        <div className="scrollbar" id="style-3">
                          <div className="force-over">
                          {this.props.getDevelopers.status === serviceConstant.GET_DEVELOPERS_SUCCESS ? this.props.getDevelopers.data.map((dev, i) => <span key={i} className="dropdown-item" name="developer_id" onClick={() => this.handleDropdown2("developer_id", i)}>{dev.name}</span>) : ''}
                          </div>
                        </div>
                      </div>
                      <img src={BACKEND_URL + '/images/down-arow.png'} alt="" id="myImage1" />
                    </div>
                  </div>
                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="Architect">Architect</label>
                    <input type="text" id="Architect" className="form-control" name="architect" onChange={this.handleChange} placeholder="Architect" />
                  </div>
                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="date">Completion date (YR)</label>
                    <input type="text" id="date" className="form-control" name="completion" onChange={this.handleChange} placeholder="date" />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3 ">
                <div className="row form-div mr-md-0 admin-info">
                  <div className="col-md-12 pr-md-1 mt-3 mt-md-0">
                    <label htmlFor="website">Project website</label>
                    <input type="text" id=" website" className="form-control" name="project_website" onChange={this.handleChange} placeholder="Project website" />
                  </div>
                  <div className="col-md-12 mt-3">
                    <label htmlFor="Conatact">Contact</label>
                  </div>
                  <div className="col-md-6 pr-md-1 ">
                    <input type="text" className="form-control" name="contact_firstname" onChange={this.handleChange} placeholder="Contact" />
                  </div>
                  <div className="col-md-6 pr-md-1 mt-3 mt-md-0">
                    <input type="text" className="form-control" name="contact_lastname" onChange={this.handleChange} placeholder="Contact" />
                  </div>
                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="Phone">Phone</label>
                    <input type="text" id="Phone" className="form-control" name="contact_phone" onChange={this.handleChange} placeholder="Phone" />
                  </div>
                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="Email">Email</label>
                    <input type="text" id="Email" className="form-control" name="contact_email" onChange={this.handleChange} placeholder="Email" />
                  </div>
                  <div className="col-md-12 pr-md-1 mt-3">
                    <label htmlFor="MLS">MLS</label>
                    <input type="text" id="MLS" className="form-control" name placeholder="MLS" />
                  </div>
                </div>
              </div>
            </div>
            {/* LIST END */}
            <div className="row">
              <div className="col-md-12 mb-4 mt-5">
                <h2 className="thumb-heading">
                VIDEOS
                  <label style={{ marginBottom: 0 }} htmlFor="upload-video" className="read-more float-right">
                    Upload Videos
            </label>

                  <input
                    type="file"
                    id="upload-video"
                    style={{ display: "none" }}
                    onChange={this.handleVideo}
                  />
                </h2>
              </div>
              {/* video row */}
              {this.state.videos.map((video, i) =>
                <div key={i} className="col-md-3 pr-md-1">
                  <div className="box1">
                    {video.blobData ?
                      <Fragment>
                        <a href="#" className="corner-cross">
                          <img src={BACKEND_URL + '/images/black-cross.png'} alt="loading" />
                        </a>
                        <video className="img-fluid w-100" controls>
                          <source
                            src={video.blobData}
                            type={video.raw.type}
                          />
                      Your browser does not support HTML5 video.
                    </video>
                      </Fragment>
                      : <a href="#">

                        <img src={BACKEND_URL + '/images/v1.jpg'} className="img-fluid w-100" />
                      </a>}



                  </div>
                  <p className="page-para mt-2">
                    {video.name ? video.name : "Semi-Waterfront Luxury Living"}
                  </p>
                </div>)}
              {/* Video roe emd */}
              <div className="col-md-12 mb-4 mt-5">
                <h2 className="thumb-heading">
                  DESCRIPTION
              </h2>

              </div>
              <div className="col-md-12  form-div">
                <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleChange} />
              </div>
              <div className="col-md-12 mb-4 mt-5">
                <h2 className="thumb-heading">
                  AMENITIES
                <a href="#" title className="read-more float-right">
                    Upload Feature Sheet
                    (pdf)
                </a>
                </h2>
              </div>

              {this.state.amenities.map((child, i) =>
                <div className="col-6 col-md-3">
                  <div className="custom-control custom-checkbox">
                    <CheckBox name={child.name} click={() => this.handleAmenities(i)} check={child.checked} labelClass="custom-control-label  text-dark para-sky mb-3" />
                  </div>
                </div>
              )}

              <div className="col-md-12 mt-5 mb-4">
                <h2 className="thumb-heading">
                  FLOOR PLANS
              </h2>
              </div>
              <div className="col-md-12">
                <div className="col-md-3 pl-0">
                  <a href="#" title className="read-more float-right mb-1">
                    Upload
            </a>
                  <a href="#" title className="read-more float-left mb-1">
                    Delete
            </a>
                  <img src={BACKEND_URL + '/images/up3.jpg'} className="img-fluid w-100" alt="" />
                </div>

                <div className="w-100 pt-md-4">
                  <h2 className="page-heading ">
                    SCHOOLS
                </h2>

                  <div className="horizontalTab2">
                    <Tab active="0">
                      <div label="DAYCARE">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh urna, euismod ut ornare
                        non, volutpat vel tortor. Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam
                        porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur
                        nibh quis urna gravida mollis.</p>
                      </div>
                      <div label="ELEMENTARY">
                        <table className="table schools">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Type</th>
                              <th scope="col">Grade</th>
                              <th scope="col">Enrollment</th>
                              <th scope="col">Distance</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row" data-label="NAME">Blessed Sacrament School</td>
                              <td data-label="Type">Private</td>
                              <td data-label="Grade">K-7</td>
                              <td data-label="Enrollment">207</td>
                              <td data-label="Distance">1.5 KM</td>
                            </tr>
                            <tr>
                              <td scope="row" data-label="Type">David Livingston Elementary</td>
                              <td data-label="Type">Public</td>
                              <td data-label="Grade">K-7</td>
                              <td data-label="Enrollment">340</td>
                              <td data-label="Distance">2.4 KM</td>
                            </tr>
                            <tr>
                              <td scope="row" data-label="Type">Edith Cavell Elementary</td>
                              <td data-label="Type">Public</td>
                              <td data-label="Grade">K-7</td>
                              <td data-label="Enrollment">327</td>
                              <td data-label="Distance">1.2 KM</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div label="MIDDLE SCHOOL">
                        <p>Suspendisse blandit velit Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam
                        porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur
                        nibh quis Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus
                        lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis
                        urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.</p>
                      </div>
                      <div label="HIGH SCHOOL">
                        <p>Sus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio
                        venenatis.</p>
                      </div>

                    </Tab>
                  </div>
                  {/* TABS SCHOOL END */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-4">
                <input type="submit" className="btn btn-block orng-btn mt-0" value={this.props.addProject.status === serviceConstant.CREATE_PROJECT_PENDING || this.props.addProject.status === serviceConstant.CREATE_PROJECT_UPLOADING ? "Uploading..." : "Add Project"} onClick={this.handleSubmit} name />
              </div>
            </div>

          </div>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <div className="clearfix"></div>
      </AdminContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addProject: state.addProject,
    gs: state.gs,
    getDevelopers: state.developers
  }
}

export default connect(mapStateToProps, {
  getGS: apiCallAction.getGS,
  developers: apiCallAction.getDevelopers,
  createProject: apiCallAction.createProject,
  clear: () => { return { type: serviceConstant.CREATE_PROJECT_CLEAR } },
  uploading: () => { return { type: serviceConstant.CREATE_PROJECT_UPLOADING } }
})(AddDetached)
