import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  user?: string;
}

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user: userParam }: Props) => {
  let { user } = useParams();

  if (userParam)
    user = userParam;

  const [time, setTime] = useState<number>(Date.now());
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="profile">
      <h1>Profile: {user}</h1>
      <p>This is the user profile for a user named {user}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button onClick={() => setCount((count) => count + 1)}>Click Me</button>
        {' '}
        Clicked {count} times.
      </p>
    </div>
  );
};

export default Profile;
