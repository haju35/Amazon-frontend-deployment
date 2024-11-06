
import React from 'react'
import { TiThMenu } from "react-icons/ti";
import classes from './header.module.css';

const LowerHeader = () => {
  return (
    <div className={classes.lower_container}>
      <ul>
      <TiThMenu />
        <li>All</li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader
