import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { IoTrashOutline } from 'react-icons/io5'
import { MdEdit, MdAddCircle } from "react-icons/md"
import Modal from '../../components/UI/Modal'
import { Row, Col } from 'react-bootstrap'
import { addUser } from '../../actions'

const User = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const { faculties } = useSelector(state => state.faculty)
    const [users, setUsers] = useState(user.users)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')
    const [role, setRole] = useState('')
    const [facultyId, setFacultyId] = useState('')

    const handleShowCreateModal = () => setShowCreateModal(true)

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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {
                    users.length > 0 &&
                    users.map((user, index) => (
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.firstName}
                                    />
                                </td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.lastName}
                                    />
                                </td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.email}
                                    />
                                </td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.address}
                                    />
                                </td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.city}
                                    />
                                </td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.contact}
                                    />
                                </td>
                                <td>
                                    <Input
                                        size={'sm'}
                                        value={user.role}
                                    />
                                </td>
                                <td><MdEdit /></td>
                                <td><IoTrashOutline /></td>
                            </tr>
                        </tbody>
                    ))
                }
            </Table>

            <Modal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                modalTitle={'Add user'}
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


        </Layout>
    )
}

export default User
