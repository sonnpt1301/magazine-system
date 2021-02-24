import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFaculty } from '../../actions'
import { addFaculty, updateFaculty } from '../../actions/faculty.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import swal from 'sweetalert'

const Faculty = () => {

    const dispatch = useDispatch()
    const faculty = useSelector(state => state.faculty)
    const [facultyName, setFacultyName] = useState('')
    const [facultyId, setFacultyId] = useState('')
    const [faculties, setFaculties] = useState(faculty.faculties)


    const handleShowUpdateModal = (e, id) => {
        const faculty = faculties.find((fac) => fac._id === id)
        setFacultyName(faculty.name)
        setFacultyId(faculty._id)
    }

    const handleShowDeleteModal = (e, id) => {
        const faculty = faculties.find((fac) => fac._id === id)
        setFacultyId(faculty._id)
    }

    const createFaculty = (e) => {
        if (facultyName === '') {
            return swal('Oops!!', 'Please fill the bank', 'warning')
        }
        const body = {
            name: facultyName
        }
        dispatch(addFaculty(body))
    }

    const _updateFaculty = () => {
        const params = {
            facultyId
        }
        const body = {
            name: facultyName
        }
        dispatch(updateFaculty(params, body))
    }

    const _deleteFaculty = () => {
        const params = { facultyId }
        dispatch(deleteFaculty(params))
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
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <button type="button" className="btn btn-light waves-effect waves-light m-1" data-toggle="modal" data-target="#createModal">Create Faculty</button>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Faculty</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover" style={{ textAlign: 'center' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Faculty</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    faculties.length > 0 &&
                                                    faculties.map((faculty, index) => (
                                                        <tr key={index}>
                                                            <td>{faculty.name}</td>
                                                            <td>
                                                                <button data-toggle="modal" data-target="#updateModal" className="btn btn-light btn-sm waves-effect waves-light m-1"
                                                                    onClick={(e) => handleShowUpdateModal(e, faculty._id)}><i className="fa fa-edit"></i></button>
                                                                <button data-toggle="modal" data-target="#deleteModal" className="btn btn-light btn-sm waves-effect waves-light m-1"
                                                                    onClick={(e) => handleShowDeleteModal(e, faculty._id)}><i className="fa fa-trash-o"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>

                                        {/* Create Modal */}
                                        <Modal
                                            id={'createModal'}
                                            modaltitle={'Create Faculty'}
                                        >
                                            <Input
                                                label="Faculty name"
                                                placeholder={'Enter name'}
                                                defaultValue={facultyName}
                                                onChange={(e) => setFacultyName(e.target.value)}
                                            />
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-light px-5" onClick={createFaculty} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Create</button>
                                            </div>
                                        </Modal>

                                        {/* Update Modal */}
                                        <Modal
                                            id={'updateModal'}
                                            modaltitle={'Update Faculty'}
                                        >
                                            <Input
                                                label="Faculty name"
                                                placeholder={'Enter name'}
                                                value={facultyName}
                                                onChange={(e) => setFacultyName(e.target.value)}
                                            />
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-light px-5" onClick={_updateFaculty} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Update</button>
                                            </div>
                                        </Modal>

                                        {/* Delete Modal */}
                                        <div className="modal fade" id="deleteModal" style={{ display: 'none', paddingRight: '17px' }} aria-modal="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Delete</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>Are you sure to delete? This action can't be restore</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-white" data-dismiss="modal"><i className="fa fa-times"></i> Close</button>
                                                        <button type="button" className="btn btn-danger" onClick={_deleteFaculty} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="fa fa-check-square-o"></i> Delete</button>
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
            </div>
        </Layout >
    )
}

export default Faculty
