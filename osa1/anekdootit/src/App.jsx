import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))

  const changeAnecdote = () => {
    let randomnumber = getRandomNumber(8)
    setSelected(randomnumber)
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const indexMax = () => {
    let maxValue = Math.max(...points)
    let maxIndex = points.indexOf(maxValue)

    return maxIndex
  };

  console.log(points)
  return (
    <div>
      <Header header="Anecdote of the day" />
      <div>
      {anecdotes[selected]}
      </div>
      <Votes votes={points[selected]} />
      <Button text="next adectote" handleclick={changeAnecdote} />
      <Button text="vote" handleclick={updatePoints}/>
      <Header header="Anecdote with most votes" />
      {anecdotes[indexMax()]}
    </div>
  )
}


const getRandomNumber = (number) => {
  return Math.floor(Math.random() * number)
}

const Button = ({handleclick, text}) => (
  <button onClick={handleclick}>
    {text}
  </button>
  )

const Header = (props) => <h1>{props.header}</h1>

const Votes = (props) => <div>has {props.votes} votes</div>
export default App