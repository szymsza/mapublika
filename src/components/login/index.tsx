import React from 'react';
import { useRecoilState } from 'recoil';
import { mojeIDDataState, mojeIDInitializedState, mojeIDStorageKey } from '../../store/atoms';
import { MojeIDData } from '../../store/types';
import loginButton from '../../assets/icons/login_button.svg';

const Login = () => {
  const [mojeIDData, setMojeIDData] = useRecoilState(mojeIDDataState);
  const [mojeIDInitialized, setMojeIDInitialized] = useRecoilState(mojeIDInitializedState);

  window.setMojeIDLoginData = (data: MojeIDData | null) => {
    setMojeIDData(data);

    if (data) {
      localStorage.setItem(mojeIDStorageKey, JSON.stringify(data));
    } else {
      localStorage.removeItem(mojeIDStorageKey);
    }
  };

  window.setMojeIDInitialized = (success: boolean) => {
    setMojeIDInitialized(success);
  };

  if (mojeIDData)
    return (
      <div>
        {mojeIDData.given_name ?? mojeIDData.email ?? "Jste přihlášeni"}
        <button onClick={() => window.setMojeIDLoginData(null)} className="bg-black text-white py-3 px-5 hover:opacity-80 rounded-lg ml-4">
          Odhlásit se
        </button>
      </div>
    );

  if (!mojeIDInitialized)
    return null;

  return (
    <button onClick={() => window.mojeID.requestAuthentication.bind(window.mojeID)()}>
      <img src={loginButton} alt="Moje ID Login" className="w-60 hover:opacity-80" />
    </button>
  );
}

export default Login;
