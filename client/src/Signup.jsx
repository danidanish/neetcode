import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/style.css'

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  async function checkCredsAndSubmit(e) {
    
     if(email==''||password==''||confirmpassword==''){
      alert('Please enter all information in all the fields!')
      e.preventDefault();
     }
     else{
      if(password!=confirmpassword){
        alert('Password mismatch!')
        e.preventDefault();
      }
      else{
        const data = [{
          email:email,
          password:password
        }]
        try{
          debugger
        const res = await fetch('http://localhost:3001/signup',{
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
        setemail("")
        setpassword("");
        setconfirmpassword("")
      }
      catch(e){
          console.error('Error: ',e);
        }
      }
     }
  }
  return (
    <div>
      <div className="flex flex-col m-20 p-20 items-center justify-center">
        <h1 className='text-2xl'>Hey there,</h1>
        <div className='w-96 m-5'>
          <input type='email' className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-md text-black" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />
        </div>
        <div className='w-96 m-5'>
          <input type='password' className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-md text-black" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
        </div>
        <div className='w-96 m-5'>
          <input type='text' className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-md text-black" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} placeholder='Confirm Password' />
        </div>
        <div className='flex justify-center primary-button'>
        <input type="submit" onClick={checkCredsAndSubmit} value="SignUp" />
        </div>
      </div>

    </div>
  )
}


export default Signup
