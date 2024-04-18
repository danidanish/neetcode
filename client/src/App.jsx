import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionsHomePage from './QuestionsHomePage'
import Signup from './Signup'
import Login from './Login'
import './styles/style.css'
import Navbar from "./nav";
import CodingArea from './CodingArea';
import Footer from './Footer';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<QuestionsHomePage />} />
        <Route path="/QuestionsHomePage" element={<QuestionsHomePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CodingArea" element={<CodingArea />} />
      </Routes>
      <Footer/>
    </Router>
  )
}
