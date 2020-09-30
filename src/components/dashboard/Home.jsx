import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import AdminContainer from '../layout/AdminContainers'
import BACKEND_URL from '../../shared/_helpers/utils'
import Tab from './Tab'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import { serviceConstant } from '../../redux/constants/apicall.constant'
import ProjectTable from './ProjectTable'
import debounce from 'lodash.debounce';
import {appendScript} from '../../shared/utils/appendScript'

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

  }



  componentDidMount() {
    appendScript("https://unpkg.com/swiper/swiper-bundle.min.js")
  }
  componentDidUpdate = () => {
  }

  render() {

    return (
      <AdminContainer>
        <div id="container">
          <div className="w-100 position-relative slider-top">
            <img src="images/banner.jpg" className="w-100" alt="" />
            <h2 className="banner-heading">
              Marketing real estate presale, new construction and <br />
            commercial projects.
          </h2>
          </div>
          <div className="container-fluid main-cont">
            <div className="w-100">
              <h2 className="page-heading m-40">
                WHAT IS SKYRISE?
            </h2>
              <p className="para-sky m-40">
                Skyrise is a platform for real estate buyers and investors looking to buy pre-sale condos and townhomes or new
                construction homes. By working
                closely with developers and builders, we are able to provide you with exclusive information and experience to
                guide you through the real estate
                pre-sale and new home buying process. Skyrise was created by Vancouver-based real estate broker Calvin Cheung,
                to help simplify the buying and
                selling process for real estate buyers and developers.
            </p>
              <div className="row spc-zero">
                <div className="col-md-4 p-r-15">
                  <img src="images/s1.jpg" className="img-fluid w-100 fx-h" alt="" />
                  <div className="p-bx">
                    <h4 className="thumb-heading-new">
                      For builders and developers
                  </h4>
                    <p className="page-para">
                      The Skyrise team provides a full range of marketing
                      services and sales expertise to real estate builders
                      and developers.
                  </p>
                    <a href title className="read-more m-40"> Read more...</a>
                  </div>
                </div>
                <div className="col-md-4 p-b-15">
                  <img src="images/s2.jpg" className="img-fluid w-100 fx-h" alt="" />
                  <div className="p-bx">
                    <h4 className="thumb-heading-new">
                      For buyers and sellers
                  </h4>
                    <p className="page-para">
                      The Skyrise team provides a full range of marketing
                      services and sales expertise to real estate builders
                      and developers.
                  </p>
                    <a href title className="read-more m-40"> Read more...</a>
                  </div>
                </div>
                <div className="col-md-4 p-l-15">
                  <img src="images/s3.jpg" className="img-fluid w-100 fx-h" alt="" />
                  <div className="p-bx">
                    <h4 className="thumb-heading-new">
                      For investors
                  </h4>
                    <p className="page-para">
                      The Skyrise team provides a full range of marketing
                      services and sales expertise to real estate builders
                      and developers.
                  </p>
                    <a href title className="read-more"> Read more...</a>
                  </div>
                </div>
                <div className="col-md-12 mt-md-5  p-r-0">
                  <h2 className="page-heading pd">
                    LATEST VIDEOS
                  <a href="#" title className="read-more float-right d-none">View all</a>
                  </h2>
                  {/* model code */}
                  {/* Modal */}
                  <div className="modal fade p-0" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <iframe width="100%" height={500} src="https://www.youtube.com/embed/eIVh30Swokc" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* from here model */}
                  <div className="swiper-container mt-bt">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#" data-toggle="modal" data-target="#exampleModal">
                            <img src="images/v1.jpg" className="img-responsive " />
                          </a>
                          <p className="page-para mt-2">
                            Semi-Waterfront Luxury Living
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#">
                            <img src="images/v2.jpg" className="img-responsive " />
                          </a>
                          <p className="page-para mt-2">
                            The Perfect Place to Call Home
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#">
                            <img src="images/v3.jpg" className="img-responsive " />
                          </a>
                          <p className="page-para mt-2">
                            Luxury Mountain Home
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#">
                            <img src="images/v4.jpg" className="img-responsive" />
                          </a>
                          <p className="page-para mt-2">
                            European Style Meets West Coast...
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#" data-toggle="modal" data-target="#exampleModal">
                            <img src="images/v1.jpg" className="img-responsive " />
                          </a>
                          <p className="page-para mt-2">
                            Semi-Waterfront Luxury Living
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#">
                            <img src="images/v2.jpg" className="img-responsive " />
                          </a>
                          <p className="page-para mt-2">
                            The Perfect Place to Call Home
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#">
                            <img src="images/v3.jpg" className="img-responsive " />
                          </a>
                          <p className="page-para mt-2">
                            Luxury Mountain Home
                        </p>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-items">
                          <a href="#">
                            <img src="images/v4.jpg" className="img-responsive" />
                          </a>
                          <p className="page-para mt-2">
                            European Style Meets West Coast...
                        </p>
                        </div>
                      </div>
                    </div>
                    {/* Add Arrows */}
                    <div className="swiper-button-next" />
                    <div className="swiper-button-prev" />
                  </div>
                  <div className="w-100 mt-md-5">
                    <h2 className="page-heading">
                      FEATURED CONDO PROJECTS
                    <a href="#" title className="read-more float-right d-none">View all</a>
                    </h2>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-r-15">
                  <a href title>
                    <img src="images/f1.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      Akimbo
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      Burnaby <span className="pipe">|</span> From $559,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-b-15">
                  <a href title>
                    <img src="images/f2.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      The City Of Lougheed
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      Richmond <span className="pipe">|</span> From $492,500
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-l-15">
                  <a href title>
                    <img src="images/f3.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      Forte
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      Vancouver <span className="pipe">|</span> From $529,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-4 p-r-15">
                  <a href title>
                    <img src="images/f4.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      Concord Brentwood Phase 2
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      Vanc <span className="pipe">|</span> From $529,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-4 p-b-15">
                  <a href title>
                    <img src="images/f5.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      Concord Brentwood Phase 2
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      Vanc <span className="pipe">|</span> From $529,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-4 p-l-15">
                  <a href title>
                    <img src="images/f6.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      CF Richmond C
                      entre
                    </h4>
                  </a>
                    <p className="page-para">
                      Richmond <span className="pipe">|</span> From $498,000
                  </p>
                  </div>
                </div>
                <div className="col-md-12 mt-md-5">
                  <h2 className="page-heading">
                    FEATURED DETACHED HOMES
                  <a href="#" title className="read-more float-right d-none">View all</a>
                  </h2>
                </div>
                <div className="col-md-4 mt-2 p-r-15">
                  <a href title>
                    <img src="images/fd1.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      1133 Palmerston Avenue
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      West Vancouver <span className="pipe">|</span> $4,998,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-b-15">
                  <a href title>
                    <img src="images/fd2.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      2626 Bellevue Avenue
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      White Rock <span className="pipe">|</span> $12,800,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-l-15">
                  <a href title>
                    <img src="images/fd3.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      1098 Wolfe Avenue
                    </h4>
                  </a>
                    <p className="page-para">
                      Vancouver <span className="pipe">|</span> $9,998,000
                  </p>
                  </div>
                </div>
                <div className="col-md-12 mt-md-5">
                  <h2 className="page-heading">
                    FEATURED TOWNHOUSE PROJECTS
                  <a href="#" title className="read-more float-right d-none">View all</a>
                  </h2>
                </div>
                <div className="col-md-4 mt-2 p-r-15">
                  <a href title>
                    <img src="images/ft1.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      1133 Palmerston Avenue
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      West Vancouver <span className="pipe">|</span> From $698,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-b-15">
                  <a href title>
                    <img src="images/ft2.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      2626 Bellevue Avenue
                    </h4>
                  </a>
                    <p className="page-para m-40">
                      White Rock <span className="pipe">|</span> From $690,000
                  </p>
                  </div>
                </div>
                <div className="col-md-4 mt-2 p-l-15">
                  <a href title>
                    <img src="images/ft3.jpg" className="img-fluid w-100 fx-hs" alt="" />
                  </a><div className="p-bx"><a href title>
                    <h4 className="thumb-heading mb-1">
                      1098 Wolfe Avenue
                    </h4>
                  </a>
                    <p className="page-para ">
                      Vancouver <span className="pipe">|</span> From $729,000
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix" />
          <footer>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <h2>
                    LINKS
                </h2>
                  <span className="m-bt">
                    Services
                </span>
                  <a href="#" className="m-b"> For builders &amp; developers</a>
                  <a href="#" className="m-b"> For buyers &amp; investors</a>
                  <a href="#" className="mb-4"> For sellers</a>
                  <span className="m-bt"> New projects</span>
                  <a href className="m-b">
                    Commercial space
                </a>
                  <a href className="m-b">
                    Condos
                </a>
                  <a href className="m-b">
                    Detached homes
                </a>
                  <a href className="mb-4">
                    Townhomes
                </a>
                  <span className="m-bt">
                    MLS
                </span>
                  <a href>
                    MLS search
                </a>
                </div>
                <div className="col-md-4 mt-4 mt-md-0">
                  <h2>
                    CONNECT
                </h2>
                  <div className="row">
                    <div className="col-1 col-md-3 col-lg-2 pt-2">
                      <div className="w-100">
                        <img src="images/youtube.png" alt="" width={30} height={23} />
                      </div>
                      <div className="w-100 mt-4 pt-1">
                        <img src="images/inst.png" width={30} height={30} className=" mt-4" alt="" />
                      </div>
                      <div className="w-100 mt-3 mt-lg-3 pt-2 pt-md-2">
                        <img width={30} height={30} src="images/fb.png" className=" mt-4" alt="" />
                      </div>
                      <div className="w-100 mt-4 mt-lg-3 pt-2 ">
                        <img src="images/tw.png" className=" mt-4" width={30} height={30} alt="" />
                      </div>
                      <div className="w-100 mt-4 mt-lg-4 ">
                        <img src="images/in.png" className=" mt-4" width={30} height={30} alt="" />
                      </div>
                    </div>
                    <div className="col-9 pl-4 pl-md-0 col-md-9 col-lg-10">
                      <span>
                        Youtube
                    </span>
                      <a href="#" className="mb-4">34,668 followers</a>
                      <span>
                        Instagram
                    </span>
                      <a href="#" className="mb-4">
                        2332 followers
                    </a>
                      <span>
                        Facebook
                    </span>
                      <a href="#" className="mb-4">
                        4318 followers
                    </a>
                      <span>
                        Twitter
                    </span>
                      <a href="#" className="mb-4">
                        9345 followers
                    </a>
                      <span>
                        LinkedIn
                    </span>
                      <a href="#" className="mb-4">
                        7349 followers
                    </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h2>
                    CONTACT
                </h2>
                  <span>
                    Phone
                </span>
                  <a href="#" className="mb-4"> (604) 805 - 8888</a>
                  <span> Email</span>
                  <a href className="mb-4">
                    hello@skyriseprojects.com
                </a>
                  <span>
                    Newsletter
                </span>
                  <p className="font-s">
                    Learn more about Skyrise and new projects
                    delivered straight to your inbox.
                </p>
                  <div className="row form-div">
                    <div className="col-9 col-md-8 col-lg-9 pr-0 form-div">
                      <input type="text" className="form-control cont-input" name id placeholder="Your email address" />
                    </div>
                    <div className="col-3 col-md-4 col-lg-3 pl-2">
                      <button className="btn btn-primary btn-block">
                        JOIN
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 side-links">
                  <a href>Legal</a> | <a href>Terms of use</a> | <a href>Privacy policy</a>
                </div>
                <div className="col-md-6">
                  <p className="text-right">
                    © 2020 Skyrise Projects, Inc. All rights reserved.
                </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AdminContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addProject: state.addProject,
    projects: state.projects
  }
}

export default connect(mapStateToProps, {
  getProjects: apiCallAction.getProjects,
  delProject: apiCallAction.delProject
})(Home)
