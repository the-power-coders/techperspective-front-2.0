import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import ResultsButton from "./ResultsButton";
import DeleteButton from "./DeleteButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class SurveySummaryList extends Component {

  componentDidMount() {
    this.props.getSavedSurvey();
  } 
  render() {
    return (
      <>
        <Accordion>
          {this.props.surveyData.map((info) => {
            return (
              <Accordion.Item key={info._id} eventKey={info.surveyID}>
                <Accordion.Header>Survey Date: {info.createdOn}</Accordion.Header>
                <Accordion.Body style={{ textAlign: 'center' }}>
                  <Row>
                    <Col>Submission Count: {info.submissionCount}</Col>
                    <Col>Survey ID: {info.surveyID}</Col>
                    <Col>
                      <ResultsButton surveyData = {info.results} graphResults = {this.props.graphResults}/>
                    </Col>
                    <Col>
                      <DeleteButton surveyData={info} deleteSavedSurvey={this.props.deleteSavedSurvey} />
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
