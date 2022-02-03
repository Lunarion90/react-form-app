import { createContext, useState } from 'react'

export const FormContext = createContext();

export default function FormContextProvider(props) {

    const formDataJSON = JSON.parse(window.sessionStorage.getItem("formData"));

    const [firstName, setFirstName] = useState(formDataJSON ? formDataJSON.firstName : "");
    const [lastName, setLastName] = useState(formDataJSON ? formDataJSON.lastName : "");
    const [email, setEmail] = useState(formDataJSON ? formDataJSON.email : "");
    const [phoneNumber, setPhoneNumber] = useState(formDataJSON ? formDataJSON.phoneNumber : "");
    const [birthday, setBirthday] = useState(formDataJSON ? new Date(formDataJSON.birthday) : "");
    const [about, setAbout] = useState(formDataJSON ? formDataJSON.about : "");
    const [avatar, setAvatar] = useState(formDataJSON ? formDataJSON.avatar : "");

    return (
            <FormContext.Provider value={{
            firstName, setFirstName,
            lastName, setLastName,
            email, setEmail,
            phoneNumber, setPhoneNumber,
            birthday, setBirthday,
            about, setAbout,
            avatar, setAvatar
            }}>
                {props.children}
            </FormContext.Provider>
        )

}