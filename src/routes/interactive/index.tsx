import React, { useEffect, useState } from 'react'

import hackerStill from '../../assets/hund/hacker_still.png';
import hackerGif from '../../assets/hund/hacker_compact.gif';
import QuizIntro from '../../components/QuizIntro';
import QuizQuestion from '../../components/QuizQuestion';
import QuizResult from '../../components/QuizResult';

const Interactive = () => {

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

    return (
    <div className="home px-8 text-center">
        <div className="w-100">
            <img src={hackerSrc} className="inline-block" />
        </div>
        <QuizIntro />
        <QuizQuestion />
        <QuizResult />
    </div>
    );
};
  
export default Interactive;