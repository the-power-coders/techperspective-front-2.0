import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SurveyNoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let updatedSurveyNote = {
      _id: this.props.activeSurvey._id,
      surveyID: this.props.activeSurvey.surveyID,
      surveyName: this.props.activeSurvey.surveyName,
      createdOn: this.props.activeSurvey.createdOn,
      submissionCount: this.props.activeSurvey.submissionCount,
      results: this.props.activeSurvey.results,
      active: this.props.activeSurvey.active,
      subDomain:this.props.activeSurvey.subDomain,
      notes: e.target.notes.value
    }
    this.props.handleUpdateSurvey(updatedSurveyNote);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="notes">
          <Form.Label>Notes:</Form.Label>
          <Form.Control as='textarea' rows={3} defaultValue={this.props.activeSurvey.notes }/>
        </Form.Group>
        <Button type='submit'>Update Notes</Button>
      </Form>
    )
  }
}
