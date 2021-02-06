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
                <NavLink to="login" className="nav-link">Log in</NavLink>
            </Nav>
        )
    }

    const renderLoggedIn = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="profile" className="nav-link">{user.lastName}</NavLink>
                </li>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Log out</span>
                </li>
            </Nav>
        )
    }


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}    
                </Nav>
                {
                    auth.authenticate ? renderLoggedIn() : renderNonLogin()
                }
            </Navbar>

        </>
    )
}

export default Header
