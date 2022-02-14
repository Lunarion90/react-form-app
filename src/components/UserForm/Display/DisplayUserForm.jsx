import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { FormContext } from '../../../context/FormContext.jsx'

export default function DisplayUserForm ({ setEditMode }) {
  const { firstName, lastName, email, phoneNumber, birthday, about, avatar } = useContext(FormContext)

  /* Return if there is any form element submitted to be displayed */
  const isEmpty = () => {
    if (!firstName && !lastName && !email && !phoneNumber && !birthday && !about && !avatar) return true
    return false
  }

  return (
        <div className="profileCard" style={ isEmpty() ? { display: 'none' } : { display: 'block' } }>
            <img id="avatarImage" src={avatar} alt="Placeholder" style={ !avatar ? { display: 'none' } : { display: 'inline' } }/>
            <h1 className="name">{firstName + ' ' + lastName}</h1>
            <div className="textContainer">
                <p className="email">{email ? 'E-mail: ' + email : null}</p>
                <p className="phoneNumber">{phoneNumber ? 'Phone: ' + phoneNumber : null}</p>
                <p className="birthday">{birthday ? 'Date of birth: ' + birthday : null}</p>
                <p className="about">{about ? 'Short intro: ' + about : null }</p>
            </div>
        </div>
  )
}

DisplayUserForm.propTypes = {
  setEditMode: PropTypes.bool
}
