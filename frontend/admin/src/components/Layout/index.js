import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Footer from '../Footer'
import Header from '../Header'
import LeftMenu from '../LeftMenu'
import './style.css'

const Layout = (props) => {
    return (
        <>
            <Header />
            <Container fluid="true">
                <Row>
                    <Col sm={2} >
                        <LeftMenu />
                    </Col>
                    <Col sm={10}>
                        {props.children}
                    </Col>
                </Row>
            </Container>
            {/* <Footer /> */}
        </>
    )
}

export default Layout