import React,{useEffect} from 'react';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom';
import  Login  from './Pages/login/login';
import Forgotpassword from './Pages/login/Forgotpassword';
import Resetpassword from './Pages/login/Resetpassword';
import Dashright from './Common/Dashright';
import Managemain from './Pages/Managecontact/Managemain';
import Addcontact from './Pages/Managecontact/Addcontact';
import Contactinformation from './Pages/Managecontact/Contactinformation';
import Editcontact from './Pages/Managecontact/Editcontact';
import Report from './Pages/Reports/Report';

function App() { 
  return (
   <>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashright/>}/>
    <Route path='/Login' element={<Login />} />
    <Route path='/Managecontact' element={<Managemain />} />
    <Route path='/Forgotpassword'  element={<Forgotpassword />} />
    <Route path='/Resetpassword' element={<Resetpassword />} />
    <Route path='/Addcontact' element={<Addcontact />} />
    <Route path='/Contactinformation' element={<Contactinformation />} />
    <Route path='/Editcontact' element={<Editcontact />} />
    <Route path='/Report' element={<Report />} />
    </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;

