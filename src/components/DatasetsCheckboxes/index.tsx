import React, { useEffect } from 'react';
import { Checkbox } from '@vechaiui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetsLoadedState, datasetsState } from '../../store/atoms';
import { Dataset } from '../../store/types';
import { checkedDatasetsIds } from '../../store/selectors';

import UploadDataset from '../UploadDataset';
import { getPublicDatasets, getUserDatasets } from '../../api';
import { publicDatasets } from '../../config';

const DatasetsCheckboxes = () => {
  const [datasets, setDatasets] = useRecoilState(datasetsState);
  const checkedIds = useRecoilValue(checkedDatasetsIds);
  const [datasetsLoaded, setDatasetsLoaded] = useRecoilState(datasetsLoadedState);

  useEffect(() => {

    if (datasetsLoaded.public === 'none') {
      setDatasetsLoaded({
        ...datasetsLoaded,
        public: 'loading',
      });
      getPublicDatasets()
        .then((data) => {
          // @ts-ignore
          setDatasets(data.map(item => publicDatasets[item]));
          setDatasetsLoaded({
            ...datasetsLoaded,
            public: 'loaded',
          });
        });
    }

  }, [datasets, datasetsLoaded]);

  useEffect(() => {

    if (datasetsLoaded.user === 'none') {
      setDatasetsLoaded({
        ...datasetsLoaded,
        user: 'loading',
      });
      getUserDatasets()
        .then((data) => {
          /*
          // @ts-ignore
          setDatasets(data.map(item => publicDatasets[item]));
           */
          setDatasetsLoaded({
            ...datasetsLoaded,
            user: 'loaded',
          });

        });
    }

  }, [datasets, datasetsLoaded]);

  return (
    <div className="inline-block mb-4 mr-4 rounded-lg shadow-lg border">
      <h2 className="text-2xl border-b text-center p-4">
        Datové sady
      </h2>

      <div className="grid grid-cols-2 gap-10 px-6 py-3">
        <div>
          <h3 className="font-medium leading-tight text-xl py-2">Vlastní</h3>
          <span className="">Nemáte žádné vlastní datové sady</span>
          <div className="my-2">

            <UploadDataset />

          </div>
        </div>

        <div>
          <h3 className="font-medium leading-tight text-xl py-2">Vzorové</h3>
          <Checkbox.Group
            className=""
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
      </div>
    </div>
  );
}

export default DatasetsCheckboxes;
