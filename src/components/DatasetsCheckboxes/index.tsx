import React from 'react';
import UploadIcon from '../../assets/icons/upload.svg';
import { Checkbox, IconButton, Button, XIcon } from '@vechaiui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetsState } from '../../store/atoms';
import { Dataset } from '../../store/types';
import { checkedDatasetsIds } from '../../store/selectors';

import { Dialog, Transition } from "@headlessui/react";
import { cx } from "@vechaiui/react";

const DatasetsCheckboxes = () => {
  const [datasets, setDatasets] = useRecoilState(datasetsState);
  const checkedIds = useRecoilValue(checkedDatasetsIds);

  const [showDialog, setShowDialog] = React.useState(false);
  const completeButtonRef = React.useRef(null);
  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <div className="inline-block mb-4 mr-4 rounded-lg shadow-lg border">
      <h2 className="text-2xl border-b text-center p-4">
        Datové sady
      </h2>

      <div className="grid grid-cols-2 gap-10 px-6 py-3">
        <div>
          <h3 className="font-medium leading-tight text-xl py-2">Vlastní</h3>
          <span className="">Nemáte žádné vlastní datové sady</span>
          <div className="my-2">
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
                        Modal Title
                      </header>
                      <button
                        onClick={handleClose}
                        className={cx(
                          "absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4"
                        )}
                      >
                      </button>
                      <div className="flex-1 px-6 py-2">
                        <p className="text-base font-normal text-neutral-500">
                          Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
                          ullamco deserunt aute id consequat veniam incididunt duis in
                          sint irure nisi. Mollit officia cillum Lorem ullamco minim
                          nostrud elit officia tempor esse quis.
                        </p>
                      </div>
                      <footer className="px-6 py-4">
                        <Button ref={completeButtonRef} variant="light" color="primary" onClick={handleClose}>
                          Complete
                        </Button>
                      </footer>
                    </div>
                  </Transition.Child>
                </Dialog>
              </Transition>

          </div>
        </div>

        <div>
          <h3 className="font-medium leading-tight text-xl py-2">Vzorové</h3>
          <Checkbox.Group
            className=""
            value={checkedIds}
            onChange={(newValues) => setDatasets(
              datasets.map((dataset) => ({
                ...dataset,
                selected: newValues.includes(dataset.id),
              })),
            )}
          >
            {datasets.map((dataset: Dataset) => (
              <Checkbox color="blue" value={dataset.id} key={dataset.id}>{dataset.label}</Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
    </div>
  );
}

export default DatasetsCheckboxes;
