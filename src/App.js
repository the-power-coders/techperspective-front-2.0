import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
// import LoginButton from './components/LoginButton';
import Header from './components/Header';
import Survey from './components/Survey';
import Admin from './components/Admin';
import Results from './components/Results';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
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
      selectedSurvey: null,
      formId: null
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
        this.setState({ surveyData: result.data});
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

  handleUpdateSurvey = async (surveyToUpdate) =>{
    try{
      if (this.props.auth0.isAuthenticated) {
        const tokenResponse = await this.props.auth0.getIdTokenClaims();
        const jwt = tokenResponse.__raw;
        const axiosRequestConfig = {
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/survey/${surveyToUpdate._id}`,
          headers: { "Authorization": `Bearer ${jwt}` },
          data: surveyToUpdate
        }
        let createdSurvey = await axios(axiosRequestConfig);
        this.setState({
          activeSurvey: createdSurvey.data
        })
        this.getSavedSurvey()
      }
    }catch(error){
      console.log(error, 'Error with updating the survey');

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
    let email = this.props.auth0.user.email
    let subDomain = this.getSubdomain(email);
    let desiredSurvey = ""
    //find the surveyID in surveyDATA where surveyData.surveyID === selectedSurvey
    this.state.surveyData.forEach( item => {
      if(item.surveyID === this.state.selectedSurvey){
        desiredSurvey = item.surveyName;
      }

    })
    let url = `${process.env.REACT_APP_SERVER_URL}/jotform?surveyID=${this.state.selectedSurvey}&surveyName=${desiredSurvey}&subDomain=${subDomain}`
    try {
      const newSurveyObj = await axios.post(url);
      this.setState({ activeSurvey: newSurveyObj.data });

    } catch (error) {
      console.log(error, 'could not create new survey');
    }
  }

  insertSurveyToDb = async (event) => {
    if (this.props.auth0.isAuthenticated) {
      const tokenResponse = await this.props.auth0.getIdTokenClaims();
      const jwt = tokenResponse.__raw;
      let subDomain = event.target.subDomain.value;
      let surveyID = event.target.surveyId.value;
      let surveyName = event.target.surveyName.value;

      const axiosRequestConfig = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/survey/create`,
        headers: { "Authorization": `Bearer ${jwt}` },
        params: { subDomain, surveyID, surveyName }
      }
      try {
        await axios(axiosRequestConfig);
        this.getActiveSurvey();
      } catch (error) {
        console.log(error, 'could not archive survey');
      }
    }
  }

  getFormId = async () => {
    const axiosRequestConfig = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/formId`,
      // headers: { "Authorization": `Bearer ${jwt}` }
      
  }
  try{
    const formIdResult = await axios(axiosRequestConfig);
    this.setState({
      formId: formIdResult.data
    })
  }catch(e){
    console.log(e.message);
  }
  }

  getActiveSurvey = async () => {
    // if (this.props.auth0.isAuthenticated) {
    //     const tokenResponse = await this.props.auth0.getIdTokenClaims();
    //     const jwt = tokenResponse.__raw;

        const axiosRequestConfig = {
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: `/active`,
            // headers: { "Authorization": `Bearer ${jwt}` }
        }
        try {
            const activeSurvey = await axios(axiosRequestConfig);
            this.setState({ activeSurvey: activeSurvey.data });
        } catch (error) {
            console.log(error, 'No Active Survey');
        }
    // }
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

  componentDidMount(){
    this.getFormId();
  }

  render() {
    
    // console.log(this.state);
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
                    insertSurveyToDb={this.insertSurveyToDb}
                    handleUpdateSurvey={this.handleUpdateSurvey}
                    getSubdomain={this.getSubdomain}
                  /> :
                  <Row style={{ justifyContent: "center" }}>
                    {/* <LoginButton /> */}
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
            <Route path="/" element={<Survey activeSurvey={this.state.activeSurvey} formId={this.state.formId}  />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer style={{ position:"absolute"}}/>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
// export default App;

