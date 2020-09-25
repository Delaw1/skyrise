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
        { name: "name", blobData: "", raw: "" },
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
        <h2 className="page-h">
          PROJECT DATA (ATTACHED)
        </h2>
        <h4 className="thumb-heading">
          PHOTOS
          <a href="#" title className="read-more float-right rr">
            Upload photo
          </a>
        </h4>
        <div className="row">
          <div className="col-md-12 mb-4">
            <ul className="tab-list">
              <li className="mt-3">
                <img src="images/up1.jpg" className="w-100" alt="" />
                <a href title className="corner-cross">
                  <img src="images/black-cross.png" className alt="loading" />
                </a>
              </li>
              <li className="mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
              <li className="mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
              <li className="mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
              <li className="mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
              <li className="ml-md-0 mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
              <li className="mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
              <li className="mt-3">
                <a href title>
                  <img src="images/up2.jpg" className="w-100" alt="" />
                </a>
              </li>
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
                  <input type="checkbox" className="custom-control-input" id="customCheckBox2" defaultChecked />
                  <label className="custom-control-label pt-1 text-dark" htmlFor="customCheckBox2">
                    Featured project
                  </label>
                </div>
              </label>
              <input type="text" id="p-name" className="form-control" name placeholder="name" defaultValue="Chateau Laurier" />
            </div>
            <div className="input-c">
              <label htmlFor="Address">Address</label>
              <input type="text" id="Address" className="form-control" name placeholder="Address" defaultValue="1009 Laurier Ave" />
            </div>
            <div className="input-c">
              <label htmlFor="City">City</label>
              <input type="text" id="City" className="form-control" name placeholder="City" defaultValue="Vancouver" />
            </div>
            <div className="input-c">
              <label htmlFor="Province">Province</label>
              <input type="text" id="Province" className="form-control" name placeholder="Province" defaultValue="BC" />
            </div>
            <div className="input-c">
              <label htmlFor="Province">Country</label>
              <input type="text" id="Country" className="form-control" name placeholder="Canada" defaultValue="Canada" />
            </div>
            <div className="input-c">
              <label htmlFor="Postal">Price</label>
              <input type="text" id="Postal" className="form-control" name placeholder="Postal code" defaultValue="$528,000" />
            </div>
            <div className="input-sp">
              <label htmlFor="Type">Property type</label>
              <div className="row">
                <div className=" col-md-6">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheckBoxcn" />
                    <label className="custom-control-label pt-1 text-dark" htmlFor="customCheckBoxcn">
                      Condos
                    </label>
                  </div>
                </div>
                <div className=" col-md-6 pl-md-0">
                  <input type="text" id="Type" className="form-control" name placeholder="Postal code" defaultValue="32 units" />
                </div>
              </div>
              {/* <input type="text" id="Type" class="form-control" name="" placeholder="Postal code" value="$528,000"> */}
            </div>
            <div className="input-sp">
              <div className="row">
                <div className=" col-md-6">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheckBoxth" defaultChecked />
                    <label className="custom-control-label pt-1 text-dark" htmlFor="customCheckBoxth">
                      Townhouse
                    </label>
                  </div>
                </div>
                <div className=" col-md-6 pl-md-0">
                  <input type="text" id="UN" className="form-control" name placeholder="TOWNHOUSE" defaultValue="6 units" />
                </div>
              </div>
              {/* <input type="text" id="Type" class="form-control" name="" placeholder="Postal code" value="$528,000"> */}
            </div>
            <div className="input-sp">
              <div className="row">
                <div className=" col-md-6">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheckBoxcm" defaultChecked />
                    <label className="custom-control-label pt-1 text-dark" htmlFor="customCheckBoxcm">
                      Commercial
                    </label>
                  </div>
                </div>
                <div className=" col-md-6 pl-md-0">
                  <input type="text" id="UN" className="form-control" name placeholder="Town House" defaultValue="2 units" />
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
                  <input type="text" className="form-control" id="Size" name placeholder="Floor Size" defaultValue="450 SF" />
                </div>
                <div className="col-md-6 p-l-2">
                  <input type="text" className="form-control" name placeholder="Floor Size" defaultValue="4696 SF" />
                </div>
              </div>
            </div>
            <div className="input-c">
              <label htmlFor="Level">Levels</label>
              <input type="text" id="Level" className="form-control" name placeholder="Level" defaultValue="40 Levels" />
            </div>
            <div className="input-c">
              <label htmlFor="fees">Maintenace fees</label>
              <input type="text" id="fees" className="form-control" name placeholder="fees" defaultValue="$3.25/SF" />
            </div>
            {/* drop down */}
            <div className="input-c">
              <div className="hasJS">
                <label htmlFor="Zoning">Zoning</label>
                <input type="text" id="ZONING" className="form-control" name placeholder="fees" defaultValue="RS4" />
              </div>
            </div>
            <div className="input-c">
              <label htmlFor="c-name">Developer</label>
              <input type="text" id="c-name" className="form-control" name placeholder="name" defaultValue="Imani Developments, Inc." />
            </div>
            <div className="input-c">
              <label htmlFor="Architect">Architect</label>
              <input type="text" id="Architect" className="form-control" name placeholder="Architect" defaultValue="Douglas Barry Simpson" />
            </div>
            <div className="input-c">
              <label htmlFor="date">Completion date (YR)</label>
              <input type="text" id="date" className="form-control" name placeholder="date" defaultValue="2023 estimate" />
            </div>
            {/* suvcribe check box */}
            {/*               <form>
  <input type="checkbox" id="fruit1" name="fruit-1" value="Apple">
  <label for="fruit1">Apple</label>


</form> */}
          </div>
          <div className="col-md-4 col-lg-4 ">
            <div className="input-c">
              <label htmlFor="website">Project website</label>
              <input type="text" id=" website" className="form-control" name placeholder="Project website" defaultValue="www.chateaulaurier.com" />
            </div>
            <div className="input-c">
              <label htmlFor="Contact">Contact</label>
              <div className="row">
                <div className="col-md-6 p-r-2">
                  <input type="text" className="form-control  m-bb" name placeholder="Contact" defaultValue="Aaron" />
                </div>
                <div className="col-md-6 p-l-2">
                  <input type="text" className="form-control" name placeholder="Contact" defaultValue="Garrison" />
                </div>
              </div>
            </div>
            <div className="input-c">
              <label htmlFor="Phone">Phone</label>
              <input type="text" id="Phone" className="form-control" name placeholder="Phone" defaultValue="(604) 659 - 4332" />
            </div>
            <div className="input-c">
              <label htmlFor="Email">Email</label>
              <input type="text" id="Email" className="form-control" name placeholder="Email" defaultValue="arron@gmail.com" />
            </div>
            {/* term and condition checkbox */}
            {/* suvcribe check box */}
            {/*               <form>
  <input type="checkbox" id="fruit1" name="fruit-1" value="Apple">
  <label for="fruit1">Apple</label>


</form> */}
          </div>
        </div>
        {/* LIST END */}
        <div className="row">
          <div className="col-md-12 mb-4 mt-5">
            <h2 className="thumb-heading">
              VIDEOS
              <a href="#" title className="read-more float-right">
                Upload videos
              </a>
            </h2>
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
            <textarea name className="form-control" defaultValue={""} />
          </div>
          <div className="col-md-12 mb-4 mt-5">
            <h2 className="thumb-heading">
              AMENITIES
              <a href="#" title className="read-more float-right">
                Upload feature sheet
                (PDF)
              </a>
            </h2>
          </div>
        </div>
        <div className="clearfix" />
        <div className="row cb-area">
          <div className="col-lg-3 col-md-3 col-xs-12">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox4" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox4">
                Car wash area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox5" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox5">
                Children’s play area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox6" />
              <label className="custom-control-label  text-dark para-sky mb-4" htmlFor="customCheckBox6">
                Concerg
              </label>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-xs-12">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox24" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox24">
                Car wash area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox25" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox25">
                Children’s play area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox26" />
              <label className="custom-control-label  text-dark para-sky mb-4" htmlFor="customCheckBox26">
                Concerg
              </label>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-xs-12">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox34" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox34">
                Car wash area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox35" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox35">
                Children’s play area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox36" />
              <label className="custom-control-label  text-dark para-sky mb-4" htmlFor="customCheckBox36">
                Concerg
              </label>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-xs-12">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox44" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox44">
                Car wash area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox45" defaultChecked />
              <label className="custom-control-label  text-dark para-sky mb-3" htmlFor="customCheckBox45">
                Children’s play area
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheckBox46" />
              <label className="custom-control-label  text-dark para-sky mb-4" htmlFor="customCheckBox46">
                Concerg
              </label>
            </div>
          </div>
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
