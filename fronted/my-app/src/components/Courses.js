import React from 'react'
import {useCourse} from './contexts/context'

function Courses() {

    const courses = useCourse();
    console.log(courses)
  return (
    <div>

          {
           courses.map((data)=>{
            return(
            <div key={data._id} className="topicContainer">
              
              <h4>{data.name}</h4>
              <p>Rs.{data.priceRange}</p>
              <p>{data.description}</p>
       

            </div>)
        })
        }
    </div>
  )
}

export default Courses