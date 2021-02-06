import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import Input from '../../components/UI/Input'
import background from '../../images/photo-1612169258149-cf4172d7c224.jfif';
import { login } from '../../actions'
import { Redirect } from 'react-router-dom'

import './style.css';
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const userLogin = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        console.log(user)
        dispatch(login(user))
    }

    if (auth.authenticating) {
        return (
            <Spinner className="spinner" animation="border" variant="primary" />
        )
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <>
            <Row className="login-row">
                <Col className="login-col" sm={9}>
                    <img className="background-img" src={background} alt="" />
                </Col>
                <Col style={{ backgroundColor: '#24292e' }} sm={3}>
                    <div className="logo">
                        <h1><span style={{ fontSize: '5rem' }}>M</span>aga<span style={{ color: '#34ee4c' }}>zine</span></h1>
                        <div className="form-login">
                            <Form style={{ width: '100%' }} onSubmit={userLogin}>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit" onClick={() => { }} className="btn btn-dark btn-lg btn-block">Sign in</button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default Login
