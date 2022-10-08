import React from 'react';
import { Dialog, Switch, Transition } from "@headlessui/react";
import { Checkbox, IconButton, Button, FormControl, FormLabel, Select, Input, Radio } from '@vechaiui/react';
import { cx } from "@vechaiui/react";

import UploadIcon from '../../assets/icons/upload.svg';

const UploadDataset = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const completeButtonRef = React.useRef(null);
    const handleOpen = () => setShowDialog(true);
    const handleClose = () => setShowDialog(false);

    return (
        <div> 
            <IconButton variant="solid" color="blue" id="uploadFile" className="mr-2 p-2" onClick={handleOpen}>
              <span> <img src={UploadIcon} className="w-6 h-6 inline mr-1" alt="Tlačítko nahrání" /> Nahrát datový soubor </span>
            </IconButton>

            <Transition show={showDialog} as={React.Fragment}>
                <Dialog
                  initialFocus={completeButtonRef}
                  as="div"
                  className="fixed inset-0 overflow-y-auto z-modal"
                  open={showDialog}
                  onClose={handleClose}
                >
                  <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
                  <Transition.Child
                    as={React.Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="transform scale-95"
                    enterTo="transform scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform scale-100"
                    leaveTo="transform scale-95"
                  >
                    <div
                      className={cx(
                        "relative flex flex-col w-full mx-auto my-24 rounded shadow-lg",
                        "bg-white border border-gray-200",
                        "dark:bg-neutral-800 dark:border-neutral-700",
                        "max-w-md"
                      )}
                    >
                      <header
                        className="relative px-6 py-5 text-lg font-semibold"
                      >
                        Nahrávání vlastních dat
                      </header>

                      <p className="px-6">
                        Pro funkčnost Mapubliky je třeba vyplnit (přesně) všechny údaje:
                      </p>

                      <button
                        onClick={handleClose}
                        className={cx(
                          "absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4"
                        )}
                      >
                      </button>
                      <form method="post">
                      <div className="flex-1 px-6 py-2">

                      <div className="flex justify-center mt-4">
                        <div className="mb-3 xl:w-96">
                          <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Zvolte zdrojový csv soubor</label>
                          <Input className="" type="file" id="formFile" accept=".csv" />
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <div className="mb-3 xl:w-96">
                          <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Název sloupce s četností jevu</label>
                          <Input id="exampleFormControlInput1" placeholder="Zadejte přesný název" />
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <div className="mb-3 xl:w-96">
                          <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Název sloupce s popisem jevu</label>
                          <Input id="exampleFormControlInput1" placeholder="Zadejte přesný název" />
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <div className="mb-3 xl:w-96">
                          <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Název sloupce s územní jednotkou</label>
                          <Input id="exampleFormControlInput1" placeholder="Zadejte přesný název" />
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <div className="mb-3 xl:w-96">
                          <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Rozlišení územní jednotky</label>
                            <Select>
                              <option disabled selected>Vyberte...</option>
                              <option>Kraj dle kódu (CZ-NUTS)</option>
                              <option>Kraj dle názvu</option>
                              <option>Okres dle kódu (CZ-NUTS)</option>
                              <option>Okres dle názvu</option>
                              <option>Obec dle kódu</option>
                            </Select>
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <div className="mb-3 xl:w-96">
                          <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Průměrovat jev (lze jen u numerických dat)?</label>
                          <div>
                            <Radio name="averaging">Ano</Radio>
                            <Radio name="averaging" className="ml-2" defaultChecked>
                              Ne
                            </Radio>
                          </div>
                        </div>
                      </div>
                      </div>
                      <footer className="px-6 py-4">
                        <Button ref={completeButtonRef} variant="solid" color="primary" type="submit">
                          Odeslat data
                        </Button>
                        <Button ref={completeButtonRef} variant="light" onClick={handleClose} className="float-right">
                          Zavřít
                        </Button>
                      </footer>
                      </form>
                    </div>
                  </Transition.Child>
                </Dialog>
              </Transition>

        </div>
    )
}


export default UploadDataset;