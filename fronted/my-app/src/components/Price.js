import React,{useState,useEffect} from 'react'

function Price() {
    const[price,setPrice]=useState([]);
    const[isShowing,setIsShowing] = useState(false);

     return(

                <div>
                <h4  onClick={()=>setIsShowing(!isShowing)}>Price</h4>
                { isShowing?
                <div className="priceRanges">
                     <div>
                         <input type="checkbox"/>Free
                     </div>
                     <div>
                         <input type="checkbox"/>Less than Rs.500
                     </div>
                     <div>
                         <input type="checkbox"/>Rs. 500 to Rs.1000
                     </div>
                     <div>
                         <input type="checkbox"/>Rs. 1000 to Rs. 1500
                     </div>
                     <div>
                         <input type="checkbox"/>More than 1500
                     </div>

                </div>
                   
                :null
                }
        
        
            </div>
              )
            }
export default Price