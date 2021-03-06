import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Layout from '../../components/Layout'
import './style.css'
import moment from 'moment'
import { downloadFile } from '../../actions'

const Home = (props) => {

    const contribution = useSelector(state => state.contribution)
    const [contributions, setContributions] = useState(contribution.allContributions)
    const dispatch = useDispatch()

    const _downloadFile = (fileName, contributionId, fileId) => {
        const params = { fileName, contributionId, fileId }
        dispatch(downloadFile(params))
    }

    useEffect(() => {
        setContributions(contribution.allContributions)
    }, [contribution.allContributions])

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-lg-12">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100" style={{ height: '500px' }}
                                        src="https://magazine-system.s3-ap-southeast-1.amazonaws.com/1614969064731-313.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100" style={{ height: '500px' }}
                                        src="https://magazine-system.s3-ap-southeast-1.amazonaws.com/1614969359476-sell-digital-magazine.png"
                                        alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100" style={{ height: '500px' }}
                                        src="https://magazine-system.s3-ap-southeast-1.amazonaws.com/1614969065842-7c8ce152836901.591f7981c7ab3.png"
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                            <br />
                            <h6 class="text-uppercase">All Contributions</h6>
                            <hr />
                            <div class="row">

                                {
                                    contributions.filter(contr => contr.is_public === true).map(contr => (
                                        <div class="col-sm-4">
                                            <div class="card-deck">
                                                <div class="card" style={{ cursor: 'pointer' }}>
                                                    <img class="card-img-top" src={contr.contributionImage[0].img} alt="Contribution background" style={{ height: '360px' }} />
                                                    <div class="card-body">
                                                        <h4 class="card-title" style={{ marginBottom: 0 }}>{contr.user_info.firstName + " " + contr.user_info.lastName}</h4>
                                                        <div style={{ paddingBottom: '25px' }}><small style={{ color: 'rgb(172 170 170)' }}>{moment(contr.createdAt).fromNow()}</small></div>
                                                        <h5 class="card-title">{contr.title}</h5>
                                                    </div>
                                                    <div class="card-footer">
                                                        <NavLink to={{
                                                            pathname: 'contribution-detail',
                                                            state: { _id: contr._id }
                                                        }}
                                                            className="waves-effect">
                                                            <button class="btn btn-light btn-sm text-white">
                                                                <i className="fa fa-star mr-1"></i> <span>Read more</span>
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Home
