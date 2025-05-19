import React, { useState, useEffect } from 'react';
import axios from 'axios';



function AttendanceTable({setPresent}) {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          setError("Token is missing!");
          console.error("Token is missing!")
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/student/all`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        setStudents(response.data);

        const initialAttendance = response.data.map(student => ({
          studentId: student.studentId,  
          present: false
        }));
        setAttendance(initialAttendance);
        setPresent(initialAttendance); 


        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        }
        setError(error.message);
        setLoading(false);
      }
      
    }
  
    fetchStudentData();

   
  }, []);

  useEffect(() => {
    setPresent(attendance);
  }, [attendance, setPresent])
  

  const handleCheckboxChange = (studentId) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(record =>
        record.studentId === studentId
          ? { ...record, present: !record.present }
          : record
      )
      
    );
  };

  const getStudentAttendance = (studentId) => {
    const record = attendance.find(a => a.studentId === studentId);
    return record ? record.present : false;
  };

  return (
    <div className='py-5'>
      <table className="min-w-5xl border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Roll No.</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.roll}>
              <td className="border p-2 text-center">{student.roll}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2 text-center">
              <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={getStudentAttendance(student.studentId)}
                    onChange={() => handleCheckboxChange(student.studentId)}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
