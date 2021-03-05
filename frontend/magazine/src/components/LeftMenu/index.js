import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../../actions'
import { generatePublicUrl } from '../../urlConfig'




const LeftMenu = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const { user } = auth

    const logout = (e) => {
        e.preventDefault()
        dispatch(signOut())
    }

    return (
        <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
            <div className="brand-logo">
                <a href="/">
                    <img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
                    <h5 className="logo-text">Magazine</h5></a>
            </div>

            <div className="user-details">
                <div className="media align-items-center user-pointer collapsed" data-toggle="collapse" data-target="#user-dropdown">
                    <div className="avatar">
                        <img src={user.profilePicture.length ?
                            generatePublicUrl(user.profilePicture[0].img) :
                            "https://via.placeholder.com/110x110"}
                            className="mr-3 side-user-img" alt="user avatar"
                        />
                    </div>
                    <div className="media-body">
                        <h6 className="side-user-name">{user.firstName + " " + user.lastName}</h6>
                    </div>  
                </div>
                <div id="user-dropdown" className="collapse">
                    <ul className="user-setting-menu">
                        <li><NavLink to="/profile" className="waves-effect"><i className="icon-user"></i>  My Profile</NavLink></li>
                        <li><a href="#"><i className="icon-settings"></i> Setting</a></li>
                        <li><a href="login" onClick={logout}><i className="icon-power"></i> Logout</a></li>
                    </ul>
                </div>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-header">MAIN NAVIGATION</li>
                <li>
                    <NavLink to="/" className="waves-effect">
                        <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contribution" className="waves-effect">
                        <i className="fa fa-book"></i> <span>Contribution</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="waves-effect">
                        <i className="fa fa-exclamation-circle"></i> <span>About</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftMenu
