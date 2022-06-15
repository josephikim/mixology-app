import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from 'hooks';
import { logoutAction } from 'store/index';
import SearchBox from './SearchBox';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const authToken = useAppSelector((state) => state.auth.accessToken);

  const handleLogout = (): void => {
    dispatch(logoutAction());
  };

  return (
    <div className="Header fixed-header">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Mixology App</Navbar.Brand>
          <SearchBox />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/drinks">Drinks</Nav.Link>
              {authToken ? (
                <>
                  <Nav.Link href="/collection">Collection</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
