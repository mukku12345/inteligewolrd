import React, { useState } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    topic_ids: [],
    name: "",
    location: ""
  });

  const handleChange = (e) => {
    const newSearchParams = { ...searchParams, [e.target.name]: e.target.value };
    setSearchParams(newSearchParams);
  };

  const handleTopicIdChange = (e) => {
    const newTopicIds = [...searchParams.topic_ids, e.target.value];
    const newSearchParams = { ...searchParams, topic_ids: newTopicIds };
    setSearchParams(newSearchParams);
  };

  const handleClick = () => {
    let queryString = "?";
    Object.entries(searchParams).forEach(([key, value], index) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          queryString += `${key}[${i}]=${v}`;
          if (index !== Object.entries(searchParams).length - 1 || i !== value.length - 1) {
            queryString += "&";
          }
        });
      } else {
        queryString += `${key}=${value}`;
        if (index !== Object.entries(searchParams).length - 1) {
          queryString += "&";
        }
      }
    });
    window.location.href = `http://localhost:3000/search/${queryString}`;
  };

  return (
    <div>
      <input type="text" name="topic_id" onChange={handleTopicIdChange} />
      <input type="text" name="name" value={searchParams.name} onChange={handleChange} />
      <input type="text" name="location" value={searchParams.location} onChange={handleChange} />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default SearchBar;

