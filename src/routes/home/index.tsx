import React from 'react';
import { Checkbox, IconButton } from '@vechaiui/react';
import UploadIcon from '../../assets/icons/upload.svg';
import MapResolution from '../../components/MapResolution';
import Maps from '../../components/Maps';

const Home = () => (
  <div className="home px-8">
    <MapResolution />

    <div className="border m-4 inline-block p-2">
      <label htmlFor="uploadFile">Nahrát vlastní datový soubor</label>
      <IconButton variant="solid" color="blue" id="uploadFile">
        <img src={UploadIcon} className="w-6 h-6" alt="Nahrajte vlastní datový soubor" />
      </IconButton>
      <Checkbox.Group
        className="space-x-4"
        inline
        defaultValue={['1', '2']}
      >
        <Checkbox color="blue" value="1">data #1</Checkbox>
        <Checkbox color="blue" value="2">data #2</Checkbox>
        <Checkbox color="blue" value="3">data #3</Checkbox>
      </Checkbox.Group>
    </div>
    <Maps />
  </div>
);

export default Home;
