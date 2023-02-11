import React,{useState,useEffect} from 'react';
import { useParams,useLocation ,useSearchParams,Link} from 'react-router-dom';

function Topic({topic,setTopic,topicIds}) {
    const[istopic,setisTopic]=useState([]);
    const[isShowing,setisShowing] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
 const[searchParams,setSearchParams]=useSearchParams();
 const[checked,setChecked]=useState(false);

    console.log("topic",topic)

          const {topicId} = useParams();
          const location = useLocation()
 console.log("location",location);

const handleChange = (e)=>{
	// e.preventDefault()
  if(e.target.value){
// setSearchParams({topic_id:e.target.value})
  }else{
    setSearchParams("")
  }


}

//  const searchParams = new URLSearchParams(window.location.search);
// const topicId = searchParams.get("topicId");
// console.log(topicId,"tpid");
// window.history.pushState({}, topicIds, `/k${location.pathname}${location.search}`)

    const fetchTopicData = async ()=>{
     
        const url = 'http://localhost:8080/api/tables/topics'
        // console.log("url",url)

        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setisTopic(data)
        }).catch ((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        fetchTopicData();
        const urlParams = new URLSearchParams(location.search);
        setSearchTerm(urlParams.get('topic'))
      },[])

     const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
      window.location.hash = event.target.value;
    };
   


      const togleTopic=(id)=>{
          setTopic((prevTopics)=>{
            if(prevTopics.includes(id)){
                  return prevTopics.filter((topicId)=>topicId!==id);
              }else {
              return [...prevTopics,id];
              }
          })
      }

     // counting topic by topicIds
     let
      countpyscho=0,countAI=0,countCloud=0,count5G=0,countDataS=0,countAnalytics=0,countDeep=0,countMachine=0,countRobotics=0;

console.log("topicIds",topicIds)
     function counttopicIds (){


      for(let i =0;i<topicIds.length;i++){
        for(let j=0;j<topicIds[i].length;j++){
        if( topicIds[i][j]==="63d231167d19ca71d3858fed"){
          countpyscho+=1
       }

        if( topicIds[i][j]==="63d231347d19ca71d3858fef"){
          countAI+=1

        }
        if(topicIds[i][j]==="63d231457d19ca71d3858ff1"){
          countCloud+=1

        }
        if(topicIds[i][j]==="63d231ba7d19ca71d3858ff3"){
          count5G+=1

        }
        if( topicIds[i][j]==="63d231d27d19ca71d3858ff7"){
          countDataS+=1

        }
        if( topicIds[i][j]==="63d231e37d19ca71d3858ff9"){
          countAnalytics+=1

        }
        if( topicIds[i][j]==="63d231ff7d19ca71d3858ffb"){
          countDeep+=1

        }
        if( topicIds[i][j]==="63d2320c7d19ca71d3858ffd"){
          countMachine+=1

        }
        if( topicIds[i][j]==="63d232197d19ca71d3858fff"){
          countRobotics+=1

        }
      }
    }

     }

     counttopicIds();

     console.log("idscount",countpyscho,countAI,countCloud,count5G,countDataS,countAnalytics,countDeep,countMachine,countRobotics);


     console.log("searchTerm",searchTerm);
  return (
    <div>
      {/* {window.history.pushState({}, topicIds, `/${location.pathname}${location.search}`)} */}

      {/* <p>  {location.pathname}{location.search}</p> */}
    <h4  onClick={()=>setisShowing(!isShowing)}>Topic</h4>
    
    {
     isShowing?
       istopic.map((data)=>{
        return(
        <div key={data._id} className="topicContaine">
          {/* <Link to={`/topicId/${data._id}`} > */}
      <input
       type="checkbox"
       defaultChecked={topic.find((ch) => ch === data._id)}
      id={data._id}
      onClick={()=>togleTopic(data._id)} 

      value={data._id}
      onChange={handleChange}
       
    disabled={
    (data._id === "63d231167d19ca71d3858fed" && countpyscho === 0) ||
    (data._id === "63d231347d19ca71d3858fef" && countAI === 0) ||
    (data._id === "63d231457d19ca71d3858ff1" && countCloud === 0) ||
    (data._id === "63d231ba7d19ca71d3858ff3" && count5G === 0) ||
    (data._id === "63d231d27d19ca71d3858ff7" && countDataS === 0) ||
    (data._id === "63d231e37d19ca71d3858ff9" && countAnalytics === 0) ||
    (data._id === "63d231ff7d19ca71d3858ffb" && countDeep === 0) ||
    (data._id === "63d2320c7d19ca71d3858ffd" && countMachine === 0) ||
    (data._id === "63d232197d19ca71d3858fff" && countRobotics === 0)
  }/>
  {/* </Link> */}
       
       {data.name}
     
       ({
           (data._id==="63d231167d19ca71d3858fed")?
           countpyscho:
           (data._id==="63d231347d19ca71d3858fef")?
           countAI:
           (data._id==="63d231457d19ca71d3858ff1")?
           countCloud:
           (data._id==="63d231ba7d19ca71d3858ff3")?
           count5G:
           (data._id==="63d231d27d19ca71d3858ff7")?
           countDataS:
           (data._id==="63d231e37d19ca71d3858ff9")?
           countAnalytics:
           (data._id==="63d231ff7d19ca71d3858ffb")?
           countDeep:
           (data._id==="63d2320c7d19ca71d3858ffd")?
           countMachine:
           (data._id==="63d232197d19ca71d3858fff")?
           countRobotics:null



       })
            
          

        </div>)
    }):null
    }


              </div>
  )
}

export default Topic