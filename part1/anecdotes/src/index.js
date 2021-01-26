import { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([...anecdotes].fill(0));
  const maxValue = anecdotes.length;

  const displayAnecdoteOnClick = () => setSelected(Math.floor(Math.random() * maxValue));

  const voteForSelectedAnecdote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };
  const displayAnecdoteMostVote = () => {
    let mostVotes = 0;
    let indexMostVotes = 0;

    for (const index in votes) {
      if (votes[index] > mostVotes) {
        mostVotes = votes[index];
        indexMostVotes = index;
      }
    }
    return { mostVotes, indexMostVotes };
  };

  return (
    <div>
      <>
        <h3> Anecdotes of the day</h3>
        <p>{anecdotes[selected]}</p>
        <p>Number of Votes: {votes[selected]}</p>
        <button onClick={() => voteForSelectedAnecdote()}>vote</button>&nbsp;
        <button onClick={displayAnecdoteOnClick}>next anecdote</button>
      </>
      <>
        <h3>Anecdotes with most votes</h3>
        <p>{anecdotes[displayAnecdoteMostVote().indexMostVotes]}</p>
        <p>Number of votes: {displayAnecdoteMostVote().mostVotes}</p>
      </>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
