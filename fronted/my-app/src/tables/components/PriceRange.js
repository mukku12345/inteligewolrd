import React,{useState,useEffect} from 'react'

function PriceRange({priceRange,setPriceRange,priceList}) {
    const[isShowing,setIsShowing] = useState(true);
    const[iscount,setisCount]=useState([])
    const[id,setId]=useState([]);


 console.log(priceList,"from prize ")


     console.log(priceRange,"range")
    const prices = [
                       {    id:0,
                        name:"Free",
                        price:[0]
                    },
                    {    id:1,
                        name:"Less than Rs.500",
                        price:[500]
                    },
                    {    id:2,
                        name:"Rs. 500 to Rs.1000",
                        price:[501,1000]
                    },
                    {    id:3,
                        name:"Rs. 1000 to Rs. 1500",
                        price:[1000,1500]
                    },
                    {    id:4,
                        name:"More than Rs. 1500",
                        price:[1500]
                    }
    ]

    ///mapping of prices

    useEffect(()=>{
        const findpriceList = ()=>{
            const idsArray  =prices.map(item=>item.id) 
            setId(idsArray);
    
        }
        findpriceList();


    },[])
    console.log(id,"id")

    // console.log(prices.price,"pricejk")
           

    const toglePriceRange=(price)=>{
       setPriceRange((prevPrices)=>{
            if(prevPrices.flat().includes(price[0])){
                return prevPrices.filter((p)=>!p.includes(price[0]));
            }else {
            return [...prevPrices,price];
            }
        })
    }



    //count Prices

    let count =0,count1=0,count2=0,count3=0,count4=0;
    function countPrices (){
        // console.log(e.target.value)
            for(let i =0;i<priceList.length;i++){
                if( priceList[i]==0){
                    count+=1;
                } if(priceList[i]<500){
                    count1+=1;
                } if(priceList[i]>500 && priceList[i]<=1000){
                    count2+=1;
                }  if(priceList[i]>1000 && priceList[i]<=1500){
                    count3+=1;
                } if( priceList[i]>1500){
                    count4+=1;
                }
            }
            console.log("count",count,count1,count2,count3,count4);
        }
        countPrices();
    


  return (
    <div>
    <h4  onClick={()=>setIsShowing(!isShowing)}>Price</h4>
    { isShowing?
    <div className="priceRanges">
         {
             prices.map((data)=>{
                 return(
                     <div key={data.id}>
                         <input
                          type="checkbox"
                         defaultChecked={priceRange.find((ch) => ch.toString() === data.price.toString())}
                            id={data.id}

                            value={data.price}
                             onClick={()=>toglePriceRange(data.price)}
                                disabled={
                                    (data.price[0] === 0 && count === 0) ||
                                    (data.price[0]===500 && count1 === 0) ||
                                    (data.price[0]>500 && data.price[1]===1000 && count2 === 0) ||
                                    (data.price[0]===1000 && data.price[1]===1500 && count3 === 0) ||
                                    (data.price[0]===1500  && count4 === 0)
                                    
                                  }
                            
                            
                            
                         
                         />
                         {data.name}
                    
                         ({
                            
                         (data.price[0]===0)
                             ?count:
                             (data.price[0]===500)
                             ? count1:
                             ( data.price[0]>500 && data.price[1]===1000)
                             ?count2:
                             ( data.price[0]===1000 && data.price[1]===1500)
                             ?count3:
                             ( data.price[0]===1500 )
                             ?count4:null


                             
                         
                         })


                     </div>
                 )
             })
         }

    </div>
       
    :null
    }


</div>
  )
}

export default PriceRange