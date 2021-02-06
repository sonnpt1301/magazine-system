import React from 'react'
import { Card } from 'react-bootstrap'
import './style.css'

const Footer = () => {
    return (
        <>
            <Card className="text-center" position="fixed" style={{ bottom: 0 }}>
                <Card.Footer className="text-muted">Version 1.0</Card.Footer>
            </Card>
        </>
    )
}

export default Footer
