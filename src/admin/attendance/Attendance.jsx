import React, {useState, useEffect} from 'react'
import { CalendarForm } from './date-picker'
import { SelectSubject } from './subject-picker'
import AttendanceTable from './attendance-table'
import { Button } from '@/components/ui/button'
import axios from 'axios'



function Attendance() {

    const [date, setDate] = useState(null)
    const [subject, setSubject] = useState('')
    const [present, setPresent] = useState([])
useEffect(() => {
  console.log(present)
}, [present])

const submitHandler = async() =>{

  if (!date) {
    alert("please select a date");
    return;
  }
  if (!subject) {
    alert("please select a subject")
    return;
  }
  if (!present.length) {
    alert("attendance list is empty")
  }
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("authentication failed! Please login again");
      return;
    }
    const palyload = {
      date: date,
      subject: subject,
      attendance: present,
      takenBy:"vscode"
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/attendance/add`, palyload, 
     { headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }}
    )


    console.log('Attendance submitted:', response.data);
    alert('Attendance submitted successfully!');


    setDate(null);
    setSubject('');
    setPresent([]);

  } catch (error) {
    
  }

}

  return (
    <div className='p-10'>
        <div className="top  flex gap-5">
            <CalendarForm value={date} onChange={setDate} />
            <SelectSubject value={subject} onChange={setSubject}/>
        </div>

       <div className="table-m">
       <AttendanceTable setPresent={setPresent}/> 
       </div>
       <Button onClick={submitHandler}>Submit Attendance</Button>
    </div>  
  )
}

export default Attendance