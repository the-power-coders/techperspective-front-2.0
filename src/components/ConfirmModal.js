import { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ConfirmModal extends Component {
    handleConfirm = () => {
        this.props.putActiveSurvey();
        this.props.closeModal();
        
    }
    render() {
        return (
            <>
                <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Survey Completion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please confirm all submissions are in for this survey, once marked complete, this survey will no longer be available.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={this.handleConfirm}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ConfirmModal;