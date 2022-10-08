import React, { useEffect, useRef } from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import { useRecoilValue } from 'recoil';
import { mapResolutionState } from '../../store/atoms';

interface MapProps {
  title: string;
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

const Map: React.FC<MapProps> = ({ title }) => {
  const resolution = useRecoilValue(mapResolutionState);
  const map = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const colours = colouring[resolution];

    for (let [areaId, colour] of Object.entries(colours)) {
      const areaElement: SVGPathElement | null | undefined = map.current?.querySelector(`svg [data-area-id="${areaId}"]`);

      if (!areaElement) {
        continue;
      }

      areaElement.setAttribute('fill', colour);
    }
  }, [map, colouring, resolution]);

  return (
    <div className="border w-1/2 p-6" ref={map}>
      <h2 className="text-xl font-bold">{title}</h2>
      {resolution === 'regions' && <Regions />}
      {resolution === 'counties' && <Counties />}
    </div>
  );
}

export default Map;
