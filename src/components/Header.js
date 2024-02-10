import React, {useState, useEffect} from 'react'
import logo from '../images/logo.jpg'
import { auth } from '../firebase';
import { getAuth, signOut } from "firebase/auth";
import { IoIosLogOut } from "react-icons/io";
import data from '../Data/in.json'
import './Header.css'

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    const handleLogout = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
      setShowDropdown(false);
    };
  return (
    <div>
         <div className="header">
            <div className="left">
                <img src={logo} alt=""/>
                <p style={{marginBottom:"0"}}>Student Dashboard</p>
            </div>
            <div className="right">
                <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
                    <i className="fas fa-user"></i>
                </div>
                
            </div>
        </div>
        {showDropdown && (
            <div className='dropdown-user'>
            {user && <p>Hi, {user.displayName}</p>}
            <hr style={{color:"black", width:"97px"}} />
              <button onClick={handleLogout}>
              <IoIosLogOut style={{fontSize:"17px", verticalAlign: 'middle', color:"black"}} />
              <span style={{marginLeft:"12px", verticalAlign: 'middle'}}>Logout</span></button>
            </div>
          )}
    </div>
  )
}

export default Header