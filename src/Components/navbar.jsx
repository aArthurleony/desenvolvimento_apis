import React from 'react';
import { NavbarContainer, NavbarButton } from '../Styles/NavbarStyled';

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarButton href="#home">Home</NavbarButton>
      <NavbarButton href="#about">About</NavbarButton>
      <NavbarButton href="#contact">Contact</NavbarButton>
    </NavbarContainer>
  );
};

export default Navbar;
