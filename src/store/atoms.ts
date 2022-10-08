import { atom } from 'recoil';
import { Dataset, MapResolution, MojeIDData } from './types';

export const mojeIDStorageKey = 'mojeIDLoggedIn';
export const mojeIDDataState = atom<MojeIDData | null>({
  key: 'mojeIDData',
  default: JSON.parse(localStorage.getItem(mojeIDStorageKey)!),
});

export const mojeIDInitializedState = atom<boolean>({
  key: 'mojeIDInitialized',
  default: false,
});

export const mapResolutionState = atom<MapResolution>({
  key: 'mapResolution',
  default: 'regions',
});

export const datasetsState = atom<Dataset[]>({
  key: 'datasets',
  default: [
    {
      id: 'abortions',
      label: 'Potraty',
      selected: false,
    }, {
      id: 'porodnost',
      label: 'Porodnost',
      selected: true,
    },
  ],
});