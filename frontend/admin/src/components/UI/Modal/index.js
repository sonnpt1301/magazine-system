import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const {
    Title,
    Header,
    Body,
    Footer
} = Modal


const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Header closeButton>
                <Title>{props.modalTitle}</Title>
            </Header>
            <Body>
                {props.children}
            </Body>
            <Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Save Changes
            </Button>
            </Footer>
        </Modal>
    )
}

export default NewModal
