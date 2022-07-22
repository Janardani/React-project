
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from './Component/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import Privateroute from './Component/Privateroute';


function App() {
  
  return (
<AuthProvider>
    <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/" element={<Home/>}/>
   {/* <Route element={<Privateroute/>}>
   <Route path="/" element={<Home />}/>
   </Route> */}
    </Routes>
  </BrowserRouter>
  </AuthProvider>
 
  );
}

export default App;
