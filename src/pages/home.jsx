import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const Home = () => {
  const [count, setCount] = useState(0);

  return( 
    <>
      <h2>Home page {count}</h2>
      <Button onClick={() => setCount(count + 1)}>APOD</Button>
    </>  
    ); 
}
