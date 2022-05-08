import React, { useState } from "react";

const QuestionBox = ({ question, options, selected }) => {
    // creating a state variable named answer using the useState function
    // useState returns a pair of values: the current state and a function that updates it. This is why we write const [answer, setAnswer] = useState()
    // here answer stores the initial value as options array
    const [answer, setAnswer] = useState(options);
    return (
        <div className="questionBox">
            <div className="question">{question}</div>
            {answer.map((text, index) => (
                <button key={index} className="answerBtn" onClick={() => {
                    setAnswer([text]);
                    selected(text);
                }}>
                    {text}
                </button>
            ))}
        </div>
    );
};

export default QuestionBox;