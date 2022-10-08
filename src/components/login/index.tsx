import React from 'react';
import { useRecoilState } from 'recoil';
import { mojeIDDataState, mojeIDInitializedState, mojeIDStorageKey } from '../../store/atoms';
import { MojeIDData } from '../../store/types';

const Login = () => {
  const [mojeIDData, setMojeIDData] = useRecoilState(mojeIDDataState);
  const [mojeIDInitialized, setMojeIDInitialized] = useRecoilState(mojeIDInitializedState);

  window.setMojeIDLoginData = (data: MojeIDData) => {
    setMojeIDData(data);
    localStorage.setItem(mojeIDStorageKey, JSON.stringify(data));
  };

  window.setMojeIDInitialized = (success: boolean) => {
    setMojeIDInitialized(success);
  };

  if (!mojeIDInitialized)
    return null;

  if (!mojeIDData)
    return (
      <button onClick={() => window.mojeID.requestAuthentication.bind(window.mojeID)()}>LOGIN</button>
    );

  return (
    <p>Logged in, cg!!!</p>
  );
}

export default Login;
