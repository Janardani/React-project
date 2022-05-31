import React,{useEffect} from 'react';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom';
import './App.css';

import  Login  from './Pages/login/login';

import Dashboard from './Common/Dashboard';
import Managecontact from './Pages/Managecontact/Managecontact';
import Forgotpassword from './Pages/login/Forgotpassword';
import Resetpassword from './Pages/login/Resetpassword';
import Addcontactmain from './Pages/Addcontact/Addcontactmain';
import Contactinformationmain from './Pages/Contactinformation/Contactinformationmain';
import Editcontactmain  from './Pages/Editcontact/Editcontactmain';



function App() {
// const navigate = useNavigate();
  // useEffect(() => {
  //   if(sessionStorage.getItem("sesemail"))
  //   {
  //     navigate('/');
  //   }
  //   else{
  //     navigate('/Login')
  //   }
  
  // }, [])

 
  return (
   <>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />}/>
    <Route path='/Login' element={<Login />} />
    <Route path='/Managecontact' element={<Managecontact />} />
    <Route path='/Forgotpassword'  element={<Forgotpassword />} />
    <Route path='/Resetpassword' element={<Resetpassword />} />
    <Route path='/Addcontact' element={<Addcontactmain />} />
    <Route path='/Contactinformation' element={<Contactinformationmain />} />
    <Route path='/Editcontact' element={<Editcontactmain />} />
    </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
