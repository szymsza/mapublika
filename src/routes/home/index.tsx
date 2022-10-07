import React from 'react';

import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import Towns from '../../assets/maps/towns';

const Home = () => (
  <div className="home">
    <h1>Home</h1>
    <Regions />
    <Counties />
    <Towns />
    <p>This is the Home component.</p>
  </div>
);

export default Home;
