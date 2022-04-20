import React, { useState,useContext } from "react";
import { InputGroup, Input, Button,Spinner } from "reactstrap";
import "../App.css";
import axios from "axios";
import BookCard from "./BookCard";

import { GoogleLogout } from "react-google-login";


import { ToastContainer, toast } from "react-toastify";


const MainPage = () => {

 

  const {setAccount}=useState();

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
      axios.get(
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
                     id={item.id}
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


       const clientid="57255339281-92aicvnt94c0n4porbpa4kgugf5lk197.apps.googleusercontent.com";


       const onlogoutSucccess=()=>{
             
              alert("You have Logout Successfully");
              console.clear();  
              setAccount([]);
             
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

          <GoogleLogout
                clientId={clientid}
                buttonText="Logout"
                onLogoutSuccess={onlogoutSucccess}
                
              
            />
           
       
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

         

{/* validation */}







        </div>
      </div>
      {handleCards()}
      <ToastContainer />
    </div>
  );
};

export default MainPage;
