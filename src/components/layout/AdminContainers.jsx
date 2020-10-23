import React, { Component, Fragment } from 'react'
import AdminNavbar from './AdminNavbar'
import logo from '../../assest/images/logo.png'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import BACKEND_URL from '../../shared/_helpers/utils';
import Footer from './Footer'
import { appendScript } from '../../shared/utils/appendScript'
import history from '../../shared/_helpers/history'
import { connect } from 'react-redux'
import { apiCallAction } from "../../redux/actions/apicall.action";
import CheckBox from '../dashboard/Checkbox'

export class AdminContainers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: null,
      city: null
    }
  }

  handleFilter = (name) => {
    let data
    let featured
    if (name === "Detached") {
      data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 2)
      featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 2)
    } else {
      data = this.props.projects.data.filter((project) => project.featured === 0 && project[name.toLowerCase()] !== null)
      featured = this.props.projects.data.filter((project) => project.featured === 1 && project[name.toLowerCase()] !== null)
    }

    if (this.state.city !== null) {
      data = data.filter((proj) => proj.city.search(this.state.city) !== -1)
      featured = featured.filter((proj) => proj.city.search(this.state.city) !== -1)
    }

    this.props.filPro(name, data, featured)
  }

  handleCity = (city) => {
    let data
    let featured
    let name = this.props.filterProperty.name

    if (this.state.city === city) {
      this.setState({
        city: null
      })

      if (name === "Detached") {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 2)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 2)
      } else {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project[name.toLowerCase()] !== null)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project[name.toLowerCase()] !== null)
      }
      
    } else {
      this.setState({
        city
      })

      if (name === "Detached") {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project.type_id === 2 && project.city.search(city) !== -1)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project.type_id === 2 && project.city.search(city) !== -1)
      } else {
        data = this.props.projects.data.filter((project) => project.featured === 0 && project[name.toLowerCase()] !== null && project.city.search(city) !== -1)
        featured = this.props.projects.data.filter((project) => project.featured === 1 && project[name.toLowerCase()] !== null && project.city.search(city) !== -1)
      }

    }
    this.props.filPro(name, data, featured)
  }

  toggleClass = (tab) => {
    if (tab === "New projects") {
      history.push('/property')
    }
    this.state.activeTab === tab ? this.setState({ activeTab: null }) : this.setState({ activeTab: tab })
  }

  toggleSidebar = () => {
    document.body.classList.toggle("pushy-open-left")
  }

  componentDidMount() {
    // appendScript("./js/pushy.js")
    // this.props.filterProperty()
    console.log('yes')
  }
  render() {
    return (
      <Fragment>
        <header className="site-header push"> <button onClick={this.toggleSidebar} className="menu-btn">
          <i className="zmdi zmdi-menu" /></button> <a href="/"><img src="images/logo.png" /></a></header>
        {/* Pushy Menu */}
        <nav className="pushy pushy-left" data-focus="#first-link">
          <div className="pushy-content">
            <ul>
              <li className="pushy-link"><a href="/">Home</a></li>
              <li className={"pushy-submenu " + (this.state.activeTab === "services" ? "pushy-submenu-open" : "pushy-submenu-closed")} onClick={() => this.toggleClass("services")} >
                <button>Services</button>
                <ul>
                  <li className="pushy-link"><a href="#">For builders and developers</a></li>
                  <li className="pushy-link"><a href="#">For buyers and sellers</a></li>
                  <li className="pushy-link"><a href="#">For investors</a></li>
                </ul>
              </li>
              <li className={"pushy-submenu " + (this.state.activeTab === "New projects" ? "pushy-submenu-open" : "pushy-submenu-closed")} onClick={() => this.toggleClass("New projects")}>
                <button>New projects</button>
                <ul>
                  <li className="pushy-link heading">
                    <b className="sub-heading">Property type</b>
                    <div className="control-group-nav">
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox22" click={() => this.handleFilter("Commercial")} inputClass="custom-control-input black" name="Commercial" check={this.props.filterProperty.name === "Commercial" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox33" click={() => this.handleFilter("Condos")} inputClass="custom-control-input black" name="Condos" check={this.props.filterProperty.name === "Condos" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox55" click={() => this.handleFilter("Townhouse")} inputClass="custom-control-input black" name="Townhouse" check={this.props.filterProperty.name === "Townhouse" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox44" click={() => this.handleFilter("Detached")} inputClass="custom-control-input black" name="Detached" check={this.props.filterProperty.name === "Detached" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                    </div>
                    <b className="sub-heading">City</b>
                    <div className="control-group-nav">
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox66" click={() => this.handleCity("Burnaby")} inputClass="custom-control-input black" name="Burnaby" check={this.state.city === "Burnaby" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox77" click={() => this.handleCity("Coquitlam")} inputClass="custom-control-input black" name="Coquitlam" check={this.state.city === "Coquitlam" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox77" click={() => this.handleCity("New Westminster")} inputClass="custom-control-input black" name="New Westminster" check={this.state.city === "New Westminster" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox99" click={() => this.handleCity("North Delta")} inputClass="custom-control-input black" name="North Delta" check={this.state.city === "North Delta" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                      <div className="custom-control custom-checkbox black">
                        <CheckBox id="customCheckBox81" click={() => this.handleCity("Richmond")} inputClass="custom-control-input black" name="Richmond" check={this.state.city === "Richmond" ? true : false} labelClass="custom-control-label pt-1 text-normal" />

                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className={"pushy-submenu " + (this.state.activeTab === "MLS search" ? "pushy-submenu-open" : "pushy-submenu-closed")} onClick={() => this.toggleClass("MLS search")}>
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
              <li className={"pushy-submenu " + (this.state.activeTab === "Projects" ? "pushy-submenu-open" : "pushy-submenu-closed")} onClick={() => this.toggleClass("Projects")}>
                <button>Projects</button>
                <ul>
                  <Link to="/project-list" className="pushy-link">Project list</Link>
                  <Link to="/add-attached" className="pushy-link">Add attached project</Link>
                  <Link to="/add-detached" className="pushy-link">Add detached project</Link>

                </ul>
              </li>
              <li className={"pushy-submenu " + (this.state.activeTab === "Developers" ? "pushy-submenu-open" : "pushy-submenu-closed")} onClick={() => this.toggleClass("Developers")}>
                <button> Developers</button>
                <ul>
                  <li className="pushy-link"><a href="/developer-list">Developers list</a></li>
                  <li className="pushy-link"><a href="/add-developer">Add developer</a></li>


                </ul>
              </li>

              <li className="pushy-link"><a href="/admin">Admin</a></li>
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

const mapStateToProps = (state) => {
  return {
    addProject: state.addProject,
    projects: state.projects,
    filterProperty: state.filterProperty
  }
}

export default connect(mapStateToProps, {
  getProjects: apiCallAction.getProjects,
  delProject: apiCallAction.delProject,
  filPro: apiCallAction.filterProperty
})(AdminContainers)