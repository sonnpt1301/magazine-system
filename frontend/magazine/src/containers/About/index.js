import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../../components/Layout'

const About = () => {
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center coming-soon">

                                <h4 class="coming-soon-title text-white">THANKS FOR USING OUR SERVICES</h4>
                                <h6 class="text-white text-uppercase">Lets Join and work with us</h6>
                                <p class="text-white"><i>All feedbacks from you will be recognized and used by us to continuously improve service quality.</i></p>
                                <address>
                                    <strong>University of Greenwich</strong><br />
                                                15 Dong Quan<br />
                                                Quan Hoa, Cau Giay<br />
                                                Phone: 0355832199<br />
                                                Email: sonnptgch17274@fpt.edu.vn
                                                </address>
                                <form class="form-inline justify-content-center py-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Enter your email...." />
                                        <div class="input-group-append">
                                            <button class="btn btn-light" type="button">Subscribe</button>
                                        </div>
                                    </div>
                                </form>

                                <div class="mt-4">
                                    <NavLink to='/' className="waves-effect">
                                        <button class="btn btn-light btn-round m-1">
                                            <i className="fa fa-star mr-1"></i> <span>Go To Home</span>
                                        </button>
                                    </NavLink>
                                </div>

                                <div class="mt-4">
                                    <p class="text-white">Magazine System © 2021 Thai Son | All rights reserved.</p>
                                </div>
                                <hr class="w-50 border-light" />
                                <div class="mt-2">
                                    <a href="https://facebook.com/Jokerboy1412" target="_blank" rel="noopener noreferrer" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/jokerboy__1412/" target="_blank" rel="noopener noreferrer" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-instagram"></i></a>
                                    <a href="https://www.youtube.com/channel/UCoNJe5xt8QNNoWGFfvLJEFQ" target="_blank" rel="noopener noreferrer" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default About
