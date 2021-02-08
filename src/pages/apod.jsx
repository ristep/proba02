import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment";

export const Apod = () => {
  const { year = moment().format('YYYY'), month = moment().format('MM'), day=moment().format('DD') } = useParams();
  const [apod, setApod] = useState({});
  const [apodList, setApodList] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?date=`+year+`-`+month+`-`+day+`&api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU`
      )
      .then((res) => {
        setApod(res.data);
        // setHeaders(res);
      });
  }, [year,month,day]);

  return (
    <Container>
      <h2>Astronomy Photo of the Day {apod.date}</h2>

      <Card className="bg-dark text-white">
        <Card.Img src={apod.url} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>{apod.title}</Card.Title>
          <Card.Text>
            {apod.explanation}
          </Card.Text>
          <Card.Text>Date: {apod.date}</Card.Text>
        </Card.ImgOverlay>
      </Card> 

      {/* <ReactJson src={apod}></ReactJson> */}
    </Container>
  );
};
