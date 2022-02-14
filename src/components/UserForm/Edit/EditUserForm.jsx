import React, { useState, useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import PhoneInput from 'react-phone-input-2'
import PropTypes from 'prop-types'

import { FormContext } from '../../../context/FormContext.jsx'
import { StoreToSession } from '../../../utils/utils.js'

export default function EditUserForm ({ setEditMode }) {
  const namePattern = "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"

  const {
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    phoneNumber, setPhoneNumber,
    birthday, setBirthday,
    about, setAbout,
    avatar, setAvatar
  } = useContext(FormContext)

  const [tempAvatar, setTempAvatar] = useState(avatar)
  const [tempBirthday, setTempBirthday] = useState(birthday)

  /* Reads values from the form, updating the context, creates a JSON and persists it in the session storage */
  const handleFormSubmit = () => {
    const submitFirstName = document.getElementById('firstName').value
    const submitLastName = document.getElementById('lastName').value
    const submitEmail = document.getElementById('email').value
    const submitAbout = document.getElementById('about').value
    let submitPhoneNumber = document.getElementsByClassName('react-tel-input')[0].getElementsByClassName('form-control')[0].value
    if (submitPhoneNumber.length <= 3) submitPhoneNumber = ''

    setFirstName(submitFirstName)
    setLastName(submitLastName)
    setEmail(submitEmail)
    setPhoneNumber(submitPhoneNumber)
    setBirthday(tempBirthday)
    setAbout(submitAbout)
    setAvatar(tempAvatar)

    const jsonToSave = {}

    jsonToSave.firstName = submitFirstName
    jsonToSave.lastName = submitLastName
    jsonToSave.email = submitEmail
    jsonToSave.phoneNumber = submitPhoneNumber
    jsonToSave.birthday = tempBirthday
    jsonToSave.about = submitAbout
    jsonToSave.avatar = tempAvatar

    StoreToSession('formData', jsonToSave)

    setEditMode(false)
  }

  useEffect(() => {
    /* File size check */
    document.getElementById('desktopAvatarSelector').onchange = function () {
      if (this.files[0].size > 2097152) {
        alert('Image size over the limit of 2MB! Please select an other image.')
        this.value = ''
      }
    }
  })

  /* Stores the selected image in a temporary container until Submit button is clicked */
  const onImageChange = event => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setTempAvatar(reader.result)
      document.getElementById('previewImage').src = reader.result
      document.getElementById('previewImage').removeAttribute('hidden')
    })

    if (event.target.files[0]) reader.readAsDataURL(event.target.files[0])
  }

  return (
            <form id="dsUserForm" onSubmit={handleFormSubmit}>
              <label htmlFor="firstName">First name:</label><br/>
              <input type="text" id="firstName" name="firstName" pattern={namePattern} title="2-64 long extended alphabetic" defaultValue={firstName} /><br/>
              <label htmlFor="lastName">Last name:</label><br/>
              <input type="text" id="lastName" name="lastName" pattern={namePattern} title="2-64 long extended alphabetic" defaultValue={lastName} /><br/>
              <label htmlFor="email">Email:</label><br/>
              <input type="text" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Valid e-mail address" defaultValue={email} /><br/>
              <label htmlFor="phoneNumber">Phone:</label><br/>
              <PhoneInput
                country={'pl'}
                preferredCountries={['pl', 'hu']}
                value={phoneNumber}
              />
              <label htmlFor="birthday">Birthday:</label><br/>
              <DatePicker
                id="birthday"
                selected={tempBirthday !== '' ? new Date(tempBirthday) : null}
                maxDate={new Date()}
                onChange={(date) => tempBirthday ? setTempBirthday(date.toISOString().split('T')[0]) : setTempBirthday((new Date(date - date.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]) }
                dateFormat="yyyy.MM.dd"
              /><br/>
              <label htmlFor="avatar">Avatar:</label><br/>
              <input type="file" title="Max. 2MB file with extension of .tif, .tiff, .bmp, .jpg, .jpeg, .gif, .png" accept=".tif,.tiff,.bmp,.jpg,.jpeg,.gif,.png" id="desktopAvatarSelector" name="avatar" onChange={onImageChange}/>
              <input type="button" id="mobileAvatarSelector" value="Browse..." onClick={(event) => { document.getElementById('desktopAvatarSelector').click() }} /><br/>
              <div className="previewImageContainer">
                <img id="previewImage" src={tempAvatar} alt="Placeholder" style={!tempAvatar ? { display: 'none' } : { display: 'inline' } }/>
                <button type="button" className="btn-close" style={!tempAvatar ? { display: 'none' } : { display: 'flex' } } onClick={(event) => { setTempAvatar('') }}>
                  <span className="icon-cross"></span>
                  <span className="visually-hidden">Close</span>
                </button>
              </div>
              <br/>
              <label htmlFor="about">About:</label><br/>
              <textarea id="about" name="about" form="dsUserForm" defaultValue={about} maxLength="500"/><br/>
              <input id="submit" type="submit" value="Submit" />
            </form>
  )
}

EditUserForm.propTypes = {
  setEditMode: PropTypes.bool
}
