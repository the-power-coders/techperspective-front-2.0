import React, { Component } from 'react';
import axios from 'axios';
import SurveySummaryList from './SurveySummaryList';
import ActiveSurveyContainer from './ActiveSurveyContainer';
import ConfirmModal from './ConfirmModal';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Row from 'react-bootstrap/Row';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            activeSurvey: null,
            surveyIdList: []
        }
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    openModal = () => {
        this.setState({ showModal: true })
    }

    getSavedSurveyIds = async () => {
        if (this.props.auth0.isAuthenticated) {
            const tokenResponse = await this.props.auth0.getIdTokenClaims();
            const jwt = tokenResponse.__raw;
            let email = this.props.auth0.user.email
            let subDomain = this.getSubdomain(email);
            const axiosRequestConfig = {
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER_URL,
                url: '/surveyId',
                headers: { "Authorization": `Bearer ${jwt}` },
                params: { subDomain }
            }
            try {
                let result = await axios(axiosRequestConfig);
                this.setState({ surveyIdList: result.data });
                this.setState({ error: false })
            } catch (error) {
                console.error("Data receive error: " + error);
                this.setState({ error: true });
            }
        }
    }

    getActiveSurvey = async () => {
        if (this.props.auth0.isAuthenticated) {
            const tokenResponse = await this.props.auth0.getIdTokenClaims();
            const jwt = tokenResponse.__raw;
            
            const axiosRequestConfig = {
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER_URL,
                url: `/active`,
                headers: { "Authorization": `Bearer ${jwt}` }
            }
            // const url = `${process.env.REACT_APP_SERVER_URL}/active`
            try {
                const activeSurvey = await axios(axiosRequestConfig);
                this.setState({ activeSurvey: activeSurvey.data });
            } catch (error) {
                console.log(error, 'No Active Survey');
            }
        }
    }
    getSubdomain = (obj) => {
        let subDom = obj.slice(obj.indexOf('@'));
        return subDom;
      }
      
    componentDidMount() {
        // this.getActiveSurvey();
        this.getSavedSurveyIds();
    }
    render() {
        return (
            <div>
                <ConfirmModal showModal={this.state.showModal} closeModal={this.closeModal} putActiveSurvey={this.props.putActiveSurvey} />
                {this.props.auth0.isAuthenticated ?
                    <>

                        <ActiveSurveyContainer activeSurvey={this.props.activeSurvey} createNewSurvey={this.props.createNewSurvey} graphResults={this.props.graphResults} openModal={this.openModal} getActiveSurvey={this.props.getActiveSurvey} surveyIdList={this.state.surveyIdList} handleSelectedSurvey={this.props.handleSelectedSurvey} />
                        <SurveySummaryList getSavedSurvey={this.props.getSavedSurvey} graphResults={this.props.graphResults} surveyData={this.props.surveyData} deleteSavedSurvey={this.props.deleteSavedSurvey} />
                    </>
                    :
                    <Row style={{ justifyContent: "center" }}>
                        <LoginButton />
                    </Row>}
            </div>
        )
    }
}

export default withAuth0(Admin);
