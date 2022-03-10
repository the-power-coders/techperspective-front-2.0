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
    // handleDeleteClick = () => {
    //     this.props.deleteSavedSurvey(this.props.surveyData._id);
    //     this.props.handleCloseModal();
    // }

    render() {
        // console.log('This is for deleting ',this.props.surveyData._id);
        return (
            <>
                <Button style={{ height: '3rem', width: '11rem' }} variant="danger" onClick={this.handleOpenModal} >Delete</Button>
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
