const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </div>
  )
}

const Header = ({ course }) => {
  console.log(course, "moi")
  return (
  <h1>
    {course}
  </h1>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part => 
      <Part key={part.id} part={part} /> 
      )}   
    </div>
  )
}

const Part = ({ part }) => {
  console.log(part)
  return(
  <p>{part.name} {part.exercises}</p>
  )
}


const Total = ({ exercises }) => {
  console.log(exercises)
  const initialValue = 0
  const sum = exercises.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue)
  return (
    <p>Number of exercises {sum}</p>
)}


export default App
