import React from 'react';
import Map from '../Map';
import { useRecoilValue } from 'recoil';
import { datasetsCompleteData } from '../../store/selectors';

const Maps = () => {
  const datasets = useRecoilValue(datasetsCompleteData);

  return (
    <div>
      {
        datasets.map(dataset => (
          <Map title={dataset.label} key={dataset.id} />
        ))
      }
    </div>
  );
}

export default Maps;
