import React from 'react';
import { Select } from '@vechaiui/react';

interface RenderedColumnSelectProps {
  state: [(string | undefined), React.Dispatch<React.SetStateAction<string | undefined>>];
  values: string[];
};

const RenderedColumnSelect: React.FC<RenderedColumnSelectProps> = ({ state, values }) => {
  const [value, setValue] = state;

  return (
    <div className="inline-block mb-4 rounded-lg shadow-md border items-start lg:absolute mt-6 top-0 right-6 bg-white">
      <label>
        <h2 className="text-xl border-b text-center py-3 px-5">
          Zvolte zobrazovanou hodnotu
        </h2>
      </label>
      <div className="m-4">
        <Select value={value} onChange={(e) => setValue(e.target.value)}>
          {
            values.map((value: string) => (
              <option value={value} key={value}>{value}</option>
            ))
          }
        </Select>
      </div>
    </div>
  );
}

export default RenderedColumnSelect;
