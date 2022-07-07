import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks';
import { logoutAction } from 'store/index';
import SearchBox from './SearchBox';
import { basePath } from 'config/appConfig';

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
          <Navbar.Brand href={basePath}>Mixology App</Navbar.Brand>
          <SearchBox />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/drinks">
                Drinks
              </NavLink>
              {authToken ? (
                <>
                  <NavLink className="nav-link" to="/collection">
                    Collection
                  </NavLink>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
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
