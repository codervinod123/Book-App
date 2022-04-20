import React,{useState} from 'react'
import { Card,CardTitle,CardImg,CardBody,Button,Modal } from 'reactstrap'
// import { Link } from '@material-ui/core';




//passing props for taking every info from google api
const BookCard = ({
    thumbnail,
    title,
    pageCount,
    language,
    author,
    publisher,
    description,
    previewlink,
    infolink,
    id,

      }) => {

    const [modal, setModal] = useState(false);
    const toggle=()=>setModal(!modal);
  return (
     <Card  className='my-auto' style={{width:"233px"}}>
         <CardImg  top style={{width:'100%',height:'233px'}} src={thumbnail} alt={title}/>
         <CardBody>
             <CardTitle className='card-title'>{title}</CardTitle>
             <Button onClick={toggle}>Morre Information</Button>
         </CardBody>
         <Modal isOpen={modal} toggle={toggle}>
               <div className="modal-header d-flex justify-content-center">
                   <h5 className='modal-title text-center' id='exampleModalLAbel'>{title}</h5>
                   <button  aria-label='close' className='close' type='button' onClick={toggle}>
                       <span  aria-hidden={true}>&nbsp;X</span>
                   </button>
               </div>
               <div className="modal-body">
                   <div className="d-flex justify-content-between ml-3">
                       <img src={thumbnail} alt={title} style={{height:'233px'}} />
                       <div>
                          <p>Author:{author}</p>
                          <p>Language:{language}</p>
                           <p>Publisher:{publisher}</p>
                           <p>No of Page:{pageCount}</p>
                           <p>BookId:{id}</p>
                            <p>More Info:{infolink}</p>
                            <p>Preview Book:{previewlink}</p>
                       </div>
                   </div>
                   <div className='mt-3'>{description}</div>
               </div>
         </Modal>
     </Card>
  )
}

export default BookCard