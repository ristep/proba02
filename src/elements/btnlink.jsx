import React from "react";
import { NavLink as BootNavlink } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BtnLink = ({ to, children}) => {
 
  return(
    <BootNavlink 
      className="btn btn-success"
      as={Link}
      to={to} 
    >
      {children}
    </BootNavlink>
  );  
}
