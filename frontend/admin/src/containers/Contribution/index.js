import React from 'react'
import { Card, Button, Row, Col, Form } from 'react-bootstrap'
import Layout from '../../components/Layout'

const Contribution = () => {
    return (
        <Layout>
            <Row>
                <Col sm={8}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Contribution Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter your contribution name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                className="position-relative"
                                required
                                name="file"
                                label="File"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Accept the Terms and Condition of Magazine System" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>

                <Col sm={4}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Statistic</Card.Title>
                            <Card.Text>
                                The contribution is approved: <span style={{ color: 'green' }}>12</span>
                            </Card.Text>
                            <Card.Text>
                                The contribution is approved: <span style={{ color: 'green' }}>12</span>
                            </Card.Text>
                            <Card.Text>
                                The contribution is approved: <span style={{ color: 'green' }}>12</span>
                            </Card.Text>
                            <Card.Text>
                                The contribution is approved: <span style={{ color: 'green' }}>12</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default Contribution
