import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import DeleteModal from './DeleteModal';

class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    handleOpenModal = (e) => {
        this.setState({ show: true })
    }
    handleCloseModal = () => {
        this.setState({ show: false })
    }
    render() {
        return (
            <>
                <Button 
                style={{ height: '3rem', width: '11rem' }} 
                variant="danger" 
                onClick={this.handleOpenModal}>Delete</Button>
                <DeleteModal
                    surveyData={this.props.surveyData}
                    deleteSavedSurvey={this.props.deleteSavedSurvey}
                    handleCloseModal={this.handleCloseModal}
                    show={this.state.show}
                />
            </>
        )
    }
}

export default DeleteButton;
