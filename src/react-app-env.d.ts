/// <reference types="react-scripts" />

export {};

declare global {
  interface Window {
    mojeId: {
      requestAuthentication: () => void;
    }
  }
}