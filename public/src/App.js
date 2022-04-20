import React from 'react';
import { Route,Routes,BrowserRouter} from 'react-router-dom';
//import Chat from './pages/Chat';

import Register from './pages/Register';
import Home from './pages/Home';
import MainPage from './pages/MainPage';



//importing google login 
import AccountProvider from './google_login/AccountProvider';
import FinalLogin from './pages/FinalLogin';
import Login from './pages/Login';


const App = () => {

  
  return (
    <AccountProvider >
       <BrowserRouter>
         <Routes>
            
              <Route path="/" element={<Home/>}/>
             
              <Route path="/login" element={<Login/>}/>
              <Route path="/books" element={<MainPage/>}/>
              <Route  path="/register" element={<Register/>}/>
             
          </Routes>
       </BrowserRouter>
   </AccountProvider>
  )
}

export default App