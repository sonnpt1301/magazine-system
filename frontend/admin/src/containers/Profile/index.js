import React from 'react'
import { Button, Col, Figure, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import avatar from '../../images/blog-sample.jpg'
const Profile = () => {
    const auth = useSelector(state => state.auth)
    const { user } = auth

    return (
        <Layout>
            <Row>
                <Col sm={4}>
                    <Figure>
                        <Figure.Image
                            width={300}
                            height={180}
                            alt="171x180"
                            src={avatar}
                        />
                        <Figure.Caption>
                            {user.lastName}
                        </Figure.Caption>
                    </Figure>
                </Col>
                <Col sm={8}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                </Button>
                    </Form>
                </Col>
            </Row>
        </Layout>
    )
}

export default Profile
