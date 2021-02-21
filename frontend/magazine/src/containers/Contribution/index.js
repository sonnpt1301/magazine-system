import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContribution, downloadFile, publishContribution } from '../../actions/contribution.action'
import Layout from '../../components/Layout'
import Modal from '../../components/UI/Modal'
const Contribution = () => {

    const auth = useSelector(state => state.auth)
    const { user } = auth
    const contribution = useSelector(state => state.contribution)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fileUpload, setFileUpload] = useState([])
    const [publicContribution, setPublicContribution] = useState(contribution.publicContributions)
    const [allContribution, setAllContribution] = useState(contribution.allContributions)
    const [contributionByFaculty, setContributionByFaculty] = useState(contribution.contributionByFaculties)
    const [contributionId, setContributionId] = useState('')


    const handleUploadFile = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            fileUpload.push(file[i])
            setFileUpload(
                fileUpload
            )
        }
    }

    const uploadFile = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('title', title)
        form.append('description', description)
        for (let file of fileUpload) {
            form.append('filesUpload', file)
        }
        dispatch(addContribution(form)).then(() => {
            setTitle('')
            setDescription('')
            setFileUpload([])
        })
    }

    const handleShowDetailModal = (id) => {
        const contribution = contributionByFaculty.find(x => x._id === id)
        setTitle(contribution.title)
        setDescription(contribution.description)
        setFileUpload(contribution.filesUpload)
        setContributionId(contribution._id)
    }

    const _publishContribution = () => {
        const body = { ids: [contributionId] }
        dispatch(publishContribution(body))
        console.log(body)
    }

    const _downloadFile = (fileName, id) => {
        const file = fileUpload.find(x => x._id === id)
        const fileId = file._id
        console.log(fileId)
        const params = { fileName, contributionId, fileId }
        // console.log(params)
        dispatch(downloadFile(params))
    }


    useEffect(() => {
        setPublicContribution(contribution.publicContributions)
        setAllContribution(contribution.allContributions)
        setContributionByFaculty(contribution.contributionByFaculties)
    }, [contribution.publicContributions, contribution.allContributions, contribution.contributionByFaculties])



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
                                                <div className="form-footer">
                                                    <button type="submit" className="btn btn-danger"><i className="fa fa-times"></i> CANCEL</button>
                                                    <button type="submit" className="btn btn-success" onClick={uploadFile}><i className="fa fa-check-square-o"></i> Upload</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* List Contribution */}
                            <div class="row">
                                {
                                    publicContribution.map((x) => (
                                        <div class="col-12 col-lg-3">
                                            <div class="card">
                                                <img src="https://via.placeholder.com/800x500" class="card-img-top" alt="Card image cap" />
                                                <div class="card-body">
                                                    <h4 class="card-title">{x.title}</h4>
                                                    <p>{x.description}</p>
                                                    <hr />
                                                    <a href="javascript:void();" class="btn btn-light btn-sm text-white"><i class="fa fa-star mr-1"></i> Download</a>
                                                </div>
                                            </div>
                                        </div>
                                    )).reverse()
                                }
                            </div>

                        </div>
                    </div>
                )
            }
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* End Student Display */}
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
                                            contributionByFaculty.map((x) => (
                                                <ul class="list-unstyled">
                                                    <li class="media">
                                                        <img class="mr-3 rounded" src="https://via.placeholder.com/110x110" alt="user avatar" />
                                                        <div class="media-body">
                                                            <h5 class="mt-0 mb-1">{x.title}
                                                                <span>
                                                                    <button data-toggle="modal" data-target="#detailModal" className="btn btn-light btn-sm waves-effect waves-light m-1 pull-right" onClick={(e) => { handleShowDetailModal(x._id) }}><i className="fa fa-edit"></i></button>
                                                                </span>
                                                            </h5>
                                                            <p>{x.description}</p>
                                                            {
                                                                x.is_public ?
                                                                    <span className="badge badge-success shadow-success m-1">Published</span> :
                                                                    <span className="badge badge-light shadow-light m-1">Pending</span>
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
                                    <h3 className="mb-0">{title}</h3>
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

        </Layout >
    )
}

export default Contribution
