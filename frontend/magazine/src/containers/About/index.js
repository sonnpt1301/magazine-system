import React from 'react'
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
                                <p class="text-white">All comments from you will be recognized and used by us to continuously improve and improve service quality.</p>
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
                                    <a href="/" onClick={(e) => { e.preventDefault() }} class="btn btn-light btn-round m-1">Go To Home </a>
                                    <a href="javascript:void();" class="btn btn-light btn-round m-1">Previous Page </a>
                                </div>

                                <div class="mt-4">
                                    <p class="text-white">Magazine System © 2021 Thai Son | All rights reserved.</p>
                                </div>
                                <hr class="w-50 border-light" />
                                <div class="mt-2">
                                    <a href="javascript:void()" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-facebook"></i></a>
                                    <a href="javascript:void()" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-google-plus"></i></a>
                                    <a href="javascript:void()" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-behance"></i></a>
                                    <a href="javascript:void()" class="btn-social btn-social-circle waves-effect waves-light m-1"><i class="fa fa-dribbble"></i></a>
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
