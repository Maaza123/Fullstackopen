import React from 'react';

const Header = (props) =>{
    return(
      <h2>{props.course}</h2>
    )
  }
  const Content = (props) => {
    return(
      <div>
        {props.parts.map(part =>
          <Part key ={part.id} part={part}/>
        )}
      </div>
    )
  }
  const Part = (props) =>{
    return(
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  const Total = ({parts}) =>{
  
    const total = parts.reduce((t, part) => {
    return t + part.exercises
    }, 0);
    return(
      <strong>Total of exercises {total}</strong>
    )
  }
  export default Course;