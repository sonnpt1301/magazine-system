import React from 'react'
import { Carousel, Jumbotron, Button, Card, Nav } from 'react-bootstrap'
import Layout from '../../components/Layout'
import image1 from '../../images/photo-1610985987459-14d60a983f99.jfif'
import image2 from '../../images/photo-1611858368635-e79fc2a7fd77.jfif'
import './style.css'
const Home = (props) => {
    return (
        <Layout>
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href="#first">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            <br></br>
            <Card border="success" style={{ width: '18rem' }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Layout>
    )
}

export default Home
