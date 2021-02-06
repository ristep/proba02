import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Image, Row } from "react-bootstrap";
import ReactJson from "react-json-view";
import { Link } from "react-router-dom";

export const Epic = () => {
  const [epicDayList, setEpicDayList] = useState([]);
  const [filtList, setFiltList] = useState([]);
  const [year, setYear] = useState('2021');
  const [month, setMonth] = useState('02');
  const [day, setDay] = useState('04');
  const [photoData, setPhotoData] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    setFiltList(epicDayList.filter(ym => ym.startsWith(year + '-' + month + '-')));
  }, [year, month, epicDayList]);

  useEffect(() => {
    axios.get(`https://api.nasa.gov/EPIC/api/natural/available?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU`)
      .then(res => {
        setEpicDayList(res.data);
      })
  }, []);

  useEffect(() => {
    setPhotoData([]);
    setPhotoUrl('');
    axios.get('https://api.nasa.gov/EPIC/api/natural/date/' + year + '-' + month + '-' + day + '?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU').then(res => {
        setPhotoData(res.data);
        if(res.data){
          setPhotoUrl('https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/jpg/epic_1b_' + res.data[0].identifier + '.jpg');
        }
    });
  }, [year, month, day]);

  const thumbClick = (id) => {
    setPhotoUrl('https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/jpg/epic_1b_' + id + '.jpg');
  };

  return (
    <div>
      <Container style={{ padding: '1em' }}>
        <Row>
          <Col>
            <h1>EPIC images on {year + '-' + month + '-' + day}</h1>
          </Col>
          <Col>
            <ButtonGroup>
              <DropdownButton onSelect={(yy) => setYear(yy)} as={ButtonGroup} title={"Year - " + year} id="bg-nested-dropdown">
                <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
                <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
                <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
                <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
                <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
              </DropdownButton>
              <DropdownButton onSelect={(mm) => setMonth(mm)} as={ButtonGroup} title={"month - " + month} id="bg-nested-dropdown">
                <Dropdown.Item eventKey="01">January</Dropdown.Item>
                <Dropdown.Item eventKey="02">February</Dropdown.Item>
                <Dropdown.Item eventKey="03">March</Dropdown.Item>
                <Dropdown.Item eventKey="04">April</Dropdown.Item>
                <Dropdown.Item eventKey="05">May</Dropdown.Item>
                <Dropdown.Item eventKey="06">June</Dropdown.Item>
                <Dropdown.Item eventKey="07">July</Dropdown.Item>
                <Dropdown.Item eventKey="08">August</Dropdown.Item>
                <Dropdown.Item eventKey="09">September</Dropdown.Item>
                <Dropdown.Item eventKey="10">October</Dropdown.Item>
                <Dropdown.Item eventKey="11">November</Dropdown.Item>
                <Dropdown.Item eventKey="12">December</Dropdown.Item>
              </DropdownButton>
              <DropdownButton onSelect={(dd) => setDay(dd)} as={ButtonGroup} title={"day - " + day} id="bg-nested-dropdown">
                {filtList.map((dd, key) => (
                  <Dropdown.Item id={key} eventKey={dd.substr(dd.length - 2)} >
                    {dd}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </ButtonGroup>
          </Col>
        </Row>
        <Row style={{ paddingTop: '1em' }}>
          <Col>
          {photoData.map((pd, key) => (
            <Button variant="light" style={{ padding: '0.4em' }} onClick={() => thumbClick(pd.identifier)}>
              <Image src={'https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/thumbs/epic_1b_' + pd.identifier + '.jpg'} style={{ maxWidth: '60px' }} rounded />
            </Button>
          ))}
        </Col>
        </Row>
        <Row style={{ paddingTop: '1em' }}>
          <Col>
            <Button variant="light" style={{ padding: '0.4em' }}>
              <img src={photoUrl} />
            </Button>
          </Col>
        </Row>
      </Container>

      {/* <ReactJson src={photoData} /> */}

    </div>
  );
}
//https://epic.gsfc.nasa.gov/archive/natural/2021/01/14/thumbs/epic_1b_{identifier}.png
// {filtList.map((dd, key) => (
//   <Button id={key} onClick={() => setDay(dd.substr(dd.length - 2))} size="sm">
//     {dd}
//   </Button>
// ))}
