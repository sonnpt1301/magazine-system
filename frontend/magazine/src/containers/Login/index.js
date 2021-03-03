import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { login } from '../../actions';
import './style.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const userLogin = (e) => {
        if (email === '' || password === '') {
            swal('Oops!', 'Please fill the bank', 'warning')
        }
        e.preventDefault()
        const user = {
            email,
            password
        }
        dispatch(login(user))
    }
    // set time out 
    if (auth.authenticating) {
        return (
            <Spinner className="spinner" style={{ position: 'fixed', top: '50%', left: '50%' }} animation="border" variant="primary" />
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
                                        defaultValue={email}
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
                                        defaultValue={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div class="form-control-position">
                                        <i class="icon-lock"></i>
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
