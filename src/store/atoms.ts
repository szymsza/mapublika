import { atom } from 'recoil';

export const textState = atom<string>({
  key: 'text',
  default: 'Test',
});