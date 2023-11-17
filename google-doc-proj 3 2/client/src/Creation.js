import React, { useState,useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from "uuid";
import axios from 'axios';
import { ReqContext } from './App';
import Cookies from 'js-cookie';

const Creation = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setIdc}=useContext(ReqContext);
    const [finall,setFinall] = useState('')
    const [flag,setFlag]=useState(false);
  
 

 


 


   const process =async(ev)=>{
    ev.preventDefault();
    
    console.log(  username,
        password,
    )
    try{
       
     const response= await axios.post("http://localhost:3002/auth/creation",{
        username,
        password,
        userId:window.localStorage.getItem("userID")
    }
    )
   
   const {final,privateId,publicId}= await response.data;
     setIdc(true);
     setFinall(final)
     console.log( username,
        password,final,privateId,publicId)
      alert("loding...");
      setFlag(true);
     
    }catch(err){
       console.error(err);
    }
    Cookies.set('my','abc');
    window.localStorage.setItem("access","abc");

   }









   return (
   
    <>
    {
    (!flag)?
    <>


  
<div>
  <div className=''>
    
  </div>
     <div className="bg-blue-50 h-screen flex items-center">

      <form className="w-64 mx-auto mb-12" onSubmit={process}>
      <h1 className='text-orange-600 text-4xl mb-10'>new document</h1>
        <input value={username}
               onChange={ev => setUsername(ev.target.value)}
               type="text" placeholder="DOCUMENT NAME"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <textarea value={password}
               onChange={ev => setPassword(ev.target.value)}
               type="text"
               placeholder="DESCRIPTION"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2" >
          create the document
        </button>
        
      </form>
    </div>


    </div>







  
    </>:<>
    <Navigate to={`/documents/${finall}`} />
    </>

    }
    
    

    
    </>

  )
}



export default Creation