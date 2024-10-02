import React from 'react';
import './app.css'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {
  return(
    <>
    <ToastContainer/>
    <Outlet/>
    </>
  )
}

export default App
