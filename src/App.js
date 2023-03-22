import React from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './Utils/ProtectedRoute';
import TimeTable from './pages/TimeTable';
import UploadForm from './pages/UploadForm';
import ImageUploadForm from './pages/ImageUploadForm';

const App = () => {
  return (
    <>
  
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
             <Home/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path='/timetable' element={<TimeTable/>}/>
        <Route path='/uploadform' element={<UploadForm/>}/>
        <Route path='/notes' element={<ImageUploadForm/>}/>
      </Routes>
    </Router> 
    </>
  )
}

export default App