import React, { useEffect, useState } from 'react'
import './home.css'
import { Product } from '../../components/product'
import banner3 from '../../img/banner3.png'
export const Home = () => {
  const [productsList, setProductsList] = useState([])

  const fetchData = async () => {
    const result = await fetch('https://js2-ecommerce-api.vercel.app/api/products')
    const products = await result.json()
    setProductsList(products)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className='front-content' style={{backgroundImage: `url(${banner3})`}}>
        <div className='front-text'>
          <p>Welcome to Fenrir's</p>
          <h1>Check out our new items!!</h1>
        </div>
        <div className='front-pictures'>
          <img className='front-image' src={productsList[0] ? productsList[0].images[0] : ""} alt="computer" />
        </div>
      </div>
      <div className='product-content'>
        <>
          {productsList.map((item, index) => {
            return <Product key={index} image={item.images[0]} name={item.name} price={item.price} id={item._id} />
          })}
        </>
      </div>
    </div>
  )
}
