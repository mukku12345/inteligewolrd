import React, { useEffect, useState } from 'react';

import {useTopic} from './contexts/context';

function Topic() {
    const[isShowing,setIsShowing]=useState(false);

    const topic = useTopic();
   


  return (
    <div>
        <h4  onClick={()=>setIsShowing(!isShowing)}>Topic</h4>
        { isShowing?
           topic.map((data)=>{
            return(
            <div key={data._id} className="topicContaine">
               <input type="checkbox"/> {data.name}
                
              

            </div>)
        }):null
        }


    </div>
  )
}

export default Topic