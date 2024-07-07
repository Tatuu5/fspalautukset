import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addOneGood = () => {
    setGood(good + 1)
    console.log("added good")
  }

  const addOneNeutral = () => {
    setNeutral(neutral + 1)
    console.log("added neutral")
  }

  const addOneBad = () => {
    setBad(bad + 1)
    console.log("added bad")
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" handleclick={addOneGood} />
      <Button text="neutral" handleclick={addOneNeutral}/>
      <Button text="bad" handleclick={addOneBad}/>
      <Header header="statistics" />
      <Statistics valueGood={good} valueNeutral={neutral} valueBad={bad} totalVotes={good + neutral + bad}/>
      </div>
  )
}

const Button = ({handleclick, text}) => (
  <button onClick={handleclick}>
    {text}
  </button>
  )

const Statistics = (props) => {
  if (props.valueGood == 0 && props.valueBad==0 && props.valueNeutral == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <table>
    <tbody>
    <StatisticsLine text="good" value={props.valueGood} />
    <StatisticsLine text="neutral" value={props.valueNeutral} />
    <StatisticsLine text="bad" value={props.valueBad} />
    <StatisticsLine text="all" value={props.totalVotes} />
    <StatisticsLine text="average" value={((props.valueGood*1 + props.valueBad*-1)/props.totalVotes).toFixed(1)} />
    <StatisticsLine text="positive" value={(props.valueGood / props.totalVotes * 100).toFixed(1) + ' %'} />
    </tbody>
  </table>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Header = (props) => <h1>{props.header}</h1>

export default App