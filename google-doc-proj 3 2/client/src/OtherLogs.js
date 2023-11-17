import React, { useState,useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from "uuid";
import axios from 'axios';
import { ReqContext } from './App';


const OtherLogs = () => {
    const [username, setUsername] = useState('');
  return (
    <div>
         <div className="bg-blue-50 h-screen flex items-center">

<form className="w-64 mx-auto mb-12" >

  <input value={username}
         onChange={ev => setUsername(ev.target.value)}
         type="text" placeholder="Token!"
         className="block w-full rounded-sm p-2 mb-2 border" />
  
  <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
      open
  </button>
 

</form>
</div>
    </div>
  )
}

export default OtherLogs