import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Container } from "react-bootstrap";

const axParam = {
						// Link to Home.md on github repositories
  baseURL: "https://raw.githubusercontent.com/ristep/proba02/main/Home.md",
	headers: {
		"Content-type": "application/text"
	}
};

const axi = axios.create(axParam);
  
export const Home = () =>{
	const [rdm, setRdm] = useState('Read-me.md');
	
	useEffect(() => {
		axi.get()
    .then((response) => { 
      setRdm(response.data);
    })
    .catch((error) => {
        console.warn(error);
    });
	},[]);

	return(
		<Container style={{marginTop:"1.5em"}}>
			<div>
				<ReactMarkdown source={rdm} />
			</div> 
		</Container>
	)
}
