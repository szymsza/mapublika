import { Button } from '@vechaiui/button';
import React, { useState } from 'react';

const QuizQuestion = () => {
    const [isAnsweredOne, setAnsweredOne] = useState(false);
    const answerOne = () => {
        setAnsweredOne(!isAnsweredOne);
    };

    const [isAnsweredTwo, setAnsweredTwo] = useState(false);
    const answerTwo = () => {
        setAnsweredTwo(!isAnsweredTwo);
    };

    return (
        <div className="">
            <div className="text-4xl font-bold mb-6 speech-bubble inline-block mt-6">Ve kterém kraji je větší porodnost? 🤔</div> <br />
            <Button size="xl" variant="solid" color={isAnsweredOne ? 'red' : 'primary'} className="mx-4 px-20 py-10 text-3xl" onClick={answerOne}>
                Praha
            </Button>
            <Button size="xl" variant="solid" color={isAnsweredTwo ? 'green' : 'primary'} className="mx-4 px-20 py-10 text-3xl" onClick={answerTwo}>
                Královehradecký
            </Button>
        </div>
    );
};

export default QuizQuestion;