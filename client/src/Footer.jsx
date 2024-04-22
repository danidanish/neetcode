import './styles/style.css'
import { Link } from 'react-router-dom'
export default function Footer(){
return(
    <div className="flex justify-center bottom-0 w-full p-2 bg-gray-950">
            <Link to="https://github.com/danidanish" className="footer-buttons">Github</Link>
            <Link to="https://www.linkedin.com/in/dani-danish/" className="footer-buttons">LinkedIn</Link>
            <Link to="https://twitter.com/danish_m_m" className="footer-buttons">Twitter</Link>
        </div>
)
}