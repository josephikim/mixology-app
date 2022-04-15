import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../hooks';
import { logoutAction } from '../store/index';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const authenticated = useAppSelector((state) => state.auth.accessToken);

  const handleLogout = (): void => {
    dispatch(logoutAction());
  };

  return (
    <div className="Header fixed-header">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Mixology App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            {authenticated ? (
              <Nav>
                <Nav.Link href="/mydrinks">Home</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
