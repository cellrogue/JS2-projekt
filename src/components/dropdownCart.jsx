import React from 'react'
import './dropdownCart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCheckout, removeFromCheckout } from '../store/slices/checkoutSlice';
import { NavLink } from 'react-router-dom'


export const DropdownCart = ({isOpen, closeDropdown}) => {
  const itemsInCheckout = useSelector((state) => state.itemsInCheckout.value)
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCheckout(id))
  }

  const displayTotalPrice = () => {
    let totalPrice = 0
    itemsInCheckout.forEach(item => {
      totalPrice += item.price * item.quantity
    });

    return totalPrice
  }

  return (
    <div className={`dropdown ${isOpen ? 'dropdown-open' : 'dropdown-closed'}`}>
      {
        isOpen ?
        <>
        <div>
        <FontAwesomeIcon className='x-icon' icon={faX} onClick={closeDropdown} />
        </div>
         <div>
          {itemsInCheckout.map((item, i) => {
            return(
              <div className='items-in-dropdown' key={i}>
                <div className='info-items-in-dropdown'>
                  <p>{item.name}</p>
                  <img className='image-in-dropdown' src={item.image}/>
                  <p>{item.price} kr</p>
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
          <div>
            <NavLink to={'/checkout'}><button onClick={closeDropdown}>Continue to Checkout</button></NavLink>
          </div>
         </div>
        </>
        : <></>
      }
    </div>
  )
}
