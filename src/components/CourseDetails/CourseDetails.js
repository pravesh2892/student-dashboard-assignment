import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './CourseDetails.css';
import courseData from '../../Data/in.json';
import Header from '../Header';
import SideBar from '../SideBar';
import { toast } from 'react-toastify'
import { auth } from '../../firebase';


function CourseDetails() {
  const { id } = useParams();
 

 
  const selectedCourse = courseData.find((course) => course.id === Number(id));
  const [userData, setUserData] = useState({
    CourseName: selectedCourse.name,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          userName: user.displayName || user.email || '',
        }));
      } else {
      }
    });
    return () => unsubscribe();
  }, []);

  const submitData = async (event) => {
    event.preventDefault();
    const {  CourseName, userName } = userData;

    try {
      const res = fetch(
        "https://student-dashboard-14440-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          
           userName,
           CourseName
          }),
        }
      );
      toast.success('You are enrolled successfuly');
    
    } catch (error) {
      toast.error('Sorry, something went wrong');
    }
  }
  



  
  if (!selectedCourse) {
    return <div>Error: Course not found</div>;
  }

  return (
    <div>
      <Header />
      <SideBar />
      <div className="course-details-container">
        <h1>Course Details:-</h1>
        <div className="thumbnail-instructor-row">
          <img src={selectedCourse.thumbnail} alt={selectedCourse.name} />
          <div className="instructor-info">
            <h3>{selectedCourse.name}</h3>
            <p>
              <span>Instructor:</span> {selectedCourse.instructor}
            </p>
            <button   onClick={submitData}>Enroll in this course</button>
          
          </div>
        </div>
        <p>
          <span>Description:</span> {selectedCourse.description}
        </p>
        <p>
          <span>Enrollment Status:</span> {selectedCourse.enrollmentStatus}
        </p>
        <p>
          <span>Duration:</span> {selectedCourse.duration}
        </p>
        <p>
          <span>Schedule:</span> {selectedCourse.schedule}
        </p>
        <p>
          <span>Location:</span> {selectedCourse.location}
        </p>
        <p>
          <span>Prerequisites:</span> {selectedCourse.prerequisites.join(', ')}
        </p>

        <h2>Syllabus:</h2>
        <table className="syllabus-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Topic</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourse.syllabus.map((item, index) => (
              <tr key={index}>
                <td>{item.week}</td>
                <td>{item.topic}</td>
                <td>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseDetails;
