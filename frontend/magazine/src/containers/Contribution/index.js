import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, addContribution, downloadFile, publishContribution, updateContribution } from '../../actions/contribution.action'
import Layout from '../../components/Layout'
import Modal from '../../components/UI/Modal'
const Contribution = () => {

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const contribution = useSelector(state => state.contribution)
    const dispatch = useDispatch()
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fileUpload, setFileUpload] = useState([])
    const [updateFileUpload, setUpdateFileUpload] = useState([])
    const [allContribution, setAllContribution] = useState(contribution.allContributions)
    const [comment, setComment] = useState(contribution.comments)
    const [contributionId, setContributionId] = useState('')
    const [content, setContent] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const handleUploadFile = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            fileUpload.push(file[i])
            setFileUpload(
                fileUpload
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

    const _uploadFile = () => {
        const form = new FormData()
        form.append('title', title)
        form.append('description', description)
        for (let file of fileUpload) {
            form.append('filesUpload', file)
        }
        dispatch(addContribution(form))
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
    }

    const handleShowDetailModal = (id) => {
        const contribution = allContribution.find(x => x._id === id)
        setAuthor(contribution.user_info.lastName)
        setTitle(contribution.title)
        setDescription(contribution.description)
        setFileUpload(contribution.filesUpload)
        setContributionId(contribution._id)
    }

    const _publishContribution = () => {
        const body = { ids: [contributionId] }
        dispatch(publishContribution(body))
    }

    const _downloadFile = (fileName, id) => {
        const file = fileUpload.find(x => x._id === id)
        const fileId = file._id
        const params = { fileName, contributionId, fileId }
        dispatch(downloadFile(params))
    }

    const _addComment = (id) => {
        const params = { contributionId: id }
        const body = { content }
        dispatch(addComment(params, body)).then(() => setContent(''))
    }

    const handleCheckbox = () => {
        setCheckbox(!checkbox)
    }

    useEffect(() => {
        setAllContribution(contribution.allContributions)
        setComment(contribution.comments)
    }, [contribution.allContributions, contribution.comments])

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
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <form id="personal-info">
                                                <h4 className="form-header text-uppercase">
                                                    <i className="fa fa-user-circle-o"></i>
                                                Upload Contribution
                                                </h4>
                                                <div class="form-group row">
                                                    <label for="input-1" class="col-sm-2 col-form-label">Title</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" id="input-1" name={title} onChange={(e) => setTitle(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="input-9" class="col-sm-2 col-form-label">Description</label>
                                                    <div class="col-sm-10">
                                                        <textarea class="form-control" rows="4" id="input-9" name={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Select File</label>
                                                    <div className="col-sm-10">
                                                        <input type="file" className="form-control" name={fileUpload} multiple="multiple" onChange={handleUploadFile} required />
                                                    </div>
                                                </div>
                                                <div class="icheck-material-white">
                                                    <input type="checkbox" id="terms_and_conditions" onClick={handleCheckbox} />
                                                    <label for="terms_and_conditions">I have read and agree to Terms and Conditions</label>
                                                </div>
                                                <div className="form-footer">
                                                    <button type="submit" id="btn-upload" disabled={checkbox ? false : true} className="btn btn-success" onClick={_uploadFile}><i className="fa fa-check-square-o"></i> Upload</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* List Contribution */}
                            <div className="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-header text-uppercase">Contributions</div>
                                        <div class="card-body">
                                            {
                                                allContribution.filter((contr => contr.author === user._id && contr.facultyId === contr.user_info.facultyId)).map(contr =>
                                                (
                                                    <ul class="list-unstyled">
                                                        <li class="media">
                                                            <img class="mr-3 rounded" src="https://via.placeholder.com/110x110" alt="user avatar" />
                                                            <div class="media-body">
                                                                <h5 class="mt-0 mb-1">{contr.title}
                                                                    <span>
                                                                        <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right" onClick={(e) => { handleShowDetailModal(contr._id) }}><i className="fa fa-edit"></i></button>
                                                                    </span>
                                                                </h5>
                                                                <p>{contr.description}</p>
                                                                {
                                                                    contr.is_public ?
                                                                        <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                        <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                }
                                                                <hr />
                                                                <div class="card-header">Comments</div>
                                                                {
                                                                    comment.filter(cmt => cmt.contributionId === contr._id).map(cmt => (
                                                                        <div>
                                                                            <div class="card-body">
                                                                                <ul class="list-unstyled">
                                                                                    <li class="media">
                                                                                        <span class="user-profile"><img src="https://via.placeholder.com/110x110" class="img-circle user-profile" alt="user avatar" /></span>
                                                                                        <div class="media-body" style={{ height: '10px' }}>
                                                                                            <h5 class="mt-1 mb-1 ml-2">{user.lastName}</h5>
                                                                                            <p style={{ paddingLeft: '7px' }}>{cmt.content}</p>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </li>
                                                    </ul>
                                                )).reverse()
                                            }
                                        </div>
                                    </div>

                                    <Modal
                                        id={'detailModal'}
                                        modaltitle={'Contribution Detail'}
                                    >
                                        <div class="form-group row">
                                            <label for="input-1" class="col-sm-3 col-form-label">Title</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="input-1" defaultValue={title} onChange={(e) => setTitle(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="input-9" class="col-sm-3 col-form-label">Description</label>
                                            <div class="col-sm-9">
                                                <textarea class="form-control" rows="4" id="input-9" defaultValue={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Select File</label>
                                            <div className="col-sm-9">
                                                <input type="file" className="form-control" name={updateFileUpload} multiple="multiple" onChange={handleUpdateUploadFile} required />
                                            </div>
                                        </div>
                                        {
                                            fileUpload.map((file) => (
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div style={{ cursor: 'pointer' }} onClick={() => { _downloadFile(file.fileName, file._id) }}>{file.fileName} <i aria-hidden="true" class="fa fa-download pull-right"></i> </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-light px-5" onClick={() => { _updateContribution(contributionId) }} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Update</button>
                                        </div>
                                    </Modal>

                                </div>
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
            {user.role === 'coordinator' && (
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header text-uppercase">Contributions</div>
                                    <div class="card-body">
                                        {
                                            allContribution.filter(x => x.facultyId === user.facultyId).map(x =>
                                            (
                                                <ul class="list-unstyled">
                                                    <li class="media">
                                                        <img class="mr-3 rounded" src="https://via.placeholder.com/110x110" alt="user avatar" />
                                                        <div class="media-body">
                                                            <h5 class="mt-0 mb-1">{x.user_info.lastName}
                                                                <span>
                                                                    <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right" onClick={(e) => { handleShowDetailModal(x._id) }}><i className="fa fa-edit"></i></button>
                                                                </span>
                                                            </h5>
                                                            <p>{x.title}</p>
                                                            {
                                                                x.is_public ?
                                                                    <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                    <span className="badge badge-light shadow-light m-1">Pending</span>
                                                            }
                                                            <hr />
                                                            <div class="card-header">Comments</div>
                                                            {
                                                                comment.filter(cmt => cmt.contributionId === x._id).map(cmt => (
                                                                    <div>
                                                                        <div class="card-body">
                                                                            <ul class="list-unstyled">
                                                                                <li class="media">
                                                                                    <span class="user-profile"><img src="https://via.placeholder.com/110x110" class="img-circle user-profile" alt="user avatar" /></span>
                                                                                    <div class="media-body" style={{ height: '10px' }}>
                                                                                        <h5 class="mt-1 mb-1 ml-2">{user.lastName}</h5>
                                                                                        <p style={{ paddingLeft: '7px' }}>{cmt.content}</p>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                            <input type="text" class="form-control form-control-rounded mt-3"
                                                                placeholder="Write comment here..."
                                                                onChange={(e) => setContent(e.target.value)}
                                                                onKeyPress={event => event.key === 'Enter' && _addComment(x._id)}
                                                            >
                                                            </input>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )).reverse()
                                        }
                                    </div>
                                </div>
                                <Modal
                                    id={'detailModal'}
                                    modaltitle={'Contribution Detail'}
                                >
                                    <h4 className="mb-0">{author}</h4>
                                    <h4 className="mb-0">{title}</h4>
                                    <br />
                                    <p>{description}</p>
                                    {
                                        fileUpload.map((file) => (
                                            <div class="card">
                                                <div class="card-body">
                                                    <div style={{ cursor: 'pointer' }} onClick={() => { _downloadFile(file.fileName, file._id) }}>{file.fileName} <i aria-hidden="true" class="fa fa-download pull-right"></i> </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-light px-5" onClick={_publishContribution} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Publish</button>
                                    </div>
                                </Modal>
                            </div>
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

                                {
                                    allContribution.filter(contr => contr.is_public === true).map(contr => (
                                        <div class="col-lg-4">
                                            <div class="card">
                                                <div class="card-header text-uppercase">Contributions</div>
                                                <div class="card-body">
                                                    <ul class="list-unstyled">
                                                        <li class="media">
                                                            <img class="mr-3 rounded" src="https://via.placeholder.com/110x110" alt="user avatar" />
                                                            <div class="media-body">
                                                                <h5 class="mt-0 mb-1">{contr.user_info.lastName}
                                                                    <span>
                                                                        <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right"
                                                                            onClick={(e) => { handleShowDetailModal(contr._id) }}><i className="fa fa-edit"></i></button>
                                                                    </span>
                                                                </h5>
                                                                <p>{contr.title}</p>
                                                                {
                                                                    contr.is_public ?
                                                                        <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                        <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                }
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        <Modal
                            id={'detailModal'}
                            modaltitle={'Contribution Detail'}
                        >
                            <h4 className="mb-0">{author}</h4>
                            <h4 className="mb-0">{title}</h4>
                            <br />
                            <p>{description}</p>
                            {
                                fileUpload.map((file) => (
                                    <div class="card">
                                        <div class="card-body">
                                            <div style={{ cursor: 'pointer' }} onClick={() => { _downloadFile(file.fileName, file._id) }}>{file.fileName} <i aria-hidden="true" class="fa fa-download pull-right"></i> </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Modal>
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

                                {
                                    allContribution.filter(contr => contr.is_public === true && contr.facultyId === user.facultyId).map(contr => (
                                        <div class="col-lg-4">
                                            <div class="card">
                                                <div class="card-header text-uppercase">Contributions</div>
                                                <div class="card-body">
                                                    <ul class="list-unstyled">
                                                        <li class="media">
                                                            <img class="mr-3 rounded" src="https://via.placeholder.com/110x110" alt="user avatar" />
                                                            <div class="media-body">
                                                                <h5 class="mt-0 mb-1">{contr.user_info.lastName}
                                                                    <span>
                                                                        <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right"
                                                                            onClick={(e) => { handleShowDetailModal(contr._id) }}><i className="fa fa-edit"></i></button>
                                                                    </span>
                                                                </h5>
                                                                <p>{contr.title}</p>
                                                                {
                                                                    contr.is_public ?
                                                                        <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                        <span className="badge badge-light shadow-light m-1">Pending</span>
                                                                }
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        <Modal
                            id={'detailModal'}
                            modaltitle={'Contribution Detail'}
                        >
                            <h4 className="mb-0">{author}</h4>
                            <h4 className="mb-0">{title}</h4>
                            <br />
                            <p>{description}</p>
                            {
                                fileUpload.map((file) => (
                                    <div class="card">
                                        <div class="card-body">
                                            <div style={{ cursor: 'pointer' }} onClick={() => { _downloadFile(file.fileName, file._id) }}>{file.fileName} <i aria-hidden="true" class="fa fa-download pull-right"></i> </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Modal>
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
