import React from 'react';
import MapResolution from '../../components/MapResolution';
import Maps from '../../components/Maps';
import DatasetsCheckboxes from '../../components/DatasetsCheckboxes';

const Home = () => (
  <div className="home px-8">
    <MapResolution />
    <DatasetsCheckboxes />
    <Maps />
  </div>
);

export default Home;
