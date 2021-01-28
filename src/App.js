import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Users from "./pages/users";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "./elements/navlink";

export default function App() {

  return (
    <Router>
      <div>
        <Navbar className="navbar-dark bg-primary" expand="lg">
            <Navbar.Brand>Json API test</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/users">Users</NavLink>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}
