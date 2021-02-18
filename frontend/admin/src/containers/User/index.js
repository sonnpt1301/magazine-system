import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, updateUser } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

const User = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const { faculties } = useSelector(state => state.faculty)
    const [users, setUsers] = useState(user.users)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')
    const [role, setRole] = useState('')
    const [facultyId, setFacultyId] = useState('')
    const [userId, setUserId] = useState('')


    const facultyById = (id) => {
        const faculty = faculties.find((fac) => fac._id === id)
        return faculty.name
    }

    const handleShowUpdateModal = (e, id) => {
        const user = users.find((user) => user._id === id)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setPassword(user.password)
        setAddress(user.address)
        setCity(user.city)
        setContact(user.contact)
        setRole(user.role)
        setFacultyId(user.facultyId)
        setUserId(user._id)
    }

    const handleShowDeleteModal = (e, id) => {
        const user = users.find((user) => user._id === id)
        setUserId(user._id)
    }

    const createUser = (e) => {
        const body = {
            firstName,
            lastName,
            email,
            password,
            address,
            city,
            contact,
            role,
            facultyId,
        }
        dispatch(addUser(body))
    }

    const editUser = () => {
        const params = {
            userId
        }

        const body = {
            firstName,
            lastName,
            email,
            password,
            address,
            city,
            contact,
            role,
            facultyId
        }
        dispatch(updateUser(params, body))
    }

    const _deleteUser = (e) => {
        const params = {
            userId
        }
        dispatch(deleteUser(params))
    }

    useEffect(() => {
        setUsers(user.users)
    }, [user.users])

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <button type="button" className="btn btn-light waves-effect waves-light m-1" data-toggle="modal" data-target="#createModal">Create User</button>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Hover Table</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">First Name</th>
                                                    <th scope="col">Last Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Contact</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Faculty</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.length > 0 &&
                                                    users.map((user, index) => (
                                                        <tr key={index}>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.address}</td>
                                                            <td>{user.city}</td>
                                                            <td>{user.contact}</td>
                                                            <td>{user.role}</td>
                                                            <td>{facultyById(user.facultyId)}</td>
                                                            <td><button data-toggle="modal" data-target="#updateModal" className="btn btn-light btn-sm waves-effect waves-light m-1" onClick={(e) => handleShowUpdateModal(e, user._id)}><i className="fa fa-edit"></i></button>
                                                                <button data-toggle="modal" data-target="#deleteModal" className="btn btn-light btn-sm waves-effect waves-light m-1" onClick={(e) => handleShowDeleteModal(e, user._id)}><i className="fa fa-trash-o"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        {/* Create Modal */}
                                        <div className="modal fade" id="createModal" style={{ display: 'none', paddingRight: '17px' }} aria-modal="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Your modal title here</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <Input
                                                                label="First Name"
                                                                placeholder={'Enter name'}
                                                                defaultValue={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Last Name"
                                                                defaultValue={lastName}
                                                                placeholder={'Last Name'}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Contact"
                                                                defaultValue={contact}
                                                                placeholder={'Contact'}
                                                                onChange={(e) => setContact(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Email"
                                                                defaultValue={email}
                                                                placeholder={'Email'}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Password"
                                                                type={'password'}
                                                                defaultValue={password}
                                                                placeholder={'Password'}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Address"
                                                                defaultValue={address}
                                                                placeholder={'Address'}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                            />
                                                            <Input
                                                                label="City"
                                                                defaultValue={city}
                                                                placeholder={'City'}
                                                                onChange={(e) => setCity(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Role"
                                                                defaultValue={role}
                                                                placeholder={'Role'}
                                                                onChange={(e) => setRole(e.target.value)}
                                                            />
                                                            <Input
                                                                label="Faculty"
                                                                type='select'
                                                                defaultValue={facultyId}
                                                                onChange={(e) => setFacultyId(e.target.value)}
                                                                options={faculties}
                                                                placeholder={'Select Faculty'}
                                                            />
                                                            <div className="form-group">
                                                                <button type="submit" className="btn btn-light px-5" onClick={createUser} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Create</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Update Modal */}

                                    <div className="modal fade" id="updateModal" style={{ display: 'none', paddingRight: '17px' }} aria-modal="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Your modal title here</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form>
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
                                                            label="Email"
                                                            value={email}
                                                            placeholder={'Email'}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <Input
                                                            label="Password"
                                                            type={'password'}
                                                            value={password}
                                                            placeholder={'Password'}
                                                            onChange={(e) => setPassword(e.target.value)}
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
                                                        <Input
                                                            label="Role"
                                                            value={role}
                                                            placeholder={'Role'}
                                                            onChange={(e) => setRole(e.target.value)}
                                                        />
                                                        <Input
                                                            label="Faculty"
                                                            type='select'
                                                            value={facultyId}
                                                            onChange={(e) => setFacultyId(e.target.value)}
                                                            options={faculties}
                                                            placeholder={'Select Faculty'}
                                                        />
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-light px-5" onClick={editUser} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Update</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete Modal */}
                                    <div className="modal fade" id="deleteModal" style={{ display: 'none', paddingRight: '17px' }} aria-modal="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Delete</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Are you sure to delete? This action can't be restore</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" className="btn btn-white" data-dismiss="modal"><i className="fa fa-times"></i> Close</button>
                                                    <button type="button" className="btn btn-danger" onClick={_deleteUser} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="fa fa-check-square-o"></i> Delete</button>
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

export default User
