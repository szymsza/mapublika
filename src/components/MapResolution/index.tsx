import React from 'react';
import { Radio } from '@vechaiui/react';
import { useRecoilState } from 'recoil';
import { mapResolutionState } from '../../store/atoms';

const MapResolution = () => {
  const [resolution, setResolution] = useRecoilState(mapResolutionState);

  return (
    <div className="border inline-block p-2">
      <label>Úroveň rozlišení</label>
      <Radio.Group className="space-x-4"
                   inline
                   value={resolution}
                   onChange={(_, val) => setResolution(val === 'regions' ? val : 'counties')}>
        <Radio color="blue" value="regions">
          Kraje
        </Radio>
        <Radio color="blue" value="counties">
          Okresy
        </Radio>
        {/*<Radio color="blue" value="3">Obce</Radio>*/}
      </Radio.Group>
    </div>
  );
}

export default MapResolution;
