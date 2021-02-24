import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../actions'

const Header = () => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(signOut())
    }

    const { user } = auth

    const renderNonLogin = () => {
        return (
            <Nav style={{ right: '0' }}>
                <NavLink to="login" classNameName="nav-link">Log in</NavLink>
            </Nav>
        )
    }

    const renderLoggedIn = () => {
        return (
            <Nav>
                <li classNameName="nav-item">
                    <NavLink to="profile" classNameName="nav-link">{user.lastName}</NavLink>
                </li>
                <li classNameName="nav-item">
                    <span classNameName="nav-link" onClick={logout}>Log out</span>
                </li>
            </Nav>
        )
    }


    return (
            <header className="topbar-nav">
                <nav className="navbar navbar-expand fixed-top">
                    <ul className="navbar-nav mr-auto align-items-center">
                        <li className="nav-item">
                            <a className="nav-link toggle-menu" href="#" onClick={(e) => e.preventDefault()}>
                                <i className="icon-menu menu-icon"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <form className="search-bar">
                                <input type="text" className="form-control" placeholder="Enter keywords" />
                                <a href="javascript:void();"><i className="icon-magnifier"></i></a>
                            </form>
                        </li>
                    </ul>

                    <ul className="navbar-nav align-items-center right-nav-link">
                        <li className="nav-item dropdown-lg">
                            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                                <i className="fa fa-envelope-open-o"></i><span className="badge badge-light badge-up">12</span></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        You have 12 new messages
          <span className="badge badge-light">12</span>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <div className="avatar"><img className="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">Jhon Deo</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                    <small>Today, 4:10 PM</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <div className="avatar"><img className="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">Sara Jen</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                    <small>Yesterday, 8:30 AM</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <div className="avatar"><img className="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">Dannish Josh</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                    <small>5/11/2018, 2:50 PM</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <div className="avatar"><img className="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">Katrina Mccoy</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet.</p>
                                                    <small>1/11/2018, 2:50 PM</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item text-center"><a href="javaScript:void();">See All Messages</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item dropdown-lg">
                            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                                <i className="fa fa-bell-o"></i><span className="badge badge-info badge-up">14</span></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        You have 14 Notifications
          <span className="badge badge-info">14</span>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <i className="zmdi zmdi-accounts fa-2x mr-3 text-info"></i>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">New Registered Users</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <i className="zmdi zmdi-coffee fa-2x mr-3 text-warning"></i>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">New Received Orders</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="javaScript:void();">
                                            <div className="media">
                                                <i className="zmdi zmdi-notifications-active fa-2x mr-3 text-danger"></i>
                                                <div className="media-body">
                                                    <h6 className="mt-0 msg-title">New Updates</h6>
                                                    <p className="msg-info">Lorem ipsum dolor sit amet...</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item text-center"><a href="javaScript:void();">See All Notifications</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item language">
                            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();"><i className="fa fa-flag"></i></a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li className="dropdown-item"> <i className="flag-icon flag-icon-gb mr-2"></i> English</li>
                                <li className="dropdown-item"> <i className="flag-icon flag-icon-fr mr-2"></i> French</li>
                                <li className="dropdown-item"> <i className="flag-icon flag-icon-cn mr-2"></i> Chinese</li>
                                <li className="dropdown-item"> <i className="flag-icon flag-icon-de mr-2"></i> German</li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">
                                <span className="user-profile"><img src="https://via.placeholder.com/110x110" className="img-circle" alt="user avatar" /></span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li className="dropdown-item user-details">
                                    <a href="javaScript:void();">
                                        <div className="media">
                                            <div className="avatar"><img className="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                                            <div className="media-body">
                                                <h6 className="mt-2 user-title">{user.lastName}</h6>
                                                <p className="user-subtitle">{user.email}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="dropdown-divider"></li>
                                <li className="dropdown-item"><a href=""><i className="icon-envelope mr-2"></i> Inbox</a></li>
                                <li className="dropdown-divider"></li>
                                <li className="dropdown-item"><a href=""><i className="icon-wallet mr-2"></i> Account</a></li>
                                <li className="dropdown-divider"></li>
                                <li className="dropdown-item"><a href=""><i className="icon-settings mr-2"></i> Setting</a></li>
                                <li className="dropdown-divider"></li>
                                <li className="dropdown-item"><a href="login" onClick={logout}><i className="icon-power mr-2"></i> Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
    )
}

export default Header
