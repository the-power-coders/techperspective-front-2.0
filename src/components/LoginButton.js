import { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

class LoginButton extends Component {

  render() {
    return (
      <Button style={{margin: "5%" , width: "8rem", background: "rgba(0, 0, 0, 0.781)"}}  onClick={this.props.auth0.loginWithRedirect}>Admin Log In</Button>
    )
  }
}

export default withAuth0(LoginButton);
