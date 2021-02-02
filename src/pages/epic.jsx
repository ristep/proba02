import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const Epic = () => {
  const history = useHistory();
  
  const onClick = () => {
    history.push('/users');
  }

  return(
    <div>
      <h1>Settings</h1>
      <Button onClick={onClick}>Push to Users</Button>
    </div>
  );  
}
