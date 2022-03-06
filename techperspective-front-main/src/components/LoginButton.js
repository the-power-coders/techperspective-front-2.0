import { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

class LoginButton extends Component {

  render() {
    console.log("class component login", this.props.auth0.isAuthenticated)
    return (
      <Button style={{margin: "12rem", width: "12rem"}} variant="success" onClick={this.props.auth0.loginWithRedirect}>Log In</Button>
    )
  }
}

export default withAuth0(LoginButton);