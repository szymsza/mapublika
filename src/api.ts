import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { DatasetData, DatasetUnitData } from './store/types';

const api = axios.create({
  baseURL: API_URL,
});

type DatasetValue = Record<string, Record<string, number>>;

type DatasetResponse = {
  kraje: DatasetValue;
  okresy: DatasetValue;
  obce: {};
};

const getColours = (dataset: DatasetValue): Record<string, DatasetUnitData> => {
  const arrayDataset = Object.values(dataset);

  let minValues = Object.assign({}, arrayDataset[0]);
  let maxValues = Object.assign({}, arrayDataset[0]);

  for (let row of arrayDataset) {
    for (let index of Object.keys(minValues)) {
      // @ts-ignore
      if (parseFloat(row[index]) < parseFloat(minValues[index])) {
        // @ts-ignore
        minValues[index] = parseFloat(row[index]);
      }

      // @ts-ignore
      if (parseFloat(row[index]) > parseFloat(maxValues[index])) {
        // @ts-ignore
        maxValues[index] = parseFloat(row[index]);
      }
    }
  }

  let difference = {};

  for (let key in minValues) {
    // @ts-ignore
    difference[key] = maxValues[key] - minValues[key];
  }

  const withPercentage = Object.fromEntries(Object.entries(dataset).map(([key, value]) => ([
    key,
    Object.fromEntries(Object.entries(value).map(([key2, value2]) =>
      // @ts-ignore
      [key2, (value2 - minValues[key2]) / difference[key2]]
    )),
  ])));

  let result = {};

  for (let key in dataset) {
    // @ts-ignore
    result[key] = {
      value: dataset[key],
      percentage: withPercentage[key]
    };
  }

  return result;
};

export const loadDataset = async (id: string): Promise<DatasetData> => {
  let response: DatasetResponse;

  // TODO - remove
  id = 'porodnost';

  await api.get(`/${id}/`).then(({ data }: AxiosResponse<DatasetResponse>) => {
    response = data;
  });

  // @ts-ignore
  if (!response) {
    return {
      regions: {},
      counties: {},
    };
  }

  return {
    regions: getColours(response.kraje),
    counties: getColours(response.okresy),
  }
}

export default api;