import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import Checkout from './dashboard/Checkout';
import Login from './Login';
import Signup from './Signup';
import Quee from './dashboard/Quee';
import Orders from './dashboard/Orders';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path='/checkout' element={<Checkout></Checkout>}></Route>
        <Route path="/quee" element={<Quee></Quee>}></Route>
        <Route path="/orders" element={<Orders></Orders>}></Route>
      </Routes>
    </Router>
  );
}

export default App
