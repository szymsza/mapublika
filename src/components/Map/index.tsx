import React, { useEffect, useRef } from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import { useRecoilValue } from 'recoil';
import { mapResolutionState } from '../../store/atoms';
import { DatasetCompleteData } from '../../store/types';
import { Spinner } from '@vechaiui/react'

interface MapProps {
  dataset: DatasetCompleteData;
}

const colouring = {
  regions: {
    'CZ010': '#123456',
    'CZ051': '#248735',
  },
  counties: {
    'CZ0523': '#d13497',
    'CZ0642': '#f01945',
  },
};

const Map: React.FC<MapProps> = ({ dataset }) => {
  const resolution = useRecoilValue(mapResolutionState);
  const map = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dataset.data) {
      return;
    }

    // TODO - load data from API
  }, [dataset]);

  useEffect(() => {
    if (!dataset.data) {
      return;
    }

    // TODO - new colouring based on data

    const colours = colouring[resolution];

    for (let [areaId, colour] of Object.entries(colours)) {
      const areaElement: SVGPathElement | null | undefined = map.current?.querySelector(`svg [data-area-id="${areaId}"]`);

      if (!areaElement) {
        continue;
      }

      areaElement.setAttribute('fill', colour);
    }
  }, [map, colouring, resolution, dataset]);

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
