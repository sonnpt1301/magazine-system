import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import LeftMenu from '../LeftMenu'
import './style.css'

const Layout = (props) => {
    return (
        <div id="wrapper">
            <LeftMenu />
            <Header />
            <div className="clearfix"></div>
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout