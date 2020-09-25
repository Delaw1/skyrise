import React, { Component, Fragment } from 'react'
import AdminNavbar from './AdminNavbar'
import logo from '../../assest/images/logo.png'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import BACKEND_URL from '../../shared/_helpers/utils';
import Footer from './Footer'

export class AdminContainers extends Component {
    render() {
        return (
            <Fragment>
                <header className="site-header push"> <button className="menu-btn"><i className="zmdi zmdi-menu" /></button> <a href="index.html"><img src="images/logo.png" /></a></header>
        {/* Pushy Menu */}
        <nav className="pushy pushy-left" data-focus="#first-link">
          <div className="pushy-content">
            <ul>
              <li className="pushy-link"><a href="index.html">Home</a></li>
              <li className="pushy-submenu">
                <button>Services</button>
                <ul>
                  <li className="pushy-link"><a href="#">For builders and developers</a></li>
                  <li className="pushy-link"><a href="#">For buyers and sellers</a></li>
                  <li className="pushy-link"><a href="#">For investors</a></li>
                </ul>
              </li>
              <li className="pushy-submenu">
                <button>New projects</button>
                <ul>
                  <li className="pushy-link heading">
                    <b className="sub-heading">Property type</b>
                    <div className="control-group-nav">
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox22" defaultChecked />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox22">
                          Commercial
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox33" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox33">
                          Condos
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox44" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox44">
                          House
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox55" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox55">
                          Townhouse
                        </label>
                      </div>
                    </div>
                    <b className="sub-heading">City</b>
                    <div className="control-group-nav">
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox66" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox66">
                          Burnaby
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox77" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox77">
                          Coquitlam
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox88" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox88">
                          New Westminster
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox99" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox99">
                          North Delta
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox black">
                        <input type="checkbox" className="custom-control-input black" id="customCheckBox81" />
                        <label className="custom-control-label pt-1 text-normal" htmlFor="customCheckBox81">
                          Richmond
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="pushy-submenu">
                <button>MLS search</button>
                <ul>
                  <li className="pushy-submenu">
                    <b className="sub-heading-two">City</b>
                    <div className="select-area">
                      <div className="hasJS">
                        <select className="custom">
                          <option>Choose</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                        </select>
                      </div>
                    </div>
                    <b className="sub-heading-two">Property type</b>
                    <div className="select-area">
                      <div className="hasJS">
                        <select className="custom">
                          <option>Choose</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                          <option>Type</option>
                        </select>
                      </div>
                    </div>
                    <b className="sub-heading-two">Price (CAD)</b>
                    <div className="clearfix">
                      <div className="left-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Min</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="right-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Max</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <b className="sub-heading-two">Bedrooms</b>
                    <div className="clearfix">
                      <div className="left-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Min</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="right-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Max</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <b className="sub-heading-two">Bathrooms</b>
                    <div className="clearfix">
                      <div className="left-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Min</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="right-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Max</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <b className="sub-heading-two">Floor size (SF)</b>
                    <div className="clearfix">
                      <div className="left-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Min</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="right-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Max</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <b className="sub-heading-two">Lot size (SF)</b>
                    <div className="clearfix">
                      <div className="left-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Min</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="right-area">
                        <div className="select-area">
                          <div className="hasJS">
                            <select className="custom">
                              <option>Max</option>
                              <option>100</option>
                              <option>200</option>
                              <option>300</option>
                              <option>400</option>
                              <option>500</option>
                              <option>600</option>
                              <option>700</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" b-spc">
                      <b className="sub-heading-two">Year built</b>
                      <div className="clearfix">
                        <div className="left-area">
                          <div className="select-area">
                            <div className="hasJS">
                              <select className="custom">
                                <option>Min</option>
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                                <option>600</option>
                                <option>700</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="right-area">
                          <div className="select-area">
                            <div className="hasJS">
                              <select className="custom">
                                <option>Max</option>
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                                <option>600</option>
                                <option>700</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="pushy-link"><a href="videos.html">Videos</a></li>
              <li className="pushy-link"><a href="contact.html">Contact</a></li>
            </ul>
          </div>
        </nav>
        {/*header end*/}
        {/*header end*/}
        <div className="clearfix" />
      
                {this.props.children}
            </Fragment>
        )
    }
}

export default AdminContainers
