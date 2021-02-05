import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";
import { Card } from "react-bootstrap";

export const Apod = () => {
  const [apod, setApod] = useState({});
  const [apodList, setApodList] = useState({});
 
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?start_date=2021-01-01&end_date=2021-02-02&api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU`
      )
      .then((res) => {
        setApodList(res.data);
      });
    return () => {
      //cleanup
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU`
      )
      .then((res) => {
        setApod(res.data);
        // setHeaders(res);
      });
    return () => {
      //cleanup
    };
  }, []);

  return (
    <>
      <h2>Astronomy Photo of the Day</h2>
      
      {/* <Card className="bg-dark text-white">
        <Card.Img src="" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card> */}

      <ReactJson src={apod}></ReactJson>
      <ReactJson src={apodList}></ReactJson>
    </>
  );
};
