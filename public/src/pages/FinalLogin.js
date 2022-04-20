import React,{useState,useContext} from "react";
import { Link} from "react-router-dom";
import styled from "styled-components";

import {GoogleLogin} from "react-google-login";


//toasd is like a  rendering message after validating the values
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

//importing logo image  from asset/logo.svg

//import logo from '../assets/logo.svg'



//importing axios sp that api cann be called  and data can be deliver in database 
import axios from 'axios';


//not sure about this import
//just for the google login things
import {loginRoute} from '../utils/APIRoutes'


import { AccountContext } from "../google_login/AccountProvider";


import { makeStyles } from "@material-ui/core";

const useStyle=makeStyles({
    login:{
        backgroundColor: '#033E3E',
        padding:0,
        '& > *':{
           backgroundColor: '#033E3E!important',
    }
     }
})

const FinalLogin = () => {

const classname=useStyle();
    const {account,setAccount}=useContext(AccountContext);
  
    const clientid="57255339281-92aicvnt94c0n4porbpa4kgugf5lk197.apps.googleusercontent.com";
   //i have use this style for validation that has called more than 4 imes so  i  have create it as a object

   const errorMessage={
         
    position:"bottom-right",
      autoClose:4000,
       pauseOnHover:true,
        draggable:true,
           theme:"dark"
     }

  
        //handling the wholthe form wille the form willl be selected through submit button
       
        const handleSubmit =async (event) => {
           event.preventDefault();
         
           //if (handleValidation() returns true then we will call to our api)
           if(handleValidation())
           {
           
             console.log("in validation",loginRoute);
              const {username,password}=values;
               const {data}=await axios.post(loginRoute,{
                 username,
                 password,
               });
              if(data.status===false)
              {
                toast.error(data.msg,errorMessage)
              }

              if(data.status===true)
              {
                localStorage.setItem('chat-app-user',JSON.stringify(data.user))
              }
              
            
              
           }
        };
 

      
       

          //validation of the form of different conditions
         const handleValidation=()=>{
         const {username,password}=values;
         
         if(password==="")
         {
           toast.error(
             "Password and Email is required.",
              errorMessage
              );
           return false;
         }else if(username==="")
         {
            toast.error(
              "Password and Email is required.",
              errorMessage
              );
            return false;
         }
         return true;
       } 


        //initiallly assign the values equal to NULL

        const [values, setValues] = useState({
          username:"",
          password:"",
         
        });

        //handling the text areas where we ave to fill the details to login
        const handleChange=(event)=>{
          setValues({ ...values, [event.target.name]:event.target.value})
        }



        const onLoginSuccess=(res)=>{
            console.log("Login SuccessFully",res.profileObj);
            setAccount(res.profileObj);
      } 
 
     const onFailure=(res)=>{
           console.log("Login failure",res);
     }
 
       


  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
             {/* <img src={logo} alt="" />  snpy */}
             <img src="https://manybooks.net/themes/custom/mnybks/logo.svg" alt="" />
            <h1>E-Book Lab</h1>
          </div>


          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event)}
            min="3"
          /> 

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />

          
         <button type="submit">Login User</button>
         <span>
            Don't Have an account? <Link to="/register">Register</Link>
         </span>
         {/* crucial ---->>>>>>>  1  day------ */}

      <div  className={classname.login}>
         <GoogleLogin
             clientId={clientid}
             buttonText="Login"
             onSuccess={onLoginSuccess}
             onFailure={onFailure}
             isSignedIn={true}
             cookiePolicy={'single_host_origin'} 
            
          />
    </div>      
        </form>

        
        </FormContainer>
       <ToastContainer/>
    </>
  );
};




const FormContainer=styled.div`
  
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  ${'' /* snpy */}
  ${'' /* background-color: #00FF00; */}



${'' /* all are for just ony assssssm */}
  background:url(https://image.shutterstock.com/image-photo/book-library-old-open-textbook-260nw-785109361.jpg);
  background-repeat: no-repeat;
  background-size: cover;

 
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    
    display:flex;
    flex-direction:column;
    gap:1rem;
    ${'' /* cg */}
    background:#66CDAA;
    border-redious:2rem;
    padding:3rem 5rem;
    border-radius: 1rem;
  }
  input {
    
    background-color:transparent;
    ${'' /* cg */}
    border: .1rem solid #307D7E;
    padding:.7rem;
    border-radius: .4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &: focus{
           border:.1 rem solid #997af0;
           outline:none;
    }
    
  }
  button {
    ${'' /* cg */}
    background-color: #033E3E;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      ${'' /* cg */}
      background-color: #307D7E;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      ${'' /* chg */}
      color: #033E3E;
      text-decoration: none;
      font-weight: bold;
      &:hover {
      ${'' /* cg */}
      color: #307D7E;
    }

    }
  }
`


export default FinalLogin;


