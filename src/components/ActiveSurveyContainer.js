import { Component } from "react";
import NewSurveyButton from "./NewSurveyButton";
import ActiveSurvey from "./ActiveSurvey";
import SurveyDropdown from "./SurveyDropdown";
import CreateSurveyForm from "./CreateSurveyForm";

class ActiveSurveyContainer extends Component {
    componentDidMount() {
        this.props.getActiveSurvey();
    }
    render() {
        return (
            <>
            <br></br>
            <div style={{display:"flex", justifyContent:"center"}} >  
            
                {this.props.activeSurvey === null && <NewSurveyButton createNewSurvey={this.props.createNewSurvey} />}
                {this.props.activeSurvey && <ActiveSurvey graphResults={this.props.graphResults} activeSurvey={this.props.activeSurvey} openModal={this.props.openModal} getActiveSurvey={this.props.getActiveSurvey} />}
            
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                {/* dropdown goes here  props surveyIdList handleSelect*/}

                <SurveyDropdown surveyIdList={this.props.surveyIdList} handleSelectedSurvey={this.props.handleSelectedSurvey}/>
                <CreateSurveyForm insertSurveyToDb={this.props.insertSurveyToDb}/>

            </div>
            <br></br>
            </>
        )
    }
}

export default ActiveSurveyContainer;