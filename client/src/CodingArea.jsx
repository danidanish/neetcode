import { useState } from "react"
import './App.css'
import './styles/style.css'
import { useLocation } from 'react-router-dom';


function Problem(){


//Enahancement: Need to retreive details of the questions from server using problem id



    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    // const problemString = params.get('problem');
    // const problem = problemString ? JSON.parse(decodeURIComponent(problemString)) : {};
    // console.log(problem)
    const location = useLocation();
  const problem = JSON.parse(decodeURIComponent(location.search.split('?problem=')[1]));

     return(
        <div>
        <h1><strong>{problem.problemid}.{problem.title}</strong></h1>
        <br></br>
         <p>{problem.description}</p>
         </div>
     )
}
function CodingArea(){
    const [textInput,setTextInput] = useState('test');
    const [codingLanguage,setcodingLanguage] = useState(['Assembly']);
    const handleInputChange=(e)=>{
        setTextInput(e.target.value);
    }
    async function CodingLanguages(){
        const json = await fetch('http://localhost:3001/getLanguages');
        const languages = await json.json();
        const names =languages.map((e)=>e.name)
        setcodingLanguage(names);
    }
    async function SubmitSolution(){
        const token = localStorage.getItem('jwttokenkey')
        alert(token)
const res = await fetch('http://localhost:3001/submissions',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
        'authorization':token
    },
    body: JSON.stringify({
        submissions:textInput
    })
});
const json = await res.json();
alert(json.msg)
    }
    
async function RunCode(){
    
    const token = localStorage.getItem('jwttokenkey')
const res = await fetch('http://localhost:3001/runsolution',{
method:'POST',
headers:{
    'Content-Type': 'application/json',
    'authorization':token
},
body: JSON.stringify({
    solution:textInput
})
});
const json = await res.json();
alert(json.msg)
}
return(
    <div>
    <div className="partitioned-input-container">
        <div className="m-10">
            {/* <h1><strong>1. Two Sum</strong></h1>
            <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.</p>
<br/>
<h2><strong>Example 1:</strong></h2>
<p><strong>Input:</strong> nums = [2,7,11,15], target = 9</p>
<p><strong>Output:</strong> [0,1]</p>
<p><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
<br/>
<h2><strong>Example 2:</strong></h2>
<p><strong>Input:</strong> nums = [3,2,4], target = 6</p>
<p><strong>Output:</strong> [1,2]</p> */}

<Problem/>
        </div>
<div>
        <div className="dropdown">
  <button className="dropbtn rounded-md px-5" onClick={CodingLanguages}>Assembly</button>
  <div className="dropdown-content">
  {codingLanguage.map((element, index) => (
    <a key={index}>{element}</a>
  ))}
  </div>
</div>
<textarea
className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 text-black"
type="text"
value={textInput}
onChange={handleInputChange}
></textarea>
<div>
    <button type="submit" onClick={RunCode} className="secondary-button font-medium m-4 rounded-md">Run</button>
    <button type="submit" onClick={SubmitSolution} className="primary-button font-medium m-4 rounded-md">Submit</button>
</div>
        </div>
    </div>
    </div>
)
}
export default CodingArea