import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useRouter } from 'next/router';

import { appTitle, appRoutes } from '../../utils/navbar.util';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">{appTitle}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {appRoutes.map(({ name, path }) => (
            <NavItem key={path}>
              <NavLink
                className="clickable"
                onClick={() => router.push(path)}
                active={path === router.pathname}
              >
                {name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;