
import './App.css';
import Home from './Pages/Home';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route,Routes, Navigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import CourseDetails from './components/CourseDetails/CourseDetails';
import EnrollStudent from './components/EnrollStudent/EnrollStudent';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';


function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

    
  return (

    <BrowserRouter>
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element ={<Signup />} />
        <Route path='/' element={user ?  <Home/> : <Navigate to="/login" />}/>
        <Route path="/courseDetails/:id" element={<CourseDetails />} />
        <Route path='/EnrollStudent' element ={<EnrollStudent />} />
      </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;
