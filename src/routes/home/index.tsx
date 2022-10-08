import React from 'react';
import MapResolution from '../../components/MapResolution';
import MapSettings from '../../components/MapSettings';
import Maps from '../../components/Maps';
import DatasetsCheckboxes from '../../components/DatasetsCheckboxes';

const Home = () => (
  <div className="home px-8">
    <div className="flex items-start pt-6 pb-6">
      <DatasetsCheckboxes />
      <MapResolution />
      <MapSettings />
    </div>
    <Maps />
  </div>
);

export default Home;
