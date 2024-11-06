import React from 'react'
import{img} from './img/data'
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './carousel.module.css'
function Carousel() {
  return (
    <div>
       <ReactCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem) => (
          <img  src={imageItem} alt={`carousel-item`} />
        ))}
      </ReactCarousel>
      <div className={classes.hero_img}></div>
    </div>
  )
}

export default Carousel 


