import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Search = ({ setSearch,search }) => {
	const[searchParams,setSearchParams]=useSearchParams(
   ()=>{
		const stored = window.localStorage.getItem("searchParams");
		if (stored) {
		 return JSON.parse(stored);
		}else {
			return ""
		}
	

	})
    

useEffect(() => {
	
	 
	  window.localStorage.setItem("searchParams", JSON.stringify(searchParams));
	
  
  }, [searchParams]);
  



const handleChange = (e)=>{
	// e.preventDefault()
	if(searchParams===""){
		setSearch("")
		setSearchParams("")
		// window.location.reload();

	}else{
		setSearchParams({search: e.target.value})
	}
setSearch(e.target.value)

}

// const makeApiRequest = () => {
// 	const params = new URLSearchParams(
// 	  searchParams.map((param) => [param.q, param.value])
// 	);
  
console.log(searchParams.get('q'))

	return (
		<>
		{/* <Link to={`/search/${search}`}> */}
		<input
			type="text"
			className="search"
			placeholder="Search..."
			onChange={handleChange}
							// }
			
		/>
		{/* <Link to={`/search=/${search}`}/> */}
		 {/* </Link>  */}
		</>
	);
};

export default Search;