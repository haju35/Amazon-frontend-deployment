import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from "./payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../API/axios'
import {ClipLoader} from "react-spinners";
import {db} from "../../Utility/firebase"
import {useNavigate} from "react-router-dom";
import {Type} from '../../Utility/action.type'

function Payment() {
  const[{user,basket},dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount+amount;
  },0);

  const total = basket.reduce((amount,item)=>{
    return item.price * item.amount + amount;
  },0)

  const [cardError, setCardError] =useState(null)
  const [processing,setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


  const handleChange = (e)=>{
    console.log(e);
    e?.error?.message? setCardError( e?.error?.message):setCardError("")
  }

  const handlePayment = async(e)=>{
    e.preventDefault()

    try{
      setProcessing(true);
        //backend contact to get the client secret
      const response = await axiosInstance({
      method: "post",
      url:`/payment/create?total=${total*100}`
    })

    console.log(response.data)
    const clientSecret = response.data?.clientSecret;

    //2.client side(react side confirmation)
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    //console.log(paymentIntent)

    //3.after the confirmation -->order firestore db save ,clear basket
  
    await db
    .collection("users")
    .doc(user.uid)
    .collection("orders")
    .doc(paymentIntent.id)
    .set({
      basket:basket,
      amount:paymentIntent.amount,
      created:paymentIntent.created
    })

    //empty the basket
    dispatch({type:Type.EMPTY_BASKET})
    setProcessing(false)
    navigate("/orders" , {state:{msg:"you have placed new order"}})
    }catch(error){
       console.log(error)
       setProcessing(false)
    }

  
  }
  return (
    <LayOut>
      {/*header*/}
    <div className={classes.payment_header}>
      Checkout ({totalItem}) items
    </div>
    {/*payment method*/}
    <section className={classes.payment}>
      {/*address*/}
      <div className={classes.flex}>
        <h3>Delivery Address</h3>
        <div className="div">
        <div>{user ? user.email : "Email not available"}</div>
        <div>ArbaMinch</div>
        <div>Ethiopia</div>
        </div>
      </div>
      <hr/>

      {/*product*/}
      <div className={classes.flex}>
        <h3 className="h3">Review items and delivery</h3>
        <div className="div">
      {
        basket?.map((item)=><ProductCard product={item} flex={true}/>)
      }
        </div>
      </div>
      <hr/>
      {/*card form*/}
      <div className={classes.flex}>
        <h3 className="h3">payment method</h3>
        <div className={classes.payment_card_container}>
         <div className={classes.payment_details}>
          <form onSubmit={handlePayment}>
            {cardError && <small style={{color:"red"}}>{cardError}</small>}
           { /*card element*/}
           <CardElement onChange={handleChange}/>
           {/*price*/}
           <div className={classes.payment_price}>
  <span style={{ display: "flex", gap: "10px" }}>
    <span>Total Order |</span>
    <CurrencyFormat amount={total} />
  </span>
  <div className="div">
    <button type="submit">
      {
      processing ? (
        <div className={classes.loading}>
          <ClipLoader color="gray" size={12} />
          <>please wait...</>
        </div>
      ) : (
        "Pay Now"
      )}
    </button>
  </div>
</div>

           
          </form>
         </div>
        </div>
      </div>
    </section>
    </LayOut>
  )
}

export default Payment
