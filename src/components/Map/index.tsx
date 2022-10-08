import React, { useEffect, useRef } from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetsDataState, mapResolutionState } from '../../store/atoms';
import { DatasetCompleteData } from '../../store/types';
import { Spinner } from '@vechaiui/react'
import { loadDataset } from '../../api';
import { mapColours } from '../../config';

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
      const areaElement: SVGPathElement | null | undefined = map.current?.querySelector(`svg [data-area-id="${areaId}"]`);

      if (!areaElement) {
        continue;
      }

      // TODO - change zeroes below to column chosen from select
      const percentage = areaData.percentage[1];
      const tooltipValue = areaElement.getAttribute("data-label") + ": " + Math.round(areaData.value[1]);

      areaElement.setAttribute('fill', mapColours[dataset.index % mapColours.length]);
      areaElement.setAttribute('opacity', (0.5 + (parseFloat(percentage) / 2)).toString());
      areaElement.innerHTML = `<title>${tooltipValue}</title>`;
    }
  }, [map, resolution, dataset]);

  return (
    <div className="w-full lg:w-1/2 px-2 pb-4">
      <div className="border p-6 relative" ref={map}>
        <h2 className="text-xl font-bold">{dataset.description} {dataset.index}</h2>
        <div className={dataset.data ? '' : 'opacity-0'}>
          {resolution === 'regions' && <Regions />}
          {resolution === 'counties' && <Counties />}
        </div>
        {!dataset.data &&
          <Spinner className="text-red-600 absolute top-1/2 left-1/2 -ml-8 -mt-8" size="xl" />}
      </div>
    </div>
  );
}

export default Map;
