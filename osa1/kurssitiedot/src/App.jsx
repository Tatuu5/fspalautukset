const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content partname1={part1} partexercises1={exercises1} partname2={part2} partname3={part3} partexercises2={exercises2} partexercises3={exercises3}/>
      <Total p1={exercises1} p2={exercises2} p3={exercises3}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)

  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  console.log("moi")

  return (
    <div>
      <Part part={props.partname1} exercises={props.partexercises1} />
      <Part part={props.partname2} exercises={props.partexercises2} />
      <Part part={props.partname3} exercises={props.partexercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.p1 + props.p2 + props.p3}</p>
  )
}

export default App