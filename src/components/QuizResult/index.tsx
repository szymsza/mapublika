import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { questionsCorrect, questionsState } from '../../store/atoms';

const QuizResult = () => {
  const questions = useRecoilValue(questionsState);
  const [correct] = useRecoilState(questionsCorrect);

  return (
    <div className="mb-6 speech-bubble inline-block mt-6">
      <div className="text-4xl font-bold my-8">Výsledek kvízu 🎉</div>
      <div className="text-4xl font-bold my-8">{correct} / {Object.keys(questions).length} bodů</div>
    </div>
  );
};

export default QuizResult;