import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import ResultsButton from "./ResultsButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteButton from "./DeleteButton";
export default class SurveySummaryList extends Component {

  componentDidMount() {
    this.props.getSavedSurvey();
  }
  render() {
    console.log('This is current surveyData: ',this.props.surveyData);
    return (
      <>
        <Accordion>
          {this.props.surveyData.filter(count => count.submissionCount > 0 && count.surveyID !== "000001" && count.surveyID !== "000002" && count.surveyID !== "000003" && count.surveyID !== "000004" && count.surveyID !== "000005").map((info) => {
            return (
              <Accordion.Item key={info._id} eventKey={info.surveyID}>
                <Accordion.Header>Survey Name: {info.surveyName} <br></br> Survey Date: {info.createdOn}</Accordion.Header>
                <Accordion.Body style={{ textAlign: 'center' }}>
                  <Row>
                    <Col>Submission Count: {info.submissionCount}</Col>
                    <Col>Survey ID: {info.surveyID}</Col>
                    <Col>
                      <ResultsButton surveyData={info.results} graphResults={this.props.graphResults} />
                    </Col>
                    <Col>
                      <DeleteButton
                        surveyData={info}
                        deleteSavedSurvey={this.props.deleteSavedSurvey}
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </>
    );
  }
}
