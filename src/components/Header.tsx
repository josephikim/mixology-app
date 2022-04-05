import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../store/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const authenticated = useAppSelector((state) => state.auth.accessToken);

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <div className="Header fixed-header">
      <Navbar collapseOnSelect bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Mixology App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/mydrinks">Home</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
              {authenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
