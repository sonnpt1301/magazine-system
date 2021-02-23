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
        return (<Redirect to={`/`} />)
    }


    return (
        <div>
            <div className="card card-authentication1 mx-auto my-5">
                <div className="card-body">
                    <div className="card-content p-2">
                        <div className="text-center">
                            <img src="assets/images/logo-icon.png" alt="logo icon" />
                        </div>
                        <div className="card-title text-uppercase text-center py-3">Sign In</div>
                        <form onSubmit={userLogin}>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername" className="sr-only">Username</label>
                                <div className="position-relative has-icon-right">
                                    <input type="text" id="exampleInputUsername" className="form-control input-shadow" placeholder="Enter Username"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="form-control-position">
                                        <i className="icon-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword" className="sr-only">Password</label>
                                <div className="position-relative has-icon-right">
                                    <input type="password" id="exampleInputPassword" className="form-control input-shadow" placeholder="Enter Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="form-control-position">
                                        <i className="icon-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-light btn-block" onClick={() => { }}>Sign In</button>
                        </form>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Login
