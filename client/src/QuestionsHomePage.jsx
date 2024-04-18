
import { Link } from 'react-router-dom';
import './App.css'
import './styles/style.css'
import { useState } from "react";

//Enhancement: Pagination should be properly implemented.

//Implement useEffect()


function QuestionsHomePage() {

    const [tableData, setTableData] = useState([]);
async function getQuestions(page){
    try{    
    const res = await fetch('http://localhost:3001/questions',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                page:page
              })
        });
        const json = await res.json();
        setTableData(json);
    }
        catch (error) {
            console.error('Error:', error);
          }
}

    function ProblemStatement(props) {
        return (
            <table>
                <thead>
                    <tr className="flex flex-row w-full p-10">
                        <th className='flex-none w-3/12'>Sl.No</th>
                        <th className='flex-1'>Title</th>
                        <th className='flex-none w-3/12'>Difficulty</th>
                    </tr>
                </thead>
                <tbody >
                    {tableData.map((problem, index) =>
                        <tr
                            key={index}
                            className={`flex flex-row w-full p-10 text-black hover:text-white hover:bg-zinc-700
                      ${index % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-400'}
                    `}
                        >
                            <td className='flex-none w-3/12'>{problem.problemid}</td>
                            <td className='flex-1'><Link to={`/CodingArea?problem=${encodeURIComponent(JSON.stringify(problem))}`}>{problem.title}</Link></td>
                            <td className='flex-none w-3/12'>{problem.difficulty}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    return (
        <div className="flex text-center justify-center flex-col">
            <ProblemStatement />
            <div className=" mx-auto flex justify-center">
            <button className="primary-button" onClick={() => getQuestions(1)}>1</button>
                <button className="primary-button" onClick={() => getQuestions(2)}>2</button>
            </div>
        </div>
    )
}



export default QuestionsHomePage