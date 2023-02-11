import React from 'react'
import Topic from './Topic'
import {useTopicFetch} from './contexts/context';
import {useTopic} from './contexts/context';
import Price from './Price';
import Courses from './Courses';

function Home() {
 
  const onClickTopic = useTopicFetch(); 
  const topic = useTopic()

  return (
    <div className="container">

        <div className="leftSide">

     <div>
     {/* <input type="checkbox" onChange={onClickTopic}/>Topic */}
     <div className="topic"> <Topic/></div>

     </div>
     <div className="price">
     {/* <input type="checkbox"/>Price */}
     <Price/>

     </div>



      


        </div>
        <div className="rightSide">
        <div className="headerRight">
           <select className="options">
               <option>Newest</option>
               <option>Ascending</option>
           </select>

        </div>
        <div className="containerRight">
          <Courses/>
            
        </div>

        </div>


    </div>
  )
}

export default Home