import './styles/style.css'
import { Link } from 'react-router-dom'
export default function navbar() {
    return (
        <div className="flex justify-center p-2 bg-gray-950">
            <Link to="/QuestionsHomePage" className="nav-buttons">Problems</Link>
            <Link to="/Signup" className="nav-buttons">SignUp</Link>
            <Link to="/Login" className="nav-buttons">Login</Link>
        </div>
    )
}