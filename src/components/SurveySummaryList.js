import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import ResultsButton from "./ResultsButton";
import DeleteButton from "./DeleteButton";
import { Button } from "bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteModal from "./DeleteModal";
export default class SurveySummaryList extends Component {
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

  componentDidMount() {
    this.props.getSavedSurvey();
  }
  render() {
    return (
      <>
        <Accordion>
          {this.props.surveyData.map((info) => (
              <Accordion.Item key={info._id} eventKey={info.surveyID}>
                <Accordion.Header>Survey Date: {info.createdOn}</Accordion.Header>
                <Accordion.Body style={{ textAlign: 'center' }}>
                  <DeleteModal 
                    surveyData={info} 
                    deleteSavedSurvey={this.props.deleteSavedSurvey} 
                    handleCloseModal={this.handleCloseModal} 
                    show={this.state.show}  
                  />
                  <Row>
                    <Col>Submission Count: {info.submissionCount}</Col>
                    <Col>Survey ID: {info.surveyID}</Col>
                    <Col>
                      <ResultsButton surveyData={info.results} graphResults={this.props.graphResults}  />
                    </Col>
                    <Col>
                      <Button onClick={this.handleOpenModal}>Delete</Button>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            )
          )}
        </Accordion>
      </>
    );
  }
}
