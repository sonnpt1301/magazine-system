import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setClosureDate, updateClosureDate } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
const Term = () => {

    const term = useSelector(state => state.term)
    const [terms, setTerms] = useState(term.terms)
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [termId, setTermId] = useState('')

    const dispatch = useDispatch()

    const _createTerm = () => {
        const body = {
            topic,
            description,
            startDate,
            endDate
        }
        dispatch(setClosureDate(body))
    }

    const _updateTerm = () => {
        const params = { termId }
        const body = {
            topic,
            description,
            startDate,
            endDate
        }
        dispatch(updateClosureDate(params, body))
    }

    const handleShowUpdateModal = (e, id) => {
        const term = terms.find(x => x._id === id)
        setTopic(term.topic)
        setDescription(term.description)
        setStartDate(term.startDate.split('T')[0])
        setEndDate(term.endDate.split('T')[0])
        setTermId(term._id)
    }

    const handleShowDeleteModal = () => {

    }

    useEffect(() => {
        setTerms(term.terms)
    }, [term.terms])

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <button type="button" className="btn btn-light waves-effect waves-light m-1" data-toggle="modal" data-target="#createModal">Create Term</button>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Terms</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover" style={{ textAlign: 'center' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Topic</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Start Date</th>
                                                    <th scope="col">End Date</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    terms.length > 0 &&
                                                    terms.map((term, index) => (
                                                        <tr key={index}>
                                                            <td>{term.topic}</td>
                                                            <td>{term.description}</td>
                                                            <td>{term.startDate.split('T')[0]}</td>
                                                            <td>{term.endDate.split('T')[0]}</td>
                                                            <td>
                                                                <button data-toggle="modal" data-target="#updateModal" className="btn btn-light btn-sm waves-effect waves-light m-1"
                                                                    onClick={(e) => handleShowUpdateModal(e, term._id)}><i className="fa fa-edit"></i></button>
                                                                <button data-toggle="modal" data-target="#deleteModal" className="btn btn-light btn-sm waves-effect waves-light m-1"
                                                                    onClick={(e) => handleShowDeleteModal(e, term._id)}><i className="fa fa-trash-o"></i></button>
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
                                                label="Topic"
                                                placeholder={'Enter name'}
                                                defaultValue={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                            />
                                            <Input
                                                label="Description"
                                                placeholder={'Enter description'}
                                                defaultValue={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <Input
                                                label="Start date"
                                                type="date"
                                                defaultValue={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            <Input
                                                label="End date"
                                                type="date"
                                                defaultValue={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-light px-5" onClick={_createTerm} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Create</button>
                                            </div>
                                        </Modal>

                                        {/* Update Modal */}
                                        <Modal
                                            id={'updateModal'}
                                            modaltitle={'Update Faculty'}
                                        >
                                            <Input
                                                label="Topic"
                                                value={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                            />
                                            <Input
                                                label="Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <Input
                                                label="Start date"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            <Input
                                                label="End date"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-light px-5" onClick={_updateTerm} data-dismiss="modal" aria-label="Close" aria-hidden="true"><i className="icon-lock"></i> Update</button>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Term
