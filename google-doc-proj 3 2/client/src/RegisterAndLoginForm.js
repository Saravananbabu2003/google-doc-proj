import {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  
  const [_,setCookies]=useCookies(["access_token"])

  const navigate=useNavigate()


  async function handleSubmit(ev) {
    ev.preventDefault();
    try{
      await axios.post("http://localhost:3002/auth/register",{
        username,
        password
      })
      alert("Registration Completed! Now you can login");
    }catch(err){
       console.error(err);
    }
    
  }


  const onSubmit=async(ev)=>{
    ev.preventDefault();
    try{
     const response= await axios.post("http://localhost:3002/auth/login",{
        username,
        password
      })

      setCookies("access_token",response.access_token)
      window.localStorage.setItem("userID",response.data.userID);
      navigate("/help")
    }catch(err){
      console.error(err);
    }

  }


  return (
    <>

    <div className="bg-blue-50 h-screen flex items-center">

      <form className="w-64 mx-auto mb-12" onSubmit={isLoginOrRegister==='login'?onSubmit:handleSubmit}>
      <h1 className='text-blue-600 text-4xl mb-10'>{isLoginOrRegister}</h1>
        <input value={username}
               onChange={ev => setUsername(ev.target.value)}
               type="text" placeholder="username"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <input value={password}
               onChange={ev => setPassword(ev.target.value)}
               type="password"
               placeholder="password"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?
              <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Dont have an account?
              <button className="ml-1" onClick={() => setIsLoginOrRegister('register')}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
    </>
  );
}