import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Users from "./pages/users";
import { NavLink, Nav, Navbar } from "react-bootstrap";

export default function App() {

  return (
    <Router>
      <div>
        <Navbar className="navbar-dark bg-primary" expand="lg">
            <Navbar.Brand>Json API test</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink as={Link} to="/">Home</NavLink>
                <NavLink as={Link} to="/about">About</NavLink>
                <NavLink as={Link} to="/users">Users</NavLink>
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
