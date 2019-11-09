import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * @param {[number]} numbers 
 */
const calculateSum = (numbers) => {
  return numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
};

/**
 * @param {number} part 
 * @param {number} whole 
 */
const calculatePercentage = (part, whole) => {
  if (whole === 0) {
    return NaN;
  }
  return part / whole * 100;
}

/**
 * @param {Object} weights - Object containing weights (value) assigned to each score (key).
 * @param {Object} scores - Object containing counts (value) of each score (key).
 */
const calculateWeightedAverage = (weights, scores) => {
  const sum = calculateSum(Object.values(scores));
  let weightedSum = 0;
  for (let [key, value] of Object.entries(scores)) {
    weightedSum += value * weights[key];
  }
  if (sum === 0) {
    return NaN;
  } else if (weightedSum === 0) {
    return 0;
  }
  return weightedSum / sum;
};

const Statistics = ({ ratings }) => {
  const weights = {
    good: 1,
    neutral: 0,
    bad: -1
  };
  const sum = calculateSum(Object.values(ratings));
  const weightedAverage = calculateWeightedAverage(weights, ratings);
  const goodPercentage = calculatePercentage(ratings.good, sum);
  return (
      <>
        <p>good {ratings.good}</p>
        <p>neutral {ratings.neutral}</p>
        <p>bad {ratings.bad}</p>
        <p>all {sum}</p>
        <p>average {weightedAverage}</p>
        <p>positive {goodPercentage} %</p>
      </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const collectGoodFeedback = () => {
    console.log('good feedback received');
    setGood(good + 1);
  };
  
  const collectNeutralFeedback = () => {
    console.log('neutral feedback received');
    setNeutral(neutral + 1);
  };
  
  const collectBadFeedback = () => {
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
      <Statistics ratings={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

