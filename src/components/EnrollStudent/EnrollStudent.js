import React, { useEffect, useState } from 'react';
import './EnrollStudent.css';
import Header from '../Header';
import SideBar from '../SideBar';

async function fetchData() {
  try {
    const res = await fetch(
      "https://student-dashboard-14440-default-rtdb.firebaseio.com/userDataRecords.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log("student data", data);

    return Object.values(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function EnrollStudent() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData();
        setStudentData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDataAndSetState();
  }, []);

  return (
    <div>
      <Header />
      <SideBar />
      <div className='container-userlist'>
        <h1>Enrolled Students</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                
                <th>Student Name</th>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  {index === 0 || student.userName !== studentData[index - 1].userName ? (
                    <>
                      
                      <td>{student.userName}</td>
                      <td>{student.CourseName}</td>
                    </>
                  ) : (
                    <>
                     
                      <td></td>
                      <td >{student.CourseName}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
      </div>
    </div>
  );
}

export default EnrollStudent;


