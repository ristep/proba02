import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import { NavLink } from "./elements/navlink";

import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Apod } from "./pages/apod";
import { Epic } from "./pages/epic";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar className="navbar-dark bg-primary" expand="lg">
          <Navbar.Brand>Test</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/apod">APOD</NavLink>
              <NavLink to="/epic">EPIC</NavLink>
              <NavLink to="/about">About</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/apod/:year/:month/:day">
            <Apod />
          </Route>
          <Route path="/apod/">
            <Apod />
          </Route>
          <Route path="/epic/:year/:month/:day/:ndx">
            <Epic />
          </Route>
          <Route path="/epic/:year/:month/:day">
            <Epic />
          </Route>
          <Route path="/epic">
            <Epic />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
