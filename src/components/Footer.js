import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';

class Footer extends Component {
  render(){
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="Footer">
        <Navbar.Brand id="foot" style={{margin: "left"}}  >┬ęCodefellows and Melting-Pot Data + The-Power-Coders </Navbar.Brand>

        <Navbar.Brand id="foot" style={{margin: "right"}} href="/about" >About Us</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
