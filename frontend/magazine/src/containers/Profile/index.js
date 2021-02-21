import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'

const Profile = () => {
    const auth = useSelector(state => state.auth)
    const { user } = auth

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-lg-12">
                            Profile
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
