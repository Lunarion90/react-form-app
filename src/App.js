import { useState } from 'react';

import logo from './assets/logo.png';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-input-2/lib/style.css'
import 'w3-css/w3.css';

import EditUserForm from "./components/UserForm/Edit/EditUserForm.jsx"
import DisplayUserForm from "./components/UserForm/Display/DisplayUserForm.jsx"
import FormContextProvider from "./context/FormContext.jsx"

function App() {

  const [editMode, setEditMode] = useState(false);

  const editStateChanger = (isEdit) => {
    setEditMode(isEdit);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} id="logo" alt="Logo" />
        <ul className="breadcrumb">
          <li><a href="#" onClick={() => setEditMode(false)}>Home</a></li>
          <li><a href="#">{editMode ? "Register" : "Profile"}</a></li>
        </ul>
      </header>
      <nav className="sticky w3-sidebar w3-light-grey w3-bar-block App-navigation" >
        <a className="w3-bar-item w3-button" onClick={() => setEditMode(false)}>Profile</a>
        <a className="w3-bar-item w3-button" onClick={() => setEditMode(true)}>Register</a>
      </nav>
      <main className="App-content">
        <FormContextProvider>
            {editMode ? <EditUserForm setEditMode = {editStateChanger}/> : <DisplayUserForm />}
        </FormContextProvider>
      </main>
      <footer className="App-footer">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non cursus est. Vivamus commodo, felis ac interdum consectetur, ipsum felis interdum est, sit amet eleifend erat odio nec dolor. Sed ante urna, eleifend vel imperdiet in, laoreet id eros. Sed mattis quam nec lobortis interdum. Nunc consequat lectus ut felis suscipit placerat. Donec id arcu placerat, faucibus est non, dapibus nibh. Pellentesque ante augue, euismod laoreet nulla vitae, condimentum vehicula urna.</p>

        <p>Donec nec lorem ex. Curabitur ac accumsan odio, at sollicitudin nibh. Sed consectetur egestas euismod. Nulla faucibus maximus egestas. Quisque et ipsum feugiat, imperdiet dui eget, accumsan augue. Curabitur viverra elementum lectus, id porttitor augue volutpat vel. Suspendisse nisl purus, accumsan nec dignissim a, dictum vitae justo. Sed dignissim vehicula augue at tincidunt. Nam maximus sollicitudin nisi, id venenatis lectus placerat vitae. Sed a gravida magna, dictum tincidunt libero. Proin vitae ipsum nunc. Proin urna elit, sollicitudin a dolor ut, commodo rhoncus nunc. Nam facilisis lorem vitae nisl suscipit, quis facilisis dolor pharetra. Fusce gravida nisi id tortor dapibus maximus. Pellentesque suscipit ipsum ut facilisis tempor. Nam laoreet nec velit vitae viverra.</p>

        <p>Quisque consectetur erat sit amet orci consectetur dignissim. Aenean convallis lorem in rhoncus hendrerit. Nulla quis tristique erat, eget auctor neque. Integer at commodo ante. Quisque suscipit et nibh id pulvinar. Nunc suscipit leo eget turpis scelerisque, a accumsan leo dignissim. Cras luctus justo vel tellus convallis efficitur. Morbi imperdiet pulvinar fermentum. Sed arcu felis, rutrum eu accumsan eu, auctor at dui. Vestibulum consectetur vestibulum maximus. In rutrum eleifend nunc, dapibus rhoncus diam vestibulum a. Suspendisse hendrerit, erat nec bibendum tincidunt, erat neque euismod odio, imperdiet vestibulum ipsum quam rhoncus felis. Morbi sit amet bibendum elit. Vestibulum arcu elit, faucibus vestibulum sodales sed, porta et massa.</p>
      </footer>
    </div>
  );
}

export default App;
