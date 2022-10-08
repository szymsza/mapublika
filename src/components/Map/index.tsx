import React from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import { useRecoilValue } from 'recoil';
import { mapResolutionState } from '../../store/atoms';

interface MapProps {
  title: string;
}

const Map: React.FC<MapProps> = ({ title }) => {
  const resolution = useRecoilValue(mapResolutionState);
  return (
    <div className="border w-1/2 p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      {resolution === 'regions' && <Regions />}
      {resolution === 'counties' && <Counties />}
    </div>
  );
}

export default Map;
