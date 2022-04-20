// key cg===can be use for another asgnmnt




import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


//toasd is like a  rendering message after validating the values
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


//importing logo image  from asset/logo.svg
// cg
// import logo from '../assets/logo.svg'



//importing axios sp that api cann be called  and data can be deliver in database 
import axios from 'axios';


//not sure about this import
import {registerRoute} from '../utils/APIRoutes'


const Register = () => {

   const navigate=useNavigate();

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
             console.log("in validation",registerRoute);
              const {username,email,password}=values;
               const {data}=await axios.post(registerRoute,{
                 username,
                 email,
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
              
              navigate("/");
              
           }
        };
 

      
       

          //validation of the form of different conditions
         const handleValidation=()=>{
         const {username,email,password,conform_password}=values;
         
         if(password!==conform_password)
         {
           toast.error(
             "Password should synch.",
              errorMessage
              );
           return false;
         }else if(username.length < 3)
         {
            toast.error("Invalid Username",errorMessage);
            return false;
         }
         else if(password.length < 7){
            toast.error("Invalid pass",errorMessage);
            return false;
         }else if(email==="")
         {
           toast.error("Invalid mail id",errorMessage);
           return false;
         }
         return true;
       } 


        //initiallly assign the values equal to NULL

        const [values, setValues] = useState({
          username:"",
          email:"",
          password:"",
          conform_password:"",
        });

        //handling the text areas where we ave to fill the details to login
        const handleChange=(event)=>{
          setValues({ ...values, [event.target.name]:event.target.value})
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
          /> 

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />

          <input
            type="password"
            placeholder="Conform Password"
            name="conform_password"
            onChange={(event) => handleChange(event)}
          />
         <button type="submit">Create User</button>
         <span>
            Already Have an account? <Link to="/login">Login</Link>
         </span>
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


export default Register;


