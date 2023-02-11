import React, { useEffect, useState } from 'react'
import PriceRange from './components/PriceRange';
import Search from './components/Search';
import Topic from './components/Topic';
import Post from './Pagination/Post';
import { useLocation ,Link} from 'react-router-dom';


function Home() {
    const[courses,setCourses]=useState([])
    const[priceSorting,setpriceSorting]=useState(
       ()=>{
  try{
    const storedpricesorting = window.localStorage.getItem("priceSotring");
    if (storedpricesorting) {
     return JSON.parse(storedpricesorting);
    
     }else{
    return "" ;
     }
   }catch(err){
     console.log(err)
     }

      })

    ////////////////
    const[byDateSorting,setbyDateSorting]=useState(
       ()=>{
        try{
          const storedDateSorting =    window.localStorage.getItem("byDateSorting");
          if (storedDateSorting) {
            return JSON.parse(storedDateSorting);
          
        }else{
          return "" ;
        }
      }catch(err){
        console.log(err)
      }
      
      }
    );
    ///////////////////
    const[topic,setTopic]=useState(
      ()=>{
  try{    
       const storedTopic =  window.localStorage.getItem("topic");
     if (storedTopic) {
      return JSON.parse(storedTopic);

          }
           else{
             return [];
          }
           }catch(err){
       console.log(err)
     }

    }
   );
    const[search,setSearch]=useState(
       ()=>{
  try{
  const storedSearch =   window.localStorage.getItem("search");
  if (storedSearch) {
    return JSON.parse(storedSearch);
  }else{
    return "" ;
  }
}catch(err){
  console.log(err)
}

}
   )
    const[priceRange,setPriceRange]=useState(
       ()=>{
  try{
    const storedpriceRange =  window.localStorage.getItem("priceRange");
    if (storedpriceRange!==null) {
      return JSON.parse(storedpriceRange);
  }else{
    return [] ;
  }
}catch(err){
  console.log(err)
}

}
   );
    const[selectValue,setSelectValue]=useState(null)
    const[currentPage,setCurrentPage]=useState(1);
    const[postPerPage,setPostPerPage]=useState(10);
    const[priceList,setPriceList]=useState([]);
    const[topicIds,setTopicIds]=useState([]);
   
    
    // const location = useLocation()
   //hnadling on select change in options 

    const handleSelectChange = (e)=>{
        setSelectValue(e.target.value);
        console.log(e.target.value)
       
        localStorage.setItem("selectedOption", e.target.value);
    }

 //////////////////////////////




    
//without using of locastorage the data is disapperaed when i was refreshing the page but after using of get and set in localstorage the data is not disapperd.
 

useEffect(() => {
  try{
  const storedPriceList = window.localStorage.getItem("priceList");
  if (storedPriceList) {
    setPriceList(JSON.parse(storedPriceList));
  }

  const storedTopicIds = window.localStorage.getItem("topicIds");
  if (storedTopicIds) {
    setTopicIds(JSON.parse(storedTopicIds));
  }
  /////////////////////

// const storedCourses =  window.localStorage.getItem("courses");
// if (storedCourses) {
//   setCourses(JSON.parse(storedCourses));
// }

// const storedpricesorting =   window.localStorage.getItem("priceSotring");
// if (storedpricesorting!==null) {
//   setpriceSorting(JSON.parse(storedpricesorting));
// }
// const storedDateSorting =    window.localStorage.getItem("byDateSorting");
// if (storedDateSorting!==null) {
//   setbyDateSorting(JSON.parse(storedDateSorting));
// }

// const storedTopic =  window.localStorage.getItem("topic");
// if (storedTopic!==null) {
//   setTopic(JSON.parse(storedTopic));
// }
// const storedSearch =   window.localStorage.getItem("search");
// if (storedSearch!==null) {
//   setSearch(JSON.parse(storedSearch));
// }
// const storedpriceRange =  window.localStorage.getItem("priceRange");
// if (storedpriceRange!==null) {
//   setPriceRange(JSON.parse(storedpriceRange));
// }
}catch(err){
  console.log(err)
}
}, []);


useEffect(() => {

  const findpriceList = () => {
    const pricesArray = courses.map(item => item.priceRange) 
    setPriceList(pricesArray);
    window.localStorage.setItem("priceList", JSON.stringify(pricesArray));
  }
       
  const findtopicList = () => {
    const topicArrays = courses.map(id => id.topic_Id);
    setTopicIds(topicArrays)
  window.localStorage.setItem("topicIds", JSON.stringify(topicArrays));
  }
  findpriceList();
  findtopicList();
  try{
    // localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("priceSotring", JSON.stringify(priceSorting));
    localStorage.setItem("byDateSorting", JSON.stringify(byDateSorting));
    localStorage.setItem("topic", JSON.stringify(topic));
    localStorage.setItem("search", JSON.stringify(search));
    localStorage.setItem("priceRange", JSON.stringify(priceRange));
    // localStorage.setItem("selectvalue", JSON.stringify(selectValue));

  } catch (err){
    console.log(err);
  }
    
  

  


}, [courses,selectValue]);





    

    
//fetching the API

    useEffect(()=>{
              console.log(priceRange,"home")
   
              try{
              if(selectValue==="asc"){
                   setpriceSorting(-1);
                   setbyDateSorting(1)
              } else if(selectValue==="newest"){
                  setbyDateSorting(-1);
                  setpriceSorting(1)
              }

          // setUniqueUrl('send','pageview')
          // const searchParams = new URLSearchParams(window.location.search);
              const fetchData = async()=>{
              //  e.preventDefault()
                  const url = `http://localhost:8080/api/tables/courses?sortPrice=${priceSorting}&date=${byDateSorting}&priceRange=${priceRange}&topic_Id=${topic}&search=${search}`
                 
                  const uniqueId = new Date().getTime();
                //   url.searchParams.set('foo', 'bar');
                //   window.history.pushState({}, courses, `/courses?${`p=${priceSorting}`}`);
                  
                    // setUniqueUrl(url)
                    // window.open(url,"_blank")
                    // searchParams.set("sortPrice", priceSorting);
                    // window.history.replaceState({}, "", `${window.location.pathname}?${searchParams}`);
                    window.history.pushState({},courses, `/courses?sortPrice=${priceSorting}&date=${byDateSorting}&priceRange=${priceRange}&topic_Id=${topic}&search=${search}`);

                    //  window.history.pushState({urlPath:'/topic'},"",`/topic${topic}`)
                    //  window.history.pushState({urlPath:'/priceRange'},"",`/price${priceRange}`)

                    // if(priceRange){
                    //   window.history.pushState({},priceRange,`/&priceRange=${priceRange}`)
                    // }else if(topic){
                    //   window.history.pushState({},topic,`/topic=${topic}`)

                    // }
                    //  const uniqurl =
                    //   window.localStorage.setItem("uniqueUrl", JSON.stringify(uniqurl));


                      // const storedurl = window.localStorage.getItem("uniqueUrl");
                      // if (storedurl) {
                      // setTopicIds(JSON.parse(storedurl));
                      //  }







                      
               const response = await   fetch(url)

               const data = await response.json();
               console.log(data)
               setCourses(data)
                

              }
              fetchData();
            }catch(err){
                console.log(err);
            }
          },[priceSorting,byDateSorting,topic, priceRange,selectValue,search]);


          console.log("priceList",priceList)

        
//for pagination
          const IndexOfLastPost = currentPage*postPerPage;
          const IndexOfFirstPost = IndexOfLastPost-postPerPage;
          const currentPost = courses.slice(IndexOfFirstPost,IndexOfLastPost);
      
          const paginate = (p)=>setCurrentPage(p)

         const handleupdatedata=()=>{
          window.location.reload()
          localStorage.clear();
         }


         /////////////////

         useEffect(() => {
          // Check if there is a stored value in local storage
          const storedValue = localStorage.getItem("selectedOption");
      
          // If there is, set the state to the stored value
          if (storedValue) {
            setSelectValue(storedValue);
          }
        }, []);
      

  return (
      <div>
        {/* <Link to={`/courses?/${priceSorting}`}/> */}

          <div className="header">
          <Search setSearch={(search) => setSearch(search)} search={search}/>
               <button onClick={handleupdatedata}>Refresh</button>
               </div>



  <div className="top">

         <div className="container"> 

          <div className="leftSec">
            <Topic topic={topic} setTopic={setTopic}  topicIds={topicIds} courses={courses}/>
             <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} priceList={priceList}/>
                </div>
       
        <div className="rightSec">
            { currentPost.length>0 && (
            currentPost.map((data)=>{
                return (
                    <div key={data._id} className="courseData">

                        <div className="courseData-child">
                        <h4>{data.name}</h4>
                        <div className='piceGet'>
                        <h6>Rs. {data.priceRange}</h6>
                        </div>
                        </div >

                        <div className="courseData-child2">
                      <img src={data.img} alt="images" className="imagesCourse"/>
                        <p>{data.description}</p>
                        </div>

                           </div>
                                )
                          }))}

                           <div className="paginating">
                             <Post postPerPage={postPerPage} totalPost={courses.length} paginate={paginate}/>
                             </div>

        <div>
           </div>
                </div>

        <div className="rSec">
        <select
        value={selectValue || ''}
        id="sort-item"
        name="selectOptions"
        onChange={handleSelectChange} 
        className="options"
        >
                <option>Select</option>
                <option value="asc" selected="selected">Ascending</option>
                <option value="newest" >Newest</option>

            </select>
           </div>

            </div>
       </div>
  </div>


  )
}

export default Home;