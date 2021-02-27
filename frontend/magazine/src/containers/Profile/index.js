import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    }

    const _uploadAvatar = () => {
        const params = { userId: user._id }
        const form = new FormData()
        for (let file of fileUpload) {
            form.append('profilePicture', file)
        }
        dispatch(uploadAvatar(params, form))
        setFileUpload([])
    }

    useEffect(() => {
        setUser(auth.user)
    }, [auth.user])

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-lg-4">
                            <div class="card">

                                <div className="container-avatar" style={{ cursor: 'pointer' }}>
                                    <label for="file-input">
                                        <img src={user.profilePicture.length ? generatePublicUrl(user.profilePicture[0].img) : "https://via.placeholder.com/800x500"} class="card-img-top" alt="Card image cap" />
                                        <i aria-hidden="true" for="input-upload-avatar" className="icon-camera fa fa-camera"></i>
                                    </label>
                                    <input id="file-input" name={fileUpload} type="file" onChange={handleUploadFile} />
                                </div>
                                {fileUpload && <button className="btn btn-light waves-effect waves-light m-1" onClick={_uploadAvatar}>Save</button>}
                                <div class="card-body">
                                    <h5 class="card-title">{user.firstName + ' ' + user.lastName}</h5>
                                    <h6>Faculty: <small>{facultyById(user.facultyId)}</small></h6>
                                    <h class="card-text">{user.description}</h>
                                </div>
                                <ul class="list-group list-group-flush list shadow-none">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">Total Contribution<span class="badge badge-info badge-pill">14</span></li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">Total Published Contribution<span class="badge badge-success badge-pill">2</span></li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">Total Pending Contribution<span class="badge badge-danger badge-pill">1</span></li>
                                </ul>
                                <div class="card-body">
                                    <a href="javascript:void();" class="card-link">Card link</a>
                                    <a href="javascript:void();" class="card-link">Another link</a>
                                </div>
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
                                            <a href="javascript:void();" data-target="#messages" data-toggle="pill" class="nav-link"><i class="icon-envelope-open"></i> <span class="hidden-xs">Messages</span></a>
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
                                                        Web Designer, UI/UX Engineer
                            </p>
                                                    <h6>Hobbies</h6>
                                                    <p>
                                                        Indie music, skiing and hiking. I love the great outdoors.
                            </p>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6>Recent badges</h6>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">html5</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">react</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">codeply</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">angularjs</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">css3</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">jquery</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">bootstrap</a>
                                                    <a href="javascript:void();" class="badge badge-dark badge-pill">responsive-design</a>
                                                    <hr />
                                                    <span class="badge badge-primary"><i class="fa fa-user"></i> 900 Followers</span>
                                                    <span class="badge badge-success"><i class="fa fa-cog"></i> 43 Forks</span>
                                                    <span class="badge badge-danger"><i class="fa fa-eye"></i> 245 Views</span>
                                                </div>
                                                <div class="col-md-12">
                                                    <h5 class="mt-2 mb-3"><span class="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                                                    <div class="table-responsive">
                                                        <table class="table table-hover table-striped">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="messages">
                                            <div class="alert alert-info alert-dismissible" role="alert">
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                <div class="alert-icon">
                                                    <i class="icon-info"></i>
                                                </div>
                                                <div class="alert-message">
                                                    <span><strong>Info!</strong> Lorem Ipsum is simply dummy text.</span>
                                                </div>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-hover table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <span class="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span class="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                                </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                                </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                                </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                                </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
