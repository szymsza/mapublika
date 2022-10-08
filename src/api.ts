import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { DatasetData } from './store/types';

const api = axios.create({
  baseURL: API_URL
});

type DatasetValue = Record<string, Record<string, number>>;

type DatasetResponse = {
  kraje: DatasetValue;
  okresy: DatasetValue;
  obce: {};
};

export const loadDataset = async (id: string): Promise<DatasetData> => {
  let regions: any[] = [];
  let counties: any[] = [];

  // TODO: url = id
  await api.get("/porodnost/").then(({ data }: AxiosResponse<DatasetResponse>) => {
    regions = Object.entries(data.kraje);
    counties = Object.entries(data.okresy);
  });

  console.log(regions, counties);

  // TODO - add colours

  return {
    regions: Object.fromEntries(regions),
    counties: Object.fromEntries(counties)
  }
}

export default api;