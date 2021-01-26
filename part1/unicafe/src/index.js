import { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  const { good, neutral, bad, feedbackScores, averageScores, positiveScores } = props;

  return (
    <>
      {!good && !neutral && !bad ? (
        <p>No feedback given</p>
      ) : (
        <>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <Statistic text="good" value={good} />
              <Statistic text="neutral" value={neutral} />
              <Statistic text="bad" value={bad} />
              <Statistic text="all" value={feedbackScores} />
              <Statistic text="average" value={averageScores()} />
              <Statistic text="positive" value={positiveScores()} />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{text === `positive` ? `${value} %` : value}</td>
  </tr>
);
const Boutons = ({ functionName, name }) => <button onClick={functionName}>{name}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedbackScores = good + neutral + bad;

  const averageScores = () => (good * 1 + neutral * 0 + bad * -1) / feedbackScores;
  const positiveScores = () => (good / feedbackScores) * 100;
  const giveComments = (value, updateValue) => updateValue(value + 1);

  return (
    <>
      <div>
        <h1> Give Feedback </h1>
        <Boutons functionName={() => giveComments(good, setGood)} name="good" />
        <Boutons functionName={() => giveComments(neutral, setNeutral)} name="neutral" />
        <Boutons functionName={() => giveComments(bad, setBad)} name="bad" />
      </div>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        averageScores={averageScores}
        positiveScores={positiveScores}
        feedbackScores={feedbackScores}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
