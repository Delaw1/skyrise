import React, { Component, Fragment } from 'react'
import AdminContainer from '../layout/AdminContainers'
import { BASEURL } from '../../services/url'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import CheckBox from './Checkbox'
import Tab from './Tab'
import Floorplan from './Floorplan'
import { serviceConstant } from '../../redux/constants/apicall.constant'
import history from '../../shared/_helpers/history'
import axios from 'axios'
import { routes } from '../../services/url'
import $ from 'jquery'
import VideoThumbnail from 'react-video-thumbnail';
import { appendScript } from '../../shared/utils/appendScript'
import { removeScript } from '../../shared/utils/removeScript'
import Tabnew from './Tabnew'
import SchoolTab from "./SchoolTab";
import { APIKEY } from '../../shared/_helpers/utils';
import Alert from './Alert'

const curentF = {
  name: '',
  level: '',
  plan: '',
  bedrooms: '',
  bathrooms: '',
  den: '',
  floor_size: '',
  balcony_size: '',
  price: '',
  images: {
    preview: "", raw: ""
  },
  sheet: {
    name: '',
    raw: ''
  }
}

const initState = {
  error: '',
  video_error: '',
  floor_error: '',

  video_link: '',
  name: '',
  type_id: 1,
  condo_check: false,
  townhouse_check: false,
  commercial_check: false,
  featured: false,
  developer_id: 0,
  zone: "RS4",
  levels: 1,
  description: '',
  developer: 'Imani Developments, Inc.',
  amenities: [,
  ],
  floors: [
    {
      name: '1 Bedroom', section: [

      ],
    },
    {
      name: '2 Bedroom', section: [

      ]
    },

  ],
  active: true,
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
  ],
  video: [],
  sheet: {
    name: 'Upload Feature Sheet (pdf)',
    raw: ''
  },
  floor_plan: '',
  current_floor: {
    name: '',
    level: '',
    plan: '',
    bedrooms: '',
    bathrooms: '',
    den: '',
    floor_size: '',
    balcony_size: '',
    price: '',
    images: {
      preview: "", raw: ""
    },
    sheet: {
      name: '',
      raw: ''
    }
  },
  school: [
    { name: 'Daycare' }, { name: 'Elementary' }, { name: 'Middle school' }, { name: 'High school' }
  ],
  address_suggestion: []
}

export class AddDetached extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      video_error: '',
      floor_error: '',

      video_link: '',
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
      developer: 'Imani Developments, Inc.',
      amenities: [,
      ],
      floors: [
        {
          name: '1 Bedroom', section: [

          ],
        },
        {
          name: '2 Bedroom', section: [

          ]
        },

      ],
      newFloorName: '',
      active: true,
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
        { name: "name", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
      ],
      video: [],
      sheet: {
        name: 'Upload Feature Sheet (pdf)',
        raw: ''
      },
      floor_plan: '',
      current_floor: {
        name: '',
        level: '',
        plan: '',
        bedrooms: '',
        bathrooms: '',
        den: '',
        floor_size: '',
        balcony_size: '',
        price: '',
        images: {
          preview: "", raw: ""
        },
        sheet: {
          name: '',
          raw: ''
        }
      },
      school: [
        { name: 'Daycare' }, { name: 'Elementary' }, { name: 'Middle school' }, { name: 'High school' }
      ],
      address_suggestion: []

    }
  }
  handleNewFloorName = (e) => {
    this.setState({
      newFloorName: e.target.value
    })
  }

  clearFloorName = () => {
    this.setState({
      newFloorName: ''
    })
  }

  handleFloorPlan = (e, i) => {
    e.preventDefault();
    if (this.state.newFloorName === '') {
      this.setState({
        floor_error: "Field cannot be empty"
      })
    } else {
      let newFloor = this.state.floors.map((floor, index) => {
        if (i === index) {
          floor.name = this.state.newFloorName
        }
        return floor
      })
      this.setState({
        floors: newFloor,
        newFloorName: ''
      })
    }
  }

  handleFloorPlanDelete = (e, i) => {
    e.preventDefault();
    let newFloor = this.state.floors.filter((floor, index) => i !== index)
    this.setState({
      floors: newFloor
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
      console.log('yes')
      this.setState({
        error: "All fields are required"
      })
      window.scroll(0, 0)
    } else {
      let newArray = [...this.state.floors]
      // newArray.map((el, i) => el.section.shift())
      const media = new FormData()
      for (var x = 0; x < this.state.images.length; x++) {
        if (this.state.images[x].raw !== '') {
          media.append('media[]', this.state.images[x].raw)
        }
      }

      newArray.map((floor) => {
        floor.section.map((sect) => {
          if (sect.images.raw != '') {
            media.append('floor_media[]', sect.images.raw)
          }
          if (sect.sheet.raw != '') {
            media.append('floor_sheet[]', sect.sheet.raw)
          }
        })
      })

      if (this.state.sheet.raw !== "") {
        media.append('sheet', this.state.sheet.raw)
      }

      console.log(...media)
      this.props.uploading()
      axios.post(routes.UPLOAD, media).then(resp => {

        let i = 0
        let j = 0
        const newFloor = [...this.state.floors]
        newFloor.map((floor) => {
          floor.section.map((sect) => {
            if (sect.images.raw != '') {
              sect.images.url = resp.data.success.floor_media[i]
              i++
            }
            if (sect.sheet.raw != '') {
              sect.sheet.url = resp.data.success.floor_sheet[j]
              j++
              media.append('floor_sheet[]', sect.sheet.raw)
            }
          })
        })
        const data = {
          ...this.state,
          condos: this.state.condo_check ? this.state.condos : null,
          townhouse: this.state.townhouse_check ? this.state.townhouse : null,
          commercial: this.state.commercial_check ? this.state.commercial : null,
          amenities: this.state.amenities.filter(item => item.checked === true),
          floors: newFloor,
          images: resp.data.success.media_path,
          videos: resp.data.success.name_videos,
          feature_sheet: resp.data.success.sheet,
          developer_id: 1
        }
        this.props.createProject(data)
      }).catch(err => {
        console.log(err)
      })
    }

  }

  handleCurrFloor = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, [name]: value }
    }))
  }

  addFloorPlan = () => {
    const { current_floor } = this.state
    if (current_floor.name == '' || current_floor.den == '') {
      this.setState({
        floor_error: "All fields are required"
      })
    }
    else {
      const elementsIndex = this.state.floors.findIndex(element => element.name === this.state.current_floor.name)
      let newArray = [...this.state.floors]
      newArray[elementsIndex].section.unshift(this.state.current_floor)
      this.setState({
        floors: newArray,
        current_floor: curentF
      })
    }
  }

  deleteFloorPlan = (e, name, index) => {
    // console.log(name, index)
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    delete newArray[elementsIndex].section[index]
    this.setState({
      floors: newArray
    })
  }

  handleAmenities = id => {
    let uA = this.state.amenities
    uA[id].checked = !uA[id].checked
    this.setState({
      // amenities: this.state.amenities.map(el => (el.id == id ? { ...el, checked: !el.checked } : el))
      amenities: uA
    })
  }

  handleFloors = () => {
    let check = false
    this.state.floors.map(floor => {
      if (floor.name === this.state.floor_plan) {
        check = true
        return
      }
    })
    if (this.state.floor_plan == '') {
      this.setState({
        floor_error: "Floor Plan field is required"
      })
    } else if (check === true) {
      this.setState({
        floor_error: "Floor Name should be unique"
      })
    }
    else {
      let newFloor = [...this.state.floors, {
        name: this.state.floor_plan, section: [

        ]
      }]

      this.setState({
        floors: newFloor,
        floor_plan: ''
      })
    }

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

  handleCheck = (e) => {
    // console.log(e)
    this.setState({
      [e]: !this.state[e]
    })
  }

  handleVideoNew = (e) => {
    const media = new FormData()
    media.append('video', e.target.files[0])
    axios.post(routes.UPLOADVIDEO, media).then(resp => {
      console.log(resp)
      if (resp.data.status == "success") {
        this.setState(prevState => ({
          video: [...prevState.video, resp.data.path]
        }))
      }
    }).catch(err => {
      console.log(err)
    })
    document.getElementById("upload-video").value = "";
  }

  handleVideo = async () => {
    const video_id = this.state.video_link.split("v=")[1]
    if (video_id === undefined || video_id === null) {
      this.setState({
        video_error: "Video link should a youtube video",
        video_link: ''
      })
    } else {
      let title = ''
      const url = "https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + APIKEY + "&part=snippet,contentDetails,statistics,status"
      await axios.get(url).then(resp => title = resp.data.items[0].snippet.title)
      console.log(title)
      this.setState(prevState => ({
        video: [...prevState.video, { id: video_id, title }],
        video_link: ''
      }))
    }

  }

  handleImage = (e) => {
    // console.log(this.state.images.findIndex(preview: ""))
    if (e.target.files.length) {
      let newArray = this.state.images
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].preview == "") {
          newArray[i].preview = URL.createObjectURL(e.target.files[0])
          newArray[i].raw = e.target.files[0]
          break;
        }
      }

      this.setState({
        images: newArray
      });
      document.getElementById("upload-button").value = "";
    }
  }

  handleFloorImage = (e) => {
    if (e.target.files.length) {
      const preview = URL.createObjectURL(e.target.files[0])
      const raw = e.target.files[0]
      this.setState((prevState) => ({
        current_floor: { ...prevState.current_floor, images: { preview, raw } }
      }));
      document.getElementById("upload-floor-image").value = "";
    }
  }

  handleFloorSheet = (e) => {
    const name = e.target.files[0].name
    const raw = e.target.files[0]
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, sheet: { name, raw } }
    }))
    document.getElementById("floor-sheet").value = "";
  }

  handleFloorSheetDelete = () => {
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, sheet: { name: '', raw: '' } }
    }));
  }

  handleFloorImageDelete = () => {
    this.setState((prevState) => ({
      current_floor: { ...prevState.current_floor, images: { preview: '', raw: '' } }
    }));
    document.getElementById("upload-floor-image").value = "";
  }

  handleImageDelete = (index) => {
    let newImages = this.state.images.map((image, i) => {
      if (i === index) {
        return {
          preview: '',
          raw: ''
        }
      }
      return image
    })
    this.setState({
      images: newImages
    })
    document.getElementById("upload-button").value = "";
  }

  handleVideoDelete = (index) => {
    console.log(index)
    let newImages = this.state.video.filter((image, i) => i !== index)
    this.setState({
      video: newImages
    })
    // document.getElementById("upload-button").value = "";
  }

  handleSheet = (e) => {
    this.setState({
      sheet: {
        name: e.target.files[0].name,
        raw: e.target.files[0]
      }
    })
  }

  handle = () => {
    console.log(this.state)
  }

  componentDidUpdate() {
    if (this.props.addProject.status == serviceConstant.CREATE_PROJECT_SUCCESS) {
      // this.setState({
      //   error: 'Project successfully added'
      // })
      // window.scroll(0, 0)
      // this.setState(...initState)
      // // alert('Project successfully added')
      this.props.clear()
      // this.setState(this.baseState) 
      history.push('/project-list')
    }
  }

  componentDidMount() {
    const { getGS, developers } = this.props
    getGS()
    developers()
  }

  componentWillUnmount() {
    // removeScript("./js/easy-responsive-tabs.js")
    // removeScript("./js/tabs.js")
  }

  componentWillReceiveProps() {
    if (this.props.gs.status === serviceConstant.GET_GS_SUCCESS) {
      this.setState({
        amenities: this.props.gs.data.amenities
      })
    }
  }

  render() {
    const { images, current_floor } = this.state
    return (
      <AdminContainer>
        <div id="container">
          <div className="container-fluid">
            <div class="alert alert-warning" style={{ display: this.state.error !== '' ? 'block' : 'none' }}>
              <strong>Warning!</strong> You should <a href="javascript:void(0)" class="alert-link">read this message</a>.
            </div>
            {/* body section */}
            <div className="w-100">
              <div class="alert alert-warning" style={{ display: this.state.error !== '' ? 'block' : 'none' }}>
                {this.state.error}.
              </div>
              {/* slider emd */}
              <h2 className="page-h" onClick={this.handle}>

                PROJECT DATA (DETACHED)
              </h2>
              <h4 className="thumb-heading">
                PHOTOS
          {/* <a href="#" title className="read-more float-right rr">
            Upload photo
          </a> */}
                <label style={{ marginBottom: 0 }} htmlFor="upload-button" className="read-more float-right rr">
                  Upload Photo
            </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={this.handleImage}
                />
              </h4>
              <Alert addclass="alert-info" msg="Please upload the picture size of 1920 * 1080" />
              <div className="row">
                <div className="col-md-12 mb-4">
                  <ul className="tab-list">
                    {images.map((image, i) => {
                      return <li className={i == 5 ? "ml-md-0 mt-3" : "mt-3"}>
                        <img src={image.preview ? image.preview : BASEURL + '/images/up2.jpg'} className="w-100" alt="" />
                        {image.preview ?
                          <a href="#" className="corner-cross" onClick={() => this.handleImageDelete(i)}>
                            <img src={BASEURL + '/images/black-cross.png'} className alt="loading" />
                          </a>
                          : ''}

                      </li>

                    })}
                  </ul>
                </div>
                <div className="col-md-12 mt-5 mb-4">
                  <h4 className="thumb-heading">
                    DETAILS
              {/*
      <a href="#" title="" class="read-more float-right">
      Upload Photo
    </a> */}
                  </h4>
                </div>
                {/* abcd */}
                <div className="col-md-4 col-lg-4">
                  <div className="w-100 input-c">
                    <label htmlFor="c-name">Project name
                <div className="custom-control custom-checkbox mt-2 p-new">
                        <CheckBox inputClass="custom-control-input" id="customCheckBox2" name="Featured project" click={() => this.handleCheck("featured")} check={this.state.featured} labelClass="custom-control-label pt-1 text-dark" />
                      </div>
                    </label>
                    <input type="text" id="p-name" className="form-control" name="name" onChange={this.handleChange} placeholder="name" value={this.state.name} />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Address">Address</label>
                    <input type="text" list="address" id="Address" className="form-control" name='address' onChange={this.handleChange} placeholder="Address" />
                    <datalist id="address">
                      {this.state.address_suggestion.map((add, i) => <option key={i} value={add.description} />)}
                    </datalist>
                  </div>
                  <div className="input-c">
                    <label htmlFor="City">City</label>
                    <input type="text" id="City" className="form-control" name='city' onChange={this.handleChange} placeholder="City" />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Province">Province</label>
                    <input type="text" id="Province" className="form-control" name="province" onChange={this.handleChange} placeholder="Province" />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Province">Country</label>
                    <input type="text" id="Country" className="form-control" name="country" onChange={this.handleChange} placeholder="Country" />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Postal">Price</label>
                    <input type="text" id="Postal" className="form-control" name="price" onChange={this.handleChange} placeholder="Price" />
                  </div>
                  <div className="input-sp">
                    <label htmlFor="Type">Property type</label>
                    <div className="row">
                      <div className=" col-md-6">
                        <div className="custom-control custom-checkbox">
                          <CheckBox inputClass="custom-control-input" name="Condos" click={() => this.handleCheck("condo_check")} check={this.state.condo_check} labelClass="custom-control-label pt-1 text-dark" />

                        </div>
                      </div>
                      <div className=" col-md-6 pl-md-0">
                        <input type="text" id="Type" className={this.state.condo_check ? "form-control" : "form-control disabled"} name="condos" onChange={this.handleChange} placeholder="32 units" />

                      </div>
                    </div>
                    {/* <input type="text" id="Type" class="form-control" name="" placeholder="Postal code" value="$528,000"> */}
                  </div>
                  <div className="input-sp">
                    <div className="row">
                      <div className=" col-md-6">
                        <div className="custom-control custom-checkbox">
                          <CheckBox inputClass="custom-control-input" name="Townhouse" click={() => this.handleCheck("townhouse_check")} check={this.state.townhouse_check} labelClass="custom-control-label pt-1 text-dark" />

                        </div>
                      </div>
                      <div className=" col-md-6 pl-md-0">
                        <input type="text" id="UN" className={this.state.townhouse_check ? "form-control" : "form-control disabled"} name='townhouse' onChange={this.handleChange} placeholder="6 units" />

                      </div>
                    </div>
                    {/* <input type="text" id="Type" class="form-control" name="" placeholder="Postal code" value="$528,000"> */}
                  </div>
                  <div className="input-sp">
                    <div className="row">
                      <div className=" col-md-6">
                        <div className="custom-control custom-checkbox">
                          <CheckBox inputClass="custom-control-input" name="Commercial" click={() => this.handleCheck("commercial_check")} check={this.state.commercial_check} labelClass="custom-control-label pt-1 text-dark" />
                        </div>
                      </div>
                      <div className=" col-md-6 pl-md-0">
                        <input type="text" id="UN" className={this.state.commercial_check ? "form-control" : "form-control disabled"} name='commercial' onChange={this.handleChange} placeholder="2 units" />

                      </div>
                    </div>
                    {/* <input type="text" id="Type" class="form-control" name="" placeholder="Postal code" value="$528,000"> */}
                  </div>
                </div>
                {/* first volmn inputs end*/}
                <div className="col-md-4 col-lg-4 ">
                  <div className="input-c">
                    <label htmlFor="Size">Floor size (SF)</label>
                    <div className="row">
                      <div className="col-md-6 p-r-2 ">
                        <input type="text" className="form-control" id="Size" placeholder="Floor Size" name="floor_size" onChange={this.handleChange} />
                      </div>
                      <div className="col-md-6 p-l-2">
                        <input type="text" className="form-control" placeholder="Floor Size" name="floor_size2" onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                  <div className="input-c">
                    <label htmlFor="Level">Levels</label>
                    <input type="text" id="Level" className="form-control" name="levels" placeholder="Level" onChange={this.handleChange} />
                  </div>
                  <div className="input-c">
                    <label htmlFor="fees">Maintenace fees</label>
                    <input type="text" id="fees" className="form-control" name="maintenance_fees" onChange={this.handleChange} placeholder="fees" />
                  </div>
                  {/* drop down */}
                  <div className="input-c">
                    <div className="hasJS">
                      <label htmlFor="Zoning">Zoning</label>
                      <input type="text" id="ZONING" className="form-control" name="zone" onChange={this.handleChange} placeholder="zone" value={this.state.zone} />
                    </div>
                  </div>
                  <div className="input-c">
                    <label htmlFor="c-name">Developer</label>
                    <input type="text" id="c-name" className="form-control" name="Developer" onChange={this.handleChange} placeholder="developer" value={this.state.developer} />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Architect">Architect</label>
                    <input type="text" id="Architect" className="form-control" name="architect" onChange={this.handleChange} placeholder="Architect" />
                  </div>
                  <div className="input-c">
                    <label htmlFor="date">Completion date (YR)</label>
                    <input type="text" id="date" className="form-control" name="completion" onChange={this.handleChange} placeholder="date" />
                  </div>
                </div>
                <div className="col-md-4 col-lg-4 ">
                  <div className="input-c">
                    <label htmlFor="website">Project website</label>
                    <input type="text" id=" website" className="form-control" name="project_website" onChange={this.handleChange} placeholder="Project website" />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Contact">Contact</label>
                    <div className="row">
                      <div className="col-md-6 p-r-2">
                        <input type="text" className="form-control  m-bb" name="contact_firstname" onChange={this.handleChange} placeholder="Contact" />
                      </div>
                      <div className="col-md-6 p-l-2">
                        <input type="text" className="form-control" name="contact_lastname" onChange={this.handleChange} placeholder="Contact" />
                      </div>
                    </div>
                  </div>
                  <div className="input-c">
                    <label htmlFor="Phone">Phone</label>
                    <input type="text" id="Phone" className="form-control" name="contact_phone" onChange={this.handleChange} placeholder="Phone" />
                  </div>
                  <div className="input-c">
                    <label htmlFor="Email">Email</label>
                    <input type="text" id="Email" className="form-control" name="contact_email" onChange={this.handleChange} placeholder="Email" />
                  </div>

                </div>
              </div>
              {/* LIST END */}
              <div className="v-area mb-4 mt-5">
                <div class="alert alert-warning" style={{ display: this.state.video_error !== '' ? 'block' : 'none' }}>
                  {this.state.video_error}
                </div>
                <div class="left-60">
                  <h2 class="thumb-heading">
                    VIDEOS
                     </h2>
                </div>

                <div class="right-40">
                  <div className="row">
                    <div className="col-7 col-md-7 col-lg-8 pr-1">
                      <div class="upload-input">
                        <input type="text" className="form-control" name="video_link" placeholder="Enter video link" onChange={this.handleChange} value={this.state.video_link} />
                      </div>
                    </div>
                    <div className="col-5 col-md-5 col-lg-4 pl-1">
                      <input type="submit" className="btn btn-block orng-btn mt-0" value="Upload video" name="" onClick={this.handleVideo} />
                    </div>


                  </div>
                </div>
                <div class="clearfix"></div>
                <div className="row m-area">

                  {this.state.video.map((data, i) =>
                    <div className="col-md-3 p-b-15">
                      <a href="#" data-toggle="modal" data-target="#exampleModal">
                      </a>
                      <div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModal">
                      </a><a href title className="corner-cross">
                          <img src="images/black-cross.png" className alt="loading" onClick={() => this.handleVideoDelete(i)} />
                        </a>
                        <img src={"https://img.youtube.com/vi/" + data.id + "/hqdefault.jpg"} className="img-fluid fx-h" />
                        {/* <VideoThumbnail
                          videoUrl={data}
                          thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                          snapshotAtTime={2}
                        /> */}
                      </div>
                      <p className="page-para mt-2 ex-40">
                        {data.title}
                      </p>
                    </div>
                  )}


                </div>

              </div>
              {/* Video roe emd */}
              <div className="row">
                <div className="col-md-12 mb-4 mt-5">
                  <h2 className="thumb-heading">
                    DESCRIPTION
            </h2>
                  {/* <p class="para-sky w-100 mb-0">
  Akimbo’s bold exterior will define the Brentwood skyline. The 40-storey project’s architectural definition is marked by its angled, offset balconies
that wrap the height of the building, providing both sun shade and unobstructed views. For the first time ever, an architectural landmark building
designed to the world-class level of the most iconic buildings in Downtown Vancouver, comes to Brentwood.
</p>
 */}
                </div>
                <div className="col-md-12 mb-4  form-div">
                  <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleChange} />
                </div>
                <div className="col-md-12 mb-4 mt-5">
                  <h2 className="thumb-heading">
                    AMENITIES
              {/* <a href="#" title className="read-more float-right">
                Upload feature sheet
                (PDF)
              </a> */}
                    <label htmlFor="upload-sheet" className="read-more float-right">
                      {this.state.sheet.name}
                    </label>
                    <input
                      type="file"
                      id="upload-sheet"
                      style={{ display: "none" }}
                      onChange={this.handleSheet}
                    />
                  </h2>
                </div>
              </div>
              <div className="clearfix" />
              <div className="row cb-area">
                {this.state.amenities.map((child, i) =>
                  <div className="col-lg-3 col-md-3 col-xs-12">
                    <div className="custom-control custom-checkbox">
                      <CheckBox inputClass="custom-control-input" name={child.name} click={() => this.handleAmenities(i)} check={child.checked} labelClass="custom-control-label  text-dark para-sky mb-3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5 mb-4">
                <div class="alert alert-warning" style={{ display: this.state.floor_error !== '' ? 'block' : 'none' }}>
                  {this.state.floor_error}
                </div>
                <h2 className="thumb-heading mb">
                  FLOOR PLANS
          </h2>
                <div className="floor-box">
                  <div className="row">
                    <div className="col-md-4 col-lg-3">
                      <label style={{ display: current_floor.sheet.name ? 'none' : 'block' }} htmlFor="floor-sheet" className="orange text-right"><a>Upload</a></label>
                      {current_floor.sheet.name ?
                        <label className="black crz"><img src="images/cross-new.jpg" onClick={this.handleFloorSheetDelete} className alt="loading" />
                          {current_floor.sheet.name}
                        </label>
                        : ''}
                      <input
                        type="file"
                        id="floor-sheet"
                        style={{ display: "none" }}
                        onChange={this.handleFloorSheet}
                      />
                      <input
                        type="file"
                        id="upload-floor-image"
                        style={{ display: "none" }}
                        onChange={this.handleFloorImage}
                      />
                      <label className="file-upload-box">
                        {current_floor.images.preview ? <div className="file-upload-box position-relative">
                          <a title className="corner-cross" onClick={this.handleFloorImageDelete}>
                            <img src="images/black-cross.png" className alt="loading" />
                          </a>

                          <img src={current_floor.images.preview} className="img-fluid" style={{ width: '100%', height: '100%' }} />
                        </div> : ''}
                        <label htmlFor="upload-floor-image" style={{ display: current_floor.images.preview ? 'none' : 'block' }}>
                          <a >Click this placeholder to <br />
                        upload floor plan image
                      </a>
                        </label>

                      </label>


                    </div>
                    <div className="col-md-4 col-lg-3">
                      <div className="row mt-new">
                        <div className="col-6 pt-2 text-right">
                          Plan
                  </div>
                        <div className="col-6 form-div admin-info">
                          <input type="text" className="form-control" onChange={this.handleCurrFloor} name="plan" placeholder="Plan" value={current_floor.plan} />
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Level
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="text" className="form-control" name="level" onChange={this.handleCurrFloor} placeholder="Level" value={current_floor.level} />
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Floor plan type
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <div className="custom-selects">
                            <select value={current_floor.name} name="name" onChange={this.handleCurrFloor}>
                              <option value="">Select one...</option>
                              {this.state.floors.map((floor, i) => <option key={i}>{floor.name}</option>)}

                            </select>
                          </div>
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Bedrooms
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="text" className="form-control" name="bedrooms" onChange={this.handleCurrFloor} placeholder="Bedrooms" value={current_floor.bedrooms} />
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Den
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <div className="custom-selects">
                            <select value={current_floor.den} name="den" onChange={this.handleCurrFloor}>
                              <option value="">Select one...</option>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Bathrooms
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="text" className="form-control" name="bathrooms" onChange={this.handleCurrFloor} placeholder="Bathrooms" value={current_floor.bathrooms} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-3">
                      <div className="row mt-two">
                        <div className="col-6 pt-2 mt-2 text-right">
                          Floor size
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="text" className="form-control" name="floor_size" onChange={this.handleCurrFloor} placeholder="Floor size" value={current_floor.floor_size} />
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Balcony size
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="text" className="form-control" name="balcony_size" onChange={this.handleCurrFloor} placeholder="Balcony size" value={current_floor.balcony_size} />
                        </div>
                        <div className="col-6 pt-2 mt-2 text-right">
                          Price
                  </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="text" className="form-control" name="price" onChange={this.handleCurrFloor} placeholder="Price" value={current_floor.price} />
                        </div>
                        <div className="col-6 pt-2 mt-2">
                        </div>
                        <div className="col-6 form-div admin-info mt-2">
                          <input type="submit" onClick={this.addFloorPlan} className="btn btn-block orng-btn mt-0" defaultValue="ADD" name />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-b">
                  <input onChange={this.handleChange} type="text" name="floor_plan" placeholder="Floor plan type..." value={this.state.floor_plan} /> <button className="add-btn" onClick={this.handleFloors}>ADD</button>
                </div>
                <Tabnew clearFloorName={this.clearFloorName} newFloorName={this.state.newFloorName} handleFloorPlanDelete={(e, i) => this.handleFloorPlanDelete(e, i)} floors={this.state.floors} handleNewFloorName={(e) => this.handleNewFloorName(e)} handleFloorPlan={(e, i) => this.handleFloorPlan(e, i)} handleDelete={(e, name, i) => this.deleteFloorPlan(e, name, i)} />

                <div className="w-100 pt-md-4">
                  <h2 className="page-heading ">
                    SCHOOLS
            </h2>
                  {/* TABS SCHOOL */}
                  <SchoolTab school={this.state.school} />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="add-data">
              <input type="submit" className="btn btn-block orng-btn mt-5" value={this.props.addProject.status === serviceConstant.CREATE_PROJECT_PENDING || this.props.addProject.status === serviceConstant.CREATE_PROJECT_UPLOADING ? "Uploading..." : "Add Project"} onClick={this.handleSubmit} name />
            </div>
          </div>
        </div>

        <div className="f-spc" />
        <div className="clearfix" />
      </AdminContainer >
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
