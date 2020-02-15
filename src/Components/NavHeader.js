import React, { useState, useContext } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from "reactstrap";

import { NavLink, Link, useHistory } from "react-router-dom";
import routes from "../routes/routes";
// import AdminContext from "../context/AdminContext";
import { AdminContext } from "../Store/AdminProvider";
import { USER_LOGGED_OUT } from "../action/actions";
// import { USER_LOGGED_IN } from "../action/actions";

const NavHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const store = useContext(AdminContext);
  const { state, dispatch } = store;
  const { isLoggedIn } = state;

  // example fot dispatch
  // setTimeout(() => {
  //   dispatch({
  //     type: USER_LOGGED_IN,
  //     payload: {}
  //   });
  // }, 3000);
  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    localStorage.setItem("jwtToken", "");
    dispatch({
      type: USER_LOGGED_OUT
    });
    history.push(routes.home);
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">React Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link
                activeClassName="active"
                className="nav-link"
                to={routes.home}
              >
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link
                activeClassName="active"
                className="nav-link"
                to={routes.authors}
              >
                Author
              </Link>
            </NavItem>
            {isLoggedIn ? (
              <NavItem>
                <Link
                  activeClassName="active"
                  className="nav-link"
                  to={routes.newPost}
                >
                  New Posts
                </Link>
              </NavItem>
            ) : null}
            <NavItem>
              <Link
                activeClassName="active"
                className="nav-link"
                to={routes.post}
              />
            </NavItem>
          </Nav>
          {isLoggedIn ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={routes.adminLogin}
            >
              Login
            </NavLink>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavHeader;
