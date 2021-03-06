import { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DeleteModal extends Component {

    handleDeleteClick = () => {
        this.props.deleteSavedSurvey(this.props.surveyData._id);
        this.props.handleCloseModal();
    }
    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Survey</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure? This will delete this survey data permanently
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleCloseModal}>Cancel
                        </Button>
                        <Button onClick={this.handleDeleteClick}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default DeleteModal;
