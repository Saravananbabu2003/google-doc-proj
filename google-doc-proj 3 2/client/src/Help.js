import React, { useState,useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import './help.css'
import { ReqContext } from './App';


function Help() {
 
  const {setIdc}=useContext(ReqContext);

  const [final,setFinal]=useState('');
  const [input,setInput]=useState('');
  const [flag,setFlag]=useState(false);
  const [good,setGood]=useState(false);



  const goToGoogleDoc=(ev)=>{
    ev.preventDefault();
    console.log(input.length)
    console.log(input)
   if(input.length===37){
    console.log(input.length)
    console.log(input)
    if(input[18]==="p"){
      setFinal(input.slice(0,18));
      setIdc(true);
      Cookies.set('my','abc');
      window.localStorage.setItem("access","abc",{expires:7});
      
    }else{
      Cookies.set('my','efg',{expires:7});
     window.localStorage.setItem("access","efg");
      setFinal(input.slice(19,37));
      setIdc(false);
    }

   setFlag(true);
   } else{
      setGood(true)
   }

  }
  return (
   
    <>
    {
    (!flag)?
    
    <div>
     
     <div className="bg-blue-50 h-screen flex items-center">

      <form className="w-64 mx-auto mb-12" onSubmit={goToGoogleDoc}>
 
      <h1 className='text-orange-600 text-4xl mb-10 '>Enter Token</h1>
        <textarea value={input}
               onChange={ev => setInput(ev.target.value)}
               type="text"
               placeholder="Token!"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2" >
          Go TO Document
        </button>
        {
          good && <h1>Invalid Token</h1>
        }
        
      </form>
    </div>
    </div>
   :<>
    <Navigate to={`/documents/${final}`} />
    </>

    }
    
    

    
    </>

  )
}

export default Help;