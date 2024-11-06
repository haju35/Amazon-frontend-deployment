import React from 'react'
import {BrowserRouter as Router ,Routes , Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/protectedRoute/protectedRoute'

const stripePromise = loadStripe('pk_test_51QGQThDaICs9sTgPg8LtlhsjK9Njc6HoI5wwEgrM6cY2LG62Ddy0nm1ChSMWY5sL45lQjSgnW3OpS5XMxfUDOBvn00YaJo0f09');

function Routing() {


  
  return (
   <Router>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/auth' element={<Auth />}/>
      <Route path='/Payment'
       element={
        <ProtectedRoute
        msg={"you must log in to pay"}
        redirect={"/payment"}>
          <Elements stripe={stripePromise}>
        <Payment/>
        </Elements>
        </ProtectedRoute>
       }/>
      <Route path='/Orders' element={
         <ProtectedRoute
         msg={"you must log in to access orders"}
         redirect={"/orders"}>
           <Elements stripe={stripePromise}>
           <Orders/>
         </Elements>
         </ProtectedRoute>}/>
      <Route path='/category/:categoryName' element={<Results/>}/>
      <Route path='/products/:productId' element={<ProductDetail/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
   </Router>
  )
}

export default Routing
