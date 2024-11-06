import React,{useState,useContext} from 'react'
import classes from './signUp.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'
import {ClipLoader} from "react-spinners";


function Auth() {    
  const[email, setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false
  })

  const[{user,basket},dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()
  const authHandler = async (e) =>{
    e.preventDefault();
    console.log(e.target.name);
    if(e.target.name ==="signIn") {
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        console.log(user);
        dispatch({
          type : Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        navigate(navStateData?.state?.redirect || "/")
      })
      .catch((err)=>{
        setError(err.message)
        setLoading({...loading,signIn:false})
      })
    }else{
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
     console.log(user);
     dispatch({
      type: Type.SET_USER,
      user: userInfo.user
    });
    setLoading({...loading,signUp:false})
    navigate(navStateData?.state?.redirect || "/")
   })
   .catch((err)=>{
    setError(err.message)
    setLoading({...loading,signUp:false})
   })
    }
  }

  return (        
   <section className={classes.login}>
<Link to="/">      
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png' alt='' />
</Link>
<div className={classes.login_container}>  
  <h1>Sign In</h1>
  {
    navStateData?.state?.msg &&(
      <small
      style={{
        padding:"5px",
        textAlign:"center",
        color:"red",
        fontWeight:"bold"
       }}
      >
        {navStateData?.state?.msg}
      </small>
    )
  }
     <form>
      <div>
        <label htmlFor='email'>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' id='email'/>
      </div>
      <div>
      <label htmlFor='Password'>Password</label>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type='Password' id='Password'/>
      </div>
      <button name="signIn" onClick={authHandler} className={classes.SignIn_btn}>
        {loading.signIn?(<ClipLoader color="#000" size={15}></ClipLoader>):("Sign In")}</button>
     </form>

     <p>By continuing, you agree to Amazon's Fake Conditions of Use and Privacy Notice.</p>
     <button onClick={authHandler} name="signUp" className={classes.login_register}>
     {loading.signUp?(<ClipLoader color="#000" size={15}></ClipLoader>):("Create your Amazon Account")}
      </button>
     {error&& (
      <small style={{paddingTop:"5px",color:"red"}}>{error}</small>
     )}
     </div>
    </section>            
      )         
}     

export default Auth;
