import React from "react";
import { BrowserRouter,Route,Routes,Router } from "react-router-dom";
import Home from "./Home";
import Items from "./SavedLocations";
import SavedLocations from "./SavedLocations";
import About from "./About";
// import About from "./About";

function App(){
  return(
    <>

    <BrowserRouter>
    <Routes>
      <Route  index element = {<Home/>}></Route>
      <Route path = '/home' element = {<Home/>}></Route>
      <Route path = '/about' element = {<About/>}></Route>
      <Route path = '/saved-locations' element = {<SavedLocations/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App