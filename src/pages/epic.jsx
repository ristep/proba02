import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import ReactJson from "react-json-view";

export const Epic = () => {
  const [epicDayList, setEpicDayList] = useState([]);
  const [filtList, setFiltList] = useState([]);
  const [year, setYear] = useState('2021');
  const [month, setMonth] = useState('02');
  const [day, setDay] = useState('05');
  const [photoData, setPhotoData] = useState([]);

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
    axios.get('https://api.nasa.gov/EPIC/api/natural/date/'+year+'-'+month+'-'+day+'?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU').then( res => {
        setPhotoData(res.data);
    });
  }, [year,month,day]);
  return (
    <div>
      <h1>EPIC images on {year + '-' + month + '-' + day}</h1>
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
        <DropdownButton onSelect={(dd) => setDay(dd)} as={ButtonGroup} title={"day - " + day } id="bg-nested-dropdown">
          {filtList.map( (dd, key) => (
            <Dropdown.Item id={key} eventKey={dd.substr(dd.length-2)} >
              {dd}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </ButtonGroup>
      <hr></hr>
      {filtList.map( (dd, key) => (
        <Button id={key} onClick={() => setDay(dd.substr(dd.length-2))} size="sm">
          {dd}
        </Button>
      ))}
      <hr />
      { photoData.map( (pd, key) => (
        <img src={'https://epic.gsfc.nasa.gov/archive/natural/'+year+'/'+month+'/'+day+'/thumbs/epic_1b_'+pd.identifier+'.jpg'} />
      ))} 

      {/* <ReactJson src={photoData} /> */}

    </div>
  );
}
//https://epic.gsfc.nasa.gov/archive/natural/2021/01/14/thumbs/epic_1b_{identifier}.png