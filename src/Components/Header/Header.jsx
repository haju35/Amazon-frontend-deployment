import React,{useContext} from 'react'
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import classes from './header.module.css';
import LowerHeader from "./LowerHeader";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/firebase"


const Header = () => {
  const [state] = useContext(DataContext);
  const { user,basket } = state || {};  
  
  console.log(basket?.length || 0);
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <section className={classes.fixed}>
      <section>
          <div className={classes.header_container}>
            <div className={classes.logo_container}>
              <Link to="/">
                <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazon-logo' />
              </Link>
              <span>
              <SlLocationPin />
              </span>
                <div className={classes.delivery}>
              
              <div >
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
           <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>
          <div className={classes.order_container}>
            <div  className={classes.language}>
            <a href="#/">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRDlTt0IeFQReH-xeVsEytDGNdQ6_87yk4A&s" alt="" />
              <select className="select">
                <option value="" className="option">EN</option>
              </select>
              </a>
            </div>
            <Link to={!user &&'/auth'}>
            
            <div>
    {
      user?(
        <>
        <p>Hello {user?.email?.split("@")[0]} </p>
        <span onClick={()=>auth.signOut()}>Sign Out</span>
        </>
      ):(
       <>
        <p>Hello,Sign In</p>
        <span className="span">Account & Lists</span>
       </>
      )
    }
            
              </div>
            </Link>

            <Link to="/orders">
              <p>returns</p>
              <span>&Orders</span>
            </Link>
            <div>
            <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItem}</span>
            </Link>
            <span className="cart-text">Cart</span>
            </div>

          </div>
          </div>
           </section>
           <LowerHeader/>
    </section>
  )
}
<BsSearch />


export default Header
