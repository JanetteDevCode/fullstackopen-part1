import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const collectGoodFeedback = ({ rating }) => {
    console.log('good feedback received');
    setGood(good + 1);
  };
  
  const collectNeutralFeedback = ({ rating }) => {
    console.log('neutral feedback received');
    setNeutral(neutral + 1);
  };
  
  const collectBadFeedback = ({ rating }) => {
    console.log('bad feedback received');
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={collectGoodFeedback}>good</button>
        <button onClick={collectNeutralFeedback}>neutral</button>
        <button onClick={collectBadFeedback}>bad</button>
      </div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

