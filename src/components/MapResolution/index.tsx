import React from 'react';
import { Radio, IconButton } from '@vechaiui/react';
import { useRecoilState } from 'recoil';
import { mapResolutionState } from '../../store/atoms';

const MapResolution = () => {
  const [resolution, setResolution] = useRecoilState(mapResolutionState);

  return (
    <div className="inline-block mb-4 rounded-lg shadow-lg border items-start">
      <label><h2 className="text-2xl border-b text-center py-4 px-8">
        Úroveň rozlišení map
      </h2></label>
      <Radio.Group className="px-6 py-3"
                   value={resolution}
                   onChange={(_, val) => setResolution(val === 'regions' ? val : 'counties')}>
        <Radio size="xl" className="my-1" color="blue" value="regions">
          Kraje
        </Radio>
        <Radio size="xl" className="my-1" color="blue" value="counties">
          Okresy
        </Radio>
        {/*<Radio color="blue" value="3">Obce</Radio>*/}
      </Radio.Group>
    </div>
  );
}

export default MapResolution;
