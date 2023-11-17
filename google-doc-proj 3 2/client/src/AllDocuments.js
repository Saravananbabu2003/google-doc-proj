import React, { useState,useContext, useEffect } from 'react'
import axios from 'axios';
import { ReqContext } from './App';
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

function AllDocuments() {
    const {setIdc}=useContext(ReqContext);
    const [flag,setFlag]=useState(false);
    const [id,setId]=useState('');
    const [allDocuments,setAllDocuments]=useState([]);


useEffect(()=>{
   process()
},[])

const process =async()=>{
  try{
       
     const response= await axios.post("http://localhost:3002/auth/alldocs",{
    
        userId:window.localStorage.getItem("userID")
    }
    )
   
   const {savedRecipes}= await response.data;
    console.log(savedRecipes);
      setAllDocuments(savedRecipes);
     
    }catch(err){
       console.error(err);
    }
    

   }

   const btn=(docID)=>{
      Cookies.set('my','abc');
   window.localStorage.setItem("access","abc");
    setIdc(true);
    setId(docID);
    setFlag(true);

   }

   const btnn=async(docID)=>{
      await axios.delete(`http://localhost:3002/auth/items/${docID}`)
      .then(response => {
          // Handle success
          console.log('Item deleted successfully');
      })
      .catch(error => {
          // Handle error
          console.error('Error deleting item', error);
      });
      // const response= await axios.post("http://localhost:3002/auth/creation",{
      //   docID
      //  })
      
      process()
     }
  

    console.log(window.localStorage.getItem("userID"))
  return (
   <>{
      allDocuments.length===0?<h1>No document</h1>
    
   
    :<>
    { !flag?
    <div>
        {
           allDocuments.map(doc=>{
             return (
                <div key={doc._id} className='border-4 mb-2 mt-2 ml-2 mr-2 border-black p-2 border-double rounded-md text-emerald-700'>

                <div>
            <h1>Document-Name : {doc.docName}</h1>
            <h2>Document-Description : {doc.description}</h2>
            <h2>Private-Token :<div className="text-blue-800">{doc.publicID}</div> </h2>
            <h2>Public-Token  :<div className='text-blue-800'>{doc.privateID}</div></h2>
            <button onClick={()=>btn(doc._id)} className='bg-blue-500 text-white block w-full rounded-sm p-2 mb-2 mt-2'>OPEN</button>
            <button onClick={()=>btnn(doc._id)} className='bg-red-500 text-white block w-full rounded-sm p-2'>DELETE</button>
             </div>

                 
            
                </div>
             )
           })
        }

    

    </div>: <Navigate to={`/documents/${id}`} />
    }

    </>
}
    </>
  )
}

export default AllDocuments