import { Button } from '@vechaiui/button';
import { Input } from '@vechaiui/forms';
import React from 'react';
import { useRecoilState } from 'recoil';
import { mojeIDDataState, mojeIDInitializedState } from '../../store/atoms';
import { MojeIDData } from '../../store/types';
import loginButton from '../../assets/icons/login_button.svg';
import Login from '../Login';

const QuizIntro = ({
  // @ts-ignore
  setStep,
}) => {
    const [mojeIDData, setMojeIDData] = useRecoilState(mojeIDDataState);
    const [mojeIDInitialized, setMojeIDInitialized] = useRecoilState(mojeIDInitializedState);

    window.setMojeIDLoginData = (data: MojeIDData | null) => {
        setMojeIDData(data);
      }
    return (
        <div>
            <p className="mb-6 speech-bubble inline-block mt-6 text-lg">
              Ahoj! Vyzkouším, jak dobře odhadneš data z vybraných statistik. 📈<br />
              {mojeIDData && mojeIDData.address && "Jsi přihlášený, takže data můžu vztáhnout k obci " + mojeIDData.address.locality + ", nebo dole zadej jiné PSČ."}
              {!mojeIDData && mojeIDInitialized && "Odkud jsi, k jakému místu mám data vztáhnout? Můžeš vyplnit PSČ, nebo nechat adresu předvyplnit díky mojeID."}
              {!mojeIDData && !mojeIDInitialized && "Odkud jsi, k jakému místu mám data vztáhnout? Níže prosím vyplň PSČ."}
            </p>

            <br />

            <div className="bg-white p-8 rounded-lg shadow-lg border inline-block">
              {
                !mojeIDData && mojeIDInitialized && (
                  <div>
                    <p className="mb-2">Načíst data skrze mojeID:</p>
                    <div className="mb-6">
                      <Login />
                    </div>
                  </div>
                )
              }

              <p className="mb-2">{ mojeIDData ? "Nechceš použít mojeID?" : (mojeIDInitialized ? "Nemáš mojeID?" : "") } Můžeš zadat PSČ:</p>
              <Input className="w-48" placeholder="např. 79601" />
            </div>

            <br /> 

            <div className="bg-white p-8 rounded-lg shadow-lg border inline-block my-8">
                <Button size="xl" variant="solid" color='primary' className="mx-4 px-20 py-10 text-3xl" onClick={() => setStep(1)}>
                    Chci začít
                </Button>
            </div>
        </div>
    );
};

export default QuizIntro;