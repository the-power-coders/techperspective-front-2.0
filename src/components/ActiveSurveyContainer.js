import { Component } from "react";
import NewSurveyButton from "./NewSurveyButton";
import ActiveSurvey from "./ActiveSurvey";
import SurveyDropdown from "./SurveyDropdown";
import CreateSurveyForm from "./CreateSurveyForm";
import { Button } from 'react-bootstrap';

class ActiveSurveyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateSurvey: false
        }
    }

    //be able to close the create survey form
    handleCloseCreateSurvey

    componentDidMount() {
        this.props.getActiveSurvey();
    }
    render() {
        return (
            <>
                <br></br>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {this.props.activeSurvey === null && (
                        <NewSurveyButton createNewSurvey={this.props.createNewSurvey} />
                    )}
                    {this.props.activeSurvey && (
                        <>
                            <ActiveSurvey
                                graphResults={this.props.graphResults}
                                activeSurvey={this.props.activeSurvey}
                                openModal={this.props.openModal}
                                getActiveSurvey={this.props.getActiveSurvey}
                            />
                            {/* We found a better way! populating the update in the surveysummarylist instead of "On create" */}
                            {/* <SurveyNoteForm 
						handleUpdateSurvey={this.props.handleUpdateSurvey}
						activeSurvey={this.props.activeSurvey}
						/> */}
                        </>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* dropdown goes here  props surveyIdList handleSelect*/}
                    <SurveyDropdown
                        surveyIdList={this.props.surveyIdList}
                        handleSelectedSurvey={this.props.handleSelectedSurvey}
                        getSubdomain={this.props.getSubdomain}
                    />
                    {
                        this.state.showCreateSurvey ?
                            <CreateSurveyForm onClick={() => this.setState({ showCreateSurvey: false })}
                                insertSurveyToDb={this.props.insertSurveyToDb}
                                getSubdomain={this.props.getSubdomain} />
                            :
                            <Button onClick={() => this.setState({ showCreateSurvey: true })}>Add Survey</Button>
                    }
                </div>
                <br></br>
            </>
        );
    }
}

export default ActiveSurveyContainer;
