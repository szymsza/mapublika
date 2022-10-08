import React from 'react';
import { Radio, IconButton, Select } from '@vechaiui/react';
import { useRecoilState } from 'recoil';
import { mapResolutionState } from '../../store/atoms';

const MapResolution = () => {
  const [resolution, setResolution] = useRecoilState(mapResolutionState);

  return (
    <div className="inline-block mb-4 rounded-lg shadow-lg border items-start">
      <label><h2 className="text-2xl border-b text-center py-4 px-8">
        Zvolte frekvenci jevu
      </h2></label>
      <div className="m-4">
        <Select placeholder="Počet...">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Select>
        </div>
    </div>
  );
}

export default MapResolution;
