import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactJson from "react-json-view";

export const Apod =  () => {
  const [apod, setApod] = useState({});

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?start_date=2021-01-01&end_date=2021-02-02&api_key=DEMO_KEY`)
    .then(res => {
      const apod = res.data;
      setApod({ apod });
    });
  return () => {
      //cleanup
    };
  },[]);

  return( 
    <>
      <h2>Astronomy Photo of the Day</h2>
      <ReactJson src={apod} ></ReactJson>
    </>
    );
};
