// import React from 'react';
import './App.css';
import Index from './Tiki/Index';
import { Routes,Route} from "react-router-dom";
import Show_Tiki from './Tiki/Show_Tiki';
import Home from './Tiki/Home';



function App() {
  return (
    <div>
      {/* <Index></Index> */}
      {/* <ShowProduct></ShowProduct> */}
      {/* <Home></Home>
      <Show_Tiki></Show_Tiki>  */}
      <Routes>
                <Route exact path='/Home' element={<Home/>}></Route> 
                <Route path='/Show_Tiki' element={<Show_Tiki/>}></Route>

        </Routes>
    </div>
  );
}

export default App;
