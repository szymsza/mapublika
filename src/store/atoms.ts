import { atom } from 'recoil';
import { Dataset, DatasetsData, MapResolution, MojeIDData } from './types';

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
  default: [],
  /*
    {
      id: 'abortions',
      label: 'Potraty',
      description: 'Počet potratů na 1000 obyvatel',
      selected: false,
    }, {
      id: 'porodnost',
      label: 'Porodnost',
      description: 'Počet žen na tisíc obyvatel s počtem dětí',
      selected: true,
    },
   */
});

export const datasetsDataState = atom<DatasetsData>({
  key: 'datasetsData',
  default: {},
});