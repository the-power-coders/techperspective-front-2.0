import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button style={{height: '3rem', width: '11rem', marginLeft: "1rem"}} variant="light" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};
export default LogoutButton;
