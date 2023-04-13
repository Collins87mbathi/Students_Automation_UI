import React from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './Utils/ProtectedRoute';
import TimeTable from './pages/TimeTable';
import UploadForm from './pages/UploadForm';
import ImageUploadForm from './pages/ImageUploadForm';
import SetUp from "./pages/SetUp";
import Assignment from './pages/Assignment';
import UpComing from './pages/UpComing';
import Performance from './pages/Performance';
import { useSelector } from 'react-redux';
import Recommendation from './pages/Recommendation';

const App = () => {
  const user = useSelector((state) => state?.user.user);

  return (
    <>
  
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
             <SetUp/>
          </ProtectedRoute>
        }/>
        <Route path="/home" element={user ?  <Home/>: <Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path='/timetable' element={user ? <TimeTable/>: <SetUp/>}/>
        <Route path='/assignment' element={user ? <Assignment/>: <SetUp/>}/>
        <Route path='/classes' element={user ? <UpComing/>: <SetUp/>}/>
        <Route path='/uploadform' element={user ? <UploadForm/>: <SetUp/>}/>
        <Route path='/notes' element={user ? <ImageUploadForm/> : <SetUp/>}/>
        <Route path='/performance' element={user ? <Performance/>: <SetUp/>}/>
        <Route path='/recommendation' element={user ? <Recommendation/>: <SetUp/>}/>
      </Routes>
    </Router> 
    </>
  )
}

export default App