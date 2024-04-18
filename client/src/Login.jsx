import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/style.css'

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  async function checkCredsAndSubmit(e) {
    
    if(email==''||password==''){
     alert('Please enter all information in all the fields!')
     e.preventDefault();
    }
    else{
       const data = [{
         email:email,
         password:password
       }]
       try{
       const res = await fetch('http://localhost:3001/login',{
         method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
         body: JSON.stringify({
           email:email,
         password:password
         })
       });
       const json = await res.json();
       alert(json.msg)
       if(typeof window.localStorage !== 'undefined') {
        console.log(json.token)
        localStorage.setItem('jwttokenkey',json.token)
      } else {
        alert('We donot support this browser at the moment. Please switch to a different browser!')
      }
       setemail("")
       setpassword("");
     }
     catch(e){
         console.error('Error: ',e);
       }
     
    }
 }
  return (
    <div className="flex flex-col m-20 p-20 items-center justify-center">
      <h1 className='text-2xl'>Welcome Back,</h1>
      <div className='w-96 m-5'>
        <input type='email' className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-md text-black" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />
      </div>
      <div className='w-96 m-5'>
        <input type='password' className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-md text-black" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
      </div>
      <div className='flex justify-center secondary-button'>
        <input type="submit" onClick={checkCredsAndSubmit} value="Login" />
      </div>
    </div>
  )
}

export default Login
