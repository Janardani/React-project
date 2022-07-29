
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from './Component/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import Privateroute from './Component/Privateroute';
import Profile from './pages/Profile';
<Link href="https://fonts.googleapis.com/css2?family=Uchen&display=swap" rel="stylesheet"></Link>


function App() {

  return (
    <div className='main-compo'>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='sun-main'>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route element={<Privateroute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>


  );
}

export default App;
