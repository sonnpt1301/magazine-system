import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addFaculty } from '../../actions/faculty.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'

const Faculty = () => {

    const dispatch = useDispatch()
    const faculty = useSelector(state => state.faculty)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [facultyName, setFacultyName] = useState('')
    const [faculties, setFaculties] = useState(faculty.faculties)
    const handleShowCreateModal = () => setShowCreateModal(true)

    const createFaculty = () => {
        const body = {
            name: facultyName
        }
        dispatch(addFaculty(body))
        setShowCreateModal(false)
    }

    useEffect(() => {
        setFaculties(faculty.faculties)
    }, [faculty.faculties])

    if (faculty.loading) {
        return (
            <Spinner className="spinner" animation="border" variant="primary" />
        )
    }

    return (
        <Layout>
            <button onClick={handleShowCreateModal}>Add</button>
            {
                faculties.length > 0 &&
                faculties.map((faculty, index) => (
                    <Input
                        key={index}
                        size={'sm'}
                        defaultValue={faculty.name}
                        placeholder={'Category Name'}
                    />
                ))
            }
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
        </Layout>
    )
}

export default Faculty
