import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class CreateSurveyForm extends React.Component {
  handleSubmit = (event) => {
    this.props.insertSurveyToDb(event);
  }

  render () {
    let subDomain = this.props.getSubdomain(this.props.auth0.user.email);
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
        <Form.Group controlId='subDomain'>
        <Form.Label>Subdomain</Form.Label>
          <Form.Control type='text' defaultValue={subDomain} />
        </Form.Group>
        <Button type='submit'>Create Survey</Button>
      </Form>
    ) 
  }

}

export default withAuth0(CreateSurveyForm);
