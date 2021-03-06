/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { updateUser, uploadAvatar } from '../../actions/user.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'

const Profile = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { faculties } = useSelector(state => state.faculty)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')
    const [user, setUser] = useState(auth.user)
    const [fileUpload, setFileUpload] = useState([])
    const [uploadIMG, setUploadIMG] = useState(true)
    const [previewAvatar, setPreviewAvatar] = useState(null)

    const facultyById = (id) => {
        const faculty = faculties.find((fac) => fac._id === id)
        if (faculty) {
            return faculty.name
        }
    }

    const handleUpdateProfile = () => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setAddress(user.address)
        setCity(user.city)
        setContact(user.contact)
    }

    const _updateProfile = () => {
        const params = { userId: user._id }
        const body = {
            firstName,
            lastName,
            address,
            city,
            contact
        }
        console.log(city)
        dispatch(updateUser(params, body))
    }

    const handleUploadFile = (e) => {
        let file = e.target.files
        for (let i = 0; i < file.length; i++) {
            fileUpload.push(file[i])
            setFileUpload(
                fileUpload
            )
        }
        setPreviewAvatar(URL.createObjectURL(e.target.files[0]))
        setUploadIMG(!uploadIMG)
    }

    const _uploadAvatar = () => {
        const params = { userId: user._id }
        const form = new FormData()
        for (let file of fileUpload) {
            form.append('profilePicture', file)
        }
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willChange) => {
                if (willChange) {
                    dispatch(uploadAvatar(params, form))
                    setPreviewAvatar(null)
                    setUploadIMG(!uploadIMG)
                } else {
                    setPreviewAvatar(null)
                    setUploadIMG(!uploadIMG)
                }
            });

    }


    useEffect(() => {
        setUser(auth.user)
    }, [auth.user])

    if (auth.loading) {
        return (
            <Spinner className="spinner" style={{ position: 'fixed', top: '50%', left: '50%' }} animation="border" variant="primary" />
        )
    }
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-lg-4">
                            <div class="card">

                                <div className="container-avatar" style={{ cursor: 'pointer' }}>
                                    <label for="file-input">
                                        {
                                            previewAvatar ?
                                                <img className="card-img-top" alt="Card image cap"
                                                    src={previewAvatar} /> :
                                                <img src={user.profilePicture.length ?
                                                    generatePublicUrl(user.profilePicture[0].img) :
                                                    "https://via.placeholder.com/800x500"}
                                                    className="card-img-top" alt="Card image cap" />
                                        }

                                        <i aria-hidden="true" for="input-upload-avatar" className="icon-camera fa fa-camera"></i>
                                    </label>
                                    <input id="file-input" type="file" onChange={handleUploadFile} />
                                </div>
                                <button className="btn btn-light waves-effect waves-light m-1" disabled={uploadIMG} style={uploadIMG ? { cursor: 'no-drop' } : null} onClick={_uploadAvatar}>Change avatar</button>
                                <div className="card-body">
                                    <h5 className="card-title">{user.firstName + ' ' + user.lastName}</h5>
                                    <h6>Faculty: <small>{facultyById(user.facultyId)}</small></h6>
                                </div>
                                {/* <ul class="list-group list-group-flush list shadow-none">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Total Contribution<span class="badge badge-info badge-pill">14</span></li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Total Published Contribution<span class="badge badge-success badge-pill">2</span></li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">Total Pending Contribution<span class="badge badge-danger badge-pill">1</span></li>
                                </ul> */}
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <ul class="nav nav-tabs nav-tabs-primary top-icon nav-justified">
                                        <li class="nav-item">
                                            <a href="javascript:void();" data-target="#profile" data-toggle="pill" class="nav-link active"><i class="icon-user"></i> <span class="hidden-xs">Profile</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link" onClick={handleUpdateProfile}><i class="icon-note"></i> <span class="hidden-xs">Edit</span></a>
                                        </li>
                                    </ul>
                                    <div class="tab-content p-3">
                                        <div class="tab-pane active" id="profile">
                                            <h5 class="mb-3">User Profile</h5>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6>About</h6>
                                                    <p>
                                                        {user.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="edit">
                                            <Input
                                                label="First Name"
                                                placeholder={'Enter name'}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <Input
                                                label="Last Name"
                                                value={lastName}
                                                placeholder={'Last Name'}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <Input
                                                label="Contact"
                                                value={contact}
                                                placeholder={'Contact'}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                            <Input
                                                label="Address"
                                                value={address}
                                                placeholder={'Address'}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            <Input
                                                label="City"
                                                value={city}
                                                placeholder={'City'}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label"></label>
                                                <div class="col-lg-9">
                                                    <input type="reset" class="btn btn-secondary" value="Cancel" />
                                                    <input type="button" class="btn btn-primary" value="Save Changes" onClick={_updateProfile} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Profile
