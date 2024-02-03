import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { addToCheckout, clearAllCheckout, removeFromCheckout } from '../../store/slices/checkoutSlice'
import './checkout.css'
import thankyoubanner from '../../img/thankyoubanner.png'
import axios from 'axios'

export const Checkout = () => {
    const itemsInCheckout = useSelector((state) => state.itemsInCheckout.value)
    const dispatch = useDispatch();

    const [showMsg, setShowMsg] = useState(false)

    const removeItem = (id) => {
      dispatch(removeFromCheckout(id))
    }
  
    const displayTotalPrice = () => {
      let totalPrice = 0
      itemsInCheckout.forEach(item => {
        totalPrice += Number(item.price) * Number(item.quantity);
      });
      return totalPrice
    }

    const clearAll = () => {
        dispatch(clearAllCheckout())
    }

    const confirmPurchase = async () => {
      const products = itemsInCheckout.map((item) => {
        return {
          productId: item.id, quantity: item.quantity
        }
      })
      try {
        const res = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({products}),
        });
        if(res.status === 201) {
          clearAll()
          setShowMsg(true)
          setTimeout(() => {
            setShowMsg(false)
          }, 5000);
        }
      } catch (error) {
        console.error(error)
      }
    }

    return (
    <div className='checkout-container'>
        <img src={thankyoubanner} alt="" />
        <span className='clear-all' >Clear all<FontAwesomeIcon icon={faTrashCan} className='clear-all-icon' onClick={clearAll} /></span>
        {itemsInCheckout.map((item, i) => {
            return(
              <div className='items-in-cart' key={i}>
                <div className='info-items-in-cart'>
                  <p>{item.name}</p>
                  <img className='image-in-cart' src={item.image}/>
                  <p>Price: {item.price} kr</p>
                </div>
                <div className='add-remove-items'>
                  <FontAwesomeIcon icon={faMinus} onClick={() => removeItem(item.id)} />
                  <p>{item.quantity}</p>
                  <FontAwesomeIcon icon={faPlus} onClick={() => dispatch(addToCheckout(item))} />
                </div>
              </div>
            )
          })}
        <div className='total-price'>
            <p className='display-total-price'>Total: {displayTotalPrice()} kr</p>
        </div>
        <button className='cart-btn' onClick={confirmPurchase}>Pay now!</button>
        {showMsg ? <p>Your purchase has been confirmed!</p>: <></>}
    </div>
  )
}
