import React from 'react'
import './product.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCheckout } from '../store/slices/checkoutSlice';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export const Product = ({ name, image, price, id }) => {
    const itemsInCheckout = useSelector((state) => state.itemsInCheckout.value)
    const dispatch = useDispatch();
    const addToCart = () => {
        let product = {
            name: name, 
            image: image,
            price: price,
            id: id,
            quantity: 1
        }
        dispatch(addToCheckout(product))
    }

    return (
    <div className='products-content'>
        <img className='product-image' width={400} height={300} src={image} alt="product image" />
        <p className='product-title'>{name}</p>
        <p className='product-price'>{price} kr</p>
        <div className='product-footer'>
            <NavLink className='view-more' to={`/productDetails/${id}`}>
                <p className='view-more'>View more...</p>
            </NavLink>
            <FontAwesomeIcon className='add-to-cart' icon={faCartPlus} onClick={addToCart} />
        </div>
    </div>
  )
}
