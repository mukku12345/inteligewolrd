import React, { createContext,useContext,useState ,useEffect} from "react"


// const CounterContext = createContext()
const TopicContext = createContext();

const TopicFetchContext = createContext();
const ShowingContext = createContext();
const CourseContext = createContext();



export function useTopic(){
    return useContext(TopicContext)
}

export function useTopicFetch(){
    return useContext(TopicFetchContext)
}
export  function useShowing(){
    return useContext(ShowingContext)
}

export function useCourse(){
    return useContext(CourseContext)
}





 export function DataProvider({children}){
    
    const[topic,setTopic]=useState([]);
    const[courses,setCourses]=useState([]);
    const[isShowing,setisShowing] = useState(false);

    const fetchTopicData = async ()=>{
      setisShowing(true)
        // const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
        const url = 'http://localhost:8080/api/tables/topics'
        // console.log("url",url)

        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setTopic(data)
        }).catch ((err)=>{
            console.log(err)
        })
    }

    //courses


    const fetchCourseData = async ()=>{
        setisShowing(true)
          // const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
          const url = 'http://localhost:8080/api/tables/courses'
          // console.log("url",url)
  
          fetch(url)
          .then((response)=>response.json())
          .then((data)=>{
              console.log(data);
              setCourses(data)
          }).catch ((err)=>{
              console.log(err)
          })
      }
  

        useEffect(()=>{
                fetchTopicData();
                fetchCourseData()
                
              },[])
    

    


    return(
        <TopicContext.Provider value={topic}>
            <TopicFetchContext.Provider value={fetchTopicData}>
                <ShowingContext.Provider value={isShowing}>
                    <CourseContext.Provider value={courses}>

                       {children}
                    </CourseContext.Provider>
                    </ShowingContext.Provider>
       
            </TopicFetchContext.Provider>
     
        </TopicContext.Provider>


    )
}