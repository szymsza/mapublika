import { Button } from '@vechaiui/button';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  mojeIDDataState, questionsCorrect,
  questionsState,
  questionStepState,
  zipCodeState,
} from '../../store/atoms';
import api from '../../api';

const QuizQuestion = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);
  const zip = useRecoilValue(zipCodeState);
  const mojeIDData = useRecoilValue(mojeIDDataState);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [step, setStep] = useRecoilState(questionStepState);
  const [correct, setCorrect] = useRecoilState(questionsCorrect);

  useEffect(() => {
    if (!Object.values(questions).length) {
      // @ts-ignore
      api.get('/otazky/' + (zip.length >= 5 ? zip : mojeIDData.address.postal_code) + '/')
        .then(({ data }) => {
          console.log(data);
          setQuestions(data);
        });
    }
  }, [questions]);

  if (!Object.values(questions).length) {
    return null;
  }

  return (
    <div className="">
      {
        // @ts-ignore
        Object.entries(questions).map(([question, answer], index) => (
          step === index ? <div key={index}>
            <div
              className={`text-4xl font-bold mb-6 speech-bubble inline-block mt-6 ${isCorrect ? 'bg-green-500' : (isCorrect === false ? 'bg-red-500' : '')}`}>
              {question.replace('pocetDeti', "Počet dětí")} 🤔
            </div>
            <br />
            <Button size="xl" variant="solid" color="primary"
                    className="mx-4 px-20 py-10 text-3xl" onClick={() => {
              if (isCorrect !== null) {
                return null;
              }

              if (answer === 'Ano') {
                setCorrect(correct + 1);
              }

              setIsCorrect(answer === 'Ano')
            }}>
              Ano
            </Button>
            <Button size="xl" variant="solid" color="primary"
                    className="mx-4 px-20 py-10 text-3xl" onClick={() => {
              if (isCorrect !== null) {
                return null;
              }

              if (answer === 'Ne') {
                setCorrect(correct + 1);
              }

              setIsCorrect(answer === 'Ne')
            }}>
              Ne
            </Button>
            <br />
            {isCorrect !== null ?
              <Button size="xl" variant="solid" color="primary"
                      className="mx-4 mt-6 px-20 py-10 text-3xl" onClick={() => {
                setStep(step + 1);
                setIsCorrect(null)
              }}>
                Dále
              </Button> : null}
          </div> : null
        ))
      }
    </div>
  );
};

export default QuizQuestion;