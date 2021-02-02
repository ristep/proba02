import React from "react";
import { BtnLink } from "../elements/btnlink";

export const Home = () => {
  return( 
    <>
      <h2>Home page</h2>
      <BtnLink to="/apod">APOD</BtnLink>
    </>  
    ); 
}
