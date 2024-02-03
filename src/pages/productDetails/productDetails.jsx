import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './productDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import salebanner from '../../img/salebanner.png'
import { addToCheckout } from '../../store/slices/checkoutSlice';

export const ProductDetails = () => {
  const itemsInCheckout = useSelector((state) => state.itemsInCheckout.value)
  let { productId } = useParams();
  const [product, setProduct] = useState()
  const [chosenImg, setChosenImg] = useState(product ? product.images[0]:'')
  const dispatch = useDispatch();

  const fetchData = async () => {
    const result = await fetch(`https://js2-ecommerce-api.vercel.app/api/products/${productId}`)
    const productValue = await result.json()
    setProduct(productValue)
    setChosenImg(productValue.images[0])
  }
  useEffect(() => {
    fetchData()
  }, [])

  const changeChosenImg = (img) => {
    setChosenImg(img)
  }

  const addToCart = () => {
    const existingProduct = itemsInCheckout.find(x => x.id === product.id)
    let newProduct = {
        name: product.name, 
        image: product.images[0],
        price: product.price,
        id: productId,
        quantity: existingProduct ? existingProduct.quantity : 1
    }
    dispatch(addToCheckout(newProduct))
}
  
  return (
    <div className='main-container'>
      <div className='sale-banner'>
        <img src={salebanner} alt="banner" />
      </div>
      {product ? 
      <div className='main-content'>
        <div className='image-container'>
          <img className='main-image' src={chosenImg} />
          <div className='images'>
            {product.images.map((image, i) => {
              return <img onClick={() => changeChosenImg(image)} key={i} src={image}/>
            })}
          </div>
        </div>
        <div className='info-container'>
          <p className='product-detail-title'>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price} kr</p>
          <button className='add-to-cart-btn' onClick={addToCart}>Add to cart <FontAwesomeIcon icon={faCartPlus} /> </button>
        </div>
      </div>  : <></>}
    </div>
  )
}