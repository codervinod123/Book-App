import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
















import React, { useState } from "react";
import { InputGroup, Input, Button, FormGroup, Label,Spinner } from "reactstrap";
import "../App.css";
import axios from "axios";
import BookCard from "./BookCard";

import { ToastContainer, toast } from "react-toastify";

const MainPage = () => {
  const [maxResult, setMaxResult] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const handleSubmit = () => {
    setLoading(true);
    if (maxResult > 40 || startIndex < 1) {
      toast.error("vinod bhai kuch aur dalo");
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResult}&startIndex=${startIndex}`
        )
        .then((res) => {
          if (startIndex >= res.data.totalItem || startIndex < 1) {
            toast.error(`search between ${res.data.totalItem} and 1`);
          } else {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
              setLoading(false);
            }
          }
        })
        .catch((error) => {
          setLoading(true);
          console.log(error);
          toast.error(`$err.response.data.error.message`);
        });
    }
  };

  // const mainheader = () => {
  //   return (
      // <div className="main-image d-flex justify-content-center align-items-center flex-items-center flex-column ">
      //   <div className="filter"></div>
      //   <h1
      //     className="display-2 text-center text-white mb-3"
      //     style={{ zIndex: 2 }}
      //   >
      //     Google Books
      //   </h1>
      //   <div style={{ width: "50%", zIndex: 2 }}>
      //     <InputGroup size="1g" className="mb-3">
      //       <Input
      //         placeholder="Books search"
      //         value={query}
      //         onChange={(e) => setQuery(e.target.value)}
      //       />
      //       <Button color="secondary" onClick={handleSubmit}>
      //         <i className="fas fa-search"></i>
      //       </Button>
      //     </InputGroup>

      //     <div className="d-flex text-white justify-content-center">
      //       <FormGroup className="ml-5">
      //         <Label htmlFor="maxResults">Max Results</Label>
      //         <Input
      //           type="number"
      //           id="maxResults"
      //           placeholder="Max Res"
      //           value={maxResult}
      //           onChange={(e) => setMaxResult(e.target.value)}
      //         />
      //       </FormGroup>

      //       <FormGroup className="ml-5">
      //         <Label htmlFor="StartIndex">Start Index</Label>
      //         <Input
      //           type="number"
      //           id="StartIndex"
      //           placeholder="Start Index"
      //           value={startIndex}
      //           onChange={(e) => setStartIndex(e.target.value)}
      //         />
      //       </FormGroup>
      //     </div>
      //   </div>
      // </div>
  //   );
  // };


  const handleCards=()=>{


      console.log(cards);
      const items=cards.map((item)=>{
        let thumbnail="";
        if(item.volumeInfo.imageLinks.thumbnail){
          thumbnail=item.volumeInfo.imageLinks.thumbnail;
        }
        return (
          <div className="col-lg-4" key={item.id}>
            <BookCard
                     thumbnail={thumbnail} 
                     title={item.volumeInfo.title}
                     pageCount={item.volumeInfo.pageCount}
                     language={item.volumeInfo.language}
                     author={item.volumeInfo.author?item.volumeInfo.author:'Unknown'}
                     publisher={item.volumeInfo.publisher}
                     description={item.volumeInfo.description}
                     previewlink={item.volumeInfo.previewlink}
                     infolink={item.volumeInfo.infolink}
                     bookid={item.accessInfo.id?item.accessInfo.id:100*Math.random()}
                     
                     />
          </div>
        )
      })
      if(loading)
      {
        return (
          <div className="d-flex justify-content-center mt-3">
              <Spinner style={{width: '3rem', height:'3rem'}}/>
          </div>
        )
      }
      else{
        return(
          <div className="container my-5">
            <div className="row">{items}</div>
          </div>
        )
      }

  }



  return (
    <div className="w-100 h-100">
       <div className="main-image d-flex justify-content-center align-items-center flex-items-center flex-column ">
        <div className="filter"></div>
        <h1
          className="display-2 text-center text-white mb-3"
          style={{ zIndex: 2 }}
        >
          Google Books
        </h1>
        <div style={{ width: "50%", zIndex: 2 }}>
          <InputGroup size="1g" className="mb-3">
            <Input
              placeholder="Books search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button color="secondary" onClick={handleSubmit}>
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup>

          <div className="d-flex text-white justify-content-center">
            <FormGroup className="ml-5">
              <Label htmlFor="maxResults">Max Results</Label>
              <Input
                type="number"
                id="maxResults"
                placeholder="Max Res"
                value={maxResult}
                onChange={(e) => setMaxResult(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="ml-5">
              <Label htmlFor="StartIndex">Start Index</Label>
              <Input
                type="number"
                id="StartIndex"
                placeholder="Start Index"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
      {handleCards()}
      <ToastContainer />
    </div>
  );
};

export default MainPage;










max min ValidityState



 {/* <div className="d-flex text-white justify-content-center"> */}
            {/* <FormGroup className="ml-5">
              <Label htmlFor="maxResults">Max Results</Label>
              <Input
                type="number"
                id="maxResults"
                placeholder="Max Res"
                value={maxResult}
                onChange={(e) => setMaxResult(e.target.value)}
              />
            </FormGroup> */}

            {/* <FormGroup className="ml-5">
              <Label htmlFor="StartIndex">Start Index</Label>
              <Input
                type="number"
                id="StartIndex"
                placeholder="Start Index"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup> */}
          {/* </div> */}