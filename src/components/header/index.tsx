import { h } from 'preact';
import { Link } from 'preact-router/match';
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
        <Link activeClassName="active" href="/">Home</Link>
        <Link activeClassName="active" href="/profile">Me</Link>
        <Link activeClassName="active" href="/profile/john">John</Link>
      </nav>
    </header>
  );
}

export default Header;
