import React from 'react'
import {Link} from 'react-router-dom';
import {makeStyles } from "@material-ui/core/styles";

import "./home.css"


const useStyle=makeStyles({
     navigate_reg:{
      position:' absolute',
      textDecoration: "none",
      right: 0,
      paddingRight: 150,
      fontSize:25,
      color:'white',
      '&:hover': {
        color:"#4169E1",
     },
       
  },
  
  navigate_log:{
    position: 'absolute',
    textDecoration: "none",
    right: 0,
    paddingRight: 40,
    fontSize:25,
    color:'white',
    '&:hover': {
      color:"#4169E1",
   },
  },


})

const Home = () => {

  const classname=useStyle();
  return (
    <>
    <div className="image_container">
          <img className="image" src="https://manybooks.net/themes/custom/mnybks/logo.svg" alt="" />
          <h2>E-Books <br /> Labs</h2>
            <Link className={classname.navigate_reg} to='/register'>Register</Link>
            <Link className={classname.navigate_log} to="/login">Login</Link>
    </div>

    <div className="body_container">
          <img src="https://scontent.fshl2-1.fna.fbcdn.net/v/t1.6435-9/148289397_2491897717783918_5335925554219401436_n.jpg?stp=dst-jpg_p600x600&_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_ohc=0MnD6wQyBK0AX9N6nc2&_nc_ht=scontent.fshl2-1.fna&oh=00_AT8PR5JN0ixuWGCcMvBDUU-K_xVs24a2djQJRjcjoBli8w&oe=627F8786" alt="" />
    </div>
    </> 
  )
}
export default Home;