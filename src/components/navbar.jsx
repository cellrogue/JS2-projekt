import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DropdownCart } from './dropdownCart'

export const Navbar = () => {
  const itemsInCheckout = useSelector((state) => state.itemsInCheckout.value)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [scrollYPostion, setScollYPosition] = useState(0)
  const shoppingCartRef = useRef(null);

  const closeDropdown = () => {
    setOpenDropdown(false)
  }

  const scrollPos = () => {
    const position = window.pageYOffset;
    setScollYPosition(position)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollPos)
  
    return () => {
      window.removeEventListener("scroll", scrollPos)
    }
  }, [])

  const displayTotalItems = () => {
    let total = 0;
     itemsInCheckout.forEach(item => {
        total += item.quantity;
    });
    return total;
  }
  

  return (
    <nav className={scrollYPostion === 0 ? "nav-top" : "nav-scrolled"}>
        <div className='link-container'>
          <div className='links'>
            <NavLink className='navlink' to={'/'}>Home</NavLink>
            <NavLink className='navlink' to={'/contact'}>Contact</NavLink>
          </div>
        </div>
        <div className='login-cart-container'>
          <div className='login-cart'>
            <div className='login-container'>
              <FontAwesomeIcon icon={faUser} />
              <p>Login</p>
            </div>
            <div className='shopping-cart-container' >
              <FontAwesomeIcon ref={shoppingCartRef} onClick={() => setOpenDropdown(!openDropdown)} className='shopping-cart-icon' icon={faCartShopping} />
              <p>{displayTotalItems()}</p>
              <DropdownCart isOpen={openDropdown} closeDropdown={closeDropdown}/>
            </div>
          </div>
        </div>
    </nav>
  )
}
