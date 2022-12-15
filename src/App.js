import "./App.css";
import Graph from "./components/Graph";
import Form from "./components/Form";
import Login from "./components/Login";
import Calculator from "./components/Calculator";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import AnalysisPage from "./components/AnalysisPage";

function App() {
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const Logout = () => {
    localStorage.setItem("userEmail", "");
    setUserEmail("");
  };

  const RequireAuth = ({ children }) => {
    if (userEmail === "") {
      return <Login passUserEmail={setUserEmail} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="App">

        <div className="container mx-auto max-w-10xl text-center drop-shadow-lg text-gray-800">
          <h1 className="text-4xl py-8 mb-10 bg-emerald-400 text-white rounded">
            Track Purse
          </h1>

          <Routes>
            <Route
              exact path={"/"}
              index
              element={
                <RequireAuth>
                  <Navbar bg="primary" expand="lg" sticky="top" variant="dark" >
                    <Container className="container-fluid">
                      <Navbar.Brand className="brand" href="/">
                        <img src="/images/moneybag.png" alt="moneybag" className="Logo" />
                        TrackPurse
                      </Navbar.Brand>
                      <h1 className="text-4xl py-10 mx-20 mb-10 text-white rounded">
                        Welcome, {userEmail}
                      </h1>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="ml-auto">
                          <Nav.Link as={Link} to={"/"}>
                            Home
                          </Nav.Link>
                          <Nav.Link as={Link} to={"/analysis"}>
                            Analysis
                          </Nav.Link>
                        </Nav>
                      </Navbar.Collapse>
                      <button className="button" onClick={Logout}>
                        Logout
                      </button>
                    </Container>
                  </Navbar>
                  <div className="grid md:grid-cols-2 gap-4 py-12">
                    <Graph />
                    <Form />
                    <Calculator />
                  </div>


                </RequireAuth>
              }
            />
            <Route
              exact path={"/analysis"}
              index
              element={
                <RequireAuth>
                  <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
                    <Container className="container-fluid">
                      <Navbar.Brand className="brand" href="/">
                        <img src="/images/moneybag.png" alt="moneybag" className="Logo" />
                        TrackPurse
                      </Navbar.Brand>
                      <h1 className="text-4xl py-10 mx-20 mb-10 text-center text-white rounded">
                        Welcome, {userEmail}
                      </h1>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="ml-auto">
                          <Nav.Link as={Link} to={"/"}>
                            Home
                          </Nav.Link>
                          <Nav.Link as={Link} to={"/analysis"}>
                            Analysis
                          </Nav.Link>
                        </Nav>
                      </Navbar.Collapse>
                      <button className="button" onClick={Logout}>
                        Logout
                      </button>
                    </Container>
                  </Navbar>

                  <div className="py-12">
                    <AnalysisPage
                    />
                  </div>

                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
