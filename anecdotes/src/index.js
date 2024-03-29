import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

/**
 * Get a random integer between two values.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 */
const getRandomInt = (min, max) => {
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
  console.log(`random int between ${min} and ${max}: ${randomInt}`);
  return randomInt;
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => {
    return new Array(anecdotes.length).fill(0);
  });

  // to display random anecdote during initial page render, use this:
  // const [selected, setSelected] = useState(() => {
  //   return getRandomInt(0, anecdotes.length);
  // });

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const getNextAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length));
  };

  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={getNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {votes[mostVotesIndex]} votes</p>
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
