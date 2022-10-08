export type MojeIDData = {
  address?: {
    country: string;
    formatted: string;
    locality: string;
    postal_code: string;
    street_address: string;
  }
  given_name?: string;
  family_name?: string;
  email?: string;
  aud: string[];
  exp: number;
  iat: number;
  iss: string;
  nonce: string;
  sub: string;
};

export type Dataset = {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  type: 'user' | 'public';
};

export type DatasetUnitValue = Record<string, number>;
export type DatasetUnitColor = Record<string, string>;

export type DatasetUnitData = {
  value: DatasetUnitValue;
  percentage: DatasetUnitColor;
};

export type DatasetData = {
  regions: Record<string, DatasetUnitData>;
  counties: Record<string, DatasetUnitData>;
};

export type DatasetsData = Record<string, DatasetData>;

export type MapResolution = "regions" | "counties";

export type DatasetCompleteData = Dataset & {
  index: number;
  data: DatasetData | null;
};