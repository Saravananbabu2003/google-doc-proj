import React, { useEffect } from "react";
import { createContext } from "react";
import TextEditor from "./TextEditor"
import Cookies from 'js-cookie';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom"
import Tea from "./Tea"
import Help from "./Help";
import { useState } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm"
import Creation from "./Creation";
import AllDocuments from "./AllDocuments";
import OtherLogs from "./OtherLogs";
import { Navbar } from "./Navbar";

export const ReqContext=createContext();


function App() {
  const [idc,setIdc]=useState(false);
  const [hi,setHi]=useState(false);
  const cookie=Cookies.get('my');

  const process = ()=>{
    console.log(window.localStorage.getItem("access"));
    if(window.localStorage.getItem("access")==='abc'){
    setHi(true);
    }
    else{
      setHi(false);
    }
    console.log(window.localStorage.getItem("access")==='abc')
    
    // if(window.localStorage.getItem("access")==='abc'){
    //   setIdc(true)
    // }
    // else{
    //  setIdc(false)
    // }
    // console.log(hi)
    // window.location.reload(false);
  }
  function abc(){
    window.location.reload(false);
  }
   useEffect(()=>{
    
    process();
    // window.location.reload(false);
   
   },[])

  
  return (
    <ReqContext.Provider  value={{idc,setIdc}}>
    <Router>
    <Navbar/>
      <Routes>

        <Route path="/"  element={<RegisterAndLoginForm/>} exact/>
       
       <Route path="/help" element={<Help/>}/>
    
       <Route path="/c" element={<Creation/>}/>
       <Route path="/a" element={<AllDocuments/>}/>
      
        <Route path="/documents/:id" element={idc||(hi&&cookie==='abc')?<TextEditor/>:<Tea/>}/>
        
      </Routes>
    </Router>
    </ReqContext.Provider >
  )
}

export default App
