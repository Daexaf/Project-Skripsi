import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./order.css";
import { useNavigate, useParams } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { id_tables } = useParams();

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand>
          <div
            className="logo cursor-pointer"
            onClick={() => {
              console.log("trigre");
              navigate(`/home/${id_tables}`);
            }}
          >
            <h2 className="d-flex align-items-center gap-1">
              <span>
                <i className="ri-restaurant-2-line"></i>
              </span>
              {""}
              E-Duren
            </h2>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="mr-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
