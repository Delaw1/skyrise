import React, { Component, Fragment } from 'react'
import AdminContainer from '../layout/AdminContainers'
import {BASEURL} from '../../services/url'
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
import {appendScript} from '../../shared/utils/appendScript'
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
// import './owl.css'; 



// require('owl.carousel')
export class AddAttached extends Component {
  constructor(props) {
    super(props)


    this.state = {
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
      amenities: [ 
        {name: 'Car wash area', checked: false},
        {name: 'Children’s play area', checked: false},
        {name: 'Concerg', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
        {name: 'Another', checked: false},
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
        { name: "name", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
        { name: "", blobData: "", raw: "" },
      ],
      video: [],
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
    let uA = this.state.amenities
    uA[id].checked = !uA[id].checked
    this.setState({
      // amenities: this.state.amenities.map(el => (el.id == id ? { ...el, checked: !el.checked } : el))
      amenities: uA
    })
  }

  handleInput = (e, name, i) => {
    const elementsIndex = this.state.floors.findIndex(element => element.name === name)
    let newArray = [...this.state.floors]
    newArray[elementsIndex].section[i][e.target.name] = e.target.value
    this.setState({
      floors: newArray,
      active: elementsIndex
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
      let newFloor = [...this.state.floors, {
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
      let active = 0;
      newFloor.map((floor, i) => {
        if(floor.name === 'NEW TAB') {
          active = i
        }
      })
      this.setState({
        floors: newFloor,
        active
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

  handleVideoNew = (e) => {
    const media = new FormData()
    media.append('video', e.target.files[0])
    axios.post(routes.UPLOADVIDEO, media).then(resp => {
      console.log(resp)
      if(resp.data.status == "success") {
        this.setState(prevState => ({
          video: [...prevState.video, resp.data.path]
        }))
      }
    }).catch(err => {
      console.log(err)
    })
    document.getElementById("upload-video").value = "";
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

  handleVideo = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0]
    let name = e.target.files[0].name
    console.log(file)
    reader.onload = e => {
      //set values of selected attachment
      let newSelectedAttachment = {};
      newSelectedAttachment.file = file;
      newSelectedAttachment.blobData = e.target.result;
      console.log(e.target.result)
      
      //if file type is image then show the attachment or download the same
      let newArray = this.state.videos
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].blobData === "") {
          newArray[i].blobData = e.target.result
          newArray[i].raw = file
          newArray[i].name = 'new name'
          break;
        }
      };
      if (file.type.includes("video")) {
        this.setState({
          videos: newArray
        }, () => {
          console.log(this.state)
        });
      }
      document.getElementById("upload-video").value = "";
    }
    reader.readAsDataURL(file);
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
      alert('Project successfully added')
      this.props.clear()
      // this.setState(this.baseState)
      history.push('/')
    }
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
    const { images } = this.state
    return (
      <AdminContainer>
        <div>
  <div id="container">
    <div className="container-fluid">
      {/* body section */}
      <div className="w-100">
        {/* slider emd */}
        <h2 className="page-h" onClick={this.handle}>
          PROJECT DATA (ATTACHED)
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
        <div className="row">
          <div className="col-md-12 mb-4">
            <ul className="tab-list">
            {images.map((image, i) => {
                    return <li className={i == 5 ? "ml-md-0 mt-3" : "mt-3"}>
                      <img src={image.preview ? image.preview : BASEURL + '/images/up2.jpg'} className="w-100" height="140" alt="" />
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
                  <CheckBox id="customCheckBox2" name="Featured project" click={() => this.handleCheck("featured")} check={this.state.featured} labelClass="custom-control-label pt-1 text-dark" />
                </div>
              </label>
              <input type="text" id="p-name" className="form-control" name="name" onChange={this.handleChange} placeholder="name" value={this.state.name} />
            </div>
            <div className="input-c">
              <label htmlFor="Address">Address</label>
              <input type="text" id="Address" className="form-control" name='address' onChange={this.handleChange} placeholder="Address" />
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
              <input type="text" id="Country" className="form-control" name="country" onChange={this.handleChange} placeholder="Country"/>
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
                  <CheckBox name="Condos" click={() => this.handleCheck("condo_check")} check={this.state.condo_check}  labelClass="custom-control-label pt-1 text-dark" />
                    
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
                  <CheckBox name="Townhouse" click={() => this.handleCheck("townhouse_check")} check={this.state.townhouse_check} labelClass="custom-control-label pt-1 text-dark" />
                    
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
                  <CheckBox name="Commercial" click={() => this.handleCheck("commercial_check")} check={this.state.commercial_check} labelClass="custom-control-label pt-1 text-dark" />
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
              <input type="text" id="Level" className="form-control" name="levels" placeholder="Level" onChange={this.handleChange}/>
            </div>
            <div className="input-c">
              <label htmlFor="fees">Maintenace fees</label>
              <input type="text" id="fees" className="form-control" name="maintenance_fees" onChange={this.handleChange} placeholder="fees"/>
            </div>
            {/* drop down */}
            <div className="input-c">
              <div className="hasJS">
                <label htmlFor="Zoning">Zoning</label>
                <input type="text" id="ZONING" className="form-control" name="zone" onChange={this.handleChange} placeholder="zone" value={this.state.zone}/>
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
        <div className="row">
          <div className="col-md-12 mb-4 mt-5">
            <h2 className="thumb-heading">
              VIDEOS
              <label htmlFor="upload-video" className="read-more float-right">
                    Upload Videos
                </label>

                <input
                  type="file"
                  id="upload-video"
                  style={{ display: "none" }}
                  onChange={this.handleVideoNew}
                />
            </h2>
          </div>
        </div>
        <div className="row m-area">
          
            {this.state.video.map((data, i) => 
                <div className="col-md-3 p-b-15">
                <a href="#" data-toggle="modal" data-target="#exampleModal">
            </a>
              <div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModal">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" onClick={() => this.handleVideoDelete(i)}></img> />
              </a>
              <VideoThumbnail
                videoUrl={BASEURL + data}
                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                snapshotAtTime={2}
                />
                </div>
                <p className="page-para mt-2 ex-40">
              Semi-Waterfront Luxury Living
            </p>
          </div>
            )}
            
            
            
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa2">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa2">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading..." />
              </a>
              <img src="images/v2.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              The Perfect Place to Call Home
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa3">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa3">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v3.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              Luxury Mountain Home
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa4">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa4">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v4.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              European Style Meets West Coast...
            </p>
          </div>
        </div>
        <div className="row m-area">
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModal">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModal">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v1.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              Semi-Waterfront Luxury Living
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa2">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa2">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v2.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              The Perfect Place to Call Home
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa3">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa3">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v3.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              Luxury Mountain Home
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa4">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa4">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v4.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              European Style Meets West Coast...
            </p>
          </div>
        </div>
        <div className="row m-area">
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModal">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModal">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v1.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              Semi-Waterfront Luxury Living
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa2">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa2">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v2.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              The Perfect Place to Call Home
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa3">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa3">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v3.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              Luxury Mountain Home
            </p>
          </div>
          <div className="col-md-3 p-b-15">
            <a href="#" data-toggle="modal" data-target="#exampleModa4">
            </a><div className="box1"><a href="#" data-toggle="modal" data-target="#exampleModa4">
              </a><a href title className="corner-cross">
                <img src="images/black-cross.png" className alt="loading" />
              </a>
              <img src="images/v4.jpg" className="img-fluid fx-h" />
            </div>
            <p className="page-para mt-2 ex-40">
              European Style Meets West Coast...
            </p>
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
            <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleChange}/>
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
              <CheckBox name={child.name} click={() => this.handleAmenities(i)} check={child.checked} labelClass="custom-control-label  text-dark para-sky mb-3" />
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-5 mb-4">
          <h2 className="thumb-heading mb">
            FLOOR PLANS
          </h2>
          <div className="floor-box">
            <div className="row">
              <div className="col-md-4 col-lg-3">
                <label className="orange text-right"><a href="javascript:void(0);">Upload</a></label>
                <div className="file-upload-box">
                  <a href="#">Click this placeholder to <br />
                    upload floor plan image
                  </a>
                </div>
                <label className="black crz"><a href="#"> <img src="images/cross-new.jpg" className alt="loading" />
                    Floorplan.pdf</a></label>
                <div className="file-upload-box position-relative">
                  <a href title className="corner-cross">
                    <img src="images/black-cross.png" className alt="loading" />
                  </a>
                  <img src="images/floor-plan.jpg" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="row mt-new">
                  <div className="col-6 pt-2 text-right">
                    Plan
                  </div>
                  <div className="col-6 form-div admin-info">
                    <input type="text" className="form-control" name placeholder="name" defaultValue={5} />
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Level
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="text" className="form-control" name placeholder="name" defaultValue={1} />
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Floor plan type
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <div className="custom-selects">
                      <select>
                        <option>1 Bedroom</option>
                        <option>2 Bedroom</option>
                        <option>3 Bedroom</option>
                        <option>4 Bedroom</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Bedrooms
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="text" className="form-control" name placeholder="name" defaultValue={1} />
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Den
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <div className="custom-selects">
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Bathrooms
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="text" className="form-control" name placeholder="name" defaultValue={455} />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="row mt-two">
                  <div className="col-6 pt-2 mt-2 text-right">
                    Floor size
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="text" className="form-control" name placeholder="name" defaultValue="565 SF" />
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Balcony size
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="text" className="form-control" name placeholder="name" defaultValue="95 SF" />
                  </div>
                  <div className="col-6 pt-2 mt-2 text-right">
                    Price
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="text" className="form-control" name placeholder="name" defaultValue="$529,900" />
                  </div>
                  <div className="col-6 pt-2 mt-2">
                  </div>
                  <div className="col-6 form-div admin-info mt-2">
                    <input type="submit" className="btn btn-block orng-btn mt-0" defaultValue="ADD" name />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="input-b">
            <input type="text" placeholder="Floor plan type..." /> <button className="add-btn">ADD</button>
          </div>
          <div id="horizontalTab" className="admin-tabs">
            <ul className="resp-tabs-list">
              <li className="mr-md-1">1 Bedroom</li>
              <li className="mr-md-1">2 Bedroom</li>
              <li className="mr-md-1">3 Bedroom</li>
              <li className="mr-md-1">Sub-penthouse</li>
              <li className="mr-md-1">Penthouse</li>
            </ul>
            <div className="resp-tabs-container">
              <div>
                <ul className="plan-area clearfix">
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 01</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 02</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 03</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 04</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 05</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 06</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 07</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="plan-bx position-relative">
                      <a href="#" className="corner-cross"> <img src="images/black-cross.png" className alt="loading" /> </a>
                      <a href data-toggle="modal" data-target="#exampleModal12" title>
                        <img src="images/fl1.jpg" alt="" /> </a>
                      <b>Plan 08</b>
                      <ul className="detail clearfix">
                        <li>Bedrooms:</li>
                        <li>1 + Den</li>
                        <li>Bathrooms:</li>
                        <li>1</li>
                        <li>Floor size:</li>
                        <li>455 SF</li>
                        <li>Balcony:</li>
                        <li>95 SF</li>
                        <li>Level:</li>
                        <li>5 - 15, 18</li>
                        <li>Starting price:</li>
                        <li>$ 529,900</li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <div className="bod-area" />
              </div>
              <div>
                <p>Suspendisse blandit velit Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta
                  cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis
                  Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc
                  erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna gravid urna gravid eget
                  erat suscipit in malesuada odio venenatis.</p>
              </div>
              <div>
                <p>Sus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.
                </p>
              </div>
              <div>
                <p>Sus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.
                </p>
              </div>
              <div>
                <p>Sus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.
                </p>
              </div>
            </div>
          </div>
          <div className="w-100 pt-md-4">
            <h2 className="page-heading ">
              SCHOOLS
            </h2>
            {/* TABS SCHOOL */}
            <div id="horizontalTab2">
              <ul className="resp-tabs-list">
                <li className="mr-md-1">Daycare</li>
                <li className="mr-md-1">Elementary</li>
                <li className="mr-md-1">Middle school </li>
                <li className>High school</li>
              </ul>
              <div className="resp-tabs-container marg-area">
                <div>
                  <div className="owl-dbox owl-carousel owl-theme">
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 1</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 2</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 3</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 4</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 5</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 6</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bod-area" />
                </div>
                <div>
                  <div className="owl-dbox owl-carousel owl-theme">
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 1</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 2</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 3</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 4</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 5</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 6</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bod-area" />
                </div>
                <div>
                  <div className="owl-dbox owl-carousel owl-theme">
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 1</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 2</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 3</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 4</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 5</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 6</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bod-area" />
                </div>
                <div>
                  <div className="owl-dbox owl-carousel owl-theme">
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 1</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 2</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 3</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 4</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 5</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item">
                      <div className="data-box">
                        <ul>
                          <li>Blessed Sacrament High School 6</li>
                          <li>Private</li>
                          <li>Grade 8 - 12</li>
                          <li>207 enrollment</li>
                          <li>1.5 KM away</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bod-area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="f-spc" />
  <div className="clearfix" />
</div>

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
})(AddAttached)
