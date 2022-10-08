import React, { useEffect, useRef, useState } from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetsDataState, mapResolutionState } from '../../store/atoms';
import { DatasetCompleteData } from '../../store/types';
import { Spinner } from '@vechaiui/react'
import { loadDataset, loadUserDataset } from '../../api';
import { mapColours } from '../../config';
import RenderedColumnSelect from '../RenderedColumnSelect';

interface MapProps {
  dataset: DatasetCompleteData;
}

const Map: React.FC<MapProps> = ({ dataset }) => {
  const resolution = useRecoilValue(mapResolutionState);
  const map = useRef<HTMLDivElement>(null);
  const [datasetsData, setDatasetsData] = useRecoilState(datasetsDataState);
  const [renderedColumn, setRenderedColumn] = useState<string>();
  let columnOptions: string[] = [];


  if (dataset.data) {
    columnOptions = Object.keys(Object.values(dataset.data[resolution])[0].value);
    if (renderedColumn === undefined) {
      setRenderedColumn(columnOptions[0]);
    }
  }

  useEffect(() => {
    if (dataset.data) {
      return;
    }

    if (dataset.type === 'public') {
      loadDataset(dataset.id)
        .then((result) => {
          setDatasetsData({
            ...datasetsData,
            [dataset.id]: result,
          });
        });
    } else {
      loadUserDataset(dataset.id)
        .then((result) => {
          setDatasetsData({
            ...datasetsData,
            [dataset.id]: result,
          });
        });
    }
  }, [dataset]);

  useEffect(() => {
    if (!dataset.data || renderedColumn === undefined) {
      return;
    }

    for (let [areaId, areaData] of Object.entries(dataset.data[resolution])) {
      const areaElement: SVGPathElement | null | undefined = map.current?.querySelector(`svg [data-area-id="${areaId}"]`);

      if (!areaElement) {
        continue;
      }

      const percentage = areaData.percentage[renderedColumn];
      const tooltipValue = areaElement.getAttribute("data-label") + ": " + Math.round(areaData.value[renderedColumn] * 100) / 100;

      areaElement.setAttribute('fill', mapColours[(dataset.index % mapColours.length) + (dataset.type === 'user' ? 4 : 0)]);
      areaElement.setAttribute('opacity', (0.5 + (parseFloat(percentage) / 2)).toString());
      areaElement.innerHTML = `<title>${tooltipValue}</title>`;
    }
  }, [map, resolution, dataset, renderedColumn]);

  return (
    <div className="w-full lg:w-1/2 px-2 pb-4">
      <div className="border p-6 relative" ref={map}>
        <h2 className="text-xl font-bold relative z-20 max-w-[48%]">{dataset.description} {renderedColumn}</h2>
        <div className={dataset.data ? '' : 'opacity-0'}>
          <div className="">
          {resolution === 'regions' && <Regions />}
          {resolution === 'counties' && <Counties />}
          </div>
          <RenderedColumnSelect state={[renderedColumn, setRenderedColumn]} values={columnOptions} />
        </div>
        {!dataset.data &&
          <Spinner className="text-red-600 absolute top-1/2 left-1/2 -ml-8 -mt-8" size="xl" />}
      </div>
    </div>
  );
}

export default Map;
