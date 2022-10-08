import React from 'react';
import Map from '../Map';
import { useRecoilValue } from 'recoil';
import { datasetsCompleteData, datasetsUserCompleteData } from '../../store/selectors';

const Maps = () => {
  const datasets = useRecoilValue(datasetsCompleteData);
  const datasetsUser = useRecoilValue(datasetsUserCompleteData);

  return (
    <div className="flex flex-wrap -mx-2">
      {!datasets.length && !datasetsUser.length  && <p>Vyberte datovou sadu z menu výše</p>}
      {
        datasetsUser.map((dataset) => (
          <Map dataset={dataset} key={dataset.id} />
        ))
      }
      {
        datasets.map((dataset) => (
          <Map dataset={dataset} key={dataset.id} />
        ))
      }
    </div>
  );
}

export default Maps;
