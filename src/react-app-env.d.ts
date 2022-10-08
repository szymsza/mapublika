/// <reference types="react-scripts" />

import { MojeIDData } from './store/types';

export {};

declare global {
  interface Window {
    mojeID: {
      requestAuthentication: () => void;
    },
    setMojeIDLoginData: (data: MojeIDData) => void;
    setMojeIDInitialized: (success: boolean) => void;
  }
}