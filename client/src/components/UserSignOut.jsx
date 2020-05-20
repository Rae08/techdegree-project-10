import React from "react";
import { Redirect } from "react-router-dom";
import { Consumer } from "../Context";

const UserSignOut = () => {
  return (
    <Consumer>
      {(context) => {
        context.actions.signOut();

        return <Redirect to="/" />;
      }}
    </Consumer>
  );
};

export default UserSignOut;
