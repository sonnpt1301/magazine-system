import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../../actions'

const LeftMenu = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const { user } = auth

    const logout = () => {
        dispatch(signOut())
    }

    return (
        <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
            <div className="brand-logo">
                <a href="index.html">
                    <img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
                    <h5 className="logo-text">Magazine</h5></a>
            </div>

            <div className="user-details">
                <div className="media align-items-center user-pointer collapsed" data-toggle="collapse" data-target="#user-dropdown">
                    <div className="avatar"><img className="mr-3 side-user-img" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                    <div className="media-body">
                        <h6 className="side-user-name">{user.lastName}</h6>
                    </div>
                </div>
                <div id="user-dropdown" className="collapse">
                    <ul className="user-setting-menu">
                        <li><a href="javaScript:void();"><i className="icon-user"></i>  My Profile</a></li>
                        <li><a href="javaScript:void();"><i className="icon-settings"></i> Setting</a></li>
                        <li><a href="login" onClick={logout}><i className="icon-power"></i> Logout</a></li>
                    </ul>
                </div>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-header">MAIN NAVIGATION</li>
                <li>
                    <NavLink to="/" className="waves-effect">
                        <i className="zmdi zmdi-view-dashboard"></i> <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/faculty" className="waves-effect">
                        <i className="zmdi zmdi-view-dashboard"></i> <span>Faculty</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user" className="waves-effect">
                        <i className="zmdi zmdi-view-dashboard"></i> <span>User</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/term" className="waves-effect">
                        <i className="zmdi zmdi-view-dashboard"></i> <span>Term</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftMenu
