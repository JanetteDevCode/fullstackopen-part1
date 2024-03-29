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

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  );
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
  if (sum === 0) {
    return (
      <p>No feedback given</p>
    );
  }
  return (
      <table>
        <tbody>
          <Statistic text="good" value={ratings.good} />
          <Statistic text="neutral" value={ratings.neutral} />
          <Statistic text="bad" value={ratings.bad} />
          <Statistic text="all" value={sum} />
          <Statistic text="average" value={weightedAverage} />
          <Statistic text="positive" value={goodPercentage + ' %'} />
        </tbody>
      </table>
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
        <Button text="good" onClick={collectGoodFeedback} />
        <Button text="neutral" onClick={collectNeutralFeedback} />
        <Button text="bad" onClick={collectBadFeedback} />
      </div>
      <h1>statistics</h1>
      <Statistics ratings={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

