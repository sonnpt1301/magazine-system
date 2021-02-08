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
                <Title>{props.modaltitle}</Title>
            </Header>
            <Body>
                {props.children}
            </Body>
            <Footer>
                <Footer>
                    {
                        props.buttons ? props.buttons.map((btn, index) =>
                            <Button key={index} variant={btn.color} onClick={btn.onClick}>
                                {btn.label}
                            </Button>
                        ) :
                            <Button
                                variant="primary"
                                {...props}
                                style={{ backgroundColor: '#333' }}
                                className="btn-sm"
                                onClick={props.onSubmit}
                            >
                                Save
                        </Button>
                    }

                </Footer>
            </Footer>
        </Modal>
    )
}

export default NewModal
