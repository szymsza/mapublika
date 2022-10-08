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
};

export type DatasetUnitData = {
  value: number;
  color: string;
};

export type DatasetData = {
  regions: Record<string, DatasetUnitData>;
  counties: Record<string, DatasetUnitData>;
};

export type DatasetsData = Record<string, DatasetData>;

export type MapResolution = "regions" | "counties";

export type DatasetCompleteData = Dataset & {
  data: DatasetData | null;
};