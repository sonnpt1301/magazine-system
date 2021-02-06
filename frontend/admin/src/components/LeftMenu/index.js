import React from 'react'
import { Button, Container, Form, FormControl, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
const LeftMenu = () => {
    return (
        <>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                {/* <Button variant="outline-info">Search</Button> */}
            </Form>
            <Nav defaultActiveKey="/home" className="flex-column">
                <NavLink to="" className="nav-link">Home</NavLink>
                <NavLink to="faculty" className="nav-link">Faculty</NavLink>
                <NavLink to="contribution" className="nav-link">Contribution</NavLink>
                <NavLink to="profile" className="nav-link">Profile</NavLink>
            </Nav>
        </>
    )
}

export default LeftMenu
