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
    // set time out 
    if (auth.authenticating) {
        return (
            <Spinner className="spinner" animation="border" variant="primary" />
        )
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <div>
            <div class="card card-authentication1 mx-auto my-5">
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="text-center">
                            <img src="assets/images/logo-icon.png" alt="logo icon" />
                        </div>
                        <div class="card-title text-uppercase text-center py-3">Sign In</div>
                        <form onSubmit={userLogin}>
                            <div class="form-group">
                                <label for="exampleInputUsername" class="sr-only">Username</label>
                                <div class="position-relative has-icon-right">
                                    <input type="text" id="exampleInputUsername" class="form-control input-shadow" placeholder="Enter Username"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword" class="sr-only">Password</label>
                                <div class="position-relative has-icon-right">
                                    <input type="password" id="exampleInputPassword" class="form-control input-shadow" placeholder="Enter Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-6">
                                    <div class="icheck-material-white">
                                        <input type="checkbox" id="user-checkbox" checked="" />
                                        <label for="user-checkbox">Remember me</label>
                                    </div>
                                </div>
                                <div class="form-group col-6 text-right">
                                    <a href="authentication-reset-password.html">Reset Password</a>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-light btn-block" onClick={() => { }}>Sign In</button>
                            <div class="text-center mt-3">Sign In With</div>

                            <div class="form-row mt-4">
                                <div class="form-group mb-0 col-6">
                                    <button type="button" class="btn btn-light btn-block"><i class="fa fa-facebook-square"></i> Facebook</button>
                                </div>
                                <div class="form-group mb-0 col-6 text-right">
                                    <button type="button" class="btn btn-light btn-block"><i class="fa fa-twitter-square"></i> Twitter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card-footer text-center py-3">
                    <p class="text-warning mb-0">Do not have an account? <a href="authentication-signup.html"> Sign Up here</a></p>
                </div>
            </div>


        </div>
    )
}

export default Login
