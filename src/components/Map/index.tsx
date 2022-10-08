import React, { useEffect, useRef } from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetsDataState, mapResolutionState } from '../../store/atoms';
import { DatasetCompleteData } from '../../store/types';
import { Spinner } from '@vechaiui/react'
import { loadDataset } from '../../api';

interface MapProps {
  dataset: DatasetCompleteData;
}

const Map: React.FC<MapProps> = ({ dataset }) => {
  const resolution = useRecoilValue(mapResolutionState);
  const map = useRef<HTMLDivElement>(null);
  const [datasetsData, setDatasetsData] = useRecoilState(datasetsDataState);

  useEffect(() => {
    if (dataset.data) {
      return;
    }

    loadDataset(dataset.id)
      .then((result) => {
        setDatasetsData({
          ...datasetsData,
          [dataset.id]: result,
        });
      });
  }, [dataset]);

  useEffect(() => {
    if (!dataset.data) {
      return;
    }

    for (let [areaId, areaData] of Object.entries(dataset.data[resolution])) {
      console.log(areaData);
      const percentage = areaData.percentage[1];

      // TODO - set tooltip to areaData.value[0];

      // TODO - change zeroes above to column chosen from select

      const areaElement: SVGPathElement | null | undefined = map.current?.querySelector(`svg [data-area-id="${areaId}"]`);

      if (!areaElement) {
        continue;
      }

      areaElement.setAttribute('fill', '#123456');
      areaElement.setAttribute('opacity', (0.5 + (parseFloat(percentage) / 2)).toString());
    }
  }, [map, resolution, dataset]);

  return (
    <div className="border w-1/2 p-6 relative" ref={map}>
      <h2 className="text-xl font-bold">{dataset.description}</h2>
      <div className={dataset.data ? '' : 'opacity-0'}>
        {resolution === 'regions' && <Regions />}
        {resolution === 'counties' && <Counties />}
      </div>
      {!dataset.data && <Spinner className="text-red-600 absolute top-1/2 left-1/2 -ml-8 -mt-8" size="xl" />}
    </div>
  );
}

export default Map;
