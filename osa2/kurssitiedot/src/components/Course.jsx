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
    <h2>
      {course}
    </h2>
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
      <strong>total of {sum} exercises</strong>
  )}

export default Course