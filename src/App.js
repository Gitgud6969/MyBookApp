import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";

const BooksApp = () => {
  return (
    <Router>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">BookApp</Navbar.Brand>
        <Nav className="mr-auto justify-content-center">
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default BooksApp;
