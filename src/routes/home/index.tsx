import React from 'react';

import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import Towns from '../../assets/maps/towns';

const Home = () => {
    return (
      <div className="home">
          <h1 className="text-3xl font-bold underline">Home</h1>
          <button onClick={() => window.mojeID.requestAuthentication.bind(window.mojeID)()}>LOGIN</button>

          <Regions />
          <Counties />
          <Towns />
          <p>This is the Home component.</p>
      </div>
    );
}

export default Home;
