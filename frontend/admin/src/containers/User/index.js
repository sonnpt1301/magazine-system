import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { IoTrashOutline } from 'react-icons/io5'
import { MdEdit, MdAddCircle } from "react-icons/md"
import Modal from '../../components/UI/Modal'
import { Row, Col } from 'react-bootstrap'
import { addUser, updateUser, deleteUser } from '../../actions'

const User = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const { faculties } = useSelector(state => state.faculty)
    const [users, setUsers] = useState(user.users)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
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

    const handleShowCreateModal = () => setShowCreateModal(true)
    const handleShowUpdateModal = (e, id) => {
        setShowUpdateModal(true)
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
        setShowDeleteModal(true)
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
        setShowCreateModal(false)
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
        setShowUpdateModal(false)
    }

    const _deleteUser = (e) => {
        const params = {
            userId
        }
        dispatch(deleteUser(params))
        setShowDeleteModal(false)
    }

    useEffect(() => {
        setUsers(user.users)
    }, [user.users])

    return (
        <Layout>
            <button onClick={handleShowCreateModal}><MdAddCircle /> Add User</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Faculty</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {
                    users.length > 0 &&
                    users.map((user, index) => (
                        <tbody key={index}>
                            <tr>
                                <td></td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.contact}</td>
                                <td>{user.role}</td>
                                <td>{facultyById(user.facultyId)}</td>
                                <td><button onClick={(e) => handleShowUpdateModal(e, user._id)}><MdEdit /></button></td>
                                <td><button onClick={(e) => handleShowDeleteModal(e, user._id)}><IoTrashOutline /></button></td>
                            </tr>
                        </tbody>
                    ))  
                }
            </Table>

            {/* Add Modal */}
            <Modal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                modaltitle={'Add user'}
                onSubmit={createUser}
            >
                <Row>
                    <Col sm={6}>
                        <Input
                            value={firstName}
                            placeholder={'First Name'}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            value={lastName}
                            placeholder={'Last Name'}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={contact}
                            placeholder={'Contact'}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={email}
                            placeholder={'Email'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type={'password'}
                            value={password}
                            placeholder={'Password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={address}
                            placeholder={'Address'}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={city}
                            placeholder={'City'}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Input
                            value={role}
                            placeholder={'Role'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            type='select'
                            value={facultyId}
                            onChange={(e) => setFacultyId(e.target.value)}
                            options={faculties}
                            placeholder={'Select Faculty'}
                        />
                    </Col>
                </Row>
            </Modal>

            {/* Update Modal */}
            <Modal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                modaltitle={'Update user'}
                onSubmit={editUser}
            >
                <Row>
                    <Col sm={6}>
                        <Input
                            label={'First Name'}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label={'Last Name'}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label={'Contact'}
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label={'Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label={'Address'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label={'City'}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Input
                            label={'Role'}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </Col>
                    <Col sm={6}>
                        <Input
                            label={'Faculty'}
                            type='select'
                            value={facultyId}
                            onChange={(e) => setFacultyId(e.target.value)}
                            options={faculties}
                            placeholder={'Select Faculty'}
                        />
                    </Col>
                </Row>
            </Modal>

            <Modal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                modaltitle={'Are you sure to delete this user?'}
                onSubmit={_deleteUser}
            >

            </Modal>


        </Layout>
    )
}

export default User
