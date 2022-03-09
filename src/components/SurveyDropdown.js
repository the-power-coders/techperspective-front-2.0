
import React from 'react';
import { Container, Form } from 'react-bootstrap';


class SurveyDropdown extends React.Component {
  render() {
    return (
      //check react-bootstrap docs for dropdown implementation
      <Container>
      <Form style={{ width: 'max-content', margin: 'auto' }}>
        <Form.Group controlId="selected">
          <Form.Select onChange={this.props.handleSelectedSurvey}> {
            this.props.surveyIdList.map((survey, idx) => {
              return <option key={survey.surveyID + idx} value={survey.surveyID} >{survey.surveyName}</option>
            })
          }
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>

    );
  }

}

export default SurveyDropdown;