/// <reference types="react-scripts" />

export {};

declare global {
  interface Window {
    mojeID: {
      requestAuthentication: () => void;
    }
  }
}