import { Button } from '@vechaiui/button';
import { Input } from '@vechaiui/forms';
import React from 'react';
import { useRecoilState } from 'recoil';
import { mojeIDDataState, mojeIDInitializedState } from '../../store/atoms';
import { MojeIDData } from '../../store/types';
import loginButton from '../../assets/icons/login_button.svg';

const QuizIntro = () => {
    const [mojeIDData, setMojeIDData] = useRecoilState(mojeIDDataState);
    const [mojeIDInitialized, setMojeIDInitialized] = useRecoilState(mojeIDInitializedState);
    window.setMojeIDLoginData = (data: MojeIDData | null) => {
        setMojeIDData(data);
      }
    return (
        <div>
            <p className="mb-6 speech-bubble inline-block mt-6 text-lg">
            Ahoj! Vyzkouším, jak dobře odhadneš data z vybraných statistik. 📈<br />
            Odkud jsi (k jakému místu mám data vztáhnout)? // Jsi přihlášený, data kvízu budou vztažena na ...
            </p>

            <br />

            <div className="bg-white p-8 rounded-lg shadow-lg border inline-block">
                <p className="mb-2">Načíst data skrze mojeID:</p>
                <div className="mb-6">
                <button onClick={() => window.mojeID.requestAuthentication.bind(window.mojeID)()}>
                    <img src={loginButton} alt="Moje ID Login" className="w-60 hover:opacity-80" />
                </button>
                </div>

                <p className="mb-2">Nemáš mojeID? Můžeš zadat PSČ:</p>
                <Input className="w-48" placeholder="např. 79601" />
            </div>

            <br /> 

            <div className="bg-white p-8 rounded-lg shadow-lg border inline-block my-8">
                <Button size="xl" variant="solid" color='primary' className="mx-4 px-20 py-10 text-3xl">
                    Chci začít
                </Button>
            </div>
        </div>
    );
};

export default QuizIntro;