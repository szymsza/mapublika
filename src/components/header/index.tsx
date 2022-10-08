import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/mapublika_logo.png';
import hacker from '../../assets/hund/hacker_compact.png';
import Login from '../login';

const Header = () => {
  return (
    <header className="flex px-8 py-4 bg-slate-200 drop-shadow-md items-center justify-between">
      <NavLink end={true} to="/" className="inline-block">
        <img src={logo} alt="Mapublika" className="w-80" />
      </NavLink>

      <div className="flex items-center gap-8">
        <NavLink end={true} to="/interactive" className="inline-block">
          <img src={hacker} className="w-16" alt="Interaktivní mód" />
        </NavLink>
        <Login />
      </div>
    </header>
  );
}

export default Header;
