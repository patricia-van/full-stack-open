import { useState } from 'react'

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="all" value={good + neutral + bad}></StatisticLine>
        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}></StatisticLine>
        <StatisticLine text="positive" value={good / (good + neutral + bad)}></StatisticLine>
        </tbody>
      </table>
      
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="good"></Button>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
        <Button onClick={() => setBad(bad + 1)} text="bad"></Button>
      </div>

      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>
    </div>
  )
}

export default App