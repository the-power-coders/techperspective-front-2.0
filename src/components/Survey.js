import React, { Component } from 'react';
import SurveyIframe from './SurveyIframe';

export default class Survey extends Component {
    render() {
        return (
            
            <div>
                 <br></br>
                
                <h1>Please complete the embedded survey below.</h1>

                <h2>Be sure to hit "SUBMIT" after answering the last question.</h2>
                <br></br>

                {this.props.formId ? <SurveyIframe activeSurvey={this.props.activeSurvey} formId={this.props.formId} /> : <h2>No active survey available.</h2>}
            </div>
        )
    }
}
