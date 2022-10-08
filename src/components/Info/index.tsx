import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@vechaiui/button';
import { cx } from '@vechaiui/utils';
import React from 'react';
import InfoIcon from '../../assets/icons/info.svg';

const Info = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const completeButtonRef = React.useRef(null);

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <div className="flex">
      <div onClick={handleOpen} className="inline-flex hover:opacity-75">
          <img src={InfoIcon} alt="Info" width="35px" className="" />
      </div>
      
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
              O Mapublice
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
                Mapublika vznikla v rámci hackathonu NKÚ <a href="https://www.hackujstat.cz/">hackujstat.cz</a>.
                Cílem bylo dostat data (primárně jaká publikuje ČSÚ, ale nejen ta) do vizuálních map České republiky, 
                které lze snadno porovnávat a hledat korelace. Předpřipravili jsme některé datové sady, ale hlavní síla 
                spočívá v možnosti nahrávat vlastní data.
              </p>
              <br />
              <p className="text-base font-normal text-neutral-500">
                Z dat se také automaticky tvoří interaktivní kvíz, který hledá zajímavá čísla a testuje Vaše odhady.
              </p>
            </div>
            <footer className="px-6 py-4">
              <Button ref={completeButtonRef} variant="light" color="primary" onClick={handleClose}>
                Dobře!
              </Button>
            </footer>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
    </div>
  );
}

export default Info;
