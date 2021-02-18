import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFaculty } from '../../actions'
import { addFaculty, updateFaculty } from '../../actions/faculty.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

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
                        <div class="col-lg-12">
                            <button type="button" className="btn btn-light waves-effect waves-light m-1" data-toggle="modal" data-target="#createModal">Create Faculty</button>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Hover Table</h5>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Faculty</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    faculties.length > 0 &&
                                                    faculties.map((faculty, index) => (
                                                        <tr key={index}>
                                                            <td>{faculty.name}</td>
                                                            <td><button data-toggle="modal" data-target="#updateModal" className="btn btn-light btn-sm waves-effect waves-light m-1" onClick={(e) => handleShowUpdateModal(e, faculty._id)}><i className="fa fa-edit"></i></button>
                                                                <button data-toggle="modal" data-target="#deleteModal" className="btn btn-light btn-sm waves-effect waves-light m-1" onClick={(e) => handleShowDeleteModal(e, faculty._id)}><i className="fa fa-trash-o"></i></button>
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
                                                                label="Faculty name"
                                                                placeholder={'Enter name'}
                                                                defaultValue={facultyName}
                                                                onChange={(e) => setFacultyName(e.target.value)}
                                                            />
                                                            <div className="form-group">
                                                                <button type="submit" className="btn btn-light px-5" onClick={createFaculty} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Create</button>
                                                            </div>
                                                        </form>
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
                                                                label="Faculty name"
                                                                placeholder={'Enter name'}
                                                                value={facultyName}
                                                                onChange={(e) => setFacultyName(e.target.value)}
                                                            />
                                                            <div className="form-group">
                                                                <button type="submit" className="btn btn-light px-5" onClick={_updateFaculty} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Update</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delete Modal */}
                                        <div class="modal fade" id="deleteModal" style={{ display: 'none', paddingRight: '17px' }} aria-modal="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Delete</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure to delete? This action can't be restore</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-white" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                                                        <button type="button" class="btn btn-danger" onClick={_deleteFaculty} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i class="fa fa-check-square-o"></i> Delete</button>
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
