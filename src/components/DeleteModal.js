import { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DeleteButton from './DeleteButton';

class DeleteModal extends Component {
   
    render() {
      // console.log(this.props.surveyData);
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Survey</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       Are you sure? This will delete this survey data for every!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.handleCloseModal}>
                            Cancel
                        </Button>
                        <DeleteButton 
                          surveyData={this.props.surveyData} 
                          deleteSavedSurvey={this.props.deleteSavedSurvey}
                          handleCloseModal={this.props.handleCloseModal}
                        />
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default DeleteModal;
