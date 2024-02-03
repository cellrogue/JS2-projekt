import React, { useState } from 'react'
import './contact.css'
import contactbanner from '../../img/contactbanner.png'
import axios from 'axios'

const Contact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [allFieldsEmpty, setAllFieldsEmpty] = useState(false)
  const [errorObj, setErrorObj] = useState({firstName: false, lastName: false, email: false, msg: false})
  const [showMsg, setShowMsg] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()
    if(!firstName || !lastName || !email || !msg || errorObj.firstName || errorObj.lastName || errorObj.email) {
      setAllFieldsEmpty(true)
      setTimeout(() => {
        setAllFieldsEmpty(false)
      }, 5000);
      return
    } else {
      sendMsg()
    }
  }

  const sendMsg = async () => {
    const msgObject = {
      name: firstName + ' ' + lastName,
      email: email,
      message: msg
    }
    try {
      const res = await axios.post('https://js2-ecommerce-api.vercel.app/api/messages', msgObject);
      if(res.status === 200) {
        setFirstName('')
        setLastName('')
        setEmail('')
        setMsg('')
        setShowMsg(true)
        setTimeout(() => {
          setShowMsg(false)
        }, 5000);
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const onChangeValue = (e, changeThis) => {
    switch (changeThis) {
      case "firstName":
        setFirstName(e.target.value)
        break;

      case "lastName":
        setLastName(e.target.value)
        break;
      
      case "email":
        setEmail(e.target.value)
        break;
      
      case "msg":
        setMsg(e.target.value)
        break;
    
      default:
        break;
    }
  }

  const validate = (validateThis) => {
    let newErrorObj = { ...errorObj }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    switch (validateThis) {
      case "firstName":
        if(firstName.length < 2 ) newErrorObj = {...errorObj, firstName: true}
        else newErrorObj = {...errorObj, firstName: false}
        break;
      case "lastName":
        if(lastName.length < 2 ) newErrorObj = {...errorObj, lastName: true}
        else newErrorObj = {...errorObj, lastName: false}
        break;
      case "email":
        const isEmailCorrect = emailRegex.test(email)
        if(!isEmailCorrect ) newErrorObj = {...errorObj, email: true}
        else newErrorObj = {...errorObj, email: false}
        break;
        default:
        break;
        }
      setErrorObj(newErrorObj)
  }
 
  return (
    <div className='contact-content'>
      <div className='image-container'>
        <img src={contactbanner} alt="" />
      </div>
      <div className='contact-form'>
        <form>
          <label htmlFor="firstName">First name:</label>
          <input className={errorObj.firstName ? 'error' : ''} onBlur={() => validate("firstName")} name='firstName' type="text" value={firstName} onChange={(e) => onChangeValue(e, "firstName")} />
          <label htmlFor="lastName">Last name:</label>
          <input className={errorObj.lastName ? 'error' : ''} onBlur={() => validate("lastName")} name='lastName' type="text" value={lastName} onChange={(e) => onChangeValue(e, "lastName")} />
          <label htmlFor="email">Email:</label>
          <input name='email' type="text" className={errorObj.email ? 'error' : ''} value={email} onBlur={() => validate("email")} onChange={(e) => onChangeValue(e, "email")} />
          <label htmlFor="msg">Type your message here:</label>
          <textarea name='msg' value={msg} id="" cols="30" rows="10" onChange={(e) => onChangeValue(e, "msg")} ></textarea>
          {allFieldsEmpty ? <p className='error-text'>All fields have to be properly filled out!</p> : <></>}
          <button onClick={submitForm}>Send!</button>
        </form>
        {showMsg ? <p className='sent-msg'>Your message has been sent!</p> : <></>}
      </div>
    </div>
  )
}

export default Contact