import { useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import PhoneInput from 'react-phone-input-2';
import SimpleDate from "simple-datejs";

import { FormContext } from "../../../context/FormContext.jsx"
import { SetJSONFromContext, StoreToSession } from "../../../utils/utils.js";

export default function EditUserForm({ setEditMode }) {

    const namePattern = "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}";

    const { firstName, setFirstName,
            lastName, setLastName,
            email, setEmail,
            phoneNumber, setPhoneNumber,
            birthday, setBirthday,
            about, setAbout,
            avatar, setAvatar } = useContext(FormContext);

    const [tempAvatar, setTempAvatar] = useState(avatar);

    const handleFormSubmit = () => {

        const submitFirstName = document.getElementById("firstName").value;
        const submitLastName = document.getElementById("lastName").value;
        const submitEmail = document.getElementById("email").value;
        const submitAbout = document.getElementById("about").value;

        setFirstName(submitFirstName);
        setLastName(submitLastName);
        setEmail(submitEmail);
        setAbout(submitAbout);
        setAvatar(tempAvatar);

        var jsonToSave = {};

        jsonToSave.firstName = submitFirstName;
        jsonToSave.lastName = submitLastName;
        jsonToSave.email = submitEmail;
        jsonToSave.phoneNumber = phoneNumber;
        jsonToSave.birthday = birthday;
        jsonToSave.about = submitAbout;
        jsonToSave.avatar = tempAvatar;

        StoreToSession("formData", jsonToSave);

        setEditMode(false);

    }

    /* Checking filesize */
    useEffect(() => {
        document.getElementById("avatar").onchange = function() {
            if(this.files[0].size > 2097152){
               alert("Image size over the limit of 2MB! Please select an other image.");
               this.value = "";
            };
        };
    });

    const onImageChange = event => {

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            setTempAvatar(reader.result);
            document.getElementById("previewImage").src = reader.result;
            document.getElementById("previewImage").removeAttribute("hidden");
        })

        if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);

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
                id="phoneNumber"
                country={'pl'}
                preferredCountries={['pl','hu']}
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <label htmlFor="birthday">Birthday:</label><br/>
              <DatePicker
                id="birthday"
                selected={birthday !== "" ? birthday : null}
                maxDate={new Date()}
                onChange={(date) => birthday ? setBirthday(date) : setBirthday(new Date(date - date.getTimezoneOffset()*60*1000)) }
                dateFormat="yyyy.MM.dd"
              /><br/>
              <label htmlFor="avatar">Avatar:</label><br/>
              <input type="file" title="Max. 2MB file with extension of .tif, .tiff, .bmp, .jpg, .jpeg, .gif, .png" accept=".tif,.tiff,.bmp,.jpg,.jpeg,.gif,.png" id="avatar" name="avatar" onChange={onImageChange} /><br/>
              <img id="previewImage" src={tempAvatar} alt="Placeholder" style={!tempAvatar ? {display: "none"} : {display: "inline"} }/><br/>
              <label htmlFor="about">About:</label><br/>
              <textarea  id="about" name="about" form="dsUserForm" defaultValue={about} maxLength="500"/><br/>
              <input id="submit" type="submit" value="Submit" />
            </form>
    )

}