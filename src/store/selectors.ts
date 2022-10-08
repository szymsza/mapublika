import { selector } from 'recoil';
import { datasetsDataState, datasetsState } from './atoms';
import { DatasetCompleteData } from './types';

export const checkedDatasetsIds = selector<string[]>({
  key: 'checkedDatasetsIds',
  get: ({ get }) => {
    const datasets = get(datasetsState);
    return datasets.filter((d) => d.selected).map((d) => d.id);
  },
});

export const datasetsCompleteData = selector<DatasetCompleteData[]>({
  key: 'datasetsCompleteData',
  get: ({ get }) => {
    const datasets = get(datasetsState);
    const datasetData = get(datasetsDataState);

    return datasets.filter((d) => d.selected)
      .map((dataset) => ({
        ...dataset,
        data: datasetData[dataset.id] ?? {},
      }));
  },
});