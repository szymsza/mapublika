import React from 'react';
import UploadIcon from '../../assets/icons/upload.svg';
import { Checkbox, IconButton } from '@vechaiui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetsState } from '../../store/atoms';
import { Dataset } from '../../store/types';
import { checkedDatasetsIds } from '../../store/selectors';

const DatasetsCheckboxes = () => {
  const [datasets, setDatasets] = useRecoilState(datasetsState);
  const checkedIds = useRecoilValue(checkedDatasetsIds);

  return (
    <div className="border m-4 inline-block p-2">
      <label htmlFor="uploadFile">Nahrát vlastní datový soubor</label>
      <IconButton variant="solid" color="blue" id="uploadFile">
        <img src={UploadIcon} className="w-6 h-6" alt="Nahrajte vlastní datový soubor" />
      </IconButton>
      <Checkbox.Group
        className="space-x-4"
        inline
        value={checkedIds}
        onChange={(newValues) => setDatasets(
          datasets.map((dataset) => ({
            ...dataset,
            selected: newValues.includes(dataset.id),
          })),
        )}
      >
        {datasets.map((dataset: Dataset) => (
          <Checkbox color="blue" value={dataset.id} key={dataset.id}>{dataset.label}</Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
}

export default DatasetsCheckboxes;
