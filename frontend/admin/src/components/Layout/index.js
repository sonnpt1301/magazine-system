import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../Footer'
import Header from '../Header'
import LeftMenu from '../LeftMenu'
import './style.css'

const Layout = (props) => {
    return (
        <div>
            <Header />
            <LeftMenu />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout