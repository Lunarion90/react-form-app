import { useContext } from 'react';

import { FormContext } from "../../../context/FormContext.jsx"
import { storeToSession } from "../../../utils/utils.js";

export default function DisplayUserForm({ setEditMode }) {

    const { firstName, setFirstName,
            lastName, setLastName,
            email, setEmail,
            phoneNumber, setPhoneNumber,
            birthday, setBirthday,
            about, setAbout,
            avatar, setAvatar } = useContext(FormContext);

    const isEmpty = () => {
        if (!firstName && !lastName && !email && !phoneNumber && !birthday && !about && !avatar) return true;
        return false;
    }

    return (
        <div className="profileCard" style={ isEmpty() ? {display: "none"} : {display: "block"} }>
            <img id="avatarImage" src={avatar} alt="Placeholder" style={ !avatar ? {display: "none"} : {display: "inline"} }/>
            <h1 className="name">{firstName + " " + lastName}</h1>
            <div className="textContainer">
                <p className="email">{email ? "E-mail: " + email : null}</p>
                <p className="phoneNumber">{phoneNumber ? "Phone: +" + phoneNumber : null}</p>
                <p className="birthday">{birthday && birthday !== "" ? "Date of birth: " + birthday.toISOString().split("T")[0] : null}</p>
                <p className="about">{about ? "Short intro: " + about : null }</p>
            </div>
        </div>
    )

}