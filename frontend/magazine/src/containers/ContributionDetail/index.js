import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFile } from '../../actions'
import Layout from '../../components/Layout'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'
const ContributionDetail = (props) => {

    const dispatch = useDispatch()
    const contribution = useSelector(state => state.contribution)
    const [id, setId] = useState(props.location.state._id)

    const _downloadFile = (fileName, contributionId, fileId) => {
        const params = { fileName, contributionId, fileId }
        dispatch(downloadFile(params))
    }

    const handleShowContributionDetail = (id) => {
        setId(id)
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [id])


    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            {
                                contribution.allContributions.filter(contr => contr._id === id).map(contr => (
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <div><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" /></div>
                                                <span><h5 className="mt-0 mb-1 ml-1">{contr.user_info.firstName + " " + contr.user_info.lastName}</h5></span>
                                            </div>

                                            <img className="rounded" style={{ height: '100%', width: '100%' }} src={generatePublicUrl(contr.contributionImage[0].img)} alt="user avatar" />
                                            <ul className="list-unstyled">
                                                <li className="media">
                                                    <div className="media-body">
                                                        <h4 style={{ marginBottom: 0 }}>{contr.title}</h4>
                                                        <div style={{ paddingBottom: '25px' }}><small style={{ color: 'rgb(172 170 170)' }}>{moment(contr.createdAt).fromNow()}</small></div>
                                                        <p>{contr.description}</p>
                                                        {
                                                            contr.filesUpload.map((file) => (
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div style={{ cursor: 'pointer' }} onClick={() => { _downloadFile(file.fileName, contr._id, file._id) }}>{file.fileName} <i aria-hidden="true" className="fa fa-download pull-right"></i> </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-4 outer-other-contribution">
                            {
                                contribution.allContributions.filter(contr => contr.is_public === true).map(contr => (
                                    <div class="card-deck">
                                        <div class="card" style={{ cursor: 'pointer' }} onClick={() => handleShowContributionDetail(contr._id)}>
                                            <img class="card-img-top" src={contr.contributionImage[0].img} alt="Contribution background" />
                                            <div class="card-body">
                                                <h4 class="card-title" style={{ marginBottom: 0 }}>{contr.user_info.firstName + " " + contr.user_info.lastName}</h4>
                                                <div style={{ paddingBottom: '25px' }}><small style={{ color: 'rgb(172 170 170)' }}>{moment(contr.createdAt).fromNow()}</small></div>
                                                <h5 class="card-title">{contr.title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ContributionDetail
