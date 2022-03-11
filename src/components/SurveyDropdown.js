
import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';


class SurveyDropdown extends React.Component {
  render() {
    let subDomain = this.props.getSubdomain(this.props.auth0.user.email);
    console.log("this is survey id list dropdown",this.props.surveyIdList);
    return (
      //check react-bootstrap docs for dropdown implementation
      <Container>
      <Form style={{ width: 'max-content', margin: 'auto' }}>
        <Form.Group controlId="selected">
          <Form.Select onChange={this.props.handleSelectedSurvey}> 
          <option>Select a survey to show</option>
            {this.props.surveyIdList.filter((idName, idx, self) => idx ===  self.findIndex((t) => (t.surveyName === idName.surveyName)) && idName.surveyName !== '' && subDomain === idName.subDomain ).map((survey, idx) => {
              return(
                <option key={survey.surveyID + idx} value={survey.surveyID}>{survey.surveyName}</option>
              ); 
            })
          }
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>

    );
  }

}

export default withAuth0(SurveyDropdown);
