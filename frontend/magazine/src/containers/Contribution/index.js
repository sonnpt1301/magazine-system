import React, { useState, useEffect, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { addComment, addContribution, downloadFile, publishContribution, updateContribution } from '../../actions/contribution.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'
import moment from 'moment'
import { io } from "socket.io-client"

let socket;

const Contribution = () => {

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const contribution = useSelector(state => state.contribution)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fileUpload, setFileUpload] = useState([])
    const [title1, setTitle1] = useState('')
    const [description1, setDescription1] = useState('')
    const [fileUpload1, setFileUpload1] = useState([])
    const [backgroundContribution, setBackgroundContribution] = useState([])
    const [updateFileUpload, setUpdateFileUpload] = useState([])
    const [allContribution, setAllContribution] = useState(contribution.allContributions)
    const [comment, setComment] = useState(contribution.comments)
    const [contributionId, setContributionId] = useState('')
    const [content, setContent] = useState([])
    const [checkbox, setCheckbox] = useState(false)



    const handleUploadFile = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            fileUpload1.push(file[i])
            setFileUpload(
                fileUpload1
            )
        }
    }


    const handleUploadBg = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            backgroundContribution.push(file[i])
            setBackgroundContribution(
                backgroundContribution
            )
        }
    }

    const handleUpdateUploadFile = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            updateFileUpload.push(file[i])
            setUpdateFileUpload(
                updateFileUpload
            )
        }
    }

    const _uploadFile = (e) => {
        e.preventDefault()
        if (title1 === '' || description1 === '' || fileUpload1 === []) {
            return swal('Oops!', 'Please fill the bank', 'warning')
        }
        const form = new FormData()
        form.append('title', title1)
        form.append('description', description1)
        for (let file of fileUpload1) {
            form.append('filesUpload', file)
        }
        for (let file of backgroundContribution) {
            form.append('contributionImage', file)
        }
        dispatch(addContribution(form))
        setTitle1('')
        setDescription1('')
        setFileUpload1([])
        setBackgroundContribution([])
        setCheckbox(!checkbox)
    }

    const _updateContribution = (id) => {
        const form = new FormData()
        const params = { id }
        form.append('title', title)
        form.append('description', description)
        for (let file of updateFileUpload) {
            form.append('filesUpload', file)
        }
        dispatch(updateContribution(params, form))
        setUpdateFileUpload([])
    }

    const handleShowDetailModal = (id) => {
        const contribution = allContribution.find(x => x._id === id)
        setTitle(contribution.title)
        setDescription(contribution.description)
        setFileUpload(contribution.filesUpload)
        setContributionId(contribution._id)
    }

    const _publishContribution = (contributionId) => {
        const body = { ids: [contributionId] }
        dispatch(publishContribution(body))
    }

    const _downloadFile = (fileName, contributionId, fileId) => {
        const params = { fileName, contributionId, fileId }
        dispatch(downloadFile(params))
    }

    const _addComment = (index, id) => {
        const params = { contributionId: id }
        const body = { content: getCommentByIndex(index) }
        dispatch(addComment(params, body))

        const newArr = content.filter(cmt => cmt.id !== index)
        setContent(newArr)
    }

    const handleCheckbox = () => {
        setCheckbox(!checkbox)
    }

    const getCommentByIndex = (index) => content.find(({ id }) => id === index)?.value || ''

    const onChangeComment = (id, value) => {
        const comment = getCommentByIndex(id)
        const newComment = comment ? content.map(cmt => cmt.id === id ? { id, value } : cmt) : content.concat({ id, value })

        setContent(newComment)
    }

    const onDeleteComment = (index) => {
        const comment = getCommentByIndex(index)
        if (!comment) {
            const newArr = content.filter(cmt => cmt.id !== index)
            setContent(newArr)
        }
    }

    useEffect(() => {
        setAllContribution(contribution.allContributions)
        setComment(contribution.comments)
    }, [contribution.allContributions, contribution.comments])


    if (contribution.load) {
        return <Spinner className="spinner" style={{ position: 'fixed', top: '50%', left: '50%' }} animation="border" variant="primary" />
    }

    return (
        <Layout>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Start Student Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {
                user.role === 'student' && (
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <button type="button" className="btn btn-light waves-effect waves-light m-1" data-toggle="modal" data-target="#uploadModal">Upload Contribution</button>
                                    <Modal id='uploadModal' modaltitle='Upload contribution'>
                                        <Input
                                            label='Title'
                                            value={title1}
                                            onChange={(e) => setTitle1(e.target.value)}
                                            required
                                        />
                                        <Input
                                            type='textarea'
                                            row='5'
                                            label='Description'
                                            value={description1}
                                            onChange={(e) => setDescription1(e.target.value)}
                                            required
                                        />
                                        <Input
                                            label='Select background'
                                            type='file'
                                            name={backgroundContribution}
                                            onChange={handleUploadBg}
                                            multiple="multiple"
                                            required
                                        />
                                        <Input
                                            label='Select File'
                                            type='file'
                                            name={fileUpload1}
                                            onChange={handleUploadFile}
                                            multiple="multiple"
                                            required
                                        />
                                        <div className="icheck-material-white">
                                            <input type="checkbox" id="terms_and_conditions" onClick={handleCheckbox} />
                                            <label for="terms_and_conditions">I have read and agree to Terms and Conditions</label>
                                        </div>
                                        <div className="form-footer">
                                            <button type="submit" id="btn-upload" disabled={checkbox ? false : true} data-dismiss="modal" aria-label="Close" aria-hidden="true" className="btn btn-success"
                                                onClick={_uploadFile}><i className="fa fa-check-square-o"></i> Upload</button>
                                        </div>
                                    </Modal>
                                </div>
                            </div>

                            {/* List Contribution */}
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-6">
                                    {
                                        allContribution.filter((contr => contr.author === user._id && contr.facultyId === contr.user_info.facultyId)).map((contr, index) =>
                                        (
                                            <div className="card">
                                                <div className="card-body">
                                                    <img className="rounded" style={{ height: '100%', width: '100%' }} src={generatePublicUrl(contr.contributionImage[0].img)} alt="user avatar" />
                                                    <ul className="list-unstyled" key={index}>
                                                        <li className="media">
                                                            <div className="media-body">
                                                                <h5 className="mt-0 mb-0">{contr.title}
                                                                    {
                                                                        contr.is_public ?
                                                                            <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                            <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                    }
                                                                    <span>
                                                                        <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right"
                                                                            onClick={(e) => handleShowDetailModal(contr._id)}><i className="fa fa-edit"></i>
                                                                        </button>
                                                                    </span>
                                                                </h5>
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
                                                                <hr />
                                                                <input type="text" className="form-control form-control-rounded mt-3"
                                                                    placeholder="Write comment here..."
                                                                    value={getCommentByIndex(index)}
                                                                    onChange={(e) => onChangeComment(index, e.target.value)}
                                                                    onKeyUp={event => event.key === 'Enter' ? _addComment(index, contr._id) : (event.key === 'Backspace' && onDeleteComment(index))}
                                                                />
                                                                <hr />
                                                                <div>
                                                                    {
                                                                        comment.filter(cmt => cmt.contributionId === contr._id).map(cmt => (
                                                                            <div>
                                                                                <div className="user-profile" style={{ display: 'flex', marginTop: '10px' }}><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" />
                                                                                    <div className="card ml-1" style={{ borderRadius: '15px', marginBottom: '0' }}>
                                                                                        <div className="card-body" style={{ padding: '5px 10px' }}>
                                                                                            <div className="list-unstyled">
                                                                                                <div className="media">
                                                                                                    <div className="media-body">
                                                                                                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{cmt.user_info.lastName}</div>
                                                                                                        <div style={{ wordBreak: 'break-all' }} >
                                                                                                            {cmt.content}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div><small style={{ marginLeft: '50px', color: 'rgb(172 170 170)' }}>{moment(cmt.createdAt).fromNow()}</small></div>
                                                                            </div>
                                                                        )).reverse()
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )).reverse()
                                    }
                                    <Modal
                                        id={'detailModal'}
                                        modaltitle={'Contribution Detail'}
                                    >
                                        <Input
                                            label='Title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                        <Input
                                            type='textarea'
                                            row='5'
                                            label='Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />

                                        <Input
                                            label='Select File'
                                            type='file'
                                            name={updateFileUpload}
                                            onChange={handleUpdateUploadFile}
                                            multiple="multiple"
                                            required
                                        />
                                        {
                                            fileUpload.map((file) => (
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div style={{ cursor: 'pointer' }} onClick={() => { _downloadFile(file.fileName, contributionId, file._id) }}>{file.fileName} <i aria-hidden="true" className="fa fa-download pull-right"></i> </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-light px-5" onClick={() => { _updateContribution(contributionId) }} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Update</button>
                                        </div>
                                    </Modal>

                                </div>
                                <div className="col-lg-3"></div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* End Student Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Start Coordinator Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {
                user.role === 'coordinator' && (
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-6">
                                    {
                                        allContribution.filter(x => x.facultyId === user.facultyId).map((contr, index) =>
                                        (
                                            <div className="card" key={index}>
                                                <div className="card-body" >
                                                    <ul className="list-unstyled" >
                                                        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                            <div><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" /></div>
                                                            <span><h5 className="mt-0 mb-1 ml-1">{contr.user_info.lastName}</h5></span>
                                                        </div>

                                                        <img className="rounded" style={{ height: '100%', width: '100%' }} src={generatePublicUrl(contr.contributionImage[0].img)} alt="user avatar" />
                                                        <li className="media">
                                                            <div className="media-body">
                                                                {
                                                                    contr.is_public === false ?
                                                                        <span>
                                                                            <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right"
                                                                                onClick={(e) => { _publishContribution(contr._id) }}>Publish
                                                                    </button>
                                                                        </span> : null
                                                                }
                                                                <h4>{contr.title}
                                                                    {
                                                                        contr.is_public ?
                                                                            <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                            <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                    }
                                                                </h4>
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
                                                                <hr />
                                                                <input type="text" className="form-control form-control-rounded mt-3"
                                                                    placeholder="Write comment here..."
                                                                    value={getCommentByIndex(index)}
                                                                    onChange={(e) => onChangeComment(index, e.target.value)}
                                                                    onKeyUp={event => event.key === 'Enter' ? _addComment(index, contr._id) : (event.key === 'Backspace' && onDeleteComment(index))}
                                                                />
                                                                <hr />
                                                                <div>
                                                                    {
                                                                        comment.filter(cmt => cmt.contributionId === contr._id).map(cmt => (
                                                                            <div>
                                                                                <div className="user-profile" style={{ display: 'flex', marginTop: '10px' }}><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" />
                                                                                    <div className="card ml-1" style={{ borderRadius: '15px', marginBottom: '0' }}>
                                                                                        <div className="card-body" style={{ padding: '5px 10px' }}>
                                                                                            <div className="list-unstyled">
                                                                                                <div className="media">
                                                                                                    <div className="media-body">
                                                                                                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{cmt.user_info.lastName}</div>
                                                                                                        <div style={{ wordBreak: 'break-all' }} >
                                                                                                            {cmt.content}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div><small style={{ marginLeft: '50px', color: 'rgb(172 170 170)' }}>{moment(cmt.createdAt).fromNow()}</small></div>
                                                                            </div>
                                                                        )).reverse()
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )).reverse()
                                    }
                                </div>
                                <div className="col-lg-3"></div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* End Coordinator Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Start Manager Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {
                user.role === 'manager' && (
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-6">

                                    {
                                        allContribution.filter(contr => contr.is_public === true).map(contr => (
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                        <div><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" /></div>
                                                        <span><h5 className="mt-0 mb-1 ml-1">{contr.user_info.lastName}</h5></span>
                                                    </div>

                                                    <img className="rounded" style={{ height: '100%', width: '100%' }} src={generatePublicUrl(contr.contributionImage[0].img)} alt="user avatar" />
                                                    <ul className="list-unstyled">
                                                        <li className="media">
                                                            <div className="media-body">
                                                                <h4>{contr.title}
                                                                    {
                                                                        contr.is_public ?
                                                                            <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                            <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                    }
                                                                </h4>
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
                                <div className="col-lg-3"></div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* End Manager Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}


            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Start Guest Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            {
                user.role === 'guest' && (
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-6">
                                    {
                                        allContribution.filter(contr => contr.is_public === true && contr.facultyId === user.facultyId).map(contr => (
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                        <div><img src="https://via.placeholder.com/110x110" className="img-circle user-profile" alt="user avatar" /></div>
                                                        <span><h5 className="mt-0 mb-1 ml-1">{contr.user_info.lastName}</h5></span>
                                                    </div>

                                                    <img className="rounded" style={{ height: '100%', width: '100%' }} src={generatePublicUrl(contr.contributionImage[0].img)} alt="user avatar" />
                                                    <ul className="list-unstyled">
                                                        <li className="media">
                                                            <div className="media-body">
                                                                <h4>{contr.title}
                                                                    {
                                                                        contr.is_public ?
                                                                            <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                            <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                    }
                                                                </h4>
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
                                <div className="col-lg-3"></div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* End Guest Display */}
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        </Layout >
    )
}

export default Contribution
