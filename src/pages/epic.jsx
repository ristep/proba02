import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactJson from "react-json-view";

import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const Epic = () => {
  const history = useHistory();
  const [epicList, setEpicList] = useState({});

  useEffect(() => {
    axios.get(`https://api.nasa.gov/EPIC/api/natural/all?api_key=14kQ7Rt7juZFOot4zYe0Tacjt0Z7s66H3MjEbdRU`)
    .then(res => {
      setEpicList(res.data);
    })  
  },[]);

  const onClick = () => {
    history.push('/users');
  }

  return(
    <div>
      <h1>EPIC images</h1>
      <ReactJson src={epicList} />
      <Button onClick={onClick}>Push to Users</Button>
    </div>
  );  
}
//https://epic.gsfc.nasa.gov/archive/natural/2021/01/14/png/epic_1b_20210114124446.png