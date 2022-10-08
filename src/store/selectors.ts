import { selector } from 'recoil';
import { datasetsState } from './atoms';

export const checkedDatasetsIds = selector<string[]>({
  key: 'checkedDatasetsIds',
  get: ({ get }) => {
    const datasets = get(datasetsState);
    return datasets.filter((d) => d.selected).map((d) => d.id);
  }
});