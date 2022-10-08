import React from 'react';
import Regions from '../../assets/maps/regions';
import Counties from '../../assets/maps/counties';
import Towns from '../../assets/maps/towns';
import { Checkbox, Radio, IconButton, Icon, ExclamationIcon } from "@vechaiui/react";
import UploadIcon from '../../assets/icons/upload.svg';


const Home = () => (
  <div className="home">

    <div className="border m-4 inline-block p-2">
      <label>Úroveň rozlišení</label>
        <Radio.Group defaultValue="1" className="space-x-4" inline>
          <Radio color="blue" value="1">Kraje</Radio>
          <Radio color="blue" value="2">Okresy</Radio>
          <Radio color="blue" value="3">Obce</Radio>
        </Radio.Group>
    </div>

    <div className="border m-4 inline-block p-2">
      <label htmlFor="uploadFile">Nahrát vlastní datový soubor</label> 
      <IconButton variant="solid" color="blue" id="uploadFile">
        <img src={UploadIcon} className="w-6 h-6" />
      </IconButton>
      <Checkbox.Group
        className="space-x-4"
        inline
        defaultValue={["1", "2"]}
      >
        <Checkbox color="blue" value="1">data #1</Checkbox>
        <Checkbox color="blue" value="2">data #2</Checkbox>
        <Checkbox color="blue" value="3">data #3</Checkbox>
      </Checkbox.Group>
    </div>
    <Regions />
    <Counties />
    <Towns />
  </div>  
);

export default Home;
