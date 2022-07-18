import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Main from "./Container/main" 
import About from "./Container/About/About"
import Add from "./Container/AddURL/AddURL"
import Navbar from "./Components/Navbar/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<Add />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <div className='footfooter'>
        <div>Created by PSP and Nachos</div>
      </div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </BrowserRouter>
  );
}

export default App;
