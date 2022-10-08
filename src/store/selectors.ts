import { selector } from 'recoil';
import { datasetsDataState, datasetsState, datasetsUserState } from './atoms';
import { DatasetCompleteData } from './types';

export const checkedDatasetsIds = selector<string[]>({
  key: 'checkedDatasetsIds',
  get: ({ get }) => {
    const datasets = get(datasetsState);
    return datasets.filter((d) => d.selected).map((d) => d.id);
  },
});

export const checkedDatasetsIdsUser = selector<string[]>({
  key: 'checkedDatasetsIdsUser',
  get: ({ get }) => {
    const datasets = get(datasetsUserState);
    return datasets.filter((d) => d.selected).map((d) => d.id);
  },
});

export const datasetsCompleteData = selector<DatasetCompleteData[]>({
  key: 'datasetsCompleteData',
  get: ({ get }) => {
    const datasets = get(datasetsState);
    const datasetData = get(datasetsDataState);

    return datasets
      .map((dataset,  index) => ({
        ...dataset,
        index,
      }))
      .filter((d) => d.selected)
      .map((dataset) => ({
        ...dataset,
        data: datasetData[dataset.id] ?? null,
      }));
  },
});

export const datasetsUserCompleteData = selector<DatasetCompleteData[]>({
  key: 'datasetsUserCompleteData',
  get: ({ get }) => {
    const datasets = get(datasetsUserState);
    const datasetData = get(datasetsDataState);

    return datasets
      .map((dataset,  index) => ({
        ...dataset,
        index,
      }))
      .filter((d) => d.selected)
      .map((dataset) => ({
        ...dataset,
        data: datasetData[dataset.id] ?? null,
      }));
  },
});