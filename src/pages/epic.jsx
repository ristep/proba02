import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment";

import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Image, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

export const Epic = () => {
  const { year = moment().format('YYYY'), month = moment().format('MM'), day=moment().format('DD'), ndx=0 } = useParams();
  
  const [epicDayList, setEpicDayList] = useState([]);
  const [filtList, setFiltList] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  
  const history = useHistory();
  const historyPush = (yy, mm, dd, ii) => {
    history.push("/epic/" + yy + "/" + mm + "/" + dd + '/' + ii);
  };

  const photoUri = (type,ndx) => {
    const ext = type==='png' ? '.png' : '.jpg'; 
    if(photoList[ndx]) 
      return 'https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/'+type+'/epic_1b_' + photoList[ndx].identifier + ext;
    return '';  
  };

  useEffect(() => {
    axios.get(`https://api.nasa.gov/EPIC/api/natural/available?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU`)
      .then(res => {
        setEpicDayList(res.data);
      }); 
  }, []);

  useEffect(() => {
    setFiltList(epicDayList.filter(ym => ym.startsWith(year + '-' + month + '-')));
  }, [year, month, epicDayList]);

  useEffect(() => {
    axios.get('https://api.nasa.gov/EPIC/api/natural/date/' + year + '-' + month + '-' + day + '?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU')
      .then(res => {
        setPhotoList(res.data);
      });
  }, [year, month, day]);

  return (
    <div>

      <Container style={{ padding: '1em' }}>
        <Row>
          <Col>
            <h1>EPIC images on {year + '-' + month + '-' + day}</h1>
          </Col>
          <Col>
            <ButtonGroup>
              <DropdownButton onSelect={(yy) => historyPush(yy,month,day, ndx)} as={ButtonGroup} title={"Year - " + year} id="bg-nested-dropdown">
                <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
                <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
                <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
                <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
                <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
              </DropdownButton>
              <DropdownButton onSelect={(mm) => historyPush(year, mm, day, ndx)} as={ButtonGroup} title={"month - " + month} id="bg-nested-dropdown">
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
              <DropdownButton onSelect={(dd) => historyPush(year,month,dd,ndx)} as={ButtonGroup} title={"day - " + day} id="bg-nested-dropdown">
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
          {photoList.map((pd, key) => (
            <Button variant={ key!==ndx ? 'light' : 'primary'} style={{ padding: '0.4em' }} onClick={() => historyPush(year,month,day,key)} id={key}>
              <Image src={photoUri('thumbs',key)} style={{ maxWidth: '60px' }} rounded />
              {/* <Image src={'https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/thumbs/epic_1b_' + pd.identifier + '.jpg'} style={{ maxWidth: '60px' }} rounded /> */}
            </Button>
          ))}
        </Col>
        </Row>
        <Row style={{ paddingTop: '1em' }}>
          <Col>
            <Button onClick={() => window.open(photoUri('png',ndx), '_blank')} variant="light" style={{ padding: '0.4em' }}>
              <img src={photoUri('jpg',ndx)} alt='Photo...' />
            </Button>
          </Col>
        </Row>
      </Container> 

    </div>
  );
}
