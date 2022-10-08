import React from 'react';
import Map from '../Map';
import { useRecoilValue } from 'recoil';
import { datasetsCompleteData } from '../../store/selectors';

const Maps = () => {
  const datasets = useRecoilValue(datasetsCompleteData);

  return (
    <div className="flex gap-4">
      {!datasets.length && <p>Vyberte datovou sadu z menu výše</p>}
      {
        datasets.map(dataset => (
          <Map dataset={dataset} key={dataset.id} />
        ))
      }
    </div>
  );
}

export default Maps;
