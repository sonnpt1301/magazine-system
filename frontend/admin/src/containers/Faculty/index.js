import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { IoTrashOutline } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFaculty } from '../../actions'
import { updateFaculty } from '../../actions/faculty.action'
import { addFaculty } from '../../actions/faculty.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'

const Faculty = () => {

    const dispatch = useDispatch()
    const faculty = useSelector(state => state.faculty)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [facultyName, setFacultyName] = useState('')
    const [facultyId, setFacultyId] = useState('')
    const [faculties, setFaculties] = useState(faculty.faculties)

    const handleShowCreateModal = () => setShowCreateModal(true)

    const handleShowUpdateModal = (e, id) => {
        setShowUpdateModal(true)
        const faculty = faculties.find((fac) => fac._id === id)
        setFacultyName(faculty.name)
        setFacultyId(faculty._id)
    }

    const handleShowDeleteModal = (e, id) => {
        setShowDeleteModal(true)
        const faculty = faculties.find((fac) => fac._id === id)
        setFacultyId(faculty._id)
    }

    const createFaculty = () => {
        const body = {
            name: facultyName
        }
        dispatch(addFaculty(body))
        setShowCreateModal(false)
    }

    const _updateFaculty = () => {
        const params = {
            facultyId
        }
        const body = {
            name: facultyName
        }
        dispatch(updateFaculty(params, body))
        setShowUpdateModal(false)
    }

    const _deleteFaculty = () => {
        const params = { facultyId }
        dispatch(deleteFaculty(params))
        setShowDeleteModal(false)
    }

    useEffect(() => {
        setFaculties(faculty.faculties)
    }, [faculty.faculties])

    // if (faculty.loading) {
    //     return (
    //         <Spinner className="spinner" animation="border" variant="primary" />
    //     )
    // }

    return (
        <Layout>
            <button onClick={handleShowCreateModal}>Add</button>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Faculty</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {
                    faculties.length > 0 &&
                    faculties.map((faculty, index) => (
                        <tbody key={index}>
                            <tr>
                                <td></td>
                                <td>{faculty.name}</td>
                                <td><button onClick={(e) => handleShowUpdateModal(e, faculty._id)}><MdEdit /></button></td>
                                <td><button onClick={(e) => handleShowDeleteModal(e, faculty._id)}><IoTrashOutline /></button></td>
                            </tr>
                        </tbody>
                    ))
                }
            </Table>
            {/* Add Modal */}
            <Modal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                modaltitle={'Add Faculty'}
                onSubmit={createFaculty}
            >
                <Input
                    defaultValue={facultyName}
                    placeholder={'Enter faculty name'}
                    onChange={(e) => setFacultyName(e.target.value)}
                />
            </Modal>
            {/* Update Modal */}
            <Modal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                modaltitle={'Update Faculty'}
                onSubmit={_updateFaculty}
            >
                <Input
                    defaultValue={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                />
            </Modal>
            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                modaltitle={'Are you sure to delete this faculty?'}
                onSubmit={_deleteFaculty}
            >

            </Modal>
        </Layout>
    )
}

export default Faculty
