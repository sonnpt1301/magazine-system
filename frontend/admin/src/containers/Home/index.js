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
        </Layout>
    )
}

export default Home
