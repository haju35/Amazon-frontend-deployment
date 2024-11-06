import React from 'react'
import { categoryImage } from './CategoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './category.module.css'

function Category() {
  return (
    <section className={classes.category_container}>
      {
        categoryImage.map((infos)=>(
          <CategoryCard data = {infos}/>
        ))
      }
    </section>
  )
}

export default Category
