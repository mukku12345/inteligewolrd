import { DataProvider } from "./components/contexts/context";
import Home from './tables/Home'
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'
import Topic from "./tables/components/Topic";
import PriceRange from "./tables/components/PriceRange";
import Search from "./tables/components/Search";
import Header from './tables/Header'


function App() {
  return (
      <>
        {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
           <Route path="/topicId/:id" element={<Topic/>}/>
          <Route path="/priceRange" element={<PriceRange/>}/>
          <Route path="/search" element={<Search/>}/>

           </Route>
          
        </Routes>
        </BrowserRouter> */}
     
          <Home/>
      
      
    </>
    // ,
    //   document.querySelector('#app')
   
  );
}

export default App;
