import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { textState } from '../../store/atoms';
import { textLengthState } from '../../store/selectors';

const Header = () => {
  const [text, setText] = useRecoilState(textState);
  const textLength = useRecoilValue(textLengthState);

  return (
    <header className="header">
      <h1 onClick={() => setText('test69 420')}>Preact App {text}, délka: {textLength} </h1>
      <nav>
        <NavLink end={true} className={({ isActive }) => isActive ? "active" : ""} to="/">Home</NavLink>
        <NavLink end={true} className={({ isActive }) => isActive ? "active" : ""} to="/profile">Me</NavLink>
        <NavLink end={true} className={({ isActive }) => isActive ? "active" : ""} to="/profile/john">John</NavLink>
      </nav>
    </header>
  );
}

export default Header;
