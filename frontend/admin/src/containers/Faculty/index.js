import React from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'

const Faculty = () => {
    const auth = useSelector(state => state.auth)
    const { user } = auth

    const renderStudentPage = () => {
        return (
            <>
            <div>Student</div>
            </>
        )
    }
    
    const renderAdminPage = () => {
        return (
            <>
            <div>Admin</div>
            </>
        )
    }

    return (
        <Layout>
            { user.role === 'admin' && renderAdminPage()}
            { user.role === 'student' && renderStudentPage()}
        </Layout>
    )
}

export default Faculty
