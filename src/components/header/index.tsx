import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/mapublika_logo.jpg';
import hacker from '../../assets/hund/hacker_compact.png';

const Header = () => {
  return (
    <header className="flex mx-8" style={{justifyContent: "space-between"}}>
      <NavLink end={true} to="/" className="inline-block">
        <img src={logo} alt="Mapublika" width="500px"/>
      </NavLink>
      <NavLink end={true} to="/interactive" className="inline-block">
        <img src={hacker} width="100px" alt="Interaktivní mód" />
      </NavLink>
    </header>
  );
}

export default Header;
