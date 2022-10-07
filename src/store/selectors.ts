import { selector } from 'recoil';
import { textState } from './atoms';

export const textLengthState = selector({
  key: 'textLength',
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  }
});