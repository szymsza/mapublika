import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mojeIDDataState, mojeIDInitializedState, mojeIDStorageKey } from '../../store/atoms';
import { MojeIDData } from '../../store/types';
import loginButton from '../../assets/icons/login_button.svg';

import hackerStill from '../../assets/hund/hacker_still.png';
import hackerCompact from '../../assets/hund/hacker_compact.png';
import hackerGif from '../../assets/hund/hacker_compact.gif';
import { Input } from '@vechaiui/forms';
import { Button } from '@vechaiui/button';

const Interactive = () => {
    
    const [mojeIDData, setMojeIDData] = useRecoilState(mojeIDDataState);
    const [mojeIDInitialized, setMojeIDInitialized] = useRecoilState(mojeIDInitializedState);
    window.setMojeIDLoginData = (data: MojeIDData | null) => {
        setMojeIDData(data);
      }


    // animate hacker for 1s
    const [hackerSrc, setHackerSrc] = useState('');
    useEffect(() => {
        setHackerSrc(hackerGif);
      }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setHackerSrc(hackerStill);
        }, 1000);
        return () => clearTimeout(timer);
      }, []);
  

    const [isAnsweredOne, setAnsweredOne] = useState(false);
    const answerOne = () => {
        setAnsweredOne(!isAnsweredOne);
    };

    const [isAnsweredTwo, setAnsweredTwo] = useState(false);
    const answerTwo = () => {
        setAnsweredTwo(!isAnsweredTwo);
    };

    return (
    <div className="home px-8 text-center">
        <div className="w-100">
            <img src={hackerSrc} className="inline-block" />
        </div>
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

        <div className="">
            <div className="text-4xl font-bold mb-6 speech-bubble inline-block mt-6">Ve kterém kraji je větší porodnost? 🤔</div> <br />
            <Button size="xl" variant="solid" color={isAnsweredOne ? 'red' : 'primary'} className="mx-4 px-20 py-10 text-3xl" onClick={answerOne}>
                Praha
            </Button>
            <Button size="xl" variant="solid" color={isAnsweredTwo ? 'green' : 'primary'} className="mx-4 px-20 py-10 text-3xl" onClick={answerTwo}>
                Královehradecký
            </Button>
        </div>

        <div className="mb-6 speech-bubble inline-block mt-6">
            <div className="text-4xl font-bold my-8">Výsledek kvízu 🎉</div>
            <div className="text-4xl font-bold my-8">2 / 5 bodů</div>
        </div>
    </div>
    );
};
  
export default Interactive;