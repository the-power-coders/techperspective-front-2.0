import React from 'react';
import { Form, Button} from 'react-bootstrap';

class CreateSurveyForm extends React.Component {
  handleSubmit = (event) => {
    this.props.insertSurveyToDb(event);
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId='surveyId'>
          <Form.Label>Survey ID</Form.Label>
          <Form.Control type='text'/>
        </Form.Group>
        <Form.Group controlId='surveyName'>
          <Form.Label>Survey Name</Form.Label>
          <Form.Control type='text'/>
        </Form.Group>
        <Button type='submit'>Create Survey</Button>
      </Form>
    ) 
  }

}

export default CreateSurveyForm;