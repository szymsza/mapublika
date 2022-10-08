import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './Header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import { RecoilRoot } from 'recoil';
import { VechaiProvider } from '@vechaiui/theme';
import Interactive from '../routes/interactive';

const App = () => (
  <div id="app">
    <RecoilRoot>
      <VechaiProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interactive/" element={<Interactive />} />
          </Routes>
        </Router>
      </VechaiProvider>
    </RecoilRoot>
  </div>
);

export default App;
