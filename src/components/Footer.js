import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';

class Footer extends Component {
  render(){
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="Footer">
        <Navbar.Brand id="foot" style={{margin: "left"}}  >©Codefellows and Melting-Pot Data + The-Power-Coders </Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
