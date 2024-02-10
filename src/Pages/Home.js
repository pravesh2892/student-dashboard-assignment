import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../Data/in.json'
import './Home.css';



const CourseCard = ({ course, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courseDetails/${id}`);
  };

  return (
   
    <div className="card" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}
   onClick={handleClick}
    >
      <img src={course.thumbnail} alt={course.name} style={{ width: '100%', height: 'auto' }} />
      <h3>{course.name}</h3>
      <p><span>Instructor:</span> {course.instructor}</p>
      <p><span>Description:</span> {course.description}</p>
      <p><span>Enrollment Status:</span> {course.enrollmentStatus}</p>
    </div>
   
  );
};


const Home = () => {

 
  const [userModal, setUserModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState([]);
  const selectRef = useRef();
  const resetRef = useRef();
 

 
  useEffect(() => {
    setCourses(data);
  }, []);

  var arr = [];
  const addToCourses = (course) => {
    arr = [course, ...total];
    setTotal(arr)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addToCourses(selectRef.current.value);
    let confirm = window.confirm('Do you want to select another course');
    if (confirm) {
      resetRef.current.click()
    } else {
     
      
    }
  }

 

 

  return (
    <div>
      <div className="nav-side-container">
        <Header setUserModal={setUserModal} userModal={userModal} />


        <div className="left-right-container">
          <SideBar />
          <div className="graph-bar">
           
            <form onSubmit={handleSubmit}>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {courses.map((course, index) => (
                <CourseCard key={index} course={course} id={course.id} />
             ))}
            </div>
            </form>
           
          </div>
        </div>
      </div>

    

      
    </div>
  )
}

export default Home