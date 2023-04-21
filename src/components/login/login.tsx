import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import classes from './login.module.scss';

const LoginDisplay = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={classes.login}>
        <span>You must be logged in to use this application.</span>
        <button className={`btn btn-primary`} onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginDisplay;