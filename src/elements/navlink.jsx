import React from "react";
import { NavLink as BootNavlink } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavLink = ({ to, children}) => {
 
  return(
    <BootNavlink 
      as={Link}
      to={to} 
    >
      {children}
    </BootNavlink>
  );  
}
