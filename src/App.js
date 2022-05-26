import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DonutChart from "react-donut-chart";
import './App.css';

import  Login  from './Pages/login/login';
import  Sample  from './Pages/sample/sample';

import Dashboard from './Common/Dashboard';
import Managecontact from './Pages/Managecontact/Managecontact';
import Managemain from './Pages/Managecontact/Managemain';
import Forgotpassword from './Pages/login/Forgotpassword';
import Resetpassword from './Pages/login/Resetpassword';



function App() {

 
  return (
   <>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />}/>
    <Route path="/sample" element={<Sample/>}/>
    <Route path='/Login' element={<Login />} />
    <Route path='/Managecontact' element={<Managecontact />} />
    <Route path='/Forgotpassword'  element={<Forgotpassword />} />
    <Route path='/Resetpassword' element={<Resetpassword />} />
  </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
