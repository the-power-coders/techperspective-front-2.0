'use strict'

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
            this.props.surveyIdList.map(survey => {
              return <option value={survey.surveyID} >{survey.name}</option>
            })

          }
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>
      // <Dropdown>
      //   <Dropdown.Toggle variant="success" id="dropdown-basic">
      //     Available Surveys
      //   </Dropdown.Toggle>

      //   <Dropdown.Menu> {
      //     this.props.surveyIdList.map(survey => {
      //       <Dropdown.Item value={survey.surveyID} onClick={() => this.props.handleSelectedSurvey(event)}>{survey.name}</Dropdown.Item>
      //     })
      //     }
      //   </Dropdown.Menu>
      // </Dropdown>

    );
  }

}

export default SurveyDropdown;