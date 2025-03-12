const Header = (props) => <h2>{props.course}</h2>

const Part = (props) => {
  return (
    <p>
      {props.details.name} {props.details.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} details={part} />)}
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p><strong>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</strong></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
         <Header course={course.name} />
         <Content parts={course.parts} />
         <Total parts={course.parts} />
    </div>
  )
}

export default Course;
