import React, { useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, cx, IconButton, Input, Radio, Select, Spinner } from '@vechaiui/react';

import UploadIcon from '../../assets/icons/upload.svg';
import { getUserDatasets, sendDataset, UploadDatasetFormData } from '../../api';
import { useRecoilState } from 'recoil';
import { datasetsUserState } from '../../store/atoms';

const submitForm = async (e: { preventDefault: () => void; }, formData: UploadDatasetFormData): Promise<boolean> => {
  e.preventDefault();

  for (const value of Object.values(formData)) {
    if (typeof value !== "boolean" && (!value || (typeof value === "string" && value.trim() === ""))) {
      window.alert("Vyplňte prosím všechna políčka formuláře");
      return false;
    }
  }

  if (!await sendDataset(formData)) {
    window.alert("Soubor se nepodařilo nahrát, opakujte prosím akci později");
    return false
  }

  return true;
}

const defaultFormData = {
  file: null,
  value_occurrences: '',
  value_code: '',
  location_text: '',
  localization_type: 'Kod-obec',
  average: false,
};

const UploadDataset = () => {
  const [showDialog, setShowDialog] = useState(false);
  const completeButtonRef = useRef(null);
  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setDatasetsUser] = useRecoilState(datasetsUserState);

  const [formData, setFormData] = useState<UploadDatasetFormData>(defaultFormData);

  return (
    <div>
      <IconButton variant="solid" color="blue" id="uploadFile" className="mr-2 p-2"
                  onClick={handleOpen}>
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
                'relative flex flex-col w-full mx-auto my-24 rounded shadow-lg',
                'bg-white border border-gray-200',
                'dark:bg-neutral-800 dark:border-neutral-700',
                'max-w-md',
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
                  'absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4',
                )}
              >
              </button>
              <form method="post" onSubmit={async (e) => {
                setLoading(true);
                let success: boolean = await submitForm(e, formData);
                if (!success) {
                  setLoading(false);
                  return;
                }
                setLoading(false);
                setShowDialog(false);
                setFormData(defaultFormData);

                getUserDatasets()
                  .then((data) => {
                    // @ts-ignore
                    setDatasetsUser(data.map(item => ({
                      id: item,
                      label: item,
                      description: item + ", ",
                      selected: false,
                      type: 'user',
                    })));
                  });
              }}>
                <div className="flex-1 px-6 py-2">

                  <div className="flex justify-center mt-4">
                    <label htmlFor="formFile"
                           className={`w-100 flex flex-col items-center px-4 py-2 text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer 
                           hover:bg-blue-700 hover:text-white ${formData.file ? "bg-green-600 text-white" : ""}`}>
                      <svg className="w-8 h-8" fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                          d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="mt-2 text-base">Zvolte zdrojový csv soubor</span>
                      <input type="file" id="formFile" accept=".csv" className="hidden" onChange={(e) =>
                        // @ts-ignore
                        e.target.files.length ? setFormData({
                        ...formData,
                        // @ts-ignore
                        file: e.target.files[0],
                      }) : null} />
                      {formData.file && <i className="text-sm">{formData.file.name}</i>}
                    </label>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="mb-3 xl:w-96">
                      <label htmlFor="value_occurrences"
                             className="form-label inline-block mb-2 text-gray-700">
                        Název sloupce s četností jevu
                      </label>
                      <Input id="value_occurrences" value={formData.value_occurrences}
                             onChange={(e) => setFormData({
                               ...formData,
                               value_occurrences: e.target.value,
                             })}
                             placeholder="Zadejte přesný název" />
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="mb-3 xl:w-96">
                      <label htmlFor="value_code"
                             className="form-label inline-block mb-2 text-gray-700">
                        Název sloupce s popisem jevu
                      </label>
                      <Input id="value_code" value={formData.value_code}
                             onChange={(e) => setFormData({
                               ...formData,
                               value_code: e.target.value,
                             })}
                             placeholder="Zadejte přesný název" />
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="mb-3 xl:w-96">
                      <label htmlFor="location_text"
                             className="form-label inline-block mb-2 text-gray-700">
                        Název sloupce s územní jednotkou
                      </label>
                      <Input id="location_text" value={formData.location_text}
                             onChange={(e) => setFormData({
                               ...formData,
                               location_text: e.target.value,
                             })}
                             placeholder="Zadejte přesný název" />
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="mb-3 xl:w-96">
                      <label htmlFor="localization_type"
                             className="form-label inline-block mb-2 text-gray-700">
                        Rozlišení územní jednotky
                      </label>
                      <Select id="localization_type" value={formData.localization_type}
                              onChange={(e) => setFormData({
                                ...formData,
                                localization_type: e.target.value,
                              })}>
                        <option value="Kod-obec">Obec dle kódu</option>
                        <option value="Nazev-obec">Obec dle názvu</option>
                        <option value="kod-okres">Okres dle kódu (CZ-NUTS)</option>
                        <option value="Nazev-okres">Okres dle názvu</option>
                        <option value="kod-kraj">Kraj dle kódu (CZ-NUTS)</option>
                        <option value="Nazev-kraj">Kraj dle názvu</option>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="mb-3 xl:w-96">
                      <label htmlFor="exampleFormControlInput1"
                             className="form-label inline-block mb-2 text-gray-700">
                        Průměrovat jev (lze jen u numerických dat)?
                      </label>
                      <Radio.Group
                        value={formData.average ? 'true' : 'false'}
                        onChange={(_, val) => setFormData({
                          ...formData,
                          average: val === 'true',
                        })}>
                        <Radio name="average" value="true">
                          Ano
                        </Radio>
                        <Radio name="average" value="false">
                          Ne
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
                <footer className="px-6 py-4">
                  <Button ref={completeButtonRef} variant="solid" color="primary" type="submit">
                    Odeslat data
                  </Button>
                  <Button ref={completeButtonRef} variant="light" onClick={handleClose}
                          className="float-right">
                    Zavřít
                  </Button>
                </footer>
              </form>
              { loading && <div className="absolute w-full h-full bg-white/75 z-10">
                <Spinner className="text-red-600 absolute top-1/2 left-1/2 -ml-8 -mt-8" size="xl" />
              </div> }
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

    </div>
  )
}

// @ts-ignore
export default UploadDataset;
