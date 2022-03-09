import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import LoginButton from './components/LoginButton';
import Header from './components/Header';
import Survey from './components/Survey';
import Admin from './components/Admin';
import Results from './components/Results';
import AboutUs from './components/AboutUs';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      surveyData: [],
      surveyId: null,
      error: false,
      surveyToGraph: [],
      activeSurvey: null,
      selectedSurvey: null  //213535497610053
    }
  }
  graphResults = (obj) => {
    this.setState({ surveyToGraph: obj })
  }
  /* Grab survey data from server, which grabs from db */
  getSavedSurvey = async () => {
    if (this.props.auth0.isAuthenticated) {
      const tokenResponse = await this.props.auth0.getIdTokenClaims();
      const jwt = tokenResponse.__raw;
      let email = this.props.auth0.user.email
      let subDomain = this.getSubdomain(email);
      const axiosRequestConfig = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/survey',
        headers: { "Authorization": `Bearer ${jwt}` },
        params: { subDomain }
      }
      try {
        let result = await axios(axiosRequestConfig);
        this.setState({ surveyData: result.data });
        this.setState({ error: false })
      } catch (error) {
        console.error("Data receive error: " + error);
        this.setState({ error: true });
      }
    }
  }


  /* Ping server to delete survey data from DB */
  deleteSavedSurvey = async (id) => {
    if (this.props.auth0.isAuthenticated) {
      const tokenResponse = await this.props.auth0.getIdTokenClaims();
      const jwt = tokenResponse.__raw;


      const axiosRequestConfig = {
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/survey/${id}`,
        headers: { "Authorization": `Bearer ${jwt}` }
      }

      try {
        await axios(axiosRequestConfig);
        const updatedSurveys = this.state.surveyData.filter((survey) => survey._id !== id);
        this.setState({ surveyData: updatedSurveys });

      } catch (error) {
        console.error("Delete error: " + error);
        this.setState({ error: true });
      }
    }
  }

  handleSelectedSurvey = (event) => {
    let selected = event.target.value;
    this.setState({
      selectedSurvey: selected
    });
    this.createNewSurvey ();
  }

  /* Ping server to create a new survey ID to enter into the survey Iframe*/
  createNewSurvey = async () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/jotform?surveyID=${this.state.selectedSurvey}`
    try {
      const newSurveyObj = await axios.post(url);
      this.setState({ activeSurvey: newSurveyObj.data });

    } catch (error) {
      console.log(error, 'could not create new survey');
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

  /* Archive the survey */
  putActiveSurvey = async () => {
    if (this.props.auth0.isAuthenticated) {
      const tokenResponse = await this.props.auth0.getIdTokenClaims();
      const jwt = tokenResponse.__raw;

      this.state.activeSurvey.active = false;

      const axiosRequestConfig = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/survey`,
        data: this.state.activeSurvey,
        headers: { "Authorization": `Bearer ${jwt}` }

      }

      try {

        await axios(axiosRequestConfig);
        this.getActiveSurvey();
      } catch (error) {
        console.log(error, 'could not archive survey');
      }
    }
    // there has to be a better way
    window.location.reload();
  }

  //Adds Auth0 Integration
  getConfig = async () => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
      }
      return config;
    }
  }

  getSubdomain = (obj) => {
    let subDom = obj.slice(obj.indexOf('@'));
    return subDom;
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/admin"
              element={
                this.props.auth0.isAuthenticated ?
                  <Admin
                    graphResults={this.graphResults}
                    activeSurvey={this.state.activeSurvey}
                    createNewSurvey={this.createNewSurvey}
                    surveyData={this.state.surveyData}
                    putActiveSurvey={this.putActiveSurvey}
                    deleteSavedSurvey={this.deleteSavedSurvey}
                    getActiveSurvey={this.getActiveSurvey}
                    getSavedSurvey={this.getSavedSurvey}
                    getSavedSurveyIds={this.getSavedSurveyIds}
                    surveyIdList={this.state.surveyIdList}
                    handleSelectedSurvey={this.handleSelectedSurvey}
                  /> :
                  <Row style={{ justifyContent: "center" }}>
                    <LoginButton />
                  </Row>
              }
            />
            <Route
              path="/results"
              element={
                <Results
                  surveyToGraph={this.state.surveyToGraph}
                  getSavedSurvey={this.getSavedSurvey}
                  surveyData={this.state.surveyData}
                />
              }
            />
            <Route path="/" element={<Survey activeSurvey={this.state.activeSurvey} />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
// export default App;

